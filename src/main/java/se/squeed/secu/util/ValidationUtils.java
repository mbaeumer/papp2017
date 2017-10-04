package se.squeed.secu.util;

import se.squeed.secu.models.Inspection;

/**
 * Created by martinbaumer on 04/10/17.
 */
public class ValidationUtils {
    public static ValidationResult validate(Inspection inspection){
        ValidationResult result = null;

        if (inspection.getTravel().after(inspection.getStartTime())){
            result = ValidationResult.TRAVEL_AFTER_START;
        }else if (inspection.getEndTime().before(inspection.getStartTime())){
            result = ValidationResult.START_AFTER_END;
        }else if (inspection.getFined() < 0 || inspection.getObliterated() < 0 || inspection.getWarnings() < 0){
            result = ValidationResult.NEGATIVE_VALUE_NOT_ALLOWED;
        }else{
            result = ValidationResult.OK;
        }
        return result;
    }

    public static String getMessage(ValidationResult validationResult){
        String result = null;
        if (validationResult == ValidationResult.TRAVEL_AFTER_START){
            result = "Restid efter starttid!";
        }else if (validationResult == ValidationResult.START_AFTER_END){
            result = "Starttid efter stoptid!";
        }else if (validationResult == ValidationResult.NEGATIVE_VALUE_NOT_ALLOWED){
            result = "Negativ värde!";
        }
        return result;
    }
}
