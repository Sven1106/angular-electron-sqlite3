BEGIN TRANSACTION;
CREATE TABLE IF NOT EXISTS "PalletEntry" (
	"Id"	integer NOT NULL,
	"PalletId"	integer NOT NULL,
	"ColorId"	integer,
	"Quantity"	integer,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Color" (
	"Id"	integer NOT NULL,
	"Name"	text,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Pallet" (
	"Id"	integer NOT NULL,
	"PalletNumber"	integer,
	"ManufacturerId"	integer NOT NULL,
	"WholesalerId"	integer NOT NULL,
	"IsShipped"	integer DEFAULT 0,
	"LoadingDate"	datetime,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Manufacturer" (
	"Id"	integer NOT NULL,
	"Name"	text,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Wholesaler" (
	"Id"	integer NOT NULL,
	"Name"	text,
	PRIMARY KEY("Id")
);
CREATE TABLE IF NOT EXISTS "Company" (
	"Id"	integer NOT NULL,
	"Name"	text,
	"Phone" text,
	"Logo"  text,
	PRIMARY KEY("Id")
);
COMMIT;

