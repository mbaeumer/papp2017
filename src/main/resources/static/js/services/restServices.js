angular.module('restServices', ['ngResource'])
    .factory('User', function ($resource) {
    	return $resource('rest/users/:userId', {}, {
        });
    })        
    .factory('Inspection', function ($resource) {
        return $resource('rest/inspections/:inspectionId', {}, {
        	queryByInspectionId: {method: 'GET', url: 'rest/inspections/inspectionIdId=:inspectionId', isArray: true},
        	deleteInspection: {method: 'DELETE', url: 'rest/inspections/inspectionIdId=:inspectionId'}
        });
    })
    .factory('Summary', function ($resource) {
        return $resource('rest/inspections/summary/:inspectionId', {}, {
        });
    })
    .factory('MetaSummary', function ($resource) {
        return $resource('rest/inspections/metasummary/:inspectionId', {}, {
        });
    })
    .factory('Area', function ($resource) {
        return $resource('rest/areas/:areaId', {}, {
        });
    })
    .factory('UserType', function ($resource) {
        return $resource('rest/usertypes/:typeId', {}, {
        });
    })
    .factory('ActivityType', function ($resource) {
        return $resource('rest/activitytypes/:typeId', {}, {
        });
    })
    .factory('Category', function ($resource) {
        return $resource('rest/categories/:typeId', {}, {
        });
    })
;