/*

Dave Banks - 20130316
Got rid of debugging code. Proably there to sort out all trouble with this script. Here's what's wrong:
  The google map api was loaded while the google.js script loading was still going. (tell-tale a undefined error)
  The directions code was probably always trouble since they are re-using element id's in the gmarker windows.
  Had to change out prototype element selectors for jQuery
  Had to change out prototype ajax call for jQuery

*/

var gMap, gDir;
var locsAjaxRequest, locsXml, locs;
var geocoder = google.maps.Geocoder();
var gMarkers = [], gMarkersHtml = [], gMarkersToHereHtml = [], gMarkersFromHereHtml = [];
var gMarkerIndex = 0;
var openedwindow,dirwindow;
var directionsDisplay;
var directionsService = new google.maps.DirectionsService();

if ( typeof( gMapConfig ) == 'object' )
{
	var shadow = {
		url : gMapConfig.MarkerShadowIcon,
		size : new google.maps.Size(12, 20),
		anchor : new google.maps.Point(6, 20)
	};
} 

var reasons=[];
reasons[google.maps.GeocoderStatus.OK]            = "Success";
reasons[google.maps.GeocoderStatus.OVER_QUERY_LIMIT]   = "Too Many Queries: The daily geocoding quota for this site has been exceeded.";
reasons[google.maps.GeocoderStatus.ERROR]       = "Server error: The geocoding request could not be successfully processed.";
reasons[google.maps.GeocoderStatus.INVALID_REQUEST]        = "Invalid Request.The request could not be successfully processed.";
reasons[google.maps.GeocoderStatus.REQUEST_DENIED]        = "The Request Denied. Either Bad key or any legal or contractual reasons.";
reasons[google.maps.GeocoderStatus.UNKNOWN_ERROR]        = "An unknown error occured. Please try after some time.";
reasons[google.maps.GeocoderStatus.ZERO_RESULTS]        = "No results available for the given request.";

function init() {
  if ( typeof( gMapConfig ) != 'object' ) {
    window.alert( 'Fatal: Unable to load configuration data from googlemap/config.js.  Check the contents of this file' );
    return false;
  }
  var xmlUrl = gMapConfig.LocationsXmlFile;
  
  jQuery.ajax({ 
	
    url:  xmlUrl,
    type: 'GET',
    dateType: 'xml',
    error: function(data, textStatus) {
      dieGracefully('Ajax.Request Failure! (' + textStatus + ')' );
    },
    success: function(data, textStatus) {
      if ((data != null) && data.firstChild){ 
		if (getLocationsFromXml(data)){
			setupMap();
			addLocationsToMap();
		} 
      } 
    } 
  });
}

function setupMap()
{
	var gMapOuterDiv = document.getElementById( gMapConfig.MapOuterDivId );
    var gMapDiv      = document.getElementById( gMapConfig.MapInnerDivId );
    var gDirDiv      = document.getElementById( gMapConfig.DirectionsDivId );
		
    if ( !gMapOuterDiv || !gMapDiv ) {
      dieGracefully( 'Unable to hook onto map div' );
    }
    else {
		gMapDiv.style.width  = gMapConfig.Width + 'px';
		gMapDiv.style.height = gMapConfig.Height + 'px';
			
		gMap = new google.maps.Map(
			gMapDiv,{
			center: new google.maps.LatLng(gMapConfig.InitialLatitude, gMapConfig.InitialLongitude),
			zoom: gMapConfig.InitialZoomLevel,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		});
			
		directionsDisplay = new google.maps.DirectionsRenderer();
		directionsDisplay.setMap(gMap);
    }
}


function getLocationsFromXml( sx ) {
	
  var pLat, pLong, thePoint, tMarker;
  locs = sx.getElementsByTagName('location');
	
  if ( !locs.length ) {
	window.alert('no file loaded');
    warn('no locations found in response XML!');
    return false;
  }
  else {
    for ( var i=0; i < locs.length; i++ ) {
      pLat = parseFloat( locs[i].getAttribute('lat') );
      pLong = parseFloat( locs[i].getAttribute('long') );
      
      thePoint = new google.maps.LatLng( pLat, pLong );
      tMarker = createMarker( thePoint, locs[i] );
    }
    return true;
  }

}



function getLocationIcon( location ) {

  var imagref = gMapConfig.MarkerIcons[ location.getAttribute('icon').toLowerCase() ];
  
	if (! imagref ){
		imagref =  gMapConfig.MarkerIconDefault;
	}
  var imageicon = {
	size : new google.maps.Size(12, 20),
	anchor : new google.maps.Point(6, 20),
	shadow : shadow,
  	url :  imagref
  };
  return imageicon;
}

function addLocationsToMap() {
  for ( var i=0; i < gMarkers.length; i++ ) {	   
	gMarkers[i].setMap(gMap);
  }
  return true;
}

function createMarker( point, location )
{
  
  var html, htmlStart, htmlEnd, toHereHtml, fromHereHtml;
	
  var locName = location.getElementsByTagName('name')[0].firstChild.data;
  var locStreet = location.getElementsByTagName('street')[0].firstChild.data;
  var locCity = location.getElementsByTagName('city')[0].firstChild.data;
  var locState = location.getElementsByTagName('state')[0].firstChild.data;
  var locZip = location.getElementsByTagName('zip')[0].firstChild.data;
  var locPhone = location.getElementsByTagName('phone')[0].firstChild.data;
  
  var address = locStreet + '<br>' + locCity + ', ' + locState + ' ' + locZip;
  var address2 = address.replace('<br>',', ');
  
  var toHereLink   = '<a href="javascript:void(0)" onClick="getDirectionsToHere(' + gMarkerIndex + ')">To Here</a>';
  var fromHereLink = '<a href="javascript:void(0)" onClick="getDirectionsFromHere(' + gMarkerIndex + ')">From Here</a>';
	
  htmlStart      = '<div id="popup' + location.getAttribute('id') + '" class="locationPopup">';
  htmlStart     += '<h1>Address:</h1>';
  if ( locName ) {
    htmlStart += '<p class="name">' + locName + '</p>';
  }
  htmlStart     += '<p class="address">' + address + '</p>';
  htmlStart     += '<p class="phone">' + locPhone + '</p>';
  htmlEnd = '</div>';
  
  html = htmlStart;
  html += '<p class="directions"><strong>Get Directions:</strong> ' + toHereLink + ' - ' + fromHereLink + '</p>';
  html += htmlEnd;

  toHereHtml      = htmlStart;
  toHereHtml     += '<p class="directions"><strong>Get Directions:</strong> To Here - ' + fromHereLink + '</p>';
  toHereHtml     += '<form action="javascript:getDirections(\'th_' + gMarkerIndex + '\')">';
  toHereHtml     += '<p class="small grey">Start Address</p>';
  toHereHtml     += '<input type="text" id="startAddr_th_' + gMarkerIndex + '" class="address" /><input type="submit" value="Go" /></p>';
  toHereHtml     += '<input type="hidden" id="endAddr_th_' + gMarkerIndex + '" value="' + address2 + '@' + point.lat() + ',' + point.lng() + '"/>';
  toHereHtml     += '</form>';
  toHereHtml     += htmlEnd;
  
  fromHereHtml    = htmlStart;
  fromHereHtml   += '<p class="directions"><strong>Get Directions:</strong> ' + toHereLink + ' - From Here</p>';
  fromHereHtml   += '<form action="javascript:getDirections(\'fh_' + gMarkerIndex + '\')">';
  fromHereHtml   += '<p class="small grey">End Address</p>';
  fromHereHtml   += '<input type="text" id="endAddr_fh_' + gMarkerIndex + '" class="address" /><input type="submit" value="Go" /></p>';
  fromHereHtml   += '<input type="hidden" id="startAddr_fh_' + gMarkerIndex + '" value="' + address2 + '@' + point.lat() + ',' + point.lng() + '"/>';
  fromHereHtml   += htmlEnd;

  gMarkersHtml[gMarkerIndex] = html;
  
  var towindow = new google.maps.InfoWindow({
	content: toHereHtml
  });
  var fromwindow = new google.maps.InfoWindow({
	content: fromHereHtml
  });
  gMarkersToHereHtml[gMarkerIndex] = towindow;
  gMarkersFromHereHtml[gMarkerIndex] = fromwindow;
	

  var icon1 = getLocationIcon( location );
  var infowindow = new google.maps.InfoWindow({
	content: html
  });
  
	var marker = new google.maps.Marker({
            position: point,
            map: gMap,
			icon: icon1,
			title: locName
    });
  
  google.maps.event.addListener(marker, 'click', function() {
	if(openedwindow)
		openedwindow.close();
	infowindow.open(gMap,marker);
	openedwindow = infowindow;
  });
  gMarkers[gMarkerIndex] = marker;
  gMarkerIndex++;
  
  return marker;
}


function getDirectionsToHere( i ) {
	openedwindow.close();
	gMarkersToHereHtml[i].open(gMap,gMarkers[i])
	openedwindow  = gMarkersToHereHtml[i];
}

function getDirectionsFromHere( i ) {
	openedwindow.close();
	gMarkersFromHereHtml[i].open(gMap,gMarkers[i])
	openedwindow  = gMarkersFromHereHtml[i];
}

//
// - This will never work. These id's need to be unique.
//
function getDirections( i ) {

	var start = jQuery( '#startAddr_' + i ).val();
	var end = jQuery( '#endAddr_' + i ).val();
	var request = {
		origin:start,
		destination:end,
		travelMode: google.maps.TravelMode.DRIVING
	};
	directionsService.route(request, function(result, status) {
		if (status == google.maps.DirectionsStatus.OK) {
		  directionsDisplay.setDirections(result);
		}else{
			alert(status);
		}
	});
	openedwindow.close();

}

function showDirectionsPane() {

  var dirDiv = jQuery( '#' + gMapConfig.DirectionsDivId );
  var mapDiv = jQuery( '#' + gMapConfig.MapInnerDivId );
	
  dirDiv.css('display', 'block');
  dirDiv.css('width', mapDiv.css('width') );

}

function dieGracefully( str )
{
  window.alert('dying '+str);
}