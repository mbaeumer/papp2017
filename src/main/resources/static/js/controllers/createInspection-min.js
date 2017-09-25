var controllers=angular.module("controllers");
controllers.controller("createInspectionController",["$scope","$http","inspectionService","Inspection","User","Area","$location","entityService","datePickerService","loginService","areaService",function(a,g,d,e,m,n,f,l,h,c,k){a.entity={travelHour:"00",travelMinute:"00",startHour:"00",startMinute:"00",stopHour:"00",stopMinute:"00",fined:0,warnings:0,obliterated:0,inspectionDate:(new Date).toString("MM/dd/yyyy")};a.entity.area="";a.entity.area.name="";a.successCallback=function(){f.path("/inspections")};
a.errorCallback=function(b){a.errorMessage=b};a.updateSuccessCallback=function(b){if(void 0!==b&&""!==b){var c=new Date(b.endTime);b=c.getHours();c=c.getMinutes();a.selectedTravelHour=a.hours[b];a.selectedTravelMinute=a.minutes[c/5];a.selectedStartHour=a.hours[b];a.selectedStartMinute=a.minutes[c/5]}else a.selectedTravelHour=a.hours[0],a.selectedTravelMinute=a.minutes[0],a.selectedStartHour=a.hours[0],a.selectedStartMinute=a.minutes[0]};a.loadedAreas=!1;a.successAreaCallback=function(b){a.composedAreas=
b;a.selectedArea=a.composedAreas[0];a.loadedAreas=!0};a.reloadAreas=function(b){k.getComposedAreas(a.successAreaCallback,a.errorCallback);b=(new Date(a.entity.inspectionDate)).toString("MM/dd/yyyy");d.getLatestInspection(c.currentUserId,b,a.updateSuccessCallback,a.errorCallback)};new e;g=(new Date(a.entity.inspectionDate)).toString("MM/dd/yyyy");d.getLatestInspection(c.currentUserId,g,a.updateSuccessCallback,a.errorCallback);k.getComposedAreas(a.successAreaCallback,a.errorCallback);0===c.currentUserId&&
f.path("/home");a.from=h.createConfig({minDate:"2010-01-01",maxDate:"2017-01-01"});a.to=h.createConfig({minDate:"2010-01-01",maxDate:"2017-01-01"});a.title="Registrera ny rapport";a.hours=[{id:0,value:"00"},{id:1,value:"01"},{id:2,value:"02"},{id:3,value:"03"},{id:4,value:"04"},{id:5,value:"05"},{id:6,value:"06"},{id:7,value:"07"},{id:8,value:"08"},{id:9,value:"09"},{id:10,value:"10"},{id:11,value:"11"},{id:12,value:"12"},{id:13,value:"13"},{id:14,value:"14"},{id:15,value:"15"},{id:16,value:"16"},
{id:17,value:"17"},{id:18,value:"18"},{id:19,value:"19"},{id:20,value:"20"},{id:21,value:"21"},{id:22,value:"22"},{id:23,value:"23"}];a.minutes=[{value:"00"},{value:"05"},{value:"10"},{value:"15"},{value:"20"},{value:"25"},{value:"30"},{value:"35"},{value:"40"},{value:"45"},{value:"50"},{value:"55"}];a.selectedTravelHour=a.hours[0];a.selectedTravelMinute=a.minutes[0];a.selectedStartHour=a.hours[0];a.selectedStartMinute=a.minutes[0];a.selectedStopHour=a.hours[0];a.selectedStopMinute=a.minutes[0];a.update=
function(){new e;var b=(new Date(a.entity.inspectionDate)).toString("MM/dd/yyyy");d.getLatestInspection(c.currentUserId,b,a.updateSuccessCallback,a.errorCallback)};a.saveReport=function(){var b=new e;b.inspectionDate=new Date(a.entity.inspectionDate);b.travel=new Date(b.inspectionDate.getTime());b.startTime=new Date(b.inspectionDate.getTime());b.endTime=new Date(b.inspectionDate.getTime());b.inspectionDate=b.inspectionDate.addHours(12);b.travel=b.travel.addHours(parseInt(a.selectedTravelHour.value));
b.travel=b.travel.addMinutes(parseInt(a.selectedTravelMinute.value));b.startTime=b.startTime.addHours(parseInt(a.selectedStartHour.value));b.startTime=b.startTime.addMinutes(parseInt(a.selectedStartMinute.value));b.endTime=b.endTime.addHours(parseInt(a.selectedStopHour.value));b.endTime=b.endTime.addMinutes(parseInt(a.selectedStopMinute.value));b.fined=parseInt(a.entity.fined);b.warnings=parseInt(a.entity.warnings);b.obliterated=parseInt(a.entity.obliterated);b.companyCode=l.currentCompanyCode;b.guard=
{id:c.currentUserId};b.activityType={id:1,code:0,description:"-"};b.category={id:1,code:0,description:"inga lappar"};b.area={id:a.selectedArea.id,name:a.selectedArea.name};d.createInspection(b,a.successCallback,a.errorCallback)};a.abortReportCreation=function(){f.path("/inspections")}}]);