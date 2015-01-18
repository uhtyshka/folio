'use strict';

define(['angular', './services'], function (angular, services) {

  /* Filters */
  
  angular.module('mainApp.filters', ['mainApp.services'])
    .filter('interpolate', ['version', function(version) {
      return function(text) {
        return String(text).replace(/\%VERSION\%/mg, version);
      };
  }]);
});