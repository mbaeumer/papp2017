var services = angular.module('services');
services.factory('userTypeService',function($http, urlService, hostAddressService){
    return {
        getUserTypes : function(callbackSuccess, callbackError){
             $http.get(hostAddressService.hostAddress + 'usertypes' ).then(function(data){
                 if (data.status == 200 && data.data !== undefined){
                     callbackSuccess(data.data);
                 }
                 else{
                     callbackError("Error retrieving user types");
                 }
             });
         }
    };
});