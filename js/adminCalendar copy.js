$(function () {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey) {
        alert("請重新登入！");
        window.location = window.location.origin;
        return;
    }

    loginCheck(userId, sessionKey);

    $("#searching").on("click", function () {
        fetch("http://eucan.ddns.net:3000/calendar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                account: userId,
                cookie: sessionKey,
                year: 2025,
                month: 2
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.blob(); // 解析成二進位 Blob
        })
        .then(blob => {
            const fileName = "calendar.xlsx"; // 預設檔名
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        })
        .catch(error => {
            console.error("❌ 下載失敗：", error);
            alert("下載失敗，請稍後再試！");
        });
        
    });
});
