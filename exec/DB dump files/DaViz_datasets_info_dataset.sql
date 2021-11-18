-- MySQL dump 10.13  Distrib 8.0.26, for Win64 (x86_64)
--
-- Host: bee.cjkrtt0iwcwz.ap-northeast-2.rds.amazonaws.com    Database: DaViz
-- ------------------------------------------------------
-- Server version	8.0.23

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- GTID state at the beginning of the backup 
--

SET @@GLOBAL.GTID_PURGED=/*!80000 '+'*/ '';

--
-- Table structure for table `datasets_info_dataset`
--

DROP TABLE IF EXISTS `datasets_info_dataset`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `datasets_info_dataset` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `title` varchar(50) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
  `created_at` datetime(6) NOT NULL,
  `file` varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL,
  `columns` longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  `row_cnt` int NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `datasets_info_dataset`
--

LOCK TABLES `datasets_info_dataset` WRITE;
/*!40000 ALTER TABLE `datasets_info_dataset` DISABLE KEYS */;
INSERT INTO `datasets_info_dataset` VALUES (1,'COVID-19','covid-19 trial dataset','2021-11-18 04:57:48.587424','COVID-19_trial_semantic_tags_data.csv','nct_id|entity_source_text|concept_id|concept_name|domain|start_index|end_index|temporal_source_text|days|numeric_source_text|numeric_att_min|numeric_att_max|is_exclusion|',10223),(2,'medium','medium size dataset','2021-11-18 04:58:19.310935','medium.csv','id|member_id|loan_amnt|funded_amnt|funded_amnt_inv|term|int_rate|installment|grade|sub_grade|emp_title|emp_length|home_ownership|annual_inc|verification_status|issue_d|loan_status|pymnt_plan|url|desc|purpose|title|zip_code|addr_state|dti|delinq_2yrs|earliest_cr_line|inq_last_6mths|mths_since_last_delinq|mths_since_last_record|open_acc|pub_rec|revol_bal|revol_util|total_acc|initial_list_status|out_prncp|out_prncp_inv|total_pymnt|total_pymnt_inv|total_rec_prncp|total_rec_int|total_rec_late_fee|recoveries|collection_recovery_fee|last_pymnt_d|last_pymnt_amnt|next_pymnt_d|last_credit_pull_d|collections_12_mths_ex_med|mths_since_last_major_derog|policy_code|application_type|annual_inc_joint|dti_joint|verification_status_joint|acc_now_delinq|tot_coll_amt|tot_cur_bal|open_acc_6m|open_act_il|open_il_12m|open_il_24m|mths_since_rcnt_il|total_bal_il|il_util|open_rv_12m|open_rv_24m|max_bal_bc|all_util|total_rev_hi_lim|inq_fi|total_cu_tl|inq_last_12m|acc_open_past_24mths|avg_cur_bal|bc_open_to_buy|bc_util|chargeoff_within_12_mths|delinq_amnt|mo_sin_old_il_acct|mo_sin_old_rev_tl_op|mo_sin_rcnt_rev_tl_op|mo_sin_rcnt_tl|mort_acc|mths_since_recent_bc|mths_since_recent_bc_dlq|mths_since_recent_inq|mths_since_recent_revol_delinq|num_accts_ever_120_pd|num_actv_bc_tl|num_actv_rev_tl|num_bc_sats|num_bc_tl|num_il_tl|num_op_rev_tl|num_rev_accts|num_rev_tl_bal_gt_0|num_sats|num_tl_120dpd_2m|num_tl_30dpd|num_tl_90g_dpd_24m|num_tl_op_past_12m|pct_tl_nvr_dlq|percent_bc_gt_75|pub_rec_bankruptcies|tax_liens|tot_hi_cred_lim|total_bal_ex_mort|total_bc_limit|total_il_high_credit_limit|revol_bal_joint|sec_app_earliest_cr_line|sec_app_inq_last_6mths|sec_app_mort_acc|sec_app_open_acc|sec_app_revol_util|sec_app_open_act_il|sec_app_num_rev_accts|sec_app_chargeoff_within_12_mths|sec_app_collections_12_mths_ex_med|sec_app_mths_since_last_major_derog|hardship_flag|hardship_type|hardship_reason|hardship_status|deferral_term|hardship_amount|hardship_start_date|hardship_end_date|payment_plan_start_date|hardship_length|hardship_dpd|hardship_loan_status|orig_projected_additional_accrued_interest|hardship_payoff_balance_amount|hardship_last_payment_amount|disbursement_method|debt_settlement_flag|debt_settlement_flag_date|settlement_status|settlement_date|settlement_amount|settlement_percentage|settlement_term|',200000),(3,'NBA','NBA all star games dataset','2021-11-18 05:01:44.864795','nbaallstargames.csv','Player|Year|Team|Role|MVP|Team.1|',1715),(4,'Chess','chess games dataset','2021-11-18 05:02:10.737135','games.csv','id|rated|created_at|last_move_at|turns|victory_status|winner|increment_code|white_id|white_rating|black_id|black_rating|moves|opening_eco|opening_name|opening_ply|',20058),(5,'Heart','heart failure prediction dataset','2021-11-18 05:03:05.722252','heart.csv','Age|Sex|ChestPainType|RestingBP|Cholesterol|FastingBS|RestingECG|MaxHR|ExerciseAngina|Oldpeak|ST_Slope|HeartDisease|',918);
/*!40000 ALTER TABLE `datasets_info_dataset` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-11-18 14:58:10
