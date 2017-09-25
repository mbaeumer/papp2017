var services = angular.module('services');
services.factory('userService',function($http, urlService){
    return {        
        createUser : function(user, callbackSuccess, callbackError){
            $http.post(urlService.baseRESTURL + urlService.userURL, user).then(function(data){
            	if (data.status == 200){                	
                    callbackSuccess();
                }
                else{
                    callbackError("Tjänstenummer ej unik");
                }
            });          
        },
        editUser : function(user, callbackSuccess, callbackError){
            $http.put(urlService.baseRESTURL + urlService.userURL, user).then(function(data){
            	if (data.status == 200){                	
                    callbackSuccess();
                }
                else{
                    callbackError("Tjänstenummer ej unik");
                }
            });          
        }
    };

});
