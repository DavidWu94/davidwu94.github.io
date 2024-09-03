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
        console.log(res["date"][i]["serialnum"])

        function 下一個(){
            console.log(res["date"][i]["id"])
        }

        function 上一個(){
            console.log(res["date"][i]["type"])
        }
        
            
    }     
        
        
    );
       
        
    });
});