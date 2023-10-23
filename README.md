# Tokenstats

This Tool creates statistics for HIVE tokens.

## Install
### Chrome Driver
You need to download and set set a path to the chromedriver:
https://googlechromelabs.github.io/chrome-for-testing/last-known-good-versions-with-downloads.json
Download the latest Chromedriver Win64-Zip file (I.e.: https://edgedl.me.gvt1.com/edgedl/chrome/chrome-for-testing/117.0.5938.92/win64/chromedriver-win64.zip).

![](./chromdriver.png)
Speicherort: C:\Users\User\AppData\Local\Microsoft\WindowsApps

### Node
You need to have installed node

# Execute

01. TokenStatsTemplate.md ein bisschen freitext reintun.
02. ggf. Timeframe (Standard: 7 Tage) in "getDateFrame.js" anpassen.
03. "node surfKibana.js" ausführen. (Achtung: Die Tokenordner werden alle gelöscht!)
04. "node getCoinMarketCap.js" ausführen.
05. "node FileUploadToBackBlaze.js" ausführen.
06. "node updateDateInTokenImagesTxt.js" ausführen, um das Datum in den jeweiligen TokenImages.txt zu aktualisieren.
07. "node createText.js" hier ausführen, um die Textbausteine für die jeweiligen Token zu erstellen.
08. Die Text.mds der Token überprüfen.
09. "node copyScreenshotsFolder.js" um den aktuellen Screenshots-Ordner nach "screenshots" zu kopieren. (Achtung! screenshots wird überschrieben!)
10. Überprüfen ob die Scheduler (Aufgabenplanung) aktiv sind.  


Written by Achim Mertens

Done Oktober:
- Beerbot automatisieren
- Datum nur an einer Stelle anpassen
- Script schreiben, dass den Screenshotsordner kopiert
- coinmarketcap Screenshot automatisieren
- advertisingbot soll Reports übernehmen
- Beerbot Statistic ist nur für einen Tag.

Todo:

- Nur noch ein Script, welches alle anderen Scripte ausführt erstellen.
