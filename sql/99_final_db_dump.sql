DROP TABLE IF EXISTS user;
CREATE TABLE user (
  id int(11) NOT NULL AUTO_INCREMENT,
  username varchar(100) DEFAULT NULL,
  email varchar(100) DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS home;
CREATE TABLE home (
  id int(11) NOT NULL AUTO_INCREMENT,
  street_address varchar(255) NOT NULL,
  state varchar(50) DEFAULT NULL,
  zip varchar(10) DEFAULT NULL,
  sqft float DEFAULT NULL,
  beds int DEFAULT NULL,
  baths int DEFAULT NULL,
  list_price float DEFAULT NULL,
  PRIMARY KEY (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

DROP TABLE IF EXISTS user_home_relation;
CREATE TABLE user_home_relation (
  id int(11) NOT NULL AUTO_INCREMENT,
  user_id int(11) NOT NULL,
  home_id int(11) NOT NULL,
  PRIMARY KEY (id),
  FOREIGN KEY (user_id) REFERENCES user (id),
  FOREIGN KEY (home_id) REFERENCES home (id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO user (username, email)
SELECT DISTINCT username, email FROM user_home;

INSERT INTO home (street_address, state, zip, sqft, beds, baths, list_price)
SELECT DISTINCT street_address, state, zip, sqft, beds, baths, list_price FROM user_home;

INSERT INTO user_home_relation (user_id, home_id)
SELECT user.id, home.id FROM user_home
JOIN user ON user_home.username = user.username
JOIN home ON user_home.street_address = home.street_address AND user_home.state = home.state AND user_home.zip = home.zip;

-- You can drop the original table if you want to, im leaving it here for reference
-- DROP TABLE IF EXISTS user_home;