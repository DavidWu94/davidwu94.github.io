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

});