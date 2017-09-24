package se.softhouse.tutis.util;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

public class TimeUtils {
	public static Date getFormattedDate(Date date) throws ParseException{
		Calendar cal = Calendar.getInstance();
		cal.setTime(date);
		String strDate = "";
		strDate += TimeUtils.getFormattedNumber(cal.get(Calendar.MONTH) + 1);
		strDate += "/";
		strDate += TimeUtils.getFormattedNumber(cal.get(Calendar.DAY_OF_MONTH));
		strDate += "/";
		strDate += cal.get(Calendar.YEAR);
		strDate += " ";
		strDate += TimeUtils.getFormattedNumber(cal.get(Calendar.HOUR_OF_DAY));
		strDate += ":";
		strDate += TimeUtils.getFormattedNumber(cal.get(Calendar.MINUTE));
		strDate += ":";
		strDate += TimeUtils.getFormattedNumber(cal.get(Calendar.SECOND));
		
		SimpleDateFormat formatter = new SimpleDateFormat("MM/dd/yyyy HH:mm:ss");
		return formatter.parse(strDate);
	}
	
	private static String getFormattedNumber(int number){
		String result = "";
		if (number < 10){
			result += "0" + number;
		}else{
			result += number;
		}
		return result;
	}

}
