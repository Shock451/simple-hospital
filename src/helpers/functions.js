export function convertDate(mysldate, format = true) {
    var dateParts = mysldate.split("-");
    var date = new Date(dateParts[0], dateParts[1] - 1, dateParts[2].substr(0, 2));
    // return date.getDate() + "-" + (date.getMonth() + 1);
    return formatDate(date);
}

export function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [day, month, year].join('-');
}

export function formatTime(date) {
    var d = new Date(date),
        hr = '' + d.getHours(),
        min = '' + d.getMinutes(),
        mer = hr >= 0 && hr < 12 ? "am" : "pm";

    return `${hr}:${min} ${mer}`;
}

export function formatDateTime(date) {

    const full_date = formatDate(date);
    const full_time = formatTime(date);

    return full_date + " " + full_time
}

export function createChartData(data) {
    let labels = [], datasets = [], blood_sugar = [], temperature = [], heart_rate = [], blood_pressure = [];
    data.forEach(function (reading) {
        labels.push(convertDate(reading.updated));
        blood_pressure.push(reading.blood_pressure);
        blood_sugar.push(reading.blood_sugar);
        heart_rate.push(reading.heart_rate);
        temperature.push(reading.temperature);
    })
    datasets.push({
        label: 'Blood Sugar',
        backgroundColor: 'rgba(255, 0, 54, 0.57)',
        borderColor: 'rgb(255, 0, 0)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(200, 34, 69, 0.57)',
        hoverBorderColor: 'rgba(149, 48, 69, 0.57)',
        data: blood_sugar
    });
    datasets.push({
        label: 'Blood Pressure',
        backgroundColor: 'rgba(51, 102, 168, 0.57)',
        borderColor: 'rgba(62, 95, 138, 0.57)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(69, 97, 134, 0.57)',
        hoverBorderColor: 'rgba(77, 94, 117, 0.57)',
        data: blood_pressure
    });
    datasets.push({
        label: 'Heart Rate',
        backgroundColor: 'rgba(58, 225, 34, 0.57)',
        borderColor: 'rgba(69, 155, 56, 0.57)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(69, 155, 56, 0.57)',
        hoverBorderColor: 'rgba(71, 130, 63, 0.57)',
        data: heart_rate
    });
    datasets.push({
        label: 'Temprature',
        backgroundColor: 'rgba(238, 205, 28, 0.57)',
        borderColor: 'rgba(172, 151, 40, 0.57)',
        borderWidth: 1,
        hoverBackgroundColor: 'rgba(172, 151, 40, 0.57)',
        hoverBorderColor: 'rgba(128, 116, 54, 0.57)',
        data: temperature
    });

    return { labels, datasets }
}
