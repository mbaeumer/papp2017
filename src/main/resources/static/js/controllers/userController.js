var controllers = angular.module('controllers');
controllers.controller('userController',function($scope, $location, loginService, entityService, userService, cookieUtilService){
	$scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };

    $scope.successUserCallback = function(data){
        $scope.users = data;
    };

    userService.getUsers($scope.successUserCallback, $scope.errorCallback);
});
