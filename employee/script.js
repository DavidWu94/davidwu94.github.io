window.onload = ()=>{
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const data = urlParams.get('data')
	/*
	if(data===null){
		window.location = window.location.origin;
	}*/
}

function newdayoff(){
	fetch(`${window.location.origin}/employee/templates/newdayoff.html`)
		.then((res)=>res.text().then(text=>{
			document.getElementById("full").innerHTML = text;
		}))
}

function viewData(){
	fetch(`${window.location.origin}/employee/templates/viewdata.html`)
		.then((res)=>res.text().then(text=>{
			document.getElementById("full").innerHTML = text;
		}))
}
function goback(){
	window.location = `${window.location.origin}/employee/employee.html`;
}
