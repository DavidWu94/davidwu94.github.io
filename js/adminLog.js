$(function () {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (!sessionKey) {
        alert("請重新登入！");
        window.location = window.location.origin;
        return;
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
            }),
        }).then(res => {
            if (!res || !res.data || res.data.length === 0) {
                data = [];
                $("#table").html("<tr><td colspan='8'>沒有符合條件的資料</td></tr>");
                $("#pageInfo").text("目前無資料");
            } else {
                // 根據流水號 `serialnum` 降冪排序 (數字越大排越前面)
                data = res.data.sort((a, b) => Number(b.serialnum) - Number(a.serialnum));
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

        const tableContent = pageData.length
            ? pageData.map(d => `
                <tr>
                    <td>${d.serialnum}</td>
                    <td>${d.name}</td>
                    <td>${d.type}</td>
                    <td>${d.start}</td>
                    <td>${d.end}</td>
                    <td>${d.totalTime}</td>
                    <td>${d.reason}</td>
                    <td>
                        <button onclick="cardDelete(${d.serialnum})">刪除</button>
                        <button onclick="cardRevise(${d.serialnum})">修改</button>
                    </td>
                </tr>
            `).join("")
            : "<tr><td colspan='8'>沒有符合條件的資料</td></tr>";

        $("#table").html(tableContent);
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
            displayPage(--currentPage);
        }
    });

    $("#nextPage").click(() => {
        if ((currentPage + 1) * itemsPerPage < data.length) {
            displayPage(++currentPage);
        }
    });

    // **搜尋按鈕**
    $("#searching").click(fetchData);

    // 頁面載入時先抓取資料
    fetchData();
});
