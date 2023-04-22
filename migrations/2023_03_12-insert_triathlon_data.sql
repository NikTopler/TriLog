INSERT INTO Organizations(name, acronym) VALUE('World Triathlon Corporation', 'WTC'),
('International Ultra Triathlon Organization', 'IUTA');


INSERT INTO TriathlonCategories(name, acronym, gender)
VALUE 
('pro', null, null),
('19–under', 'm1', 'male'),
('20–24', 'm2', 'male'),
('25–29', 'm3', 'male'),
('30–34', 'm4', 'male'),
('35–39', 'm5', 'male'),
('45–49', 'm6', 'male'),
('50–54', 'm7', 'male'),
('55–59', 'm8', 'male'),
('60–64', 'm9', 'male'),
('65–over', 'm10', 'male'),
('19–under', 'f1', 'female'),
('20–24', 'f2', 'female'),
('25–29', 'f3', 'female'),
('30–34', 'f4', 'female'),
('35–39', 'f5', 'female'),
('45–49', 'f6', 'female'),
('50–54', 'f7', 'female'),
('55–59', 'f8', 'female'),
('60–64', 'f9', 'female'),
('65–over', 'f10', 'female');


INSERT INTO TriathlonTypes(name, swimKm, bikeKm, runKm, organizationID)
VALUE
('IRONMAN', 3.9, 180.2, 42.2, 1),
('IRONMAN 70.3', 1.9, 90, 21, 1),
('Double-Ultra', 7.6, 360, 84.4, 2),
('Triple-Ultra', 11.4, 540, 126.6, 2);
