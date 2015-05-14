define([], function () {
  return ['$scope'   , 
          '$http'    , 
          '$window'  , 
          '$location',
          'ApiFactory',
          function ($scope, $window, $location, ApiFactory) {

            console.log('here is login');
            console.log($scope);

            var api = $scope.api;

            $scope.authData = {
              email: 'krulatik@gmail.com',
              pswd : '123123'
            };
//
// click on auth btn
//
            $scope.postLogin = function() {              
              api.postLogin($scope.authData).then(function (resp) {
                console.log('here is resp');
                console.log(resp);
              });
/* ///////////////////////////////////////////////////
              $http.post('/login', $scope.authData)
                   .success(function(data, status, headers, config) {
                     var token = (JSON.parse(data.token)).token;
                     $window.sessionStorage.token = token;
                     $location.path('/auth/panel');
                     //$scope.getPanel();
                     console.log('===========================');
                     console.log(data);
              });
*/ /////////////////////////////////////////////////////

            }; // end $scope.postLogin 

            $scope.$apply();
          }];
});