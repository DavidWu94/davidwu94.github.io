$(function () {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (sessionKey == null) {
        alert("請重新登入！");
        window.location = window.location.origin;
    }

    loginCheck(userId, sessionKey);

    $("#searching").on("click", () => {
        // 清空表格中的舊數據
        $("#quota td, #year td, #annual td, #personal td, #care td, #sick td, #wedding td, #funeral td, #birth td, #pcheckup td, #miscarriage td, #paternity td, #maternity td").remove();

        // 取得員工編號
        const userCode = $("#code").val();
        const year = $("#date").val();

        if (!userCode) {
            alert("請輸入員工編號！");
            return;
        }

        // 第一次 AJAX 請求：取得特休時數與年資
        $.ajax({
            url: `http://eucan.ddns.net:3000/quota`,
            type: "POST",
            dataType: "json",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                account: userId,
                cookie: sessionKey,
                user: userCode,
                year: year,
            }),
        }).then((res) => {
            console.log(res);

            let yearValue = $("<td>").addClass("text-end").html(((res.month / 12) + res.years).toFixed(2) + " 年");
            let quotaValue = $("<td>").addClass("text-end").html(res.quota + "(hr)");

            $("#year").append(yearValue);
            $("#quota").append(quotaValue);

            // 第二次 AJAX 請求：取得請假資訊
            return $.ajax({
                url: `http://eucan.ddns.net:3000/dayoff`,
                type: "POST",
                dataType: "json",
                headers: {
                    "Content-Type": "application/json",
                },
                data: JSON.stringify({
                    account: userId,
                    cookie: sessionKey,
                    user: userCode,
                    year: year,
                }),
            });
        }).then((res) => {
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
                maternity: "已請產假",
            };

            Object.keys(leaveTypes).forEach(type => {
                let cell = $("<td>").addClass("text-end").html(res[type] || "0");
                $(`#${type}`).append(cell);
            });

        }).catch((err) => {
            console.error("請求錯誤：", err);
            alert("請求失敗，請檢查員工編號是否正確或稍後再試！");
        });
    });
});
