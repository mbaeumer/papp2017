var services = angular.module('services');
services.factory('loginService', function($http, hostAddressService){
    return {
        login : function(credentials, successCallback, errorCallback){
            $http.post(hostAddressService.hostAddress + 'users/login', credentials).then(function(response){
                if (response.status == 200){
                    if (response.data.length === 0){
                        errorCallback('Login failed! Please check username and password!');
                    }else{
                        successCallback(response.data);
                    }
                }else{
                    errorCallback('An unknown error occurred - error details(' + response.status + ')');
                }
            });
        }
    }
})