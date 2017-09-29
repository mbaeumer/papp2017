package se.squeed.secu.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.UniqueConstraint;
import javax.xml.bind.annotation.XmlRootElement;

@SuppressWarnings("serial")
@Entity
@Table(name="CATEGORY")
@javax.persistence.SequenceGenerator(name = "SEQ_CATEGORY", sequenceName = "SEQ_CATEGORY")
public class Category {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY, generator = "SEQ_CATEGORY")
	private int id;
	private int code;
	private String description;
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
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}

}
