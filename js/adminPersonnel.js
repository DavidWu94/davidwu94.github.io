$(function () {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if (sessionKey == null) {
        alert("請重新登入！");
        window.location = window.location.origin;
    }

    loginCheck(userId, sessionKey);

    $.ajax({
        url: `http://eucan.ddns.net:3000/users`,
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            account: userId,
            cookie: sessionKey,
        }),
    }).then((res) => {
        let data = res.data;

        // 排序資料
        data.sort((a, b) => a.id.localeCompare(b.id, 'zh-Hant'));

        let currentPage = 0; // 當前頁碼
        const itemsPerPage = 10; // 每頁顯示的項目數

        // 初始化頁面
        displayPage(currentPage);

        // 分頁顯示
        function displayPage(page) {
            const start = page * itemsPerPage;
            const end = start + itemsPerPage;
            const pageData = data.slice(start, end);

            // 清空表格內容
            $('#table').empty();

            pageData.forEach((d) => {
                const tableRow = $("<tr>");

                tableRow.append(
                    $("<td>").html(d.id),
                    $("<td>").html(d.pwd),
                    $("<td>").html(d.name),
                    $("<td>").html(d.joinTime),
                    $("<td>").html(d.email),
                    $("<td>").html(d.mgroup === 1 ? "CAT" : d.mgroup === 0 ? "JEFF" : ""),
                    $("<td>").html(d.permit === 1 ? "須審核" : d.permit === 0 ? "無須審核" : ""),
                    $("<td>")
                        .append(
                            $("<button>")
                                .html("刪除員工")
                                .click(() => deleteUser(d.id))
                        )
                );

                $('#table').append(tableRow);
            });

            // 更新分頁按鈕狀態
            updatePaginationButtons();
        }

        // 更新分頁按鈕狀態
        function updatePaginationButtons() {
            $('#prevPage').prop('disabled', currentPage === 0);
            $('#nextPage').prop('disabled', (currentPage + 1) * itemsPerPage >= data.length);
            $('#pageInfo').text(`目前在第 ${currentPage + 1} 頁，共 ${Math.ceil(data.length / itemsPerPage)} 頁`);
        }

        // 下一頁
        $('#nextPage').click(() => {
            if ((currentPage + 1) * itemsPerPage < data.length) {
                currentPage++;
                displayPage(currentPage);
            }
        });

        // 上一頁
        $('#prevPage').click(() => {
            if (currentPage > 0) {
                currentPage--;
                displayPage(currentPage);
            }
        });

        // 刪除用戶
        function deleteUser(id) {
            $.ajax({
                url: `http://eucan.ddns.net:3000/delete`,
                type: 'POST',
                dataType: 'json',
                headers: {
                    'Content-Type': 'application/json',
                },
                data: JSON.stringify({
                    account: userId,
                    cookie: sessionKey,
                    user: id,
                }),
            }).then(() => {
                // 從資料中移除該用戶並重新顯示
                data = data.filter((item) => item.id !== id);
                alert("刪除成功！");
                displayPage(currentPage);
            });
        }
    });
});
