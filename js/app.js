var infoWindow; // global variable for infoWindow on Map Marker

/* foursquare Request to get vanue information.
*/
function getFourSquare(location) {

  // For authentication
  clientID     = "DMP2OCOYCY0E0PEOPDIKR5IBPIZQ0VG1D5E04Q3FNVAZORX3";
  clientSecret = "JGBRNC0H2OUXKGCXCJOZATGHXZHZGAYYIWSKOMT5WKGQDR4R";

  var base_url = "https://api.foursquare.com/v2/";
  var key    = "?client_id=" + clientID + "&client_secret=" + clientSecret + "&v=" + "20140626";
  var urlVenueDetail = base_url+ "venues/" + location.fsId + key;

  $.get(urlVenueDetail, function (result) {
    var canonicalUrl = result.response.venue.canonicalUrl;
    console.log(canonicalUrl);
    location.canonicalUrl = canonicalUrl;
  })
  .fail(function(result) {
     alert("Error with FourSquare Venue Request.");
  });

}

/* Information Window - location information and foursquare data.
 * Note: This may not be the best idea to give foursquare link for that place on the infoWindow.
 *       If more time, could use foursquare api to place more relevant data on the map.
 */
function makeContentString(location) {

  var contentString =
        "<div class='content'> <div class='title'>"   + location.title + "</div>" +
        "<div class='address'>"                       + location.address + "</div>" +
        "<div class='phone'>"                         + location.phone + "</div>" +
        "<div class='url'> <a href='"                 + location.url + "'>" + location.url + "</a></div></div>" +
        "<p> FourSquare: <div class='fsUrl'> <a href='" + location.canonicalUrl + "'>" + location.canonicalUrl + "</a></div></p>";

  return contentString;

}

/* Close all open infoWindowes
*/
function clearInfoWins() {

  vm.locations().forEach(function(location) {
    location.infoWindow.close();
  });

}

var map; //map as global variable
/******************************************************************************************
 Google Map API, initialize map with center around Buffalo, New York, and place markers for
 above location (objects). Click on marker will open infoWindow.
*******************************************************************************************/
function initMap() {

  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 42.886448, lng: -78.878372 },
    zoom: 10
  });

  infoWindow = new google.maps.InfoWindow();

  // create map markers and add the map markers to the location objects
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  locations.forEach(function(location, index) {

    var marker = new google.maps.Marker({
      map:       map,
      animation: google.maps.Animation.DROP,
      position:  location.location,
      title:     location.title
    });

    getFourSquare(location);

    vm.locations()[index].marker = marker;
    google.maps.event.addListener(marker, "click", function() {

      marker.setIcon("http://maps.google.com/mapfiles/ms/icons/green-dot.png");
      var contentString = makeContentString(location);
      infoWindow.setContent(contentString);
      infoWindow.open(map,marker);

    });
    // Add infoWindow property to location objects, used when search/filter.
    vm.locations()[index].infoWindow = infoWindow;
  });

}


/******************************************************************************************
 knockout framework for binding textInput, activating correpsonding Map Markers
*******************************************************************************************/
var ViewModel = function() {

  var self = this;

  // Initially display all the locations (default)
  this.locations = ko.observableArray(locations);
  this.locations().forEach(function(location) {
    location.visible = ko.observable(true);
  });

  // Search, match and filter. Observable for the textInput binding
  this.selectedLoc = ko.observable(""); // blank by default

  // Watch the textInput bindings query observable for changes
  // Iterte over the self.locations observableArray and set the visible observable of all matching locations to true
  // and of not matching locations to false.
  // Reference: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html

  this.firstMatch = ko.computed( function() {

    var search = self.selectedLoc().toLowerCase();

    if (!search) {
        self.locations().forEach(function(location) {
          if (location.marker) {
            location.marker.setVisible(true);
          }
        });
      return self.locations();
    } else {
        return ko.utils.arrayFilter(self.locations(), function(location) {
          var title = location.title.toLowerCase();
          var result = title.indexOf(search) != -1;
          location.marker.setVisible(result); // show or hide markers result is true or false.
          clearInfoWins(); // Close all open Info Windows.
          return result; // true or false
        });
    }
  }, self);

  // a click on a list view item activates the corresponing map marker
  // Reference: http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function
  this.clickMarker = function(location) {  // click binding's callback function

    location.marker.setIcon("http://maps.google.com/mapfiles/ms/icons/blue-dot.png"); // green vs. blue marker color change, list click vs. map click
    var contentString = makeContentString(location);
    location.infoWindow.setContent(contentString);
    location.infoWindow.open(map,location.marker);

  };
};

// In case there is Google Map API Error
function googleMapApiErrorMessage() {
  $("body").prepend("<p> Google Map API Error, please check API keys and try again. </p>");
}

var vm = new ViewModel();
ko.applyBindings(vm);