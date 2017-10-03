var services = angular.module('services');
services.factory('areaService',function($http, hostAddressService){
    return {     
    	createArea : function(area, callbackSuccess, callbackError){
            $http.post(hostAddressService.hostAddress + 'areas', area).then(function(data){
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
        editArea : function(area, callbackSuccess, callbackError){
            $http.put(hostAddressService.hostAddress + 'areas', area).then(function(data){
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
        getComposedAreas : function(callbackSuccess, callbackError){
            $http.get(hostAddressService.hostAddress + 'areas/composed/').then(function(data){
            	if (data.status == 200 && data.data !== undefined){       					
                    callbackSuccess(data.data);
                }
                else{
                    callbackError("Fel");
                }
            });          
        },
        getPseudoArea : function(callbackSuccess, callbackError){
            $http.get(hostAddressService.hostAddress + 'areas/pseudo/').then(function(data){
            	if (data.status == 200 && data.data !== undefined){       					
                    callbackSuccess(data.data);
                }
                else{
                    callbackError("Fel");
                }
            });          
        },
        getAllAreas : function(callbackSuccess, callbackError){
            $http.get(hostAddressService.hostAddress + 'areas/' ).then(function(data){
            	if (data.status == 200 && data.data !== undefined){       					
                    callbackSuccess(data.data);
                }
                else{
                    callbackError("Fel");
                }
            });          
        },
        getAllAreasExceptStart : function(callbackSuccess, callbackError){
            $http.get(hostAddressService.hostAddress + 'areas/notstart' ).then(function(data){
                if (data.status == 200 && data.data !== undefined){
                    callbackSuccess(data.data);
                }
                else{
                    callbackError("Fel");
                }
            });
        },
        getSingleArea : function(id, successCallback, errorCallback){
            $http.get(hostAddressService.hostAddress + 'areas/get/' + id).then(function(response){
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
