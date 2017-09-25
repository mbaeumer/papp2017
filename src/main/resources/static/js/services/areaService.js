var services = angular.module('services');
services.factory('areaService',function($http, urlService){
    return {     
    	createArea : function(area, callbackSuccess, callbackError){
            $http.post(urlService.baseRESTURL + urlService.areaURL, area).then(function(data){
            	if (data.status == 200){                	
                    callbackSuccess();
                }
                else{
                    callbackError("Kod ej unik");
                }
            });          
        },
        editArea : function(area, callbackSuccess, callbackError){
            $http.put(urlService.baseRESTURL + urlService.areaURL, area).then(function(data){
            	if (data.status == 200){                	
                    callbackSuccess();
                }
                else{
                    callbackError("Kod ej unik");
                }
            });          
        },
        getComposedAreas : function(callbackSuccess, callbackError){
            $http.get(urlService.baseRESTURL + urlService.areaURL + 'composed/').then(function(data){
            	if (data.status == 200 && data.data !== undefined){       					
                    callbackSuccess(data.data);
                }
                else{
                    callbackError("Fel");
                }
            });          
        },
        getPseudoArea : function(callbackSuccess, callbackError){
            $http.get(urlService.baseRESTURL + urlService.areaURL + 'pseudo/').then(function(data){
            	if (data.status == 200 && data.data !== undefined){       					
                    callbackSuccess(data.data);
                }
                else{
                    callbackError("Fel");
                }
            });          
        },
        getAllAreas : function(callbackSuccess, callbackError){
            $http.get(urlService.baseRESTURL + urlService.areaURL+ 'composed/' ).then(function(data){
            	if (data.status == 200 && data.data !== undefined){       					
                    callbackSuccess(data.data);
                }
                else{
                    callbackError("Fel");
                }
            });          
        }
    };
});
