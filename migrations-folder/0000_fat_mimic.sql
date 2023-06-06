CREATE TABLE IF NOT EXISTS "users" (
	"user_id" varchar PRIMARY KEY NOT NULL,
	"login" varchar(32) NOT NULL,
	"password" varchar(32) NOT NULL,
	"role" varchar(16) NOT NULL,
	"boss_id" varchar
);
