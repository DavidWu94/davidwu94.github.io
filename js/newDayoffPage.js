$(()=>{
	const sessionKey = readCookie("session");
	const userId = readCookie("id");
	// // console.log(sessionKey);
	// if(sessionKey == null){
	// 	alert("請重新登入");
	// 	window.location = window.location.origin;
	// }
	// loginCheck(userId,sessionKey);
    document.getElementById("acc").value = userId;
    document.getElementById("sess").value = sessionKey;
	// $("#acc").val() = userId;
    // $("#sess").val() = sessionKey;
});


var type = document.getElementById("type");
var start = document.getElementById("start");
var end = document.getElementById("end");
var reason = document.getElementById("reason");
var send = document.getElementById("send");
var list = document.getElementById("list");


send.addEventListener("click",function(){
	list.innerHTML = list.innerHTML + `
		<div class="bill">
                <table>
                    <tr>
                        <th>員工姓名</th>
                    </tr>
                    <tr>
                        <td>${start.value}-${end.value}</td>
                    </tr>
                    <tr>
                        <td>${type.value}</td>
                    </tr>
                    <tr>
                        <td>${reason.value}</td>
                    </tr>
                    <tr>
                        <td id="button"><button>拒絕</button><button>核准</button></td>
                    </tr>
                </table>
			</div>
	`
})