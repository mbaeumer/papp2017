function appController($scope, $location, ActivityType, entityService, loginService){

	$scope.isActive = function (viewLocation) {
        return viewLocation === $location.path();
    };
    
    $scope.isAdmin = function () {
        return loginService.currentUserType !== 'vakt' && loginService.currentUserId !== 0;
    };
    
    $scope.isAccessible = function () {
        return loginService.currentUserId !== 0;
    };   
};

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







