$(function () {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey || !userId) {
        alert("請重新登入！");
        window.location.href = window.location.origin;
        return;
    }

    $("#navbar-container").load("../employee/navbar.html");

    const month = [
        "https://docs.google.com/spreadsheets/d/1xrzMI2jtxNfv5X4ZuoYzT0D_bX6ZQY1l/preview", // 0 代表空值，避免 iframe 出錯
        "https://docs.google.com/spreadsheets/d/1xrzMI2jtxNfv5X4ZuoYzT0D_bX6ZQY1l/preview",
        "https://docs.google.com/spreadsheets/d/1LwIc9HUuq6DZOTn4mnBZ0GSTEz9O-xaL/preview",
        "https://docs.google.com/spreadsheets/d/15JSmluh01JxBan00wE4-0VQm1O-vcbTd/preview"
    ];

    function updateCalendar() {
        const monthIndex = parseInt($("#month").val()); // 確保是數字
        $("#calendar").empty(); // 清空內容
        if (monthIndex > 0 && monthIndex < month.length) {
            $("#calendar").html(`
                <iframe src="${month[monthIndex]}"
                    width="100%"
                    height="600px"
                    frameborder="0">
                </iframe>
            `);
            console.log("✅ 更新行事曆:", month[monthIndex]);
        } else {
            console.warn("⚠️ 無效的月份選擇，無對應網址" , nowMonth);
        }
    }

    // 預設載入當月份
    const nowMonth = new Date().getMonth() + 1; // 取得當前月份 (1-12)
    if (nowMonth < month.length) {
        $("#month").val(nowMonth + "月"); // 設定 `#month` 預設值
        updateCalendar(); // 立即更新
    }

    // 監聽 `#month` 變更事件
    $("#month").change(updateCalendar);
});
