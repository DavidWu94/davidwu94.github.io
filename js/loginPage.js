$(function() {
	$("#login").on("click",function(){
		$.ajax({
			url: 'http://127.0.0.1:3000/login',
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
			// console.log(res)
			document.cookie = `session=${res["sessionKey"]};`;
			window.location = `${window.location.origin}/${res["type"]=="employee"?"employee/employee.html":res["type"]=="admin"?"admin/admin.html":""}`
		});
	});
});