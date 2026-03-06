-- Drop the database if it exists and then create it
DROP DATABASE IF EXISTS HealthDiary;
CREATE DATABASE HealthDiary;

USE HealthDiary;

CREATE TABLE Users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    user_level VARCHAR(10) DEFAULT 'regular'
);

CREATE TABLE DiaryEntries (
    entry_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    entry_date DATE NOT NULL,
    mood VARCHAR(50),
    weight DECIMAL(5,2),
    sleep_hours INT,
    notes TEXT,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Medications (
    medication_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    name VARCHAR(100) NOT NULL,
    dosage VARCHAR(50),
    frequency VARCHAR(50),
    start_date DATE,
    end_date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

CREATE TABLE Exercises (
    exercise_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    type VARCHAR(100) NOT NULL,
    duration INT NOT NULL,
    intensity VARCHAR(50),
    date DATE,
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);


CREATE TABLE IF NOT EXISTS DailySteps (
    step_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    step_date DATE NOT NULL,
    steps INT NOT NULL,
    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);


-- Altering existing tables

ALTER TABLE DiaryEntries ADD COLUMN calories_eaten INT NULL AFTER steps;

ALTER TABLE DiaryEntries  ADD COLUMN steps INT NULL AFTER sleep_hours;

ALTER TABLE DiaryEntries ADD COLUMN calories_burned INT NULL AFTER calories_eaten;



-- Insert sample data

INSERT INTO Users (username, password, email, created_at, user_level) VALUES
('johndoe', 'hashed_password', 'johndoe@example.com', '2024-01-01 09:00:00', 'regular'),
('janedoe', 'hashed_password', 'janedoe@example.com', '2024-01-02 10:00:00', 'admin'),
('alice_jones', 'hashed_password', 'alice@example.com', '2024-01-04 08:30:00', 'regular'),
('bob_brown', 'hashed_password', 'bob@example.com', '2024-01-05 07:45:00', 'regular'),
('charlie_black', 'hashed_password', 'charlie@example.com', '2024-01-06 08:00:00', 'regular'),
('david_white', 'hashed_password', 'david@example.com', '2024-01-07 09:15:00', 'regular'),
('eva_green', 'hashed_password', 'eva@example.com', '2024-01-08 10:30:00', 'regular'),
('frank_blue', 'hashed_password', 'frank@example.com', '2024-01-09 11:00:00', 'regular'),
('maria_red', 'hashed_password', 'maria@example.com', '2024-01-10 12:00:00', 'regular'),
('linda_yellow', 'hashed_password', 'linda@example.com', '2024-01-11 13:00:00', 'regular');

INSERT INTO DiaryEntries (user_id, entry_date, mood, weight, sleep_hours, notes, created_at) VALUES
(1, '2024-01-10', 'Happy', 70.5, 8, 'Had a great workout session', '2024-01-10 20:00:00'),
(2, '2024-01-11', 'Satisfied', 65.0, 7, 'Met with friends, had a good time', '2024-01-11 21:00:00'),
(3, '2024-01-12', 'Tired', 68.0, 6, 'Work was demanding', '2024-01-12 22:00:00'),
(4, '2024-01-13', 'Energetic', 55.0, 9, 'Went for a morning run', '2024-01-13 18:00:00'),
(5, '2024-01-14', 'Relaxed', 75.0, 8, 'Spent the day reading', '2024-01-14 19:00:00');
(6, '2026-01-27', 'Energetic', 82.4, 7, 2200, 2800, 'Workout day, healthy eating'),
(7, '2026-01-28', 'Tired', 82.1, 5, 2600, 2400, 'Ate more than usual, low activity'),
(8, '2026-01-29', 'Neutral', 81.9, 8, 1850, 2950, 'Long evening walk + low calorie day'),
(9, '2026-01-28', 'Good', 65.3, 8, 1750, 2100, 'Light yoga + balanced meals'),
(10, '2026-01-29', 'Happy', 65.0, 7, 2000, 2500, 'Jogging + good eating routine');


INSERT INTO Medications (user_id, name, dosage, frequency, start_date, end_date) VALUES
(1, 'Vitamin D', '1000 IU', 'Daily', '2024-01-01', '2024-06-01'),
(2, 'Ibuprofen', '200 mg', 'As needed', '2024-01-05', '2024-01-20'),
(2, 'Amoxicillin', '500 mg', 'Every 8 hours', '2024-01-10', '2024-01-20'),
(4, 'Metformin', '500 mg', 'Twice a day', '2024-01-15', '2024-07-15'),
(2, 'Lisinopril', '10 mg', 'Daily', '2024-01-20', '2024-07-20');

INSERT INTO Exercises (user_id, type, duration, intensity, date) VALUES
(1, 'Running', 30, 'High', '2024-01-10'),
(3, 'Cycling', 45, 'Medium', '2024-01-11'),
(2, 'Swimming', 55, 'Low', '2024-01-12'),
(1, 'Swimming', 30, 'Medium', '2024-01-16'),
(3, 'Swimming', 60, 'Low', '2024-01-18'),
(3, 'Yoga', 50, 'Low', '2024-01-18'),
(1, 'Weight Training', 40, 'High', '2024-01-19');

INSERT INTO DailySteps (user_id, step_date, steps)
VALUES
    (1, '2026-01-27', 8423),
    (2, '2026-01-28', 10234),
    (3, '2026-01-28', 6531);
    (4, '2026-02-01', 7891);