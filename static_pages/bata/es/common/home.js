function getHTTPRequestObject(){
	var xmlHttpRequest;
	if (window.XMLHttpRequest)
	{
	    xmlHttpRequest = new XMLHttpRequest();
	}
	else  if (window.ActiveXObject)
	{
	    xmlHttpRequest = new ActiveXObject("Microsoft.XMLHTTP");
	}
	return xmlHttpRequest
}

function getXMLHTTPRequestObject(url,functionName){
	var httpRequester=getHTTPRequestObject();
    if (window.XMLHttpRequest) {
        eval("httpRequester.onreadystatechange ="+functionName); //req.onreadystatechange =processReqChange;
        httpRequester.open("GET", url, true);
        httpRequester.send(null);
    } else if (window.ActiveXObject) {
        if (httpRequester) {
            //req.onreadystatechange = processReqChange;
            eval("httpRequester.onreadystatechange ="+functionName);
            httpRequester.open("GET", url, true);
            httpRequester.send();
        }
    }
    return httpRequester;
}

function getXMLHTTPRequestObjectSync(url,functionName){
	var httpRequester=getHTTPRequestObject();
    if (window.XMLHttpRequest) {
        eval("httpRequester.onreadystatechange ="+functionName); //req.onreadystatechange =processReqChange;
        httpRequester.open("GET", url, true);
        httpRequester.send(null);
    } else if (window.ActiveXObject) {
        if (!!httpRequester) {
            httpRequester.open("GET", url, false);
            eval("httpRequester.onreadystatechange ="+functionName);
            httpRequester.send(null);
        }
    }
    return httpRequester;
}

function getXMLRequest() {
	var xmlHttpRequest;
	if(!xmlHttpRequest&&typeof XMLHttpRequest!='undefined') {
		try {
			xmlHttpRequest=new XMLHttpRequest();
		}catch(exception) {
			xmlHttpRequest=false;
		}
	}
	return xmlHttpRequest;
}

xmlhttpRequester=getXMLRequest();

var xmlrequest;

function getMessages(){
	xmlrequest = getXMLHTTPRequestObject('/vector/homepage/HomePage.do?ajax=getMessages&language=ENU','setMessages');	
}

function getNews(){
	xmlrequest = getXMLHTTPRequestObject('/vector/homepage/HomePage.do?ajax=getMessages&language=ENU','setNews');	
}

function setMessages(){
	var msg;
	var element
	if(!!xmlrequest){
		if (xmlrequest.readyState == 4){
			if (xmlrequest.status == 200){
				//alert(xmlrequest.responseText);
				msg = "";
				element = xmlrequest.responseXML.getElementsByTagName("msgLeft");
				if(element[0].childNodes[0] != null)	{
					msg	= element[0].childNodes[0].nodeValue;
				}
				document.getElementById("leftbox").innerHTML = msg;
				xmlrequest = null;
			}
		}
	}
}

function setNews(){
	var msg;
	var element
	if(!!xmlrequest){
		if (xmlrequest.readyState == 4){
			if (xmlrequest.status == 200){
				msg = "";
				element = xmlrequest.responseXML.getElementsByTagName("msgRight");
				if(element[0].childNodes[0] != null)	{
					msg = element[0].childNodes[0].nodeValue;
				}
				document.getElementById("rightbox").innerHTML = msg;
				xmlrequest = null;
			}
		}
	}
}

function runOnLoad() {
	getMessages();
}

function popupAnnouncement(url, title, w, h) {
	var left = (screen.width/2)-(w/2);
	var top = (screen.height/2)-(h/2);
	window.open(url, title, "resizable=no, toolbar=no, location=no, copyhistory=no, scrollbars=no, menubar=no, status=no, directories=no, width="+w+",height="+h+",left="+left+",top="+top+"");
}

