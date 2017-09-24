package se.softhouse.tutis.util;

import java.util.Calendar;
import java.util.Date;
import java.util.TimeZone;

public class TimeZoneUtils {
	public static Date convertToTimeZone(Date date, TimeZone timeZone){
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		cal.setTimeZone(timeZone);
		Calendar cal2 = Calendar.getInstance();
		cal2.set(cal.get(Calendar.YEAR), cal.get(Calendar.MONTH), cal.get(Calendar.DATE), cal.get(Calendar.HOUR_OF_DAY), cal.get(Calendar.MINUTE), cal.get(Calendar.SECOND));
		Date dateResult = cal2.getTime(); 
		return dateResult;
	}
}
