// createText.js written by Achim Mertens
// For details see README.md


const fs = require('fs');
const getTables = require('./gettables.js');

async function main() {
    let template = fs.readFileSync('tokenStatsTemplate.txt', 'utf-8');
    let otherTokens = fs.readFileSync('otherTokensTemplate.txt', 'utf-8');
    let otherTokenImages = fs.readFileSync('otherTokenImages.txt', 'utf-8');

    const OT1 = /\!\[01(.*?)\)/;
    console.log("OT1 = ", OT1);
    const matchOT1 = OT1.exec(otherTokenImages);
    console.log("matchOT1 = ", matchOT1);
    const otherTokenImage01 = matchOT1 ? matchOT1[0] : null;
    console.log("otherTokenImage01 = ", otherTokenImage01); // gibt "01_HivePerToken.png" aus

    const OT2 = /\!\[02(.*?)\)/;
    console.log("OT2 = ", OT2);
    const matchOT2 = OT2.exec(otherTokenImages);
    console.log("matchOT2 = ", matchOT2);
    const otherTokenImage02 = matchOT2 ? matchOT2[0] : null;
    console.log("otherTokenImage02 = ", otherTokenImage02); // gibt "02_USDPerToken.png" aus

    const OT3 = /\!\[03(.*?)\)/;
    console.log("OT3 = ", OT3);
    const matchOT3 = OT3.exec(otherTokenImages);
    console.log("matchOT3 = ", matchOT3);
    const otherTokenImage03 = matchOT3 ? matchOT3[0] : null;
    console.log("otherTokenImage03 = ", otherTokenImage03); // gibt "03_TableOfTokenPrices.png" aus

    // Datum von vor einer Woche
    let timeFrame = 7;
    let oneWeekAgo = new Date();
    let currentDate = new Date();
    let currentDateString = currentDate.toISOString().slice(0, 10);
    oneWeekAgo.setDate(oneWeekAgo.getDate() - timeFrame);
    let oneWeekAgoString = oneWeekAgo.toISOString().slice(0, 10);
    // Bei Bedarf überschreiben:
    oneWeekAgoString = '2023-05-05T08:38:08.988Z'
    currentDateString = '2023-05-12T08:38:08.988Z'
    let dateFrame = `${oneWeekAgoString} to ${currentDateString}`;

    let tokens = ["ALIVE", "BEER", "LEO", "POB", "SPT"];
    for (let token of tokens) {
        let TokenImages = fs.readFileSync(`${token}images.txt`, 'utf-8');
        const BILD_01 = /\!\[01(.*?)\)/;
        const matchB1 = BILD_01.exec(TokenImages);
        const TokenImage01 = matchB1 ? matchB1[0] : null;
        const BILD_02 = /\!\[02(.*?)\)/;
        const matchB2 = BILD_02.exec(TokenImages);
        const TokenImage02 = matchB2 ? matchB2[0] : null;
        const BILD_03 = /\!\[03(.*?)\)/;
        const matchB3 = BILD_03.exec(TokenImages);
        const TokenImage03 = matchB3 ? matchB3[0] : null;
        const BILD_04 = /\!\[04(.*?)\)/;
        const matchB4 = BILD_04.exec(TokenImages);
        const TokenImage04 = matchB4 ? matchB4[0] : null;
        const BILD_05 = /\!\[05(.*?)\)/;
        const matchB5 = BILD_05.exec(TokenImages);
        const TokenImage05 = matchB5 ? matchB5[0] : null;
        const BILD_06 = /\!\[06(.*?)\)/;
        const matchB6 = BILD_06.exec(TokenImages);
        const TokenImage06 = matchB6 ? matchB6[0] : null;

        let filename = `./screenshots/${token}/${token}Text.txt`;
        let tagToken = token.toLowerCase();

        const { buyersTableResult, sellersTableResult, buyVsSellResult } = await getTables(tagToken, oneWeekAgoString, currentDateString);
        let replacedTemplate = template
            .replace('[DATE_FRAME]', dateFrame)
            .replace('[OTHERTOKENS]', otherTokens)
            .replace('[OT01]', otherTokenImage01)
            .replace('[OT02]', otherTokenImage02)
            .replace('[OT03]', otherTokenImage03)
            .replace('[TAG]', tagToken)
            .replace('BILD_01', TokenImage01)
            .replace('BILD_02', TokenImage02)
            .replace('BILD_03', TokenImage03)
            .replace('BILD_04', TokenImage04)
            .replace('BILD_05', TokenImage05)
            .replace('BILD_06', TokenImage06)
            .replace('TABLE01', buyersTableResult)
            .replace('TABLE02', sellersTableResult)
            .replace('[BUYVSSELLERTABLE]',buyVsSellResult)
            .split('[TOKEN]').join('$' + token)
        fs.writeFile(filename, replacedTemplate, function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log(`Die Datei ${filename} wurde erfolgreich erstellt!`);
            }
        });
        console.log('buyersTableResult = \n', buyersTableResult);
        console.log('sellersTableResult = \n', sellersTableResult);
        console.log('buyVsSellResult = ', buyVsSellResult)
    }
    
}

main();