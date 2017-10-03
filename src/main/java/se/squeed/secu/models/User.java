package se.squeed.secu.models;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonIgnore;

// Spring boot
//, uniqueConstraints={@UniqueConstraint(columnNames = {"code"})}
@Entity
@Table(name="SUSERS")
@javax.persistence.SequenceGenerator(name = "SEQ_USERS", sequenceName = "SEQ_USERS")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "SEQ_USERS")
	private int id;

	@NotNull
	private int code;

	@Column(name = "NAME")
	private String name;

	@JsonIgnore
	@Column(name = "PASSWORD")
	private String password;

	@OneToOne(optional=true,fetch=FetchType.EAGER)
	@NotNull
	@JoinColumn(name="USERTYPEID")
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

	public int getCode() {
		return code;
	}
	public void setCode(int code) {
		this.code = code;
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
@Table(name="user", uniqueConstraints = @UniqueConstraint(columnNames = "userCode"))
public class User {
	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private int id;
	private String name;
	private int userCode;
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
	public int getUserCode() {
		return userCode;
	}
	public void setUserCode(int userCode) {
		this.userCode = userCode;
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