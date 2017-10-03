var controllers = angular.module('controllers');
controllers.controller('editUserController',function($scope, $http, $location, userService, cookieUtilService, userTypeService){
	$scope.entity = userService.currentUser;

	if (!cookieUtilService.isCookieValid()){
        $location.path('/login');
    }else{
        cookieUtilService.extendCookie();
    }

	$scope.title = "Redigera anv&auml;ndare";

    $scope.userTypeSuccessCallback = function(data){
        $scope.roles = data;
        $scope.selectedRole = data[0];
        var selectedIndex = 0;
        for (var i = 0; i<$scope.roles.length;i++){
            var role = {id:0};
            role.id = $scope.roles[i].id;

            if (role.id === $scope.entity.userType.id){
                selectedIndex = i;
            }
        }
        $scope.selectedRole = $scope.roles[selectedIndex];
    };

    $scope.userTypeErrorCallback = function(){
    };

    userTypeService.getUserTypes($scope.userTypeSuccessCallback, $scope.userTypeErrorCallback)


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
