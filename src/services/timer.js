
//Cool solution for accurate timer using web workers
let timerStart = true;

function myTimer(d0) {
    // get current time
    let d = (new Date()).valueOf();
    // calculate time diffference between now and initial time
    let diff = d - d0;

    // calculate number of hours
    let hours = Math.floor(diff / 1000 / 60 / 60);
    // calculate number of minutes
    let minutes = Math.floor((diff - hours * 1000 * 60 * 60) / 1000 / 60);
    // calculate number of seconds
    let seconds = Math.floor((diff - hours * 1000 * 60 * 60 - minutes * 1000 * 60) / 1000);

    // if number of hours less than 10, add a leading "0"
    hours = hours.toString();
    if (hours.length == 1) {
        hours = "0" + hours;
    }

    // if number of minutes less than 10, add a leading "0"
    minutes = minutes.toString();
    if (minutes.length == 1) {
        minutes = "0" + minutes;
    }
    // if number of seconds less than 10, add a leading "0"
    seconds = seconds.toString();
    if (seconds.length == 1) {
        seconds = "0" + seconds;
    }

    // return output to Web Worker
    postMessage(hours + ":" + minutes + ":" + seconds);

}

if (timerStart) {
    // get current time
    let d0 = (new Date()).valueOf();
    // repeat myTimer(d0) every 100 ms
    myVar = setInterval(function () { myTimer(d0) }, 100);
    // timer should not start anymore since it has been started
    timerStart = false;
}