package se.squeed.secu.models;

import java.util.Date;

/**
 * Created by martinbaumer on 06/11/16.
 */
public class SummaryParam {
    private Date fromDate;
    private Date toDate;

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }
}
