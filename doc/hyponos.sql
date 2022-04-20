CREATE DATABASE "hyponos";

CREATE TABLE "user"
(
    "id"        uuid        NOT NULL DEFAULT gen_random_uuid(),
    "lastname"  text,
    "firstname" text,
    "email"     text UNIQUE NOT NULL,
    "role"      text,
    PRIMARY KEY ("id")
);

CREATE TABLE "userCredentials"
(
    "id"       uuid NOT NULL DEFAULT gen_random_uuid(),
    "password" text NOT NULL,
    "userid"   uuid NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE "hotel"
(
    "id"          uuid NOT NULL DEFAULT gen_random_uuid(),
    "name"        text NOT NULL,
    "mainpicture" text NOT NULL,
    "pictures"    text,
    "city"        text NOT NULL,
    "country"     text NOT NULL,
    "postcode"    text,
    "address"     text NOT NULL,
    "description" text,
    PRIMARY KEY ("id")
);

CREATE TABLE "room"
(
    "id"          uuid NOT NULL DEFAULT gen_random_uuid(),
    "title"       text NOT NULL,
    "mainpicture" text NOT NULL,
    "description" text,
    "price"       int4 NOT NULL,
    "nbrooms"     int4 NOT NULL,
    "pictures"    text,
    "hotelid"     text,
    PRIMARY KEY ("id")
);

CREATE TABLE "userHotel"
(
    "userid"  uuid NOT NULL,
    "hotelid" uuid NOT NULL,
    PRIMARY KEY ("userid", "hotelid")
);

CREATE TABLE "booking"
(
    "id"     uuid        NOT NULL DEFAULT gen_random_uuid(),
    "from"   timestamptz NOT NULL,
    "to"     timestamptz NOT NULL,
    "status" text,
    "roomid" text,
    "userid" text,
    PRIMARY KEY ("id")
);

INSERT INTO "hotel" ("id", "name", "mainpicture", "pictures", "city", "country", "postcode", "address", "description")
VALUES ('734ea83a-4135-44f8-9427-2df1b11c2a9f', 'Donec tellus lacus, interdum non', 'P11407292.jpg',
        '["P1140701.jpg","the-resort-6.jpg","the-resort-10.jpg"]', 'Arue', 'French Polynesia', '98702', 'Tetiaroa', 'Etiam diam dui, cursus feugiat egestas in, efficitur ac metus. Curabitur volutpat elit a accumsan pretium. Duis sed elementum lorem. Nunc ultricies dui sit amet rutrum ornare. Vivamus et eros metus. Aliquam maximus dolor sed massa vulputate, ut convallis erat semper. Aenean ac volutpat ante, sed feugiat ante. Aenean risus ex, ultricies quis lectus id, porttitor egestas ipsum. Sed lobortis molestie tellus, in pulvinar massa venenatis eleifend. Ut nec finibus elit, nec tincidunt purus. Integer id enim massa. Etiam velit velit, lobortis vel lectus nec, aliquam placerat nisi.
Suspendisse fermentum nisl eget ligula placerat volutpat. Mauris sagittis est dui, laoreet consectetur ligula vulputate ut. Curabitur rutrum cursus maximus. Morbi a ligula et nisl imperdiet volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed lacinia non nisi nec pharetra. Suspendisse potenti. Maecenas laoreet elementum massa id porttitor. Praesent blandit quis massa quis semper.'),
       ('9de1f6cd-2f30-43d4-a199-50792ad9882b', 'Nullam eget bibendum ipsum',
        'Zannier-Desktop_0002_Zannier-Hotels-Sonop-Exterior-15-©-Zannier-Hotels-2.jpg',
        '["1000x600_0001_Zannier-Hotels-Sonop-Bedroom-1-@tibodhermy-for-Zannier-Hotels.jpg","Zannier_Website_2200x1200_0001_Zannier-Hotels-Sonop-Pool-Area-5-©-Zannier-Hotels-Oyen-Rodriguez.jpg","Zannier_Website_2200x1200_0000_Zannier-Hotels-Sonop-Sossusvlei-6-©-Zannier-Hotels.jpg"]',
        'Karas Region', 'Namibia', NULL, 'Sonop Farm, Road D707', 'Etiam diam dui, cursus feugiat egestas in, efficitur ac metus. Curabitur volutpat elit a accumsan pretium. Duis sed elementum lorem. Nunc ultricies dui sit amet rutrum ornare. Vivamus et eros metus. Aliquam maximus dolor sed massa vulputate, ut convallis erat semper. Aenean ac volutpat ante, sed feugiat ante. Aenean risus ex, ultricies quis lectus id, porttitor egestas ipsum. Sed lobortis molestie tellus, in pulvinar massa venenatis eleifend. Ut nec finibus elit, nec tincidunt purus. Integer id enim massa. Etiam velit velit, lobortis vel lectus nec, aliquam placerat nisi.
Suspendisse fermentum nisl eget ligula placerat volutpat. Mauris sagittis est dui, laoreet consectetur ligula vulputate ut. Curabitur rutrum cursus maximus. Morbi a ligula et nisl imperdiet volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed lacinia non nisi nec pharetra. Suspendisse potenti. Maecenas laoreet elementum massa id porttitor. Praesent blandit quis massa quis semper.'),
       ('a81858f2-65c0-4b99-a7f1-6dbcaf7de3ca', 'Lorem ipsum dolor sit amet', 'Aman-Venice_Gallery_1.jpg',
        '["Aman_Venice_Terrace_Arva.jpg","Aman-Venice_Homepage_1.jpg"]', 'Venezia', 'Italy', '30125',
        'Palazzo Papadopoli, Calle Tiepolo, 1364', 'Etiam diam dui, cursus feugiat egestas in, efficitur ac metus. Curabitur volutpat elit a accumsan pretium. Duis sed elementum lorem. Nunc ultricies dui sit amet rutrum ornare. Vivamus et eros metus. Aliquam maximus dolor sed massa vulputate, ut convallis erat semper. Aenean ac volutpat ante, sed feugiat ante. Aenean risus ex, ultricies quis lectus id, porttitor egestas ipsum. Sed lobortis molestie tellus, in pulvinar massa venenatis eleifend. Ut nec finibus elit, nec tincidunt purus. Integer id enim massa. Etiam velit velit, lobortis vel lectus nec, aliquam placerat nisi.
Suspendisse fermentum nisl eget ligula placerat volutpat. Mauris sagittis est dui, laoreet consectetur ligula vulputate ut. Curabitur rutrum cursus maximus. Morbi a ligula et nisl imperdiet volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed lacinia non nisi nec pharetra. Suspendisse potenti. Maecenas laoreet elementum massa id porttitor. Praesent blandit quis massa quis semper.'),
       ('b5eac088-e8d2-4e63-b64f-10eed96064b0', 'Integer sit amet efficitur ante',
        '17261_Soneva-Jani-Chapter-Two-Aerial.jpg',
        '["18074_Soneva-Jani-Weddings.jpg","17205_Soneva-Jani-2-Bedroom-Water-Reserve.jpg","23485_Soneva-Jani-Island-Spa.jpg"]',
        'Medhufaru', 'Maldives', NULL, 'Medhufaru Island Noonu Atoll', 'Etiam diam dui, cursus feugiat egestas in, efficitur ac metus. Curabitur volutpat elit a accumsan pretium. Duis sed elementum lorem. Nunc ultricies dui sit amet rutrum ornare. Vivamus et eros metus. Aliquam maximus dolor sed massa vulputate, ut convallis erat semper. Aenean ac volutpat ante, sed feugiat ante. Aenean risus ex, ultricies quis lectus id, porttitor egestas ipsum. Sed lobortis molestie tellus, in pulvinar massa venenatis eleifend. Ut nec finibus elit, nec tincidunt purus. Integer id enim massa. Etiam velit velit, lobortis vel lectus nec, aliquam placerat nisi.
Suspendisse fermentum nisl eget ligula placerat volutpat. Mauris sagittis est dui, laoreet consectetur ligula vulputate ut. Curabitur rutrum cursus maximus. Morbi a ligula et nisl imperdiet volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed lacinia non nisi nec pharetra. Suspendisse potenti. Maecenas laoreet elementum massa id porttitor. Praesent blandit quis massa quis semper.'),
       ('b6ec07e4-60cb-42b5-a742-01236aab8ca4', 'Donec dolor neque, faucibus non', 'JadeMountain-SaintLucia2.jpg',
        '["JadeMountain-SaintLucia3.jpg","JadeMountain-SaintLucia20.jpg","JadeMountain-SaintLucia14.jpg"]', 'Mamin',
        'St. Lucia', NULL, 'VW7F+RPH', 'Etiam diam dui, cursus feugiat egestas in, efficitur ac metus. Curabitur volutpat elit a accumsan pretium. Duis sed elementum lorem. Nunc ultricies dui sit amet rutrum ornare. Vivamus et eros metus. Aliquam maximus dolor sed massa vulputate, ut convallis erat semper. Aenean ac volutpat ante, sed feugiat ante. Aenean risus ex, ultricies quis lectus id, porttitor egestas ipsum. Sed lobortis molestie tellus, in pulvinar massa venenatis eleifend. Ut nec finibus elit, nec tincidunt purus. Integer id enim massa. Etiam velit velit, lobortis vel lectus nec, aliquam placerat nisi.
Suspendisse fermentum nisl eget ligula placerat volutpat. Mauris sagittis est dui, laoreet consectetur ligula vulputate ut. Curabitur rutrum cursus maximus. Morbi a ligula et nisl imperdiet volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed lacinia non nisi nec pharetra. Suspendisse potenti. Maecenas laoreet elementum massa id porttitor. Praesent blandit quis massa quis semper.'),
       ('ca03f9d0-97e5-417e-a846-20dff1dad161', 'Nullam blandit ligula vitae molestie', 'katikies-hotel.jpg',
        '["katikies-hotel-santorini_28841_2021.jpg","katikies-hotel-santorini_q1a3377.jpg","katikies-hotel-santorini_2.jpg"]',
        'Oía', 'Greece', '84702', 'Oia (Ia), Santorini', 'Etiam diam dui, cursus feugiat egestas in, efficitur ac metus. Curabitur volutpat elit a accumsan pretium. Duis sed elementum lorem. Nunc ultricies dui sit amet rutrum ornare. Vivamus et eros metus. Aliquam maximus dolor sed massa vulputate, ut convallis erat semper. Aenean ac volutpat ante, sed feugiat ante. Aenean risus ex, ultricies quis lectus id, porttitor egestas ipsum. Sed lobortis molestie tellus, in pulvinar massa venenatis eleifend. Ut nec finibus elit, nec tincidunt purus. Integer id enim massa. Etiam velit velit, lobortis vel lectus nec, aliquam placerat nisi.
Suspendisse fermentum nisl eget ligula placerat volutpat. Mauris sagittis est dui, laoreet consectetur ligula vulputate ut. Curabitur rutrum cursus maximus. Morbi a ligula et nisl imperdiet volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed lacinia non nisi nec pharetra. Suspendisse potenti. Maecenas laoreet elementum massa id porttitor. Praesent blandit quis massa quis semper.'),
       ('db6e3a58-ba98-4554-a956-cb94855ae984', 'Duis malesuada aliquam dolor', 'DSC8856-e1490192428397-1072x1000.jpg',
        '["IMG_1940-Amiez-1200x800.jpg","ts-deluxe-superior-bedroom-1-2000x1200.jpg","ts-rooms-deluxe-superior-suite-bedroom.jpg"]',
        'Cape Town', 'South Africa', '8001', 'Silo Square, Victoria & Alfred Waterfront', 'Etiam diam dui, cursus feugiat egestas in, efficitur ac metus. Curabitur volutpat elit a accumsan pretium. Duis sed elementum lorem. Nunc ultricies dui sit amet rutrum ornare. Vivamus et eros metus. Aliquam maximus dolor sed massa vulputate, ut convallis erat semper. Aenean ac volutpat ante, sed feugiat ante. Aenean risus ex, ultricies quis lectus id, porttitor egestas ipsum. Sed lobortis molestie tellus, in pulvinar massa venenatis eleifend. Ut nec finibus elit, nec tincidunt purus. Integer id enim massa. Etiam velit velit, lobortis vel lectus nec, aliquam placerat nisi.
Suspendisse fermentum nisl eget ligula placerat volutpat. Mauris sagittis est dui, laoreet consectetur ligula vulputate ut. Curabitur rutrum cursus maximus. Morbi a ligula et nisl imperdiet volutpat. Interdum et malesuada fames ac ante ipsum primis in faucibus. Sed lacinia non nisi nec pharetra. Suspendisse potenti. Maecenas laoreet elementum massa id porttitor. Praesent blandit quis massa quis semper.');

INSERT INTO "room" ("id", "title", "mainpicture", "description", "price", "nbrooms", "pictures", "hotelid")
VALUES ('0ae67fbf-6ff6-4117-9314-a6abc20faf56', 'Morbi eleifend massa', 'Exterior-04-1-1640x830.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        17000, 1, '["Front-Exterior-1640x830.jpg","Deck-Detail-1640x830.jpg"]', '734ea83a-4135-44f8-9427-2df1b11c2a9f'),
       ('0b627f93-252d-4194-8e24-e68b17e45014', 'Duis a turpis',
        'Aman-Venice_-Italy-Accomodation_-The-Coccina-Apartment_Chapel-Suite.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        6750, 2,
        '["Aman-Venice_-Italy-Accomodation_-The-Papadopoli-Stanza-Grande-Canal_-Bedroom.jpg","Aman-Venice_-Italy-Accomodation_-The-Papadopoli-Stanza-Grande-Canal_-Bedroom.jpg"]',
        'a81858f2-65c0-4b99-a7f1-6dbcaf7de3ca'),
       ('1c9279af-ebfc-4a06-bc81-fe5c72a0c13c', 'Nunc sed elementum', 'sun_1_enhanced.jpeg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        2560, 5, '["sun_4_enhanced.jpg","sun_2_enhanced.jpg"]', 'b6ec07e4-60cb-42b5-a742-01236aab8ca4'),
       ('42bd2b9d-c416-496b-becb-2fbc79df6051', 'Maecenas eros elit',
        '4190_soneva_jani_resort_-_1_bedroom_water_retreat20200219065325583.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        2880, 1,
        '["4220_soneva_jani_resort_-_1_bedroom_water_retreat20200219065445226.jpg","4215_soneva_jani_resort_-_1_bedroom_water_retreat20200219065413712.jpg","4218_soneva_jani_resort_-_1_bedroom_water_retreat_(1)20200219065444555.jpg"]',
        'b5eac088-e8d2-4e63-b64f-10eed96064b0'),
       ('45d122e1-087d-4f78-a616-4afc18dd0947', 'Quisque id lacinia',
        'Zannier-Hotels-Sonop-Bedroom-1-@tibodhermy-for-Zannier-Hotels-scaled.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        1468, 8,
        '["Sonop-Bedroom-5-©-Tibo-for-Zannier-Hotels-@tibodhermy.jpg","Sonop-Bathroom-1-©-Zannier-Hotels.jpg"]',
        '9de1f6cd-2f30-43d4-a199-50792ad9882b'),
       ('4a7d3550-1e70-493f-8637-6e2d451970c3', 'Nam auctor sed', 'BRANDO_1BR-Living-5.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        3700, 10, '["one-bedroom-villas-2.jpg","one-bedroom-villas-740x480.jpg"]',
        '734ea83a-4135-44f8-9427-2df1b11c2a9f'),
       ('68bac839-db28-4321-982e-4424359a6cd1', 'Vivamus in feugiat', 'ts-superior-suite-dining-2000x1200.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        1610, 2, '["ts-rooms-superior-suite-bathroom-2000x1200.jpg","ts-rooms-superior-suite-bedroom-2000x1200.jpg"]',
        'db6e3a58-ba98-4554-a956-cb94855ae984'),
       ('7bc2e328-ef54-4540-8f52-d9ae15ce3d10', 'Nullam sagittis mattis',
        'katikies-hotel-santorini-honeymoon-suite-hnm_3.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        1940, 3,
        '["katikies-hotel-santorini-honeymoon-suite-hnm_1.jpg","katikies-hotel-santorini-honeymoon-suite_-2-_2021.jpg"]',
        'ca03f9d0-97e5-417e-a846-20dff1dad161'),
       ('8b4254d9-dd89-4fe6-97cd-9400f37ffc59', 'Sed accumsan ligula', '72980605_XL.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        4700, 5, '["72980609_XL.jpg","72980607_XL.jpg"]', 'a81858f2-65c0-4b99-a7f1-6dbcaf7de3ca'),
       ('97226159-82ec-4a89-8d05-5550caafb599', 'Pellentesque sit amet', 'Sonop-Bedroom-3-©-Zannier-Hotels.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        699, 10,
        '["Zannier-Hotels-Sonop-Bathroom-3-@tibodhermy-for-Zannier-Hotels-scaled.jpg","Zannier-Mobile-Hero_0004_Zannier-Hotels-Sonop-Exterior-15-©-Zannier-Hotels-2.jpg"]',
        '9de1f6cd-2f30-43d4-a199-50792ad9882b'),
       ('b23e2a56-5d6b-4197-8fd0-076db5afe883', 'Phasellus vulputate vehicula',
        'ts-rooms-silo-room-bathroom-view-2000x1200.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        1277, 4, '["ts-rooms-silo-room-bedroom-2000x1200.jpg","ts-rooms-silo-room-bathroom-2000x1200.jpg"]',
        'db6e3a58-ba98-4554-a956-cb94855ae984'),
       ('dd12fa08-6a58-4336-8de9-914b7cf6fbaf', 'Etiam lobortis nibh', 'katikies-hotel-santorini-double-room-dbl.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        1145, 8, '["katikies-hotel-santorini-double-room-dbl_2.jpg","katikies-hotel-santorini-double-room-dbl_1.jpg"]',
        'ca03f9d0-97e5-417e-a846-20dff1dad161'),
       ('e94586f8-39f0-4845-a16e-b16954f7b9b8', 'Donec congue dictum',
        'hero_sonevajani1brwaterreserve_bysandrobruecklmeier.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        6130, 3,
        '["17203_soneva_jani_-_1_bedroom_water_reserve.jpg","sonevajani1brwaterreservemasterbedroom_bysandrobruecklmeier.jpg","sonevajani1brwaterreservemasterbedroominteriors_bysandrobruecklmeier.jpg"]',
        'b5eac088-e8d2-4e63-b64f-10eed96064b0'),
       ('f1ba6f8f-9858-40ef-8a0b-edeb0e7c4fa3', 'Phasellus mollis efficitur', 'sky_enhanced.jpg',
        'Duis vestibulum commodo neque tempor ultrices. Suspendisse scelerisque justo lectus. Nulla a purus ex. Pellentesque sed risus erat. Sed volutpat imperdiet ornare. Nam at viverra nibh. Donec a metus vitae massa porta aliquet. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Maecenas ultricies lacus vitae cursus posuere.',
        1285, 3, '["449928_ImageGalleryLightboxLarge.jpg","springsale.jpg"]', 'b6ec07e4-60cb-42b5-a742-01236aab8ca4');

INSERT INTO "user" ("id", "lastname", "firstname", "email", "role")
VALUES ('0985ef0e-9cbf-477f-afd3-a384c83a4863', 'Hubert', 'Lucas', 'hubertlucas41@gmail.com', 'admin'),
       ('dc77a333-20f0-461a-9306-2c7976a95b20', NULL, NULL, 'hello@manager.fr', 'manager'),
       ('f804f0fe-bf5f-49ba-9832-e674e58a16c1', NULL, NULL, 'hello@studi.fr', 'admin');

INSERT INTO "userCredentials" ("id", "password", "userid")
VALUES ('751d7b26-6a97-42c6-9279-a0d6ab3a9ace', '$2a$10$DJ4sWBHG0gDaPSvOD.JaK.lsl/fS0OCS53cWxJvFal11FTVf8oIo6',
        'dc77a333-20f0-461a-9306-2c7976a95b20'),
       ('885c5fe8-7172-4372-80b5-e919d1f33895', '$2a$10$QEs8qdu6D6m57xTR6CkNIOa.TAUt5Gr0jJBDyG6BtuWvn.D5/p6Ju',
        '0985ef0e-9cbf-477f-afd3-a384c83a4863'),
       ('ef727ae0-e1ac-4f35-8325-6e8a24aab92f', '$2a$10$cFcqv01FP9Sm/cwbV698RuRhHwus6GqwgIAX7STxMj1LNewIaz.RK',
        'f804f0fe-bf5f-49ba-9832-e674e58a16c1');