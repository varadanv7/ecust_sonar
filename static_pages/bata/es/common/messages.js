function popupAnnouncement(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	window.open(url, title, "resizable=no, toolbar=no, location=no, copyhistory=no, scrollbars=no, menubar=no, status=no, directories=no, width="+w+",height="+h+",left="+left+",top="+top+"");
}

function msgNJDiscounts() {
	popupAnnouncement('../custom/msgNJTurnpikeDiscounts.html', 'myPop1', 500, 550);
	return;
}
