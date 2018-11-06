$(document).ready(function(){

// ---------- CAROUSEL ---------- //
$(function() {
	$('#carousel').carouFredSel({
		responsive  : false,
		width: '100%',
		items: {
			visible: 3,
			start: -1,
			width:1170,
			height:395
		},
		scroll: {
			items: 1,
			duration: 600,
			timeoutDuration: 6000
			// easing : "linear"
		},
		prev: '#prev',
		next: '#next',
		pagination: {
			container: '#pager',
			deviation: 1
		}
	});
});

// ---------- CAROUSEL CLIENT Page ---------- //
$(function() {
	$('#foo1').carouFredSel({
		responsive  : false,
		width: '100%',
		items: {
			visible: 5,
			start: -1,
			//width:1170,
			//height:395
		},
		scroll: {
			items: 1,
			duration: 600,
			timeoutDuration: 600
			// easing : "linear"
		},
		prev: '#prev',
		next: '#next',
		pagination: {
			container: '#pager',
			deviation: 1
		}
	});
});

// ---------- MENU ---------- //
// $(function(){
// 	$('#ebur_sf').superfish({
// 	//useClick: true
// 	});

// 	$('header nav').meanmenu();
// });


});

function woo(arg, arg1){
document.getElementById(arg1).style.display = "none"
document.getElementById(arg).style.display = "block"
	if(arg == 'domainer'){
	document.getElementById('domArrow').src = "img/blueArrowD.png"
	document.getElementById('compArrow').src = "img/blueArrowR.png"
	}else{
	document.getElementById('domArrow').src = "img/blueArrowR.png"
	document.getElementById('compArrow').src = "img/blueArrowD.png"
	}
}

function clearField(arg){
document.getElementById(arg).value = "";
}

function eligiValidator(){
var x=document.getElementById("eligibility").selectedIndex;
var y=document.getElementById("eligibility").options;
	if( y[x].index >= 4){
	document.getElementById('otherExpl').style.display = "block";
	}else{
	document.getElementById('otherExpl').style.display = "none";
	}

}

function autoResp(arg){
var alphaExp = /^[a-zA-Z]+$/;
var numericExpression = /^[0-9]+$/;
var x=document.getElementById("email").value;
var atpos=x.indexOf("@");
var dotpos=x.lastIndexOf(".");
		if(arg == 'autoResponderApp'){
	var a=document.getElementById("jobbery").selectedIndex;
	var b=document.getElementById("jobbery").options;
	var x=document.getElementById("eligibility").selectedIndex;
	var y=document.getElementById("eligibility").options;
			if( b[a].index <= 0){
				alert('please select a job post')
			}else if(document.getElementById("firstName").value.match(alphaExp) == null){
				alert('please fill in your first name');
			}else if(document.getElementById("lastName").value.match(alphaExp) == null){
				alert('please fill in your last name');
			}else if((atpos<1 || dotpos<atpos+2 || dotpos+2>=x.length) || document.getElementById("email").value == ''){
				alert('please fill in your email correctly');
			}else if(document.getElementById("phone").value.match(numericExpression) == null){
				alert('please fill in your phone number');
			}else if( y[x].index <= 0){
				alert('please select your work eligibility');
				return true;
			}else{
				
			document.getElementById(arg).style.display = "inline";
		}	
	}
	

	
//document.getElementById(arg).style.display = "inline";
//document.eligibiliteer.submit();	
}

function infoThanks(){
document.infoRequest.submit();
}


function jobs(){
	var x=document.getElementById("jobbery").selectedIndex;
	var y=document.getElementById("jobbery").options;
	var order = y[x].index;
	
	window.location.assign("jobPostings.html#job" + order)
//alert(order);
}


