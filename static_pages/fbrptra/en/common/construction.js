function MM_showHideLayers() { 
  var i,p,v,obj,args=MM_showHideLayers.arguments;
  for (i=0; i<(args.length-2); i+=3) if ((obj=MM_findObj(args[i]))!=null) { v=args[i+2];
    if (obj.style) { obj=obj.style; v=(v=='show')?'visible':(v='hide')?'hidden':v; }
    obj.visibility=v; }
}

function MM_swapImgRestore() { 
  if (document.MM_swapImgData != null)
    for (var i=0; i<(document.MM_swapImgData.length-1); i+=2)
      document.MM_swapImgData[i].src = document.MM_swapImgData[i+1];
}

function MM_swapImage() { 
  var i,j=0,objStr,obj,swapArray=new Array,oldArray=document.MM_swapImgData;
  for (i=0; i < (MM_swapImage.arguments.length-2); i+=3) {
    objStr = MM_swapImage.arguments[(navigator.appName == 'Netscape')?i:i+1];
    if ((objStr.indexOf('document.layers[')==0 && document.layers==null) ||
        (objStr.indexOf('document.all[')   ==0 && document.all   ==null))
      objStr = 'document'+objStr.substring(objStr.lastIndexOf('.'),objStr.length);
    obj = eval(objStr);
    if (obj != null) {
      swapArray[j++] = obj;
      swapArray[j++] = (oldArray==null || oldArray[j-1]!=obj)?obj.src:oldArray[j];
      obj.src = MM_swapImage.arguments[i+2];

  } }
  document.MM_swapImgData = swapArray; 
}

function getCurrentDate()
{
    var d = new Date();
    var monthNames = new Array("Jan.","Feb.","March","April","May","June","July","August","Sept.","Oct.","Nov.","Dec.");
    return(monthNames[d.getMonth()] + ' ' + d.getDate() + ',' + ' '+ d.getFullYear());
}

function printWindow() {
	window.print();
	return false;
}

function closeWindow() {
	window.close();
	return true;
}

function headerImage() {
	nImages = 10;
	head='<img src="../images/header/pic';
	tail='.jpg" height="65" width="400" alt="" border="1" style="border-color:#ffffff">';
	var r = Math.ceil(Math.random() * nImages);
	document.write(head + r + tail);
}


/************** Image Transition ********************/

// Set the slideshow speed (in milliseconds)
var SlideShowSpeed = 12000;

// Set the duration of crossfade (in seconds)
//var CrossFadeDuration = 3;

var Picture= new Array(); 
Picture[1] = '../images/home/Promo_ComingSoon_800x300.jpg';
Picture[4] = '../images/home/Promo_HowItWorks_800x300.jpg';
Picture[2] = '../images/home/Promo_NeedFastrak_800x300.jpg';
Picture[3] = '../images/home/Promo_Carpool_800x300.jpg';
Picture[5] = '../images/home/Promo_Violations_800x300.jpg';

var Caption= new Array(); 
Caption[1] = 'Click to Open an Account';
Caption[4] = 'Click to watch the How it Works video (2:26)';
Caption[2] = 'Click to Open an Account';
Caption[3] = 'Click to watch the Carpool Loyalty Program video (2:00)';
Caption[5] = 'Click to watch the Rules of the Road video (2:40)';

var Anchor = new Array();
Anchor[1]  = '#l';
Anchor[4]  = '#';
Anchor[2]  = '#';
Anchor[3]  = '#';
Anchor[5]  = '#';

var Rel = new Array();
Rel[1]  = '';
Rel[4]  = 'H-HKcnj_JAY';
Rel[2]  = '';
Rel[3]  = 'fz9BJACR7yE';
Rel[5]  = 'ucSZTxlXpg4';

var Title = new Array();
Title[1]  = '';
Title[4]  = 'How it Works';
Title[2]  = '';
Title[3]  = 'Carpool Loyalty Program';
Title[5]  = 'Rules of the Road';

var tss;
var jss = 1;
var pss = Picture.length-1;

function runSlideShow(){
if (document.all){
document.images.homeImage.style.filter="blendTrans(duration=2)";
//document.images.homeImage.style.filter="blendTrans(duration=CrossFadeDuration)";
document.images.homeImage.filters.blendTrans.Apply();}

$("#homeImage").attr({ title:Caption[jss], src:Picture[jss] });
$("#homeImageLink").attr({ href:Anchor[jss], rel:Rel[jss], title:Title[jss] });

if (Rel[jss]=='') {
	$("a.youtube").YouTubePopup("destroy");
} else {
	$("a.youtube").YouTubePopup({ autoplay: 1 });
}

if (document.all) { 
		document.images.homeImage.filters.blendTrans.Play();
}
jss = jss + 1;
if (jss > (pss)) jss=1;
tss = setTimeout('runSlideShow()', SlideShowSpeed);
}
