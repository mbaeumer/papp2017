var controllers = angular.module('controllers');
controllers.controller('createSummaryController',function($scope, $http, $location, inspectionService, entityService, cookieUtilService, fileService, filterService, activityTypeService, categoryTypeService, areaService, userService, dateTimeService){
    $scope.entity = { inspectionDate: new Date(), guard: '', area: '', startHour: '00', startMinute: '00', stopHour: '00', stopMinute: '00',
        fined: '', activity: '', category: ''};
    
    if (!cookieUtilService.isCookieValid()){
        $location.path('/login');
    }else{
        cookieUtilService.extendCookie();
    }
    
    $scope.separateTravelTime = false;

    $scope.title = "Registrera ny rapport";
    
    $scope.hours = dateTimeService.getHours();
    $scope.minutes = dateTimeService.getMinutes();
    $scope.stopMinutes = dateTimeService.getStopMinutes();

    $scope.selectedTravelHour = $scope.hours[0];
    $scope.selectedTravelMinute = $scope.minutes[0];
    $scope.selectedStartHour = $scope.hours[0];
    $scope.selectedStartMinute = $scope.minutes[0];
    $scope.selectedStopHour = $scope.hours[0];
    $scope.selectedStopMinute = $scope.stopMinutes[0];

    $scope.categorySuccessCallback = function(data){
        $scope.categorytypes = data;
        $scope.selectedCategory = data[0];
    };

    $scope.categoryErrorCallback = function(){
    };

    categoryTypeService.getCategoryTypes($scope.categorySuccessCallback, $scope.categoryErrorCallback);

    $scope.activitySuccessCallback = function(data){
        $scope.activitytypes = data;
        $scope.selectedActivity = data[0];
    };

    $scope.activityErrorCallback = function(){
    };

    activityTypeService.getActivityTypes($scope.activitySuccessCallback, $scope.activityErrorCallback);

    $scope.userSuccessCallback = function(data){
        $scope.rawUsers = data;
    	$scope.composedUsers = [];
     	for (var i = 0; i<$scope.rawUsers.length;i++){
     		var composedUser = {id:0,userCode:0,name:''};
     		composedUser.id = $scope.rawUsers[i].id;
     		composedUser.name = $scope.rawUsers[i].name;
     		composedUser.userCode = $scope.rawUsers[i].code;
     		composedUser.value = $scope.rawUsers[i].code + " " + $scope.rawUsers[i].name ;
     		$scope.composedUsers.push(composedUser);
     	}
     	$scope.selectedUser = $scope.composedUsers[0];
     	var date = new Date($scope.entity.inspectionDate);
     	inspectionService.getLatestInspection($scope.selectedUser.id, date, $scope.updateSuccessCallback, $scope.errorCallback);
    };

    $scope.userErrorCallback = function(){
    };

    userService.getUsers($scope.userSuccessCallback, $scope.userErrorCallback);

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
		$scope.loadedAreas = true;
    };
    
	$scope.reloadAreas = function(data){
		areaService.getAllAreas($scope.successAreaCallback, $scope.errorCallback);
		var date = new Date($scope.entity.inspectionDate);
		var strDate = date.toString("MM/dd/yyyy");
        inspectionService.getLatestInspection($scope.selectedUser.id, strDate, $scope.updateSuccessCallback, $scope.errorCallback);
    };
		
    var date = new Date($scope.entity.inspectionDate);
		
    var strDate = date.toString("MM/dd/yyyy");

    	
    areaService.getComposedAreas($scope.successAreaCallback, $scope.errorCallback);
    
    $scope.saveSummary =  function(){
    	var inspection = {};
        inspection.inspectionDate = new Date($scope.entity.inspectionDate);
        inspection.travel = new Date(inspection.inspectionDate.getTime());
        inspection.startTime = new Date(inspection.inspectionDate.getTime());
        inspection.endTime = new Date(inspection.inspectionDate.getTime());

        inspection.inspectionDate = new Date(inspection.inspectionDate).setHours(18);
        inspection.inspectionDate = new Date(inspection.inspectionDate).setMinutes(00);
        inspection.inspectionDate = new Date(inspection.inspectionDate).setSeconds(00);
        inspection.travel = new Date(inspection.travel).setHours(parseInt($scope.selectedTravelHour.value));
        inspection.travel = new Date(inspection.travel).setMinutes(parseInt($scope.selectedTravelMinute.value));
        inspection.startTime = new Date(inspection.startTime).setHours(parseInt($scope.selectedStartHour.value));
        inspection.startTime = new Date(inspection.startTime).setMinutes(parseInt($scope.selectedStartMinute.value));
        inspection.endTime = new Date(inspection.endTime).setHours(parseInt($scope.selectedStopHour.value));
        inspection.endTime = new Date(inspection.endTime).setMinutes(parseInt($scope.selectedStopMinute.value));

        inspection.fined = parseInt($scope.entity.fined);
        inspection.warnings = parseInt($scope.entity.warnings);
        inspection.obliterated = parseInt($scope.entity.obliterated);

        inspection.companyCode = entityService.currentCompanyCode;

        inspection.user = { id: $scope.selectedUser.id};
        inspection.activityType = { id: 1, code: 0}
        inspection.category = { id: 1, code: 0};
        inspection.area = { id: $scope.selectedArea.originalObject.id, name: $scope.selectedArea.originalObject.name};
        $scope.inspection = inspection;

        if (((parseInt($scope.selectedTravelHour.value)) !== parseInt($scope.selectedStartHour.value))
                || ((parseInt($scope.selectedTravelMinute.value)) !== parseInt($scope.selectedStartMinute.value))){

            $scope.separateTravelTime = true;
            var travelInspection = {};

            travelInspection.inspectionDate = new Date(inspection.inspectionDate).setHours(18);
            travelInspection.inspectionDate = new Date(inspection.inspectionDate).setMinutes(00);
            travelInspection.inspectionDate = new Date(inspection.inspectionDate).setSeconds(00);

            travelInspection.travel = new Date(inspection.inspectionDate);
            travelInspection.startTime = new Date(inspection.travel);
            travelInspection.endTime = new Date(inspection.startTime);

            travelInspection.startTime = new Date(travelInspection.startTime).setHours((parseInt($scope.selectedTravelHour.value)));
            travelInspection.startTime = new Date(travelInspection.startTime).setMinutes((parseInt($scope.selectedTravelMinute.value)));
            travelInspection.travel = new Date(travelInspection.startTime);

            travelInspection.fined = 0;
            travelInspection.warnings = 0;
            travelInspection.obliterated = 0;

            travelInspection.activityType = { id: 3, code: 2, description: 'Restid'};
            travelInspection.companyCode = entityService.currentCompanyCode;
            travelInspection.user = { id: $scope.selectedUser.id};
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