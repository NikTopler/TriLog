CREATE DATABASE TriLog;

DROP TABLE IF EXISTS Countries;
CREATE TABLE Countries (

	ID INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(150),
	fullName VARCHAR(200),
	alpha2 VARCHAR(2),
	alpha3 VARCHAR(3),
	continentCode VARCHAR(2),
	number VARCHAR(3)

);

DROP TABLE IF EXISTS States;
CREATE TABLE States (

	ID INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(40),
	acronym VARCHAR(3),
	countryID INT NOT NULL,
	
	CONSTRAINT `state_country_FK` FOREIGN KEY (countryID) REFERENCES Countries (ID) ON DELETE CASCADE ON UPDATE CASCADE
	
);


DROP TABLE IF EXISTS Cities;
CREATE TABLE Cities (

	ID INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(40),
	countryID INT,
	stateID INT,
	
	CONSTRAINT `city_country_FK` FOREIGN KEY (countryID) REFERENCES Countries (ID) ON DELETE CASCADE ON UPDATE CASCADE,
	
	CONSTRAINT `city_state_FK` FOREIGN KEY (stateID) REFERENCES States (ID) ON DELETE CASCADE ON UPDATE CASCADE
	
);


DROP TABLE IF EXISTS Athletes;
CREATE TABLE Athletes (

	ID INT PRIMARY KEY AUTO_INCREMENT,
	firstName VARCHAR(50),
	lastName VARCHAR(50),
	age INT,
	countryID INT,
	stateID INT,
	cityID INT,
	
	CONSTRAINT `athlete_country_FK` FOREIGN KEY (countryID) REFERENCES Countries (ID) ON DELETE CASCADE ON UPDATE CASCADE,
	
	CONSTRAINT `athlete_state_FK` FOREIGN KEY (stateID) REFERENCES States (ID) ON DELETE CASCADE ON UPDATE CASCADE,
	
	CONSTRAINT `athlete_city_FK` FOREIGN KEY (cityID) REFERENCES Cities (ID) ON DELETE CASCADE ON UPDATE CASCADE

);


DROP TABLE IF EXISTS Organizations;
CREATE TABLE Organizations (

	ID INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	acronym VARCHAR(5) NOT NULL	

);


DROP TABLE IF EXISTS TriathlonTypes;
CREATE TABLE TriathlonTypes (

	ID INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(100) NOT NULL,
	swimKm DOUBLE NOT NULL,
	bikeKm DOUBLE NOT NULL,
	runKm DOUBLE NOT NULL,
	organizationID INT NOT NULL,
	
	CONSTRAINT `triathlonType_oranization_FK` FOREIGN KEY (organizationID) REFERENCES Organizations (ID) ON DELETE CASCADE ON UPDATE CASCADE

);


DROP TABLE IF EXISTS TriathlonCategories;
CREATE TABLE TriathlonCategories (

	ID INT PRIMARY KEY AUTO_INCREMENT,
	name VARCHAR(15) NOT NULL
	
);


DROP TABLE IF EXISTS Triathlons;
CREATE TABLE Triathlons (

	ID INT PRIMARY KEY AUTO_INCREMENT,
	year INT NOT NULL,
	countryID INT,
	stateID INT,
	cityID INT,
	isWorldChampionship BOOLEAN,
	triathlonTypeID INT NOT NULL,
	triathlonCategoryID INT,
	
	CONSTRAINT `triathlon_country_FK` FOREIGN KEY (countryID) REFERENCES Countries (ID) ON DELETE CASCADE ON UPDATE CASCADE,
	
	CONSTRAINT `triathlon_state_FK` FOREIGN KEY (stateID) REFERENCES States (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT `triathlon_city_FK` FOREIGN KEY (cityID) REFERENCES Cities (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT `triathlon_triathlonType_FK` FOREIGN KEY (triathlonTypeID) REFERENCES TriathlonTypes (ID) ON DELETE CASCADE ON UPDATE CASCADE,
	
	CONSTRAINT `triathlon_triathlonCategory_FK` FOREIGN KEY (triathlonCategoryID) REFERENCES TriathlonCategories (ID) ON DELETE CASCADE ON UPDATE CASCADE

);

DROP TABLE IF EXISTS Participations;
CREATE TABLE Participations (

	ID INT PRIMARY KEY AUTO_INCREMENT,
	swimTimeSeconds INT,
	bikeTimeSeconds INT,
	runTimeSeconds INT,
	timeSeconds INT,
	startNumber INT,
	firstTransitionSeconds INT,
	secondTransitionSeconds INT,
	genderRank INT,
	divisionRank INT,
	rank INT,
	points INT,
	DNS BOOLEAN,
	DNF BOOLEAN,
	athleteID INT NOT NULL,
	triathlonID INT NOT NULL,
	
	CONSTRAINT `participation_athlete_FK` FOREIGN KEY (athleteID) REFERENCES Athletes (ID) ON DELETE CASCADE ON UPDATE CASCADE,

	CONSTRAINT `participation_triathlon_FK` FOREIGN KEY (triathlonID) REFERENCES Triathlons (ID) ON DELETE CASCADE ON UPDATE CASCADE
	
);