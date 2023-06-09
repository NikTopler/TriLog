CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    profileImageUrl VARCHAR(255) DEFAULT NULL,
    refreshToken VARCHAR(255) DEFAULT NULL,
    verificationToken VARCHAR(255) DEFAULT NULL,
    verificationTokenExpiresAt DATETIME DEFAULT NULL,
    verificationCode VARCHAR(5) DEFAULT NULL,
    verificationCodeExpiresAt DATETIME DEFAULT NULL,
    isVerified BOOLEAN NOT NULL DEFAULT FALSE,
    role ENUM('user', 'admin') NOT NULL DEFAULT 'user',
    createdAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);