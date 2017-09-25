var services = angular.module('services');
services.factory('activityTypeService',function($http, urlService){
    return {     
    	createActivityType : function(activityType, callbackSuccess, callbackError){
            $http.post(urlService.baseRESTURL + urlService.activityURL, activityType).then(function(data){
            	if (data.status == 200){                	
            		if (data.data.length === 0){
            			callbackSuccess();
            		}else{
            			callbackError(data.data);
            		}
            	}
                else{
                    callbackError("Error!");
                }
            });          
        },
        editActivityType : function(activityType, callbackSuccess, callbackError){
            $http.put(urlService.baseRESTURL + urlService.activityURL, activityType).then(function(data){
            	if (data.status == 200){                	
            		if (data.data.length === 0){
            			callbackSuccess();
            		}else{
            			callbackError(data.data);
            		}
                }
                else{
                    callbackError("Error when editing a activity type");
                }
            });          
        }
    };
});
