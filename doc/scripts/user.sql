CREATE TABLE "public"."user"
(
    "id"        uuid NOT NULL DEFAULT gen_random_uuid(),
    "lastName"  text,
    "firstName" text,
    "email"     text NOT NULL,
    "role"      text,
    PRIMARY KEY ("id")
);