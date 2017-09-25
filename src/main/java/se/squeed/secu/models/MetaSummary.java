package se.squeed.secu.models;

import se.squeed.secu.util.TimeDifference;

public class MetaSummary {
	private int totalFined;
	private  TimeDifference totalTime;
	private double totalDecimalTime;
	private double average;
	public int getTotalFined() {
		return totalFined;
	}
	public void setTotalFined(int totalFined) {
		this.totalFined = totalFined;
	}
	public TimeDifference getTotalTime() {
		return totalTime;
	}
	public void setTotalTime(TimeDifference totalTime) {
		this.totalTime = totalTime;
	}
	public double getTotalDecimalTime() {
		return totalDecimalTime;
	}
	public void setTotalDecimalTime(double totalDecimalTime) {
		this.totalDecimalTime = totalDecimalTime;
	}
	public double getAverage() {
		return average;
	}
	public void setAverage(double average) {
		this.average = average;
	}
	
	
}
