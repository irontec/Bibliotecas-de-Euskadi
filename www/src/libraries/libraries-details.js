(function() {
  'use strict';

  angular
  .module('app.libraries')
  .controller('LibrariesDetails', LibrariesDetails);

  /* @ngInject */
  function LibrariesDetails(logger, modal, $state, libraryData) {
    var vm = this;
    // Variables
    vm.title = libraryData.town;
    vm.library = libraryData;
    // Methods
    vm.showLocation = showLocation;
    //////////////////////////////

    function showLocation() {
       modal.show('src/location/location.html', 'Location as vm', vm.library.geolocation)
      .then(function(result) {
          // result
      }, function(err) {
          // error
      });
    }
  }
})();
