ALTER TABLE Participations
ADD COLUMN triathlonCategoryID INT;

ALTER TABLE Participations
ADD CONSTRAINT `participation_triathlonCategory_FK` FOREIGN KEY (triathlonCategoryID) REFERENCES TriathlonCategories (ID) ON DELETE CASCADE ON UPDATE CASCADE;

ALTER TABLE Triathlons
DROP FOREIGN KEY triathlon_triathlonCategory_FK,
DROP COLUMN triathlonCategoryID;
