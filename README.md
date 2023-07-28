# Tokenstats

This Tool creates statistics for HIVE tokens.

## Install
### Chrome Driver
You need to download and set set a path to the chromedriver:
https://sites.google.com/chromium.org/driver/downloads?authuser=0
![](./chromdriver.png)
Speicherort: C:\Users\User\AppData\Local\Microsoft\WindowsApps

### Node
You need to have installed node

# Execute

01. ggf. Datum in "surfkibana.js" (now-7d austauschen gegen z.B. now-14d) und "createText.js" (z.B. timeframe=14) und TokenStatsTemplate.txt ("Letzte Woche") anpassen.
02. "node surfKibana.js" ausführen. (Achtung: Die Tokenordner werden alle gelöscht!)
03. Ein Screenshot von [Hive in CoinMarketCap](https://coinmarketcap.com/currencies/hive-blockchain/) nehmen, in peakd.com hochladen und Bild-Text in otherTokensTemplate.txt einfügen
04.  "node FileUploadToBackBlaze.js" ausführen.
05.  "node updateDateInTokenImagesTxt.js" ausführen, um das Datum in den jeweiligen TokenImages.txt zu aktualisieren.
06.  "node createText.js" hier ausführen (Achtung: Datum evtl. anpassen), um die Textbausteine für die jeweiligen Token zu erstellen
7.   Die TokenTextbausteine in Peakd.com einfügen und schedulen.


Written by Achim Mertens
