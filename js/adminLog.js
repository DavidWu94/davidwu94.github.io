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
            url: `http://eucan.ddns.net:3000/approved`,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                account:userId,
                cookie:sessionKey,
                id:$("#code").val(),
                year:$("#year").val()
            }),
        }).then(res=>{
            const data = res.data;
            console.log(data);

            let currentPage = 0; // 目前頁數，從第 0 頁開始
            const itemsPerPage = 10; // 每頁顯示 10 筆資料
        
            displayPage(currentPage);
            // 顯示特定頁數的資料
            function displayPage(page) {

                // 計算起始和結束索引
                const start = page * itemsPerPage;
                const end = start + itemsPerPage;
        
                // 清空目前顯示內容
                $('#table').empty();
        
                // 顯示對應頁數的資料
                const pageData = data.slice(start, end);
                console.log(pageData);
                for(let d of pageData){
                    console.log(d.serialnum);
                    let tableBox = $("<tr>").addClass("");
        
                    let tableSerialnum = $("<td>").addClass("").html(d.serialnum);

                    let tableName = $("<td>").addClass("").html(d.name);
                    
                    let tableType = $("<td>").addClass("").html(d.type);
                
                    let tableStart = $("<td>").addClass("c").html(d.start);
        
                    let tableEnd = $("<td>").addClass("").html(d.end);

                    let tableTotalTime = $("<td>").addClass("").html(d.totalTime);
        
                    let tableReason = $("<td>").addClass("").html(d.reason);

                    tableBox.append(tableSerialnum, tableName, tableType, tableStart, tableEnd, tableTotalTime, tableReason);
                    $("#table").append(tableBox);
                }

                // 更新頁面訊息
                $('#pageInfo').text(`Page ${page + 1} of ${Math.ceil(data.length / itemsPerPage)}`);

                let tableButton = $("<tr>").addClass("");

                let tableButtonTd = $("<td>").addClass("text-center").attr("colspan", 7);

                let tablenext = $("<button>").addClass("").html("下一個").click(function() {
                    nextPage();
                    console.log("next"); 
                })

                let tablePage = $("<nobr>").addClass("").html("目前在第" + currentPage + "頁");

                let tablePrev = $("<button>").addClass("").html("下一個").click(function() {
                    prevPage();
                    console.log("prev");
                })

                tableButtonTd.append(tablePrev, tablePage, tablenext);
                tableButton.append(tableButtonTd);
                $("#table").append(tableButton);


            }
            
                
            // 更新頁面訊息
            $('#pageInfo').text(`Page ${page + 1} of ${Math.ceil(data.length / itemsPerPage)}`);
            
            //下一頁
            function nextPage(){
                if ((currentPage + 1) * itemsPerPage < data.length) {
                    currentPage++;
                    displayPage(currentPage);
                } 
                else {
                    alert("已經是最後一頁！");
                }
            }  
            
            //上一頁
            function prevPage(){
                if (currentPage > 0) {
                    currentPage--;
                    displayPage(currentPage);
                } 
                else {
                    alert("已經是第一頁！");
                }
            }
        
        });
    })
    

});
