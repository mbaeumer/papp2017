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

    $scope.editArea = function (id) {
        areaService.getSingleArea(id, $scope.successReadSingleCallback, $scope.errorReadSingleCallback);
    };

    $scope.successReadSingleCallback = function(data){
        areaService.currentArea = data;
        $location.path("/editArea");
    }

    $scope.errorReadSingleCallback = function(message){
        $scope.errorMessage = message;
    }
	
	areaService.getAllAreasExceptStart($scope.successAreaCallback, $scope.errorCallback);

});


