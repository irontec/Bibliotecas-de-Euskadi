(function() {
    'use strict';

    angular
    .module('app.about')
    .config(function ($stateProvider) {

      $stateProvider.state('tab.about', {
        url: '/about',
        views: {
          'tab-about': {
            templateUrl: 'src/about/about.html',
            controller: 'About as vm'
          }
        }
      });

    })
})();
