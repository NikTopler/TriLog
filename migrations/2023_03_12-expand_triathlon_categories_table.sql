ALTER TABLE TriathlonCategories
ADD COLUMN acronym VARCHAR(3) NOT NULL,,
ADD COLUMN gender ENUM('male', 'female');