
// Restaurants constructor similiar to the Cat constructor form the JavaScript Design Patterns course (optional)
// ViewModel constructor
// http://knockoutjs.com/documentation/observables.html#mvvm-and-view-models
// In the ViewModel create an observableArray with restaurant objects
// this.restaurants = ko.observableArray(restaurants); // if you do not want to use a Restaurant constructor
// Separating Out the Model video lesson:
// https://classroom.udacity.com/nanodegrees/nd001/parts/e87c34bf-a9c0-415f-b007-c2c2d7eead73/modules/271165859175461/lessons/3406489055/concepts/34284402380923
// Adding More Cats video lesson
// https://classroom.udacity.com/nanodegrees/nd001/parts/e87c34bf-a9c0-415f-b007-c2c2d7eead73/modules/271165859175461/lessons/3406489055/concepts/34648186930923
// Instantiate the ViewModel
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/new
// The difference between defining the ViewModel as a function expression or defining the viewModel as an object literal:
// https://discussions.udacity.com/t/text-not-updating-with-search-box/182886/6
// Apply the bindings aka activate KO
// http://knockoutjs.com/documentation/observables.html#mvvm-and-view-models#activating-knockout

// Five Indian restaurants as starter
var locations = [{
    title: 'Namaste Indian Restaurant',
    location: {
      lat: 43.0012553,
      lng: -78.7424039
    }
  },
  {
    title: 'Taj Grill',
    location: {
      lat: 42.9461422,
      lng: -78.8710662
    }
  },
  {
    title: 'Dosa Place',
    location: {
      lat: 42.9596609,
      lng: -78.8207925
    }
  },
  {
    title: 'Taste of India',
    location: {
      lat: 42.9810856,
      lng: -78.8174586
    }
  },
  {
    title: 'Spices of India',
    location: {
      lat: 42.9766988,
      lng: -78.810341
    }
  },
];


function initMap() {

  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 42.886448,
      lng: -78.878372
    },
    zoom: 10,
  });

  // create map markers and add the map markers to the location objects
  var marker = new google.maps.Marker({
    map: map,
    draggable: true,
    //Question: position from location using google,map.LatLng(location lat and lng cordinated)
    title: 'Hello Marker!!'
  });
  marker.setMap(map);
  //marker.addListener('click', toggleBounce);

  vm.locations().marker = marker;

  // open info window on click
  var contentString = 'Hello World!';
  var infowindow = new google.maps.InfoWindow({
  	content: contentString
  });

  google.maps.event.addListener(marker, 'click', function() {
  	infowindow.open(map,marker);
  });

}

var ViewModel = function() {

  var self = this;
  
  this.locations = ko.observableArray(locations);
  
  this.locations().forEach(function(location) {
    location.visible = ko.observable(true);

    // Question:  How to assgign lat, lng for each location?
    //self.Lat = ko.observable(locations.location.lat);
    //self.Lng = ko.observable(locations.location.lng);
  });

  // a click on a list view item activates the corresponing map marker
  // ko click binding
  // http://knockoutjs.com/documentation/click-binding.html

  // use a ko computed for filtering?
  //this.whatEver = ko.computed(function() {
  //  console.log(self.locations());
  //});
  
  /*this.showMarker = ko.computed(function() {
    if (location.visible === true) {
    	this.marker.setMap(map);
    } else {
    	this.marker.setMap(null);
    }
    return true;
  }, this);*/

};

var vm = new ViewModel();
ko.applyBindings(vm);