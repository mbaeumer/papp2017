angular.module('controllers',[]);
angular.module('services',[]);
angular.module('directives',[]);

var app = angular.module('app', ['controllers','services','ngRoute','directives','ui.bootstrap','ngCookies','ngMaterial','angucomplete-alt']);
    app.config(['$routeProvider', function ($routeProvider) {
      $routeProvider.
           when('/home', {templateUrl: '/partials/login.html', controller: 'loginController'}).
           when('/login', { templateUrl: '/partials/login.html', controller: 'loginController'}).
           when('/inspections', {templateUrl: '/partials/inspections.html', controller: 'inspectionController'}).
           when('/createInspection', {templateUrl: '/partials/createInspection.html', controller: 'createInspectionController'}).
           when('/editInspection', {templateUrl: '/partials/createInspection.html', controller: 'editInspectionController'}).
           when('/summary', {templateUrl: '/partials/summary.html', controller: 'summaryController'}).
           when('/createSummary', {templateUrl: '/partials/createSummary.html', controller: 'createSummaryController'}).
           when('/editSummary', {templateUrl: '/partials/createSummary.html', controller: 'editSummaryController'}).
           when('/file', {templateUrl: '/partials/summary.html', controller: 'fileController'}).
           when('/areas', {templateUrl: '/partials/areas.html', controller: 'areaController'}).
           when('/users', {templateUrl: '/partials/users.html', controller: 'userController'}).
           when('/createUser', {templateUrl: '/partials/createUser.html', controller: 'createUserController'}).
           when('/editUser', {templateUrl: '/partials/createUser.html', controller: 'editUserController'}).
           when('/createArea', {templateUrl: '/partials/createArea.html', controller: 'createAreaController'}).
           when('/editArea', {templateUrl: '/partials/createArea.html', controller: 'editAreaController'}).
            /*
            when('/profile', {templateUrl: 'partials/profile.html', controller: 'profileController'}).
            when('/activityTypes', {templateUrl: 'partials/activityTypes.html', controller: 'activityTypeController'}).
            when('/createActivity', {templateUrl: 'partials/createActivityType.html', controller: 'createActivityTypeController'}).
            when('/editActivity', {templateUrl: 'partials/createActivityType.html', controller: 'editActivityTypeController'}).            

            when('/categoryTypes', {templateUrl: 'partials/categoryTypes.html', controller: 'categoryTypeController'}).
            when('/createCategory', {templateUrl: 'partials/createCategoryType.html', controller: 'createCategoryTypeController'}).
            when('/editCategory', {templateUrl: 'partials/createCategoryType.html', controller: 'editCategoryTypeController'}).
            */
            otherwise({
                redirectTo : '/home'
            });
    }]);
