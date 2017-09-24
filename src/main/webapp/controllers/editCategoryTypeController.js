var controllers = angular.module('controllers');
controllers.controller('editCategoryTypeController',function($scope, $http, loginService, Area, entityService, categoryTypeService, $location){
	$scope.entity = entityService.categoryToEdit;	
	$scope.title = "Redigera kategorityp";

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.saveCategoryType =  function(){
    	var category = $scope.entity;  	
    	category.description = $scope.entity.description;
    	category.code = $scope.entity.code;
    	categoryTypeService.editCategoryType(category, $scope.successCallback, $scope.errorCallback);
    };
	
    $scope.abortCategoryTypeCreation = function(){
    	$location.path("/categoryTypes");
    };
	
    $scope.successCallback = function(){
        $location.path("/categoryTypes");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
});
