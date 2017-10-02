var controllers = angular.module('controllers');
controllers.controller('editInspectionController',function($scope, $http, $location, loginService, entityService, inspectionService, areaService, cookieUtilService, dateTimeService){
	$scope.title = "Redigera rapport";
    $scope.statusMessage = '';
	$scope.entity = inspectionService.currentInspection;
	$scope.entity.inspectionDate = new Date($scope.entity.inspectionDate);

    // TODO: Handle session
    if (loginService.currentUserId === 0){
		$location.path("/home");
	}

	$scope.hours = dateTimeService.getHours();
    $scope.minutes = dateTimeService.getMinutes();
    $scope.stopMinutes = dateTimeService.getStopMinutes();

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

    areaService.getComposedAreas($scope.successAreaCallback, $scope.errorCallback);

    $scope.saveReport =  function(){
    	var inspection = $scope.entity;
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

        inspection.user = { id: cookieUtilService.getUserId()};

        if ($scope.isStartOrStop){
            inspection.area = $scope.entity.area;
        }else{
            inspection.area = { id: $scope.selectedArea.originalObject.id, name: $scope.selectedArea.originalObject.name};
        }
        inspection.activityType = {id: $scope.entity.activityType.id, code: $scope.entity.activityType.code};
        inspection.category = { id: $scope.entity.category.id, code: $scope.entity.category.code};
        inspectionService.editInspection(inspection, $scope.successCallback, $scope.errorCallback);
    };

    $scope.abortReportCreation = function(){
    	$location.path("/inspections");
    };

    $scope.isInspection = $scope.entity.activityType.code === 0;
    $scope.isTravelTime = $scope.entity.activityType.code === 2;
    $scope.isStartOrStop = $scope.entity.activityType.code === 1 || $scope.entity.activityType.code === 3;

});