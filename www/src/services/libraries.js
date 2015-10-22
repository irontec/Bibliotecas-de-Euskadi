(function() {
  'use strict';

  angular
  .module('app.services')
  .factory('LibrariesSrv', LibrariesSrv);

  /* @ngInject */
  function LibrariesSrv($http, $location, $q, logger, x2js) {

    // SERVICE
    var service = {
      getLibraries: getLibraries,
      getLibrary: getLibrary
    };

    return service;

    // METHODS
    function getLibraries() {
      var deferred = $q.defer();

      $http.get('http://opendata.euskadi.eus/contenidos/ds_localizaciones/bibliotecas_publicas_euskadi/opendata/bibliotecas.json')
      .then(getLibrariesComplete)
      .catch(function(message) {
        logger.error('Error getting libraries', message, 'Get Libraries');
        deferred.reject();
        $location.url('/');
      });

      function getLibrariesComplete(data, status, headers, config) {

        var libraries = [];

        for (var i = 0; i < data.data.length; i++) {
          var library = {};

          library.name = data.data[i].documentName.substr(data.data[i].documentName.lastIndexOf(' -')+2);
          library.province = data.data[i].libraryProvince;
          library.town = data.data[i].libraryTown;
          library.xmlUrl = data.data[i].dataXML;

          libraries.push(library);
        }

        deferred.resolve(libraries);
      }

      return deferred.promise;
    }

    function getLibrary(xmlUrl) {
      console.log(xmlUrl);
      var deferred = $q.defer();

      $http.get(xmlUrl)
      .then(getLibraryComplete)
      .catch(function(message) {
        logger.error('Error getting library', message, 'Get Library');
        deferred.reject();
        $location.url('/');
      });

      function getLibraryComplete(data, status, headers, config) {
        var x2js = new X2JS();
        var jsonObj = x2js.xml_str2json( data.data );
        if (!jsonObj) {
          logger.error('Can\'t get library data', data, 'Error getting library info');
          return;
        }
        var library = {};

        if (jsonObj.library['imageUrl'] && jsonObj.library['imageUrl'].__cdata) {
          var imageElement = jsonObj.library['imageUrl'].__cdata;
          var src = imageElement.match(/src=\"[^\"]+\"/g);
          var urlImg = src[0].substring(5, src[0].length-1);
          library.photo = urlImg;
        }
        library.phone = jsonObj.library['phone'];
        library.geolocation = jsonObj.library['geolocation'].__cdata;
        library.name = jsonObj.library['name'].__cdata.substr(jsonObj.library['name'].__cdata.lastIndexOf(' -')+2);
        library.province = jsonObj.library['province'].__cdata;
        library.town = jsonObj.library['town'].__cdata;
        library.address = jsonObj.library['address'].__cdata;
        if (jsonObj.library['timeTable'] && jsonObj.library['timeTable'].__cdata) {
          library.timeTable = jsonObj.library['timeTable'].__cdata;
        }
        if (jsonObj.library['summerTimeTable'] && jsonObj.library['summerTimeTable'].__cdata) {
          library.summerTimeTable = jsonObj.library['summerTimeTable'].__cdata;
        }
        library.postCode = jsonObj.library['postCode'];
        library.email = jsonObj.library['email'].__cdata;
        library.services = {};
        library.services['Sala de conferencias'] = jsonObj.library['conference'] === 'S';
        library.services['Hemeroteca'] = jsonObj.library['hemeroteca'] === 'S';
        library.services['Préstamos'] = jsonObj.library['loan'] === 'S';
        library.services['Préstamos interbibliotecarios'] = jsonObj.library['interlibraryLoan'] === 'S';
        library.services['Internet'] = jsonObj.library['internet'] === 'S';
        library.services['Wifi'] = jsonObj.library['wifi'] === 'S';

        deferred.resolve(library);
      }

      return deferred.promise;
    }
  }
})();
