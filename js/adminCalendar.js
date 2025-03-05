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
    const month = String(now.getMonth() + 1);

    $("#upData").on("click" , () =>{
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
        
        
        
    })
    
});
