(function() {
  'use strict';

  angular
  .module('app.about')
  .controller('About', About);

  /* @ngInject */
  function About() {
    var vm = this;
    // Variables
    vm.title = 'Sobre la aplicación';
    vm.author = "Mikel Eizagirre";
    vm.description = "Ionic Framework - 2015";
    vm.avatarMikel = "img/mikel.jpeg";
    vm.avatarIrontec = "img/irontec.png";
    // Methods

    //////////////////////////////

  }
})();
