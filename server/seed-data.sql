-- BASIC PHASE 1A - DROP and CREATE table
-- Your code here 
DROP TABLE IF EXISTS trees;

CREATE TABLE trees (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    tree VARCHAR(32), 
    location VARCHAR(64),
    height_ft INTEGER,
    ground_circumference_ft INTEGER
);

-- BASIC PHASE 1B - INSERT seed data
-- Your code here 
INSERT INTO trees
VALUES 
    (1, "General Sherman", "Sequoia National Park", 274.9, 102.6)
    ,(2, "General Grant", "Kings Canyon National Park", 268.1, 107.5)
    ,(3, "President", "Sequoia National Park", 240.9, 93.0)
    ,(4, "Lincoln", "Sequoia National Park", 255.8,	98.3)
    ,(5, "Stagg", "Private Land", 243.0,	109.0)
;
