set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL,
	"hashedPassword" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT 'now()',
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."pets" (
	"petId" serial NOT NULL,
	"userId" int NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT 'now()',
	"petType" TEXT NOT NULL,
	"petName" TEXT NOT NULL,
	"weight" TEXT NOT NULL,
	"age" TEXT NOT NULL,
	"sex" TEXT NOT NULL,
	"breed" TEXT NOT NULL,
	"favoriteToy" TEXT NOT NULL,
	"spayedNeutered" TEXT NOT NULL,
	"friendlyWithChildren" TEXT NOT NULL,
	"friendlyWithAnimals" TEXT NOT NULL,
	"vetContact" TEXT NOT NULL,
	"foodType" TEXT NOT NULL,
	"foodSchedule" TEXT NOT NULL,
	"bathroomRoutine" TEXT NOT NULL,
	"additionalInformation" TEXT NOT NULL,
	CONSTRAINT "pets_pk" PRIMARY KEY ("petId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."sitters" (
	"profileId" serial NOT NULL,
	"userId" int NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"createdAt" timestamptz NOT NULL DEFAULT 'now()',
	"fullName" TEXT NOT NULL,
	"phoneNumber" TEXT NOT NULL,
	"streetAddress" TEXT NOT NULL,
	"city" TEXT NOT NULL,
	"zipCode" TEXT NOT NULL,
	"state" TEXT NOT NULL,
	"tagline" TEXT NOT NULL,
	"petSpecialty" TEXT NOT NULL,
	"service1" TEXT,
	"service2" TEXT,
	"service3" TEXT,
	"service4" TEXT,
	"aboutMe" TEXT NOT NULL,
	"service1Price" TEXT,
	"service2Price" TEXT,
	"service3Price" TEXT,
	"service4Price" TEXT,
	CONSTRAINT "sitters_pk" PRIMARY KEY ("profileId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."favorites" (
	"profileId" int NOT NULL,
	"userId" int NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"commentId" serial NOT NULL,
	"userId" int NOT NULL,
	"content" TEXT NOT NULL,
	"profileId" int NOT NULL,
	"createdAt" serial NOT NULL DEFAULT 'now()',
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."friends" (
	"userId" int NOT NULL,
	"profileId" int NOT NULL
) WITH (
  OIDS=FALSE
);




ALTER TABLE "pets" ADD CONSTRAINT "pets_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "sitters" ADD CONSTRAINT "sitters_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk0" FOREIGN KEY ("profileId") REFERENCES "sitters"("profileId");
ALTER TABLE "favorites" ADD CONSTRAINT "favorites_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("profileId") REFERENCES "sitters"("profileId");

ALTER TABLE "friends" ADD CONSTRAINT "friends_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");
ALTER TABLE "friends" ADD CONSTRAINT "friends_fk1" FOREIGN KEY ("profileId") REFERENCES "sitters"("profileId");
