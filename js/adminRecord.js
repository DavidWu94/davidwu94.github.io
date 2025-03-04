$(function () {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 修正月份
    $.ajax({
        url: `http://eucan.ddns.net:3000/clrecord`,
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            account: userId,
            cookie: sessionKey,
            year: year,
            month: month
        }),
    }).then((res) => {
        console.log(res);
    })
    $("#navbar-container").load("../admin/navbar.html");
});