var controllers = angular.module('controllers');
controllers.controller('summaryController',function($scope, $location, Inspection, entityService, fileService, loginService, Summary, metaSummaryService, filterService, datePickerService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.reports = Summary.query(function(){});
	
	$scope.customDate = "";
	$scope.from = datePickerService.createConfig({ minDate : '2013-01-01', maxDate : '2022-01-01'});
    $scope.to = datePickerService.createConfig({ minDate : '2013-01-01', maxDate : '2022-01-01'});
	
	$scope.dateRange = "";
	var strToday = new Date().toString("MM/dd/yyyy");
	$scope.startDate = new Date(strToday);
	$scope.endDate = new Date($scope.startDate.getTime());
	$scope.endDate = new Date($scope.endDate.addDays(1));
	
	fileService.startDate = $scope.startDate.toString("MM/dd/yyyy");
	fileService.endDate = $scope.endDate.toString("MM/dd/yyyy");
	filterService.startDate = $scope.startDate.toString("MM/dd/yyyy");
	filterService.endDate = $scope.endDate.toString("MM/dd/yyyy");
	$scope.endDate = new Date($scope.endDate.addDays(1)).addMinutes(-1);
	//$scope.metaSummary = metaSummaryService.getMetaSummary($scope.successCallback, $scope.errorCallback);
	
	
    $scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.editSummary = function (id) {
        $scope.entity = Inspection.get({"inspectionId": id }, function(topic, getResponseHeaders){
        	entityService.inspectionToEdit = $scope.entity;
        	$location.path("/editSummary");
        });
    };
    
    $scope.dateFilter = function (report) {
    	if ($scope.startDate!="" && $scope.endDate!=""){
    		return (report.inspectionDate >= $scope.startDate && report.inspectionDate < $scope.endDate);
    	}
    	return true;        
    };
    
    $scope.updateCustomDateFilter = function(){
    	var date = new Date($scope.customDate);
	   	var strDate = date.toString("MM/dd/yyyy");
	   	
	   	var startDate = new Date(strDate);
    	var endDate = new Date();
    	
    	$scope.startDate = new Date(startDate.getTime());
		endDate = new Date(startDate.getTime());
		$scope.endDate = new Date(endDate.addDays(1));
		
		fileService.startDate = $scope.startDate.toString("MM/dd/yyyy");
    	fileService.endDate = $scope.endDate.toString("MM/dd/yyyy");
    	filterService.startDate = $scope.startDate.toString("MM/dd/yyyy");
    	filterService.endDate = $scope.endDate.toString("MM/dd/yyyy");
    	
    	//$scope.endDate = new Date(endDate.addDays(1)).addMinutes(-1);
    	$scope.metaSummary = metaSummaryService.getMetaSummary($scope.successCallback, $scope.errorCallback);
		
		//inspection = inspectionService.getLatestInspection(loginService.currentUserId, strDate, $scope.updateSuccessCallback, $scope.errorCallback);    	
    };
    
    $scope.deleteSummary = function (id) {    	
    	Inspection.deleteInspection({"id": id}, function(){    		
    		//$scope.reports = Inspection.query();
    		$scope.reports = Summary.query(function(){});
    	});    	
    };   
    
    $scope.setDateFilter = function(period){
    	var dateString = new Date().toString("MM/dd/yyyy");
    	var startDate = new Date(dateString);
    	var endDate = new Date();
    	
    	 
    	if (period === 'today'){
    		$scope.startDate = new Date(startDate.getTime());
    		endDate = new Date(startDate.getTime());
    		$scope.endDate = new Date(endDate.addDays(1));
    	}else if (period === 'yesterday'){
    		startDate = startDate.addDays(-1);
    		$scope.startDate = new Date(startDate.getTime());
    		$scope.endDate = new Date(new Date(startDate.getTime()).addDays(1));
    	}else if (period === 'past_week'){
    		var d = new Date(dateString);
    		var day = new Date(d.getDay());
    		var diff = new Date(d.getDate() - day + (day == 0 ? -6:1)); 
    		var endDate = new Date(d.getTime());
    		d = new Date(d.setDate(diff));
    		$scope.startDate = new Date(d);
    		$scope.endDate = new Date(endDate.addDays((8 - day))).addMinutes(-1);
    		$scope.startDate = new Date($scope.startDate.getTime()).addDays(-7);
    		$scope.endDate = new Date($scope.endDate.getTime()).addDays(-7);
    	}else if (period === 'this_week'){
    		var d = new Date(dateString);
    		var day = new Date(d.getDay());
    		var diff = new Date(d.getDate() - day + (day == 0 ? -6:1)); 
    		var endDate = new Date(d.getTime());
    		d = new Date(d.setDate(diff));
    		$scope.startDate = new Date(d);
    		$scope.endDate = new Date(endDate.addDays((8 - day))).addMinutes(-1);
    	}else if (period === 'past_month'){
    		var date = new Date(dateString);
    		var firstDay = new Date(date.getFullYear(), date.getMonth() - 1, 1);
    		var lastDay = new Date(date.getFullYear(), date.getMonth(), 0);
    		$scope.startDate = firstDay;
    		$scope.endDate = lastDay.addDays(1);
    	}else if (period === 'this_month'){
    		var date = new Date(dateString);
    		var firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
    		var lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
    		$scope.startDate = firstDay;
    		$scope.endDate = lastDay.addDays(1);
    	}else{
    		$scope.startDate = "";
    		$scope.endDate = "";    		
    	}
    	
    	fileService.startDate = $scope.startDate.toString("MM/dd/yyyy");
    	fileService.endDate = $scope.endDate.toString("MM/dd/yyyy");
    	filterService.startDate = $scope.startDate.toString("MM/dd/yyyy");
    	filterService.endDate = $scope.endDate.toString("MM/dd/yyyy");
    	
    	if (period === 'today'){
    		$scope.endDate = new Date(endDate.addDays(1)).addMinutes(-1);
    	}else if (period === 'yesterday'){
    		$scope.endDate = new Date(new Date(startDate.getTime()).addDays(1)).addMinutes(-1);
    	}
    	
    	$scope.metaSummary = metaSummaryService.getMetaSummary($scope.successCallback, $scope.errorCallback);
    };
    
    $scope.successCallback = function(data){
    	$scope.metaSummary = data;
    	filterService.startDate = "";//$scope.startDate.toString("MM/dd/yyyy");
    	filterService.endDate = "";//$scope.endDate.toString("MM/dd/yyyy");
    };
    
    $scope.errorCallback = function(message){
    	
    };
    
    $scope.metaSummary = metaSummaryService.getMetaSummary($scope.successCallback, $scope.errorCallback);
});