function readCookie(key){
	const cookieString = document.cookie;
	var cookieData = {}
	cookieString.split("; ").forEach((val,i,cookieList)=>{
		let a = val.split("=");
		cookieData[a[0]] = a[1];
	});
	if(cookieData[key] == undefined){
		return null;
	}else{
		return cookieData[key];
	}
}

function addCookie(key,val){

}

function deleteCookie(key,val){
	
}
