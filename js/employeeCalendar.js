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
        "https://docs.google.com/spreadsheets/d/1xrzMI2jtxNfv5X4ZuoYzT0D_bX6ZQY1l/preview", // 0 舊行事曆檔
        "https://docs.google.com/spreadsheets/d/1fKeHq7HmJkOsI0jH5YzGkWauZ9fSyLw0/preview", //1月
        "https://docs.google.com/spreadsheets/d/1LwIc9HUuq6DZOTn4mnBZ0GSTEz9O-xaL/preview", //2月
        "https://docs.google.com/spreadsheets/d/15JSmluh01JxBan00wE4-0VQm1O-vcbTd/preview", //3月
        "https://docs.google.com/spreadsheets/d/19zieLzhe7L_-V10Vn5Il6BvT_1Mky8A0/preview", //4月
        "https://docs.google.com/spreadsheets/d/1wIuBQSkf7N2OzMj9093yE0Rn2g7TFjEJ/preview", //5月
        "https://docs.google.com/spreadsheets/d/1IucIi4dGgnzhu23AUr1MptVYQWZgEusl/preview", //6月
        "https://docs.google.com/spreadsheets/d/1KCraPE3SjI-Hwf2mn83i6Q2TWtLhZQ8I/preview", //7月
        "https://docs.google.com/spreadsheets/d/1TzTbvkxEY9JdZ23Mi5rBiJJiKWNpowTj/preview", //8月
        "https://docs.google.com/spreadsheets/d/1ERdBrXhyIn1B6D1kAXNTch8y4nM91PzX/preview", //9月
        "https://docs.google.com/spreadsheets/d/1FeuHzS0SvNp6dCTzfDnKlRbOcAfmx80R/preview", //10月
        "https://docs.google.com/spreadsheets/d/17G-53BwFIjRrAVlGPvXoN6pVKaCVD7DP/preview", //11月
        "https://docs.google.com/spreadsheets/d/1H5n8epnr1hcMDXJSe2uyMqJ0M3VIjmde/preview"  //12月
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
