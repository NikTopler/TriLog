INSERT INTO Cities (name, countryID, stateID) VALUES 
('barcelona', (SELECT ID FROM Countries WHERE LOWER(name) = 'spain'), null),
('cairns', (SELECT ID FROM Countries WHERE LOWER(name) = 'australia'), null), 
('chattanooga', null, (SELECT ID FROM States WHERE LOWER(name) = 'tennessee')), 
('coeur dalene', null, (SELECT ID FROM States WHERE LOWER(name) = 'idaho')), 
('copenhagen', (SELECT ID FROM Countries WHERE LOWER(name) = 'denmark'), null),
('cozumel', (SELECT ID FROM Countries WHERE LOWER(name) = 'mexico'), null), 
('fortaleza', (SELECT ID FROM Countries WHERE LOWER(name) = 'brazil'), null), 
('frankfurt', (SELECT ID FROM Countries WHERE LOWER(name) = 'germany'), null), 
('kalmar', (SELECT ID FROM Countries WHERE LOWER(name) = 'sweden'), null), 
('lake placid', (SELECT ID FROM Countries WHERE LOWER(name) = 'united states of america'), null), 
('lanzarote', (SELECT ID FROM Countries WHERE LOWER(name) = 'spain'), null), 
('los cabos', (SELECT ID FROM Countries WHERE LOWER(name) = 'mexico'), null), 
('louisville', (SELECT ID FROM Countries WHERE LOWER(name) = 'united states of america'), null), 
('maastricht', (SELECT ID FROM Countries WHERE LOWER(name) = 'netherlands'), null), 
('mallorca', (SELECT ID FROM Countries WHERE LOWER(name) = 'spain'), null), 
('mont tremblant', (SELECT ID FROM Countries WHERE LOWER(name) = 'canada'), null), 
('vichy', (SELECT ID FROM Countries WHERE LOWER(name) = 'france'), null), 
('vineman', (SELECT ID FROM Countries WHERE LOWER(name) = 'united states of america'), null);