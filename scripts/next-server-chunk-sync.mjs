import { copyFile, mkdir, readdir, stat } from "node:fs/promises";
import { join } from "node:path";

function getDistDir() {
  return process.env.NEXT_DIST_DIR || ".next";
}

async function pathExists(path) {
  try {
    await stat(path);
    return true;
  } catch {
    return false;
  }
}

export async function syncNextServerChunks(cwd = process.cwd()) {
  const distDir = getDistDir();
  const serverDir = join(cwd, distDir, "server");
  const chunksDir = join(serverDir, "chunks");

  if (!(await pathExists(chunksDir))) {
    return 0;
  }

  await mkdir(serverDir, { recursive: true });

  const entries = await readdir(chunksDir, { withFileTypes: true });
  const jsFiles = entries
    .filter((entry) => entry.isFile() && entry.name.endsWith(".js"))
    .map((entry) => entry.name);

  let copied = 0;

  for (const fileName of jsFiles) {
    const source = join(chunksDir, fileName);
    const target = join(serverDir, fileName);

    if (await pathExists(target)) {
      const [sourceStat, targetStat] = await Promise.all([stat(source), stat(target)]);

      if (
        sourceStat.size === targetStat.size &&
        sourceStat.mtimeMs <= targetStat.mtimeMs
      ) {
        continue;
      }
    }

    await copyFile(source, target);
    copied += 1;
  }

  return copied;
}
