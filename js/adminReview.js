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
            <ul class="list-group list-group-flush">
                <li class="list-group-item">流水號:${res["data"][0]["serialnum"]}</li>
                <li class="list-group-item">員工姓名:${res["data"][0]["name"]}</li>
                <li class="list-group-item">假別:${res["data"][0]["type"]}</li>
                <li class="list-group-item">事由:</li>
                <li class="list-group-item">開始時間:${res["data"][0]["start"]}</li>
                <li class="list-group-item">結束時間:${res["data"][0]["end"]}</li>
            </ul>
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <button class="btn btn-success btn-lg" onclick="yes()">核准</button>
                        </div>
                        <div class="col">
                        
                        </div>
                        <div class="col  text-center">
                            <button class="btn btn-danger btn-lg" onclick="no()">拒絕</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col  text-center">
                            <button id="previous" class="btn btn-primary btn-lg" onclick="previous()">上一個</button>
                        </div>
                        <div class="col">

                        </div>
                        <div class="col  text-center">
                            <button id="next" class="btn btn-primary btn-lg" onclick="next()">下一個</button>
                        </div>
                    </div>
                </div>
            </div>
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
            <ul class="list-group list-group-flush">
                <li class="list-group-item">流水號:${res["data"][0]["serialnum"]}</li>
                <li class="list-group-item">員工姓名:${res["data"][0]["name"]}</li>
                <li class="list-group-item">假別:${res["data"][0]["type"]}</li>
                <li class="list-group-item">事由:</li>
                <li class="list-group-item">開始時間:${res["data"][0]["start"]}</li>
                <li class="list-group-item">結束時間:${res["data"][0]["end"]}</li>
            </ul>
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <button class="btn btn-success btn-lg" onclick="yes()">核准</button>
                        </div>
                        <div class="col">
                        
                        </div>
                        <div class="col  text-center">
                            <button class="btn btn-danger btn-lg" onclick="no()">拒絕</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col  text-center">
                            <button id="previous" class="btn btn-primary btn-lg" onclick="previous()">上一個</button>
                        </div>
                        <div class="col">

                        </div>
                        <div class="col  text-center">
                            <button id="next" class="btn btn-primary btn-lg" onclick="next()">下一個</button>
                        </div>
                    </div>
                </div>
            </div>
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
            <ul class="list-group list-group-flush">
                <li class="list-group-item">流水號:${res["data"][0]["serialnum"]}</li>
                <li class="list-group-item">員工姓名:${res["data"][0]["name"]}</li>
                <li class="list-group-item">假別:${res["data"][0]["type"]}</li>
                <li class="list-group-item">事由:</li>
                <li class="list-group-item">開始時間:${res["data"][0]["start"]}</li>
                <li class="list-group-item">結束時間:${res["data"][0]["end"]}</li>
            </ul>
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col text-center">
                            <button class="btn btn-success btn-lg" onclick="yes()">核准</button>
                        </div>
                        <div class="col">
                        
                        </div>
                        <div class="col  text-center">
                            <button class="btn btn-danger btn-lg" onclick="no()">拒絕</button>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-body">
                <div class="container">
                    <div class="row">
                        <div class="col  text-center">
                            <button id="previous" class="btn btn-primary btn-lg" onclick="previous()">上一個</button>
                        </div>
                        <div class="col">

                        </div>
                        <div class="col  text-center">
                            <button id="next" class="btn btn-primary btn-lg" onclick="next()">下一個</button>
                        </div>
                    </div>
                </div>
            </div>
        `
    })
}

function yes(){
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    const serialnum = document.getElementById("number");
    console.log(serialnum.innerHTML);
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
    window.location.reload();
}

function no(){
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    const serialnum = document.getElementById("number");
    console.log(serialnum.innerHTML);
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
    window.location.reload();
}