$(function() {
    /*const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }*/
    loginCheck(userId,sessionKey);
    var list = document.getElementById("list");
	$("#refresh").on("click",()=>{
        $.ajax({
        url: `http://eucan.ddns.net:3000/query`,
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
        var list = document.getElementById("list");
        var number = document.getElementById("number");
        var woker_name = document.getElementById("woker_name");
        var leave = document.getElementById("leave");
        var reason = document.getElementById("reason");
        var time = document.getElementById("time");
        var btn_yes = document.querySelector(".yes");
        var btn_no = document.querySelector(".no");
        var previous = document.getElementById("previous");
        var next = document.getElementById("next");
        
        
        
        window.onload = function(){
            var a = 0;
            next.addEventListener("click", function(){
                
                a += 1;
            
                    list.innerHTML = `
                            <table>
                                <tr>
                                    <th colspan="3" id="number">流水號:${a}</th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <td id="woker_name">員工姓名</td>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <td id="leave">假別</td>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <td id="reason">事由</td>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th></th>
                                    <td id="time">2024/12/15/15:00-2024/12/15/18:00</td>
                                    <th></th>
                                </tr>
                                <tr>
                                    <th class="btn"><button class="yes" id="0">核准</button></th>
                                    <th></th>
                                    <th class="btn"><button class="no" id="0">拒絕</button></th>
                                </tr>
                                <tr>
                                    <th class="btn"><button id="previous">上一個</button></th>
                                    <th></th>
                                    <th class="btn"><button id="next">下一個</button></th>
                                </tr>
                            </table>
                `
            })
        }
        
           
    });
       
        
    });
});