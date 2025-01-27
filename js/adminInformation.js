$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);
	$("#searching").on("click",()=>{

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
                user:$("#code").val()
            }),
        }).then(res=>{
            console.log(res);
            
            let year = $("<td>").addClass("").html("");
            let quota = $("<td>").addClass("text-end").html(res.quota * 24);
            $("#quota").append(quota);

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
                user:$("#code").val(),
                year:2024
            }),
        }).then(res=>{
            console.log(res);
            console.log(res.personnel);
            const leaveTypes = {
                annual: "已請特休假",
                personal: "已請事假",
                care: "已請家庭照顧假",
                sick: "已請普通傷病假",
                wedding: "已請婚假",
                funeral: "已請喪假",
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
    });
});
