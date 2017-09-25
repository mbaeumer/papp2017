package se.squeed.secu.models;

import javax.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnore;

// Spring boot
@Entity
@Table(name="USER")
@javax.persistence.SequenceGenerator(name = "SEQ_USER", sequenceName = "SEQ_USER")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_USER")
	@Column(name="ID")
	private int id;

	//@UniqueConstraint("USERCODE")
	@Column(name="USERCODE")
	private int usercode;

	@Column(name = "NAME")
	private String firstName;

	@JsonIgnore
	@Column(name = "PASSWORD")
	private String password;

	@OneToOne
	@JoinColumn(name="USERTYPEID")
	private UserType userType;

	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}

	public String getName() {
		return firstName;
	}

	public void setName(String firstName) {
		this.firstName = firstName;
	}

	public int getUsercode() {
		return usercode;
	}
	public void setUsercode(int usercode) {
		this.usercode = usercode;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public UserType getUserType() {
		return userType;
	}

	public void setUserType(UserType userType) {
		this.userType = userType;
	}
}

/*
@SuppressWarnings("serial")
@Entity
@XmlRootElement
@Table(name="user", uniqueConstraints = @UniqueConstraint(columnNames = "usercode"))
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	private int usercode;
	private String password;

	@OneToOne(optional=true,fetch=FetchType.EAGER)
    @JoinColumn(name="userTypeID")
	private UserType userType;
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public int getUsercode() {
		return usercode;
	}
	public void setUsercode(int usercode) {
		this.usercode = usercode;
	}
	public UserType getUserType() {
		return userType;
	}
	public void setUserType(UserType userType) {
		this.userType = userType;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
}

 */