DROP TABLE IF EXISTS INSPECTION;
DROP TABLE IF EXISTS SUSERS;
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
  ID BIGINT DEFAULT NEXTVAL('SEQ_USERTYPE') NOT NULL PRIMARY KEY,
  NAME VARCHAR(64)
);

CREATE SEQUENCE SEQ_USERS;
CREATE TABLE SUSERS (
  ID BIGINT DEFAULT NEXTVAL('SEQ_USERS') NOT NULL PRIMARY KEY,
  NAME VARCHAR(64),
  CODE INT UNIQUE NOT NULL,
  PASSWORD VARCHAR(64),
  USERTYPEID INT NOT NULL,
  FOREIGN KEY (USERTYPEID) REFERENCES USERTYPE(ID)
);

CREATE SEQUENCE SEQ_AREA;
CREATE TABLE AREA (
  ID BIGINT DEFAULT NEXTVAL('SEQ_AREA') NOT NULL PRIMARY KEY,
  NAME VARCHAR(64),
  CODE INT UNIQUE NOT NULL,
  ISACTIVE BOOLEAN
);

CREATE SEQUENCE SEQ_CATEGORY;
CREATE TABLE CATEGORY (
  ID BIGINT DEFAULT NEXTVAL('SEQ_CATEGORY') NOT NULL PRIMARY KEY,
  NAME VARCHAR(64),
  CODE INT NOT NULL,
  DESCRIPTION VARCHAR(64)
);

CREATE SEQUENCE SEQ_ACTIVITYTYPE;
CREATE TABLE ACTIVITYTYPE (
  ID BIGINT DEFAULT NEXTVAL('SEQ_ACTIVITYTYPE') NOT NULL PRIMARY KEY,
  CODE INT NOT NULL,
  DESCRIPTION VARCHAR(64)
);

CREATE SEQUENCE SEQ_INSPECTION;
CREATE TABLE INSPECTION(
  ID BIGINT DEFAULT NEXTVAL('SEQ_INSPECTION') NOT NULL PRIMARY KEY,
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
  FOREIGN KEY (USERID) REFERENCES SUSERS(ID),
  FOREIGN KEY (ACTIVITYTYPEID) REFERENCES ACTIVITYTYPE(ID),
  FOREIGN KEY (AREAID) REFERENCES AREA(ID),
  FOREIGN KEY (CATEGORYID) REFERENCES CATEGORY(ID)
);

-- populate
INSERT INTO USERTYPE (id, name) values (1, 'vakt');
INSERT INTO USERTYPE (id, name) values (2, 'gruppledare');
INSERT INTO USERTYPE (id, name) values (3, 'administratör');

INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (1, 'Almir Hrvat', '2042', 2266, 3);
INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (2, 'Aleksander Koseski', '999999', 4433, 1);
INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (3, 'Bertil Lundin', '999999', 5430, 1);
INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (4, 'Nils Davidsson', '999999', 4451, 1);
INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (5, 'John Persson', '999999', 2383, 1);
INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (6, 'Jan Bäckström', '999999', 4708, 1);
INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (30, 'Bertil Eriksson', '999999', 5145, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (43, 'Peter Norden', '999999', 2640, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (44, 'Markus Thuresson', '999999', 4289, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (45, 'Göran Olsson', '999999', 1050, 3);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (46, 'Adnan Muharemovic', 'lllooo', 4475, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (47, 'Salwan Yousif', '999999', 2519, 3);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (48, 'Antigone Alushaj', '999999', 4119, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (49, 'Rebecca Andersson Swärdh', '999999', 2494, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (50, 'Mike Seldemark', '999999', 4363, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (51, 'Jovan Karakas', '999999', 4484, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (52, 'Andreas Fjärrwall', '999999', 1245, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (53, 'Torbjörn Maursteg', '999999', 1204, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (54, 'Elin Körmark', '999999', 1281, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (55, 'Senad Corovic', '999999', 4455, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (56, 'Sarah Runmark', '999999', 1177, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (57, 'Ioan Ungur', '999999', 1203, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (58, 'Redouane Doubakil', '999999', 1111, 3);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (59, 'Amal Haddjeri', '999999', 1015, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (60, 'Ramazan Karabulut', '999999', 1305, 1);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (61, 'Johan Nilsson', '999999', 1127, 3);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (62, 'Maria Öhrn', '999999', 1116, 3);
--INSERT INTO SUSERS (ID, NAME, PASSWORD, CODE, USERTYPEID) VALUES (63, 'Nuh kibar', '999999', 1198, 1);

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
(805, 0, 'Start/Stop', FALSE);

-- activitytypes
INSERT INTO ACTIVITYTYPE (ID, CODE, DESCRIPTION) VALUES (1, 0, '-');
INSERT INTO ACTIVITYTYPE (ID, CODE, DESCRIPTION) VALUES (2, 1, 'Start');
INSERT INTO ACTIVITYTYPE (ID, CODE, DESCRIPTION) VALUES (3, 2, 'Restid');
INSERT INTO ACTIVITYTYPE (ID, CODE, DESCRIPTION) VALUES (4, 3, 'Stop');

-- inspections
-- hint: activity,area,category,users
INSERT INTO INSPECTION (ID, COMPANYCODE, ENDTIME, FINED, INSPECTIONTIME, OBLITERATED, STARTTIME, TRAVELTIME, WARNINGS, ACTIVITYTYPEID, AREAID, CATEGORYID, USERID) VALUES
(7010, 5, '2017-10-01 10:20:00', 0, '2017-10-01', 0, '2017-10-01 10:15:00', '2017-10-01 10:15:00', 0, 1, 5, 2, 1),
(7011, 5, '2017-10-01 10:50:00', 0, '2017-10-01', 0, '2017-10-01 10:20:00', '2017-10-01 10:20:00', 0, 1, 3, 2, 1),
(7017, 5, '2017-10-01 11:15:00', 0, '2017-10-01', 0, '2017-10-01 10:50:00', '2017-10-01 10:50:00', 0, 1, 4, 2, 1),
(7018, 5, '2017-10-01 11:35:00', 0, '2017-10-01', 0, '2017-10-01 11:15:00', '2017-10-01 11:15:00', 0, 1, 1, 2, 1),
(7012, 5, '2017-09-30 10:50:00', 0, '2017-09-30', 0, '2017-09-30 10:20:00', '2017-09-30 10:20:00', 0, 1, 4, 2, 1),
(7013, 5, '2017-09-30 11:15:00', 0, '2017-09-30', 0, '2017-09-30 11:00:00', '2017-09-30 10:50:00', 0, 1, 3, 2, 1),
(7014, 5, '2017-09-30 11:45:00', 0, '2017-09-30', 0, '2017-09-30 11:20:00', '2017-09-30 11:15:00', 0, 1, 1, 2, 1),
(7015, 5, '2017-09-30 12:00:00', 0, '2017-09-30', 0, '2017-09-30 11:45:00', '2017-09-30 11:45:00', 0, 1, 2, 2, 1),
(7016, 5, '2017-09-29 10:50:00', 0, '2017-09-29', 0, '2017-09-29 10:20:00', '2017-09-29 10:20:00', 0, 1, 4, 2, 1);








