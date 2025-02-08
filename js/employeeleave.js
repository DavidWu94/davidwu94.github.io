/// <reference path="jquery-3.7.1.min.js"/>
$(()=>{
	const now = new Date();
    const year = now.getFullYear();
	const sessionKey = readCookie("session");
	const userId = readCookie("id");
	// // console.log(sessionKey);
	if(sessionKey == null){
		alert("請重新登入");
		window.location = window.location.origin;
	}
	loginCheck(userId,sessionKey);
	$("#start_time").on("change",()=>{
		console.log($("#start_time").val())
		if(!validTime($("#start_time").val())){
			$("#start_time").val("");
			alert("時間有錯誤，請修正");
			return;
		}
	});
	$("#end_time").on("change",()=>{
		if(!validTime($("#end_time").val())){
			$("#end_time").val("");
			alert("時間有錯誤，請修正");
			return;
		}
	});

	$.ajax({
		url: `http://eucan.ddns.net:3000/quota`,
		type: 'POST',
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify({
            account:userId,
            cookie:sessionKey
        }),
	}).then(res => {
		$("#quota").append("總特休時數:" + res.quota + "(hr)");
	})

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
			year:year
		}),
	}).then(res => {
		$("#annual").append("已請特休時數:" + res.annual + "(hr)");
	})


	$("#submit").on("click",()=>{
		const startDate = `${$("#start_day").val()} ${$("#start_time").val()}`
		const endDate = `${$("#end_day").val()} ${$("#end_time").val()}`
		const reason = $("#reason").val();
		/*console.log({
			account:userId,
			cookie:sessionKey,
			type:$("#type").val(),
			start:startDate,
			end:endDate,
			reason:reason,
		})*/
		$.ajax({
			url: 'http://eucan.ddns.net:3000/request',
			type: 'POST',
			dataType: 'text',
			headers: {
				'Content-Type': 'application/json',
			},
			data: JSON.stringify({
				// "account":"david",
				// "cookie":"bbbe040c61",
				// "type":"sick",
				// "start":"2024-08-09",
				// "end":"2024-08-10"
				// "reason":"test01"
				account:userId,
				cookie:sessionKey,
				type:$("#type").val(),
				start:startDate,
				end:endDate,
				reason:reason,
				
			})
			
		}).done((res) => {
			console.log("請求成功，回應內容:", res);
			try {
				let jsonResponse = JSON.parse(res); // 手動解析 JSON
				alert("已發送請假申請");
			} catch (e) {
				console.error("JSON 解析失敗", e);
				alert("請求成功，但回應格式錯誤");
			}
		}).fail((xhr) => {
			console.log("XHR 內容", xhr);
			alert(`請求失敗，錯誤代碼：${xhr.status}`);
		});
		
	});
});

function validTime(time){
	const T = time.split(":");
	// if(0<=date.getHours()<=8)
	if(8 <= parseInt(T[0]) &&  parseInt(T[0]) <= 17){
		if(T[0]=='08' && T[1]=="00"){
			return false;
		}
		if(T[1]!="00" && T[1]!="30"){
			return false;
		}else{
			return true;
		}
	}else{
		return false;
	}
}