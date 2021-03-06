app.controller('appController',function($scope, $location, cookieUtilService){

	$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.isAdmin = function () {
        return $scope.isLoggedIn() && cookieUtilService.getUserType() != '1';
    };

    $scope.isLoggedIn = function(){
        return cookieUtilService.isCookieValid();
    }

    $scope.logout = function(){
        cookieUtilService.invalidateCookies();
        $location.path('/home');
    }
});

app.controller('loginController', function($scope, $location, $cookies, $cookieStore, loginService, cookieUtilService) {
    $scope.headingTitle = "Logga in";
    $scope.usercode = '';
    $scope.password = '';

    $scope.login = function(){
        $scope.credentials = {};
        $scope.credentials.usercode = $scope.usercode;
        $scope.credentials.password = $scope.password;
        loginService.login($scope.credentials, $scope.loginSuccessCallback, $scope.loginErrorCallback);
    }

    $scope.loginSuccessCallback = function(data){
        cookieUtilService.initCookies(data);
        $location.path("/inspections");
    }

    $scope.loginErrorCallback = function(data){
        $scope.errorMessage = data;
    }
});

app.controller('inspectionController',function($scope, $location, loginService, entityService, inspectionService, areaService, cookieUtilService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}

    $scope.editInspection = function (id) {
        inspectionService.getSingleInspection(id, $scope.successReadSingleCallback, $scope.errorReadSingleCallback);
    };

    $scope.successReadSingleCallback = function(data){
        inspectionService.currentInspection = data;
        $location.path("/editInspection");
    }

    $scope.errorReadSingleCallback = function(message){
        $scope.errorMessage = message;
    }

    $scope.deleteInspection = function (id) {
        inspectionService.getSingleInspection(id, $scope.successReadSingleForDeletionCallback, $scope.errorReadSingleCallback);
    };

    $scope.successReadSingleForDeletionCallback = function(data){
        inspectionService.deleteInspection(data.id, $scope.successDeletionCallback, $scope.errorDeletionCallback);
    };

    $scope.successDeletionCallback = function(){
         $scope.requestData = {};
         $scope.requestData.userid = cookieUtilService.getUserId();
         $scope.requestData.date = new Date();
         $scope.requestData.date.setHours(18);
         $scope.requestData.date.setMinutes(00);
         $scope.requestData.date.setSeconds(00);
         inspectionService.getMyInspections($scope.requestData, $scope.successCallback, $scope.errorCallback);
    }

    $scope.errorDeletionCallback = function(message){
        $scope.errorMessage = message;
    }


    $scope.handleShift = function(mode) {
    	$scope.shiftType = mode;
    };

    $scope.cancelShift = function() {
    	$scope.shiftType = '';
    };

    $scope.saveShift = function () {
    	var inspection = {};
    	inspection.inspectionDate = new Date($scope.today);
    	inspection.travel = new Date(inspection.inspectionDate.getTime());
    	inspection.startTime = new Date(inspection.inspectionDate.getTime());
    	inspection.endTime = new Date(inspection.inspectionDate.getTime());

        inspection.inspectionDate = new Date(inspection.inspectionDate).setHours(18);
		inspection.inspectionDate = new Date(inspection.inspectionDate).setMinutes(00);
		inspection.inspectionDate = new Date(inspection.inspectionDate).setSeconds(00);
    	inspection.startTime = new Date(inspection.startTime).setHours(parseInt($scope.selectedStartHour.value));
    	inspection.startTime = new Date(inspection.startTime).setMinutes(parseInt($scope.selectedStartMinute.value));
    	inspection.endTime = new Date(inspection.endTime).setHours(parseInt($scope.selectedStopHour.value));
    	inspection.endTime = new Date(inspection.endTime).setMinutes(parseInt($scope.selectedStopMinute.value));

    	inspection.fined = 0;
    	inspection.warnings = 0;
    	inspection.obliterated = 0;

    	inspection.companyCode = entityService.currentCompanyCode;

    	inspection.user = { id: cookieUtilService.getUserId()};
    	// set the activity type
    	if ($scope.shiftType === 'Start'){
    		inspection.travel = new Date(inspection.startTime);
    		inspection.activityType = { id: 2, code: 1, description: 'Start'};
    	}else if ($scope.shiftType === 'Stop'){
    		inspection.travel = new Date(inspection.travel).setHours(parseInt($scope.selectedTravelHour.value));
        	inspection.travel = new Date(inspection.travel).setMinutes(parseInt($scope.selectedTravelMinute.value));
    		inspection.activityType = { id: 4, code: 3, description: 'Stop'};

    		if (((parseInt($scope.selectedTravelHour.value)) !== parseInt($scope.selectedStartHour.value))
    				|| ((parseInt($scope.selectedTravelMinute.value)) !== parseInt($scope.selectedStartMinute.value))){

    			var travelInspection = {};

        		travelInspection.inspectionDate = new Date(inspection.inspectionDate);
        		travelInspection.travel = new Date(inspection.inspectionDate);
        		travelInspection.startTime = new Date(inspection.inspectionDate);
        		travelInspection.endTime = new Date(inspection.startTime);

        		var strDate = new Date().toString("MM/dd/yyyy");
        		travelInspection.startTime = new Date(strDate);
        		travelInspection.startTime = new Date(travelInspection.startTime).setHours((parseInt($scope.selectedTravelHour.value)));
        		travelInspection.startTime = new Date(travelInspection.startTime).setMinutes((parseInt($scope.selectedTravelMinute.value)));
        		travelInspection.travel = new Date(travelInspection.startTime);

            	travelInspection.fined = 0;
            	travelInspection.warnings = 0;
            	travelInspection.obliterated = 0;

            	travelInspection.activityType = { id: 3, code: 2, description: 'Restid'};
            	travelInspection.companyCode = entityService.currentCompanyCode;
            	travelInspection.user = { id: cookieUtilService.getUserId()};
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

        $scope.requestData = {};
        $scope.requestData.userid = cookieUtilService.getUserId();
        $scope.requestData.date = new Date();
         $scope.requestData.date.setHours(18);
         $scope.requestData.date.setMinutes(00);
         $scope.requestData.date.setSeconds(00);
    	inspectionService.getMyInspections($scope.requestData, $scope.successCallback, $scope.errorCallback);
    };

    $scope.successCallback = function(data){
        $scope.reports = data;
        $location.path("/inspections");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };

    if (cookieUtilService.getUserId() !== 0){
     $scope.requestData = {};
     $scope.requestData.userid = cookieUtilService.getUserId();
     $scope.requestData.date = new Date();
     $scope.requestData.date.setHours(18);
     $scope.requestData.date.setMinutes(00);
     $scope.requestData.date.setSeconds(00);
     inspectionService.getMyInspections($scope.requestData, $scope.successCallback, $scope.errorCallback);
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

app.controller('createInspectionController',function($scope, $http, inspectionService, loginService, $location, entityService, areaService, cookieUtilService, dateTimeService){
    $scope.entity = { travelHour: '00', travelMinute: '00', startHour: '00', startMinute: '00', stopHour: '00', stopMinute: '00',
        fined: 0, warnings: 0, obliterated: 0, inspectionDate: new Date()};
    $scope.entity.area = '';
    $scope.entity.area.name = '';
    $scope.errorMessage = '';
    $scope.statusMessage = '';
    $scope.separateTravelTime = false;

    if (!cookieUtilService.isCookieValid()){
        $location.path('/login');
    }else{
        cookieUtilService.extendCookie();
    }

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

    $scope.hours = dateTimeService.getHours();
    $scope.minutes = dateTimeService.getMinutes();
    $scope.stopMinutes = dateTimeService.getStopMinutes();

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
		var strDate = new Date($scope.entity.inspectionDate).toString("MM/dd/yyyy");
        inspectionService.getLatestInspection(cookieUtilService.getUserId(), strDate, $scope.updateSuccessCallback, $scope.errorCallback);
    };

    inspectionService.getLatestInspection(cookieUtilService.getUserId(), new Date($scope.entity.inspectionDate), $scope.updateSuccessCallback, $scope.errorCallback);

    areaService.getComposedAreas($scope.successAreaCallback, $scope.errorCallback);

    if (!cookieUtilService.isCookieValid()){
        $location.path('/login');
    }else{
        cookieUtilService.extendCookie();
    }

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

        if (!cookieUtilService.isCookieValid()){
            $location.path('/login');
        }else{
            cookieUtilService.extendCookie();
        }

    	$scope.errorMessage = '';
    	$scope.statusMessage = 'Sparar informationer';
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

    	inspection.user = { id: cookieUtilService.getUserId()};
    	inspection.activityType = { id: 1, code: 0}
    	inspection.category = { id: 2, code: 1};
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
            travelInspection.user = { id: cookieUtilService.getUserId()};
            travelInspection.category = { id: 1, code: 0, description: 'inga lappar'};

            $scope.travelInspection = travelInspection;
        }
        inspectionService.createInspection(inspection, $scope.successCallback, $scope.errorCallback);
    };

    $scope.abortReportCreation = function(){
    	$location.path("/inspections");
    };

    $scope.isInspection = true;
});

app.controller('summaryController',function($scope, $location, summaryService, entityService, fileService, cookieUtilService, metaSummaryService, inspectionService, filterService){

	if (!cookieUtilService.isCookieValid()){
        $location.path('/login');
    }else{
        cookieUtilService.extendCookie();
    }

    $scope.successCallback = function(data){
        $scope.reports = data.summaries;
        $scope.metaSummary = {}
        $scope.metaSummary.totalFined = data.totalFined;
        $scope.metaSummary.totalTimeValue = data.totalTimeValue;
        $scope.metaSummary.totalDecimalTime = data.totalDecimalTime;
        $scope.metaSummary.average = data.average;
    }

    $scope.errorCallback = function(){

    }

    $scope.editSummary = function (id) {
        inspectionService.getSingleInspection(id, $scope.successReadSingleSummaryCallback, $scope.errorReadSingleSummaryCallback);
    };

    $scope.successReadSingleSummaryCallback = function(data){
        entityService.inspectionToEdit = data;
        $location.path("/editSummary");
    }

    $scope.errorReadSingleSummaryCallback = function(){

    }

    $scope.deleteSummary = function (id) {
        inspectionService.getSingleInspection(id, $scope.successReadSingleForDeletionCallback, $scope.errorReadSingleCallback);
    };

    $scope.successReadSingleForDeletionCallback = function(data){
        inspectionService.deleteInspection(data.id, $scope.successDeletionCallback, $scope.errorDeletionCallback);
    };

    $scope.successDeletionCallback = function(){
         $scope.requestData = {};
         $scope.requestData.userid = cookieUtilService.getUserId();
         $scope.requestData.date = new Date();
         $scope.requestData.date.setHours(18);
         $scope.requestData.date.setMinutes(00);
         $scope.requestData.date.setSeconds(00);
         summaryService.getSummaries($scope.summaryParam, $scope.successCallback, $scope.errorCallback);
    }

    $scope.customDate = '';

    $scope.updateCustomDateFilter = function(){
        if ($scope.customDate !== ''){
            $scope.summaryParam = {};
            $scope.summaryParam.toDate = new Date();
            $scope.summaryParam.toDate.setDate($scope.customDate.getDate());
            $scope.summaryParam.toDate.setHours(21);
            $scope.summaryParam.toDate.setMinutes(59);
            $scope.summaryParam.toDate.setSeconds(59);

            $scope.summaryParam.fromDate = new Date();
            $scope.summaryParam.fromDate = new Date($scope.summaryParam.toDate);
            $scope.summaryParam.fromDate.setHours(00);
            $scope.summaryParam.fromDate.setMinutes(00);
            $scope.summaryParam.fromDate.setSeconds(00);
            summaryService.getSummaries($scope.summaryParam, $scope.successCallback, $scope.errorCallback);

            fileService.startDate = $scope.summaryParam.fromDate;
            fileService.endDate = $scope.summaryParam.toDate;
            filterService.startDate = $scope.summaryParam.fromDate;
            filterService.endDate = $scope.summaryParam.toDate;
        }
    }

    $scope.setDateFilter = function(period){
    	var dateString = new Date().toString("MM/dd/yyyy");
    	var startDate = new Date(dateString);
    	var endDate = new Date();
        $scope.summaryParam = {};

    	if (period === 'today'){
    	    $scope.summaryParam.fromDate = new Date();
    	    $scope.summaryParam.fromDate.setHours(00);
            $scope.summaryParam.fromDate.setMinutes(00);
            $scope.summaryParam.fromDate.setSeconds(00);
            $scope.summaryParam.toDate = new Date();
            $scope.summaryParam.toDate.setDate($scope.summaryParam.fromDate.getDate());
            $scope.summaryParam.toDate.setHours(21);
            $scope.summaryParam.toDate.setMinutes(59);
            $scope.summaryParam.toDate.setSeconds(59);

    	}else if (period === 'yesterday'){
    	    $scope.summaryParam.toDate = new Date();
    	    $scope.summaryParam.toDate.setDate($scope.summaryParam.toDate.getDate() - 1);
    	    $scope.summaryParam.toDate.setHours(21);
            $scope.summaryParam.toDate.setMinutes(59);
            $scope.summaryParam.toDate.setSeconds(59);
            $scope.summaryParam.fromDate = new Date($scope.summaryParam.toDate);
            $scope.summaryParam.fromDate.setHours(00);
            $scope.summaryParam.fromDate.setMinutes(00);
            $scope.summaryParam.fromDate.setSeconds(00);
    	}

    	fileService.startDate = $scope.summaryParam.fromDate;
    	fileService.endDate = $scope.summaryParam.toDate;
    	filterService.startDate = $scope.summaryParam.fromDate;
    	filterService.endDate = $scope.summaryParam.toDate;
    	summaryService.getSummaries($scope.summaryParam, $scope.successCallback, $scope.errorCallback);
    };

    $scope.successMetaSummaryCallback = function(data){
    	$scope.metaSummary = data;
    	filterService.startDate = "";
    	filterService.endDate = "";
    };

    $scope.errorMetaSummaryCallback = function(message){

    };

    $scope.setDateFilter('today');
    //summaryService.getSummaries($scope.summaryParam, $scope.successCallback, $scope.errorCallback);

    fileService.startDate = $scope.summaryParam.fromDate;
    fileService.endDate = $scope.summaryParam.toDate;
});


