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
        console.log(data);
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
        
    });

});