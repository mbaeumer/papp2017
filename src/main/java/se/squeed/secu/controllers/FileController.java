package se.squeed.secu.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import se.squeed.secu.models.Inspection;
import se.squeed.secu.models.SummaryParam;
import se.squeed.secu.repositories.InspectionRepository;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

/**
 * Created by martinbaumer on 01/10/17.
 */
@RestController
@RequestMapping("/files")
public class FileController {
    private InspectionRepository repository;

    @Autowired
    public FileController(InspectionRepository inspectionRepository) {
        this.repository = inspectionRepository;
    }

    private String getFormattedContent(Inspection inspection) {
        int activityCode = inspection.getActivityType().getCode();
        String content = "";
        content += inspection.getCompanyCode();
        content = writeSeparator(content);
        content += getFormattedDate(inspection.getInspectionDate());
        content = writeSeparator(content);
        content += inspection.getUser().getUserCode();
        content = writeSeparator(content);
        if (activityCode == 0) {
            content += inspection.getArea().getCode();
        }
        content = writeSeparator(content);
        content += getFormattedTime(inspection.getStartTime());
        content = writeSeparator(content);
        content += getFormattedTime(inspection.getEndTime());
        content = writeSeparator(content);
        if (activityCode == 0) {
            content += inspection.getFined();
        }
        content = writeSeparator(content);
        content += inspection.getActivityType().getCode();
        content += "\r\n";

        return content;
    }

    private String writeSeparator(String content) {
        return content += ";";
    }

    private String getFormattedDate(Date date) {
        String result = "";
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
        result = sdf.format(date);
        return result;
    }

    private String getFormattedTime(Date date) {
        String result = "";
        Calendar cal = Calendar.getInstance();
        cal.setTime(date);
        TimeZone tzLocal = TimeZone.getTimeZone("Europe/Copenhagen");
        cal.setTimeZone(tzLocal);
        date = cal.getTime();
        result += getFormattedTimeStamp(cal);
        return result;
    }

    private String getFormattedTimeStamp(Calendar calendar) {
        String result = getFormattedNumber(calendar.get(Calendar.HOUR_OF_DAY)) + ":" + getFormattedNumber(calendar.get(Calendar.MINUTE));
        return result;
    }

    private String getFormattedNumber(int number) {
        String result = "";
        if (number < 10) {
            result += "0" + number;
        } else {
            result += number;
        }

        return result;
    }

    @RequestMapping(value = "/download", method = RequestMethod.GET, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public
    @ResponseBody
    HttpEntity<byte[]> downloadB(@RequestParam String from, @RequestParam String to) throws IOException {
        System.out.println(from);
        System.out.println(to);

        //Mon Jun 18 00:00:00 IST 2012
        //Sun Oct 01 2017 18:00:00 GMT 0200 (CEST)

        SimpleDateFormat formatter = new SimpleDateFormat("EEE MMM dd yyyy HH:mm:ss z");
        String dateInString = from;
        Date fromDate = null;
        Date toDate = null;

        try {
            fromDate = formatter.parse(from);
            toDate = formatter.parse(to);

        } catch (ParseException e) {
            e.printStackTrace();
        }

        File file = generateFile(fromDate, toDate);
        byte[] document = FileCopyUtils.copyToByteArray(file);
        HttpHeaders header = new HttpHeaders();
        header.setContentType(new MediaType("application", "octet-stream"));
        header.set("Content-Disposition", "inline; filename=" + file.getName());
        header.setContentLength(document.length);

        return new HttpEntity<byte[]>(document, header);
    }

    /*
    @RequestMapping(value = "/download", method = RequestMethod.POST, produces = MediaType.APPLICATION_OCTET_STREAM_VALUE)
    public
    @ResponseBody
    HttpEntity<byte[]> downloadB(@RequestBody SummaryParam summaryParam) throws IOException {
        File file = generateFile(summaryParam);
        byte[] document = FileCopyUtils.copyToByteArray(file);
        if (summaryParam == null){
            System.out.println("summaryParam null");
        }
        HttpHeaders header = new HttpHeaders();
        header.setContentType(new MediaType("application", "octet-stream"));
        header.set("Content-Disposition", "inline; filename=" + file.getName());
        header.setContentLength(document.length);

        return new HttpEntity<byte[]>(document, header);
    }
    */


    private File generateFile(Date start, Date end) {
        FileOutputStream fop = null;
        File file = null;
        String content = "";

        try {
            Date d = new Date();
            SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm");
            String strDate = sdf.format(d);
            strDate = strDate.replace(":", ".");
            String filename = "summary_" + strDate + ".txt";// + new Date().toString();
            file = new File(filename);
            fop = new FileOutputStream(file);

            // if file doesnt exists, then create it
            if (!file.exists()) {
                file.createNewFile();
            }

            //get the summaries
            List<Inspection> inspections = new ArrayList<>();
            if (start != null && end != null) {
                System.out.println("From: " + start);
                System.out.println("To: " + end);
                inspections = repository.findAllByInspectionDateBetweenOrderByUserAscInspectionDateDescStartTimeAsc(start, end);
            } else {
                inspections = repository.findAll();
            }
            System.out.println("Retrieved: " + inspections.size());

            for (Inspection inspection : inspections) {
                content = getFormattedContent(inspection);
                byte[] contentInBytes = content.getBytes();
                fop.write(contentInBytes);
                fop.flush();
            }

            fop.close();
        } catch (IOException e) {
            e.printStackTrace();
        } finally {
            try {
                if (fop != null) {
                    fop.close();
                }
            } catch (IOException e) {
                e.printStackTrace();
            }
        }
        return file;
    }
}

