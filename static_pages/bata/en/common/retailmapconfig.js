// Local settings for this Google Map mashup:

var gMapConfig = 
{
	// XML file containing locations info
	LocationsXmlFile : '../common/locations_retail.xml',
	
	// Set this to TRUE to disable caching of XML location data:
	ForceNoCache : true,
	
	// Pixel dimensions of map
	Width  : 500,
	Height : 500,
	
	// Pixel dimensions of Driving Directions Div
	DirectionsWidth   : 200,
	DirectionsPadding : 8,
	
	// Initial center of origin point for map (latitude/longitude)
	InitialLatitude  : 37.77071473849608,
	InitialLongitude : -122.0086669921875,
	InitialZoomLevel : 8,
	
	// IDs of content DIVs
	MapOuterDivId      : 'googleMapOuter',
	MapInnerDivId      : 'gMap',
	DirectionsDivId    : 'gDrivingDirections',
	
	// Set to TRUE if you'd like the zoom/pan controls available
	ShowBaseControls   : true,
	
	// Set to TRUE if you'd like the street/satellite/hybrid selection controls available
	ShowExtraControls  : false,

	// Define location marker color types and icon URLs
	MarkerIcons : {
		'costco'  : '../images/mm_20_red.png',
		'safeway' : '../images/mm_20_green.png',
	    'walgreens' : '../images/mm_20_blue.png',
		'other'   : '../images/mm_20_yellow.png'
	},

	// The graphic shadow to place under the marker icon
	MarkerShadowIcon : '../images/mm_20_shadow.png',
	
	// A default icon to use if the location type does not match one defined above
	MarkerIconDefault : '../images/mm_20_grey.png'

};
