$(function() {
    // 取得當前年分
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
        
        const data = res.data;
        if (!Array.isArray(data)) {
            console.error("API 回傳的 data 不是陣列", data);
            alert("資料格式錯誤，請聯繫管理員！");
            return;
        }

        const fragmentWait = document.createDocumentFragment();
        const fragmentApprove = document.createDocumentFragment();
        const fragmentReject = document.createDocumentFragment();

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
                fragmentReject.appendChild(cardBox[0]);
            } else if (state === 0) {
                fragmentWait.appendChild(cardBox[0]);
            } else {
                fragmentApprove.appendChild(cardBox[0]);
            }
        });

        // 確保目標容器存在
        const cardBodyWait = $("#card-body-wait").empty();
        const cardBodyApprove = $("#card-body-approve").empty();
        const cardBodyReject = $("#card-body-reject").empty();

        cardBodyWait.append(fragmentWait);
        cardBodyApprove.append(fragmentApprove);
        cardBodyReject.append(fragmentReject);
    })
    .fail((jqXHR, textStatus, errorThrown) => {
        console.error("請求失敗：", textStatus, errorThrown);
        console.log("伺服器回應：", jqXHR.responseText);
        alert("資料加載失敗，請稍後再試！");
    });
});
