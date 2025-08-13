$(function () {
    // 取得當前年分
    const now = new Date();
    const years = now.getFullYear();
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    //console.log(userId);

    if (sessionKey == null) {
        alert("請重新登入");
        window.location = window.location.origin;
    }
    loginCheck(userId, sessionKey);

    information(years, userId);

    $("#searching").on("click", () => {
        information($("#date").val());
    })

    function information(year, userId) {
        $.ajax({
            url: `http://eucan.ddns.net:3000/sync`,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                account: userId,
                cookie: sessionKey,
                user: userId,
                year: year,
                
            }),
        }).then(res => {
            //console.log(res);
        })

        clean();

        $.when(quota(year), dayoff(year))
            .then(function (quota, dayoff) {
                console.log(quota[0]);
                let separate = 0;
                if (quota[0].separate === true) {
                    $.confirm({
                        title: '確認',
                        content: '要查看上半年還是下半年',
                        buttons: {
                            confirm: {
                                text: '上半年',
                                btnClass: 'btn-blue',
                                action: function () {
                                    separate = 0;
                                    $.alert('上半年已選擇');
                                    renderData(separate, quota, dayoff);
                                }
                            },
                            cancel: {
                                text: '下半年',
                                action: function () {
                                    separate = 1;
                                    $.alert('下半年已選擇');
                                    renderData(separate, quota, dayoff);
                                }
                            }
                        }
                    });
                } else {
                    separate = 0;
                    renderData(separate, quota, dayoff);
                }

                function renderData(separate, quota, dayoff) {
                    // Check if data exists and has at least one element
                    const quotaData = quota[0] && quota[0].data && quota[0].data.length > 0 ? quota[0].data[separate] : {};
                    const dayoffData = dayoff[0] && dayoff[0].data && dayoff[0].data.length > 0 ? dayoff[0].data[separate] : {};

                    const inf = {
                        quota: quotaData.quota || 0,
                        years: quotaData.years || 0,
                        month: quotaData.month || 0,
                        joinTime: quotaData.joinTime || "",
                        annual: dayoffData.annual || 0,
                        personal: dayoffData.personal || 0,
                        sick: dayoffData.sick || 0,
                        wedding: dayoffData.wedding || 0,
                        funeral: dayoffData.funeral || 0,
                        care: dayoffData.care || 0,
                        birth: dayoffData.birth || 0,
                        pcheckup: dayoffData.pcheckup || 0,
                        miscarriage: dayoffData.miscarriage || 0,
                        paternity: dayoffData.paternity || 0,
                        maternity: dayoffData.maternity || 0,
                        official: dayoffData.official || 0,
                        typhoon: dayoffData.typhoon || 0,
                    };

                    let yeardata = (inf.month / 12).toFixed(2);
                    if (inf.years >= 1) {
                        yeardata = (parseFloat(yeardata) + Math.trunc(inf.years)).toFixed(2);
                    }
                    let yearValue = $("<td>").addClass("text-end").html(yeardata + " 年");
                    let quotaValue = $("<td>").addClass("text-end").html(inf.quota + "(hr)");
                    let joinTime = $("<h2>").addClass("").html("到職日:" + inf.joinTime);

                    $("#year").append(yearValue);
                    $("#quota").append(quotaValue);
                    $("#joinTime").append(joinTime);

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
                        let cell = $("<td>").addClass("text-end").html(inf[type] || "0");
                        $(`#${type}`).append(cell);
                    });
                }
            })
            .fail(function (textStatus, errorThrown) {
                // 失敗
                alert("請求失敗，請檢查員工編號是否正確或稍後再試！");
                console.error("Request failed:", textStatus, errorThrown);
            });


    }
    function clean() {
        $("#quota td, #year td, #annual td, #personal td, #care td, #sick td, #wedding td, #funeral td, #birth td, #pcheckup td, #miscarriage td, #paternity td, #maternity td, #official td, #typhoon td").remove();
        $("#joinTime h2").remove();
    };
    function quota(year) {
        return $.ajax({
            url: `http://eucan.ddns.net:3000/quota`,
            type: "POST",
            dataType: "json",
            headers: {
                "Content-Type": "application/json",
            },
            data: JSON.stringify({
                account: userId,
                cookie: sessionKey,
                year: year,
            }),
        })
    }
    function dayoff(year) {
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
                year: year,
            }),
        })
    }

});

$(function () {
    $("#navbar-container").load("../employee/navbar.html");
});