$(function () {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey) {
        alert("請重新登入！");
        window.location = window.location.origin;
    }

    loginCheck(userId, sessionKey);
    $("#navbar-container").load("../admin/navbar.html"); // 載入導覽列

    let data = []; // 儲存 API 回傳的資料
    let currentPage = 0;
    const itemsPerPage = 10;

    // **初始化與搜尋資料**
    function fetchData() {
        $.ajax({
            url: "http://eucan.ddns.net:3000/approved",
            type: "POST",
            dataType: "json",
            headers: { "Content-Type": "application/json" },
            data: JSON.stringify({
                account: userId,
                cookie: sessionKey,
                user: $("#code").val(),
                year: $("#year").val(),
                limit: itemsPerPage
            }),
        }).then(res => {
            if (!res || !res.data || res.data.length === 0) {
                data = [];
                $("#table").html("<tr><td colspan='8'>沒有符合條件的資料</td></tr>");
                $("#pageInfo").text("目前無資料");
            } else {
                data = res.data;
                currentPage = 0; // 重置頁碼
                displayPage(currentPage);
            }
            updatePagination();
        }).fail(err => {
            console.error("❌ 資料獲取失敗:", err);
            alert("查詢失敗，請稍後再試！");
        });
    }

    // **顯示表格**
    function displayPage(page) {
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = data.slice(start, end);

        $("#table").empty(); // 清空表格
        if (pageData.length === 0) {
            $("#table").html("<tr><td colspan='8'>沒有符合條件的資料</td></tr>");
            return;
        }

        pageData.forEach(d => {
            const tableTr = $("<tr>").append(
                $("<td>").text(d.serialnum),
                $("<td>").text(d.name),
                $("<td>").text(d.type),
                $("<td>").text(d.start),
                $("<td>").text(d.end),
                $("<td>").text(d.totalTime),
                $("<td>").text(d.reason),
                $("<td>").append(
                    $("<button>", { text: "刪除", click: () => cardDelete(d.serialnum) }),
                    $("<button>", { text: "修改", click: () => cardRevise(d.serialnum) })
                )
            );
            $("#table").append(tableTr);
        });

        updatePagination();
    }

    function cardDelete(serialnum) {
        alert(`刪除功能開發中 (ID: ${serialnum})`);
    }

    function cardRevise(serialnum) {
        alert(`修改功能開發中 (ID: ${serialnum})`);
    }

    // **更新分頁按鈕**
    function updatePagination() {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        $("#pageInfo").text(totalPages > 0 ? `目前在第 ${currentPage + 1} 頁，共 ${totalPages} 頁` : "目前無資料");

        $("#prevPage").prop("disabled", currentPage === 0);
        $("#nextPage").prop("disabled", (currentPage + 1) * itemsPerPage >= data.length);
    }

    // **分頁按鈕**
    $("#prevPage").click(() => {
        if (currentPage > 0) {
            currentPage--;
            displayPage(currentPage);
        }
    });

    $("#nextPage").click(() => {
        if ((currentPage + 1) * itemsPerPage < data.length) {
            currentPage++;
            displayPage(currentPage);
        }
    });

    // **搜尋按鈕**
    $("#searching").click(fetchData);

    // 頁面載入時先抓取資料
    fetchData();
});
