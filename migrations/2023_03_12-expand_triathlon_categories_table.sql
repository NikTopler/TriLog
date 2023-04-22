ALTER TABLE TriathlonCategories
ADD COLUMN acronym VARCHAR(3),
ADD COLUMN gender ENUM('male', 'female');