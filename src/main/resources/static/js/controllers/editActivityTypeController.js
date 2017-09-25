var controllers = angular.module('controllers');
controllers.controller('editActivityTypeController',function($scope, $http, loginService, entityService, activityTypeService, $location){
	$scope.entity = entityService.activityToEdit;
	$scope.title = "Redigera aktivitetstyp";

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.saveActivityType =  function(){
    	var activity = $scope.entity;  	
    	activity.description = $scope.entity.description;
    	activity.code = $scope.entity.code;
    	activityTypeService.editActivityType(activity, $scope.successCallback, $scope.errorCallback);
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
