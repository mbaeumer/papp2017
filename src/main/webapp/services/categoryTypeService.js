var services = angular.module('services');
services.factory('categoryTypeService',function($http, urlService){
    return {     
    	createCategoryType : function(categoryType, callbackSuccess, callbackError){
            $http.post(urlService.baseRESTURL + urlService.categoryURL, categoryType).then(function(data){
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
        editCategoryType : function(categoryType, callbackSuccess, callbackError){
            $http.put(urlService.baseRESTURL + urlService.categoryURL, categoryType).then(function(data){
            	if (data.status == 200){                	
            		if (data.data.length === 0){
            			callbackSuccess();
            		}else{
            			callbackError(data.data);
            		}
            	}
                else{
                    callbackError("Error when editing a category type");
                }
            });          
        }
    };
});
