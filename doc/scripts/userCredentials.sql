CREATE TABLE "public"."userCredentials"
(
    "id"       uuid NOT NULL DEFAULT gen_random_uuid(),
    "password" text NOT NULL,
    "userid"   uuid NOT NULL,
    PRIMARY KEY ("id")
);