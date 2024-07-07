$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    // console.log(sessionKey);
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
            user:$("#code").val(),
            pwd:$("#pwd").val(),
            mail:$("#email").val(),
            name:$("#name").val(),
            date:$("#joinDate").val(),
            type:"employee",
            mgroup:parseInt($("#mgroup").val())
        }),
    }).then(res=>{
        if(res==null){
            alert("請重新登入");
            window.location = window.location.origin;
        }
        if(res["success"]){
            alert("成功加入帳號");
        }else{
            alert("此帳號已存在");
        }
    });
       
        
    });
});

