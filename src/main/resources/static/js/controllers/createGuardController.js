var controllers = angular.module('controllers');
controllers.controller('createGuardController',function($scope, $modalInstance, $http, reportService){
    $scope.entity = { name: '', code: ''};

    $scope.saveGuard =  function(){
        $modalInstance.close();
        //reportService.create($scope.entity).then(function(data){
        //});
    };
    $scope.abortGuardCreation = function(){
        $modalInstance.close();
    }
});


