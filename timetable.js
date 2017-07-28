'use strict';
let nowtime
let nowtimeoutput
let timetable
maketimetable()
function maketimetable() {
    document.getElementById("clock").innerHTML = "<br>"
    let now = new Date();
    let weeknomber = now.getDay();
    var req = new XMLHttpRequest();
    req.open("get", "timetable.csv", true);
    req.send(null);
    req.onload = function () {
        let csv = req.responseText;
        let temp = csv.split("\r\n");
        timetable = []
        for (var i = 0; i < temp.length; i++) {
            let tmp = temp[i].split(",");
            timetable.push(tmp[weeknomber])
        }
        timetable.shift();

        document.getElementById("timetable").innerHTML = "<table><tr><th>時間</th><th>授業内容</th></tr><tr><td>09:30~10:30</td><td>" + timetable[0] + "</td></tr><tr><td>10:40~11:30</td><td>" + timetable[1] + "</td></tr><tr><td>11:40~12:30</td><td>" + timetable[2] + "</td></tr><tr><td>12:40~13:10</td><td>" + timetable[3] + "</td></tr><tr><td>13:10~13:40</td><td>" + timetable[4] + "</td></tr><tr><td>13:50~14:40</td><td>" + timetable[5] + "</td></tr><tr><td>14:50~15:40</td><td>" + timetable[6] + "</td></tr></table>"

    }
}
function clock() {
    let weektemp = ["(日)", "(月)", "(火)", "(水)", "(木)", "(金)", "(土)"]
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1
    let day = now.getDate();
    let week = weektemp[now.getDay()];
    let hours = zero(now.getHours());
    let minutes = zero(now.getMinutes())
    let seconds = zero(now.getSeconds());
    nowtime = hours + "" + minutes + "" + seconds
    nowtimeoutput = hours + ":" + minutes
    document.getElementById("clock").innerHTML = year + "年" + month + "月" + day + "日" + week + " " + hours + ":" + minutes + ":" + seconds;
  requestAnimationFrame(clock);
}
function zero(num) {
    let ans
    if (num < 10) {
        ans = "0" + num
    } else {
        ans = num
    }
    return ans;
}
clock();
function alerm() {
    let starttime = ["0930", "1040", "1140", "1230", "1310", "1350", "1450"];
    for (var i = 0; i < starttime.length; i++) {
        let starttimetemp = starttime[i] + "00";
        if (nowtime === starttimetemp) {
            console.log("アラーム動作");
            let temp = i + 1;
            if (i === 3) {
            } else {
                var userAgent = window.navigator.userAgent.toLowerCase();
                if (userAgent.indexOf('chrome')){
                    Push.Permission.request();
                    Push.create(nowtimeoutput + " になりました。", {
                        body: timetable[i] + "の開始時刻です。",
                        icon: 'icon.jpg',
                        timeout: 8000, // 通知が消えるタイミング
                        vibrate: [100, 100, 100], // モバイル端末でのバイブレーション秒数
                        onClick: function() {
                            // 通知がクリックされた場合の設定
                            console.log(this);
                        }
                    });
                }else{
                    var n = new Notification(nowtimeoutput + " になりました。" + timetable[i] + "の開始時刻です。");
                }
                document.getElementById("music").innerHTML = '<audio src="chime1.mp3" autoplay></audio> ';
            }
        }
    }
    let endtime = ["1030", "1130", "1230", "1310", "1340", "1440", "1540"]
    for (var i = 0; i < endtime.length; i++) {
        let endtimetemp = endtime[i] + "00"
        if (nowtime === endtimetemp) {
            if (i === 6) {
                document.getElementById("music").innerHTML = '<audio src="chime3.mp3" autoplay></audio> ';
                var n = new Notification(nowtimeoutput + " になりました。本日の授業はすべて終了です。");
            } else {
                if (i === 3) {
                } else {
                    document.getElementById("music").innerHTML = '<audio src="chime2.mp3" autoplay></audio> ';
                    var n = new Notification(nowtimeoutput + " になりました。" + timetable[i] + "の終了時刻です。");
                }
            }
        }
    }
}
setInterval('alerm()', 1000);
