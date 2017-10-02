package se.squeed.secu.models;

import javax.persistence.*;
import javax.xml.bind.annotation.XmlRootElement;

@SuppressWarnings("serial")
@Entity
@Table(name="AREA", uniqueConstraints={@UniqueConstraint(columnNames = {"code"})})
@javax.persistence.SequenceGenerator(name = "SEQ_AREA", sequenceName = "SEQ_AREA")
public class Area {
	@Id
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator = "SEQ_AREA")
	private int id;
	private int code;
	private String name;
	@Column(name="ISACTIVE")
	private boolean isActive;
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(boolean isActive) {
		this.isActive = isActive;
	}
}
