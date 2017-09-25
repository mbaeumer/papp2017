var controllers = angular.module('controllers');
controllers.controller('createCategoryTypeController',function($scope, $http, categoryTypeService, Category, $location, loginService){
    $scope.entity = { code: '', description: ''};
    
    if (loginService.currentUserId === 0){
		$location.path("/home");
	}

    $scope.title = "Registrera ny kategorityp";
    
    $scope.saveCategoryType =  function(){
    	var category = new Category();
    	category.code = $scope.entity.code;
    	category.description = $scope.entity.description;    	
    	categoryTypeService.createCategoryType(category, $scope.successCallback, $scope.errorCallback);
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