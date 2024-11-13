$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);
    $.ajax({
        url: `http://eucan.ddns.net:3000/query`,
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            account:userId,
            cookie:sessionKey,
        }),
    }).then(res=>{
        const data = res.data;
        console.log(data);
        for(let d of data){
            let cardBox = $("<div>").addClass("card");

            let cardTitle = $("<h5>").addClass("card-title").html("流水號: " + d.serialnum);
            
            let cardUl = $("<ul>").addClass("card-ul");

            let cardLi1 = $("<li>").addClass("card-name").html("員工姓名: " + d.name);

            let cardLi2 = $("<li>").addClass("card-type").html("請假類別: " + d.type);

            let cardLi3 = $("<li>").addClass("card-reason").html("請假事由: " + d.reason);

            let cardLi4 = $("<li>").addClass("card-time-start").html("開始時間: " + d.start);

            let cardLi5 = $("<li>").addClass("card-time-start").html("結束時間: " + d.end);

            let cardLi6 = $("<li>").addClass("card-button");

            let cardButtonNo = $("<button>").addClass("No " + d.serialnum).html("拒絕");

            let cardButtonYes = $("<button>").addClass("Yes " + d.serialnum).html("核准");

            cardLi6.append(cardButtonNo, cardButtonYes);
            cardUl.append(cardLi1, cardLi2, cardLi3, cardLi4, cardLi5, cardLi6);
            cardBox.append(cardTitle, cardUl);

            $("#card-body").append(cardBox);
        }
        
    });

});