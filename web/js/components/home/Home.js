'use strict';

define(['angular', ''], function (angular) {

  /* Controllers */
  
  return angular.module('mainApp.Home', [])
                .service('homeService', ['$scope', function(){
                  console.log('services fired!');
                  return;
                }]) // end services
    // Sample controller where service is being used
                .controller('HomeController', ['$scope', 'homeService', function ($scope, homeService) {
                  require(['components/app/appController'], function(app) {
                    // injector method takes an array of modules as the first argument
                    // if you want your controller to be able to use components from
                    // any of your other modules, make sure you include it together with 'ng'
                    // Furthermore we need to pass on the $scope as it's unique to this controller
                    $injector.invoke(app, this, {'$scope': $scope});
                  });
                }])
                .directive('homeDirective' , function () {
                  return {
                    templateUrl: 'home.html',
                    compile: function () {
                      console.log('home directve compile fired!')
                    },
                    link: function () {
                      console.log('home directve link fired!')
                    }
                  };
                });


              /*
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