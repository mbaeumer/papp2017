var controllers = angular.module('controllers');
controllers.controller('appController',function($scope, $location, dialogService, ActivityType, entityService, loginService){

	$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    
    $scope.isAdmin = function () {
        return loginService.currentUserType !== 'vakt' && loginService.currentUserId !== 0;
    };
    
    $scope.isAccessible = function () {
        return loginService.currentUserId !== 0;
    };
    
    
});

