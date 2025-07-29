$(function() {
    // 取得當前年分
    const now = new Date();
    const years = now.getFullYear();
    const month = now.getMonth() + 1; // 月份從0開始計算，所以需要加1
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    console.log(userId);

    if(sessionKey == null){
        alert("請重新登入");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);
	
    information (years, month);

    $("#searching").on("click", () => {
        information ($("#date").val(), $("#month").val())
    })
    
    function information (year, month) {
        $.ajax({
            url: `http://eucan.ddns.net:3000/sync`,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                account:userId,
                cookie:sessionKey,
                year:year,
                user:userId
            }),
        }).then(res=>{
            console.log(res);
        })
        $("#quota td, #year td, #annual td, #personal td, #care td, #sick td, #wedding td, #funeral td, #birth td, #pcheckup td, #miscarriage td, #paternity td, #maternity td, #official td, #typhoon td").remove();

        $("#joinTime h2").remove();

        $.ajax({
            url: `http://eucan.ddns.net:3000/quota`,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                account:userId,
                cookie:sessionKey,
                year:year,
                month:month,
            }),
        }).then(res=>{
            console.log(res);
            
            const yeardata = (res.month / 12).toFixed(2);
            if (res.year >= 1) {
                yeardata += res.year;
            }
            let yearValue = $("<td>").addClass("text-end").html(yeardata + " 年");
            let quota = $("<td>").addClass("text-end").html(res.quota + "(hr)");
            let joinTime = $("<h2>").addClass("").html("到職日:" + res.joinTime);

            $("#quota").append(quota);
            $("#year").append(yearValue);
            $("#joinTime").append(joinTime);

        })
        $.ajax({
            url: `http://eucan.ddns.net:3000/dayoff`,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                account:userId,
                cookie:sessionKey,
                year:year
            }),
        }).then(res=>{
            console.log(res);
            const leaveTypes = {
                annual: "已請特休假",
                personal: "已請事假",
                sick: "已請病假",
                wedding: "已請婚假",
                funeral: "已請喪假",
                care: "已請家庭照顧假",
                birth: "已請分娩假",
                pcheckup: "已請產檢假",
                miscarriage: "已請流產假",
                paternity: "已請陪產假",
                maternity: "已請產假",
                official: "已請公假",
                typhoon: "停班停課",
            };
                
            Object.keys(leaveTypes).forEach(type => {
                // 動態生成資料並附加到對應的 `<tr>` 中
                let cell = $("<td>").addClass("text-end").html(res[type]);
                $(`#${type}`).append(cell);
            });
                
        });
    }


});

$(function () {
    $("#navbar-container").load("../employee/navbar.html");
});