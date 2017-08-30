
// Five Indian restaurants as starter
var locations = [{
    title: 'Namaste Indian Restaurant',
    location: {
      lat: 43.0012553,
      lng: -78.7424039
    },
    url: 'http://www.namastebuffalo.com'
  },
  {
    title: 'Taj Grill',
    location: {
      lat: 42.9461422,
      lng: -78.8710662
    },
    url: 'http://www.tajgrillwny.com/'
  },
  {
    title: 'Dosa Place',
    location: {
      lat: 42.9596609,
      lng: -78.8207925
    },
    url: 'https://www.dosaplaceny.com/'
  },
  {
    title: 'Taste of India',
    location: {
      lat: 42.9810856,
      lng: -78.8174586
    },
    url: 'http://www.tasteofindia.com/'
  },
  {
    title: 'Spices of India',
    location: {
      lat: 42.9766988,
      lng: -78.810341
    },
    url: 'http://www.spicesofindiawny.com/'
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
  locations.forEach(function(location, index) { // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
    var marker = new google.maps.Marker({
      map:       map,
      animation: google.maps.Animation.DROP,
      position:  location.location,
      title:     location.title
    });
  

    vm.locations()[index].marker = marker;

    // open info window on click
    var contentString = location.title;
    var infowindow = new google.maps.InfoWindow({
    	content: contentString
    });

    google.maps.event.addListener(marker, 'click', function() {
      // InfoWindow setContent() method
    	infowindow.open(map,marker);
    });

  });

}

var ViewModel = function() {

  var self = this;
  
  this.locations = ko.observableArray(locations);
  
  this.locations().forEach(function(location) {
    location.visible = ko.observable(true);
  });

  // a click on a list view item activates the corresponing map marker
  // http://knockoutjs.com/documentation/click-binding.html#note-1-passing-a-current-item-as-a-parameter-to-your-handler-function
  this.somethingHappens = function(item) {  // click binding's callback function
    //console.log("click")
    console.log(item); // item.marker
  }

  // add an observable for the textInput binding

  // use a ko computed for filtering?
  //this.whatEver = ko.computed(function() {
    //  console.log(self.locations());
    // watch the textInput bindings query observable for changes
    // iterte over the selt.locations observableArray
    // and set the visible observable of all matching locations to true
    // and of not matching locations to false
    // http://www.knockmeout.net/2011/04/utility-functions-in-knockoutjs.html
    // https://opensoul.org/2011/06/23/live-search-with-knockoutjs/
  //});

};

var vm = new ViewModel();
ko.applyBindings(vm);