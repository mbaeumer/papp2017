var controllers = angular.module('controllers');
controllers.controller('createInspectionController',function($scope, $http, inspectionService, Inspection, loginService, User, Area, $location, entityService, datePickerService, areaService){
    $scope.entity = { travelHour: '00', travelMinute: '00', startHour: '00', startMinute: '00', stopHour: '00', stopMinute: '00',
        fined: 0, warnings: 0, obliterated: 0, inspectionDate: new Date().toString("MM/dd/yyyy")};
    $scope.entity.area = '';
    $scope.entity.area.name = '';
    $scope.errorMessage = '';
    $scope.statusMessage = '';
    $scope.separateTravelTime = false;
    
    $scope.successCallback = function(){
    	if ($scope.separateTravelTime === true){
    		areaService.getPseudoArea($scope.successTravelAreaCallback, $scope.errorCallback);
    	}else{
    		$scope.successCreateTravelCallback();
    	}
        
    };
    
    $scope.successTravelAreaCallback = function(data){
    	$scope.travelInspection.area = data;    	
    	inspectionService.createInspection($scope.travelInspection, $scope.successCreateTravelCallback, $scope.errorCallback);
    };
    
    $scope.successCreateTravelCallback = function(){
    	$scope.statusMessage = '';
    	$location.path("/inspections");
    };

    $scope.errorCallback = function(message){      
    	$scope.statusMessage = '';
        $scope.errorMessage = message;
    };
    
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
		//$scope.selectedArea = $scope.areas[0];
		$scope.selectedArea = { originalObject: ''};
		//$scope.selectedArea.originalObject = { id: '', name: '', code: ''};
		$scope.loadedAreas = true;		
    };
    
	$scope.reloadAreas = function(data){
		areaService.getAllAreas($scope.successAreaCallback, $scope.errorCallback);
		var date = new Date($scope.entity.inspectionDate);
		var strDate = date.toString("MM/dd/yyyy");
        inspectionService.getLatestInspection(loginService.currentUserId, strDate, $scope.updateSuccessCallback, $scope.errorCallback);		
    };
		
    var date = new Date($scope.entity.inspectionDate);
		
    var strDate = date.toString("MM/dd/yyyy");
    inspectionService.getLatestInspection(loginService.currentUserId, strDate, $scope.updateSuccessCallback, $scope.errorCallback);
    	
    areaService.getAllAreas($scope.successAreaCallback, $scope.errorCallback);
    
    if (loginService.currentUserId === 0){
		$location.path("/home");
	}
    
    $scope.from = datePickerService.createConfig({ minDate : '2010-01-01', maxDate : '2017-01-01'});
    $scope.to = datePickerService.createConfig({ minDate : '2010-01-01', maxDate : '2017-01-01'});

    $scope.title = "Registrera ny rapport";
    

    $scope.selectedTravelHour = $scope.hours[0];
    $scope.selectedTravelMinute = $scope.minutes[0];
    $scope.selectedStartHour = $scope.hours[0];
    $scope.selectedStartMinute = $scope.minutes[0];
    $scope.selectedStopHour = $scope.hours[0];
    $scope.selectedStopMinute = $scope.stopMinutes[0];
       
	$scope.update = function(){
    	var date = new Date($scope.entity.inspectionDate);
	   	var strDate = date.toString("MM/dd/yyyy");    
		inspection = inspectionService.getLatestInspection(loginService.currentUserId, strDate, $scope.updateSuccessCallback, $scope.errorCallback);    	
    };
    
    $scope.saveReport =  function(){
    	$scope.errorMessage = '';
    	$scope.statusMessage = 'Sparar informationer';
    	var inspection = new Inspection();  
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
    	
    	inspection.companyCode = entityService.currentCompanyCode;
        
    	// set the user
    	inspection.guard = { id: loginService.currentUserId, name: inspection.inspectionDate.toString("MM/dd/yyyy HH:mm:ss")};
    	// set the activity type
    	inspection.activityType = { id: 1, code: 0, description: inspection.startTime.toString("MM/dd/yyyy HH:mm:ss")};
    	// set the category
    	inspection.category = { id: 1, code: 0, description: inspection.endTime.toString("MM/dd/yyyy HH:mm:ss")};
    	// set the area
    	inspection.area = { id: $scope.selectedArea.originalObject.id, name: $scope.selectedArea.originalObject.name}; 
    	$scope.inspection = inspection;
    	
    	if (((parseInt($scope.selectedTravelHour.value)) !== parseInt($scope.selectedStartHour.value))
				|| ((parseInt($scope.selectedTravelMinute.value)) !== parseInt($scope.selectedStartMinute.value))){
			
    		$scope.separateTravelTime = true;
			var travelInspection = new Inspection();
    		
    		travelInspection.inspectionDate = new Date($scope.inspection.inspectionDate.getTime());        		    	
    		travelInspection.travel = new Date($scope.inspection.inspectionDate.getTime());
    		travelInspection.startTime = new Date($scope.inspection.inspectionDate.getTime());
    		travelInspection.endTime = new Date($scope.inspection.startTime.getTime());
    		
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
        	
        	$scope.travelInspection = travelInspection;
        	
        	//
		}
    	inspectionService.createInspection(inspection, $scope.successCallback, $scope.errorCallback);   	
    };
    
    $scope.abortReportCreation = function(){
    	$location.path("/inspections");
    };
    
    $scope.isInspection = true;
});


