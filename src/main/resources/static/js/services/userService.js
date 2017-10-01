var services = angular.module('services');
services.factory('userService',function($http, urlService, hostAddressService){
    return {
        getUsers : function(callbackSuccess, callbackError){
             $http.get(hostAddressService.hostAddress + 'users' ).then(function(data){
                 if (data.status == 200 && data.data !== undefined){
                     callbackSuccess(data.data);
                 }
                 else{
                     callbackError("Error retrieving users");
                 }
             });
         },
        createUser : function(user, callbackSuccess, callbackError){
            $http.post(urlService.baseRESTURL + urlService.userURL, user).then(function(data){
            	if (data.status == 200){                	
                    callbackSuccess();
                }
                else{
                    callbackError("Tj�nstenummer ej unik");
                }
            });          
        },
        editUser : function(user, callbackSuccess, callbackError){
            $http.put(urlService.baseRESTURL + urlService.userURL, user).then(function(data){
            	if (data.status == 200){                	
                    callbackSuccess();
                }
                else{
                    callbackError("Tj�nstenummer ej unik");
                }
            });          
        }
    };

});
