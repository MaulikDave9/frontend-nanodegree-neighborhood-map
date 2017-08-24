// first goal: display a list with location names using Knockout.js (add the map later)
// hard coded Array of location objects
// https://github.com/udacity/ud864/blob/master/Project_Code_5_BeingStylish.html#L150
// initMap function (later)
// https://developers.google.com/maps/documentation/javascript/examples/map-simple
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
];


function initMap() {
  var map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: 42.886448,
      lng: -78.878372
    },
    zoom: 10,
  });

  // create map markers
  // add the map markers to the location objects
  // vm.locations().marker = marker

  // open info window on click

}

var ViewModel = function() {

  var self = this;
  this.something = ko.observable("");
  this.locations = ko.observableArray(locations);
  this.locations().forEach(function(location) {
    location.visible = ko.observable(true);
  });

  // a click on a list view item activates the corresponing map marker
  // ko click binding
  // http://knockoutjs.com/documentation/click-binding.html

  // use a ko computed for filtering?
  this.whatEver = ko.computed(function() {
    console.log(self.something());
  });
};

var vm = new ViewModel();
ko.applyBindings(vm);