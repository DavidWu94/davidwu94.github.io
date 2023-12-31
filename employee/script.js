window.onload = ()=>{
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);
	const data = urlParams.get('data')
	if(data===null){
		window.location = window.location.origin;
	}
}