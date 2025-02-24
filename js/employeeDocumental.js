$(function () {
    // 取得當前年份
    const now = new Date();
    const year = now.getFullYear();
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey) {
        alert("請重新登入");
        window.location = window.location.origin;
        return;
    }

    loginCheck(userId, sessionKey);

    // 預設載入當前年份資料
    getData(year);

    // 綁定搜尋按鈕
    $("#search").on("click", () => {
        const selectedYear = $("#year").val();
        getData(selectedYear);
    });

    function getData(year) {
        console.log("查詢年份:", year);
        $.ajax({
            url: "http://eucan.ddns.net:3000/empquery",
            type: "POST",
            dataType: "json",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                account: userId,
                cookie: sessionKey,
                year: year
            }),
        })
        .done(res => {
            console.log("伺服器回應：", res);

            if (!res || !Array.isArray(res.data)) {
                console.error("API 回傳格式錯誤:", res);
                alert("資料格式錯誤，請聯繫管理員！");
                return;
            }

            const data = res.data;
            const fragmentWait = $("<div>");
            const fragmentApprove = $("<div>");
            const fragmentReject = $("<div>");

            data.forEach(d => {
                const cardBox = $("<div>").addClass("card p-3 mb-3 shadow-sm");
                const cardTitle = $("<h5>").addClass("card-title").text(`流水號: ${d.serialnum}`);
                const cardUl = $("<ul>").addClass("list-group list-group-flush list-unstyled")
                    .append($("<li>").addClass("card-name").text(`員工姓名: ${d.name}`))
                    .append($("<li>").addClass("card-type").text(`請假類別: ${d.type}`))
                    .append($("<li>").addClass("card-reason").text(`請假事由: ${d.reason}`))
                    .append($("<li>").addClass("card-time-start").text(`開始時間: ${d.start}`))
                    .append($("<li>").addClass("card-time-end").text(`結束時間: ${d.end}`));

                cardBox.append(cardTitle, cardUl);

                const state = Number(d.state);
                if (state === -1) {
                    fragmentReject.append(cardBox);
                } else if (state === 0) {
                    fragmentWait.append(cardBox);
                } else {
                    fragmentApprove.append(cardBox);
                }
            });

            // 更新畫面
            $("#card-body-wait").empty().append(fragmentWait);
            $("#card-body-approve").empty().append(fragmentApprove);
            $("#card-body-reject").empty().append(fragmentReject);
        })
        .fail((jqXHR, textStatus, errorThrown) => {
            console.error("請求失敗：", textStatus, errorThrown);
            console.log("伺服器回應：", jqXHR.responseText);
            alert("資料加載失敗，請稍後再試！");
        });
    }
});

// 載入導覽列
$(function () {
    $("#navbar-container").load("../employee/navbar.html");
});
