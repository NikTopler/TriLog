INSERT INTO Organizations(name, acronym) VALUE('World Triathlon Corporation', 'WTC'),
('International Ultra Triathlon Organization', 'IUTA');


INSERT INTO TriathlonCategories(name, acronym, gender)
VALUE 
('pro', 'pro', null),
('19–under', 'm1', 'male'),
('20–24', 'm2', 'male'),
('25–29', 'm3', 'male'),
('30–34', 'm4', 'male'),
('35–39', 'm5', 'male'),
('40–44', 'm6', 'male'),
('45–49', 'm7', 'male'),
('50–54', 'm8', 'male'),
('55–59', 'm9', 'male'),
('60–64', 'm10', 'male'),
('65–over', 'm11', 'male'),
('19–under', 'f1', 'female'),
('20–24', 'f2', 'female'),
('25–29', 'f3', 'female'),
('30–34', 'f4', 'female'),
('35–39', 'f5', 'female'),
('40–44', 'f6', 'female'),
('45–49', 'f7', 'female'),
('50–54', 'f8', 'female'),
('55–59', 'f9', 'female'),
('60–64', 'f10', 'female'),
('65–over', 'f11', 'female');


INSERT INTO TriathlonTypes(name, swimKm, bikeKm, runKm, organizationID)
VALUE
('Ironman', 3.9, 180.2, 42.2, 1),
('Ironman 70.3', 1.9, 90, 21, 1),
('Double-Ultra', 7.6, 360, 84.4, 2),
('Triple-Ultra', 11.4, 540, 126.6, 2);
