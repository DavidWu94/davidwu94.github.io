$(()=>{
	/*const sessionKey = readCookie("session");
	const userId = readCookie("id");
	// // console.log(sessionKey);
	if(sessionKey == null){
		alert("請重新登入");
		window.location = window.location.origin;
	}*/
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
	$("#submit").on("click",()=>{
		const startDate = `${$("#start_day").val()} ${$("#start_time").val()}`
		const endDate = `${$("#end_day").val()} ${$("#end_time").val()}`
		const a = caculateTime(startDate,endDate);
		alert(`總請假時數: ${a} 小時`);
		// $.ajax({
		// 	url: 'http://eucan.ddns.net:3000/request',
		// 	type: 'POST',
		// 	dataType: 'json',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	},
		// 	data: JSON.stringify({
		// 		// "account":"david",
		// 		// "cookie":"bbbe040c61",
		// 		// "type":"sick",
		// 		// "start":"2024-08-09",
		// 		// "end":"2024-08-10"
		// 		account:userId,
		// 		cookie:sessionKey,
		// 		type:$("#type").val(),
		// 		start:startDate,
		// 		end:endDate,
		// 		totalTime:a
		// 	}),
		// }).then(res=>{
		// 	alert("已發送請假審核");
		// })
	});
});

function caculateTime(time1,time2){
	const date1 = new Date(Date.parse(time1));
	const date2 = new Date(Date.parse(time2));
	const spl = [date1.getHours()>12?1:0,date2.getHours()>12?1:0];
	console.log(spl)
	const n = date2.getDay()-date1.getDay();
	const sum = spl[0]+spl[1];
	var timeElapse = (date2.getTime()-date1.getTime())/1000/60/60;
	if(n==0){
		// same day
		switch(sum){
			case 0:
				return timeElapse>3?4:timeElapse;
				// break;
			case 1:
				if(date1.getHours()==8){
					timeElapse += 0.5
				}
				return (timeElapse-1.5);
				// break;
			case 2:
				return timeElapse;
		}
	}else{
		switch(sum){
			case 0:
				if(date2.getHours()==12)
					timeElapse+=0.5;
				if(date1.getHours()==8){
					return timeElapse-16*(n);
				}else{
					return timeElapse-16.5*(n);
				}
			case 1:
				if(spl[0]==0){
					return timeElapse-16*n-1.5+(date1.getHours()==8?0.5:0);
				}else{
					return timeElapse-15*n-1.5*(n-1)+(date2.getHours()==12?0.5:0);
				}
			case 2:
				return timeElapse-16*n;
		}
	}
}

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