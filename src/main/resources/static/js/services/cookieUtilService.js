var services = angular.module('services');
services.factory('cookieUtilService', function($http, $cookies){
    return {
        initCookies : function(data){
            $cookies.put('name', data.name);
            $cookies.put('usercode', data.usercode);
            $cookies.put('userid', data.id);
            $cookies.put('usertype', data.userType.id);
            var d = new Date();
            $cookies.put('sessionExpiryDate', d.setMinutes(d.getMinutes() + 5));
        },
        extendCookie : function(){
            var d = new Date();
            $cookies.put('sessionExpiryDate', d.setMinutes(d.getMinutes() + 5));
        },
        isCookieValid : function(){
            var userid = $cookies.get('userid');
            var name = $cookies.get('name');
            var sessionExpiryDate = $cookies.get('sessionExpiryDate');
            var now = new Date();
            return (userid !== undefined && name !== undefined && now <= sessionExpiryDate);
        },
        getUserId : function(){
            return $cookies.get('userid');
        },
        getUserType : function(){
            result = $cookies.get('usertype');
            return $cookies.get('usertype');
        },
        getUserName : function(){
            return $cookies.get('name');
        },
        invalidateCookies : function(){
            $cookies.put('usercode', undefined);
            $cookies.put('name', undefined);
            $cookies.put('userid', undefined);
            $cookies.put('usertype', undefined);
            var d = new Date();
            $cookies.put('sessionExpiryDate', d.setMinutes(d.getMinutes() - 5));
        }
    }
})