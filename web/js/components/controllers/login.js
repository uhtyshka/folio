define([], function () {
  return ['$scope', '$http', '$window', '$location', function ($scope, $http, $window, $location) {
    console.log('ola from async controller!');
    $scope.postLogin = function () {
      $scope.user = {
        username : $('#email').val(),
        password : $('#pswd').val()
      };
      function okPost (data, status, headers, config) {
        var token = (JSON.parse(data.token)).token;
        console.log($window)
        $window.sessionStorage.token = token;
        $location.path('/auth/panel');
        console.log('YOU ARE LOGGEN IN! WELLCOME')
      };
      function errPost (data, status, headers, config) {
        // body...
      }
      $http.post('/login', $scope.user).success(okPost).error(errPost);
    };
    $scope.$apply();
  }];
});