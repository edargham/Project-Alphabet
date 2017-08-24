/*
-- Query: 
-- Date: 2017-07-20 12:28
*/
SET SQL_SAFE_UPDATES = 0;
DELETE FROM `Group`;
DELETE FROM `Person`;
DELETE  FROM `Rating`;
SET SQL_SAFE_UPDATES = 1;
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (1,1,'Rating 1');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (2,2,'Rating 2');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (3,3,'Rating 3');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (4,4,'Rating 4');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (5,5,'Rating 5');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (6,6,'Rating 6');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (7,7,'Rating 7');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (8,8,'Rating 8');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (9,9,'Rating 9');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (10,10,'Rating 10');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (11,11,'Rating 11');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (12,12,'Rating 12');
INSERT INTO `Rating` (`idRating`,`Rating`,`Rating_Description`) VALUES (100,0,'Not Applicable');

INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (1,'Grade 1A',1);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (2,'Grade 1B',1);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (3,'Grade 3',3);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (4,'Grade 4',4);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (5,'Grade 5',5);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (6,'Grade 6',6);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (7,'Grade 7',7);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (8,'Grade 8',8);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (9,'Grade 9',9);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (10,'Grade 10',10);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (11,'Grade 11',11);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (12,'Grade 12',12);
INSERT INTO `Group` (`idGroup`,`Group_Name`,`Rating_idRating`) VALUES (13,'Grade 2',2);

INSERT INTO `Person` (`idPerson`,`Username`,`First_Name`,`Last_Name`,`Parent_Person_ID`,`Group_idGroup`,`Role_idRole`,`Rating_idRating`) VALUES (1,'cs_coordinator','Computer Science','Coordinator',NULL,11,1,100);
INSERT INTO `Person` (`idPerson`,`Username`,`First_Name`,`Last_Name`,`Parent_Person_ID`,`Group_idGroup`,`Role_idRole`,`Rating_idRating`) VALUES (2,'cs_teacher01','Computer Science','Teacher1',1,11,2,100);
INSERT INTO `Person` (`idPerson`,`Username`,`First_Name`,`Last_Name`,`Parent_Person_ID`,`Group_idGroup`,`Role_idRole`,`Rating_idRating`) VALUES (3,'cs_teacher02','Computer Science','Teacher2',1,11,2,100);
INSERT INTO `Person` (`idPerson`,`Username`,`First_Name`,`Last_Name`,`Parent_Person_ID`,`Group_idGroup`,`Role_idRole`,`Rating_idRating`) VALUES (4,'cs_student01','Computer Science','Student1',2,7,3,7);
INSERT INTO `Person` (`idPerson`,`Username`,`First_Name`,`Last_Name`,`Parent_Person_ID`,`Group_idGroup`,`Role_idRole`,`Rating_idRating`) VALUES (5,'cs_student02','Computer Science','Student2',2,7,3,7);
INSERT INTO `Person` (`idPerson`,`Username`,`First_Name`,`Last_Name`,`Parent_Person_ID`,`Group_idGroup`,`Role_idRole`,`Rating_idRating`) VALUES (6,'cs_student03','Computer Science','Student3',3,5,3,5);
INSERT INTO `Person` (`idPerson`,`Username`,`First_Name`,`Last_Name`,`Parent_Person_ID`,`Group_idGroup`,`Role_idRole`,`Rating_idRating`) VALUES (7,'cs_student04','Computer Science','Student4',3,5,3,5);

INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (1,'Basic Technology Skill',NULL,NULL,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (2,'Operating Systems: Microsoft Windows ',NULL,NULL,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (3,'Email Communication',NULL,NULL,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (4,'Keyboarding: Typing.com','Typing Lessons: Focus on typing accuracy, proper finger placment, not speed. Speed will be acquired naturally over time in the future months and years of typing lessons.',NULL,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (5,'Microsoft Powerpoint',NULL,NULL,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (6,'Microsoft Excel: The Basics',NULL,NULL,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (7,'Hardware',NULL,1,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (8,'Mouse Discovery',NULL,1,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (9,'Keyboard Discovery',NULL,1,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (10,'Screen',NULL,1,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (11,'Central Processing Unit',NULL,1,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (12,'Desktop',NULL,2,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (13,'Mail',NULL,3,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (14,'Address Book',NULL,3,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (15,'Settings',NULL,3,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (16,'Composing',NULL,13,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (17,'Replying',NULL,13,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (18,'Contacts',NULL,14,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (19,'Identities',NULL,15,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (20,'Typing position: Technique and Posture',NULL,4,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (21,'The Home Row',NULL,4,'07/06/2017',2,2);
INSERT INTO `Skill` (`idSkill`,`Skill_Name`,`Skill_Description`,`Parent_Skill_ID`,`Date_Created`,`Person_idPerson`,`Rating_idRating`) VALUES (22,'Practicing Typing for Beginners',NULL,4,'07/06/2017',2,2);



