package se.squeed.secu.models;

import java.util.Date;

import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.xml.bind.annotation.XmlRootElement;
@SuppressWarnings("serial")
@Entity
@Table(name="INSPECTION")
@javax.persistence.SequenceGenerator(name = "SEQ_INSPECTION", sequenceName = "SEQ_INSPECTION")
public class Inspection {
	
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private int companyCode;
	private Date travel;
	private Date startTime;
	private Date endTime;
	private Date inspectionDate;
	private int fined;
	private int warnings;
	private int obliterated;
	
	@OneToOne(optional=true,fetch=FetchType.EAGER)
    @JoinColumn(name="areaID")
	private Area area;
	
	@OneToOne(optional=true,fetch=FetchType.EAGER)
    @JoinColumn(name="userID")
	private User guard;
	
	@OneToOne(optional=true,fetch=FetchType.EAGER)
    @JoinColumn(name="activityTypeID")
	private ActivityType activityType;
	
	@OneToOne(optional=true,fetch=FetchType.EAGER)
    @JoinColumn(name="categoryID")
	private Category category;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
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
	public Date getInspectionDate() {
		return inspectionDate;
	}
	public void setInspectionDate(Date inspectionDate) {
		this.inspectionDate = inspectionDate;
	}
	public int getCompanyCode() {
		return companyCode;
	}
	public void setCompanyCode(int companyCode) {
		this.companyCode = companyCode;
	}
	

}
