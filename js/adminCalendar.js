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
    const year = String(now.getFullYear());
    const nowmonth = String(now.getMonth() + 1);

    $("#upData").on("click", () => {
        $.confirm({
            title: '更新行事曆',
            content: `
                <form id="calendarForm">
                    <div>
                        <label>年份</label>
                        <input type="text" id="calendarYear" value="${year}" placeholder="請輸入年份" />
                    </div>
                    <div>
                        <label>月份</label>
                        <input type="text" id="calendarMonth" value="${nowmonth}" placeholder="請輸入月份" />
                    </div>
                </form>
            `,
            buttons: {
                confirm: {
                    text: '確定',
                    btnClass: 'btn-blue',
                    action: function () {
                        var inputYear = this.$content.find('#calendarYear').val();
                        var inputMonth = this.$content.find('#calendarMonth').val();
                        if (!inputMonth){
                            for (var i = 1; i <= 12; i++) {
                                upCalendar(i); // 依序傳入 1 到 12 月
                            }
                            alert("已更新當年所有月份的行事曆資料");
                        }
                        else if (inputMonth < 1 || inputMonth > 12) {
                            alert("請輸入有效的月份（1-12）");
                            return false;
                        } else {
                            upCalendar(inputMonth);
                            alert(`已更新 ${inputYear} 年 ${inputMonth} 月的行事曆資料`);
                        }
                    }
                },
                cancel: {
                    text: '取消'
                }
            }
        })
    });


    function upCalendar(month) {
        $.ajax({
            url: "http://eucan.ddns.net:3000/calendar",
            type: "POST",
            dataType: "text", // 設為 text，讓我們可以手動解析 JSON
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                account: userId,
                cookie: sessionKey,
                year: year,
                month: month,
            }),
        }).done(resText => {
            console.log("✅ 行事曆資料獲取成功:", resText);
            try {
                alert("行事曆資料獲取成功，今日晚上十二點後將會上線");
            } catch (e) {
                console.error("⚠️ JSON 解析失敗:", e, resText);
                alert("行事曆資料獲取成功，今日晚上十二點後將會上線");
            }
        }).fail(xhr => {
            console.error("❌ 行事曆資料獲取失敗:", xhr);
            alert(`查詢失敗，請稍後再試！錯誤代碼：${xhr.status}`);
        });

    }

});
