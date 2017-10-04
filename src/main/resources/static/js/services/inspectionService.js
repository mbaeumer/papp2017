var services = angular.module('services');
services.factory('inspectionService',function($http, loginService, urlService, hostAddressService){
    return {
        currentInspection: undefined,
        createInspection : function(inspection, callbackSuccess, callbackError){
            $http.post(hostAddressService.hostAddress + 'inspections', inspection).then(function(data){
            	if (data.status == 200){
            	  if (data.data.length === 0){
            	    callbackSuccess();
            	  }else{
            	    callbackError(data.data);
            	  }
            	}else{
            	  callbackError(data.data);
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
                }else{
                  callbackError(data.data);
                }
            });
        },
        getSingleInspection : function(id, successCallback, errorCallback){
            $http.get(hostAddressService.hostAddress + 'inspections/get/' + id).then(function(response){
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
        deleteInspection : function(id, successCallback, errorCallback){
            $http.delete(hostAddressService.hostAddress + 'inspections' + "/" + id).then(function(response){
                 if (response.status == 200){
                     successCallback();
                 }else{
                     errorCallback('An unknown error occurred');
                 }
             });
        },
        cancel : function(successCallback){
            successCallback("error")
        }
    };
});

