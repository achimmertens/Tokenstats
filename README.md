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

01. TokenStatsTemplate.md ein bisschen freitext reintun.
2.  ggf. Datum in "surfkibana.js" (now-7d austauschen gegen z.B. now-14d) und "createText.js" (z.B. timeframe=14) und TokenStatsTemplate.md ("Letzte Woche") anpassen.
3.  "node surfKibana.js" ausführen. (Achtung: Die Tokenordner werden alle gelöscht!)
4.  Ein Screenshot von [Hive in CoinMarketCap](https://coinmarketcap.com/currencies/hive-blockchain/) nehmen, in peakd.com hochladen und Bild-Text in TokensTemplate.txt einfügen. Hiverank anpassen.
5.   "node FileUploadToBackBlaze.js" ausführen.
6.   "node updateDateInTokenImagesTxt.js" ausführen, um das Datum in den jeweiligen TokenImages.txt zu aktualisieren.
7.   "node createText.js" hier ausführen (Achtung: Datum evtl. anpassen), um die Textbausteine für die jeweiligen Token zu erstellen
8.   Die Text.mds der Token überprüfen
9.   Den aktuellen Screenshotes-Ordner umbenennen (oder kopieren) nach "screenshots" 
10.  Überprüfen ob die Scheduler aktiv sind  


Written by Achim Mertens
