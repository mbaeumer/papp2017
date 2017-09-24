var services = angular.module('services');

services.factory('dialogService', function ($modal) {
    return {
        opts: {
            backdrop: true,
            keyboard: true,
            backdropClick: true,
            templateUrl: '',
            controller: ''
        },
        open: function (controller, path, data) {

            this.opts.controller = controller;
            this.opts.templateUrl = path;
            // use resolve to get data to dialog

            this.opts.resolve = {
                items: function () {
                    return data;
                }
            };

            return $modal.open(this.opts);
        },
        openConfirm: function (data) {

            this.opts.controller = "confirmController";
            this.opts.templateUrl = "/partials/confirmDialog.html";
            // use resolve to get data to dialog

            this.opts.resolve = {
                data: function () {
                    return data;
                }
            };

            return $modal.open(this.opts);
        },
        createReport : function(){
            return this.open("createReportController", "partials/create_inspection_vertical.html",null);
        },
        createGuard : function(){
            return this.open("createGuardController", "partials/createGuard.html",null);
        },
        createArea : function(){
            return this.open("createAreaController", "partials/createArea.html",null);
        },
        createActivityType : function(){
            return this.open("createActivityTypeController", "partials/createActivityType.html",null);
        },
        createCategoryType : function(){
            return this.open("createCategoryTypeController", "partials/createCategoryType.html",null);
        },
        createSummary : function(){
            return this.open("createSummaryController", "partials/createSummary.html",null);
        },
        createUser : function(){
            return this.open("createUserController", "partials/createUser.html",null);
        }


    }
});
