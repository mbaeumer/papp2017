var controllers = angular.module('controllers');
controllers.controller('createUserController',function($scope, $http, User, UserType, $location, userService, loginService){
    $scope.entity = { name: '', code: '', role: 'vakt'};

    if (loginService.currentUserId === 0){
		$location.path("/home");
	}
    
    $scope.roles = UserType.query(function(){
    	$scope.selectedRole = $scope.roles[0];
    });
    
    $scope.title = "Registrera ny användare";

    $scope.saveUser =  function(){
    	var user = new User();
    	
    	user.name = $scope.entity.name;
    	user.usercode = $scope.entity.usercode;
    	user.userType = { id: $scope.selectedRole.id, name: $scope.selectedRole.name};
    	user.password = $scope.entity.name;
    	userService.createUser(user, $scope.successCallback, $scope.errorCallback);
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



