var services = angular.module('services');
services.factory('summaryService',function($http, hostAddressService){
    return {
        getSummaries : function(summaryParam, callbackSuccess, callbackError){
            var url = hostAddressService.hostAddress + 'inspections/summary';
            url += '?from=' + summaryParam.fromDate + '&to=' + summaryParam.toDate;
            $http.get(url).then(function(data){
                if (data.status == 200){
                    callbackSuccess(data.data);
                }
                else{
                    callbackError("Error retrieving summary");
                }
            });
            /*
            $http.post(hostAddressService.hostAddress + 'inspections/summary', summaryParam).then(function(data){
                if (data.status == 200){
                    callbackSuccess(data.data);
                }
                else{
                    callbackError("Error when retrieving the summaries");
                }
            });
            */
        },
        createInspection : function(inspection, callbackSuccess, callbackError){
            $http.post(hostAddressService.hostAddress + 'inspections', inspection).then(function(data){
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