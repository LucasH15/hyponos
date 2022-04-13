CREATE TABLE "public"."user"
(
    "id"        uuid NOT NULL DEFAULT gen_random_uuid(),
    "lastname"  text,
    "firstname" text,
    "email"     text NOT NULL,
    "role"      text,
    PRIMARY KEY ("id")
);