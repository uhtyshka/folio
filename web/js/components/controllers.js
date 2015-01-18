'use strict';

define(['angular', './services'], function (angular) {

  /* Controllers */
  
  return angular.module('mainApp.controllers', ['mainApp.services'])
    // Sample controller where service is being used
    .controller('MyCtrl1', ['$scope', 'version', function ($scope, version) {
      $scope.scopedAppVersion = version;
    }])
    // More involved example where controller is required from an external file
    .controller('App', ['$scope', '$injector', function($scope, $injector) {
      require(['components/controllers/app'], function(app) {
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
    }]);
});