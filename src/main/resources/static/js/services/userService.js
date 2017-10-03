var services = angular.module('services');
services.factory('userService',function($http, urlService, hostAddressService){
    return {
        currentUser : undefined,
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
            $http.post(hostAddressService.hostAddress + 'users', user).then(function(data){
            	if (data.status == 200){                	
                    if (data.data !== ""){
                        callbackSuccess();
                    }else{
                        callbackError("Kod ej unik");
                    }
                }
                else{
                    callbackError("Kod ej unik");
                }
            });          
        },
        editUser : function(user, callbackSuccess, callbackError){
            $http.put(hostAddressService.hostAddress + 'users', user).then(function(data){
            	if (data.status == 200){                	
                    if (data.data !== ""){
                        callbackSuccess();
                    }else{
                        callbackError("Kod ej unik");
                    }
                }
                else{
                    callbackError("Kod ej unik");
                }
            });          
        },
        getSingleUser : function(id, successCallback, errorCallback){
            $http.get(hostAddressService.hostAddress + 'users/get/' + id).then(function(response){
                 if (response.status == 200){
                     if (response.data.length === 0){
                         errorCallback(response);
                     }else{
                         successCallback(response.data);
                     }
                 }else{
                         errorCallback('An unknown error occurred');
                 }
             });
        }
    };

});
