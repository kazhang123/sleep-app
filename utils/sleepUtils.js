// returns number of hours and minutes between startTime and endTime
export function calculateSleepTime(startTime, endTime) {
    let timeElapsed = endTime - startTime;
    let hours = timeElapsed / (1000 * 3600);
    return hours.toFixed(2);
}

// returns given elapsed time in hours and minutes
export function getFormattedTime(hoursElapsed) {
    let hours = Math.floor(hoursElapsed);
    let minutes = Math.floor((hoursElapsed - Math.floor(hoursElapsed)) * 60)
    return (
        {
            hours: hours,
            minutes: minutes,
        }
    );
}