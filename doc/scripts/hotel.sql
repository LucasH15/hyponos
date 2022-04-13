CREATE TABLE "public"."hotel"
(
    "id"          uuid NOT NULL DEFAULT gen_random_uuid(),
    "name"        text NOT NULL,
    "city"        text NOT NULL,
    "country"     text NOT NULL,
    "postcode"    text NOT NULL,
    "address"     text NOT NULL,
    "description" text,
    PRIMARY KEY ("id")
);