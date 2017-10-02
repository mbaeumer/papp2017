var controllers = angular.module('controllers');
controllers.controller('createAreaController',function($scope, $http, $location, areaService, cookieUtilService){
   $scope.entity = { name: '', code: '', isActive: true};

    if (!cookieUtilService.isCookieValid()){
        $location.path('/login');
    }else{
        cookieUtilService.extendCookie();
    }

    $scope.title = "Registrera nytt område";

    $scope.saveArea =  function(){
    	var area = {};
    	area.name = $scope.entity.name;
    	area.code = $scope.entity.code;
    	area.isActive = $scope.entity.isActive;
    	areaService.createArea(area, $scope.successCallback, $scope.errorCallback);
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
