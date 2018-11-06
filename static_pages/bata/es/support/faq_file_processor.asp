<!DOCTYPE html>
<html>
<head>
<%
Dim faqid : set faqid = request.querystring("faqId")
Dim countVal : set countVal = request.querystring("count")
Dim faqItems
If faqid = "" Then
Else
	If countVal = -1 Then
		Session(faqid) = -1
	Else
		If Session(faqid) = "" Then
			Session(faqid) = 1
		Else
			Session(faqid) = cint(Session(faqid))+1
		End If
	End If
	
	If IsNullArray(Session("faqItems")) Then
		ReDim faqItems(50)
		faqItems(0) = faqid
	Else
		faqItems = Session("faqItems")
		for i=0 to UBound(faqItems)
			If(faqid = faqItems(i)) Then
				Exit For
			ElseIf("" = faqItems(i)) Then
				faqItems(i) = faqid
				Exit For
			End If
		Next 
	End If
		Session("faqItems") = faqItems
	
	If Session("faqCount") = "" Then
		Session("faqCount") = 1
	Else
		Session("faqCount") = cint(Session("faqCount"))+1
	End If

End If

If Session("faqCount") > 10 Then
	Session("faqCount")= 0
	fileHandler()
End If

Set faqid = Nothing
Set faqItems = Nothing

Function IsNullArray(input_array)
	On Error Resume Next
	Dim is_null : is_null = UBound(input_array)
	If Err.Number = 0 Then
		is_null = False
	Else
		is_null = True
	End If
	IsNullArray = is_null
End Function

Function fileHandler()
	'Declare local variables.
	Dim objDom,currfaq,faqItems1,objNode,newNode
	 
	'Set node path
	'Instantiate the XMLDOM Object.
	set objDOM = Server.CreateObject("Microsoft.XMLDOM")

	'Turn off asyncronous file loading.
	objDOM.async = false

	'Load the XML file.
	objDOM.load Server.MapPath("\es\support\faq_popular_statistics.xml")

	faqItems1 = Session("faqItems")
	Session("faqItems") = ""
	for i=0 to UBound(faqItems1)
		currfaq = faqItems1(i)
		
		If currfaq = "" Then
		Else
			set objNode = objDom.selectSingleNode("/FAQSTATS/faq[@id='"&currfaq&"']")
			
			If objNode is nothing Then
				Set newNode = objDOM.createElement("faq")
				newNode.setAttribute "id", currfaq
				newNode.setAttribute "count", Session(currfaq)
				objDom.selectSingleNode("/FAQSTATS").appendChild(newNode)
			Else
				objNode.setAttribute "count", cint(objNode.getAttribute("count"))+cint(Session(currfaq))					
			End If
				Session(currfaq) = ""
		End If
	Next 
	 
	'After the XML file has been edited, is must be saved.
	objDom.save Server.MapPath("\es\support\faq_popular_statistics.xml") 

	'Release all of your object references.
	Set newNode = Nothing
	Set objNode = Nothing
	Set currfaq = Nothing
	Set faqItems1 = Nothing
	Set objDom = Nothing
	
End Function
%>
</head>
<body>
</body>
</html>