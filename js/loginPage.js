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
			// window.location = `${window.location.origin}/${res["type"]=="employee"?"employee/employee.html":res["type"]=="admin"?"admin/admin.html":""}`
		});
	});
});