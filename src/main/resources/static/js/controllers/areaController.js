var controllers = angular.module('controllers');
controllers.controller('areaController',function($scope, $location, dialogService, loginService, Area, entityService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.areas = Area.query();
	
    $scope.createArea = function () {
        dialogService.createArea().result.then(function(dialogData){
            //menuService.getContentByLink("User",init);
        });
    };
    
    $scope.editArea = function (id) {
        $scope.entity = Area.get({"areaId": id }, function(topic, getResponseHeaders){
        	entityService.areaToEdit = $scope.entity;
        	$location.path("/editArea");
        });
    };
});


