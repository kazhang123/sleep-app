// returns number of hours and minutes between startTime and endTime
export function calculateSleepTime(startTime, endTime) {
    // time elapsed in milliseconds 
    console.log("endtime: "+ endTime);
    console.log("startime "+ startTime);
    let timeElapsed = endTime - startTime;
    console.log("time "+timeElapsed);
    let hours = timeElapsed / (1000 * 3600);
    console.log(hours);
    return hours.toFixed(2);
}