function ExcelDate_to_NormalDate(excelDate) {
    const excelStartDate = new Date(1900, 0, 0);
    const normalDate = new Date(excelStartDate.getTime() + (excelDate - 1) * 86400000);

    // Adjust to GMT+07:00, Bangkok Time Code
    const adjustedDate = new Date(normalDate);
    adjustedDate.setHours(adjustedDate.getHours());

    
    return adjustedDate.toDateString(); // From 45714 to  Wed Feb 26 2025
}

function NormalDate_to_ExcelDate(normalDate) {
    if (typeof normalDate === "string") {
        normalDate = new Date(normalDate);
    }
    const adjustedDate = new Date(normalDate);
    adjustedDate.setHours(adjustedDate.getHours());
    const excelStartDate = new Date(1900, 0, 0);
    
    const timeDiff = adjustedDate - excelStartDate;

    const excelDate = Math.floor(timeDiff / (1000 * 60 * 60 * 24)) + 2;  // "Wed Feb 26 2025" or "Wed Feb 26 2025" to ExcelDate, 45714

    return excelDate;
}

function convertEminutesToNormalminute(excelMinutes) {
    const totalMinutesInDay = 1440; // 24 * 60

    let days = Math.floor(excelMinutes / totalMinutesInDay);
    let remainingMinutes = excelMinutes % totalMinutesInDay;

    let hours = Math.floor(remainingMinutes / 60);
    let minutes = remainingMinutes % 60;

    // Format hours and minutes as two-digit strings
    let formattedHours = hours.toString().padStart(2, '0');
    let formattedMinutes = minutes.toString().padStart(2, '0');

    return {
        day: ExcelDate_to_NormalDate(days),  // Number of days from the base date
        time: {
            hours: formattedHours,
            minutes: formattedMinutes
        }
    };
}


export {ExcelDate_to_NormalDate,NormalDate_to_ExcelDate, convertEminutesToNormalminute};