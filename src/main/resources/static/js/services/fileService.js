var services = angular.module('services');
services.factory('fileService',function($http, urlService){
    return {
        startDate: "",
        endDate: "",
        getFile : function(callbackSuccess, callbackError){
            start = this.startDate.toString("MM/dd/yyyy");
        	var url = hostAddressService.hostAddress + 'files/download';
        	url += '?from=' + this.startDate + '&to=' + this.endDate;
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
