var controllers = angular.module('controllers');
controllers.controller('categoryTypeController',function($scope, $location, dialogService, Category, entityService, loginService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
    $scope.createCategoryType = function () {
        dialogService.createCategoryType().result.then(function(dialogData){
            //menuService.getContentByLink("User",init);
        });
    };
    
    $scope.editCategoryType = function (id) {
        $scope.entity = Category.get({"typeId": id }, function(topic, getResponseHeaders){
        	entityService.categoryToEdit = $scope.entity;
        	$location.path("/editCategory");
        });
    };

    $scope.categoryTypes = Category.query();
    

});

