var services = angular.module('services');
services.factory('summaryService',function($http, urlService){
    return {        
        createInspection : function(inspection, callbackSuccess, callbackError){
            $http.post(urlService.baseRESTURL + urlService.inspectionURL, inspection).then(function(data){
            	if (data.status == 200){                	
                    callbackSuccess();
                }
                else{
                    callbackError("Error when creating a new inspection");
                }
            });          
        }
    };

});