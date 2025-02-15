$(function() {
    // 取得當前年分
    const now = new Date();
    const years = now.getFullYear();
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    console.log(userId);

    if(sessionKey == null){
        alert("請重新登入");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);
	
    information (years)

    $("#searching").on("click", () => {
        information ($("#date").val())
    })
    
    function information (year) {
        $("#quota td, #year td, #annual td, #personal td, #care td, #sick td, #wedding td, #funeral td, #birth td, #pcheckup td, #miscarriage td, #paternity td, #maternity td").remove();
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
                year:year
            }),
        }).then(res=>{
            console.log(res);
            

            let yearValue = $("<td>").addClass("text-end").html(((res.month / 12) + res.years).toFixed(2) + " 年");
            let quota = $("<td>").addClass("text-end").html(res.quota + "(hr)");
            $("#quota").append(quota);
            $("#year").append(yearValue);

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
                sick: "已請普通傷病假",
                wedding: "已請婚假",
                funeral: "已請喪假",
                care: "已請家庭照顧假",
                birth: "已請分娩假",
                pcheckup: "已請產檢假",
                miscarriage: "已請流產假",
                paternity: "已請陪產假",
                maternity: "已請產假"
            };
                
            Object.keys(leaveTypes).forEach(type => {
                // 動態生成資料並附加到對應的 `<tr>` 中
                let cell = $("<td>").addClass("text-end").html(res[type]);
                $(`#${type}`).append(cell);
            });
                
        });
    }


});
