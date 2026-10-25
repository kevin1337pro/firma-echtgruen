# EchtGrün — Grün mit Charakter

Eigenständiges, **unabhängiges Website- und Vertriebskonzept** für EchtGrün. Keine offizielle Unternehmenswebsite und keine behauptete Beauftragung.

## Lokal starten

Node.js 22 LTS oder 24 LTS verwenden.

```bash
npm ci
npm run dev
```

Die Entwicklungsadresse wird im Terminal ausgegeben. `npm run build` erstellt eine statische Website in `out/`. `npm run typecheck` prüft TypeScript. Die statische Website benötigt keinen eigenen Anwendungsserver.

## Inhalt & Interaktionen

- Eigenständige Gestaltung in Dunkelgrün, Lime und Creme, lokal geladene Schriften.
- GSAP/ScrollTrigger: Text-Reveal, Wald-Parallaxe, lesebegleitende Typografie, horizontale Leistungsstrecke auf großen Bildschirmen, Scroll-Fortschritt und Bildzoom.
- Mobile Leistungsstrecke und kleine Desktop-Fenster zeigen die Inhalte untereinander; `prefers-reduced-motion` deaktiviert bewegungsreiche Effekte.
- Tastaturbedienbares Film-Storyboard: drei **geplante** Szenen, keine vorgetäuschten Videos oder bereits produzierten Drohnenaufnahmen.
- Anfrageformular: lokale Textvorschau → Kopieren oder `mailto:`. Keine automatische Nachricht, kein Backend, keine Speicherung.
- Konzeptkennzeichnung, Bildnachweise und technische Datenschutzinformationen.

## Basis aus firma-enbergs

Auf ausdrücklichen Wunsch adaptiert aus [kevin1337pro/firma-enbergs](https://github.com/kevin1337pro/firma-enbergs), Ausgangscommit `9e2a8e200a0a7e921f47b8aa03259ab1952d78b9`.

Übernommen bzw. angepasst: Next.js/React/TypeScript-Grundgerüst, Build-/Entwicklungsskripte und `SectionHeading`. Neu: vollständige Gestaltung, EchtGrün-Inhalte, Medien, GSAP-Erlebnis und Anfrageformular. Keine Enbergs-Kontaktdaten, Referenzen, Zertifikate oder Firmenbilder übernommen. Dieses Repository hat eine neue, eigenständige Historie.

## Verifizierte Daten und Bilder

Siehe [Recherche](docs/recherche.md) und [Bildquellen](docs/bildquellen.md). Die Marke, Kernleistungen und E-Mail wurden direkt im öffentlichen Instagram-Profil geprüft. Telefon/Region wurden zusätzlich abgeglichen. Abweichende Anschriften in Verzeichnissen wurden nicht als gesicherte Firmendaten übernommen.

Echte Firmenfotos von @echtgruen sind klar von illustrativen Unsplash-Waldaufnahmen getrennt. Credit **Photo Faber** bleibt am Maschinenbild erhalten. Rechte an Marken und Firmenfotos liegen bei den jeweiligen Rechteinhabern; es wird keine freie Lizenz oder kommerzielle Bildfreigabe behauptet. Vor einem offiziellen Firmenstart Nutzungsfreigaben, Stammdaten und Pflichtseiten bestätigen. Schriften: Barlow Condensed und Manrope, SIL Open Font License.

## Pitch-Unterlagen

`docs/pitch.txt` enthält die E-Mail, den Telefonleitfaden, Einwandbehandlung und ein modulares Angebotskonzept. Es wurden keine Nachrichten versendet und keine Anrufe getätigt.

## Veröffentlichung

Die Sites-Konfiguration liegt in `.openai/hosting.json`; der statische Ausgabeordner ist `out`. Das öffentliche GitHub-Repository ist unabhängig vom Sites-Quellremote. Keine Zugangsdaten ins Repository schreiben.
