CREATE TABLE "tb_users" (
"id" serial8 NOT NULL,
"phone" varchar(16),
"email" varchar(255),
"password" varchar(40),
"firstName" varchar(20),
"lastName" varchar(20),
"middleName" varchar(20),
"verificationCode" varchar(20),
"isblocked" bool,
"createdAt" date,
"updatedAt" date,
PRIMARY KEY ("id") 
);

CREATE TABLE "tb_coversations" (
"id" serial8 NOT NULL,
"tittle" varchar(40),
"idUser" serial8,
"createdAt" date,
"updatedAt" date,
PRIMARY KEY ("id") 
);

CREATE TABLE "tb_messagers" (
"id" serial8 NOT NULL,
"idConversation" serial8,
"idParticipants" serial8,
"messageType" varchar(255),
"message" varchar(255),
"attactment" varchar(255),
"createdAt" date,
"updatedAt" date,
PRIMARY KEY ("id") 
);

CREATE TABLE "tb_user_messagers" (
"id" serial8,
"idMessager" serial8,
"createdAt" date,
"updatedAt" date
);

CREATE TABLE "tb_posts" (
"id" serial8 NOT NULL,
"tittle" varchar(40),
"description" varchar(255),
"idUser" serial8,
"createdAt" date,
"updatedAt" date,
PRIMARY KEY ("id") 
);

CREATE TABLE "tb_trips" (
"id" serial8 NOT NULL,
"tittle" varchar(40),
"description" varchar(255),
"creatorId" serial8,
"createdAt" date,
"updatedAt" date,
PRIMARY KEY ("id") 
);

CREATE TABLE "member_trips" (
"id" serial8,
"idTrip" serial8,
"status" int2,
"createdAt" date,
"updatedAt" date
);

CREATE TABLE "tb_stops" (
"id" serial8 NOT NULL,
"locationId" serial8,
"arrive" varchar(255),
"description" text,
"idTrip" serial8,
"idPlaces" serial8,
"createdAt" date,
"updatedAt" date,
PRIMARY KEY ("id") 
);

CREATE TABLE "tb_places" (
"id" serial8 NOT NULL,
"name" varchar(255),
"description" text,
"idLocation" serial8,
"createdAt" date,
"updatedAt" date,
PRIMARY KEY ("id") 
);

CREATE TABLE "tb_locations" (
"id" serial8 NOT NULL,
"lat" float8,
"long" float8,
"createdAt" date,
"updatedAt" date,
PRIMARY KEY ("id") 
);

CREATE TABLE "tb_fees" (
"id" serial8 NOT NULL,
"name" varchar,
"price" decimal,
"quantity" int4,
"idStop" serial8,
"createdAt" date,
"updatedAt" date,
PRIMARY KEY ("id") 
);


ALTER TABLE "tb_coversations" ADD CONSTRAINT "conversation_user1" FOREIGN KEY ("idUser") REFERENCES "tb_users" ("id");
ALTER TABLE "tb_messagers" ADD CONSTRAINT "conversation_mess1" FOREIGN KEY ("idConversation") REFERENCES "tb_coversations" ("id");
ALTER TABLE "tb_user_messagers" ADD CONSTRAINT "user_mess3" FOREIGN KEY ("id") REFERENCES "tb_users" ("id");
ALTER TABLE "tb_user_messagers" ADD CONSTRAINT "user_mess4" FOREIGN KEY ("idMessager") REFERENCES "tb_messagers" ("id");
ALTER TABLE "tb_posts" ADD CONSTRAINT "post_user" FOREIGN KEY ("idUser") REFERENCES "tb_users" ("id");
ALTER TABLE "tb_trips" ADD CONSTRAINT "trip_user" FOREIGN KEY ("creatorId") REFERENCES "tb_users" ("id");
ALTER TABLE "member_trips" ADD CONSTRAINT "member_trip1" FOREIGN KEY ("id") REFERENCES "tb_users" ("id");
ALTER TABLE "member_trips" ADD CONSTRAINT "member_trip2" FOREIGN KEY ("idTrip") REFERENCES "tb_trips" ("id");
ALTER TABLE "tb_stops" ADD CONSTRAINT "trip_stop1" FOREIGN KEY ("id") REFERENCES "tb_trips" ("id");
ALTER TABLE "tb_stops" ADD CONSTRAINT "trip_location1" FOREIGN KEY ("idTrip") REFERENCES "tb_locations" ("id");
ALTER TABLE "tb_places" ADD CONSTRAINT "places_location" FOREIGN KEY ("idLocation") REFERENCES "tb_locations" ("id");
ALTER TABLE "tb_stops" ADD CONSTRAINT "stop_places1" FOREIGN KEY ("idPlaces") REFERENCES "tb_places" ("id");
ALTER TABLE "tb_fees" ADD CONSTRAINT "stop_fee" FOREIGN KEY ("idStop") REFERENCES "tb_stops" ("id");

