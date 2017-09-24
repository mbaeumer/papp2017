package se.softhouse.tutis.util;

public class TimeDifference {
	private int days;
	private int hours;
	private int minutes;
	private int seconds;
	private String value;
	public int getDays() {
		return days;
	}
	public void setDays(int days) {
		this.days = days;
	}
	public int getHours() {
		return hours;
	}
	public void setHours(int hours) {
		this.hours = hours;
	}
	public int getMinutes() {
		return minutes;
	}
	public void setMinutes(int minutes) {
		this.minutes = minutes;
	}
	public int getSeconds() {
		return seconds;
	}
	public void setSeconds(int seconds) {
		this.seconds = seconds;
	}
	public String getValue() {
		value = format(hours) + ":" + format(minutes) + ":" + format(seconds);
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
	private String format(int duration){
		String s = "";
		if (duration < 10){
			s += "0";
		}
		return s += duration;
	}
	
}
