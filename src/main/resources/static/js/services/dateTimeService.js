var services = angular.module('services');
services.factory('dateTimeService', function(){
    return {
        getHours : function(data){
            hours = [{value: '00'},{value: '01'},{value: '02'},
                   {value: '03'},{value: '04'},{value: '05'},{value: '06'},
                   {value: '07'},{value: '08'},{value: '09'},{value: '10'},
                   {value: '11'},{value: '12'},{value: '13'},{value: '14'},
                   {value: '15'},{value: '16'},{value: '17'},{value: '18'},
                   {value: '19'},{value: '20'},{value: '21'},{value: '22'},
                   {value: '23'}];
            return hours;
        },
        getMinutes : function(data){
            minutes = [{value: '00'},{value: '05'},{value: '10'},
                    {value: '15'},{value: '20'},{value: '25'},{value: '30'},
                    {value: '35'},{value: '40'},{value: '45'},{value: '50'},
                    {value: '55'}];
            return minutes;
        },
        getStopMinutes : function(data){
            minutes = [{value: '00'},{value: '05'},{value: '10'},
                    {value: '15'},{value: '20'},{value: '25'},{value: '30'},
                    {value: '35'},{value: '40'},{value: '45'},{value: '50'},
                    {value: '55'},{value: '59'}];
            return minutes;
        }
    }
});