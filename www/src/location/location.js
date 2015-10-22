(function() {
  'use strict';

  angular
  .module('app.location')
  .controller('Location', Location);

  function Location(logger, $stateParams, $scope) {
    var vm = this;
    vm.title = 'Ubicación';
    var coords = $scope.parameters.split(",");
    vm.map = { center: { latitude: coords[0], longitude: coords[1] }, zoom: 12 };
    vm.currentPosition = [];
    vm.marker = {
      coords: { latitude: coords[0], longitude: coords[1] },
      options: {
        labelContent: 'Indicaciones hasta la biblioteca',
        labelAnchor: '62 -8',
        labelClass: 'marker-labels'
      },
      showWindow: true
    };

    vm.locationClicked = locationClicked;
    ///////////////////

    var onSuccess = function(position) {
      vm.currentPosition = [position.coords.latitude, position.coords.longitude];
    };

    navigator.geolocation.getCurrentPosition(onSuccess);

    function locationClicked(marker) {
      var destination = [marker.coords.latitude, marker.coords.longitude];

      launchnavigator.navigate(
        destination,
        vm.currentPosition,
        function(){},
        function(error){
          logger.error(error);
        },
        {
          preferGoogleMaps: true
        });
      }
    }
  })();
