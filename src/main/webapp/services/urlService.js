var services = angular.module('services');
services.factory('urlService',function($http){
    return {
        baseRESTURL : 'http://papp-softhouse.rhcloud.com/rest/',
		//baseRESTURL : 'http://localhost:9090/securitas/rest/',
        userURL: 'users/',
        inspectionURL: 'inspections/',
        categoryURL: 'categories/',
        activityURL: 'activitytypes/',
        fileURL: 'files/download',
        loginURL: 'users/login',
        areaURL: 'areas/',
        metaSummaryURL: 'inspections/metasummary'
        
    };

});
