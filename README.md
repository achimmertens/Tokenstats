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
2.  ggf. Timeframe (Standard: 7 Tage) in "getDateFrame.js" anpassen.
3.  "node surfKibana.js" ausführen. (Achtung: Die Tokenordner werden alle gelöscht!)
4.  Ein Screenshot von [Hive in CoinMarketCap](https://coinmarketcap.com/currencies/hive-blockchain/) nehmen, in peakd.com hochladen und Bild-Text in TokensTemplate.txt einfügen. Hiverank anpassen. Speichern.
5.   "node FileUploadToBackBlaze.js" ausführen.
6.   "node updateDateInTokenImagesTxt.js" ausführen, um das Datum in den jeweiligen TokenImages.txt zu aktualisieren.
7.   "node createText.js" hier ausführen, um die Textbausteine für die jeweiligen Token zu erstellen.
8.   Die Text.mds der Token überprüfen.
9.   "node copyScreenshotsFolder.js" um den aktuellen Screenshots-Ordner nach "screenshots" zu kopieren. (Achtung! screenshots wird überschrieben!)
10.  Überprüfen ob die Scheduler (Aufgabenplanung) aktiv sind.  


Written by Achim Mertens

Done Oktober:
- Beerbot automatisieren
- Datum nur an einer Stelle anpassen
- Script schreiben, dass den Screenshotsordner kopiert

Todo:
- coinmarketcap Screenshot automatisieren
- Nur noch ein Script, welches alle anderen Scripte ausführt erstellen.
- advertisingbot soll Reports übernehmen