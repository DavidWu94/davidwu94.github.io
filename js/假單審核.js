$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    // console.log(sessionKey);
    // if(sessionKey == null){
    //     alert("請重新登入1");
    //     window.location = window.location.origin;
    // }
    // loginCheck(userId,sessionKey);
    var list = document.getElementById("list");
	$("#refresh").on("click",()=>{
        $.ajax({
        url: `http://eucan.ddns.net:3000/register`,
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
        for (let i = 0; i == res["data"].length; i++){
            list.innerHTML = list.innerHTML + `
                <div class="bill">
                    <table>
                        <tr>
                            <th>${res["date"][i]["id"]}</th>
                        </tr>
                        <tr>
                            <td>${res["date"][i]["start"]}-${res["date"][i]["end"]}</td>
                        </tr>
                        <tr>
                            <td>${res["date"][i]["type"]}</td>
                        </tr>
                        <tr>
                            <td>${res["date"][i]["serialnum"]}</td>
                        </tr>
                        <tr>
                            <td id="button"><button id="${res["date"][i]["serialnum"]}_no">拒絕</button><button id="${res["date"][i]["serialnum"]}_yes">核准</button></td>
                        </tr>
                    </table>
            `

        }
        
    });
       
        
    });
});