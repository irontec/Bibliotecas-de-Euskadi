(function() {
  'use strict';

  angular
  .module('app.libraries')
  .controller('Libraries', Libraries);

  /* @ngInject */
  function Libraries(logger, modal, $state, librariesData) {
    var vm = this;
    // Variables
    vm.title = 'Lista de bibliotecas';
    vm.libraries = librariesData;
    // Methods

    //////////////////////////////
    orderByLocations();

    function orderByLocations() {
      var province;
      var town;
      vm.locations = {};
      vm.towns = {};

      for (var i = 0; i < vm.libraries.length; i++) {
        if (!vm.libraries[i].province) { continue; }

        province = vm.libraries[i].province;
        town = vm.libraries[i].town;

        if (!vm.locations[province]) {
          vm.locations[province] = {};
        }

        if (!vm.locations[province][town]) {
          vm.locations[province][town] = [];
        }

        vm.locations[province][town].push(vm.libraries[i]);
      }

      vm.provinces = Object.keys(vm.locations);
      vm.provinces.sort();

      for (var i = 0; i < vm.provinces.length; i++) {
        if (!vm.provinces[i]) { continue; }

        var province = vm.provinces[i];
        var towns = Object.keys(vm.locations[province]);
        towns.sort();
        vm.towns[province] = towns;
      }
    }

  }
})();
