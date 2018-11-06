function clearField(arg) {
	document.getElementById(arg).value = "";
}

function eligiValidator() {
	var x = document.getElementById("eligibility").selectedIndex;
	var y = document.getElementById("eligibility").options;
	if (y[x].index >= 4) {
		document.getElementById('otherExpl').style.display = "block";
	} else {
		document.getElementById('otherExpl').style.display = "none";
	}

}

function autoResp(arg) {
	var alphaExp = /^[a-zA-Z]+$/;
	var numericExpression = /^[0-9]+$/;
	var x = document.getElementById("email").value;
	var atpos = x.indexOf("@");
	var dotpos = x.lastIndexOf(".");
	if (arg == 'autoResponderApp') {
		var a = document.getElementById("jobbery").selectedIndex;
		var b = document.getElementById("jobbery").options;
		var x = document.getElementById("eligibility").selectedIndex;
		var y = document.getElementById("eligibility").options;
		if (b[a].index <= 0) {
			alert('please select a job post')
		} else if (document.getElementById("firstName").value.match(alphaExp) == null) {
			alert('please fill in your first name');
		} else if (document.getElementById("lastName").value.match(alphaExp) == null) {
			alert('please fill in your last name');
		} else if ((atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length)
				|| document.getElementById("email").value == '') {
			alert('please fill in your email correctly');
		} else if (document.getElementById("phone").value
				.match(numericExpression) == null) {
			alert('please fill in your phone number');
		} else if (y[x].index <= 0) {
			alert('please select your work eligibility');
			return true;
		} else {
			document.eligibiliteer.submit();
			// document.getElementById(arg).style.display = "inline";
		}
	}

	// document.getElementById(arg).style.display = "inline";
	// document.eligibiliteer.submit();
}

function infoThanks() {
	var alphaExp = /^[a-zA-Z]+$/;
	var numericExpression = /^[0-9]+$/;
	var x = document.getElementById("email").value;
	var atpos = x.indexOf("@");
	var dotpos = x.lastIndexOf(".");
	if ((atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= x.length)
			|| document.getElementById("email").value == '') {
		alert('please fill in your email correctly');
	} else if (document.getElementById("nameO").value.match(alphaExp) == null) {
		alert('please fill in your name');

		return true;

	} else {
		document.infoRequest.submit();
	}
}

function getCloser(arg) {
	location.reload();
}

function imgSwitch(arg) {
	document.getElementById(arg).src = 'img/' + arg + '_sel.jpg';
}

function imgSwitchBak(arg) {
	document.getElementById(arg).src = 'img/' + arg + '.jpg';
}

function obliterater(arg) {
	document.getElementById(arg).value = "";
}

function restorer(arg, arg2) {
	var myTextField = document.getElementById(arg);
	if (myTextField.value != "")
		myTextField.value = myTextField.value
	else
		myTextField.value = arg2
}

function showPopper(arg) {
	bloop = "#" + arg;
	$(bloop).fadeIn(900);
	document.getElementById(arg).style.display = "inline-block";
}

function showBridge(arg) {
	document.getElementById('antioch').style.display = "none";
	document.getElementById('benicia').style.display = "none";
	document.getElementById('carquinez').style.display = "none";
	document.getElementById('dumbarton').style.display = "none";
	document.getElementById('goldengate').style.display = "none";
	document.getElementById('richmond').style.display = "none";
	document.getElementById('bay').style.display = "none";
	document.getElementById('sanmateo').style.display = "none";
	document.getElementById('i680').style.display = "none";
	document.getElementById('sr237').style.display = "none";
	document.getElementById('i580').style.display = "none";
	document.getElementById('i680Ex').style.display = "none";
	document.getElementById('soCal').style.display = "none";
	document.getElementById('sfo').style.display = "none";

	bloop = "#" + arg;
	$(bloop).fadeIn(900);
	document.getElementById(arg).style.display = "inline-block";
}

function showAdder(arg, arg2, arg3, arg4) {
	bloop = "#" + arg;
	$(bloop).fadeIn(900);
	document.getElementById(arg).style.display = "inline-block";
	document.getElementById(arg2).style.display = "none";
	document.getElementById(arg3).style.display = "block";
	squol = "#" + arg4;
	$(squol).fadeIn(900);
}

function showLesser(arg, arg2, arg3, arg4) {
	document.getElementById(arg).style.display = "none";
	document.getElementById(arg2).style.display = "block";
	document.getElementById(arg3).style.display = "none";
	document.getElementById(arg4).style.display = "none";
}

function showCoords(event) {
	var x = event.clientX;
	var y = event.clientY;
	var X = x - 220;
	var Y = y + 20;
	var coords = "X coords: " + x + ", Y coords: " + y;
	// document.getElementById("answerQ").style.display = "block"
	document.getElementById("answerQ").style.top = y + 'px';
	document.getElementById("answerQ").style.left = X + 'px';
	bloop = "#" + "answerQ";
	$(bloop).fadeIn(900);
}

function closer(arg) {
	document.getElementById(arg).style.display = "none"
}

function closer2() {
	document.getElementById('homeForm').style.display = "none";
}

window.addEventListener('resize', setWindowSizeP);

function setWindowSizeP() {
	if (typeof (window.innerWidth) == 'number') {
		myWidth = window.innerWidth;
		myHeight = window.innerHeight;
	} else {
		if (document.documentElement
				&& (document.documentElement.clientWidth || document.documentElement.clientHeight)) {
			myWidth = document.documentElement.clientWidth;
			myHeight = document.documentElement.clientHeight;
		} else {
			if (document.body
					&& (document.body.clientWidth || document.body.clientHeight)) {
				myWidth = document.body.clientWidth;
				myHeight = document.body.clientHeight;

			}
		}
	}
	var ploot = myWidth * .09;
	document.getElementById('swart').style.height = ploot + 'px';
}

function mountChanger(arg) {
	document.getElementById('cars').style.display = "none";
	document.getElementById('motorcycles').style.display = "none";
	document.getElementById('exterior').style.display = "none";

	bloop = "#" + arg;
	$(bloop).fadeIn(900);
	document.getElementById(arg).style.display = "inline-block";
}

function langChanger(arg) {
	document.getElementById('english').style.display = "none";
	document.getElementById('spanish').style.display = "none";
	document.getElementById('chinese').style.display = "none";

	bloop = "#" + arg;
	$(bloop).fadeIn(900);
	document.getElementById(arg).style.display = "inline-block";
}

function opacitieer(arg) {
	document.getElementById(arg).style.opacity = ".8";
}

function disopacitieer(arg) {
	document.getElementById(arg).style.opacity = "1";
}

function langMouse(arg, arg2) {
	document.getElementById(arg).style.backgroundColor = '#34b4bd';
	document.getElementById(arg2).style.visibility = 'visible';
}

function langMouseOut(arg, arg2) {
	document.getElementById(arg).style.backgroundColor = '#138992';
	document.getElementById(arg2).style.visibility = 'hidden';
}