$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey) {
        alert("請重新登入");
        window.location = window.location.origin;
        return;
    }

    loginCheck(userId, sessionKey);

    // 取得當前日期與時間
    const now = new Date();
    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 修正月份
    const day = now.getDate();
    const hour = now.getHours();
    const minute = now.getMinutes().toString().padStart(2, '0'); // 確保分鐘數兩位數

    const dateStr = `${year}-${month}-${day}`;
    const timeStr = `${hour}:${minute}`;

    $("#time").text(`${dateStr} / ${timeStr}`);

    // 請求打卡紀錄
    $.ajax({
        url: "http://eucan.ddns.net:3000/clockin",
        type: "POST",
        dataType: "json",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ account: userId, cookie: sessionKey, type: 0 }),
    })
    .done(res => {
        console.log(res);

        let work = res.find(v => v.type == '1');
        let rest = res.find(v => v.type == '-1');

        $("#work").text(work?.time || "尚未打卡");
        $("#rest").text(rest?.time || "尚未打卡");
        
    })
    .fail(() => {
        alert("無法取得打卡紀錄，請稍後再試！");
    });

    // 上班打卡按鈕
    $("#workButton").on("click", function() {
        handleClockIn(1, "上班");
    });

    // 下班打卡按鈕
    $("#restButton").on("click", function() {
        handleClockIn(-1, "下班");
    });

    // 打卡處理函式
    function handleClockIn(type, message) {
        const btn = type === 1 ? $("#workButton") : $("#restButton");

        // 禁用按鈕，防止重複點擊
        btn.prop("disabled", true);

        $.ajax({
            url: "http://eucan.ddns.net:3000/clockin",
            type: "POST",
            dataType: "json",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({ account: userId, cookie: sessionKey, type: type }),
        })
        .done(() => {
            alert(`${message} 打卡成功`);
            setTimeout(() => location.reload(), 500); // 延遲 0.5 秒後重新整理頁面
        })
        .fail(() => {
            alert(`${message} 打卡失敗，請稍後再試`);
            btn.prop("disabled", false); // 失敗後恢復按鈕
        });
    }
});
