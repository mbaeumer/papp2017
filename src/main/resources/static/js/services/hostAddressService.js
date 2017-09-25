var services = angular.module('services');
services.factory('hostAddressService', function(){
    return {
        hostAddress : 'http://glucometriq.herokuapp.com/',
        testfunction : function(){
            var test1 = 'test1';
            var test2 = 'test2';
        }
    }
})
