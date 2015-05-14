

define(['angular', '../app'], function (angular, app) {
  return app.config(['$routeProvider', function ($routeProvider) {
      console.log('ROUTER IS OK');
      $routeProvider.when('/', {
        templateUrl : 'html/index.html',
        controller  : 'HomeController'
      }).when('/login', {
        templateUrl : 'js/components/auth/auth.html',
        controller  : 'AuthController'
      }).when('/auth/panel', {
        templateUrl : 'js/components/panel/panel.html',
        controller  : 'PanelController'
      });
    }]);
});

/*function folioRoutes($routeProvider, $locationProvider) {
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

return folioRoutes;*/
