var controllers = angular.module('controllers');
controllers.controller('userController',function($scope, $location, loginService, entityService, userService, cookieUtilService){
	if (!cookieUtilService.isCookieValid()){
        $location.path('/login');
    }else{
        cookieUtilService.extendCookie();
    }

	$scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };

    $scope.successUserCallback = function(data){
        $scope.users = data;
    };

    $scope.successReadSingleCallback = function(data){
        userService.currentUser = data;
        $location.path("/editUser");
    }

    $scope.errorReadSingleCallback = function(message){
        $scope.errorMessage = message;
    }

    $scope.editUser = function (id) {
        userService.getSingleUser(id, $scope.successReadSingleCallback, $scope.errorReadSingleCallback);
    };

    userService.getUsers($scope.successUserCallback, $scope.errorCallback);
});
