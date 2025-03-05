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
    const month = now.getMonth() + 1;

    $("#upData").on("click" , () =>{
        $.ajax({
            url: `http://eucan.ddns.net:3000/clrecord`,
            type: "POST",
            dataType: "json",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                account: userId,
                cookie: sessionKey,
                year: year,
                month: month,
            }),
        }).done((res) => {
            alert("打卡資料獲取成功，今日晚上十二點後將會上線")
            console.log("✅ 日曆資料獲取成功:", res);
        }).fail((err) => {
            console.error("❌ 打卡資料獲取失敗:", err);
            alert("查詢失敗，請稍後再試！");
        }); 
    })
});
