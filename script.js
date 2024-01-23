function getValue() {
    const inputBoxcod = document.getElementById('code');
    const inputBoxpw = document.getElementById('pw');
    const valuecod = inputBoxcod.value;
    const valuepw = inputBoxpw.value;
    const postData = { key: 'value' };
	/*
	fetch('http://localhost:3000/submit', {
	  method: 'POST',
	  headers: {
		'Content-Type': 'application/json'
	  },
	  body: JSON.stringify(postData)
	})
	.then(response => response.json())
	.then(data => console.log(data))
	.catch(error => console.error('Error:', error));
	*/
	const receivedData = {"cat":"employee","user":"123456789","key":"aWc4aS51"};	//testing value
	const receiveCookie = `cat=${receivedData["cat"]};user=${receivedData["user"]};key=${receivedData["key"]};`
	document.cookie = receivedData;
	window.location = `${window.location.origin}/${receivedData["cat"]=="employee"?"employee/employee.html":receivedData["cat"]=="admin"?"admin/admin.html":""}`
}
  