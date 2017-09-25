var controllers = angular.module('controllers');
controllers.controller('activityTypeController',function($scope, $location, dialogService, ActivityType, entityService, loginService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
    $scope.createActivityType = function () {
        dialogService.createActivityType().result.then(function(dialogData){
            //menuService.getContentByLink("User",init);
        });
    };
    
    $scope.editActivityType = function (id) {
        $scope.entity = ActivityType.get({"typeId": id }, function(topic, getResponseHeaders){
        	entityService.activityToEdit = $scope.entity;
        	$location.path("/editActivity");
        });
    };
    
    $scope.activityTypes = ActivityType.query();

    

});

