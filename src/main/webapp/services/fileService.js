var services = angular.module('services');
services.factory('fileService',function($http, urlService){
    return {
        startDate: "",
        endDate: "",
        getFile : function(callbackSuccess, callbackError){
        	var start = this.startDate;//.toString("MM/dd/yyyy");
        	var end = this.endDate;//.toString("MM/dd/yyyy");
        	var url = urlService.baseRESTURL + 'files/download';
        	if (start !== ""){
        		url += '?from=' + start + '&to=' + end;
        	}
            $http.get(url).then(function(data){
                if (data.status == 200){        	
                    callbackSuccess(data, url);
                }
                else{
                    callbackError("Error when logging in");
                }
            });
        },
        isLoggedIn : function(){
            return this.currentUser !== '';
        }
    };
});
