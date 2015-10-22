(function() {
    'use strict';

    angular
    .module('app.libraries')
    .config(function ($stateProvider) {

      $stateProvider.state('tab.libraries', {
        url: '/libraries',
        views: {
          'tab-libraries': {
            templateUrl: 'src/libraries/libraries.html',
            controller: 'Libraries as vm',
            resolve: {
              librariesData: function (LibrariesSrv) {
                return LibrariesSrv.getLibraries();
              }
            }
          }
        }
      });

      $stateProvider.state('tab.libraries-details', {
        url: '/libraries/:xmlUrl',
        views: {
          'tab-libraries': {
            templateUrl: 'src/libraries/libraries-details.html',
            controller: 'LibrariesDetails as vm',
            resolve: {
              libraryData: function (LibrariesSrv, $stateParams) {
                console.log('PARAMS: ', $stateParams.xmlUrl);
                return LibrariesSrv.getLibrary($stateParams.xmlUrl);
              }
            }
          }
        }
      });

    })
})();
