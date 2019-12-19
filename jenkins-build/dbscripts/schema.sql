SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema stock_market
-- -----------------------------------------------------

CREATE SCHEMA IF NOT EXISTS `stock_market` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ;
USE `stock_market` ;


-- -----------------------------------------------------
-- Table `stock_market`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stock_market`.`user` (
  `us_id` INT NOT NULL AUTO_INCREMENT,
  `us_user_name` VARCHAR(60) NULL,
  `us_password` VARCHAR(60) NOT NULL,
  `us_email` VARCHAR(50) NOT NULL,
  `us_mobile_number` VARCHAR(12) NOT NULL,
  `us_confirmed` BOOLEAN DEFAULT FALSE,
  PRIMARY KEY (`us_id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `stock_market`.`confirmation_table` (
  `ct_id` INT NOT NULL AUTO_INCREMENT,
  `ct_token` VARCHAR(60) NULL,
  `ct_user_name` VARCHAR(60) NOT NULL,
  PRIMARY KEY (`ct_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `stock_market`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stock_market`.`role` (
  `ro_id` INT NOT NULL AUTO_INCREMENT,
  `ro_name` VARCHAR(10) NOT NULL,
  PRIMARY KEY (`ro_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `stock_market`.`user_role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stock_market`.`user_role` (
  `ur_id` INT NOT NULL AUTO_INCREMENT,
  `ur_us_id` INT NULL,
  `ur_ro_id` INT NULL,
  PRIMARY KEY (`ur_id`),
  INDEX `ur_us_fk_idx` (`ur_us_id` ASC),
  INDEX `ur_ro_fk_idx` (`ur_ro_id` ASC),
  CONSTRAINT `ur_us_fk`
    FOREIGN KEY (`ur_us_id`)
    REFERENCES `stock_market`.`user` (`us_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `ur_ro_fk`
    FOREIGN KEY (`ur_ro_id`)
    REFERENCES `stock_market`.`role` (`ro_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `stock_market`.`company`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stock_market`.`company` (
  `cp_id` INT NOT NULL AUTO_INCREMENT,
  `cp_code` BIGINT NOT NULL,
  `cp_name` VARCHAR(30) NOT NULL,
  `cp_turnover` BIGINT NOT NULL,
  `cp_ceo` VARCHAR(30) NOT NULL,
  `cp_listed` BOOLEAN DEFAULT FALSE,
  `cp_se_id` INT NOT NULL,
  `cp_brief` VARCHAR(600) NOT NULL,
  PRIMARY KEY (`cp_id`),
  INDEX `cp_se_fk_idx` (`cp_se_id` ASC),
  CONSTRAINT `cp_se_fk`
    FOREIGN KEY (`cp_se_id`)
    REFERENCES `stock_market`.`sector` (`se_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `stock_market`.`stock_price`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `stock_market`.`stock_price` (
  `sp_id` INT NOT NULL AUTO_INCREMENT,
  `sp_code` BIGINT NOT NULL,
  `sp_stock_exchange` VARCHAR(30) NOT NULL,
  `sp_current_price` BIGINT NOT NULL,
  `sp_date` DATE NOT NULL,
  `sp_time` TIME(0) NOT NULL ,
   PRIMARY KEY (`sp_id`) )
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `stock_market`.`ipo`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `stock_market`.`ipo` (
  `ipo_id` INT NOT NULL AUTO_INCREMENT,
  `ipo_company_name` VARCHAR(30) NOT NULL,
  `ipo_stock_exchange` VARCHAR(30) NOT NULL,
  `ipo_share_price` BIGINT NOT NULL,
  `ipo_total_shares` INT NOT NULL,
  `ipo_date` DATETIME NOT NULL,
  `ipo_remarks` VARCHAR(400) NULL,
   PRIMARY KEY (`ipo_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `stock_market`.`sector`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `stock_market`.`sector` (
  `se_id` INT NOT NULL AUTO_INCREMENT,
  `se_sector_name` VARCHAR(30) NOT NULL,
  `se_brief` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`se_id`))
ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `stock_market`.`company`
-- -----------------------------------------------------

CREATE TABLE IF NOT EXISTS `stock_market`.`stock_exchange` (
  `ex_id` INT NOT NULL AUTO_INCREMENT,
  `ex_stock_exchange` VARCHAR(30) NOT NULL,
  `ex_brief` VARCHAR(400) NOT NULL,
  `ex_address` VARCHAR(200) NOT NULL,
  `ex_remarks` VARCHAR(500) NOT NULL,
  PRIMARY KEY (`ex_id`))
ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `stock_market`.`company_stock` (
	`cs_id` INT NOT NULL AUTO_INCREMENT,
	`cs_cp_id` INT NULL,
	`cs_ex_id` INT NULL,
	PRIMARY KEY (`cs_id`),
	INDEX `cs_cp_fk_idx` (`cs_cp_id` ASC),
	INDEX `cs_ex_fk_idx` (`cs_ex_id` ASC),
	CONSTRAINT `cs_cp_fk`
		FOREIGN KEY (`cs_cp_id`)
		REFERENCES `stock_market`.`company` (`cp_id`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION,
	CONSTRAINT `cs_ex_fk`
		FOREIGN KEY (`cs_ex_id`)
		REFERENCES `stock_market`.`stock_exchange` (`ex_id`)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION)
	ENGINE = InnoDB;

-- -----------------------------------------------------
-- Table `stock_market`.`board_members`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `stock_market`.`board_members` (
  `bm_id` INT NOT NULL AUTO_INCREMENT,
  `bm_cp_name` VARCHAR(30) NOT NULL,
  `bm_cp_id` INT NOT NULL,
  PRIMARY KEY (`bm_id`),
  INDEX `bm_cp_fk_idx` (`bm_cp_id` ASC),
   CONSTRAINT `bm_cp_fk`
    FOREIGN KEY (`bm_cp_id`)
    REFERENCES `stock_market`.`company` (`cp_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
  )
  
ENGINE = InnoDB;
    
INSERT INTO `stock_market`.`role` (`ro_id`, `ro_name`) VALUES ('1', 'admin');
INSERT INTO `stock_market`.`role` (`ro_id`, `ro_name`) VALUES ('2', 'user');

INSERT INTO `stock_market`.`user` (`us_id`, `us_user_name`, `us_password`, `us_email`, `us_mobile_number`, `us_confirmed`) VALUES ('1', 'a', '$2a$10$Fh4z/fhXrTEnP8z/chE3/.aVTYPMpCMX65Vc2m8t9rASdLEfGTaD2', 'a@gmail.com', '7894561230', '1');

INSERT INTO `stock_market`.`user_role` (`ur_id`, `ur_us_id`, `ur_ro_id`) VALUES ('1', '1', '1');

INSERT INTO `stock_market`.`sector` (`se_id`, `se_sector_name`, `se_brief`) VALUES ('1', 'Banking', 'Banking sector');
INSERT INTO `stock_market`.`sector` (`se_id`, `se_sector_name`, `se_brief`) VALUES ('2', 'Healthcare', 'Healthcare sector');
INSERT INTO `stock_market`.`sector` (`se_id`, `se_sector_name`, `se_brief`) VALUES ('3', 'Finance', 'Finance sector');
INSERT INTO `stock_market`.`company` (`cp_id`, `cp_code`, `cp_name`, `cp_turnover`, `cp_ceo`, `cp_listed`, `cp_se_id`, `cp_brief`) VALUES ('1', '500112', 'BOI', '54685', 'GURU', '1', '1', 'bank of India');
INSERT INTO `stock_market`.`stock_exchange` (`ex_id`, `ex_stock_exchange`, `ex_brief`, `ex_address`, `ex_remarks`) VALUES ('1', 'BSE', 'Bombay', 'kuruku theru', 'nil');
INSERT INTO `stock_market`.`stock_exchange` (`ex_id`, `ex_stock_exchange`, `ex_brief`, `ex_address`, `ex_remarks`) VALUES ('2', 'NSE', 'India', 'kuruku theru', 'nil');
INSERT INTO `stock_market`.`stock_exchange` (`ex_id`, `ex_stock_exchange`, `ex_brief`, `ex_address`, `ex_remarks`) VALUES ('3', 'CSE', 'Culcatta', 'kuruku theru', 'nil');
INSERT INTO `stock_market`.`company_stock` (`cs_id`, `cs_cp_id`, `cs_ex_id`) VALUES ('1', '1', '1');
INSERT INTO `stock_market`.`board_members` (`bm_id`, `bm_cp_name`, `bm_cp_id`) VALUES ('1', 'MACKINSON', '1');

INSERT INTO `stock_market`.`role` (`ro_id`, `ro_name`) VALUES ('1', 'ADMIN');
INSERT INTO `stock_market`.`role` (`ro_id`, `ro_name`) VALUES ('2', 'USER');
INSERT INTO `stock_market`.`board_members`(`bm_cp_name`,`bm_cp_id`) values("sam",1);
INSERT INTO `stock_market`.`board_members`(`bm_cp_name`,`bm_cp_id`) values("Elon",2);
INSERT INTO `stock_market`.`board_members`(`bm_cp_name`,`bm_cp_id`) values("Pichai",2);
INSERT INTO `stock_market`.`board_members`(`bm_cp_name`,`bm_cp_id`) values("Satya",3);
INSERT INTO `stock_market`.`board_members`(`bm_cp_name`,`bm_cp_id`) values("Premji",3);
INSERT INTO `stock_market`.`board_members`(`bm_cp_name`,`bm_cp_id`) values("Rick",4);
INSERT INTO `stock_market`.`board_members`(`bm_cp_name`,`bm_cp_id`) values("Morty",4);

INSERT INTO `stock_market`.`company` (`cp_id`, `cp_code`, `cp_name`, `cp_turnover`, `cp_ceo`, `cp_listed`, `cp_se_id`, `cp_brief`) VALUES ('2', '500113', 'SBI', '54688', 'Zain', '1', '1', 'statebank of India');
INSERT INTO `stock_market`.`company` (`cp_id`, `cp_code`, `cp_name`, `cp_turnover`, `cp_ceo`, `cp_listed`, `cp_se_id`, `cp_brief`) VALUES ('3', '500114', 'Google', '546899', 'Rohith', '1', '2', 'Search engine company');
INSERT INTO `stock_market`.`company` (`cp_id`, `cp_code`, `cp_name`, `cp_turnover`, `cp_ceo`, `cp_listed`, `cp_se_id`, `cp_brief`) VALUES ('4', '500115', 'Microsoft', '546898', 'Avinash', '0', '2', 'laptop company');
INSERT INTO `stock_market`.`company_stock` (`cs_id`, `cs_cp_id`, `cs_ex_id`) VALUES ('3', '2', '1');
INSERT INTO `stock_market`.`company_stock` (`cs_id`, `cs_cp_id`, `cs_ex_id`) VALUES ('4', '3', '3');
INSERT INTO `stock_market`.`company_stock` (`cs_id`, `cs_cp_id`, `cs_ex_id`) VALUES ('5', '4', '2');
INSERT INTO `stock_market`.`company_stock` (`cs_id`, `cs_cp_id`, `cs_ex_id`) VALUES ('6', '4', '1');


