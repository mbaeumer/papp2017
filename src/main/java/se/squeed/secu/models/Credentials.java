package se.squeed.secu.models;

/**
 * Created by martinbaumer on 11/08/16.
 */
public class Credentials {
    private int code;
    private String password;

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
}
