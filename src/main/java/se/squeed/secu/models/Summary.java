package se.squeed.secu.models;

import java.util.Date;
import se.squeed.secu.util.TimeDifference;

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
	private TimeDifference duration;
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
	public TimeDifference getDuration() {
		return duration;
	}
	public void setDuration(TimeDifference duration) {
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
}
