/// <reference path="jquery-3.7.1.min.js"/>
$(() => {
    const now = new Date();
    const year = now.getFullYear();
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey) {
        alert("請重新登入");
        window.location = window.location.origin;
    }

    loginCheck(userId, sessionKey);

    // 取得當年度特休假總時數
    fetchQuota(userId, sessionKey, year);

    // 取得當年度已休時數
    fetchDayOff(userId, sessionKey, year);

    // 送出請假申請
    $("#submit").on("click", submitLeaveRequest);

    // 載入導覽列
    $("#navbar-container").load("../employee/navbar.html");
});

/**
 * 取得特休假總時數
 */
function fetchQuota(userId, sessionKey, year, month) {
    $.ajax({
        url: "http://eucan.ddns.net:3000/quota",
        type: "POST",
        dataType: "json",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ account: userId, cookie: sessionKey, year: year})
    }).done(res => {
        console.log("✅ 取得特休假總時數:", res);
        $("#quota").text(`當年度特休假總時數: ${res.quota} (hr)`);
    }).fail(xhr => {
        console.error("❌ 取得特休假總時數失敗:", xhr);
    });
}

/**
 * 取得當年度已休時數
 */
function fetchDayOff(userId, sessionKey, year) {
    $.ajax({
        url: "http://eucan.ddns.net:3000/dayoff",
        type: "POST",
        dataType: "json",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ account: userId, cookie: sessionKey, year: year })
    }).done(res => {
        console.log("✅ 取得已休假時數:", res);
        $("#annual").text(`當年度特休假已休時數: ${res.annual} (hr)`);
    }).fail(xhr => {
        console.error("❌ 取得已休時數失敗:", xhr);
    });
}

/**
 * 送出請假申請
 */
function submitLeaveRequest() {
    const userId = readCookie("id");
    const sessionKey = readCookie("session");

    const startDate = $("#start_day").val();
    const startTime = $("#start_time").val();
    const endDate = $("#end_day").val();
    const endTime = $("#end_time").val();
    const reason = $("#reason").val();
    const leaveType = $("#type").val();

    console.log(leaveType);

    // 檢查時間格式是否正確
    if (!validTime(startTime)) {
        alert("起始時間格式有誤，請重新輸入！");
        return reloadPage();
    }
    if (!validTime(endTime)) {
        alert("結束時間格式有誤，請重新輸入！");
        return reloadPage();
    }

    if (!validType(leaveType)) {
        alert("假別有誤，請重新輸入！");
        return reloadPage();
    }

    const requestData = {
        account: userId,
        cookie: sessionKey,
        type: leaveType,
        start: `${startDate} ${startTime}`,
        end: `${endDate} ${endTime}`,
        reason
    };

    console.log("🚀 發送請假申請:", requestData);

    $.ajax({
        url: "http://eucan.ddns.net:3000/request",
        type: "POST",
        dataType: "text", // 設為 text，讓我們可以手動解析 JSON
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify(requestData)
    }).done(res => {
        console.log("✅ 請假申請成功:", res);
        try {
            alert("已發送請假申請");
        } catch (e) {
            console.error("⚠️ JSON 解析失敗:", e);
            alert("已發送請假申請");
        }
        reloadPage();
    }).fail(xhr => {
        console.error("❌ 請假申請失敗:", xhr);
        alert(`請求失敗，錯誤代碼：${xhr.status}`);
        reloadPage();
    });
}

/**
 * 驗證時間格式是否符合規範 (08:30 - 17:30, 只允許整點與半點)
 */
function validTime(time) {
    const [hour, minute] = time.split(":").map(Number);
    if (hour < 8 || hour > 17) return false;
    if (hour === 8 && minute === 0) return false;
    return minute === 0 || minute === 30;
}

//檢查是否填寫假別
function validType(type) {
    if (type != "選擇假別") return true;
} 


/**
 * 重新載入頁面
 */
function reloadPage() {
    setTimeout(() => {
        window.location.reload();
    }, 500);
}

/* 範例請假申請 JSON
{
    "account": "david",
    "cookie": "bbbe040c61",
    "type": "sick",
    "start": "2024-08-09",
    "end": "2024-08-10",
    "reason": "test01"
}
*/
