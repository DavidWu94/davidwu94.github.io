$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);

	var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth();
    var day = now.getDate();
    var hour = now.getHours();
    var minute = now.getMinutes();
    var dateStr = year + "-" + month + "-" + day;
    var timeStr = hour + ":" + minute;
    $("#day").text("當前日期:" + dateStr);
    $("#time").text(dateStr + " / " + timeStr);

    $.ajax({
        url: `http://eucan.ddns.net:3000/clockin`,
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            account:userId,
            cookie:sessionKey,
            type:0
        }),
    }).then(res => {
        console.log(res);
        $("#work").append(res.time);
    })

});

$("#workButton").on("click",()=>{
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    $.ajax({
        url: `http://eucan.ddns.net:3000/clockin`,
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            account:userId,
            cookie:sessionKey,
            type:1
        }),
    }).then(res => {
        alert("上班")
        console.log(res);
    })
    
})


$("#restButton").on("click",()=>{
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    $.ajax({
        url: `http://eucan.ddns.net:3000/clockin`,
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            account:userId,
            cookie:sessionKey,
            type:-1
        }),
    }).then(res => {
        alert("下班")
        console.log(res);
    })
    
})