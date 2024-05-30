create database testDB;

//유저 테이블
CREATE TABLE User (
    user_no INT NOT NULL AUTO_INCREMENT,
    user_id VARCHAR(200) NOT NULL,
    user_pw VARCHAR(200) NOT NULL,
    PRIMARY KEY (user_no)
) COLLATE='utf8mb4_general_ci';

//각각의 유저에 대한 스탬프 테이블
CREATE TABLE UserStamp (
    user_no INT NOT NULL,
    stamp_id INT NOT NULL,
    is_collected BOOLEAN DEFAULT FALSE,
    PRIMARY KEY (user_no, stamp_id),
    FOREIGN KEY (user_no) REFERENCES User(user_no),
    FOREIGN KEY (stamp_id) REFERENCES Stamp(stamp_id)
);

//스탬프 테이블
CREATE TABLE Stamp (
    stamp_id INT AUTO_INCREMENT PRIMARY KEY,
    stamp_name VARCHAR(100) NOT NULL,
     latitude DECIMAL(25, 15) NOT NULL,
    longitude DECIMAL(25, 15) NOT NULL,
);

//스탬프 테이블 값 추가
INSERT INTO Stamp (latitude, longitude, stamp_name)
VALUES
(35.80119999998254, 128.52099220293818, '활엽수림'),
(35.80052370351272, 128.5201012191372, '습지원'),
(35.799712542069514, 128.52292532334738, '무궁화원'),
(35.797142822107794, 128.5259099978123, '염료 식물원'),
(35.795706624856, 128.52537693278592, '양치 식물원'),
(35.79479437605564, 128.52571073583277, '전통정원');


//유저가 추가되면 자동으로 UserStamp 테이블에 유저에 대한 스탬프 생성
DELIMITER //
CREATE TRIGGER after_user_insert
AFTER INSERT ON User
FOR EACH ROW
BEGIN
    INSERT INTO UserStamp (user_no, stamp_id)
    SELECT NEW.user_no, stamp_id
    FROM Stamp;
END//
DELIMITER ;

//사용자에 대한 특정 스탬프 true로 바꾸기
UPDATE UserStamp
SET is_collected = TRUE
WHERE user_no = 9 and stamp_id = 13;