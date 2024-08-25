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
        function 下一個(){
            a += 1;
            console.log(a);
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
                            <th class="btn"><button class="yes" id="0" onclick="核准()">核准</button></th>
                            <th></th>
                            <th class="btn"><button class="no" id="0" onclick="拒絕()">拒絕</button></th>
                        </tr>
                        <tr>
                            <th class="btn"><button id="previous" onclick="上一個()">上一個</button></th>
                            <th></th>
                            <th class="btn"><button id="next" onclick="下一個()">下一個</button></th>
                        </tr>
                    </table>
            `
    
    }
    
    
    
    function 上一個(){
        a -= 1;
            console.log(a);
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
                            <th class="btn"><button class="yes" id="0" onclick="核准()">核准</button></th>
                            <th></th>
                            <th class="btn"><button class="no" id="0" onclick="拒絕()">拒絕</button></th>
                        </tr>
                        <tr>
                            <th class="btn"><button id="previous" onclick="上一個()">上一個</button></th>
                            <th></th>
                            <th class="btn"><button id="next" onclick="下一個()">下一個</button></th>
                        </tr>
                    </table>
            `
    }
        
    });
       
        
    });
});