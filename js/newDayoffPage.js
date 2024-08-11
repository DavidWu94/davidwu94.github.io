$(()=>{
	const sessionKey = readCookie("session");
	const userId = readCookie("id");
	// console.log(sessionKey);
	if(sessionKey == null){
		alert("請重新登入");
		window.location = window.location.origin;
	}
	loginCheck(userId,sessionKey);
    document.getElementById("acc").value = userId;
    document.getElementById("sess").value = sessionKey;
	// $("#acc").val() = userId;
    // $("#sess").val() = sessionKey;
});