$(function () {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey) {
        alert("請重新登入！");
        window.location = window.location.origin;
        return;
    }

    loginCheck(userId, sessionKey);
    $("#navbar-container").load("../admin/navbar.html");

    let data = [];
    let currentPage = 0;
    const itemsPerPage = 10;

    function loadData() {
        $.ajax({
            url: "http://eucan.ddns.net:3000/approved",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({
                account: userId,
                cookie: sessionKey,
                user: $("#code").val(),
                year: $("#year").val(),
            }),
        }).done(res => {
            data = res?.data?.length ? res.data.sort((a, b) => Number(b.serialnum) - Number(a.serialnum)) : [];

            if ($("#month").val() != "") {
                data = data.filter(d => d.start.substring(5, 7) == $("#month").val());
            }

            currentPage = 0;
            data.length ? displayPage() : showNoData();
            updatePagination();
        }).fail(err => {
            console.error("❌ 資料獲取失敗:", err);
            alert("查詢失敗，請稍後再試！");
        });
    }

    function displayPage() {
        const pageData = data.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage);
        $('#table').html(pageData.map(d => `
            <tr id="${d.serialnum}">
                <td>${d.serialnum}</td>
                <td>${d.name}</td>
                <td id="${d.serialnum}Type">${d.type}</td>
                <td id="${d.serialnum}Start">${d.start}</td>
                <td id="${d.serialnum}End">${d.end}</td>
                <td>${d.totalTime}</td>
                <td id="${d.serialnum}reason">${d.reason}</td>
                <td id="${d.serialnum}Button">
                    <button class="delete-btn" data-id="${d.serialnum}" data-start="${d.start}" data-end="${d.end}" data-type="${d.type}" data-reason="${d.reason}">刪除</button>
                    <button class="revise-btn" data-id="${d.serialnum}" data-start="${d.start}" data-end="${d.end}" data-type="${d.type}" data-reason="${d.reason}">修改</button>
                </td>
            </tr>
        `).join(''));
        updatePagination();
    }

    function showNoData() {
        $("#table").html("<tr><td colspan='8'>沒有符合條件的資料</td></tr>");
        $("#pageInfo").text("目前無資料");
    }

    $(document).on("click", ".delete-btn", function () {
        const serialnum = $(this).data("id");
        const start = $(this).data("start");
        const end = $(this).data("end");
        const type = $(this).data("type");
        const reason = $(this).data("reason");

        $.ajax({
            url: "http://eucan.ddns.net:3000/tmodify",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ account: userId, cookie: sessionKey, serialnum, state: 1, action: 0, type: type, start: start, end: end, reason: reason }),
        }).done(res => {
            console.log("刪除成功", res);
            alert(`刪除成功 (ID: ${serialnum})`);
            loadData();
        }).fail(err => {
            console.error("刪除失敗:", err);
            alert("刪除失敗，請稍後再試！");
        });
    });

    $(document).on("click", ".revise-btn", function () {
        const serialnum = $(this).data("id");
        const start = $(this).data("start");
        const end = $(this).data("end");
        const type = $(this).data("type");
        const reason = $(this).data("reason");
        console.log(reason);

        $(`#${serialnum}Type`).html(`
            <select id="type" class="input">
                <option>${type}</option>
                <option>特休假</option><option>事假</option><option>普通傷病假</option>
                <option>婚假</option><option>喪假</option><option>家庭照顧假</option>
                <option>分娩假</option><option>產檢假</option><option>流產假</option>
                <option>陪產假</option><option>產假</option><option>公假</option>
            </select>
        `);
        $(`#${serialnum}Start`).html(`<input id="startDate" placeholder="${start}" class="input">`);
        $(`#${serialnum}End`).html(`<input id="endDate" placeholder="${end}" class="input">`);
        $(`#${serialnum}reason`).html(`<input id="reason" placeholder="${reason}" class="input">`);
        $(`#${serialnum}Button`).html(`<button class="confirm-revise" data-id="${serialnum}" data-start="${start}" data-end="${end}" data-reason="${reason}">確定修改</button>`);
    });

    $(document).on("click", ".confirm-revise", function () {
        const serialnum = $(this).data("id");
        const newType = $("#type").val();
        const newStart = $("#startDate").val().trim() || $(this).data("start");
        const newEnd = $("#endDate").val().trim() || $(this).data("end");
        const newreason = $("#reason").val().trim() || $(this).data("reason");

        $.ajax({
            url: "http://eucan.ddns.net:3000/tmodify",
            type: "POST",
            dataType: "json",
            contentType: "application/json",
            data: JSON.stringify({ account: userId, cookie: sessionKey, serialnum, state: 1, action: 1, type: newType, start: newStart, end: newEnd, reason: newreason}),
        }).done(res => {
            console.log("修改成功", res);
            alert(`修改成功 (ID: ${serialnum})`);
            loadData();
        }).fail(err => {
            console.error("修改失敗:", err);
            alert("修改失敗，請稍後再試！");
        });

    });

    function updatePagination() {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        $("#pageInfo").text(totalPages > 0 ? `目前第 ${currentPage + 1} 頁，共 ${totalPages} 頁` : "目前無資料");
        $("#prevPage").prop("disabled", currentPage === 0);
        $("#nextPage").prop("disabled", currentPage >= totalPages - 1);
    }

    $("#prevPage").click(() => { if (currentPage > 0) { currentPage--; displayPage(); } });
    $("#nextPage").click(() => { if ((currentPage + 1) * itemsPerPage < data.length) { currentPage++; displayPage(); } });
    $("#searching").click(loadData);
    loadData();
});
