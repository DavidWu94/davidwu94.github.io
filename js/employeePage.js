// window.onload = ()=>{
// 	/*
// 	const queryString = window.location.search;
// 	const urlParams = new URLSearchParams(queryString);
// 	const data = urlParams.get('data')
	
// 	if(data===null){
// 		window.location = window.location.origin;
// 	}*/

// 	const cookie = document.cookie;
// 	if(cookie===''){
// 		//Not regular login, send back to login page
// 		window.location = window.location.origin;
// 	}
	
// }

// function newdayoff(){
// 	fetch(`${window.location.origin}/employee/templates/newdayoff.html`)
// 		.then((res)=>res.text().then(text=>{
// 			document.getElementById("full").innerHTML = text;
// 		}))
// }

// function viewData(){
// 	fetch(`${window.location.origin}/employee/templates/viewdata.html`)
// 		.then((res)=>res.text().then(text=>{
// 			document.getElementById("full").innerHTML = text;
// 		}))
// }
// function goback(){
// 	fetch(`${window.location.origin}/employee/templates/employeeTemp.html`)
// 		.then((res)=>res.text().then(text=>{
// 			document.getElementById("full").innerHTML = text;
// 		}))
// }

// /**
//  * 
//  * @param {string} searchName 
//  */
// function getCookie(searchName){
// 	let decodedCookie = decodeURIComponent(document.cookie);
// 	// decodedCookie.s
// }

$(()=>{
	// const sessionKey = readCookie("session");
	// const userId = readCookie("id");
	// // console.log(sessionKey);
	// if(sessionKey == null){
	// 	alert("請重新登入");
	// 	window.location = window.location.origin;
	// }
	// loginCheck(userId,sessionKey);
	$("#newdayoff").on('click',()=>{
		window.location = `${window.location.origin}/employee/newdayoff.html`;
	});
});