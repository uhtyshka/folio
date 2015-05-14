define([], function () {
  return ['$scope', '$http', function ($scope, $http) {
    console.log('ola from MAIN controller!');
        
    $scope.$apply();
  }];
});