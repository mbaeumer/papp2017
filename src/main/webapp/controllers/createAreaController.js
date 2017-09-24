var controllers = angular.module('controllers');
controllers.controller('createAreaController',function($scope, $http, $location, Area, areaService, loginService){
    $scope.entity = { name: '', code: ''};

    if (loginService.currentUserId === 0){
		$location.path("/home");
	}
    
    $scope.title = "Registrera nytt område";
    
    $scope.saveArea =  function(){
    	var area = new Area();
    	area.name = $scope.entity.name;
    	area.code = $scope.entity.code;
    	
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