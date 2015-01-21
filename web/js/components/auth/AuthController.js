define([], function () {
  return ['$scope', '$http', function ($scope, $http) {
    console.log('ola from MAIN controller!');
    $scope.val = 'hello world' 
    $scope.postLogin = function ($ev) {
      console.log($ev);
    }
    $scope.$apply();
  }];
});