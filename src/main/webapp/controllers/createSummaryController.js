var controllers = angular.module('controllers');
controllers.controller('createSummaryController',function($scope, $http, Inspection, ActivityType, Category, Area, User, $location, inspectionService, entityService, datePickerService, loginService, fileService, filterService, areaService){
    $scope.entity = { inspectionDate: new Date().toString("MM/dd/yyyy"), guard: '', area: '', startHour: '00', startMinute: '00', stopHour: '00', stopMinute: '00',
        fined: '', activity: '', category: ''};
    
    if (loginService.currentUserId === 0){
		$location.path("/home");
	}
    
    $scope.separateTravelTime = false;

    $scope.from = datePickerService.createConfig({ minDate : '2010-01-01', Date : '2017-01-01'});
    $scope.to = datePickerService.createConfig({ minDate : '2010-01-01', Date : '2017-01-01'});
    
    $scope.title = "Registrera ny rapport";
    
    $scope.hours = [{value: '00'},{value: '01'},{value: '02'},
        {value: '03'},{value: '04'},{value: '05'},{value: '06'},
        {value: '07'},{value: '08'},{value: '09'},{value: '10'},
        {value: '11'},{value: '12'},{value: '13'},{value: '14'},
        {value: '15'},{value: '16'},{value: '17'},{value: '18'},
        {value: '19'},{value: '20'},{value: '21'},{value: '22'},
        {value: '23'}];

    $scope.minutes = [{value: '00'},{value: '05'},{value: '10'},
        {value: '15'},{value: '20'},{value: '25'},{value: '30'},
        {value: '35'},{value: '40'},{value: '45'},{value: '50'},
        {value: '55'}];
    $scope.stopMinutes = [{value: '00'},{value: '05'},{value: '10'},
        {value: '15'},{value: '20'},{value: '25'},{value: '30'},
        {value: '35'},{value: '40'},{value: '45'},{value: '50'},
        {value: '55'},{value: '59'}];

    $scope.selectedTravelHour = $scope.hours[0];
    $scope.selectedTravelMinute = $scope.minutes[0];
    $scope.selectedStartHour = $scope.hours[0];
    $scope.selectedStartMinute = $scope.minutes[0];
    $scope.selectedStopHour = $scope.hours[0];
    $scope.selectedStopMinute = $scope.stopMinutes[0];
    
    $scope.activitytypes = ActivityType.query(function(){
    	$scope.selectedActivity = $scope.activitytypes[0];
    });

    $scope.categorytypes = Category.query(function(){
    	$scope.selectedCategory = $scope.categorytypes[0];
    });
    
    /*$scope.rawAreas = Area.query(function(){
    	$scope.composedAreas = [];
    	for (var i = 0; i<$scope.rawAreas.length;i++){
    		var composedArea = {id:0,code:0,name:''};
    		composedArea.id = $scope.rawAreas[i].id;
    		composedArea.name = $scope.rawAreas[i].name;
    		composedArea.code = $scope.rawAreas[i].code;
    		composedArea.value = $scope.rawAreas[i].code + " " + $scope.rawAreas[i].name ;
    		
    		$scope.composedAreas.push(composedArea);
    	}
    	$scope.selectedArea = $scope.composedAreas[0];
    });
    */
    
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
    
    $scope.rawUsers = User.query(function(){
    	$scope.composedUsers = [];
    	for (var i = 0; i<$scope.rawUsers.length;i++){
    		var composedUser = {id:0,usercode:0,name:''};
    		composedUser.id = $scope.rawUsers[i].id;
    		composedUser.name = $scope.rawUsers[i].name;
    		composedUser.usercode = $scope.rawUsers[i].usercode;
    		composedUser.value = $scope.rawUsers[i].usercode + " " + $scope.rawUsers[i].name ;
    		
    		$scope.composedUsers.push(composedUser);
    	}
    	$scope.selectedUser = $scope.composedUsers[0];
    });
    
    $scope.saveSummary =  function(){
    	
    	var inspection = new Inspection();        
    	inspection.inspectionDate = new Date($scope.entity.inspectionDate);    	
    	inspection.travel = new Date(inspection.inspectionDate.getTime());
    	inspection.startTime = new Date(inspection.inspectionDate.getTime());
    	inspection.endTime = new Date(inspection.inspectionDate.getTime());
    	
    	inspection.inspectionDate = inspection.inspectionDate.addHours(12);
    	//inspection.travel = inspection.travel.addHours(parseInt($scope.selectedTravelHour.value));
    	//inspection.travel =inspection.travel.addMinutes(parseInt($scope.selectedTravelMinute.value));    	
    	inspection.startTime =inspection.startTime.addHours(parseInt($scope.selectedStartHour.value));
    	inspection.startTime =inspection.startTime.addMinutes(parseInt($scope.selectedStartMinute.value));    	
    	inspection.endTime =inspection.endTime.addHours(parseInt($scope.selectedStopHour.value));
    	inspection.endTime =inspection.endTime.addMinutes(parseInt($scope.selectedStopMinute.value));
    	
    	inspection.fined = 0; 
    	inspection.warnings = 0;
    	inspection.obliterated = 0;
    	
    	inspection.companyCode = entityService.currentCompanyCode;
    	inspection.guard = { id: $scope.selectedUser.id, name: inspection.inspectionDate.toString("MM/dd/yyyy HH:mm:ss")};// $scope.selectedUser;
       	inspection.activityType = { id: $scope.selectedActivity.id, description: inspection.startTime.toString("MM/dd/yyyy HH:mm:ss")};
       	inspection.category = { id: $scope.selectedCategory.id, description: inspection.endTime.toString("MM/dd/yyyy HH:mm:ss")};
       	
    	var activity = $scope.selectedActivity.description;
    	
    	if (activity === 'Start'){
    		inspection.travel = new Date(inspection.startTime.getTime()); 
    	}else if (activity === 'Stop'){
    		inspection.travel = inspection.travel.addHours(parseInt($scope.selectedTravelHour.value));
        	inspection.travel = inspection.travel.addMinutes(parseInt($scope.selectedTravelMinute.value));
    	}else{
    		inspection.travel = inspection.travel.addHours(parseInt($scope.selectedTravelHour.value));
        	inspection.travel = inspection.travel.addMinutes(parseInt($scope.selectedTravelMinute.value));
    		inspection.fined = parseInt($scope.entity.fined); 
        	inspection.warnings = parseInt($scope.entity.warnings);
        	inspection.obliterated = parseInt($scope.entity.obliterated);
        	inspection.area = { id: $scope.selectedArea.originalObject.id, name: $scope.selectedArea.originalObject.name};
    	}      	 
       	
       	$scope.inspection = inspection;
    	
    	if ((((parseInt($scope.selectedTravelHour.value)) !== parseInt($scope.selectedStartHour.value))
				|| ((parseInt($scope.selectedTravelMinute.value)) !== parseInt($scope.selectedStartMinute.value)))
				&& (activity != 'Start')){
			
    		$scope.separateTravelTime = true;
			var travelInspection = new Inspection();
    		
    		travelInspection.inspectionDate = new Date($scope.inspection.inspectionDate.getTime());
    		travelInspection.inspectionDate = travelInspection.inspectionDate.addHours(-12);
    		travelInspection.travel = new Date(travelInspection.inspectionDate.getTime());
    		travelInspection.startTime = new Date(travelInspection.inspectionDate.getTime());
    		travelInspection.endTime = new Date(travelInspection.startTime.getTime());
    		travelInspection.inspectionDate = travelInspection.inspectionDate.addHours(12);
    		
    		//travelInspection.startTime = new Date(travelInspection.inspectionDate.getTime());
    		travelInspection.startTime = travelInspection.startTime.addHours((parseInt($scope.selectedTravelHour.value)));
    		travelInspection.startTime = travelInspection.startTime.addMinutes((parseInt($scope.selectedTravelMinute.value)));
    		travelInspection.travel = new Date(travelInspection.startTime.getTime());
    		travelInspection.endTime = travelInspection.endTime.addHours((parseInt($scope.selectedStartHour.value)));
    		travelInspection.endTime = travelInspection.endTime.addMinutes((parseInt($scope.selectedStartMinute.value)));
    		
    		
        	travelInspection.fined = 0; 
        	travelInspection.warnings = 0;
        	travelInspection.obliterated = 0;
        	
        	travelInspection.activityType = { id: 3, code: 2, description: 'Restid'};        	
        	travelInspection.companyCode = entityService.currentCompanyCode;            	
        	travelInspection.guard = { id: $scope.selectedUser.id, name: $scope.selectedUser.name};        	
        	travelInspection.category = { id: 1, code: 0, description: 'inga lappar'};
        	
        	$scope.travelInspection = travelInspection;
		}
    	if (!$scope.isStartOrStop === true){
    		inspectionService.createInspection(inspection, $scope.successCallback, $scope.errorCallback);
    	}else{
    		areaService.getPseudoArea($scope.successStartStopCallback, $scope.errorCallback);
    	}
       	    	
    };
    
    $scope.updateActivityType = function(){
    	$scope.isStartOrStop = false;
    	if ($scope.selectedActivity.description === 'Start' || $scope.selectedActivity.description === 'Stop') {
    		$scope.isStartOrStop = true;    		
    	}    	
    };
	
    $scope.abortReportCreation = function(){
    	filterService.startDate = "";//$scope.startDate.toString("MM/dd/yyyy");
    	filterService.endDate = "";//$scope.endDate.toString("MM/dd/yyyy");
    	$location.path("/summary");        
    };   
    
    $scope.successCallback = function(){        
    	filterService.startDate = "";//$scope.startDate.toString("MM/dd/yyyy");
    	filterService.endDate = "";//$scope.endDate.toString("MM/dd/yyyy");
    	if ($scope.separateTravelTime === true) {
    		areaService.getPseudoArea($scope.successTravelAreaCallback, $scope.errorCallback);
    	}else{
    		$scope.successCreateTravelCallback();
    	}
    	
    };
    
    $scope.successStartStopCallback = function(data){
    	$scope.inspection.area = data;
		inspectionService.createInspection($scope.inspection, $scope.successCallback, $scope.errorCallback);
    };
    
    $scope.successTravelAreaCallback = function(data){
    	if ($scope.separateTravelTime === true) {
    		$scope.travelInspection.area = data;    	
    		inspectionService.createInspection($scope.travelInspection, $scope.successCreateTravelCallback, $scope.errorCallback);
    	}
    };
    
    $scope.successCreateTravelCallback = function(){
    	$location.path("/summary");
    };


    $scope.errorCallback = function(message){      
        $scope.errorMessage = message;
    };  
   
    $scope.isInspection = true;
    $scope.isStartOrStop = false;
});