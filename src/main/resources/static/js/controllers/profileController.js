var controllers = angular.module('controllers');
controllers.controller('profileController',function($scope, $location, entityService, loginService, User, UserType, userService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.entity = User.get({"userId": loginService.currentUserId }, function(topic, getResponseHeaders){
		$scope.roles = UserType.query(function(){
			$scope.selectedRole = $scope.roles[$scope.entity.userType.id-1];
	    });
    });	
	
	$scope.saveProfile = function (viewLocation) {
        var user = $scope.entity;
        userService.editUser(user, $scope.successCallback, $scope.errorCallback);
    };
    
    $scope.successCallback = function(){
        $location.path("/inspections");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
    
    $scope.abortProfileUpdate = function(){
    	$location.path("/inspections");
    };
});

