package se.squeed.secu.util;

import junit.framework.Assert;
import org.junit.Test;
import se.squeed.secu.models.Inspection;

import java.util.Calendar;
import java.util.Date;

/**
 * Created by martinbaumer on 04/10/17.
 */
public class ValidationUtilsTest {
    @Test
    public void should_get_TRAVEL_AFTER_START(){
        Inspection inspection = new Inspection();
        inspection.setStartTime(new Date());
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, 5);
        inspection.setTravel(cal.getTime());
        Assert.assertEquals(ValidationResult.TRAVEL_AFTER_START,ValidationUtils.validate(inspection));
    }

    @Test
    public void should_get_START_AFTER_END(){
        Inspection inspection = new Inspection();
        inspection.setTravel(new Date());
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, 20);
        inspection.setEndTime(cal.getTime());
        cal.add(Calendar.MINUTE, 10);
        inspection.setStartTime(cal.getTime());
        Assert.assertEquals(ValidationResult.START_AFTER_END,ValidationUtils.validate(inspection));
    }

    @Test
    public void should_get_NEGATIVE(){
        Inspection inspection = new Inspection();
        inspection.setTravel(new Date());
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, 20);
        inspection.setStartTime(cal.getTime());
        cal.add(Calendar.MINUTE, 10);
        inspection.setEndTime(cal.getTime());
        inspection.setFined(-2);
        Assert.assertEquals(ValidationResult.NEGATIVE_VALUE_NOT_ALLOWED,ValidationUtils.validate(inspection));
    }

    @Test
    public void should_get_OK(){
        Inspection inspection = new Inspection();
        inspection.setTravel(new Date());
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        cal.add(Calendar.MINUTE, 20);
        inspection.setStartTime(cal.getTime());
        cal.add(Calendar.MINUTE, 10);
        inspection.setEndTime(cal.getTime());
        inspection.setFined(0);
        Assert.assertEquals(ValidationResult.OK,ValidationUtils.validate(inspection));
    }

}
