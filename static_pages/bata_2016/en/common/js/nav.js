var istablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
	
	if(istablet){
	if(!(window.ActiveXObject) && "ActiveXObject" in window){
	document.write('<header><div id="theNav" style="margin-right: 140px;"><div><nav><ul class="sf-menu"><li><a href="#">QUICK VIEW</a><ul><li><a href="../howitworks/3_easySteps.shtml">3 EASY STEPS</a></li><li><a href="../howitworks/whereToUse.shtml">WHERE TO USE</a></li><li><a href="../howitworks/waysToPay.shtml">WAYS TO PAY</a></li><!--<li><a href="#">WHERE TO BUY</a></li>--></ul></li><li><a href="#">GUIDE</a><ul><li><a href="../guide/bridgesParking.shtml">TOLL BRIDGES & PARKING</a></li><li><a href="../guide/expressLane.shtml">BAY AREA EXPRESS LANES</a></li><li><a href="../howitworks/carpool.shtml">USING CARPOOL LANES</a></li><li><a href="../guide/visitorsRentals.shtml">RENTAL VEHICLES & VISITORS</a></li><li><a href="../guide/GGBridgeToll.shtml">GOLDEN GATE BRIDGE TOLL</a></li><li><a href="../guide/doINeedFlex.shtml">FASTRAK FLEX TOLL TAG</a></li><li><a href="../guide/invoicesViolations.shtml">INVOICE & VIOLATION INFO</a></li><li><a href="../guide/violationsEnforcement.shtml">ENFORCEMENT</a></li><li><a href="../howitworks/howToMount.shtml">HOW TO MOUNT A TOLL TAG</a></li></ul></li><li><a href="#">SUPPORT</a><ul><li><a href="../support/faqs.shtml">FAQS</a></li><li><a href="../support/instructionalVids.shtml">INSTRUCTIONAL VIDEOS</a></li><li><a href="../support/forms.shtml">FORMS & DOCUMENTS</a></li><li><a href="../support/contactUs.shtml">CONTACT US & HOURS</a></li><li><a href="../support/eschOverview.shtml">UNCLAIMED PROPERTY</a></li></ul></li>');
	} else {
	document.write('<header><div id="theNav"><div><nav><ul class="sf-menu"><li><a href="#">QUICK VIEW</a><ul><li><a href="../howitworks/3_easySteps.shtml">3 EASY STEPS</a></li><li><a href="../howitworks/whereToUse.shtml">WHERE TO USE</a></li><li><a href="../howitworks/waysToPay.shtml">WAYS TO PAY</a></li><!--<li><a href="#">WHERE TO BUY</a></li>--></ul></li><li><a href="#">GUIDE</a><ul><li><a href="../guide/bridgesParking.shtml">TOLL BRIDGES & PARKING</a></li><li><a href="../guide/expressLane.shtml">BAY AREA EXPRESS LANES</a></li><li><a href="../howitworks/carpool.shtml">USING CARPOOL LANES</a></li><li><a href="../guide/visitorsRentals.shtml">RENTAL VEHICLES & VISITORS</a></li><li><a href="../guide/GGBridgeToll.shtml">GOLDEN GATE BRIDGE TOLL</a></li><li><a href="../guide/doINeedFlex.shtml">FASTRAK FLEX TOLL TAG</a></li><li><a href="../guide/invoicesViolations.shtml">INVOICE & VIOLATION INFO</a></li><li><a href="../guide/violationsEnforcement.shtml">ENFORCEMENT</a></li><li><a href="../howitworks/howToMount.shtml">HOW TO MOUNT A TOLL TAG</a></li></ul></li><li><a href="#">SUPPORT</a><ul><li><a href="../support/faqs.shtml">FAQS</a></li><li><a href="../support/instructionalVids.shtml">INSTRUCTIONAL VIDEOS</a></li><li><a href="../support/forms.shtml">FORMS & DOCUMENTS</a></li><li><a href="../support/contactUs.shtml">CONTACT US & HOURS</a></li><li><a href="../support/eschOverview.shtml">UNCLAIMED PROPERTY</a></li></ul></li>');
	}
	
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		
		} else {
		document.write('<li><a href="../home/index.shtml#dailyCommute">THE DAILY COMMUTE</a></li>');
		document.write('<li>');
		}
	
	
	
	}else{
	document.write('<header><div id="theNav"><div><nav><ul class="sf-menu"><li><a href="#">QUICK VIEW</a><ul><li><a href="../howitworks/3_easySteps.shtml">3 EASY STEPS</a></li><li><a href="../howitworks/whereToUse.shtml">WHERE TO USE</a></li><li><a href="../howitworks/waysToPay.shtml">WAYS TO PAY</a></li><!--<li><a href="#">WHERE TO BUY</a></li>--></ul></li><li><a href="#">GUIDE</a><ul><li><a href="../guide/bridgesParking.shtml">TOLL BRIDGES & PARKING</a></li><li><a href="../guide/expressLane.shtml">BAY AREA EXPRESS LANES</a></li><li><a href="../howitworks/carpool.shtml">USING CARPOOL LANES</a></li><li><a href="../guide/visitorsRentals.shtml">RENTAL VEHICLES & VISITORS</a></li><li><a href="../guide/GGBridgeToll.shtml">GOLDEN GATE BRIDGE TOLL</a></li><li><a href="../guide/doINeedFlex.shtml">FASTRAK FLEX TOLL TAG</a></li><li><a href="../guide/invoicesViolations.shtml">INVOICE & VIOLATION INFO</a></li><li><a href="../guide/violationsEnforcement.shtml">ENFORCEMENT</a></li><li><a href="../howitworks/howToMount.shtml">HOW TO MOUNT A TOLL TAG</a></li></ul></li><li><a href="#">SUPPORT</a><ul><li><a href="../support/faqs.shtml">FAQS</a></li><li><a href="../support/instructionalVids.shtml">INSTRUCTIONAL VIDEOS</a></li><li><a href="../support/forms.shtml">FORMS & DOCUMENTS</a></li><li><a href="../support/contactUs.shtml">CONTACT US & HOURS</a></li><li><a href="../support/eschOverview.shtml">UNCLAIMED PROPERTY</a></li></ul></li>');
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {		
		} else {
		document.write('<li><a href="../home/index.shtml#dailyCommute">THE DAILY COMMUTE</a></li>');
		document.write('<li>');
		}
	
	
	}
//document.write("('')");
	if( /Android|webOS|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		document.write('<li class="dropdown active" id="account_nav_panel" style="display:none">');
document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>&nbsp;Hi, <span id="userName_panel"></span>&nbsp;<b class="caret"></b></a>');
document.write('<ul class="dropdown-menu">');
document.write('<li><a href="/vector/account/home/accountOverview.do">OVERVIEW</a></li></ul></li>');
document.write('<li class="dropdown active" id="account_nav_panel" style="color: #FFF;      background-color: rgb(151,163,233);      border-radius: 4px;display:none">');
document.write('<a href="/vector/account/home/accountLogout.do" class="dropdown-toggle">&nbsp;Logout&nbsp;</a></li>');
document.write('<li class="dropdown active" id="videotolls_nav_panel" style="display:none">');
document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>&nbsp;Hi, <span id="userName_panel"></span>&nbsp;<b class="caret"></b></a>');
document.write('<ul class="dropdown-menu"><li><a href="/vector/videotolls/home/accountOverview.do">OVERVIEW</a></li></ul></li>');
document.write('<li class="dropdown active" id="videotolls_nav_panel" style="color: #FFF;      background-color: rgb(151,163,233);      border-radius: 4px;display:none">');
document.write('<a href="/vector/videotolls/home/accountLogout.do" class="dropdown-toggle">&nbsp;Logout&nbsp;</a></li>');
document.write('<li class="dropdown active" id="retailer_nav_panel" style="display:none">');
document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>&nbsp;Hi, <span id="userName_panel"></span>&nbsp;<b class="caret"></b></a>');
document.write('<ul class="dropdown-menu"><li><a href="/vector/retailers/myAccount.do">OVERVIEW</a></li></ul></li>');
document.write('<li class="dropdown active" id="retailer_nav_panel" style="color: #FFF;      background-color: rgb(151,163,233);      border-radius: 4px;display:none">');
document.write('<a href="/vector/retailers/retailerLogout.do" class="dropdown-toggle">&nbsp;Logout&nbsp;</a></li>');
		document.write('<li id="default_nav_panel" style="display:none"><a href="#signIn" style="margin-left: 0px; margin-right: 120px;">MY ACCOUNT</a><ul style="margin-left: 0px; width: 225px; padding: 10px; text-align: center;"><li>');
		} else if(!(window.ActiveXObject) && "ActiveXObject" in window){
			document.write('<li class="dropdown active" id="account_nav_panel" style="display:none"> ');
document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>&nbsp;Hi, <span id="userName_panel"></span>&nbsp;<b class="caret"></b></a>');
document.write('<ul class="dropdown-menu">');
document.write('<li><a href="/vector/account/home/accountOverview.do">OVERVIEW</a></li></ul></li>');
document.write('<li class="dropdown active" id="account_nav_panel" style="color: #FFF;      background-color: rgb(151,163,233);      border-radius: 4px;display:none">');
document.write('<a href="/vector/account/home/accountLogout.do" class="dropdown-toggle">&nbsp;Logout&nbsp;</a></li>');
document.write('<li class="dropdown active" id="videotolls_nav_panel" style="display:none">');
document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>&nbsp;Hi, <span id="userName_panel"></span>&nbsp;<b class="caret"></b></a>');
document.write('<ul class="dropdown-menu"><li><a href="/vector/videotolls/home/accountOverview.do">OVERVIEW</a></li></ul></li>');
document.write('<li class="dropdown active" id="videotolls_nav_panel" style="color: #FFF;      background-color: rgb(151,163,233);      border-radius: 4px;display:none">');
document.write('<a href="/vector/videotolls/home/accountLogout.do" class="dropdown-toggle">&nbsp;Logout&nbsp;</a></li>');
document.write('<li class="dropdown active" id="retailer_nav_panel" style="display:none">');
document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>&nbsp;Hi, <span id="userName_panel"></span>&nbsp;<b class="caret"></b></a>');
document.write('<ul class="dropdown-menu"><li><a href="/vector/retailers/myAccount.do">OVERVIEW</a></li></ul></li>');
document.write('<li class="dropdown active" id="retailer_nav_panel" style="color: #FFF;      background-color: rgb(151,163,233);      border-radius: 4px;display:none">');
document.write('<a href="/vector/retailers/retailerLogout.do" class="dropdown-toggle">&nbsp;Logout&nbsp;</a></li>');
		document.write('<li id="default_nav_panel"  style="display:none"><a href="#signIn" style="margin-left: 240px; right: 220px;">MY ACCOUNT</a><ul style="margin-left: 0px; width: 225px; padding: 10px; text-align: center; margin-right: 220px;"><li>');
		} else {
			document.write('<li class="dropdown active" id="account_nav_panel" style="display:none">');
document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>&nbsp;Hi, <span id="userName_panel"></span>&nbsp;<b class="caret"></b></a>');
document.write('<ul class="dropdown-menu">');
document.write('<li><a href="/vector/account/home/accountOverview.do">OVERVIEW</a></li></ul></li>');
document.write('<li class="dropdown active" id="account_nav_panel" style="color: #FFF;      background-color: rgb(151,163,233);      border-radius: 4px;display:none">');
document.write('<a href="/vector/account/home/accountLogout.do" class="dropdown-toggle">&nbsp;Logout&nbsp;</a></li>');
document.write('<li class="dropdown active" id="videotolls_nav_panel" style="display:none">');
document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>&nbsp;Hi, <span id="userName_panel"></span>&nbsp;<b class="caret"></b></a>');
document.write('<ul class="dropdown-menu"><li><a href="/vector/videotolls/home/accountOverview.do">OVERVIEW</a></li></ul></li>');
document.write('<li class="dropdown active" id="videotolls_nav_panel" style="color: #FFF;      background-color: rgb(151,163,233);      border-radius: 4px;display:none">');
document.write('<a href="/vector/videotolls/home/accountLogout.do" class="dropdown-toggle">&nbsp;Logout&nbsp;</a></li>');
document.write('<li class="dropdown active" id="retailer_nav_panel" style="display:none">');
document.write('<a href="#" class="dropdown-toggle" data-toggle="dropdown"><span class="glyphicon glyphicon-user"></span>&nbsp;Hi, <span id="userName_panel"></span>&nbsp;<b class="caret"></b></a>');
document.write('<ul class="dropdown-menu"><li><a href="/vector/retailers/myAccount.do">OVERVIEW</a></li></ul></li>');
document.write('<li class="dropdown active" id="retailer_nav_panel" style="color: #FFF;      background-color: rgb(151,163,233);      border-radius: 4px;display:none">');
document.write('<a href="/vector/retailers/retailerLogout.do" class="dropdown-toggle">&nbsp;Logout&nbsp;</a></li>');
		document.write('<li id="default_nav_panel" style="display:none"><a href="#signIn" style="margin-left: 100px; margin-right: 70px;">MY ACCOUNT</a><ul style="margin-left: 0px; width: 245px; padding: 10px; text-align: center;"><li>');
		}

document.write('');
document.write("<form method='post' name='accountlogin' action='/vector/retailers/retailerLogin.do?btnLogin.x=1&checkaccount=true&from=Home&locale=en_US'><input name='loginName' id='loginName' type='hidden'><input name='password' id='password' type='hidden'><input name='formid' id='formid' type='hidden' value='frmLogin'>");
document.write('<input type="text" placeholder="Username" name="userName" id="userName" style="color: #454545;" autocomplete="off" ');
document.write("");
document.write('');
document.write("");
document.write('><br>');
document.write('<input type="password" placeholder="Password"  name="pWord" autocomplete="off" id="pWord" ');
document.write("");
document.write('');
document.write("");
document.write('><br>');
document.write('<a href="javascript:rememberMeOnClick();accountLogin(this);" class="formButton" style="color: #ffffff; margin-bottom: 10px;">Log In</a>');
document.write('</form><table cellpadding="0" cellspacing="0">');
document.write('<tr>');
document.write('<td width="20" valign="middle" align="center"><input type="checkbox" name="remember" value="remember" style="margin-bottom: 4px;"></td><td width="100" valign="middle" align="center">Remember Me</td>');
document.write('</tr>');
document.write('</table>');
document.write('<div style="text-align: left; margin-top: 20px;">');
document.write('<a href="/vector/account/maintenance/bataforgotPassword.do?from=Home&locale=en_US" class="popLink">Forgot password or username?</a>');
document.write('<a href="/vector/account/maintenance/firstTimeLogin.do?from=Home&locale=en_US" class="popLink">Did you open an account offline?</a>');
document.write('<div>');
document.write('');
document.write('</li></ul></li></ul></nav></div><!-- .container --></div><!-- .logo_full_width --></header>');

if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
  document.getElementById('signIn').style.marginLeft = '10px;';
  }
  
if(!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)){
//alert('wert')
}

