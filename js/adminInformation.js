$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);

	$("#searching").on("click",()=>{
        $.ajax({
        url: `http://eucan.ddns.net:3000/dayoff`,
        type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            account:userId,
            cookie:sessionKey,
            user:$("#code").val(),
            year:$("#year").val()
        }),
    }).then(res=>{
        console.log(res);
        const data = res.data;
        let annual = $("<td>").addClass("").html(data.annual);
        let personnel = $("<td>").addClass("").html(data.personnel);
        let care = $("<td>").addClass("").html(data.care);
        let sick = $("<td>").addClass("").html(data.sick);
        let wedding = $("<td>").addClass("").html(data.wedding);
        let funeral = $("<td>").addClass("").html(data.funeral);
        let birth = $("<td>").addClass("").html(data.birth);
        let pcheckuo = $("<td>").addClass("").html(data.pcheckuo);
        let miscarriage = $("<td>").addClass("").html(data.miscarriage);
        let paternity = $("<td>").addClass("").html(data.paternity);
        let maternity = $("<td>").addClass("").html(data.maternity);
    });
       
        
    });
});
