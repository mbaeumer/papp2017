var services = angular.module('services');
services.factory('datePickerService',function(){
    var Config = function(initOptions, closeText, disabledCallback,options){
        this.opened = false;
        this.disabled = function(date, mode) {
            //return ( mode === 'day' && ( date.getDay() === 0 || date.getDay() === 6 ) );
        };
        this.open = function($event) {
            $event.preventDefault();
            $event.stopPropagation();
            this.opened = true;
        };
        this.dateOptions = {
            'year-format': "'yy'",
            'starting-day': 1
        };
        this.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'shortDate','yyyy-MM-dd'];
        this.format = 'yyyy-MM-dd';
        this.closeText = closeText !== undefined ? closeText : 'Close';
        this.minDate = initOptions.minDate;
        this.maxDate = initOptions.maxDate;

        if (disabledCallback !== undefined){
            this.disabled = disabledCallback;
        }

        if (options !== undefined){
            this.dateOptions = options;
        }
    };

    return {
        createConfig : function(initOptions,closeText,disabledCallback,options){
            return new Config(initOptions,closeText,disabledCallback,options);
        }
    };
});
