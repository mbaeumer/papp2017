package se.squeed.secu.models;

import java.util.Date;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@SuppressWarnings("serial")
@Entity
@Table(name="INSPECTION")
@javax.persistence.SequenceGenerator(name = "SEQ_INSPECTION", sequenceName = "SEQ_INSPECTION")
public class Inspection {
	
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "SEQ_INSPECTION")
	private int id;
	@Column(name="COMPANYCODE")
	private int companyCode;
	@Column(name="TRAVELTIME")
	private Date travel;
	@Column(name="STARTTIME")
	private Date startTime;
	@Column(name="ENDTIME")
	private Date endTime;
	@Column(name="INSPECTIONTIME")
	private Date inspectionDate;

	private int fined;
	private int warnings;
	private int obliterated;
	
	@OneToOne
	@NotNull
    @JoinColumn(name="AREAID")
	private Area area;
	
	@OneToOne
	@NotNull
    @JoinColumn(name="USERID")
	private User user;
	
	@OneToOne
	@NotNull
    @JoinColumn(name="ACTIVITYTYPEID")
	private ActivityType activityType;
	
	@OneToOne(optional=true,fetch=FetchType.EAGER)
	@NotNull
	@JoinColumn(name="CATEGORYID")
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
	public User getUser() {
		return user;
	}
	public void setUser(User user) {
		this.user = user;
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
