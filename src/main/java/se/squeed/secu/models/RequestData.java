package se.squeed.secu.models;

import java.util.Date;

/**
 * Created by martinbaumer on 27/09/17.
 */
public class RequestData {
    private int userid;
    private Date date;

    public int getUserid() {
        return userid;
    }

    public void setUserid(int userid) {
        this.userid = userid;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }
}
