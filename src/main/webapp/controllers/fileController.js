var controllers = angular.module('controllers');
controllers.controller('fileController',function($scope, $location, loginService, Area, entityService, fileService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	  
	$scope.editArea = function (id) {
        $scope.entity = Area.get({"areaId": id }, function(topic, getResponseHeaders){
        	entityService.areaToEdit = $scope.entity;
        	$location.path("/editArea");
        });
    };
    
    $scope.successCallback = function(resource, url){
    	window.open(url);
        $location.path("/summary");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
    
    fileService.getFile($scope.successCallback, $scope.errorCallback);
});
