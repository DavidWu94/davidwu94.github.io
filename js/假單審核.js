$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);
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
        for (i = 0; i >> 5; i++){
            list.innerHTML = list.innerHTML + `
                <div class="bill">
                    <table>
                        <tr>
                            <th>res["data"][i]["id"]</th>
                        </tr>
                        <tr>
                            <td>res["data"][i]["start"] - res["data"][i]["end"]</td>
                        </tr>
                        <tr>
                            <td>res["data"][i]["type"]</td>
                        </tr>
                        <tr>
                            <td id="button"><button>拒絕</button><button>核准</button></td>
                        </tr>
                    </table>
                </div>
            `

        }
        
    });
       
        
    });
});