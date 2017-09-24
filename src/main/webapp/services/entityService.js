var services = angular.module('services');
services.factory('entityService',function($http){
    return {
        userToEdit: undefined,
        areaToEdit:undefined,
        categoryToEdit: undefined,
        activityToEdit:undefined,
        currentCompanyCode: 5,
        checkin : function($resource){
        	return $resource('rest/users:username', {});
        }
    };
});
