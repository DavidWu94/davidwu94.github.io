$(function () {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey || !userId) {
        alert("請重新登入！");
        window.location.href = window.location.origin;
        return;
    }

    $("#navbar-container").load("../admin/navbar.html"); // 獨立載入 navbar，避免受 AJAX 影響

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0'); // 轉換為兩位數格式

    $.ajax({
        url: "http://eucan.ddns.net:3000/clrecord",
        type: "POST",
        dataType: "json",
        contentType: "application/json",
        data: JSON.stringify({
            account: userId,
            cookie: sessionKey,
            year: year,
            month: month
        }),
    }).done((res) => {
        console.log("✅ 資料獲取成功:", res);
    }).fail((err) => {
        console.error("❌ 資料獲取失敗:", err);
        alert("查詢失敗，請稍後再試！");
    });
});
