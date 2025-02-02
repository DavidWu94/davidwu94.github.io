$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey) {
        alert("請重新登入");
        window.location = window.location.origin;
        return;
    }

    loginCheck(userId, sessionKey);

    // 顯示加載動畫
    $("#loading").show();

    $.ajax({
        url: "http://eucan.ddns.net:3000/query",
        type: "POST",
        dataType: "json",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({ account: userId, cookie: sessionKey }),
    })
    .done(res => {
        const data = res.data;
        $("#dataLong").html(`<h2 class="dataLong">假單總數: ${data.length}</h2>`);

        if (data.length === 0) {
            $("#card-body").html('<p class="text-center text-muted">目前無待審核的假單</p>');
            return;
        }

        const fragment = $(document.createDocumentFragment());

        data.forEach(d => {
            const cardBox = $("<div>").addClass("card p-3 mb-3 shadow-sm");

            const cardTitle = $("<h5>").addClass("card-title").text(`流水號: ${d.serialnum}`);

            const cardUl = $("<ul>").addClass("list-group list-group-flush list-unstyled")
                .append($("<li>").addClass("card-name").text(`員工姓名: ${d.name}`))
                .append($("<li>").addClass("card-type").text(`請假類別: ${d.type}`))
                .append($("<li>").addClass("card-reason").text(`請假事由: ${d.reason}`))
                .append($("<li>").addClass("card-time-start").text(`開始時間: ${d.start}`))
                .append($("<li>").addClass("card-time-end").text(`結束時間: ${d.end}`));

            const cardLi6 = $("<li>").addClass("card-button mt-2");
            const cardButtonNo = $("<button>").addClass("btn btn-danger me-2").text("拒絕").click(() => handleApproval(d.serialnum, 0));
            const cardButtonYes = $("<button>").addClass("btn btn-success").text("核准").click(() => handleApproval(d.serialnum, 1));

            cardLi6.append(cardButtonNo, cardButtonYes);
            cardUl.append(cardLi6);
            cardBox.append(cardTitle, cardUl);

            fragment.append(cardBox);
        });

        $("#card-body").empty().append(fragment);
    })
    .fail(() => {
        alert("系統錯誤，請稍後再試");
    })
    .always(() => {
        // 隱藏加載動畫
        $("#loading").hide();
    });
});

// 處理假單核准或拒絕
function handleApproval(serialnum, permit) {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    $.ajax({
        url: "http://eucan.ddns.net:3000/permit",
        type: "POST",
        dataType: "json",
        headers: { "Content-Type": "application/json" },
        data: JSON.stringify({
            account: userId,
            cookie: sessionKey,
            num: serialnum,
            permit: permit,
        }),
    })
    .done(() => {
        const message = permit ? "核准成功" : "拒絕成功";

        // 顯示提醒
        setTimeout(() => {
            alert(message);
        }, 100); // 先延遲 0.1 秒再顯示，避免影響 setTimeout

        // 延遲 0.5 秒後重整頁面
        setTimeout(() => {
            window.location.reload();
        }, 500);
    })
    .fail(() => {
        alert("操作失敗，請稍後再試");
    });
}
