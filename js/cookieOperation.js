function cookieToObj(){
	const cookieString = document.cookie;
	var cookieData = {}
	cookieString.split(/; ?/gm).forEach((val,i,cookieList)=>{
        if(val=="") return;
		let a = val.split("=");
		cookieData[a[0]] = a[1];
	});
    return cookieData;
}


function readCookie(key){
    const cookieData = cookieToObj();
	if(cookieData[key] == undefined){
		return null;
	}else{
		return cookieData[key];
	}
}

function updateCookie(cookieData){
    var listCookie = [];
    for(let k in cookieData){
         document.cookie = `${k}=${cookieData[k]}`;
    }
}

function addCookie(key,val){
    var cookieData = cookieToObj();
    cookieData[key] = val;
    console.log(cookieData)
    updateCookie(cookieData);
}

function deleteCookie(key){
    var cookieData = cookieToObj();
    cookieData[key] = '';
	updateCookie(cookieData);
}
