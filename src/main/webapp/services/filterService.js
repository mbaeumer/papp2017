var services = angular.module('services');
services.factory('filterService',function($http, urlService){
    return {   
        startDate: "",
        endDate: ""        
    };

});
