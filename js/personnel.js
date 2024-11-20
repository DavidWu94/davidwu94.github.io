$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);
    $.ajax({
        url: `http://eucan.ddns.net:3000/users`,
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            account:userId,
            cookie:sessionKey,
        }),
    }).then(res=>{
        const data = res.data;
        console.log(data);

        data.sort(function (a, b) {
            var nameA = a.id.toUpperCase(); // ignore upper and lowercase
            var nameB = b.id.toUpperCase(); // ignore upper and lowercase
            if (nameA < nameB) {
              return -1;
            }
            if (nameA > nameB) {
              return 1;
            }
            // names must be equal
            return 0;
        });

        let currentPage = 0; // 目前頁數，從第 0 頁開始
        const itemsPerPage = 10; // 每頁顯示 10 筆資料
        
        // 顯示特定頁數的資料
        function displayPage(page) {

            // 計算起始和結束索引
            const start = page * itemsPerPage;
            const end = start + itemsPerPage;
      
            // 清空目前顯示內容
            $('#table').empty();
      
            // 顯示對應頁數的資料
            const pageData = data.slice(start, end);
            for(let d of pageData){
                console.log(d.id);
                let tableBox = $("<tr>").addClass("");
    
                let tableId = $("<td>").addClass("").html(d.id);
                
                let tablePwd = $("<td>").addClass("").html(d.pwd);
            
                let tableName = $("<td>").addClass("c").html(d.name);
    
                let tableJoinTime = $("<td>").addClass("").html(d.joinTime);
    
                let tableEmail = $("<td>").addClass("").html(d.email);
    
                let tableMgroup;
                if(d.mgroup == 1){
                    tableMgroup = $("<td>").addClass("").html("CAT");
                }
                else if(d.mgroup == 0){
                    tableMgroup = $("<td>").addClass("").html("JEFF");
                }
                else{
                    tableMgroup = $("<td>").addClass("").html("");
                }
    
                let tablePermit;
                if(d.permit == 1){
                    tablePermit = $("<td>").addClass("").html("須審核");
                }
                else if(d.permit == 0){
                    tablePermit = $("<td>").addClass("").html("無須審核");
                }
                else{
                    tablePermit = $("<td>").addClass("").html("");
                }

                let tablenext = $("<button>").addClass("button").html("下一頁").click(function() {
                    nextPage();
                    console.log("0");
                });

                tableBox.append(tableId, tablePwd, tableName, tableJoinTime, tableEmail, tableMgroup, tablePermit, tablenext);
                $("#table").append(tableBox);
            }

            // 更新頁面訊息
            $('#pageInfo').text(`Page ${page + 1} of ${Math.ceil(data.length / itemsPerPage)}`);
            }
        
            
        // 更新頁面訊息
        $('#pageInfo').text(`Page ${page + 1} of ${Math.ceil(data.length / itemsPerPage)}`);
      
        // 初始化顯示第一頁資料
        displayPage(currentPage);
          
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
          
      
        //console.log(data);
        /*
        for(let d of data){
            let tableBox = $("<tr>").addClass("");

            let tableId = $("<td>").addClass("").html(d.id);

            let tablePwd = $("<td>").addClass("").html(d.pwd);

            let tableName = $("<td>").addClass("c").html(d.name);

            let tableJoinTime = $("<td>").addClass("").html(d.joinTime);

            let tableEmail = $("<td>").addClass("").html(d.email);

            let tableMgroup;
            if(d.mgroup == 1){
                tableMgroup = $("<td>").addClass("").html("CAT");
            }
            else if(d.mgroup == 0){
                tableMgroup = $("<td>").addClass("").html("JEFF");
            }
            else{
                tableMgroup = $("<td>").addClass("").html("");
            }

            let tablePermit;
            if(d.permit == 1){
                tablePermit = $("<td>").addClass("").html("須審核");
            }
            else if(d.permit == 0){
                tablePermit = $("<td>").addClass("").html("無須審核");
            }
            else{
                tablePermit = $("<td>").addClass("").html("");
            }
            

            tableBox.append(tableId, tablePwd, tableName, tableJoinTime, tableEmail, tableMgroup, tablePermit);

            $("#table").append(tableBox);
        }
        */
        
    });

});