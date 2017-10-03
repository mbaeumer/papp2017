var controllers = angular.module('controllers');
controllers.controller('editAreaController',function($scope, $http, loginService, areaService, cookieUtilService, $location){
	$scope.entity = areaService.currentArea;
	$scope.title = "Redigera omrade";

	if (!cookieUtilService.isCookieValid()){
        $location.path('/login');
    }else{
        cookieUtilService.extendCookie();
    }
	
	$scope.saveArea =  function(){
    	var area = $scope.entity;  	
    	area.name = $scope.entity.name;
    	area.code = $scope.entity.code;
    	area.isActive = $scope.entity.isActive;
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
