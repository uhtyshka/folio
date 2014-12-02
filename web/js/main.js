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
           var token = (JSON.parse(data.token)).token;
           $window.sessionStorage.token = token;
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
           
         })
         .error(function(data, status, headers, config) {

         });

  };  
  $scope.checkSessionClick = function () {
    $http.get('/auth/getsessions')
         .success(function (data, status, headers, config) {
           console.log('success from getsessions')
         })
         .error(function (argument) {
           console.log('error from getsessions')
         });
  }
  $scope.$on('$viewContentLoaded', function() {
    
    $('#panel-box').height($(window).height());

    $http.get('/auth/panel')
         .success(function(data, status, headers, config) {
//@TODO: this call back doesnt shoot. Discover why
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
});

app.config(function($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
});