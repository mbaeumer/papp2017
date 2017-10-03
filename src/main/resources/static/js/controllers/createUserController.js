var controllers = angular.module('controllers');
controllers.controller('createUserController',function($scope, $http, $location, userService, cookieUtilService, userTypeService){
    $scope.entity = { name: '', code: '', role: 'vakt'};

    if (!cookieUtilService.isCookieValid()){
        $location.path('/login');
    }else{
        cookieUtilService.extendCookie();
    }

	$scope.userTypeSuccessCallback = function(data){
        $scope.roles = data;
        $scope.selectedRole = data[0];
    };

    $scope.userTypeErrorCallback = function(){
    };

    $scope.successCallback = function(){
        $location.path("/users");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };

	userTypeService.getUserTypes($scope.userTypeSuccessCallback, $scope.userTypeErrorCallback)

    $scope.title = "Registrera ny användare";

    $scope.saveUser =  function(){
    	var user = {};
    	user.name = $scope.entity.name;
    	user.code = $scope.entity.code;
    	user.userType = { id: $scope.selectedRole.id, name: $scope.selectedRole.name};
    	user.password = $scope.entity.name;
    	userService.createUser(user, $scope.successCallback, $scope.errorCallback);
    };

    $scope.abortUserCreation = function(){
    	$location.path("/users");
    };
});



