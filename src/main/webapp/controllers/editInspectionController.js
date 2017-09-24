var controllers = angular.module('controllers');
controllers.controller('editInspectionController',function($scope, $http, $location, Inspection, loginService, User, entityService, Area, inspectionService, datePickerService, areaService){    
	$scope.entity = entityService.inspectionToEdit;
	$scope.entity.inspectionDate =new Date($scope.entity.inspectionDate).toString("MM/dd/yyyy");

	$scope.from = datePickerService.createConfig({ minDate : '2010-01-01', maxDate : '2017-01-01'});
    $scope.to = datePickerService.createConfig({ minDate : '2010-01-01', maxDate : '2017-01-01'});
    
    $scope.title = "Redigera rapport";
    $scope.statusMessage = '';

    if (loginService.currentUserId === 0){
		$location.path("/home");
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
    
    $scope.stopMinutes = [{value: '00'},{value: '05'},{value: '10'},
                          {value: '15'},{value: '20'},{value: '25'},{value: '30'},
                          {value: '35'},{value: '40'},{value: '45'},{value: '50'},
                          {value: '55'},{value: '59'}];
    
    var travelDate = new Date($scope.entity.travel);    
    var travelHour = travelDate.getHours();
    var travelMinutes = travelDate.getMinutes();
    
    var startDate = new Date($scope.entity.startTime);    
    var startHour = startDate.getHours();
    var startMinutes = startDate.getMinutes();
    
    var stopDate = new Date($scope.entity.endTime);    
    var stopHour = stopDate.getHours();
    var stopMinutes = stopDate.getMinutes();
       
    $scope.selectedTravelHour = $scope.hours[travelHour];
    $scope.selectedTravelMinute = $scope.minutes[travelMinutes/5];
    $scope.selectedStartHour = $scope.hours[startHour];
    $scope.selectedStartMinute = $scope.minutes[startMinutes/5];
    $scope.selectedStopHour = $scope.hours[stopHour];
    if (stopMinutes !== 59){    	    
    	$scope.selectedStopMinute = $scope.stopMinutes[stopMinutes/5];
    }else{
    	$scope.selectedStopMinute = $scope.stopMinutes[$scope.stopMinutes.length - 1];
    }
	
	$scope.successCallback = function(){        
        $location.path("/inspections");
    };

    $scope.errorCallback = function(message){        
        $scope.errorMessage = message;
    };
    
    $scope.updateSuccessCallback = function(data){        
    	if (data !== undefined && data !==""){    		
    		var inspection = data;    		
    		var end = new Date(inspection.endTime);
    		var hours = end.getHours();
    		var minutes = end.getMinutes();				
    		$scope.selectedTravelHour = $scope.hours[hours];    	    
    	    $scope.selectedStartHour = $scope.hours[hours];
    	    if (minutes !== 59){
    	    	$scope.selectedTravelMinute = $scope.minutes[minutes/5];
        	    $scope.selectedStartMinute = $scope.minutes[minutes/5];	
    	    }else{
    	    	$scope.selectedTravelMinute = $scope.minutes[0];
        	    $scope.selectedStartMinute = $scope.minutes[0];	
    	    }
		}else{			
    		$scope.selectedTravelHour = $scope.hours[0];
    	    $scope.selectedTravelMinute = $scope.minutes[0];
    	    $scope.selectedStartHour = $scope.hours[0];
    	    $scope.selectedStartMinute = $scope.minutes[0];
    	}       
    };
	
	$scope.loadedAreas = false;
	$scope.successAreaCallback = function(data){	
		$scope.areas = data;
		$scope.selectedArea = { originalObject: ''};
		$scope.selectedArea.originalObject = { id: '', name: '', code: ''};
		$scope.selectedArea.originalObject = $scope.entity.area;
		$scope.loadedAreas = true;		
    };
	
	$scope.reloadAreas = function(data){		
		areaService.getComposedAreas($scope.successAreaCallback, $scope.errorCallback);
    };
	
    //areaService.getComposedAreas($scope.successAreaCallback, $scope.errorCallback);
    areaService.getAllAreas($scope.successAreaCallback, $scope.errorCallback);
    
    $scope.saveReport =  function(){
    	var inspection = $scope.entity;  
    	inspection.inspectionDate = new Date($scope.entity.inspectionDate);
    	inspection.travel = new Date(inspection.inspectionDate.getTime());
    	inspection.startTime = new Date(inspection.inspectionDate.getTime());
    	inspection.endTime = new Date(inspection.inspectionDate.getTime());
    	
    	inspection.inspectionDate = inspection.inspectionDate.addHours(12);
    	inspection.travel = inspection.travel.addHours(parseInt($scope.selectedTravelHour.value));
    	inspection.travel =inspection.travel.addMinutes(parseInt($scope.selectedTravelMinute.value));    	
    	inspection.startTime =inspection.startTime.addHours(parseInt($scope.selectedStartHour.value));
    	inspection.startTime =inspection.startTime.addMinutes(parseInt($scope.selectedStartMinute.value));    	
    	inspection.endTime =inspection.endTime.addHours(parseInt($scope.selectedStopHour.value));
    	inspection.endTime =inspection.endTime.addMinutes(parseInt($scope.selectedStopMinute.value));
    	
    	inspection.fined = parseInt($scope.entity.fined); 
    	inspection.warnings = parseInt($scope.entity.warnings);
    	inspection.obliterated = parseInt($scope.entity.obliterated);
    	
    	$scope.user = User.get({"userId" : loginService.currentUserId}, function(user, getResponseHeaders) {    	
    		inspection.guard = { id: user.id, name: inspection.inspectionDate.toString("MM/dd/yyyy HH:mm:ss")};
    		if ($scope.isStartOrStop){
    			inspection.area = $scope.entity.area;
    		}else{
    			inspection.area = { id: $scope.selectedArea.originalObject.id, name: $scope.selectedArea.originalObject.name};
    		}    		    		
    		inspection.activityType = {id: $scope.entity.activityType.id, code: $scope.entity.activityType.code, description: inspection.startTime.toString("MM/dd/yyyy HH:mm:ss")};
    		inspection.category = { id: 1, code: 0, description: inspection.endTime.toString("MM/dd/yyyy HH:mm:ss")};        
    		inspectionService.editInspection(inspection, $scope.successCallback, $scope.errorCallback);
    	},function(){
    		alert("Error retreiving user");
    	});    	
    };
    
    
	
    $scope.abortReportCreation = function(){
    	$location.path("/inspections");
    };  
    
    $scope.isInspection = $scope.entity.activityType.code === 0;
    $scope.isTravelTime = $scope.entity.activityType.code === 2;
    $scope.isStartOrStop = $scope.entity.activityType.code === 1 || $scope.entity.activityType.code === 3;
    
});
