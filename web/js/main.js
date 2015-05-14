//
//@TODO: check those articles about ADM in Angular with RequireJS
//          - http://www.sitepoint.com/using-requirejs-angularjs-applications/
//          - http://weblogs.asp.net/dwahlin/dynamically-loading-controllers-and-views-with-angularjs-and-requirejs
//          - https://github.com/tnajdek/angular-requirejs-seed/
//
window.name = "NG_DEFER_BOOTSTRAP!";


require.config({
  
  paths: {
    'angular'        : 'libs/angular' ,
    'angularRoute'   : 'libs/angular-route'     
  },
  shim : {
    'angular' : {
      exports : 'angular'
    },
    'angularRoute' : {
      deps: ['angular']
    }
  },
  priority: [
    'angular'
  ]

});

require([
    'angular',
    'app',
    'components/routes'
  ], function (angular, app, routes) {
    var $html = angular.element(document.getElementsByTagName('html')[0]);
    angular.element().ready(function () {
      angular.resumeBootstrap(['mainApp']);
    });

}); // end require


/*

'use strickt';

require.config({
  
  paths: {
    'angular'        : 'libs/angular'          ,
    'angularRoute'   : 'libs/angular-route'     
  },
  shim : {
    'angular' : {
      exports : 'angular'
    },
    'angularRoute' : {
      deps: ['angular']
    }
  },
  priority: {
    'angular'
  }

});

    require(['./app'], function (mainApp) {
      console.log(mainApp)
    });

  $(document).ready(function () {


/*  define('mainApp', ['angular', 'angular-route'], function (angular) {
    var app = angular.module('mainApp', ['']);
    return app;
  });

  });*/