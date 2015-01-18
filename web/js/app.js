'use strict';

define([
  'angular',
  'components/filters',
  'components/services',
  'components/directives',
  'components/controllers',
  'angularRoute',
], function (angular, filters, services, directives, controllers) {

    // Declare app level module which depends on filters, and services
    
    return angular.module('mainApp', [
      'ngRoute',
      'mainApp.filters',
      'mainApp.services',
      'mainApp.directives',
      'mainApp.controllers'
    ]);
});

/*'use strick';
define(['angular', 'angular-route'], function (ang) {
  function starUp() {
    var app = angular.module('mainApp', ['ngRoute']);
    return app;
  }

  return starUp;
}, function (error) {
  console.log(error);
});*/