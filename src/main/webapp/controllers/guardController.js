var controllers = angular.module('controllers');
controllers.controller('guardController',function($scope, $location, dialogService){

    $scope.createGuard = function () {
        dialogService.createGuard().result.then(function(dialogData){
            //menuService.getContentByLink("User",init);
        });
    };

    $scope.guards = [
        {
            id: "1",
            name:'Zlatan',
            code: 1234
        },
        {
            id: "2",
            name:'Pelle',
            code: 0457
        },
        {
            id: "3",
            name:'Lotta',
            code: 7758
        }
    ];

});
