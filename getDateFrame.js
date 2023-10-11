
module.exports = function getDateFrame() {

let timeFrame = 7;  // Number of Days in the past
let oneWeekAgo = new Date();
let currentDate = new Date();
let currentDateString = currentDate.toISOString().slice(0, 10)+"T05:30:00.000Z";
oneWeekAgo.setDate(oneWeekAgo.getDate() - timeFrame);
let oneWeekAgoString = oneWeekAgo.toISOString().slice(0, 10)+"T05:30:00.000Z";
// Bei Bedarf überschreiben:
//oneWeekAgoString = '2023-05-09T07:30:08.988Z'
//currentDateString = '2023-05-16T07:30:08.988Z'
let dateFrame = `${oneWeekAgoString.slice(0, 10)} to ${currentDateString.slice(0, 10)}`;
console.log("dateFrame = ",dateFrame);
return {dateFrame, currentDateString, oneWeekAgoString};
}