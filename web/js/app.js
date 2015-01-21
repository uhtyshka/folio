'use strict';

define([
  'angular',
  'components/home/HomeModule',
  'components/auth/AuthModule',
  'angularRoute',
], function (angular, Home, Auth) {

    // Declare app level module which depends on filters, and services
    
    return angular.module('mainApp', [
      'ngRoute',
      'mainApp.Home',
      'mainApp.Auth',
    ]).run(function () {
      console.log('runned')
    });
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