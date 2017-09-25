var controllers = angular.module('controllers');
controllers.controller('lookupAreaController',function($scope, $location, dialogService){
    $scope.areas = [
        {
            id: 1,
            code:1234,
            name:'Magasingatan',
            description:''
        },
        {
            id: 2,
            code:6547,
            name:'Ullevi',
            description:''
        },
        {
            id: 3,
            code:5589,
            name:'Kungstorget',
            description:''
        },
        {
            id: 4,
            code:6624,
            name:'ABC torg',
            description:''
        },
        {
            id: 5,
            code:7822,
            name:'Klippan',
            description:''
        }
    ];

});

