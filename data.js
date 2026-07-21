/* =========================================================================
   Adelaide Social Dance Calendar — event data
   -------------------------------------------------------------------------
   This is the ONLY file you should need to edit to add, remove, or update
   events. No coding knowledge required — just follow the pattern below.

   Two kinds of events:

   1) WEEKLY events — happen every week on the same day.
      {
        recurrence: "weekly",
        dayOfWeek: 2,   // 0=Sun, 1=Mon, 2=Tue, 3=Wed, 4=Thu, 5=Fri, 6=Sat
        ...
      }

   2) DATED events — happen on specific calendar dates (monthly socials,
      festivals, one-off gigs). List every date you know about; add more
      as they're announced.
      {
        recurrence: "dated",
        dates: ["2026-08-01", "2026-09-05"],
        ...
      }

   Shared fields for every event:
      name        - Event name
      host        - Who runs it
      venue       - Venue name
      address     - Street address
      time        - Human-readable time, e.g. "9:00 PM – 12:00 AM"
      cost        - e.g. "Free", "$20", "$15-20"
      styles      - Array of dance styles (see STYLE_COLORS below for the
                    "official" ones; you can add others like "Merengue" or
                    "Cumbia" and they'll show in a neutral grey tag)
      description - A sentence or two of extra detail
      link        - (optional) website/Instagram/Facebook URL for the event
      note        - (optional) small caveat shown in italics, e.g.
                    "Confirm date via Instagram"
   ========================================================================= */

const STYLE_COLORS = {
  "Salsa": "#e2572b",
  "Bachata": "#d6336c",
  "Zouk": "#7048a8",
  "Kizomba": "#2e86ab",
  "West Coast Swing": "#158a7b",
  "Swing": "#2f9e44",
  "Line Dance": "#a9790c",
  "Scottish Country Dance": "#1e3a8a",
  "Rock 'n' Roll": "#b91c1c",
  "Ballroom": "#9333ea",
  "Samba": "#059669",
  "Cumbia": "#c2410c",
  "Tango": "#831843",
  "Festival": "#4a4f5c"
};
const DEFAULT_STYLE_COLOR = "#6b7280";

const EVENTS = [
  // ---------------------------------------------------------------- WEEKLY
  {
    id: "westy-jams",
    recurrence: "weekly",
    dayOfWeek: 1, // Monday
    name: "Westy Jams",
    host: "Quicksteps",
    venue: "Quicksteps",
    address: "255 Gouger St, Adelaide CBD",
    time: "9:15 PM",
    cost: "Free",
    styles: ["Swing"],
    description: "Weekly swing dancing social at Quicksteps.",
    note: "Follows on from the social classes — check the Quicksteps timetable before heading down.",
    link: "https://www.quicksteps.com.au/timetable/"
  },
  {
    id: "the-dancing-room",
    recurrence: "weekly",
    dayOfWeek: 2, // Tuesday
    name: "Dancing Room",
    host: "The Dancing Room",
    venue: "Prospect Tennis Club",
    address: "Wilcox Ave, Prospect",
    time: "Until 7:30 PM",
    cost: "Free",
    styles: [],
    description: "A weekly free event where people of all ages dance to different local DJs. It's about dancing like nobody is watching, connecting with yourself, having fun and moving your body. No drugs or alcohol. Lots of fun."
  },
  {
    id: "bachata-life-support",
    recurrence: "weekly",
    dayOfWeek: 3, // Wednesday
    name: "Bachata Life Support",
    host: "Bachata Life Support",
    venue: "Lot 4/96 Frome St",
    address: "Adelaide CBD",
    time: "8:00 PM – 10:00 PM",
    cost: "$15",
    styles: ["Bachata"],
    description: "Weekly Bachata social. Check Instagram for the latest details before heading down.",
    link: "https://www.instagram.com/bachatalifesupport/"
  },
  {
    id: "midweek-mingle",
    recurrence: "weekly",
    dayOfWeek: 3, // Wednesday
    name: "Midweek Mingle",
    host: "Quicksteps",
    venue: "Quicksteps (main ballroom)",
    address: "255 Gouger St, Adelaide CBD",
    time: "8:30 PM – 10:00 PM",
    cost: "Free",
    styles: ["Ballroom", "West Coast Swing", "Line Dance"],
    description: "Adelaide's regular weekly mixed dance style event — ballroom, Latin and swing dance with a sprinkling of line dance. 4-5 Quicksteps teachers on hand. Open to members and non-members.",
    link: "https://www.quicksteps.com.au/midweek-mingle-at-quicksteps/"
  },
  {
    id: "taco-mia",
    recurrence: "weekly",
    dayOfWeek: 4, // Thursday
    name: "Taco Mía",
    host: "Mala Mía",
    venue: "Mala Mía",
    address: "268 Morphett St, Adelaide CBD",
    time: "Free class 7:00 PM · Social dancing after",
    cost: "Free (Corona buckets $30 until 8pm)",
    styles: ["Salsa", "Bachata"],
    description: "Formerly Thirsty & Taco Thursday. Pinches Tacos, a FREE Salsa & Bachata class at 7pm, then social dancing. Come for the tacos, stay for the dancing.",
    link: "https://www.instagram.com/reel/DbAiZ2ZRtHR/"
  },
  {
    id: "happensdance-wcs",
    recurrence: "weekly",
    dayOfWeek: 4, // Thursday
    name: "HappensDance West Coast Swing",
    host: "HappensDance",
    venue: "Burnside Ballroom",
    address: "Tusmore, Adelaide",
    time: "Social dancing 9:15 PM – 10:15 PM",
    cost: "From $15",
    styles: ["West Coast Swing"],
    description: "Beginner-friendly West Coast Swing classes followed by an hour of social dancing with guest DJs every week. No partner or experience required.",
    link: "https://www.happensdance.com.au/"
  },
  {
    id: "bailamos",
    recurrence: "weekly",
    dayOfWeek: 5, // Friday
    name: "Bailamos",
    host: "Quicksteps",
    venue: "Quicksteps",
    address: "255 Gouger St, Adelaide CBD",
    time: "9:15 PM – 12:00 AM",
    cost: "Free",
    styles: ["Salsa", "Bachata"],
    description: "Weekly free social at Quicksteps, one of the most popular Latin socials in Adelaide.",
    link: "https://www.instagram.com/quickstepsadelaide/"
  },
  {
    id: "dance-with-me-friday",
    recurrence: "weekly",
    dayOfWeek: 5, // Friday
    name: "Dance with Me Social",
    host: "Quicksteps",
    venue: "Quicksteps",
    address: "255 Gouger St, Adelaide CBD",
    time: "8:30 PM – 9:15 PM, various styles after",
    cost: "First class free",
    styles: ["Line Dance"],
    description: "A relaxed social dance night at the bar upstairs, with various styles played after 9:15pm.",
    link: "https://www.quicksteps.com.au/line-dance-classes-at-quicksteps/"
  },
  {
    id: "line-dance-social-woolshed",
    recurrence: "weekly",
    dayOfWeek: 5, // Friday
    name: "Line Dance Social",
    host: "Saddle and Stomp",
    venue: "The Woolshed",
    address: "Hindley Street, Adelaide CBD",
    time: "6:00 PM – 8:00 PM",
    cost: "Check with host",
    styles: ["Line Dance"],
    description: "Weekly line dance social hosted by Saddle and Stomp at The Woolshed."
  },
  {
    id: "casablabla-fridays",
    recurrence: "weekly",
    dayOfWeek: 5, // Friday
    name: "Casablabla Fridays",
    host: "La Bomba & DJ Senorita",
    venue: "Casablabla",
    address: "12 Leigh St, Adelaide CBD",
    time: "9:00 PM onward",
    cost: "Free",
    styles: ["Salsa", "Bachata", "Merengue", "Reggeton"],
    description: "Weekly social featuring mainly Salsa and some Bachata, Merengue and Reggeton, with weekly 'follow me' sessions and top Cuban dancers.",
    link: "https://www.instagram.com/labomba_latindance/"
  },
  {
    id: "boot-scootin-thursdays",
    recurrence: "weekly",
    dayOfWeek: 4, // Thursday
    name: "Boot Scootin' Thursdays",
    host: "Saddle and Stomp",
    venue: "Shotgun Willie's",
    address: "22 Gilbert Place, Adelaide CBD",
    time: "Every Thursday from 6:00 PM",
    cost: "Free",
    styles: ["Line Dance"],
    description: "Free line dancing lessons at 6PM, every Thursday.",
    link: "https://www.saddleandstomp.com.au/"
  },
  // --------------------------------------------------------------- MONTHLY
  {
    id: "rumba-buena",
    recurrence: "dated",
    dates: ["2026-08-01", "2026-09-05", "2026-10-03", "2026-11-07", "2026-12-05"],
    name: "Rumba Buena",
    host: "DJ Rio and ChicaB",
    venue: "Mala Mia",
    address: "268 Morphett St, Adelaide CBD",
    time: "9:00 PM – 2:00 AM",
    cost: "$10–$15",
    styles: ["Salsa", "Merengue", "Timba"],
    description: "Monthly social focused on Timba-style music. A real party. ¡Animación, Percusión y mucha Diversión!",
    note: "Assumed 1st Saturday of the month — confirm exact date via Mala Mia.",
    link: "https://www.instagram.com/rumbabuena_adl/"
  },
  {
    id: "salsa-sundays",
    recurrence: "dated",
    dates: ["2026-08-02", "2026-09-06", "2026-10-04", "2026-11-01", "2026-12-06"],
    name: "Salsa Sundays",
    host: "One Dance",
    venue: "Plant 4 Bowden",
    address: "Bowden, Adelaide",
    time: "6:00 PM – 10:30 PM",
    cost: "$20",
    styles: ["Salsa", "Bachata", "Kizomba", "Zouk"],
    description: "Regarded as one of the best socials in Adelaide — a monthly event with a 2/2/2 split of Salsa, Bachata and Kiz/Zouk.",
    note: "Held on the first Sunday of the month.",
    link: "https://www.plant4bowden.com.au/salsa"
  },
  {
    id: "monthly-swing-social-mylor",
    recurrence: "dated",
    dates: ["2026-08-02", "2026-09-06", "2026-10-04", "2026-11-01", "2026-12-06"],
    name: "Monthly Swing Social",
    host: "HappensDance",
    venue: "Mylor Hall",
    address: "Corner of Strathalbyn Road and Cross Street, Mylor",
    time: "3:00 PM – 5:00 PM",
    cost: "$5 entry",
    styles: ["West Coast Swing"],
    description: "Monthly West Coast Swing practice session and social, hosted by HappensDance (the Hilltop HappensDancers) in the Adelaide Hills.",
    note: "Held on the first Sunday of the month.",
    link: "https://www.happensdance.com.au/hilltophappensdancers"
  },
  {
    id: "bachata-by-the-beach",
    recurrence: "dated",
    dates: ["2026-07-26", "2026-08-30", "2026-09-27", "2026-10-25", "2026-11-29", "2026-12-27"],
    name: "Bachata by the Beach",
    host: "Dance Amor",
    venue: "Henley Sailing Club",
    address: "Henley Beach, Adelaide",
    time: "4:00 PM – 9:00 PM",
    cost: "$15",
    styles: ["Salsa", "Bachata"],
    description: "Sunset. Socials. Seaside vibes. Bachata by the Beach is more than a dance party — it's a community escape at the Henley Sailing Club, where the salt air meets the rhythm of Salsa and Bachata. Never danced before? Perfect — evenings are designed to be starter-friendly: skip the formal pressure, walk in solo or with friends, join the ice-breaker, and get shown the basics. What to expect: an easy-going first hour to meet the community (The Mingle), 15-minute starter sessions in Salsa and Bachata (The Mini-Workshops), and a high-energy floor with a 3:2 Bachata/Salsa mix and the best sunset views in Adelaide (The Social).",
    link: "https://www.danceamor.com.au/pages/adelaide-bachata-by-the-beach"
  },
  {
    id: "zouk-night",
    recurrence: "dated",
    dates: ["2026-08-07", "2026-09-04", "2026-10-02", "2026-11-06", "2026-12-04"],
    name: "Zouk Night",
    host: "Evolution Dance Company",
    venue: "Latvian Hall",
    address: "4 Clark St, Wayville",
    time: "Evening — check Facebook for start time",
    cost: "Varies",
    styles: ["Zouk"],
    description: "Monthly Brazilian Zouk social party — a chance to apply what you've learned in class and meet other dancers.",
    note: "Generally the first Friday of the month — confirm date/time via Evolution Dance Company's Facebook.",
    link: "https://www.facebook.com/EvolutionDanceAdelaide"
  },
  {
    id: "latino-grooves-monthly-social",
    recurrence: "dated",
    dates: ["2026-09-19", "2026-10-17", "2026-11-21", "2026-12-19"],
    name: "Latino Grooves Monthly Social",
    host: "Latino Grooves",
    venue: "Latino Grooves Dance Studio",
    address: "Basement, 366 King William Street, Adelaide CBD",
    time: "8:30 PM onward",
    cost: "$25 per person",
    styles: ["Salsa", "Bachata"],
    description: "Monthly Latin social hosted by Latino Grooves on the 3rd Saturday of every month.",
    note: "Venue assumed to be the Latino Grooves studio — confirm via Instagram before heading down.",
    link: "https://www.instagram.com/latinogroovesdancestudio/"
  },

  // ------------------------------------------------------------- ONE-OFFS
  {
    id: "salsa-and-coffee-aug9",
    recurrence: "dated",
    dates: ["2026-08-09"],
    name: "Salsa and Coffee",
    host: "Rotunda Dance Club",
    venue: "Providore 1885",
    address: "Fort Largs",
    time: "To be confirmed",
    cost: "Free",
    styles: ["Salsa"],
    description: "A free event where a group of anywhere from 20–40 people meet, eat breakfast, have coffee, and salsa to start the day.",
    note: "Placeholder — details to be confirmed.",
    link: "https://www.instagram.com/rotundadanceclub/"
  },
  {
    id: "shuffle-session-in-july",
    recurrence: "dated",
    dates: ["2026-07-26"],
    name: "Shuffle Session in July",
    host: "The Local Shuffle",
    venue: "HYMN Bar",
    address: "Level 1, 73 Grenfell St, Adelaide CBD",
    time: "3:00 PM – 6:30 PM",
    cost: "Check event page for pricing",
    styles: ["Swing"],
    description: "Live jazz and DJ'd event with plenty of opportunities to swing — the 2nd Shuffle Session from The Local Shuffle.",
    link: "https://www.facebook.com/events/1317813916448341"
  },
  {
    id: "viva-latinoamerica-fest-2026",
    recurrence: "dated",
    dates: ["2026-09-12"],
    name: "Viva Latinoamérica Fest 2026",
    host: "SOCIALBEAT & The Gov",
    venue: "The Gov",
    address: "59 Port Rd, Hindmarsh SA 5007",
    time: "8:00 PM",
    cost: "See ticket link for pricing",
    styles: ["Salsa", "Bachata", "Cumbia", "Festival"],
    description: "Adelaide's biggest celebration of Latin American music, dance and culture.",
    link: "https://www.facebook.com/events/965720153006138/"
  },
  {
    id: "fiesta-latina-aug15",
    recurrence: "dated",
    dates: ["2026-08-15"],
    name: "Fiesta Latina",
    host: "Latino Grooves Dance Studio",
    venue: "Arkaba Hotel",
    address: "150 Glen Osmond Road, Fullarton",
    time: "8:30 PM",
    cost: "See tix.yt/fiesta-latina for pricing",
    styles: ["Salsa", "Bachata"],
    description: "Latino Grooves is back at the Arkaba Hotel for a fantastic evening of Latin dancing, music and great atmosphere.",
    link: "https://www.facebook.com/events/arkaba-hotel/fiesta-latina/2285770482168114/"
  },
  {
    id: "lg-milonga-august-edition",
    recurrence: "dated",
    dates: ["2026-08-08"],
    name: "LG Milonga — August Edition",
    host: "Latino Grooves Dance Studio",
    venue: "Latino Grooves Dance Studio",
    address: "Basement, 366 King William St, Adelaide CBD",
    time: "7:00 PM",
    cost: "See ticket link for pricing",
    styles: ["Tango"],
    description: "One of three special Milonga nights in 2026 from Latino Grooves — an elegant evening of Tango, music and community.",
    link: "https://www.facebook.com/events/1153463656639396"
  },
  {
    id: "swing-extravaganza-aug15",
    recurrence: "dated",
    dates: ["2026-08-15"],
    name: "Swing Extravaganza",
    host: "Southern Jazz Club Inc",
    venue: "The Highway",
    address: "290 Anzac Highway, Plympton",
    time: "Doors 6:00 PM · Music & dancing 7:30 PM – 10:15 PM",
    cost: "$25 members / $35 non-members",
    styles: ["Swing"],
    description: "Live music and dancing with the Adelaide Society Swing Orchestra — fabulous music to sit and listen to, or get up and dance the night away.",
    note: "Venue based on Southern Jazz Club's usual home — confirm via the ticket link.",
    link: "https://www.facebook.com/events/4559281164394732/"
  },
  {
    id: "leo-rey-tour-australia-2026-adelaide",
    recurrence: "dated",
    dates: ["2026-08-23"],
    name: "Leo Rey — Tour Australia 2026 (Adelaide)",
    host: "Prime Stage Event",
    venue: "The Gov",
    address: "59 Port Rd, Hindmarsh SA 5007",
    time: "Doors open 6:00 PM – 11:00 PM",
    cost: "See thegov.com.au for ticket prices",
    styles: ["Cumbia"],
    description: "Leo Rey live from Chile — Cumbia Tropical and one of the best danceable shows around, with guest band Red Tide plus DJ Pato & DJ Marz. Sponsored by the Chilean Community of South Australia and La Bomba.",
    note: "For more info call Patricio Matus on 0477 698 558.",
    link: "https://www.thegov.com.au"
  },
  {
    id: "pajuanchito-noches-de-salsa-aug15",
    recurrence: "dated",
    dates: ["2026-08-15"],
    name: "Pa'Juanchito — Noches de Salsa",
    host: "Pa'Juanchito & DJ Castillo Australia (Kukaramakara Melbourne)",
    venue: "Higher Vision Bar",
    address: "132 Hindley St, Adelaide CBD",
    time: "Evening — check Instagram for start time",
    cost: "Check Instagram for ticket details",
    styles: ["Salsa"],
    description: "The first Pa'Juanchito party in Adelaide — Salsa Caleña and Salsa Brava, a tribute to Colombian roots, with DJ Castillo Australia visiting from Kukaramakara Melbourne. Dress code: black.",
    link: "https://www.instagram.com/p/Da7a8bsgToJ/"
  },
  {
    id: "quicksteps-sunday-rock-getback",
    recurrence: "dated",
    dates: ["2026-07-26"],
    name: "Sunday Rock with GetBack",
    host: "Quicksteps",
    venue: "Quicksteps",
    address: "255 Gouger St, Adelaide CBD",
    time: "5:30 PM",
    cost: "Check Quicksteps for ticket pricing",
    styles: ["Rock 'n' Roll", "Swing"],
    description: "Live band GetBack playing an energetic mix of classic Rock 'n' Roll and Swing favourites. Bar open all evening, social dancing and live music in a fun, welcoming atmosphere.",
    link: "https://www.quicksteps.com.au/sunday-rock-with-getback-2026/"
  },
  {
    id: "quicksteps-ballroom-blitz-aug16",
    recurrence: "dated",
    dates: ["2026-08-16"],
    name: "Ballroom Blitz",
    host: "Quicksteps",
    venue: "Quicksteps",
    address: "255 Gouger St, Adelaide CBD",
    time: "5:30 PM",
    cost: "$15",
    styles: ["Ballroom"],
    description: "Celebrate the timeless magic of ballroom dancing at Quicksteps.",
    link: "https://www.quicksteps.com.au/ballroom-blitz-16-08-2026/"
  },
  {
    id: "adelaide-bachata-academy-august-party",
    recurrence: "dated",
    dates: ["2026-08-08"],
    name: "August Bachata Party — Angels & Devils",
    host: "Adelaide Bachata Academy",
    venue: "Eliza Hall",
    address: "128 Prospect Road, Prospect",
    time: "Doors 7:45 PM · Workshop 8:00 PM · Social 9:00 PM – 12:00 AM",
    cost: "Check TryBooking for pricing",
    styles: ["Bachata"],
    description: "Adelaide's monthly 100% Bachata party. Angels & Devils dress theme (wear white or red). Bachata Social Dance Highlights Workshop with Thien & Alice at 8pm, then a 100% Bachata social with DJ LE. Free onsite parking.",
    note: "Tickets are limited to keep an even leader/follower ratio — may be waitlist-only, check TryBooking.",
    link: "https://www.trybooking.com/events/landing/1617970"
  },
  {
    id: "adelaide-ball-2026-scottish",
    recurrence: "dated",
    dates: ["2026-08-08"],
    name: "Adelaide Ball 2026 (Scottish Ball)",
    host: "Lithuanian Hall",
    venue: "Lithuanian Hall",
    address: "6 Eastry St, Norwood",
    time: "3:30 PM – 6:30 PM",
    cost: "AU$25",
    styles: ["Scottish Country Dance"],
    description: "A twilight Scottish Ball with a lively programme of Scottish country dances in a friendly, welcoming atmosphere. Dress up and socialise — suitable for experienced dancers and newcomers alike.",
  },
  {
    id: "quicksteps-winter-spectacular-2026",
    recurrence: "dated",
    dates: ["2026-08-01"],
    name: "Winter Spectacular at the Adelaide Town Hall",
    host: "Quicksteps",
    venue: "Adelaide Town Hall",
    address: "128 King William St, Adelaide CBD",
    time: "6:30 PM",
    cost: "$99",
    styles: ["Salsa", "Bachata", "West Coast Swing", "Line Dance"],
    description: "Dance the night away at the iconic Adelaide Town Hall. Ticket includes access to a generous grazing table, live performances by Quicksteps students and teachers, and great music with a proper dance-floor vibe. Post event party at Quicksteps.",
    note: "Fun fact from the event page: Adelaide Town Hall has been part of the city since the 1800s and was once the largest municipal building in the Southern Hemisphere.",
    link: "https://www.quicksteps.com.au/events/winter-spectacular-at-the-adelaide-town-hall-2026/"
  },
  {
    id: "bachaton-august",
    recurrence: "dated",
    dates: ["2026-08-22"],
    name: "Bachaton",
    host: "Dance Gallery",
    venue: "Dance Gallery",
    address: "210 Henley Beach Rd, Torrensville",
    time: "8:00 PM Bachata workshop · 9:00 PM till late — 100% Bachata social with DJ Darren",
    cost: "Early bird $15 / Door sales $20",
    styles: ["Bachata"],
    description: "Monthly bachata party — 100% pure bachata vibes, no salsa, kiz, or mix.",
    note: "Search \"Bachaton Adelaide\" on TryBooking for the August ticket link — only October/November editions were findable at time of writing.",
    link: "https://www.facebook.com/Dance-Gallery-144933565551784/"
  },
  {
    id: "gssa-come-and-try-line-dancing",
    recurrence: "dated",
    dates: ["2026-08-25"],
    name: "Come & Try Line Dancing with GSSA",
    host: "Genuine Support Services Australia (GSSA) & Saddle and Stomp",
    venue: "GSSA Activities Room",
    address: "6 Seventh Street, Murray Bridge",
    time: "4:00 PM – 6:00 PM",
    cost: "$10 NDIS / $15 Public (refreshments $2)",
    styles: ["Line Dance"],
    description: "Come and try line dancing session for beginners — easy steps, friendly atmosphere, everyone welcome. No experience necessary.",
    note: "Located in Murray Bridge, about an hour from Adelaide CBD. Minimum numbers required to go ahead — book by calling 8166 7577.",
  },
  {
    id: "latin-sunday-sessions-aug9",
    recurrence: "dated",
    dates: ["2026-08-09"],
    name: "Latin Sunday Sessions",
    host: "DJ Hugo Salcedo",
    venue: "The Suburban Brew",
    address: "26–30 Provident Ave, Glynde",
    time: "3:00 PM – 8:00 PM",
    cost: "Free entry",
    styles: ["Salsa", "Bachata"],
    description: "Latin music, social dancing and great vibes with DJ Hugo Salcedo.",
    link: "https://www.instagram.com/thesuburbanbrew/"
  },
  {
    id: "west-coast-mixer-aug23",
    recurrence: "dated",
    dates: ["2026-08-23"],
    name: "West Coast Mixer",
    host: "Yash, Adrian and Trisha",
    venue: "Quicksteps",
    address: "255 Gouger St, Adelaide CBD",
    time: "5:30 PM – 7:30 PM",
    cost: "$25 pre-purchase / $30 on the day",
    styles: ["West Coast Swing"],
    description: "West Coast Swing social mixer — hot tunes, cold drinks. All welcome, bring mates.",
    note: "Tickets limited — buy in advance if possible.",
    link: "https://www.instagram.com/quickstepsadelaide/"
  },
  {
    id: "hugo-salcedo-band",
    recurrence: "dated",
    dates: ["2026-07-26"],
    name: "Hugo Salcedo Band Live",
    host: "Hugo Salcedo",
    venue: "Cue Bar",
    address: "1/140–144 The Parade, Norwood SA 5067",
    time: "3:00 PM – 6:00 PM",
    cost: "Free",
    styles: ["Salsa", "Bachata"],
    description: "Live trio playing Latin music including salsa, cumbia and bachata.",
    note: "One-off listing — check the venue for future dates.",
    link: "https://www.instagram.com/hugosalcedomusic/"
  }
];
