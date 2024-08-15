$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);
	$("#confirm").on("click",()=>{
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
        
    });
       
        
    });
});

