INSERT INTO
    `movies_movie` (
        `title`,
        `description`,
        `image_url`,
        `trailer_url`,
        `category`,
        `status`,
        `release_at`,
        `start_to_end_time`,
        `ott_release_at`,
        `created_at`,
        `updated_at`
    )
VALUES
    (
        'Mission: Impossible',
        'Ethan Hunt is tasked with stopping a mole in the IMF.',
        'https://image.url/mi1.jpg',
        'https://trailer.url/mi1',
        'Action',
        'Released',
        '1996-05-22',
        '01:50:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'Mission: Impossible 2',
        'Ethan Hunt battles a rogue agent with a deadly virus.',
        'https://image.url/mi2.jpg',
        'https://trailer.url/mi2',
        'Action',
        'Released',
        '2000-05-24',
        '02:03:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'Mission: Impossible 3',
        'Ethan Hunt faces an arms dealer who threatens his fiancée.',
        'https://image.url/mi3.jpg',
        'https://trailer.url/mi3',
        'Action',
        'Released',
        '2006-05-05',
        '02:06:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'Mission: Impossible – Ghost Protocol',
        'Ethan and his team go rogue to clear their names.',
        'https://image.url/mi4.jpg',
        'https://trailer.url/mi4',
        'Action',
        'Released',
        '2011-12-16',
        '02:13:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'Mission: Impossible – Rogue Nation',
        'The IMF takes on the Syndicate, a secret terrorist group.',
        'https://image.url/mi5.jpg',
        'https://trailer.url/mi5',
        'Action',
        'Released',
        '2015-07-31',
        '02:11:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'Mission: Impossible – Fallout',
        'Ethan Hunt races to prevent a nuclear catastrophe.',
        'https://image.url/mi6.jpg',
        'https://trailer.url/mi6',
        'Action',
        'Released',
        '2018-07-27',
        '02:27:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'Mission: Impossible – Dead Reckoning Part One',
        'Ethan Hunt faces a powerful AI-driven enemy.',
        'https://image.url/mi7.jpg',
        'https://trailer.url/mi7',
        'Action',
        'Released',
        '2023-07-12',
        '02:43:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'Top Gun: Maverick',
        'After 30 years, Maverick returns to train elite pilots.',
        'https://image.url/tgm.jpg',
        'https://trailer.url/tgm',
        'Action',
        'Released',
        '2022-05-27',
        '02:11:00',
        '2022-12-22 00:00:00',
        NOW(),
        NOW()
    ),
    (
        'Jerry Maguire',
        'A sports agent experiences a crisis of conscience.',
        'https://image.url/jm.jpg',
        'https://trailer.url/jm',
        'Drama',
        'Released',
        '1996-12-13',
        '02:18:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'Rain Man',
        'A self-centered man discovers his autistic savant brother.',
        'https://image.url/rm.jpg',
        'https://trailer.url/rm',
        'Drama',
        'Released',
        '1988-12-16',
        '02:13:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'Edge of Tomorrow',
        'A soldier relives the same battle against aliens.',
        'https://image.url/eot.jpg',
        'https://trailer.url/eot',
        'Sci-Fi',
        'Released',
        '2014-06-06',
        '01:53:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'The Last Samurai',
        'An American soldier adopts the way of the samurai.',
        'https://image.url/tls.jpg',
        'https://trailer.url/tls',
        'Drama',
        'Released',
        '2003-12-05',
        '02:34:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        'Collateral',
        'A hitman forces a cab driver to drive him through LA.',
        'https://image.url/cl.jpg',
        'https://trailer.url/cl',
        'Thriller',
        'Released',
        '2004-08-06',
        '02:00:00',
        NULL,
        NOW(),
        NOW()
    );

INSERT INTO
    `movies_movie` (
        `id`,
        `title`,
        `description`,
        `image_url`,
        `trailer_url`,
        `category`,
        `status`,
        `release_at`,
        `start_to_end_time`,
        `ott_release_at`,
        `created_at`,
        `updated_at`
    )
VALUES
    (
        1,
        'The Fast and the Furious',
        'An undercover cop infiltrates the world of street racing.',
        'https://example.com/image1.jpg',
        'https://youtu.be/trailer1',
        'Action',
        'Released',
        '2001-06-22',
        '01:46:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        2,
        '2 Fast 2 Furious',
        'Brian O’Conner teams up with Roman Pearce to take down a drug lord.',
        'https://example.com/image2.jpg',
        'https://youtu.be/trailer2',
        'Action',
        'Released',
        '2003-06-06',
        '01:47:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        3,
        'The Fast and the Furious: Tokyo Drift',
        'A street racer moves to Tokyo and gets involved in drift racing.',
        'https://example.com/image3.jpg',
        'https://youtu.be/trailer3',
        'Action',
        'Released',
        '2006-06-16',
        '01:44:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        4,
        'Fast & Furious',
        'Dominic Toretto and Brian O’Conner reunite to bring down a heroin importer.',
        'https://example.com/image4.jpg',
        'https://youtu.be/trailer4',
        'Action',
        'Released',
        '2009-04-03',
        '01:47:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        5,
        'Fast Five',
        'The team assembles in Brazil for a final heist while being hunted by a federal agent.',
        'https://example.com/image5.jpg',
        'https://youtu.be/trailer5',
        'Action',
        'Released',
        '2011-04-29',
        '02:10:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        6,
        'Fast & Furious 6',
        'The team is offered amnesty in exchange for taking down a criminal organization.',
        'https://example.com/image6.jpg',
        'https://youtu.be/trailer6',
        'Action',
        'Released',
        '2013-05-24',
        '02:10:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        7,
        'Furious 7',
        'The crew faces a new enemy seeking revenge for his brother.',
        'https://example.com/image7.jpg',
        'https://youtu.be/trailer7',
        'Action',
        'Released',
        '2015-04-03',
        '02:17:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        8,
        'The Fate of the Furious',
        'Dom goes rogue, and the team must stop a global terrorist.',
        'https://example.com/image8.jpg',
        'https://youtu.be/trailer8',
        'Action',
        'Released',
        '2017-04-14',
        '02:16:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        9,
        'F9',
        'Dom faces his estranged brother in a dangerous mission.',
        'https://example.com/image9.jpg',
        'https://youtu.be/trailer9',
        'Action',
        'Released',
        '2021-06-25',
        '02:23:00',
        NULL,
        NOW(),
        NOW()
    ),
    (
        10,
        'Fast X',
        'The family is targeted by the son of a previous enemy.',
        'https://example.com/image10.jpg',
        'https://youtu.be/trailer10',
        'Action',
        'Released',
        '2023-05-19',
        '02:21:00',
        NULL,
        NOW(),
        NOW()
    );