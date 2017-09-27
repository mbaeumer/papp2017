var services = angular.module('services');
services.factory('loginService',function($http, urlService){
    return {
        currentUserId : 0,
        currentUser :  "",
        currentUserType : "",
        currentCompanyCode: 5, 
        inspID:undefined,
        userToEdit: undefined,
        areaToEdit:undefined,
        login : function(username, password, callbackSuccess, callbackError){
            var me = this;
            $http.get(urlService.baseRESTURL + urlService.loginURL + '?username='+ username +'&password=' + password).then(function(data){
                if (data.status == 200){
                	var user = data.data;
                	me.currentUser = user.name;
                	me.currentUserId = user.id;
                	me.currentUserType = user.userType.name; 	
                   callbackSuccess();
                }
                else{
                    callbackError("Fel vid login!");
                }
            });
        },
        isLoggedIn : function(){
            return this.currentUser !== '';
        },
        logout : function(){
        	this.currentUserId = 0;
        	this.currentUser = '';
        }
    };
});


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