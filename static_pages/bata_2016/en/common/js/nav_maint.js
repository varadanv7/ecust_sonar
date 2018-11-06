var istablet = (/ipad|android|android 3.0|xoom|sch-i800|playbook|tablet|kindle/i.test(navigator.userAgent.toLowerCase()));
	
	if(istablet){
	if(!(window.ActiveXObject) && "ActiveXObject" in window){
	document.write('<header><div id="theNav" style="margin-right: 140px;"><div><nav><ul class="sf-menu" style="padding-right: 23.4%;"><li><a href="#">QUICK VIEW</a><ul><li><a href="../howitworks/3_easySteps.shtml">3 EASY STEPS</a></li><li><a href="../howitworks/whereToUse.shtml">WHERE TO USE</a></li><li><a href="../howitworks/waysToPay.shtml">WAYS TO PAY</a></li><!--<li><a href="#">WHERE TO BUY</a></li>--></ul></li><li><a href="#">GUIDE</a><ul><li><a href="../guide/bridgesParking.shtml">TOLL BRIDGES & PARKING</a></li><li><a href="../guide/expressLane.shtml">BAY AREA EXPRESS LANES</a></li><li><a href="../howitworks/carpool.shtml">USING CARPOOL LANES</a></li><li><a href="../guide/visitorsRentals.shtml">RENTAL VEHICLES & VISITORS</a></li><li><a href="../guide/GGBridgeToll.shtml">GOLDEN GATE BRIDGE TOLL</a></li><li><a href="../guide/doINeedFlex.shtml">FASTRAK FLEX TOLL TAG</a></li><li><a href="../guide/invoicesViolations.shtml">INVOICE & VIOLATION INFO</a></li><li><a href="../guide/violationsEnforcement.shtml">ENFORCEMENT</a></li><li><a href="../howitworks/howToMount.shtml">HOW TO MOUNT A TOLL TAG</a></li></ul></li><li><a href="#">SUPPORT</a><ul><li><a href="../support/faqs.shtml">FAQS</a></li><li><a href="../support/forms.shtml">FORMS & DOCUMENTS</a></li><li><a href="../support/contactUs.shtml">CONTACT US & HOURS</a></li><li><a href="../support/eschOverview.shtml">UNCLAIMED PROPERTY</a></li></ul></li>');
	} else {
	document.write('<header><div id="theNav"><div><nav><ul class="sf-menu" style="padding-right: 23.4%;"><li><a href="#">QUICK VIEW</a><ul><li><a href="../howitworks/3_easySteps.shtml">3 EASY STEPS</a></li><li><a href="../howitworks/whereToUse.shtml">WHERE TO USE</a></li><li><a href="../howitworks/waysToPay.shtml">WAYS TO PAY</a></li><!--<li><a href="#">WHERE TO BUY</a></li>--></ul></li><li><a href="#">GUIDE</a><ul><li><a href="../guide/bridgesParking.shtml">TOLL BRIDGES & PARKING</a></li><li><a href="../guide/expressLane.shtml">BAY AREA EXPRESS LANES</a></li><li><a href="../howitworks/carpool.shtml">USING CARPOOL LANES</a></li><li><a href="../guide/visitorsRentals.shtml">RENTAL VEHICLES & VISITORS</a></li><li><a href="../guide/GGBridgeToll.shtml">GOLDEN GATE BRIDGE TOLL</a></li><li><a href="../guide/doINeedFlex.shtml">FASTRAK FLEX TOLL TAG</a></li><li><a href="../guide/invoicesViolations.shtml">INVOICE & VIOLATION INFO</a></li><li><a href="../guide/violationsEnforcement.shtml">ENFORCEMENT</a></li><li><a href="../howitworks/howToMount.shtml">HOW TO MOUNT A TOLL TAG</a></li></ul></li><li><a href="#">SUPPORT</a><ul><li><a href="../support/faqs.shtml">FAQS</a></li><li><a href="../support/forms.shtml">FORMS & DOCUMENTS</a></li><li><a href="../support/contactUs.shtml">CONTACT US & HOURS</a></li><li><a href="../support/eschOverview.shtml">UNCLAIMED PROPERTY</a></li></ul></li>');
	}
	
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		
		} else {
		document.write('<li><a href="../home/index.shtml#dailyCommute">THE DAILY COMMUTE</a></li>');
		document.write('<li>');
		}
	
	
	
	}else{
	document.write('<header><div id="theNav"><div><nav><ul class="sf-menu" style="padding-right: 23.4%;"><li><a href="#">QUICK VIEW</a><ul><li><a href="../howitworks/3_easySteps.shtml">3 EASY STEPS</a></li><li><a href="../howitworks/whereToUse.shtml">WHERE TO USE</a></li><li><a href="../howitworks/waysToPay.shtml">WAYS TO PAY</a></li><!--<li><a href="#">WHERE TO BUY</a></li>--></ul></li><li><a href="#">GUIDE</a><ul><li><a href="../guide/bridgesParking.shtml">TOLL BRIDGES & PARKING</a></li><li><a href="../guide/expressLane.shtml">BAY AREA EXPRESS LANES</a></li><li><a href="../howitworks/carpool.shtml">USING CARPOOL LANES</a></li><li><a href="../guide/visitorsRentals.shtml">RENTAL VEHICLES & VISITORS</a></li><li><a href="../guide/GGBridgeToll.shtml">GOLDEN GATE BRIDGE TOLL</a></li><li><a href="../guide/doINeedFlex.shtml">FASTRAK FLEX TOLL TAG</a></li><li><a href="../guide/invoicesViolations.shtml">INVOICE & VIOLATION INFO</a></li><li><a href="../guide/violationsEnforcement.shtml">ENFORCEMENT</a></li><li><a href="../howitworks/howToMount.shtml">HOW TO MOUNT A TOLL TAG</a></li></ul></li><li><a href="#">SUPPORT</a><ul><li><a href="../support/faqs.shtml">FAQS</a></li><li><a href="../support/forms.shtml">FORMS & DOCUMENTS</a></li><li><a href="../support/contactUs.shtml">CONTACT US & HOURS</a></li><li><a href="../support/eschOverview.shtml">UNCLAIMED PROPERTY</a></li></ul></li>');
		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {		
		} else {
		document.write('<li><a href="../home/index.shtml#dailyCommute">THE DAILY COMMUTE</a></li>');
		document.write('<li>');
		}
	
	
	}
	document.write('</nav></div><!-- .container --></div><!-- .logo_full_width --></header>');
//document.write("('')");

if(!!navigator.userAgent.match(/Trident.*rv[ :]*11\./)){
//alert('wert')
}

