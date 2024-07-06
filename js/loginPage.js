
$(function() {
	$("#login").on("click",function(){
		$.ajax({
			url: 'http://eucan.ddns.net:3000/login',
			type: 'POST',
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				account:$("#code").val(),
				pwd:$("#pw").val(),
				cookie:readCookie("session")
			}),
		}).then(res=>{
			// console.log(res);
			document.cookie = `session=${res["sessionKey"]};`;
			window.location = `${window.location.origin}/${res["accountType"]=="employee"?"employee/employee.html":res["accountType"]=="admin"?"admin/admin.html":""}`
		}).catch(rej=>{
			alert("帳號或密碼錯誤");
		});
	});
});