var services = angular.module('services');
services.factory('cookieUtilService', function($http, $cookies){
    return {
        initCookies : function(data){
            $cookies.put('username', data.userName);
            $cookies.put('firstname', data.firstName);
            $cookies.put('lastname', data.lastName);
            $cookies.put('userid', data.id);
            var d = new Date();
            $cookies.put('sessionExpiryDate', d.setMinutes(d.getMinutes() + 5));
        },
        extendCookie : function(){
            var d = new Date();
            $cookies.put('sessionExpiryDate', d.setMinutes(d.getMinutes() + 5));
        },
        isCookieValid : function(){
            var userid = $cookies.get('userid');
            var username = $cookies.get('username');
            var sessionExpiryDate = $cookies.get('sessionExpiryDate');
            var now = new Date();
            return (userid !== undefined && username !== undefined && now <= sessionExpiryDate);
        },
        getUserId : function(){
            return $cookies.get('userid');
        },
        getUserName : function(){
            return $cookies.get('username');
        },
        invalidateCookies : function(){
            $cookies.put('username', undefined);
            $cookies.put('firstname', undefined);
            $cookies.put('lastname', undefined);
            $cookies.put('userid', undefined);
            var d = new Date();
            $cookies.put('sessionExpiryDate', d.setMinutes(d.getMinutes() - 5));
        }
    }
})