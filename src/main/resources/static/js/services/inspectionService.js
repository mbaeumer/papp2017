var services = angular.module('services');
services.factory('inspectionService',function($http, loginService, urlService){
    return {        
        createInspection : function(inspection, callbackSuccess, callbackError){
            $http.post(urlService.baseRESTURL + urlService.inspectionURL, inspection).then(function(data){
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
            $http.put(urlService.baseRESTURL + urlService.inspectionURL, inspection).then(function(data){
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
        getMyInspections : function(callbackSuccess, callbackError){
        	var today = new Date();
        	var strDate = today.toString("MM/dd/yyyy");
        	strDate += " 07:00:00";
        	var dateString = new Date().toString("MM/dd/yyyy");
        	var date = new Date(dateString);
        	
        	$http.get(urlService.baseRESTURL + urlService.inspectionURL + 'my?userId='+ loginService.currentUserId + '&date=' + strDate).then(function(data){
            	if (data.status == 200){              
            		callbackSuccess(data.data);
                }
                else{
                    callbackError("Error when retreiving my inspections");
                }
            });          
        },
        deleteInspection : function(id, callbackSuccess, callbackError){
        	$http['delete'](urlService.baseRESTURL + urlService.inspectionURL + id).then(function(data){
            	if (data.status == 200){              
            		callbackSuccess(data.data);
                }
                else{
                    callbackError("Error when deleting my inspections");
                }
            });          
        },
        getLatestInspection : function(userID, date, callbackSuccess, callbackError){
        	
			date += " 07:00:00";
        	$http.get(urlService.baseRESTURL + urlService.inspectionURL + 'latest?userId='+ userID + '&date=' + date).then(function(data){
            	if (data.status == 200 || data.status == 204){              
            		callbackSuccess(data.data);
                }
                else{
                    callbackError("Error when retreiving the latest inspection");
                }
            });          
        }
    };
});