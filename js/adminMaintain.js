$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");

    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);
	$("#confirm").on("click",()=>{
        let mgroupOption = $("#mgroup option:selected"); // 獲取 mgroup
        let mgroupId = mgroupOption.attr("id"); // 獲取 mgroup 的 id 屬性值
        let reviewOption = $("#review option:selected"); // 獲取review
        let reviewId = reviewOption.attr("id"); // 獲取 review 的 id 屬性值
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
            mgroup:mgroupId,
            permit:reviewId
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

$(function () {
    $("#navbar-container").load("../admin/navbar.html");
});