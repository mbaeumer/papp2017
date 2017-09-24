var services = angular.module('services');
services.factory('metaSummaryService',function($http, loginService, urlService, fileService, filterService){
    return {        
        getMetaSummary : function(callbackSuccess, callbackError){
        	var url = urlService.baseRESTURL + urlService.metaSummaryURL;
        	if (filterService.startDate !== ""){
        		url += '?from=' + filterService.startDate + '&to=' + filterService.endDate;
        	}
            $http.get(url).then(function(data){
            	if (data.status == 200){                	
            		if (data.data.length !== 0){
            			callbackSuccess(data.data);
            		}else{
            			//callbackError(data.data);
            		}
                }
                else{
                    callbackError("Error when editing an inspection");
                }
            });          
        }
    };

});
