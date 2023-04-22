INSERT INTO States (name, acronym, countryID)
VALUES ('New South Wales', 'NSW', (SELECT ID FROM Countries WHERE LOWER(name) = 'australia')),
       ('Queensland', 'QLD', (SELECT ID FROM Countries WHERE LOWER(name) = 'australia')),
       ('South Australia', 'SA', (SELECT ID FROM Countries WHERE LOWER(name) = 'australia')),
       ('Tasmania', 'TAS', (SELECT ID FROM Countries WHERE LOWER(name) = 'australia')),
       ('Victoria', 'VIC', (SELECT ID FROM Countries WHERE LOWER(name) = 'australia')),
       ('Western Australia', 'WA', (SELECT ID FROM Countries WHERE LOWER(name) = 'australia'));
