function getValue() {
    const inputBoxcod = document.getElementById ( 'code');
    const inputBoxpw = document.getElementById ( 'pw');
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
	const receivedData = "NONE";
	window.location = `${window.location.origin}/employee/employee.html?data=${receivedData}`
  }
  