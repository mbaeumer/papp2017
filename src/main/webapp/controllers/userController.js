var controllers = angular.module('controllers');
controllers.controller('userController',function($scope, $location, User, loginService, entityService){
	$scope.users = User.query();
    $scope.editUser = function (id) {
        $scope.entity = User.get({"userId": id }, function(topic, getResponseHeaders){
        	entityService.userToEdit = $scope.entity;
        	$location.path("/editUser");
        });
    };    
});
