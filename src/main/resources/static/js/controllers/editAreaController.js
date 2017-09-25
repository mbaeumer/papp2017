var controllers = angular.module('controllers');
controllers.controller('editAreaController',function($scope, $http, loginService, Area, entityService, areaService, $location){
	$scope.entity = entityService.areaToEdit;
	$scope.title = "Redigera område";

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.saveArea =  function(){
    	var area = $scope.entity;  	
    	area.name = $scope.entity.name;
    	area.code = $scope.entity.code;
    	areaService.editArea(area, $scope.successCallback, $scope.errorCallback);
    };

    $scope.abortAreaCreation = function(){
    	$location.path("/areas");
    };
    $scope.successCallback = function(){
        $location.path("/areas");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
});
