import { syncNextServerChunks } from "./next-server-chunk-sync.mjs";

const copied = await syncNextServerChunks();
const distDir = process.env.NEXT_DIST_DIR || ".next";

if (copied > 0) {
  console.log(`Synced ${copied} Next server chunk file(s) into ${distDir}/server.`);
}
