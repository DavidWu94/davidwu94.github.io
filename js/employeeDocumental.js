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
            year:year
        }),
    }).then(res => {
        console.log(res);
        const data = res.data;
        console.log(data);

        
        const fragmentWait = $(document.createDocumentFragment());
        const fragmentApprove = $(document.createDocumentFragment());
        const fragmentReject = $(document.createDocumentFragment());

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

            if(d.state == -1){
                fragmentReject.append(cardBox);
            }
            else if (d.state == 0) {
                fragmentWait.append(cardBox);
            } 
            else {
                fragmentApprove.append(cardBox);
            }

        });

        $("#card-body-wait").empty().append(fragmentWait);
        $("#card-body-approve").empty().append(fragmentApprove);
        $("#card-body-reject").empty().append(fragmentReject);
    })
    
});
