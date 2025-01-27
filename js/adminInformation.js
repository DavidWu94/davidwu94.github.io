$(function() {
    const sessionKey = readCookie("session");
    const userId = readCookie("id");
    if(sessionKey == null){
        alert("請重新登入1");
        window.location = window.location.origin;
    }
    loginCheck(userId,sessionKey);
	$("#searching").on("click",()=>{

        $.ajax({
            url: `http://eucan.ddns.net:3000/quota`,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                account:userId,
                cookie:sessionKey,
                user:code
            }),
        }).then(res=>{
            console.log(res);
            const data = res.data;

            let tableHead = $("<td>")

        })
        $.ajax({
            url: `http://eucan.ddns.net:3000/dayoff`,
            type: 'POST',
            dataType: 'json',
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify({
                account:userId,
                cookie:sessionKey,
                user:$("#code").val(),
            }),
        }).then(res=>{
            console.log(res);
            const data = res.data;

            let annual = $("<td>").addClass("").html(data.annual);
            let annualRevise = $("<td>").addClass("");
            let annualReviseInput = $("<input>").addClass("").html(data.annual);
            annualRevise.append(annualReviseInput);

            let personnel = $("<td>").addClass("").html(data.personnel);
            let personnelRevise = $("<td>").addClass("");
            let personnelReviseInput = $("<input>").addClass("").html(data.personnel);
            personnelRevise.append(personnelReviseInput);

            let care = $("<td>").addClass("").html(data.care);
            let careRevise = $("<td>").addClass("");
            let careReviseInput = $("<input>").addClass("").html(data.care);
            careRevise.append(careReviseInput);

            let sick = $("<td>").addClass("").html(data.sick);
            let sickRevise = $("<td>").addClass("");
            let sickReviseInput = $("<input>").addClass("").html(data.sick);
            sickRevise.append(sickReviseInput);

            let wedding = $("<td>").addClass("").html(data.wedding);
            let weddingRevise = $("<td>").addClass("");
            let weddingReviseInput = $("<input>").addClass("").html(data.wedding);
            weddingRevise.append(weddingReviseInput);

            let funeral = $("<td>").addClass("").html(data.funeral);
            let funeralRevise = $("<td>").addClass("");
            let funeralReviseInput = $("<input>").addClass("").html(data.funeral);
            funeralRevise.append(funeralReviseInput);

            let birth = $("<td>").addClass("").html(data.birth);
            let birthRevise = $("<td>").addClass("");
            let birthReviseInput = $("<input>").addClass("").html(data.birth);
            birthRevise.append(birthReviseInput);

            let pcheckuo = $("<td>").addClass("").html(data.pcheckuo);
            let pcheckuoRevise = $("<td>").addClass("");
            let pcheckuoReviseInput = $("<input>").addClass("").html(data.pcheckuo);
            pcheckuoRevise.append(pcheckuoReviseInput);

            let miscarriage = $("<td>").addClass("").html(data.miscarriage);
            let miscarriageRevise = $("<td>").addClass("");
            let miscarriageReviseInput = $("<input>").addClass("").html(data.miscarriage);
            miscarriageRevise.append(miscarriageReviseInput);

            let paternity = $("<td>").addClass("").html(data.paternity);
            let paternityRevise = $("<td>").addClass("");
            let paternityReviseInput = $("<input>").addClass("").html(data.paternity);
            paternityRevise.append(paternityReviseInput);

            let maternity = $("<td>").addClass("").html(data.maternity);
            let maternityRevise = $("<td>").addClass("");
            let maternityReviseInput = $("<input>").addClass("").html(data.maternity);
            maternityRevise.append(maternityReviseInput);
        });
    });
});
