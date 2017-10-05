package se.squeed.secu.models;

import java.util.ArrayList;
import java.util.List;

public class MetaSummary {
	private List<Summary> summaries = new ArrayList<>();
	private int totalFined;
	private long totalTimInMinutes;
    private String totalTimeValue;
	private double totalDecimalTime;
	private double average;
	public int getTotalFined() {
		return totalFined;
	}
	public void setTotalFined(int totalFined) {
		this.totalFined = totalFined;
	}
	public long getTotalTimInMinutes() {
		return totalTimInMinutes;
	}
	public void setTotalTimInMinutes(long totalTimInMinutes) {
		this.totalTimInMinutes = totalTimInMinutes;
	}
	public double getTotalDecimalTime() {
		return totalDecimalTime;
	}
	public void setTotalDecimalTime() {
		totalDecimalTime = totalTimInMinutes / 60;
		double remainder =  totalTimInMinutes % 60;
		totalDecimalTime +=  remainder / 60;
	}
	public double getAverage() {
		return average;
	}
	public void setAverage(double average) {
		this.average = average;
	}
	public List<Summary> getSummaries() {
		return summaries;
	}

	public void setSummaries(List<Summary> summaries) {
		this.summaries = summaries;
	}

	public void setTotalTimeValue(){
		long hours = totalTimInMinutes / 60;

		long minutes = totalTimInMinutes % 60;
		StringBuilder sb = new StringBuilder();
		String hourString = new Long(hours).toString();
		if (hourString.length() < 2){
			hourString = sb.append("0").append(hourString).toString();
		}
		String minuteString = new Long(minutes).toString();
		System.out.println("minute before:" + minuteString);
		sb = new StringBuilder();
		if (minuteString.length() < 2){
			minuteString = sb.append("0").append(minuteString).toString();
			System.out.println("minute after:" + minuteString);
		}
		sb = new StringBuilder();
		totalTimeValue = sb.append(hourString).append(":").append(minuteString).toString();

	}

	public String getTotalTimeValue(){
		return totalTimeValue;
	}
}
