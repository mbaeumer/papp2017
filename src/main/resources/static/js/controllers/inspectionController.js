var controllers = angular.module('controllers');
controllers.controller('inspectionController',function($scope, $location, Inspection, loginService, entityService, inspectionService, areaService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}   
    
    $scope.editInspection = function (id) {
        $scope.entity = Inspection.get({"inspectionId": id }, function(topic, getResponseHeaders){
        	entityService.inspectionToEdit = $scope.entity;
        	$location.path("/editInspection");
        });
    };
    
    $scope.deleteInspection = function (id) {
    	Inspection.deleteInspection({"id": id}, function(){
    		inspectionService.getMyInspections($scope.successCallback, $scope.errorCallback);
    	});
    };
    
    $scope.handleShift = function(mode) {
    	$scope.shiftType = mode;
    };
    
    $scope.cancelShift = function() {
    	$scope.shiftType = '';
    };
    
    $scope.saveShift = function () {
    	var inspection = new Inspection();        
    	inspection.inspectionDate = new Date($scope.today);    	
    	inspection.travel = new Date(inspection.inspectionDate.getTime());
    	inspection.startTime = new Date(inspection.inspectionDate.getTime());
    	inspection.endTime = new Date(inspection.inspectionDate.getTime());
    	
    	inspection.inspectionDate = inspection.inspectionDate.addHours(12);
    	    	
    	inspection.startTime =inspection.startTime.addHours(parseInt($scope.selectedStartHour.value));
    	inspection.startTime =inspection.startTime.addMinutes(parseInt($scope.selectedStartMinute.value));    	
    	inspection.endTime =inspection.endTime.addHours(parseInt($scope.selectedStopHour.value));
    	inspection.endTime =inspection.endTime.addMinutes(parseInt($scope.selectedStopMinute.value));
    	    	
    	inspection.fined = 0; 
    	inspection.warnings = 0;
    	inspection.obliterated = 0;
    	
    	inspection.companyCode = entityService.currentCompanyCode;
        	
    	inspection.guard = { id: loginService.currentUserId};
    	// set the activity type
    	if ($scope.shiftType === 'Start'){
    		inspection.travel = new Date(inspection.startTime.getTime()); 
    		inspection.activityType = { id: 2, code: 1, description: 'Start'};
    	}else if ($scope.shiftType === 'Stop'){
    		inspection.travel = inspection.travel.addHours(parseInt($scope.selectedTravelHour.value));
        	inspection.travel = inspection.travel.addMinutes(parseInt($scope.selectedTravelMinute.value));
    		inspection.activityType = { id: 4, code: 3, description: 'Stop'};
    		
    		if (((parseInt($scope.selectedTravelHour.value)) !== parseInt($scope.selectedStartHour.value))
    				|| ((parseInt($scope.selectedTravelMinute.value)) !== parseInt($scope.selectedStartMinute.value))){
    			
    			var travelInspection = new Inspection();
        		
        		travelInspection.inspectionDate = new Date(inspection.inspectionDate.getTime());        		    	
        		travelInspection.travel = new Date(inspection.inspectionDate.getTime());
        		travelInspection.startTime = new Date(inspection.inspectionDate.getTime());
        		travelInspection.endTime = new Date(inspection.startTime.getTime());
        		
        		var strDate = new Date().toString("MM/dd/yyyy");
        		travelInspection.startTime = new Date(strDate);
        		travelInspection.startTime = travelInspection.startTime.addHours((parseInt($scope.selectedTravelHour.value)));
        		travelInspection.startTime = travelInspection.startTime.addMinutes((parseInt($scope.selectedTravelMinute.value)));
        		travelInspection.travel = new Date(travelInspection.startTime.getTime());
        		            	    	
            	travelInspection.fined = 0; 
            	travelInspection.warnings = 0;
            	travelInspection.obliterated = 0;
            	
            	travelInspection.activityType = { id: 3, code: 2, description: 'Restid'};        	
            	travelInspection.companyCode = entityService.currentCompanyCode;            	
            	travelInspection.guard = { id: loginService.currentUserId};        	
            	travelInspection.category = { id: 1, code: 0, description: 'inga lappar'};
            	
            	$scope.inspection = travelInspection;
            	
            	areaService.getPseudoArea($scope.successTravelAreaCallback, $scope.errorCallback);
    		}    		
    	}
    	
    	// set the category
    	inspection.category = { id: 1, code: 0, description: 'inga lappar'};
    	
    	$scope.shift = inspection;
    	// set the area
    	areaService.getPseudoArea($scope.successAreaCallback, $scope.errorCallback);
    };
    
    $scope.successAreaCallback = function(data){
    	$scope.shift.area = data;
    	inspectionService.createInspection($scope.shift, $scope.successCreateShiftCallback, $scope.errorCallback);
    };
    
    $scope.successTravelAreaCallback = function(data){
    	$scope.inspection.area = data;    	
    	inspectionService.createInspection($scope.inspection, $scope.successCreateTravelCallback, $scope.errorCallback);
    };
    
    $scope.successCreateTravelCallback = function(){
    	$scope.shiftType = '';
    };
    
    $scope.successCreateShiftCallback = function(){
    	$scope.shiftType = '';
    	$scope.selectedTravelHour = $scope.hours[now.getHours()];
        $scope.selectedTravelMinute = $scope.minutes[(now.getMinutes() - now.getMinutes() % 5) / 5];
        $scope.selectedStartHour = $scope.hours[now.getHours()];
        $scope.selectedStartMinute = $scope.minutes[(now.getMinutes() - now.getMinutes() % 5) / 5];
        $scope.selectedStopHour = $scope.hours[now.getHours()];
        $scope.selectedStopMinute = $scope.minutes[(now.getMinutes() - now.getMinutes() % 5) / 5];
    	inspectionService.getMyInspections($scope.successCallback, $scope.errorCallback);
    };
    
    $scope.successCallback = function(data){
        $scope.reports = data;
        $location.path("/inspections");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };

    if (loginService.currentUserId !== 0){
    	inspectionService.getMyInspections($scope.successCallback, $scope.errorCallback);	
    }
    
    $scope.hours = [{id: 0, value: '00'},{id: 1,value: '01'},{id: 2,value: '02'},
                    {id: 3, value: '03'},{id: 4, value: '04'},{id: 5, value: '05'},{id: 6, value: '06'},
                    {id: 7, value: '07'},{id: 8, value: '08'},{id: 9, value: '09'},{id: 10, value: '10'},
                    {id: 11, value: '11'},{id: 12, value: '12'},{id: 13, value: '13'},{id: 14, value: '14'},
                    {id: 15, value: '15'},{id: 16, value: '16'},{id: 17, value: '17'},{id: 18, value: '18'},
                    {id: 19, value: '19'},{id: 20, value: '20'},{id: 21, value: '21'},{id: 22, value: '22'},
                    {id: 23, value: '23'}];

    $scope.minutes = [{value: '00'},{value: '05'},{value: '10'},
                    {value: '15'},{value: '20'},{value: '25'},{value: '30'},
                    {value: '35'},{value: '40'},{value: '45'},{value: '50'},
                    {value: '55'}];
    
    $scope.durations = [{value: '05'},{value: '10'},{value: '15'}];
    $scope.travelDurations = [{value: '00'},{value: '05'},{value: '10'},
                              {value: '15'},{value: '20'},{value: '25'},{value: '30'},
                              {value: '35'},{value: '40'},{value: '45'},{value: '50'},
                              {value: '55'}];

    var now = new Date();
    
    $scope.selectedTravelHour = $scope.hours[now.getHours()];
    $scope.selectedTravelMinute = $scope.minutes[(now.getMinutes() - now.getMinutes() % 5) / 5];
    $scope.selectedStartHour = $scope.hours[now.getHours()];
    $scope.selectedStartMinute = $scope.minutes[(now.getMinutes() - now.getMinutes() % 5) / 5];
    $scope.selectedStopHour = $scope.hours[now.getHours()];
    $scope.selectedStopMinute = $scope.minutes[(now.getMinutes() - now.getMinutes() % 5) / 5];
    
    $scope.selectedDuration = $scope.durations[0];
    $scope.selectedTravelTime = $scope.travelDurations[0];
    $scope.shiftType = '';
    $scope.today = new Date().toString("MM/dd/yyyy");
    
});