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
  "Line Dance": "#a9790c",
  "Festival": "#4a4f5c"
};
const DEFAULT_STYLE_COLOR = "#6b7280";

const EVENTS = [
  // ---------------------------------------------------------------- WEEKLY
  {
    id: "mamacita-social",
    recurrence: "weekly",
    dayOfWeek: 2, // Tuesday
    name: "Mamacita Social",
    host: "La Bomba",
    venue: "Mamacitas at Trype Hotel",
    address: "Pulteny Street, Adelaide CBD",
    time: "6:00 PM – 9:00 PM",
    cost: "Free",
    styles: ["Salsa", "Bachata"],
    description: "Weekly event with live music and food in a relaxed setting.",
    link: "https://www.instagram.com/labomba_latindance/"
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
    time: "Classes from 7:30 PM · Social dancing 9:15 PM – 10:15 PM",
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
    name: "Line Dance Class + Dance With Me Friday",
    host: "Quicksteps",
    venue: "Quicksteps",
    address: "255 Gouger St, Adelaide CBD",
    time: "Line dance class 7:45 PM – 8:30 PM · Social from 8:30 PM",
    cost: "First class free",
    styles: ["Line Dance"],
    description: "Beginner-friendly follow-along line dance class, straight into Dance With Me Friday — a relaxed social dance night at the bar upstairs.",
    link: "https://www.quicksteps.com.au/line-dance-classes-at-quicksteps/"
  },
  // --------------------------------------------------------------- MONTHLY
  {
    id: "rumba-bueno",
    recurrence: "dated",
    dates: ["2026-08-01", "2026-09-05", "2026-10-03", "2026-11-07", "2026-12-05"],
    name: "Rumba Bueno",
    host: "Mala Mia",
    venue: "Mala Mia",
    address: "268 Morphett St, Adelaide CBD",
    time: "9:00 PM – 2:00 AM",
    cost: "$15–$20",
    styles: ["Salsa", "Merengue", "Timba"],
    description: "Monthly social focused on Timba-style music. A real party.",
    note: "Assumed 1st Saturday of the month — confirm exact date via Mala Mia.",
    link: "https://www.instagram.com/malamia.adl/"
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
    id: "bachata-by-the-beach",
    recurrence: "dated",
    dates: ["2026-07-26", "2026-08-30", "2026-09-27", "2026-10-25", "2026-11-29", "2026-12-27"],
    name: "Bachata by the Beach",
    host: "Dance Amor",
    venue: "Henley Sailing Club",
    address: "Henley Beach, Adelaide",
    time: "4:00 PM – 9:00 PM",
    cost: "Free entry",
    styles: ["Bachata"],
    description: "Sunset ocean-view social on the last Sunday of every month, with a beginner-friendly floor and music by DJ Corazón. No partner required.",
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

  // ------------------------------------------------------------- ONE-OFFS
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
