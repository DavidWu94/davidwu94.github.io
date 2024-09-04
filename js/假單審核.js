$(function() {
    /*const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }*/
    loginCheck(userId,sessionKey);
    var list = document.getElementById("list");
	
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
        list.innerHTML = `
            <table>
                <tr>
                    <th colspan="3" id="number">流水號:${res["date"][0]["serialnum"]}</th>
                </tr>
                <tr>
                    <th></th>
                    <td id="woker_name">${res["date"][0]["id"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="leave">${res["date"][0]["type"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="reason"></td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="time">${res["date"][0]["start"]}-${res["date"][0]["end"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th class="btn"><button class="yes" id="${res["date"][0]["serialnum"]}" onclick="yes()">核准</button></th>
                    <th></th>
                    <th class="btn"><button class="no" id="${res["date"][0]["serialnum"]}" onclick="no()">拒絕</button></th>
                </tr>
                <tr>
                    <th class="btn"><button id="previous" onclick="previous()">上一個</button></th>
                    <th></th>
                    <th class="btn"><button id="next" onclick="next()">下一個</button></th>
                </tr>
            </table>
        `
    });

});

var list = document.getElementById("list");
let i = 0;

function next(){
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
                <th class="btn"><button class="yes" id="${res["date"][i]["serialnum"]}" onclick="yes()">核准</button></th>
                <th></th>
                <th class="btn"><button class="no" id="${res["date"][i]["serialnum"]}" onclick="no()">拒絕</button></th>
            </tr>
            <tr>
                <th class="btn"><button id="previous" onclick="previous()">上一個</button></th>
                <th></th>
                <th class="btn"><button id="next" onclick="next()">下一個</button></th>
            </tr>
        </table>
    `
}



function previous(){
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
                <th class="btn"><button class="yes" id="${res["date"][i]["serialnum"]}" onclick="yes()">核准</button></th>
                <th></th>
                <th class="btn"><button class="no" id="${res["date"][i]["serialnum"]}" onclick="no()">拒絕</button></th>
            </tr>
            <tr>
                <th class="btn"><button id="previous" onclick="previous()">上一個</button></th>
                <th></th>
                <th class="btn"><button id="next" onclick="next()">下一個</button></th>
            </tr>
        </table>
    `
}     