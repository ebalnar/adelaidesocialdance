/* =========================================================================
   Adelaide Social Dance Calendar — "Where to Learn" directory
   -------------------------------------------------------------------------
   Edit this file to add, remove, or update dance schools. Grouped by genre.

   Each school entry:
      name     - School / studio name
      location - Suburb or short address
      link     - Website (or Instagram/Facebook if no website)
      note     - (optional) small caveat, e.g. unconfirmed details
   ========================================================================= */

const SCHOOLS = {
  "Salsa": [
    { name: "La Bomba", location: "44 Woodville Road, Woodville", link: "https://www.labomba.com.au" },
    { name: "Latino Grooves", location: "Basement, 366 King William Street, Adelaide CBD", link: "https://www.latinogrooves.com.au/" },
    { name: "Dance Amor", location: "24 Dumfries Pl, Adelaide CBD", link: "https://www.danceamor.com.au/" },
    { name: "Dance Pad", location: "St Peters & Marden", link: "https://thedancepad.com/" },
    { name: "Latin Room", location: "North Adelaide", link: "https://www.thelatinroom.com.au/" },
    { name: "KOLs (King Of Latin Soul Dance Academy)", location: "1 Portrush Road, Marden", link: "https://www.instagram.com/kolsdanceacademy/" },
    { name: "Quicksteps", location: "255 Gouger St, Adelaide CBD", link: "https://www.quicksteps.com.au/" },
    { name: "Adelaide University Salsa Mania", location: "Lady Symon, University of Adelaide, North Terrace", link: "https://linktr.ee/adelaideunisalsamania" },
    {
      name: "Santiago Garcia",
      description: "Salsa classes focused on musicality, footwork and partnerwork across three levels.",
      link: "https://www.instagram.com/s.garcia.fer/",
      note: "*Coming soon* — reach out to Santiago to express interest."
    }
  ],
  "Bachata": [
    { name: "Adelaide Bachata Academy", location: "98 Walkerville Terrace, Walkerville", link: "https://www.adelaidebachata.com.au/" },
    { name: "Latin Room", location: "North Adelaide", link: "https://www.thelatinroom.com.au/" },
    { name: "Dance Amor", location: "24 Dumfries Pl, Adelaide CBD", link: "https://www.danceamor.com.au/" },
    { name: "Latino Grooves", location: "Basement, 366 King William Street, Adelaide CBD", link: "https://www.latinogrooves.com.au/" },
    { name: "KOLs (King Of Latin Soul Dance Academy)", location: "1 Portrush Road, Marden", link: "https://www.instagram.com/kolsdanceacademy/" },
    { name: "La Bomba", location: "44 Woodville Road, Woodville", link: "https://www.labomba.com.au" },
    { name: "Quicksteps", location: "255 Gouger St, Adelaide CBD", link: "https://www.quicksteps.com.au/" }
  ],
  "Zouk": [
    { name: "Evolution Dance Company", location: "Latvian Hall, 4 Clark St, Wayville", link: "https://evolutiondance.com.au/" },
    { name: "Latin Dance HQ", location: "Glandore", link: "https://www.latindancehq.com/" }
  ],
  "Samba": [
    { name: "Escola de Samba Adelaide", location: "Torrensville", link: "https://www.escoladesambaadelaide.com/" },
    { name: "Talita Dance Queen (TQ Dance & Movement Centre)", location: "107 Gilbert Street, Adelaide CBD", link: "https://www.talitadancequeen.com/" },
    { name: "La Bomba", location: "44 Woodville Road, Woodville", link: "https://www.labomba.com.au" },
    { name: "KOLs (King Of Latin Soul Dance Academy)", location: "1 Portrush Road, Marden", link: "https://www.instagram.com/kolsdanceacademy/" },
    { name: "Latino Grooves", location: "Basement, 366 King William Street, Adelaide CBD", link: "https://www.latinogrooves.com.au/brazilian-samba/" },
    { name: "Dance Pad", location: "St Peters & Marden", link: "https://thedancepad.com/" }
  ],
  "Swing Dancing": [
    { name: "Quicksteps", location: "255 Gouger St, Adelaide CBD", link: "https://www.quicksteps.com.au/" },
    { name: "HappensDance", location: "Burnside Ballroom, Tusmore", link: "https://www.happensdance.com.au/" },
    { name: "Swing That Thing (Lindy Hop)", location: "North Adelaide & Norwood", link: "https://www.swingthatthing.com.au" }
  ],
  "Afro Dance": [
    { name: "Feeling Good Afro Dance and Design", location: "3/23 Payneham Road, College Park", link: "https://www.feelinggoodafrodance.com.au/" },
    { name: "La Bomba", location: "44 Woodville Road, Woodville", link: "https://www.labomba.com.au" }
  ],
  "Line Dance": [
    { name: "Quicksteps", location: "255 Gouger St, Adelaide CBD", link: "https://www.quicksteps.com.au/" },
    { name: "Saddle and Stomp", location: "Shotgun Willie's, 22 Gilbert Place, Adelaide CBD", link: "https://www.saddleandstomp.com.au/" }
  ]
};
