$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);
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
        console.log(res["data"].length);
        var list = document.getElementById("list");
        list.innerHTML = `
            <table>
                <tr>
                    <th colspan="3" id="number">流水號:${res["data"][0]["serialnum"]}</th>
                </tr>
                <tr>
                    <th></th>
                    <td id="woker_name">${res["data"][0]["id"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="leave">${res["data"][0]["type"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="reason"></td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="time">${res["data"][0]["start"]}-${res["data"][0]["end"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th class="btn"><button onclick="yes()">核准</button></th>
                    <th></th>
                    <th class="btn"><button onclick="no()">拒絕</button></th>
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

var i = 0;
console.log(i);

function next(){
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
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
        i += 1;
        console.log(i);
        list.innerHTML = `
            <table>
                <tr>
                    <th colspan="3" id="number">流水號:${res["data"][i]["serialnum"]}</th>
                </tr>
                <tr>
                    <th></th>
                    <td id="woker_name">${res["data"][i]["id"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="leave">${res["data"][i]["type"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="reason"></td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="time">${res["data"][i]["start"]}-${res["data"][i]["end"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th class="btn"><button onclick="yes()">核准</button></th>
                    <th></th>
                    <th class="btn"><button onclick="no()">拒絕</button></th>
                </tr>
                <tr>
                    <th class="btn"><button id="previous" onclick="previous()">上一個</button></th>
                    <th></th>
                    <th class="btn"><button id="next" onclick="next()">下一個</button></th>
                </tr>
            </table>
        `
    })
}

function previous(){
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
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
        i -= 1;
        console.log(i);
        list.innerHTML = `
            <table>
                <tr>
                    <th colspan="3" id="number">流水號:${res["data"][i]["serialnum"]}</th>
                </tr>
                <tr>
                    <th></th>
                    <td id="woker_name">${res["data"][i]["id"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="leave">${res["data"][i]["type"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="reason"></td>
                    <th></th>
                </tr>
                <tr>
                    <th></th>
                    <td id="time">${res["data"][i]["start"]}-${res["data"][i]["end"]}</td>
                    <th></th>
                </tr>
                <tr>
                    <th class="btn"><button onclick="yes()">核准</button></th>
                    <th></th>
                    <th class="btn"><button onclick="no()">拒絕</button></th>
                </tr>
                <tr>
                    <th class="btn"><button id="previous" onclick="previous()">上一個</button></th>
                    <th></th>
                    <th class="btn"><button id="next" onclick="next()">下一個</button></th>
                </tr>
            </table>
        `
    })
}

function yes(){
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    const serialnum = document.getElementById("number");
    console.log(serialnum);
    /*
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
            num: serialnum,
            permit: 1,
        }),
    })
        */
    next();
}
/*
function no(){
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
            num: serialnum,
            permit: 0,
        }),
    })
    next();
}*/