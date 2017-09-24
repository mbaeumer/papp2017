var controllers = angular.module('controllers');
controllers.controller('createActivityTypeController',function($scope, $http, $location, ActivityType, activityTypeService, loginService){
    $scope.entity = { code: '', description: ''};
    
    if (loginService.currentUserId === 0){
		$location.path("/home");
	}
    
    $scope.title = "Registrera ny aktivitetstyp";

    $scope.saveActivityType =  function(){
        var activityType = new ActivityType();
		activityType.code = $scope.entity.code;
    	activityType.description = $scope.entity.description;
    	
    	activityTypeService.createActivityType(activityType, $scope.successCallback, $scope.errorCallback);   	
    };
	
    $scope.abortActivityTypeCreation = function(){
    	$location.path("/activityTypes");
    };  
    
    $scope.successCallback = function(){
        $location.path("/activityTypes");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
});