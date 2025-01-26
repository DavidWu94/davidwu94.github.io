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

                let tableFunction = $("<td>").addClass("");

                let tableDelete = $("<button>").addClass("").html("刪除員工").click(function() {
                    deleteUser(d.id);
                })

                tableFunction.append(tableDelete);

                tableBox.append(tableId, tablePwd, tableName, tableJoinTime, tableEmail, tableMgroup, tablePermit, tableFunction);
                $("#table").append(tableBox);
            }

            // 更新頁面訊息
            $('#pageInfo').text(`Page ${page + 1} of ${Math.ceil(data.length / itemsPerPage)}`);

            let tableButton = $("<tr>").addClass("");

            let tableButtonTd = $("<td>").addClass("text-center").attr("colspan", 8);

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

});


function deleteUser(id){
    console.log(id);
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    $.ajax({
        url: `http://eucan.ddns.net:3000/delete`,
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            account:userId,
            cookie:sessionKey,
            user:id
        }),
    })
    alert("刪除中");
    window.setTimeout(function (){
        window.location.reload();
    },1000);
}