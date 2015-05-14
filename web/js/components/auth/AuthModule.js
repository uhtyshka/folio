'use strict';

define(['angular'], function (angular) {
  //console.log(homeTemp);
  /* Controllers */
  //var $injector = angular.injector();
  return angular.module('mainApp.Auth', ['ngRoute']).directive('authDirective' , function () {
      return {
        restrict: 'A',
        templateUrl: 'js/components/auth/auth.html',
        compile: function () {
          console.log('auth directve compile fired!')
        },
        link: function () {
          console.log('auth directve link fired!')
        }
      };
    })
    // Sample controller where service is being used
    .controller('AuthController', ['$scope', 
                                   '$injector', 
                                   'ApiFactory', 
                                   function ($scope, $injector, ApiFactory) {
                                    console.log('::::::::::::::: API BEFOR INJECTOR')
                                    console.log(ApiFactory)
                                    console.log('::::::::::::::: API BEFOR INJECTOR');
                                    $scope.api = ApiFactory;
      require(['components/auth/AuthController'], function(auth) {
        // injector method takes an array of modules as the first argument
        // if you want your controller to be able to use components from
        // any of your other modules, make sure you include it together with 'ng'
        // Furthermore we need to pass on the $scope as it's unique to this controller
        $injector.invoke(auth, this, {'$scope': $scope});
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