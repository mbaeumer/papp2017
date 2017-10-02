var controllers = angular.module('controllers');
controllers.controller('areaController',function($scope, $location, loginService, entityService, areaService, cookieUtilService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };

	$scope.successAreaCallback = function(data){
        $scope.areas = data;
    };
	
	areaService.getAllAreasExceptStart($scope.successAreaCallback, $scope.errorCallback);

	/*
    $scope.editArea = function (id) {
        $scope.entity = Area.get({"areaId": id }, function(topic, getResponseHeaders){
        	entityService.areaToEdit = $scope.entity;
        	$location.path("/editArea");
        });
    };
    */
});


