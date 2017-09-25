var directives = angular.module('directives');

directives.directive('login', ['loginService','$location',function(loginService,$location){
    return {
        restrict: "E",
        transclude: true,
        replace: true,
        templateUrl: 'partials/directiveLogin.html',
        scope: {

        },
        link: function (scope, element, attrs) {
            scope.loginService = loginService;

            scope.logout = function(){
                loginService.logout();
                $location.path("/Login");
            };
        }
    }
}]);
