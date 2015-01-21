 'use strickt';

require.config({
  
  paths: {
    'angular'        : 'libs/angular'          ,
    'angular-router' : 'libs/angular-route'    ,
  },
  shim : {
    'angular' : {
      exports : 'angular'
    },
    'angular-router' : {
      deps: ['angular']
    }
  }

});