CREATE TABLE "public"."room"
(
    "id"          uuid NOT NULL DEFAULT gen_random_uuid(),
    "title"       text NOT NULL,
    "mainpicture" text NOT NULL,
    "description" text,
    "price"       int4 NOT NULL,
    "pictures"    text,
    "hotelid"     text,
    PRIMARY KEY ("id")
);