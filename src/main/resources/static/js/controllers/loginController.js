var controllers = angular.module('controllers');
controllers.controller('loginController',function($scope, loginService, $location){
    $scope.username = '';
    $scope.password= '';

    $scope.login = function(){
        loginService.login($scope.username,$scope.password, $scope.loggedInCallback,$scope.loggedInErrorCallback);
    };
    
    $scope.loggedInCallback = function(){
        $location.path("/inspections");
    };

    $scope.loggedInErrorCallback = function(message){
        $scope.errorMessage = message;
    };

    $scope.setUser = function(){
        $scope.username = 'Zlatan';
        $scope.password = 'Zlatan';
    };
});
