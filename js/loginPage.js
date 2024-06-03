$(function() {
	$("#login").on("click",function(){
		$.ajax({
			url: 'https://eucancorporation.loophole.site/login',
			type: 'POST',
			dataType: 'json',
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				account:$("#code").val(),
				pwd:$("#pw").val()
			}),
		}).then(res=>{
			document.cookie = `session=${res["sessionKey"]};`;
			window.location = `${window.location.origin}/${res["accountType"]=="employee"?"employee/employee.html":res["accountType"]=="admin"?"admin/admin.html":""}`
		});
	});
});