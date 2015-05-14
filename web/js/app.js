'use strict';

define([
  'angular',
  'components/home/HomeModule',
  'components/auth/AuthModule',
  'components/api',
  'angularRoute',
], function (angular, Home, Auth, API) {

    // Declare app level module which depends on filters, and services
    var app = angular.module('mainApp', [
          'ngRoute',
          'mainApp.Api',
          'mainApp.Home',
          'mainApp.Auth',
        ]).config(['$httpProvider', function ($httpProvider) {
          $httpProvider.interceptors.push(function ($q) {
              return {
                  'response': function (response) {
                      //Will only be called for HTTP up to 300
                      console.log(' ::: $httpProvide.interceptors response (up to 300) ::::::::::');
                      console.log(response);
                      console.log(' :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
                      return response;
                  },
                  'responseError': function (rejection) {
                      console.log(' ::: $httpProvide.interceptors reject (upper 300) ::::::::::');
                      console.log(rejection);
                      console.log(' :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::');
                      if(rejection.status === 401) {
                          console.log('its 401 from handler')
                          location.replace('#/login');
                      }
                      return $q.reject(rejection);
                  }
              };
          });
        }]).controller('mainController', function ($scope, $http, $window, $location) {
          $scope.init = function() {
            sessionStorage.clear();
          };
        }).factory('authInterceptor', function($rootScope, $q, $window) {
          return {
              request: function (config) {
                config.headers = config.headers || {};
                //
                //@TODO: dont use sessionStorage. Store token inside the app. 
                //       In this case you dont need clearify sessionStorage each time        
                //
                if ($window.sessionStorage.token) {
                  config.headers.Authorization = $window.sessionStorage.token;
                }
                return config;
              },
              response: function (response) {
                if (response.status === 401) {
                  // handle the case where the user is not authenticated
                }
                return response || $q.when(response);
              }
            };
        }).run(function () {
          console.log('runned')
        });
    app.config(function($httpProvider) {
      $httpProvider.interceptors.push('authInterceptor');
    });
    
    return app;
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