// Five Indian restaurants Locations in Buffalo, New York area. 
var locations = [{
    title: 'Namaste Indian Restaurant',
    location: {
      lat: 43.0012553,
      lng: -78.7424039
    },
    url:     'http://www.namastebuffalo.com',
    address: '224 Plaza Dr, Buffalo, NY 14221',
    phone:   '(716) 636-0250'
  },
  {
    title: 'Taj Grill',
    location: {
      lat: 42.9461422,
      lng: -78.8710662
    },
    url:     'http://www.tajgrillwny.com/',
    address: '2290 Delaware Ave, Buffalo, NY 14216',
    phone:   '(716) 875-1000'
  },
  {
    title: 'Dosa Place',
    location: {
      lat: 42.9596609,
      lng: -78.8207925
    },
    url:     'https://www.dosaplaceny.com/',
    address: '3500 Main St, Buffalo, NY 14226',
    phone:   '(716) 834-1400'
  },
  {
    title: 'Taste of India',
    location: {
      lat: 42.9810856,
      lng: -78.8174586
    },
    url:     'http://www.tasteofindia.com/',
    address: '3192 Sheridan Dr, Buffalo, NY 14226',
    phone:   '(716) 837-0460'
  },
  {
    title: 'Spices of India',
    location: {
      lat: 42.9766988,
      lng: -78.810341
    },
    url:     'http://www.spicesofindiawny.com/',
    address: '438 Evans St, Williamsville, NY 14221',
    phone:   '(716) 633-4800'
  },
];

/* global variable to use in initMap() and clickMarker() functions.
*/
function makeContentString(location) {

  var contentString = 
        '<div class="content> <div class="title">'    + location.title + "</div>" +
        '<div class="address">'                       + location.address + "</div>" +
        '<div class="phone">'                         + location.phone + "</div>" +
        '<div class="url"> <a href="'                 + location.url + '">' + location.url + "</a></div></div>";  

  return contentString;
}

/* Clear infoWindowes.
*/
function clearInfoWins() {

  // Question?? works in console: vm.locations()[2].infoWindow.close()
  vm.locations().forEach(function(location) { 
    location.infoWindow.close() 
  });

}

var map; //map as global variable
/******************************************************************************************
 Google Map API, initialize map with center around Buffalo, New York, and place markers for 
 above location (objects). Click on marker will open infoWindow.
*******************************************************************************************/
function initMap() {

  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 42.886448,
      lng: -78.878372
    },
    zoom: 10,
  });

  // create map markers and add the map markers to the location objects
  // Reference: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
  locations.forEach(function(location, index) { 

    var marker = new google.maps.Marker({
      map:       map,
      animation: google.maps.Animation.DROP,
      position:  location.location,
      title:     location.title
    });

    // Add marker property to location objects, used when search/filter.
    vm.locations()[index].marker = marker;
  
    // open info window on click
    var contentString = makeContentString(location);
       
    var infoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });
    google.maps.event.addListener(marker, 'click', function() {
      marker.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
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


  this.thirdPartyAPIInfo = ko.observable('<p>third party API info</p>');
  
  // Initially display all the locations (default)
  this.locations = ko.observableArray(locations);
  this.locations().forEach(function(location) {
    location.visible = ko.observable(true);
  });

  // Search, match and filter 
  //observable for the textInput binding
  this.selectedLoc = ko.observable(''); // blank by default

  // Watch the textInput bindings query observable for changes
  // Iterte over the self.locations observableArray and set the visible observable of all matching locations to true
  // and of not matching locations to false.
  // Reference: http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html

  this.firstMatch = ko.computed( function() {
      
    var search = self.selectedLoc().toLowerCase();

    if (!search) {
      return self.locations();
    } else {
        return ko.utils.arrayFilter(self.locations(), function(location) {
          //console.log(location)
          var title = location.title.toLowerCase();
          var result = title.indexOf(search) != -1; // 'Blue Whale'.indexOf('Blue') != -1 -> true

          // the load and execution order matters
          // check if the location object has a marker property before calling the Marker setVisible method on the marker object
          location.marker.setVisible(result); // show or hide markers result is true or false.   
          //TODO: Bug or feature that after filter removed has to refresh to function correctly?
          //console.log(location.title, location.marker.getVisible());
          
          // TOTO: How to close all infoWindow(), following doesn't work!
          clearInfoWins();

          return result; // true or false
        });
    }
  }, self);

  // a click on a list view item activates the corresponing map marker
  // Reference: http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function
  this.clickMarker = function(location) {  // click binding's callback function

    //console.log(location.marker); 
    var contentString = makeContentString(location);
    var infoWindow = new google.maps.InfoWindow({
      content: contentString,
      maxWidth: 200
    });
    location.marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png'); // green vs. blue marker color change, list click vs. map click
    infoWindow.open(map,location.marker);

  }
};

var vm = new ViewModel();
ko.applyBindings(vm);