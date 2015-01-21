'use strict';

define(['angular'], function (angular) {
  //console.log(homeTemp);
  /* Controllers */
  //var $injector = angular.injector();
  return angular.module('mainApp.Home', ['ngRoute']).directive('homeDirective' , function () {
      return {
        restrict: 'A',
        templateUrl: 'js/components/home/home.html',
        compile: function () {
          console.log('home directve compile fired!')
        },
        link: function () {
          console.log('home directve link fired!')
        }
      };
    })
    // Sample controller where service is being used
    .controller('HomeController', ['$scope', '$injector', function ($scope, $injector) {
      require(['components/home/HomeController'], function(home) {
        // injector method takes an array of modules as the first argument
        // if you want your controller to be able to use components from
        // any of your other modules, make sure you include it together with 'ng'
        // Furthermore we need to pass on the $scope as it's unique to this controller
        console.log('controller was required')
        $injector.invoke(home, this, {'$scope': $scope});
      });
    }]);/*
    // More involved example where controller is required from an external file
    .controller('App', ['$scope', '$injector', function($scope, $injector) {
      require(['components/app/appController'], function(app) {
        // injector method takes an array of modules as the first argument
        // if you want your controller to be able to use components from
        // any of your other modules, make sure you include it together with 'ng'
        // Furthermore we need to pass on the $scope as it's unique to this controller
        $injector.invoke(app, this, {'$scope': $scope});
      });
    }]).controller('Login', ['$scope', '$injector', function ($scope, $injector) {
      require(['components/controllers/login'], function (loginCtr) {
        $injector.invoke(loginCtr, this, {'$scope' : $scope});
      });
    }]).controller('Panel', ['$scope', '$injector', function ($scope, $injector) {
      require(['components/controllers/panel'], function (panel) {
        $injector.invoke(panel, this, {'$scope' : $scope});
      });
    }]);*/
});