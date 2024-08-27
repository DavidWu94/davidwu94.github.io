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
        let i = 0;

        list.innerHTML = `
            <table>
                <tr>
                    <th colspan="3" id="number">流水號:${res["date"][i]["serialnum"]}</th>
                </tr>
                <tr>
                    <th></th>
                    <td id="woker_name">${res["date"][i]["id"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="leave">${res["date"][i]["type"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="reason"></td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="time">${res["date"][i]["start"]}-${res["date"][i]["end"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th class="btn"><button class="yes" id="${res["date"][i]["serialnum"]}" onclick="核准()">核准</button></th>
                    <th></th>
                    <th class="btn"><button class="no" id="${res["date"][i]["serialnum"]}" onclick="拒絕()">拒絕</button></th>
                </tr>
                <tr>
                    <th class="btn"><button id="previous" onclick="上一個()">上一個</button></th>
                    <th></th>
                    <th class="btn"><button id="next" onclick="下一個()">下一個</button></th>
                </tr>
            </table>
        `

        function 下一個(){
            a += 1;
            list.innerHTML = `
                <table>
                    <tr>
                        <th colspan="3" id="number">流水號:${res["date"][i]["serialnum"]}</th>
                    </tr>
                    <tr>
                        <th></th>
                        <td id="woker_name">${res["date"][i]["id"]}</td>
                        <th></th>
                    </tr>
                    <tr>
                        <th></th>
                        <td id="leave">${res["date"][i]["type"]}</td>
                        <th></th>
                    </tr>
                    <tr>
                        <th></th>
                        <td id="reason"></td>
                        <th></th>
                    </tr>
                    <tr>
                        <th></th>
                        <td id="time">${res["date"][i]["start"]}-${res["date"][i]["end"]}</td>
                        <th></th>
                    </tr>
                    <tr>
                        <th class="btn"><button class="yes" id="${res["date"][i]["serialnum"]}" onclick="核准()">核准</button></th>
                        <th></th>
                        <th class="btn"><button class="no" id="${res["date"][i]["serialnum"]}" onclick="拒絕()">拒絕</button></th>
                    </tr>
                    <tr>
                        <th class="btn"><button id="previous" onclick="上一個()">上一個</button></th>
                        <th></th>
                        <th class="btn"><button id="next" onclick="下一個()">下一個</button></th>
                    </tr>
                </table>
            `



            function 上一個(){
                a -= 1;
                list.innerHTML = `
                    <table>
                        <tr>
                            <th colspan="3" id="number">流水號:${res["date"][i]["serialnum"]}</th>
                        </tr>
                        <tr>
                            <th></th>
                            <td id="woker_name">${res["date"][i]["id"]}</td>
                            <th></th>
                        </tr>
                        <tr>
                            <th></th>
                            <td id="leave">${res["date"][i]["type"]}</td>
                            <th></th>
                        </tr>
                        <tr>
                            <th></th>
                            <td id="reason"></td>
                            <th></th>
                        </tr>
                        <tr>
                            <th></th>
                            <td id="time">${res["date"][i]["start"]}-${res["date"][i]["end"]}</td>
                            <th></th>
                        </tr>
                        <tr>
                            <th class="btn"><button class="yes" id="${res["date"][i]["serialnum"]}" onclick="核准()">核准</button></th>
                            <th></th>
                            <th class="btn"><button class="no" id="${res["date"][i]["serialnum"]}" onclick="拒絕()">拒絕</button></th>
                        </tr>
                        <tr>
                            <th class="btn"><button id="previous" onclick="上一個()">上一個</button></th>
                            <th></th>
                            <th class="btn"><button id="next" onclick="下一個()">下一個</button></th>
                        </tr>
                    </table>
                `
        }
    }     
        
        
    });
       
        
    });


    function 核准(){
        
        let id = document.getElementById("id");

    }


    function 拒絕(){

        let id = document.getElementById("id");

    }

});