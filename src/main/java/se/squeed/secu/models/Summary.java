package se.squeed.secu.models;

import java.time.*;
import java.util.Date;

import org.springframework.data.jpa.repository.Temporal;
import se.squeed.secu.util.TimeDifference;

import javax.persistence.TemporalType;

public class Summary {
	private int id;
	private int companyCode;
	private Date travel;
	private Date startTime;
	private Date endTime;
	private Date inspectionDate;
	private int fined;
	private int warnings;
	private int obliterated;
	private Area area;
	private User guard;
	private ActivityType activityType;
	private Category category;
	private long duration;
	private String durationValue;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCompanyCode() {
		return companyCode;
	}
	public void setCompanyCode(int companyCode) {
		this.companyCode = companyCode;
	}
	public Date getTravel() {
		return travel;
	}
	public void setTravel(Date travel) {
		this.travel = travel;
	}
	public Date getStartTime() {
		return startTime;
	}
	public void setStartTime(Date startTime) {
		this.startTime = startTime;
	}
	public Date getEndTime() {
		return endTime;
	}
	public void setEndTime(Date endTime) {
		this.endTime = endTime;
	}
	public Date getInspectionDate() {
		return inspectionDate;
	}
	public void setInspectionDate(Date inspectionDate) {
		this.inspectionDate = inspectionDate;
	}
	public int getFined() {
		return fined;
	}
	public void setFined(int fined) {
		this.fined = fined;
	}
	public int getWarnings() {
		return warnings;
	}
	public void setWarnings(int warnings) {
		this.warnings = warnings;
	}
	public int getObliterated() {
		return obliterated;
	}
	public void setObliterated(int obliterated) {
		this.obliterated = obliterated;
	}
	public long getDuration() {
		return duration;
	}
	public void setDuration(long duration) {
		this.duration = duration;
	}
	public Area getArea() {
		return area;
	}
	public void setArea(Area area) {
		this.area = area;
	}
	public User getGuard() {
		return guard;
	}
	public void setGuard(User guard) {
		this.guard = guard;
	}
	public ActivityType getActivityType() {
		return activityType;
	}
	public void setActivityType(ActivityType activityType) {
		this.activityType = activityType;
	}
	public Category getCategory() {
		return category;
	}
	public void setCategory(Category category) {
		this.category = category;
	}
	public void setInspection(Inspection inspection){
		id = inspection.getId();
		companyCode = inspection.getCompanyCode();
		travel = inspection.getTravel();
		startTime = inspection.getStartTime();
		endTime = inspection.getEndTime();
		inspectionDate = inspection.getInspectionDate();
		fined = inspection.getFined();
		warnings = inspection.getWarnings();
		obliterated = inspection.getObliterated();
		area = inspection.getArea();
		guard = inspection.getUser();
		activityType = inspection.getActivityType();
		category = inspection.getCategory();
		duration = Duration.between(startTime.toInstant(), endTime.toInstant()).getSeconds();
		setDurationValue();
	}

	private void setDurationValue(){
		long hours = duration / 3600;
		long remainder = duration % 3600;
		long minutes = remainder / 60;
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
		durationValue = sb.append(hourString).append(":").append(minuteString).toString();
	}

	public String getDurationValue() {
		return durationValue;
	}
}
