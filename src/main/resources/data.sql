DROP TABLE IF EXISTS INSPECTION;
DROP TABLE IF EXISTS USERS;
DROP TABLE IF EXISTS USERTYPE;
DROP TABLE IF EXISTS AREA;
DROP TABLE IF EXISTS CATEGORY;
DROP TABLE IF EXISTS ACTIVITYTYPE;
DROP SEQUENCE IF EXISTS SEQ_USERTYPE;
DROP SEQUENCE IF EXISTS SEQ_USERS;
DROP SEQUENCE IF EXISTS SEQ_AREA;
DROP SEQUENCE IF EXISTS SEQ_CATEGORY;
DROP SEQUENCE IF EXISTS SEQ_INSPECTION;
DROP SEQUENCE IF EXISTS SEQ_ACTIVITYTYPE;

CREATE SEQUENCE SEQ_USERTYPE;
CREATE TABLE USERTYPE (
  ID BIGINT DEFAULT (NEXT VALUE FOR SEQ_USERTYPE) NOT NULL PRIMARY KEY,
  NAME VARCHAR(64)
);

CREATE SEQUENCE SEQ_USERS;
CREATE TABLE USERS (
  ID BIGINT DEFAULT (NEXT VALUE FOR SEQ_USERS) NOT NULL PRIMARY KEY,
  NAME VARCHAR(64),
  USERCODE INT NOT NULL,
  PASSWORD VARCHAR(64),
  USERTYPEID INT NOT NULL,
  FOREIGN KEY (USERTYPEID) REFERENCES USERTYPE(ID)
);

CREATE SEQUENCE SEQ_AREA;
CREATE TABLE AREA (
  ID BIGINT DEFAULT (NEXT VALUE FOR SEQ_AREA) NOT NULL PRIMARY KEY,
  NAME VARCHAR(64),
  CODE INT NOT NULL,
  ISACTIVE BOOLEAN
);

CREATE SEQUENCE SEQ_CATEGORY;
CREATE TABLE CATEGORY (
  ID BIGINT DEFAULT (NEXT VALUE FOR SEQ_CATEGORY) NOT NULL PRIMARY KEY,
  NAME VARCHAR(64),
  CODE INT NOT NULL,
  DESCRIPTION VARCHAR(64)
);

CREATE SEQUENCE SEQ_ACTIVITYTYPE;
CREATE TABLE ACTIVITYTYPE (
  ID BIGINT DEFAULT (NEXT VALUE FOR SEQ_ACTIVITYTYPE) NOT NULL PRIMARY KEY,
  CODE INT NOT NULL,
  DESCRIPTION VARCHAR(64)
);

CREATE SEQUENCE SEQ_INSPECTION;
CREATE TABLE INSPECTION(
  ID BIGINT DEFAULT (NEXT VALUE FOR SEQ_INSPECTION) NOT NULL PRIMARY KEY,
  COMPANYCODE INT NOT NULL,
  ENDTIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  STARTTIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INSPECTIONTIME DATE,
  TRAVELTIME TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FINED INT NOT NULL,
  OBLITERATED INT NOT NULL,
  WARNINGS INT NOT NULL,
  USERID INT NOT NULL,
  ACTIVITYTYPEID INT NOT NULL,
  AREAID INT NOT NULL,
  CATEGORYID INT NOT NULL,
  FOREIGN KEY (USERID) REFERENCES USERS(ID),
  FOREIGN KEY (ACTIVITYTYPEID) REFERENCES ACTIVITYTYPE(ID),
  FOREIGN KEY (AREAID) REFERENCES AREA(ID),
  FOREIGN KEY (CATEGORYID) REFERENCES CATEGORY(ID)
);

-- populate
INSERT INTO USERTYPE (id, name) values (1, 'vakt');
INSERT INTO USERTYPE (id, name) values (2, 'gruppledare');
INSERT INTO USERTYPE (id, name) values (3, 'administratör');

INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (5, 'Almir Hrvat', '112234', 2266, 3);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (6, 'Aleksander Koseski', '112234', 4433, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (9, 'Bertil Lundin', '112234', 5430, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (25, 'Nils Davidsson', '112234', 4451, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (26, 'John Persson', '112234', 2383, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (27, 'Jan Bäckström', '112234', 4708, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (30, 'Bertil Eriksson', '112234', 5145, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (43, 'Peter Norden', '112234', 2640, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (44, 'Markus Thuresson', '112234', 4289, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (45, 'Göran Olsson', '112234', 1050, 3);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (46, 'Adnan Muharemovic', 'lllooo', 4475, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (47, 'Salwan Yousif', '112234', 2519, 3);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (48, 'Antigone Alushaj', '112234', 4119, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (49, 'Rebecca Andersson Swärdh', '112234', 2494, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (50, 'Mike Seldemark', '112234', 4363, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (51, 'Jovan Karakas', '112234', 4484, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (52, 'Andreas Fjärrwall', '112234', 1245, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (53, 'Torbjörn Maursteg', '112234', 1204, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (54, 'Elin Körmark', '112234', 1281, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (55, 'Senad Corovic', '112234', 4455, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (56, 'Sarah Runmark', '112234', 1177, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (57, 'Ioan Ungur', '112234', 1203, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (58, 'Redouane Doubakil', '112234', 1111, 3);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (59, 'Amal Haddjeri', '112234', 1015, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (60, 'Ramazan Karabulut', '112234', 1305, 1);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (61, 'Johan Nilsson', '112234', 1127, 3);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (62, 'Maria Öhrn', '112234', 1116, 3);
INSERT INTO USERS (ID, NAME, PASSWORD, USERCODE, USERTYPEID) VALUES (63, 'Nuh kibar', '112234', 1198, 1);

-- categories
INSERT INTO CATEGORY (ID, CODE, DESCRIPTION) VALUES
(1, 0, 'inga lappar'),
(2, 1, 'lappar');

-- areas
INSERT INTO AREA (ID, CODE, NAME, ISACTIVE) VALUES
(1, 3844, 'Adolf Edelsvärds Gata', TRUE),
(2, 1428, 'Allmänna Vägen 2B', TRUE),
(3, 1418, 'Almedalsvägen BILIA', FALSE),
(4, 1009, 'Amerikaskjulet', TRUE),
(5, 1330, 'Amiralitetsgatan 24 A-S', TRUE),
(805, 0, 'Start/Stop', 1);


-- activitytypes
INSERT INTO ACTIVITYTYPE (ID, CODE, DESCRIPTION) VALUES (1, 0, '-');
INSERT INTO ACTIVITYTYPE (ID, CODE, DESCRIPTION) VALUES (2, 1, 'Start');
INSERT INTO ACTIVITYTYPE (ID, CODE, DESCRIPTION) VALUES (3, 2, 'Restid');
INSERT INTO ACTIVITYTYPE (ID, CODE, DESCRIPTION) VALUES (4, 3, 'Stop');

-- inspections
INSERT INTO INSPECTION (ID, COMPANYCODE, ENDTIME, FINED, INSPECTIONTIME, OBLITERATED, STARTTIME, TRAVELTIME, WARNINGS, ACTIVITYTYPEID, AREAID, CATEGORYID, USERID) VALUES
(7010, 5, '2017-09-30 10:20:00', 0, '2017-09-30', 0, '2017-09-30 10:15:00', '2017-09-30 10:15:00', 0, 1, 4, 2, 5),
(7011, 5, '2017-09-30 10:50:00', 0, '2017-09-30', 0, '2017-09-30 10:20:00', '2017-09-30 10:15:00', 0, 1, 4, 2, 5);








