import React from 'react';

function removeMinuteAndSecondData(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}

function calculateDaysBetween(date1, date2) {
    var days = (Date.parse(date2) - Date.parse(date1)) / (24*60*60*1000);
    return Math.trunc(days);
}

export function sleepTimeInHours(startDate, endDate) {    
    var startHour = startDate.getHours();
    var endHour = endDate.getHours();

    var startDay = startDate.getDate();
    var endDay = endDate.getDate();
    
    var startNoMins = removeMinuteAndSecondData(startDate);
    var endNoMins = removeMinuteAndSecondData(endDate);
    
    var numDaysBetween = calculateDaysBetween(startNoMins, endNoMins);

    if (numDaysBetween == 0) {
        return (endHour - startHour);
    } else {
        return (24*(daysBetween-1) + (24 - startHour) + endHour);
    }
}