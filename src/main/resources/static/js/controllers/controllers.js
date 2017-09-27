//var controllers = angular.module('controllers');
app.controller('appController',function($scope, $location, cookieUtilService, loginService){

	$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };

    $scope.isAdmin = function () {
        return loginService.currentUserType !== 'vakt' && loginService.currentUserId !== 0;
    };

    $scope.isAccessible = function () {
        return loginService.currentUserId !== 0;
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

app.controller('inspectionController',function($scope, $location, Inspection, loginService, entityService, inspectionService, areaService){

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

    	inspection.startTime = inspection.startTime.addHours(parseInt($scope.selectedStartHour.value));
    	inspection.startTime = inspection.startTime.addMinutes(parseInt($scope.selectedStartMinute.value));
    	inspection.endTime = inspection.endTime.addHours(parseInt($scope.selectedStopHour.value));
    	inspection.endTime = inspection.endTime.addMinutes(parseInt($scope.selectedStopMinute.value));

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


/*
function activityTypeController($scope, $location, ActivityType, entityService, loginService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
    $scope.editActivityType = function (id) {
        $scope.entity = ActivityType.get({"typeId": id }, function(topic, getResponseHeaders){
        	entityService.activityToEdit = $scope.entity;
        	$location.path("/editActivity");
        });
    };
    
    $scope.activityTypes = ActivityType.query();
};

function createActivityTypeController($scope, $http, $location, ActivityType, activityTypeService, loginService){
    $scope.entity = { code: '', description: ''};
    
    if (loginService.currentUserId === 0){
		$location.path("/home");
	}
    
    $scope.title = "Registrera ny aktivitetstyp";

    $scope.saveActivityType =  function(){
        var activityType = new ActivityType();
		activityType.code = $scope.entity.code;
    	activityType.description = $scope.entity.description;
    	
    	activityTypeService.createActivityType(activityType, $scope.successCallback, $scope.errorCallback);   	
    };
	
    $scope.abortActivityTypeCreation = function(){
    	$location.path("/activityTypes");
    };  
    
    $scope.successCallback = function(){
        $location.path("/activityTypes");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
};

function editActivityTypeController($scope, $http, loginService, entityService, activityTypeService, $location){
	$scope.entity = entityService.activityToEdit;
	$scope.title = "Redigera aktivitetstyp";

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.saveActivityType =  function(){
    	var activity = $scope.entity;  	
    	activity.description = $scope.entity.description;
    	activity.code = $scope.entity.code;
    	activityTypeService.editActivityType(activity, $scope.successCallback, $scope.errorCallback);
    };
	
    $scope.abortActivityTypeCreation = function(){
    	$location.path("/activityTypes");
    };
    $scope.successCallback = function(){
        $location.path("/activityTypes");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
};


function areaController($scope, $location, loginService, Area, entityService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.areas = Area.query();
	
    $scope.editArea = function (id) {
        $scope.entity = Area.get({"areaId": id }, function(topic, getResponseHeaders){
        	entityService.areaToEdit = $scope.entity;
        	$location.path("/editArea");
        });
    };
};

function createAreaController($scope, $http, $location, Area, areaService, loginService){
    $scope.entity = { name: '', code: '', isActive: 1};

    if (loginService.currentUserId === 0){
		$location.path("/home");
	}
    
    $scope.title = "Registrera nytt område";
    
    $scope.saveArea =  function(){
    	var area = new Area();
    	area.name = $scope.entity.name;
    	area.code = $scope.entity.code;
    	var isActive = $scope.entity.isActive;
    	if (isActive){
    		area.isActive = 1;
    	}else{
    		area.isActive = 0;
    	}
    	
    	areaService.createArea(area, $scope.successCallback, $scope.errorCallback);
    };

    $scope.abortAreaCreation = function(){
    	$location.path("/areas");
    };
    $scope.successCallback = function(){
        $location.path("/areas");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
};

function editAreaController($scope, $http, loginService, Area, entityService, areaService, $location){
	$scope.entity = entityService.areaToEdit;
	$scope.title = "Redigera område";

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.saveArea =  function(){
    	var area = $scope.entity;  	
    	area.name = $scope.entity.name;
    	area.code = $scope.entity.code;
    	var isActive = $scope.entity.isActive;
    	if (isActive){
    		area.isActive = 1;
    	}else{
    		area.isActive = 0;
    	}
    	areaService.editArea(area, $scope.successCallback, $scope.errorCallback);
    };

    $scope.abortAreaCreation = function(){
    	$location.path("/areas");
    };
    $scope.successCallback = function(){
        $location.path("/areas");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
};

function userController($scope, $location, User, loginService, entityService){
	$scope.users = User.query();
    $scope.editUser = function (id) {
        $scope.entity = User.get({"userId": id }, function(topic, getResponseHeaders){
        	entityService.userToEdit = $scope.entity;
        	$location.path("/editUser");
        });
    };    
};

function createUserController($scope, $http, User, UserType, $location, userService, loginService){
    $scope.entity = { name: '', code: '', role: 'vakt'};

    if (loginService.currentUserId === 0){
		$location.path("/home");
	}
    
    $scope.roles = UserType.query(function(){
    	$scope.selectedRole = $scope.roles[0];
    });
    
    $scope.title = "Registrera ny användare";

    $scope.saveUser =  function(){
    	var user = new User();
    	
    	user.name = $scope.entity.name;
    	user.usercode = $scope.entity.usercode;
    	user.userType = { id: $scope.selectedRole.id, name: $scope.selectedRole.name};
    	user.password = $scope.entity.name;
    	userService.createUser(user, $scope.successCallback, $scope.errorCallback);
    };

    $scope.abortUserCreation = function(){
    	$location.path("/users");
    };
    $scope.successCallback = function(){
        $location.path("/users");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
};

function editUserController($scope, $http, $location, loginService, User, UserType, entityService, userService){
	$scope.entity = entityService.userToEdit;
	
	$scope.title = "Redigera användare";
	$scope.roles = UserType.query(function(){
		$scope.selectedRole = $scope.roles[$scope.entity.userType.id-1];
    });
	
	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.saveUser =  function(){
    	var user = $scope.entity;
    	user.name = $scope.entity.name;
    	user.usercode = $scope.entity.usercode;
    	user.userType = { id: $scope.selectedRole.id, name: $scope.selectedRole.name};
    	userService.editUser(user, $scope.successCallback, $scope.errorCallback);
    };

    $scope.abortUserCreation = function(){
    	$location.path("/users");
    };    

    $scope.successCallback = function(){
        $location.path("/users");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
};


function categoryTypeController($scope, $location, Category, entityService, loginService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
    $scope.editCategoryType = function (id) {
        $scope.entity = Category.get({"typeId": id }, function(topic, getResponseHeaders){
        	entityService.categoryToEdit = $scope.entity;
        	$location.path("/editCategory");
        });
    };

    $scope.categoryTypes = Category.query();
};

function createCategoryTypeController($scope, $http, categoryTypeService, Category, $location, loginService){
    $scope.entity = { code: '', description: ''};
    
    if (loginService.currentUserId === 0){
		$location.path("/home");
	}

    $scope.title = "Registrera ny kategorityp";
    
    $scope.saveCategoryType =  function(){
    	var category = new Category();
    	category.code = $scope.entity.code;
    	category.description = $scope.entity.description;    	
    	categoryTypeService.createCategoryType(category, $scope.successCallback, $scope.errorCallback);
    };
	
    $scope.abortCategoryTypeCreation = function(){
    	$location.path("/categoryTypes");
    };   
    
    $scope.successCallback = function(){
        $location.path("/categoryTypes");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
};

function editCategoryTypeController($scope, $http, loginService, Area, entityService, categoryTypeService, $location){
	$scope.entity = entityService.categoryToEdit;	
	$scope.title = "Redigera kategorityp";

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.saveCategoryType =  function(){
    	var category = $scope.entity;  	
    	category.description = $scope.entity.description;
    	category.code = $scope.entity.code;
    	categoryTypeService.editCategoryType(category, $scope.successCallback, $scope.errorCallback);
    };
	
    $scope.abortCategoryTypeCreation = function(){
    	$location.path("/categoryTypes");
    };
	
    $scope.successCallback = function(){
        $location.path("/categoryTypes");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
};

function fileController($scope, $location, loginService, Area, entityService, fileService){

	if (loginService.currentUserId === 0){
		//$location.path("/home");
	}
	  
	$scope.editArea = function (id) {
        $scope.entity = Area.get({"areaId": id }, function(topic, getResponseHeaders){
        	entityService.areaToEdit = $scope.entity;
        	$location.path("/editArea");
        });
    };
    
    $scope.successCallback = function(resource, url){
    	window.open(url);
        $location.path("/summary");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
    
    fileService.getFile($scope.successCallback, $scope.errorCallback);
};

function loginController($scope, loginService, $location){
    $scope.username = '';
    $scope.password= '';

    $scope.login = function(){
        loginService.login($scope.username,$scope.password, $scope.loggedInCallback,$scope.loggedInErrorCallback);
    };

    $scope.logout = function(){
    	loginService.logout();
    	$location.path("/home");
    };
        
    $scope.loggedInCallback = function(){
        $location.path("/inspections");
    };

    $scope.loggedInErrorCallback = function(message){
        $scope.errorMessage = message;
    };

    $scope.setUser = function(){
        $scope.username = 'Zlatan';
        $scope.password = 'Zlatan';
    };
};

function profileController($scope, $location, entityService, loginService, User, UserType, userService){

	if (loginService.currentUserId === 0){
		$location.path("/home");
	}
	
	$scope.entity = User.get({"userId": loginService.currentUserId }, function(topic, getResponseHeaders){
		$scope.roles = UserType.query(function(){
			$scope.selectedRole = $scope.roles[$scope.entity.userType.id-1];
	    });
    });	
	
	$scope.saveProfile = function (viewLocation) {
        var user = $scope.entity;
        userService.editUser(user, $scope.successCallback, $scope.errorCallback);
    };
    
    $scope.successCallback = function(){
        $location.path("/inspections");
    };

    $scope.errorCallback = function(message){
        $scope.errorMessage = message;
    };
    
    $scope.abortProfileUpdate = function(){
    	$location.path("/inspections");
    };
};
*/







