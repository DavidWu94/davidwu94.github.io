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

    // 初始化與搜尋資料
    function fetchData() {
        $.ajax({
            url: `http://eucan.ddns.net:3000/approved`,
            type: 'POST',
            dataType: 'json',
            headers: { 'Content-Type': 'application/json' },
            data: JSON.stringify({
                account: userId,
                cookie: sessionKey,
                id: $("#code").val(),
                year: $("#year").val(),
                limit: itemsPerPage
            }),
        }).then(res => {
            data = res.data;
            currentPage = 0; // 重置頁碼
            displayPage(currentPage);
        });
    }

    // **顯示表格**
    function displayPage(page) {
        const start = page * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = data.slice(start, end);

        $("#table").empty(); // 清空表格
        pageData.forEach(d => {
            $("#table").append(`
                <tr>
                    <td>${d.serialnum}</td>
                    <td>${d.name}</td>
                    <td>${d.type}</td>
                    <td>${d.start}</td>
                    <td>${d.end}</td>
                    <td>${d.totalTime}</td>
                    <td>${d.reason}</td>
                </tr>
            `);
        });

        updatePagination();
    }

    // **更新分頁按鈕**
    function updatePagination() {
        const totalPages = Math.ceil(data.length / itemsPerPage);
        $("#pageInfo").text(`目前在第 ${currentPage + 1} 頁，共 ${totalPages} 頁`);

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
