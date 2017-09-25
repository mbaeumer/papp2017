var controllers = angular.module('controllers');
controllers.controller('editUserController',function($scope, $http, $location, loginService, User, UserType, entityService, userService){
	$scope.entity = entityService.userToEdit;
	
	$scope.title = "Redigera användare";
	$scope.roles = UserType.query(function(){
		$scope.selectedRole = $scope.roles[$scope.entity.userType.id-1];
    });
	
	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.saveUser =  function(){
    	var user = $scope.entity;
    	user.name = $scope.entity.name;
    	user.usercode = $scope.entity.usercode;
    	user.userType = { id: $scope.selectedRole.id, name: $scope.selectedRole.name};
    	userService.editUser(user, $scope.successCallback, $scope.errorCallback);
    };

    $scope.abortUserCreation = function(){
    	$location.path("/users");
    };    

    $scope.successCallback = function(){
        $location.path("/users");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
});
