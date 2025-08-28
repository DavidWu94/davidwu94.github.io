$(function () {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey || !userId) {
        alert("請重新登入！");
        window.location.href = window.location.origin;
        return;
    }

    $("#navbar-container").load("../employee/navbar.html");


    const month2025 = [
        "https://docs.google.com/spreadsheets/d/1xrzMI2jtxNfv5X4ZuoYzT0D_bX6ZQY1l/preview", // 0 舊行事曆檔
        "https://docs.google.com/spreadsheets/d/1fKeHq7HmJkOsI0jH5YzGkWauZ9fSyLw0/preview", //2025 1月
        "https://docs.google.com/spreadsheets/d/1LwIc9HUuq6DZOTn4mnBZ0GSTEz9O-xaL/preview", //2025 2月
        "https://docs.google.com/spreadsheets/d/15JSmluh01JxBan00wE4-0VQm1O-vcbTd/preview", //2025 3月
        "https://docs.google.com/spreadsheets/d/19zieLzhe7L_-V10Vn5Il6BvT_1Mky8A0/preview", //2025 4月
        "https://docs.google.com/spreadsheets/d/1wIuBQSkf7N2OzMj9093yE0Rn2g7TFjEJ/preview", //2025 5月
        "https://docs.google.com/spreadsheets/d/1IucIi4dGgnzhu23AUr1MptVYQWZgEusl/preview", //2025 6月
        "https://docs.google.com/spreadsheets/d/1KCraPE3SjI-Hwf2mn83i6Q2TWtLhZQ8I/preview", //2025 7月
        "https://docs.google.com/spreadsheets/d/1TzTbvkxEY9JdZ23Mi5rBiJJiKWNpowTj/preview", //2025 8月
        "https://docs.google.com/spreadsheets/d/1ERdBrXhyIn1B6D1kAXNTch8y4nM91PzX/preview", //2025 9月
        "https://docs.google.com/spreadsheets/d/1FeuHzS0SvNp6dCTzfDnKlRbOcAfmx80R/preview", //2025 10月
        "https://docs.google.com/spreadsheets/d/17G-53BwFIjRrAVlGPvXoN6pVKaCVD7DP/preview", //2025 11月
        "https://docs.google.com/spreadsheets/d/1H5n8epnr1hcMDXJSe2uyMqJ0M3VIjmde/preview", //2025 12月
        "https://docs.google.com/spreadsheets/d/1axyiQyKaHJXRwSdx4xFEfPMuKuoIMXEy/preview", //2026 1月
    ];

    const month2026 = [
        "https://docs.google.com/spreadsheets/d/1xrzMI2jtxNfv5X4ZuoYzT0D_bX6ZQY1l/preview", // 0 舊行事曆檔
        "https://docs.google.com/spreadsheets/d/1axyiQyKaHJXRwSdx4xFEfPMuKuoIMXEy/preview", //2026 1月
        "https://docs.google.com/spreadsheets/d/1A69GoAwsXetuvrM7KK1dJd6kOrQLt0dL/preview", //2026 2月
        "https://docs.google.com/spreadsheets/d/1Sc7vZ-CG9mEgzVuEaTtyEiQ_2uvjVvCf/preview", //2026 3月
        "https://docs.google.com/spreadsheets/d/1-Nkj5Aqy_RWqmHEvOiORYNYUGcIWlikV/preview", //2026 4月
        "https://docs.google.com/spreadsheets/d/19bI-RCnXMMfvuvyJOi4t-kJfz0AyU5BG/preview", //2026 5月
        "https://docs.google.com/spreadsheets/d/1mrG6j8WFLALzU6AQTuJ2wWWxhHlYh8F1/preview", //2026 6月
        "https://docs.google.com/spreadsheets/d/1Y34UjSq5gUdMAHKL2MqOmyDNLDfEfNqW/preview", //2026 7月
        "https://docs.google.com/spreadsheets/d/1sbld4EzFxck-viFZcvDYqVptcr5USYgi/preview", //2026 8月
        "https://docs.google.com/spreadsheets/d/1KdbMgnsiP6tz0KVtgCse-1u67cmiD-z2/preview", //2026 9月
        "https://docs.google.com/spreadsheets/d/1nSrfkXJDuD_UAvxHKtEBEHIvNRpp7y3t/preview", //2026 10月
        "https://docs.google.com/spreadsheets/d/1VGDWRHR-1NtZMn7di3zURusCu9iy0ivo/preview", //2026 11月
        "https://docs.google.com/spreadsheets/d/1-lZmsQ8hl6LMQAvCM5rt9GDA8WLZy_xa/preview", //2026 12月
    ]

    function updateCalendar() {
        const monthIndex = parseInt($("#month").val()); // 確保是數字
        const yearIndex = parseInt($("#year").val()); // 確保是數字
        $("#calendar").empty(); // 清空內容
        if (yearIndex === 2025) {
            loadCalendar(month2025, monthIndex);
        }
        else if (yearIndex === 2026) {
            loadCalendar(month2026, monthIndex);
        }
    }

    function loadCalendar(monthArray, monthIndex) {
        if (monthIndex > 0 && monthIndex < month.length) {
            $("#calendar").html(`
                <iframe src="${monthArray[monthIndex]}"
                    width="100%"
                    height="600px"
                    frameborder="0">
                </iframe>
            `);
            console.log("✅ 更新行事曆:", month[monthIndex]);
        } else {
            console.warn("⚠️ 無效的月份選擇，無對應網址", nowMonth);
        }
    }

    // 預設載入當月份
    const nowYear = new Date().getFullYear();
    const nowMonth = new Date().getMonth() + 1; // 取得當前月份 (1-12)
    if (nowMonth < month.length) {
        $("#month").val(nowMonth + "月"); // 設定 `#month` 預設值
        $("#year").val(nowYear + "年"); // 設定 `#year` 預設值
        updateCalendar(); // 立即更新
    }

    // 監聽 `#month` 變更事件
    $("#month").change(updateCalendar);
    $("#year").change(updateCalendar);
});
