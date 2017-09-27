package se.squeed.secu.models;

/**
 * Created by martinbaumer on 11/08/16.
 */
public class Credentials {
    private int usercode;
    private String password;

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
}
