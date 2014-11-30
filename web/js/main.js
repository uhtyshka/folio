console.log('hi')
var app = angular.module('Folio', ['ngRoute']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
  $routeProvider.when('/', {
    templateUrl : 'html/index.html',
    controller  : 'App'
  }).when('/login', {
    templateUrl : 'html/login.html',
    controller  : 'Login'
  }).when('/auth/panel', {
    templateUrl : 'html/panel.html',
    controller  : 'Panel'
  }).otherwise({
    redirectTo: '/'
  });
}]);

app.config(['$httpProvider', function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q) {
        return {
            'response': function (response) {
                //Will only be called for HTTP up to 300
                console.log(response);
                return response;
            },
            'responseError': function (rejection) {
 
                if(rejection.status === 401) {
                    console.log('its 401 from handler')
                    location.replace('#/login');
                }
                return $q.reject(rejection);
            }
        };
    });
}]);

app.controller('App', function ($scope, $http, $window, $location) {
  $scope.init = function() {
    sessionStorage.clear();
  };
});

app.controller('Login', function($scope, $http, $window, $location) {
  console.log('here is login');
  $scope.postLogin = function() {
    $scope.user = {
      username: $('#email').val(), 
      password: $('#pswd').val()
    };
    $http.post('/login', $scope.user)
         .success(function(data, status, headers, config) {
           $window.sessionStorage.token = data.token;
           $location.path('/auth/panel');
           //$scope.getPanel();
           console.log('===========================');
           console.log(data);
         });
  };
});

app.controller('Panel', function($scope, $http, $window, $location) {
  $scope.getPanel = function() {
    $http.get('/auth/panel')
         .success(function(data, status, headers, config) {
           console.log($location);
           console.log('ITS FROM GET ===========================');
           console.log(data);
         })
         .error(function(data, status, headers, config) {

         });
  };  
  $scope.$on('$viewContentLoaded', function() {
    $http.get('/auth/panel')
         .success(function(data, status, headers, config) {
           console.log($location);
           console.log('ITS FROM GET ===========================');
           console.log(data);
         })
         .error(function(data, status, headers, config) {
           $location.path('/login');
         });
  });
});

app.factory('authInterceptor', function($rootScope, $q, $window) {
  return {
      request: function (config) {
        config.headers = config.headers || {};
        if ($window.sessionStorage.token) {
          config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
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
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});