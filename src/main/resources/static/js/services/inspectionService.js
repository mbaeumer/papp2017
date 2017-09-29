var services = angular.module('services');
services.factory('inspectionService',function($http, loginService, urlService, hostAddressService){
    return {        
        createInspection : function(inspection, callbackSuccess, callbackError){
            $http.post(hostAddressService.hostAddress + 'inspections', inspection).then(function(data){
            	if (data.status == 200){
            		if (data.data.length === 0){
            			callbackSuccess();
            		}else{
            			callbackError(data.data);
            		}
                }
                else{
                    callbackError("Error when creating a new inspection");
                }
            });          
        },
        editInspection : function(inspection, callbackSuccess, callbackError){
            $http.put(hostAddressService.hostAddress + 'inspections', inspection).then(function(data){
            	if (data.status == 200){                	
            		if (data.data.length === 0){
            			callbackSuccess();
            		}else{
            			callbackError(data.data);
            		}
                }
                else{
                    callbackError("Error when editing an inspection");
                }
            });          
        },
        getMyInspections : function(requestData, callbackSuccess, callbackError){
        	$http.post(hostAddressService.hostAddress + 'inspections/my', requestData).then(function(response){
                if (response.status == 200){
                  callbackSuccess(response.data);
                }else{
                    callbackError('An unknown error occurred - error details(' + response.status + ')');
                }
            });
        },
        getLatestInspection : function(userid, date, callbackSuccess, callbackError){
            requestData = {}
            requestData.userid = userid;
            requestData.date = date;
            $http.post(hostAddressService.hostAddress + 'inspections/latest', requestData).then(function(data){
                if (data.status == 200 || data.status == 204){
                    callbackSuccess(data.data);
                }
                else{
                    callbackError("Error when retrieving the latest inspection");
                }
            });
        },
        deleteInspection : function(id, callbackSuccess, callbackError){
        	$http['delete'](hostAddressService.hostAddress + 'inspections/' + id).then(function(data){
            	if (data.status == 200){              
            		callbackSuccess(data.data);
                }
                else{
                    callbackError("Error when deleting my inspections");
                }
            });          
        }

    };
});

