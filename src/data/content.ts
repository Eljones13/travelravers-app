// TRAVEL RAVERS: Central content data layer
// All content is defined here for easy CMS/MDX migration by Claude Code or other AI tools.

import festivalTomorrowland from "@/assets/festival-tomorrowland.jpg";
import festivalCreamfields from "@/assets/festival-creamfields.jpg";
import festivalTerminalV from "@/assets/festival-terminalv.jpg";
import festivalEdc from "@/assets/festival-edc.jpg";
import festivalUltra from "@/assets/festival-ultra.jpg";
import festivalCamping from "@/assets/festival-camping.jpg";
import gearFlatlay from "@/assets/gear-flatlay.jpg";
import heroFestival from "@/assets/hero-festival.jpg";

// ─── FESTIVALS ───────────────────────────────────────────────

export interface Festival {
  slug: string;
  name: string;
  country: string;
  city: string;
  dates: string;
  genres: string[];
  vibe: string;
  region: "uk" | "eu" | "global";
  type: "camping" | "city" | "beach";
  firstTimerFriendly: boolean;
  budgetLevel: "cheap" | "medium" | "big-trip";
  status: "on-sale" | "selling-fast" | "tbc" | "cancelled";
  image: string;
  description: string;
  whyGo: string;
  travelTips: string;
  accommodation: string;
  packingHighlights: string[];
  survivalTips: string;
  nearbyTrips: string;
  /** YouTube video ID for the autoplay promo embed on the detail page */
  youtubePromoId?: string;
  /** Override ticket URL — shown instead of SKIDDLE_MAP entry */
  ticketUrl?: string;
  /** Override flights URL — shown instead of Kiwi.com builder. Use Skyscanner links. */
  flightsUrl?: string;
  /** Override hotel URL — shown instead of Booking.com lat/lng builder */
  hotelUrl?: string;
  /** True when tickets are only available from the official festival site (not Skiddle) */
  officialSiteOnly?: boolean;
  /** Structured vibe scores for the detail HUD */
  vibes?: {
    energyLevel: number;
    darknessScore: number;
    firstTimerScore: number;
    bestFor: string;
    crowdVibe: string;
  };
  /** Bullet-point survival intel (max 5) */
  survivalIntelBullets?: string[];
  /** Structured travel info for the detail page */
  travelAdviceInfo?: {
    airport: string;
    flightCost: string;
    transferOptions: string;
    totalJourney: string;
  };
  /** Accommodation tier suggestions */
  accommodationTiers?: {
    budget: string;
    midRange: string;
    premium: string;
    bookingTip: string;
  };
  /** Top artist lineup */
  lineup?: Array<{ artist: string; genre: string; description: string }>;
  /** GPS coordinates for maps */
  coords?: { lat: number; lng: number };
  /** Estimated capacity */
  capacity?: number;
  /** Key environmental risks (heat, dust, mud, cold, etc.) for the Know Before You Go section */
  environmentRisks?: string[];
  /** FAQ items rendered in the First-Timer FAQ section and FAQ schema */
  faqs?: Array<{ q: string; a: string }>;
  /** If cancelled/superseded, points to the replacement festival for the cross-link banner */
  replacedBy?: { slug: string; name: string };
}


export const festivals: Festival[] = [
  {
    slug: "tomorrowland",
    name: "Tomorrowland",
    country: "Belgium",
    city: "Boom",
    dates: "Jul 17–19 & Jul 24–26, 2026",
    genres: ["EDM", "House", "Techno", "Trance", "Hardstyle", "Drum & Bass", "Progressive House"],
    vibe: "The world's most iconic electronic music festival — two weekends of theatrical magic in the Belgian countryside",
    region: "eu",
    type: "camping",
    capacity: 400000,
    firstTimerFriendly: true,
    budgetLevel: "big-trip",
    status: "selling-fast",
    image: festivalTomorrowland,
    coords: { lat: 51.0893, lng: 4.3728 },
    description:
      "Tomorrowland is two weekends, 16+ stages, 400,000 People of Tomorrow from 200+ countries, and the most elaborately produced festival on earth. De Schorre recreation area outside Boom — between Antwerp and Brussels — transforms into a theme park of sound every July. Weekend 1 runs July 17–19; Weekend 2 July 24–26. DreamVille, the on-site campsite, opens Thursday before each weekend and the community there is as much a part of the experience as the music itself. If you only go to one festival abroad in your life, make it this one.",
    whyGo:
      "Every stage at Tomorrowland is a handbuilt work of art, the sound systems are world-class, and the atmosphere of 200 nationalities sharing a field in genuine euphoria is genuinely hard to describe. The Pearls cashless system, the free water refill points, the DreamVille community pre-parties — the logistics are as polished as the production. It's expensive, it sells out in minutes, and getting tickets takes planning and luck. But once you're in, it justifies every penny and every hour of effort to get there.",
    travelTips:
      "Fly into Brussels Airport (BRU, ~40 km) — best connected for UK and EU routes. Budget airlines (Ryanair, Wizz Air) use Brussels South Charleroi (CRL, ~70 km); official Tomorrowland shuttles run from both airports to DreamVille on opening Thursday and closing Monday. Eindhoven (EIN, ~80 km across the Dutch border) is a third option with official shuttles. By train: NMBS/SNCB from Brussels Midi or Antwerp Central to Boom station, then a 20-minute walk to site — trains are crowded on festival days. Consider Eurostar from London St Pancras to Brussels (~2 hours) then connect by train. Global Journey packages include all transfers and take the stress out completely — they sell out on launch day so pre-register at my.tomorrowland.com.",
    accommodation:
      "DreamVille is the non-negotiable first-timer choice. Tiers: Magnificent Greens (BYO tent, the most social and chaotic; from ~€410–€480 pp), Camp2Camp (pre-pitched recycled tents, ~€500–€600 pp), Easy Tent (pre-pitched with all gear, ~€600–€700 pp), Spectacular Easy Tent (power outlet + locker, ~€800–€900 pp), Montagoe cabins (lockable, real beds, premium pricing). If DreamVille is sold out or you prioritise sleep, Antwerp (~20 km, 30–45 min by train) has the best hotel selection — book 6+ months out. Brussels (~30 km) has more budget hotel availability. Boom/Rumst local rentals exist but are near-impossible to find after January.",
    packingHighlights: [
      "Rain jacket or compact waterproof poncho — Belgian summer rain is almost guaranteed",
      "Wellies or waterproof boots plus broken-in trainers — alternate based on conditions",
      "Warm layers for night: hoodie or fleece — temperatures drop significantly after sunset",
      "High-fidelity earplugs (Loop, EarPeace) — three days of 16+ stages will damage unprotected hearing",
      "Sleep kit: eye mask, foam earplugs for sleeping, inflatable pillow if not provided by DreamVille package",
      "Power bank (20,000 mAh minimum) plus EU plug adapter — most DreamVille zones have no power outlets",
      "Reusable water bottle or CamelBak — free water refill points throughout the festival",
      "SPF 30+ sunscreen, hat, and sunglasses you don't mind losing",
      "Small crossbody bum bag — large rucksacks slow down security and get in the way dancing",
      "Country flag or small group totem (no rigid poles; inflatables or short flexible ones only)",
      "Printed ticket confirmation and photo ID — bring both; digital-only has risks with patchy signal",
    ],
    survivalTips:
      "Everything at Tomorrowland is cashless — the Pearls system loaded onto your wristband covers all food, drink, and merchandise. Top up online before you arrive; queuing at top-up points during headliners wastes precious time. Unspent Pearls can be refunded after the festival. Free water refill stations are throughout the site — use them. Download the Tomorrowland app before you arrive: full timetable, interactive map, stage clash alerts, and a Find My Friends feature. Agree physical meeting points with your group — phone signal is unreliable with 400,000 people on-site. Walk times from DreamVille to the Mainstage can be 20–45 minutes depending on your zone — factor this into your set schedule.",
    survivalIntelBullets: [
      "Top up Pearls online before arrival — on-site top-up queues during headliners are 30+ minutes",
      "DreamVille to Mainstage can be 20–45 min depending on your zone — build this into your plan",
      "Phone signal dies at peak times with 400k people — agree physical meeting points before entering",
      "Day 1 pace is everything: three days is a marathon — don't peak on Friday afternoon",
      "Global Journey packages sell out on launch day — pre-register at my.tomorrowland.com immediately",
      "Magnificent Greens BYO: arrive Thursday to secure a good pitch before the morning rush",
      "UK mobile roaming charges likely apply — check your plan or buy a prepaid Belgian SIM at BRU",
    ],
    nearbyTrips:
      "Stack with a weekend in Brussels (world-class food, nightlife, and architecture — 30 min south by train) or Antwerp (dynamic port city with an outstanding bar and restaurant scene — 20 min north). Many ravers do Weekend 1 then take a train to Amsterdam (2.5 hours) for a few nights at clubs before flying home. Ghent is a beautiful, underrated day trip by train.",
    youtubePromoId: "ryIz5jiT6Pc",
    officialSiteOnly: true,
    ticketUrl: "https://belgium.tomorrowland.com/en/sales-info/",
    flightsUrl: "https://www.skyscanner.net/transport/flights/anywhere/BRU/260717/260726/",
    hotelUrl: "https://www.booking.com/search.html?ss=Boom%2C+Belgium&checkin=2026-07-17&checkout=2026-07-20",
    environmentRisks: [
      "Unpredictable Belgian summer weather — sunshine, sudden rain, and potential mud within hours; temperatures swing from warm days to cold nights",
      "Long walking distances on hilly terrain — DreamVille to stages can be 20–45 minutes; expect 20,000–25,000 steps per day",
      "Sleep deprivation — sets run past midnight, DreamVille stays active around the clock, and three consecutive days take a serious physical toll",
      "Sustained loud sound levels across 16+ stages — unprotected hearing at festival volumes causes permanent damage",
      "Sun exposure and dehydration during long daytime hours on open ground with limited shade in summer heat",
    ],
    faqs: [
      {
        q: "Is DreamVille worth it vs. staying in Antwerp or Brussels?",
        a: "For first-timers, DreamVille is strongly recommended. You get The Gathering pre-party, zero commute, and the communal atmosphere that is as much Tomorrowland as the music. Hotels in Antwerp or Brussels offer better sleep but add 30–60 minutes of travel each way. If sleep quality is critical, Antwerp works — but you'll feel disconnected. Easy Tent or Spectacular Easy Tent packages offer the best comfort-vs-experience balance inside DreamVille.",
      },
      {
        q: "How hard is it to get Tomorrowland tickets and what if I miss the sale?",
        a: "Extremely competitive. Global Journey packages sold out on sale day in January 2026. Worldwide Pre-Sale and General Sale tickets sell out within minutes. Pre-register on my.tomorrowland.com well in advance. If you miss the official sale: use the official Tomorrowland ticket exchange/waiting list, try verified resellers, or consider third-party hospitality packages. Avoid unofficial resellers — scam risk is high.",
      },
      {
        q: "How do Global Journey packages actually work?",
        a: "Global Journey bundles return flights or trains, a Full Madness Pass (all 3 days), accommodation (DreamVille or hotel), all transfers between airport–hotel–festival, exclusive events, and a souvenir bag. You choose your departure city. Antwerp hotel packages include daily train transfers; Brussels packages include daily bus transfers. Prices range from ~€900 (basic camping + bus) to €5,000+ (premium hotel + party flight). Zero logistics, guaranteed ticket.",
      },
      {
        q: "What happens if it rains all weekend — will it be a mud pit?",
        a: "Possibly, yes. Rain is common in Belgian summers and De Schorre's grassy, hilly terrain turns muddy quickly. Magnificent Greens can get particularly soggy. Wellies and a rain jacket are non-negotiable. Spectacular Easy Tent and Montagoe have raised floors that keep you off the mud. The festival continues rain or shine — many attendees say a wet Tomorrowland produces some of the most memorable moments.",
      },
      {
        q: "How safe is Tomorrowland for solo travellers?",
        a: "Very safe. Tomorrowland has extensive security, medical teams, and info points across the entire site and DreamVille. The 'People of Tomorrow' community is famously inclusive — solo travellers regularly report making lifelong friends. DreamVille camping naturally fosters socialising with tent neighbours. Standard precautions: don't leave valuables unattended, stay in populated areas at night, share your plans with someone at home.",
      },
      {
        q: "Can I rent or buy tents at DreamVille if I didn't get a package?",
        a: "If you have a Magnificent Greens ticket (BYO tent) you need to bring your own or buy one on-site — prices at the camping store are inflated. Camp2Camp provides pre-pitched recycled tents with all gear. Easy Tent and Spectacular Easy Tent packages come with a pre-pitched tent and equipment ready on arrival — if you're flying without gear, these are the most practical options.",
      },
      {
        q: "How far is the walk from DreamVille to the stages?",
        a: "It depends on your zone. Montagoe is closest — under 10 minutes to the festival entrance. Easy Tent areas are 20–30 minutes. Magnificent Greens can be 30–45 minutes depending on pitch location. Factor this into your schedule for headliner sets. You'll walk 15,000–25,000 steps per day easily — footwear is not optional to get right.",
      },
      {
        q: "Is Tomorrowland cashless and how does payment work?",
        a: "Yes, fully cashless. All purchases use the Pearls system loaded onto your festival wristband. Top up online in advance or at top-up points inside (cash and card accepted). Unspent Pearls are refunded after the festival via your Tomorrowland account. Top up more than you think you'll spend — queuing to top up mid-set wastes set time.",
      },
      {
        q: "What time do gates open and close, and how late do sets run?",
        a: "Festival gates typically open around 12:00–13:00 with music starting in the early afternoon. Mainstage headline sets run until 00:00–01:00. Smaller stages and certain areas run later. DreamVille has its own after-hours atmosphere well into the night. Aim to arrive by mid-afternoon to catch the full range of acts.",
      },
      {
        q: "Do I need a European SIM card or will my UK phone work?",
        a: "Post-Brexit, most UK mobile plans no longer include free EU roaming — check with your provider before travelling. If roaming charges apply, buy a prepaid European SIM at Brussels Airport or any Belgian phone shop. Either way, expect degraded signal with 400,000 people on the same cell towers. Download offline maps and the Tomorrowland app content in advance, and agree physical meeting points rather than relying on messaging.",
      },
    ],
  },
  {
    slug: "creamfields",
    name: "Creamfields",
    country: "UK",
    city: "Daresbury, Cheshire",
    dates: "Aug 22–25, 2026",
    genres: ["EDM", "House", "Techno", "DnB", "Trance"],
    vibe: "UK mega-festival",
    region: "uk",
    type: "camping",
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalCreamfields,
    description: "The UK's biggest dance music festival. Four days of non-stop electronic music across massive stages in the Cheshire countryside. Expect mud, mayhem, and unforgettable memories.",
    whyGo: "Creamfields is the ultimate UK rave. The lineup is consistently stacked — Carl Cox, Calvin Harris, Amelie Lens, Sub Focus all on the same weekend. It's more accessible than international festivals (no flights needed for UK ravers) and the atmosphere is pure British festival energy.",
    travelTips: "Drive if you can (parking available). Otherwise, trains to Runcorn or Warrington, then shuttle buses. Liverpool and Manchester are the nearest cities with airports. Official coaches run from major UK cities.",
    accommodation: "Standard camping is included with most tickets. Upgrade to Silver or Gold camping for better facilities. Glamping options available but sell out fast. Hotels in Warrington or Runcorn are 20–30 min away.",
    packingHighlights: ["Wellies (it WILL be muddy)", "Waterproof jacket", "Warm sleeping bag (UK August nights are cold)", "Dry bags for phone and valuables", "Baby wipes (showers are basic)", "Flag for finding your tent"],
    survivalTips: "The mud at Creamfields is legendary — wellies are non-negotiable. Bring more warm clothes than you think. The arena is separate from camping — you'll walk 20+ mins each way. Bring snacks for late night.",
    nearbyTrips: "Liverpool is 30 minutes away — amazing nightlife, cheap accommodation, and a great city for a post-festival recovery day.",
    youtubePromoId: "7R2Fg_MbqgE",
    ticketUrl: "https://www.skiddle.com/festivals/creamfields/?utm_source=travelravers&utm_medium=affiliate&sktag=15628",
    flightsUrl: "https://www.skyscanner.net/transport/flights/anywhere/MAN/260821/260821/",
    hotelUrl: "https://www.booking.com/search.html?ss=Daresbury%2C+Cheshire&checkin=2026-08-22&checkout=2026-08-26",
  },
  {
    slug: "terminal-v",
    name: "Terminal V",
    country: "UK",
    city: "Edinburgh",
    dates: "Apr 18–19, 2026",
    genres: ["Techno", "Tech House", "Harder Styles", "Trance", "Underground Electronic"],
    vibe: "The final Terminal V in Edinburgh — warehouse techno in an industrial setting next to the airport",
    region: "uk",
    type: "city",
    capacity: 40000,
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "selling-fast",
    image: festivalTerminalV,
    coords: { lat: 55.9502, lng: -3.3616 },
    description:
      "Terminal V 2026 (Apr 18–19) is the final ever edition at the Royal Highland Centre, Ingliston — Edinburgh's famous warehouse techno weekender is moving to a new home after this year. Forty thousand people, six indoor and outdoor stages, 100+ artists across two days, and a completely sold-out crowd who know this is a chapter closing. The venue sits next to Edinburgh Airport — if you're flying in, you could almost walk from your gate to the gate. This is the send-off.",
    whyGo:
      "Terminal V is the UK's answer to warehouse techno done at real scale without the festival-muddy-field compromise. The Royal Highland Centre's mix of industrial indoor spaces and outdoor areas creates a genuinely unique energy — sweat-soaked inside one moment, cold Scottish air in your face the next. The 2026 edition carries the weight of being the last at this iconic venue. If you've been putting it off, this is the one.",
    travelTips:
      "Edinburgh Airport (EDI) is 1 km from the venue — if you fly in, it's a 10-minute walk. From the city centre, take the Edinburgh Tram from Princes Street or Haymarket to Ingliston Park & Ride (every 7 min, £1.80 single / £3.40 day return) — a free shuttle bus runs from the tram stop to the North Entrance. Trams run until ~2:30 AM on event nights. Alternatively, the Gyle Shopping Centre has a dedicated event shuttle. For trains: arrive at Waverley or Haymarket then connect via tram (~25–40 min total to venue). Do not rely on taxis at 11 PM — surge pricing and 30–60 min waits. Plan your return before you go in.",
    accommodation:
      "Edinburgh city centre (Old Town, New Town, Grassmarket) is the best base for the full experience — great food, nightlife, easy tram links to the venue. Haymarket is the smartest zone: major tram stop with direct service to Ingliston, close to the train station if arriving from Glasgow, and slightly cheaper than Old Town. Hotels near Edinburgh Airport (Holiday Inn, Marriott) are closest to the venue and eliminate late-night transport stress — but book very early, these sell out for Terminal V weekends. City hostels on the Royal Mile suit solo budget travellers.",
    packingHighlights: [
      "Warm mid-layer (fleece or hoodie) plus a compact waterproof jacket — Scottish April outdoors is 8–12°C with wind",
      "Broken-in trainers with good cushioning — up to 11 hours on hard concrete and warehouse floors",
      "High-fidelity earplugs (Loop or Alpine) — six stages of heavy sound systems across two days",
      "Small bag no larger than A4 size — anything bigger will be turned away at the gate",
      "Portable phone charger (fully charged) — signal is poor with 40,000 people on site",
      "Debit or credit card only — the event is fully cashless, no ATMs on site",
      "Valid photo ID (passport or driving licence) — strictly 18+, no exceptions",
      "Hat and thin gloves for outdoor areas — temperatures can drop to 4–6°C after dark",
      "Lip balm and ibuprofen/paracetamol — cold wind and long days take a toll",
      "Small packet of tissues — portaloo supplies run low by evening",
    ],
    survivalTips:
      "Gates open at midday — arrive 12–2 PM to avoid the worst entry queues. Last entry is 5 PM, no exceptions. Once you're in, there is strictly no re-entry. The event is fully cashless (card only). Indoor stages get hot and sweaty; stepping outside or queuing between stages will chill you fast — keep a jacket accessible, not in a locker. Pre-book digital lockers through Charge Candy before the event (they sell out). Food vendors close at 10:45 PM. Bars close at 10:30 PM. Arrange a physical meeting point with your group before you enter — phone signal in large indoor spaces with 40,000 people is unreliable.",
    survivalIntelBullets: [
      "Last entry 5 PM — no exceptions, regardless of ticket. Arrive by 2 PM at the latest",
      "No re-entry: once you leave, you're out. Sort everything before going in",
      "Fully cashless — card only. No ATMs on site",
      "Bag must be A4 size or smaller — standard backpacks turned away at the gate",
      "Tram + free shuttle is the most reliable return option; runs until ~2:30 AM",
      "Pre-book Charge Candy lockers online — they sell out before the event",
      "Indoor stages get hot, outdoor queues get cold — layer that you can remove and retie at the waist",
    ],
    nearbyTrips:
      "Edinburgh is a world-class city — spend the weekend properly. The Old Town, Cowgate after-parties, Arthur's Seat, and Leith's bar and restaurant scene are all worth your time. Glasgow is 50 minutes by train if you want to extend the Scottish trip. The Pentland Hills are a 20-minute bus ride for a Sunday recovery walk.",
    youtubePromoId: "dfOJuFQu9MI",
    environmentRisks: [
      "Cold and windy April Scottish weather — daytime highs 8–12°C, dropping to 4–6°C at night in outdoor areas and queues",
      "Sharp temperature swings between hot indoor stages and cold outdoor areas — easy to overheat inside and get chilled immediately outside",
      "Long hours on hard concrete and warehouse floors — up to 11 hours per day with limited seating",
      "Crowded indoor spaces with strobe lighting and heavy bass — sensory overload risk for first-timers",
      "No re-entry policy — cannot leave to warm up, rest, or retrieve forgotten items from your accommodation",
    ],
    faqs: [
      {
        q: "Is Terminal V mostly indoors or outdoors, and how cold does it get?",
        a: "Primarily indoor warehouse stages with some outdoor areas for food, bars, and at least one outdoor stage. April in Edinburgh means daytime highs of 8–12°C and nights dropping to 4–6°C with wind chill. Indoor stages get hot from body heat; outdoor areas and queues are cold, especially after dark. Layer accordingly — you'll be going between both all day.",
      },
      {
        q: "Is it better to stay near Edinburgh Airport or in the city centre?",
        a: "Near the airport is most convenient for the venue (walkable) and eliminates late-night transport stress — but it's quiet with no nightlife or after-parties. City centre (especially Haymarket) gives you the full Edinburgh experience with easy tram links to the venue, plus access to after-parties. For a first-timer, Haymarket is the best balance — direct tram to the venue, cheaper than Old Town, train connections if coming from Glasgow.",
      },
      {
        q: "How do I get back from Royal Highland Centre late at night?",
        a: "Music ends at 11 PM. Extended tram services run from Ingliston Park & Ride until ~2:30 AM; the free shuttle bus connects the venue to the tram stop. Replacement night buses cover Waverley and surrounding areas after trams stop. Uber and local cabs are available but expect surge pricing and 30–60 minute waits after 11 PM. Have a plan before you go in — do not wing it at the exit.",
      },
      {
        q: "What's the bag policy and can I bring a small backpack?",
        a: "Small bags only — nothing larger than A4 size. Standard backpacks will be refused at the gate. A small crossbody bag, bum bag, or drawstring pouch is your best bet. All bags are searched on entry.",
      },
      {
        q: "Is there a cloakroom or lockers?",
        a: "Yes, both are available on-site. Digital lockers are beside Charge Candy in the outdoor area — pre-purchase online (strongly recommended, they sell out before the event). There is also a staffed cloakroom.",
      },
      {
        q: "Is Terminal V safe for solo ravers?",
        a: "Yes. Terminal V has a strong community atmosphere and experienced security and welfare teams. Keep valuables in front zipped pockets, pre-plan your transport home, and locate the Info Point and medical/welfare areas when you arrive. Many people attend solo — the crowd is welcoming.",
      },
      {
        q: "What time should I arrive and when is last entry?",
        a: "Gates open at midday. Arrive between 12–2 PM to avoid the worst entry queues. Last entry is 5 PM — if you arrive after that, you will not be admitted regardless of having a ticket.",
      },
      {
        q: "Can I leave and come back in?",
        a: "No — there is strictly no re-entry. Once you leave the festival site you cannot return. Make sure you have everything you need before entering, and pre-book lockers if you want to store items.",
      },
      {
        q: "Is this really the last Terminal V in Edinburgh?",
        a: "Yes. The April 2026 edition is confirmed as the final Terminal V at the Royal Highland Centre, Ingliston. The festival is moving to a new site after this. Expect a special, emotionally charged atmosphere — and a completely sold-out crowd.",
      },
      {
        q: "Do I need cash or can I pay by card?",
        a: "Terminal V is fully cashless. You need a debit or credit card for all food, drink, cloakroom, and locker transactions. There are no cash points on site.",
      },
    ],
  },
  {
    slug: "edc-las-vegas",
    name: "EDC Las Vegas",
    country: "USA",
    city: "Las Vegas, Nevada",
    dates: "May 15–17, 2026",
    genres: ["EDM", "House", "Techno", "Trance", "DnB", "Hardstyle", "Tech House", "Melodic Techno"],
    vibe: "Mega EDM carnival",
    region: "global",
    type: "city",
    firstTimerFriendly: false,
    budgetLevel: "big-trip",
    status: "on-sale",
    image: festivalEdc,
    description: "The electric carnival. Three nights of non-stop music under the Nevada desert sky — 8 stages, carnival rides, art installations, and 160,000 ravers from dusk till dawn, 7pm to 5:30am.",
    whyGo: "EDC Vegas is a bucket-list festival that runs entirely at night under open desert skies, with the most spectacular production on Earth: 500ft kinetic stages, fire-breathing art cars, carnival rides between sets, and a crowd that genuinely feels like another planet. If you can handle a transatlantic trip and a fully flipped sleep schedule, this is worth every penny.",
    travelTips: "Fly into Harry Reid International (LAS), 20 miles south of the Las Vegas Motor Speedway. Direct flights from London Heathrow on BA and Virgin — book 3–6 months out for £400–600 return. UK visitors need an ESTA ($21 USD, apply weeks in advance). Official EDC Shuttles are the best transport option: standard passes (~£155–170 return) depart from four Strip stops (The Rio, The Strat, World Market Center, Mid-Strip) from 6:30pm with returns from 2am. Premier passes (~£260–280) add guaranteed departure slots and shorter security queues. Rideshare surges to $80–150+ each way at peak hours — avoid unless necessary. Camp EDC (on-site) eliminates all transit hassle entirely.",
    accommodation: "Stay on the Las Vegas Strip for the full experience — pool parties, EDC Week club events, and all shuttle stops are here. Mid-Strip picks: Horseshoe, Flamingo, Cosmopolitan. Budget option: Downtown Las Vegas (Fremont Street) is cheaper and close to the World Market Center shuttle stop. Camp EDC on-site (AC ShiftPods sleeping up to 4, from ~£350 for 4 nights) is the most social option and eliminates all commute anxiety — book alongside your festival ticket as it sells out fast.",
    packingHighlights: [
      "Hydration pack (max 2 main compartments + 1 small pocket, must arrive empty) — your most important item",
      "Electrolyte sachets (Liquid IV, Pedialyte) — mix into water all day; desert dehydration is the #1 medical issue",
      "Broken-in shoes with cushioned insoles — 15,000–25,000+ steps per night on concrete",
      "Dust mask or bandana — fine desert particulate is constant, especially on windy nights",
      "High-fidelity earplugs (Loop, Eargasm, Etymotic) — bass stages exceed 100 dB; protect your hearing",
      "Lightweight hoodie or windbreaker — ties around your waist; can feel cold by 4am after sweating all night",
      "Portable charger 10,000+ mAh — poor signal means your phone constantly searches and drains fast",
      "Sunscreen SPF50+ — essential for EDC Week pool parties, Camp EDC daytime, and walk to/from shuttles",
      "Valid photo ID — 18+ for general admission; 21+ US licence or passport required for VIP and alcohol",
      "Nasal naloxone (Narcan) — explicitly permitted through security and can save a life",
    ],
    survivalTips: "Flip your sleep schedule before you arrive: EDC runs 7pm–5:30am, so target sleeping 7am–3pm each day. Hydrate aggressively all day, not just at the festival — free water refill stations are marked with a water droplet symbol on the EDC app. Set a physical meeting point with your group for each night because phone signal is nearly useless with 160,000+ people on-site. Arrive early Night 1 for the 5pm Opening Ceremony at Cosmic Meadow — the grounds are less crowded and it sets the tone. Budget: meals inside run £12–20, drinks £9–15; eat before entering to save money and energy. Shuttle queues peak 6:30–8pm inbound and 4:30–5:30am outbound — Premier pass or staying until sunrise beats the worst of it.",
    nearbyTrips: "You're in Las Vegas — Grand Canyon day trip, world-class pool parties, and Strip clubs fill the days between festival nights. Many ravers extend to a full week. Stack with a California road trip: LA is a 4-hour drive, Joshua Tree National Park is 3 hours.",
    youtubePromoId: "d4XUm5Ul2gc",
    ticketUrl: "https://lasvegas.electricdaisycarnival.com/tickets/",
    flightsUrl: "https://www.skyscanner.net/transport/flights/anywhere/LAS/260515/260515/",
    hotelUrl: "https://www.booking.com/search.html?ss=Las+Vegas%2C+Nevada&checkin=2026-05-15&checkout=2026-05-18",
    survivalIntelBullets: [
      "Water refill stations are free throughout the venue — look for the water droplet symbol on the EDC app. Never pay for water.",
      "Ground Control staff (purple shirts) carry radios and first-aid supplies and are trained to help anywhere on-site.",
      "The Oasis is a dedicated safe space inside the festival with trained mental health counsellors if you're overwhelmed or anxious.",
      "All on-site medical care is FREE. You will not be arrested or ejected for seeking help. A friend can accompany you.",
      "Download the EDC app and screenshot set times + venue map before entering — you will have zero usable signal when you need them most.",
    ],
    travelAdviceInfo: {
      airport: "Harry Reid International (LAS) — 20 miles south of Las Vegas Motor Speedway",
      flightCost: "£400–600 return from London (direct BA/Virgin, book 3–6 months ahead)",
      transferOptions: "Official EDC Shuttle from Strip hotels (£155–280 return). Rideshare surges to $80–150+ each way — avoid. Camp EDC guests walk in direct via dedicated entrance.",
      totalJourney: "~11 hrs door-to-door from UK (9hr flight + immigration + 30min Strip transfer). ESTA required ($21 USD — apply weeks in advance).",
    },
    accommodationTiers: {
      budget: "Off-Strip motels (Ellis Island, Desert Rose) from ~£80/night. Downtown Grand, Fremont Street from ~£100/night. Camp EDC ShiftPods from ~£350 for 4 nights all-in.",
      midRange: "Flamingo, Horseshoe, The Strat: £150–200/night. Split a suite with friends to cut costs significantly.",
      premium: "Cosmopolitan, Aria, Wynn from £300+/night. Hotel EDC at Virgin Hotels (all-inclusive themed package) from ~£1,000/person for 3 nights.",
      bookingTip: "Book alongside your festival ticket — Strip hotels during EDC weekend sell out 3–4 months ahead. Camp EDC is the best-value option for solo travellers.",
    },
    environmentRisks: [
      "Desert heat — daytime highs in May regularly exceed 38°C (100°F); nighttime lows can still sit around 21–27°C (70–80°F) in the early evening.",
      "Dust and sand — fine particulate desert dust is constant, especially in windy conditions; it coats everything and irritates airways. A dust mask or bandana is non-negotiable.",
      "Extreme temperature swings — pre-dawn hours (4–6am) can drop sharply, leaving you cold after sweating all night. Bring a lightweight layer.",
      "Very late hours — music runs roughly 7pm to 5:30am each night; cumulative sleep deprivation across three nights is a real risk.",
      "Dehydration and heat illness — dehydration is the #1 medical issue at EDC. Symptoms: dizziness, nausea, headache, pale or clammy skin. Move to shade, hydrate, and seek a medical tent immediately.",
      "Long walking distances — expect 15,000–25,000+ steps per night just moving between stages on concrete and asphalt. Blisters end festivals early.",
      "Crowd density — peak attendance exceeds 160,000 per night; headliner stages are extremely dense. Agree on exit strategies before entering any large crowd.",
    ],
    faqs: [
      {
        q: "Is it safe to camp at EDC Las Vegas as a solo traveller?",
        a: "Yes. Camp EDC has 24/7 security, a strong community vibe, and many solo travellers. Moon Glow ShiftPod tents sleep up to 4, so you can split with others you meet on-site. The dedicated festival entrance eliminates all shuttle and traffic stress — many first-timers consider it the safest and most social option.",
      },
      {
        q: "How bad is the heat and dust really?",
        a: "Daytime highs in mid-May regularly exceed 38°C (100°F). By festival time (7pm onward) it cools, but early evening can still be 27–32°C. Dust is fine and constant — it coats everything and irritates airways. A hydration pack, dust mask or bandana, and electrolytes are non-negotiable. By 4am, temperatures can drop to ~15°C, so bring a lightweight layer.",
      },
      {
        q: "Are shuttles worth it vs. driving or rideshare?",
        a: "For most first-timers, yes. Official EDC shuttles use a dedicated route that bypasses regular traffic and drop you directly at the festival gates. Driving means dealing with 1–2 hour exit queues at 5am and costly parking. Rideshare surge pricing often exceeds the cost of a round-trip shuttle pass for just one night. Premier passes are worth the upgrade for guaranteed departure slots and shorter queues.",
      },
      {
        q: "What is the bag policy? Can I bring a hydration pack?",
        a: "Yes — hydration packs are allowed with a maximum of two main compartments and one smaller pocket. They must be completely empty on entry. Clear bags up to 12\"x6\"x12\" are permitted, as are small non-clear clutch bags up to 6\"x9\". No large backpacks or multi-compartment bags beyond these specs.",
      },
      {
        q: "What time do sets end and how late do shuttles run?",
        a: "Music at the main stage (Kinetic Field) typically ends around 5:00–5:30am each night. Other stages may close slightly earlier. Standard return shuttles begin at 2am and run until ~60 minutes after Kinetic Field closes (roughly 6am). Premier return shuttles have fixed slots at 3am, 4:30am, and 6am. No shuttles run between 11pm and 2am.",
      },
      {
        q: "What should I do if I lose my phone or get separated from friends?",
        a: "Before entering each night: agree on a physical meeting point (a specific art installation or landmark) and scheduled check-in times. Write key phone numbers on your arm in permanent marker as a backup. If you lose your phone, head to the Info Booth or Lost & Found. Ground Control staff (purple shirts) can also relay messages to security or medical.",
      },
      {
        q: "Do I need to be 21 to attend EDC Las Vegas?",
        a: "No. General admission is open to anyone 18+. However, you must be 21+ with valid photo ID (US driver's licence or US/foreign passport) to enter VIP areas or purchase alcohol. Hotel EDC packages also require guests to be 21+.",
      },
      {
        q: "How much should I budget for the weekend beyond my ticket?",
        a: "Expect £12–20 per meal inside, £9–15 per drink, plus merchandise. Shuttle passes run ~£155–280. Strip hotels during EDC weekend average £150–300+/night. A realistic all-in budget beyond your ticket is £700–1,300 for a moderate experience, more if you plan EDC Week pool parties and club events.",
      },
      {
        q: "Is there phone signal inside the festival?",
        a: "Barely. With 160,000+ people, cell networks are completely overwhelmed. Texts may be delayed by minutes or not arrive at all. Download the EDC app, save the map and set times offline before arriving, and agree on analogue meeting plans with your group. A portable charger is essential as your phone will drain fast searching for signal.",
      },
      {
        q: "Can I leave the festival and re-enter the same night?",
        a: "Yes, re-entry is allowed with a valid wristband — you'll go through full security again. Camp EDC guests have a dedicated in/out entrance. If you're on standard shuttles, note they do not run between 11pm and 2am, so plan your exit and re-entry window carefully.",
      },
    ],
  },
  {
    slug: "ultra-europe",
    name: "Ultra Europe",
    country: "Croatia",
    city: "Split",
    dates: "Jul 10–12, 2026",
    genres: ["EDM", "House", "Techno", "Progressive"],
    vibe: "Beach festival",
    region: "eu",
    type: "beach",
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalUltra,
    description: "Three days of electronic music on the stunning Croatian coast. Ultra Europe combines world-class DJs with beach parties, boat parties, and Mediterranean sunshine.",
    whyGo: "Ultra Europe is the perfect festival-holiday hybrid. You get A-list DJs (Martin Garrix, Tiësto, Fisher) in a beautiful Croatian setting, with beach parties and island-hopping built into the week. The Destination Ultra package extends the experience across the Dalmatian coast.",
    travelTips: "Fly into Split Airport (SPU). Budget airlines run from most UK airports in summer. The main festival venue (Poljud Stadium) is walkable from the city centre. Ferries run to Hvar and Vis for the island events.",
    accommodation: "Hostels in Split's old town are cheap and cheerful. Airbnbs are good value if you book early. The Destination Ultra packages include accommodation. Camping isn't really a thing here — it's a city/beach festival.",
    packingHighlights: ["Swimwear (beach parties daily)", "Sun cream (factor 50+)", "Light breathable clothing", "Waterproof phone case", "Comfortable sandals + dancing shoes", "Travel towel"],
    survivalTips: "Hydration is critical in Croatian summer heat (35°C+). The beach parties run during the day, main festival at night — you'll be going from noon to 4am. Pace yourself. Croatian tap water is safe to drink. Learn basic Croatian — locals appreciate it.",
    nearbyTrips: "Hvar island is a must — world-class beach clubs and nightlife. Vis island for a quieter escape. Dubrovnik is 4 hours south by bus. Many ravers do a full Adriatic coast trip around the festival.",
    youtubePromoId: "Ku0TR4rvYTk",
  },
  // ── UK additions ──
  {
    slug: "latitude-festival",
    name: "Latitude Festival",
    country: "UK",
    city: "Southwold, Suffolk",
    dates: "Jul 17–20, 2026",
    genres: ["Indie", "Electronic", "Folk", "Comedy", "Arts"],
    vibe: "Boutique Suffolk weekend in the woods",
    region: "uk",
    type: "camping",
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalCamping,
    description: "Four days of music, comedy, theatre, and spoken word in the ancient Henham Park estate in Suffolk. Latitude is the UK's most civilised festival — smaller, friendlier, and genuinely diverse in what it offers beyond the main stage.",
    whyGo: "Latitude is the antidote to mega-festival fatigue. At 40,000 people it's intimate enough to feel personal — you can get close to the stage, the queues are manageable, and the wooded site around Henham Park lake is genuinely beautiful. The lineup mixes big indie and electronic acts with comedy tents, poetry stages, film screenings, and theatre — so if the headliner doesn't land, there's always something brilliant happening elsewhere. It's also reliably good for first-timers who want a proper UK camping festival without the full chaos of larger events.",
    travelTips: "Halesworth is the nearest train station — roughly 2 hours from London Liverpool Street with a change at Ipswich. Official shuttle buses run from Halesworth station directly to the site. National Express coaches run from London Victoria. By car, the A12 is the main route; official car parks are a short walk from the campsite entrance. Southwold itself is a 20-minute drive from the site.",
    accommodation: "General camping is well-organised and the wooded sections offer natural shelter. The Tipi Village and Latitude Boutique Camping options sell out fast — book them at the same time as your ticket if comfort is a priority. The site is relatively compact compared to other UK festivals so no campsite is a bad walk from the arena.",
    packingHighlights: ["Waterproof jacket (Suffolk July can surprise you)", "Wellies or sturdy boots for the wooded terrain", "Warm layers for evenings by the lake", "Reusable coffee cup (the coffee traders here are genuinely good)", "Cash for the independent food traders", "Head torch", "Small day bag — the site rewards wandering"],
    survivalTips: "The lake stage is the highlight of the site — get there early for a good spot on the grass bank for evening headliners, as it fills up quickly. Don't sleep on the comedy and spoken word tents; some of the best moments at Latitude happen away from the music. The woods between stages are worth exploring — there are often surprise performances and art installations tucked in. Shuttle buses back to Halesworth stop running around midnight, so plan your last day exit in advance.",
    nearbyTrips: "Southwold is one of England's most charming seaside towns — fish and chips on the pier, Adnams brewery, and proper Suffolk beach. Aldeburgh is 30 minutes south for the famous fish and chip shop on the seafront. Snape Maltings concert hall is worth a visit if you arrive a day early. Ipswich is the nearest city for flights home.",
    youtubePromoId: "EvGppr2d4A4",
  },
  {
    slug: "boomtown-fair",
    name: "Boomtown Fair",
    country: "UK",
    city: "Winchester, Hampshire",
    dates: "Aug 5–9, 2026",
    genres: ["Drum & Bass", "Reggae", "Ska", "Hip-Hop", "Techno", "Grime"],
    vibe: "Immersive city of music",
    region: "uk",
    type: "camping",
    firstTimerFriendly: false,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalCamping,
    description: "A genre-blending, story-driven festival set in the fictional city of Boomtown. Seven districts, each with its own architecture, characters, and sound — from underground techno in the Old Mines to reggae on Lion's Den.",
    whyGo: "Boomtown is unlike any other UK festival. It's a fully immersive theatrical experience that happens to have incredible music running through it. The attention to detail in every district — the costumes, the characters, the interactive storylines — means you'll discover something new every time you walk around the site. DnB, reggae, ska, techno, grime, live bands — it genuinely has everything.",
    travelTips: "Shuttle coaches from Winchester train station and Southampton Airport run throughout the festival. Winchester is well-connected from London Waterloo (1 hr). Driving in is possible with pre-booked parking — campervans have their own dedicated areas.",
    accommodation: "The camping areas are well-organised by vibe: Silent Disco area for those who want to sleep, 24-hour camping for those who don't. Book a campervan pitch for maximum comfort. Glamping pods are available but sell fast.",
    packingHighlights: ["Costume / fancy dress (everyone goes all in)", "Comfortable boots (the terrain is uneven)", "Waterproof jacket", "Power bank", "Cash for traders", "Small backpack for daily essentials"],
    survivalTips: "The Boomtown story is told in chapters across the weekend — pay attention to the clues and characters, it adds a whole extra layer. The Old Town district has the best late-night techno. Lion's Den is the reggae heartbeat. Avoid trying to plan too rigidly — wandering and discovering is half the point.",
    nearbyTrips: "Winchester is a beautiful English city worth an explore before the festival. Southampton is 20 minutes away for flights home.",
    youtubePromoId: "UzlcT14Tzag",
    ticketUrl: "https://www.skiddle.com/festivals/boomtown-fair/?sktag=15628",
    flightsUrl: "https://www.skyscanner.net/transport/flights/anywhere/SOU/260804/260804/",
    hotelUrl: "https://www.booking.com/search.html?ss=Winchester%2C+Hampshire&checkin=2026-08-05&checkout=2026-08-10",
  },
  {
    slug: "hospitality-in-the-park",
    name: "Hospitality in the Park",
    country: "UK",
    city: "London",
    dates: "Sep 5, 2026",
    genres: ["Drum & Bass", "Jungle", "Liquid DnB"],
    vibe: "London DnB day festival",
    region: "uk",
    type: "city",
    firstTimerFriendly: true,
    budgetLevel: "cheap",
    status: "on-sale",
    image: festivalTerminalV,
    description: "Hospital Records' annual outdoor festival in Finsbury Park. A one-day celebration of drum and bass culture in the heart of London, with two stages and the full Hospital artist roster.",
    whyGo: "Hospitality in the Park is the DnB community's annual gathering. Hospital Records — home of London Elektricity, Camo & Krooked, Logistics, and NU:Logic — fills two stages with the best liquid and neurofunk the scene has to offer. It's affordable, well-organised, and in a beautiful London park. Perfect as a first festival or a warm-up for bigger things.",
    travelTips: "Finsbury Park station (Victoria and Piccadilly lines) is directly outside the venue. No need to fly — this is as accessible as it gets. Arsenal station also works. The whole thing is walkable from North London.",
    accommodation: "It's London — use Airbnb, hotels, or crash with mates. Hostels near King's Cross are good value. The Travelodge Finsbury Park is basic but cheap and a 5-minute walk.",
    packingHighlights: ["Light layers (September can be warm or cool)", "Ear protection (DnB is loud)", "Comfortable trainers", "Power bank", "Contactless card (most traders are cashless)"],
    survivalTips: "Entry queues can be long at opening — arrive slightly after doors to skip the rush. The second stage usually has the deeper, more underground sets. Bring a bag for a jumper — temperatures drop after 6pm.",
    nearbyTrips: "You're in London — everything is a trip. Fabric is on the following Friday if you want to extend the DnB weekend.",
    youtubePromoId: "Hk4g6ggTyW0",
  },
  // ── EU additions ──
  {
    slug: "sonus-croatia",
    name: "Sonus Festival",
    country: "Croatia",
    city: "Novalja, Pag Island",
    dates: "Jun 4–8, 2026",
    genres: ["Techno", "Minimal Techno", "Deep Techno"],
    vibe: "Techno on a Croatian island",
    region: "eu",
    type: "beach",
    firstTimerFriendly: false,
    budgetLevel: "medium",
    status: "cancelled",
    image: festivalUltra,
    description: "Sonus Festival 2026 has been cancelled. The Zrce Beach club landscape changed significantly heading into 2026 — with Noa Beach Club, Papaya, and Aquarius all ceasing operations, the event could not be staged this year. Sonus remains one of the most iconic names in European techno festival culture and may return in future years. If you were planning a Zrce summer, Night Horizon Festival (Aug 16–21, 2026) is now the principal techno event at Zrce Beach, hosted at the newly redesigned LIFT Beach Club — the only remaining venue on the strip.",
    whyGo: "Sonus is where serious techno heads go when they want sun, sea, and proper underground music. The Zrce beach strip has hosted some of the most memorable sunrise sets in European electronic music — open-air venues, the Adriatic in front of you, and a lineup of underground techno and house heavyweights. Keep an eye on official channels for 2027.",
    travelTips: "Fly into Split or Zadar, then take a ferry to Pag Island (around 20 minutes). The Novalja Party Bus runs transfers between the island's entry point and Zrce beach. Book your ferry in advance during festival week.",
    accommodation: "Apartments in Novalja town are the standard — cheap, close to the beach, and most owners are used to festival guests keeping odd hours. Book through Airbnb or Booking.com at least 3 months out as options fill up fast. There is basic camping available near the beach.",
    packingHighlights: ["Sun cream SPF50+ (the stone reflects heat)", "Swimwear and flip flops", "Light festival outfit", "Earplugs", "Euros in cash (smaller bars are cash only)", "Sandals that you can actually dance in"],
    survivalTips: "The clubs don't get going until 2am and run until noon — plan your sleep accordingly. The stone beach is brutal without sandals in the heat of the day. Drink coconut water and eat ćevapi from the local spots to stay fuelled. The ferry back to the mainland has limited sailings — book your return in advance.",
    nearbyTrips: "Zadar is 90 minutes from Novalja and has a beautiful old town. Plitvice Lakes National Park is a 2-hour drive inland — a stunning recovery day out.",
    youtubePromoId: "w-jOO4SIQ28",
    replacedBy: { slug: "night-horizon", name: "Night Horizon Festival" },
  },
  {
    slug: "defected-croatia",
    name: "Defected Croatia",
    country: "Croatia",
    city: "Tisno",
    dates: "Jul 6–13, 2026",
    genres: ["House", "Deep House", "Soulful House", "Afro House"],
    vibe: "Boutique house music paradise",
    region: "eu",
    type: "beach",
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalUltra,
    description: "A week-long house music takeover at The Garden resort in Tisno. Defected brings its full label roster to the Adriatic coast — expect boat parties, open-air stages, and sunrise sets that blur into the next day.",
    whyGo: "Defected Croatia feels like someone turned a beautiful Croatian resort into a house music club and invited 3,000 people. It's intimate enough that you can get close to the stage, the vibes are warm and welcoming rather than intense, and the Defected label roster (Sam Divine, Simon Dunmore, Monki, David Penn) is consistently quality. The boat parties are a genuine highlight.",
    travelTips: "Fly into Split (1.5 hrs by bus to Tisno) or Zadar (45 min). The shuttle bus from Split Airport runs on festival arrival/departure days. Tisno is tiny — once you're in, everything is walkable.",
    accommodation: "On-site apartments and glamping are the dream option — book via the official site early. Otherwise Tisno village has plenty of private rooms. Šibenik (20 min away) has more hotel options.",
    packingHighlights: ["Swimwear (daily beach time is non-negotiable)", "Sun cream", "Light outfit for dancing", "Water shoes (for rocky beach entries)", "Travel towel", "Bug repellent (evenings near the water)"],
    survivalTips: "The boat parties sell out instantly — buy them the moment they go on sale, not on-site. The main stage runs until 6am but the after-hours area goes even later. Keep your wristband on at all times as security is thorough.",
    nearbyTrips: "Šibenik is a stunning medieval city 20 minutes away. The Krka National Park waterfalls are 40 minutes inland — a must for a recovery day. Trogir (near Split) is also worth an afternoon.",
    youtubePromoId: "pRJj3e_6aY8",
  },
  {
    slug: "kappa-futurefestival",
    name: "Kappa FuturFestival",
    country: "Italy",
    city: "Turin",
    dates: "Jul 10–13, 2026",
    genres: ["Techno", "House", "Industrial Techno", "EBM"],
    vibe: "Industrial techno in an Italian city",
    region: "eu",
    type: "city",
    firstTimerFriendly: false,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalTerminalV,
    description: "Turin's annual techno festival held in the Parco Dora, a repurposed industrial park. Kappa FuturFestival is one of Europe's most respected techno events — grimy, loud, and uncompromising, with a world-class lineup in an incredible setting.",
    whyGo: "Kappa is the anti-Tomorrowland. No fairy lights, no fantasy theming — just brutalist concrete, world-class sound systems, and some of the most intense techno lineups in Europe. Adam Beyer, Nina Kraviz, SPFDJ, and Rebekah in an actual decommissioned steel factory. The after-parties in Turin's clubs extend the experience deep into the following morning.",
    travelTips: "Fly into Turin Airport (TRN) or Milan Malpensa (MXP) — Milan is 1.5 hours by train and often cheaper. Turin city centre is just 15 minutes from the festival site by tram. The Dora industrial area is well-signposted from the main train station.",
    accommodation: "Turin city centre hostels and hotels are the best bet. The Barriera di Milano neighbourhood (closest to the festival) has cheaper Airbnbs. Book at least 2 months out — the festival fills Turin up.",
    packingHighlights: ["Earplugs (the sound levels are serious)", "Comfortable trainers", "Light jacket for night (Turin evenings can be cool)", "Power bank", "Italian cash (some bars prefer it)", "Sunglasses for daytime stages"],
    survivalTips: "The concrete festival site reflects heat during the day — stay in the shade and hydrate constantly. The night stages don't get going until midnight. Italian bureaucracy means bag checks are thorough — arrive early. The Dora stage is the main room and always the hardest.",
    nearbyTrips: "Turin is an underrated Italian city — the Egyptian Museum, the Royal Palace, and the world's best aperitivo hour. Milan is 1.5 hrs by train for a pre or post-festival city break.",
    youtubePromoId: "RLZUtPxB4jc",
  },
  {
    slug: "exit-serbia",
    name: "EXIT Festival",
    country: "Serbia",
    city: "Novi Sad",
    dates: "Jul 9–12, 2026",
    genres: ["Electronic", "Techno", "House", "Hip-Hop", "Rock", "Alternative"],
    vibe: "Fortress rave",
    region: "eu",
    type: "city",
    firstTimerFriendly: true,
    budgetLevel: "cheap",
    status: "on-sale",
    image: festivalTerminalV,
    description: "Four nights of music inside the 18th-century Petrovaradin Fortress overlooking the Danube. EXIT is one of Eastern Europe's biggest and most beloved festivals — massively diverse lineup, incredibly low prices, and genuinely electric atmosphere.",
    whyGo: "EXIT is one of Europe's best-kept secrets — the combination of a medieval fortress, world-class lineups, and Serbian prices makes it an absolute steal. You can go to EXIT for the cost of a weekend at a UK festival and get four nights of Tomorrowland-quality music. The fortress setting is dramatic, the crowds are passionate, and the Serbian hospitality is extraordinary.",
    travelTips: "Fly into Belgrade (BEG) — Ryanair and Wizz Air fly direct from most UK airports cheaply. Novi Sad is 1.5 hours from Belgrade by bus or train. Official festival shuttle buses run from Belgrade Airport. The fortress is a 20-minute walk from Novi Sad city centre.",
    accommodation: "Exit Official Camping is cheap and well-organised. For more comfort, guesthouses and hotels in Novi Sad city centre are extremely affordable — £30–50/night for a solid hotel. Belgrade is also a popular base with the bus connection.",
    packingHighlights: ["Sun cream (July in Serbia is very hot)", "Comfortable shoes for cobblestones", "Light layers for late nights", "Cash in Serbian Dinar (card acceptance is limited)", "Power bank", "Earplugs"],
    survivalTips: "Serbian Dinar is essential — exchange at the airport or in Novi Sad town centre (avoid airport rates). The mts Dance Arena (the main electronic stage) runs from midnight to 8am — it's relentless. The fortress cobblestones are murder on feet; comfortable shoes are non-negotiable. Try the local grilled meats — the ćevapi and pljeskavica stalls inside the festival are genuinely excellent.",
    nearbyTrips: "Novi Sad's old town and the fortress itself are worth exploring in daylight. Belgrade (1.5 hrs) is a must — one of Europe's best nightlife cities. The Fruška Gora national park is 30 minutes from the city for a nature day.",
    youtubePromoId: "tc_XP1X4INs",
  },
  {
    slug: "dimensions-croatia",
    name: "Dimensions Festival",
    country: "Croatia",
    city: "Pula, Istria",
    dates: "Sep 3–7, 2026",
    genres: ["Techno", "House", "Experimental", "Jungle", "Ambient"],
    vibe: "Boutique techno in a Roman fortress",
    region: "eu",
    type: "camping",
    firstTimerFriendly: false,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalCamping,
    description: "Five days of underground electronic music in the Fort Punta Christo, a 19th-century Austro-Hungarian fortress on the Adriatic coast. Dimensions is the thinking raver's festival — curious, eclectic, and deeply atmospheric.",
    whyGo: "Dimensions is special. The setting — a crumbling stone fortress by the sea, lit at night by the moon and a few carefully placed lights — creates an atmosphere that purpose-built festival sites simply can't manufacture. The programming is genuinely adventurous: expect leftfield techno, forgotten jungle classics, ambient installations, and live acts you've never heard of sitting next to names you know. It attracts a knowledgeable, passionate crowd.",
    travelTips: "Fly into Pula Airport (PUY) — budget airlines run from London Stansted and Manchester in summer. The festival shuttle from Pula city centre takes 20 minutes. Ferries from Venice and Ancona arrive at Pula port if you want a sea crossing.",
    accommodation: "On-site camping is part of the experience — sea views from your tent. The fortress walls provide natural shelter from wind. Glamping options are available. Pula city has hotels and apartments if you prefer off-site comfort.",
    packingHighlights: ["Sleeping bag (September nights by the sea are cool)", "Comfortable footwear for stone and uneven ground", "Layers for the unpredictable Adriatic weather", "Head torch for navigating the fort at night", "Earplugs for sleep (music runs 24 hours)", "Sun cream for daytime"],
    survivalTips: "The fort's stone surfaces retain heat during the day but cool dramatically at night — layers are essential. The ambient and experimental stages in the deeper tunnels are worth finding; not everyone makes it past the main area. Phone signal is poor inside the fortress. The sunrise at the coastal stage is one of festival culture's great moments.",
    nearbyTrips: "Pula's Roman Amphitheatre is stunning — one of the best-preserved in the world. Rovinj (45 min) is a beautiful Venetian coastal town for a recovery day. The Brijuni islands are accessible by boat.",
    youtubePromoId: "3KKmcyERj34",
  },
  {
    slug: "mystic-garden-amsterdam",
    name: "Mystic Garden Festival",
    country: "Netherlands",
    city: "Amsterdam",
    dates: "Jul 4, 2026",
    genres: ["Progressive House", "Melodic Techno", "Trance"],
    vibe: "Fairytale one-day outdoor festival",
    region: "eu",
    type: "city",
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalTomorrowland,
    description: "A one-day outdoor festival in the Amsterdamse Bos, combining forest aesthetics with melodic house and techno. Mystic Garden is Amsterdam's most visually striking day festival, with multiple stages set among the trees.",
    whyGo: "Mystic Garden is an easy win — one day, no camping, no complex logistics, but genuinely great melodic house and techno in a beautiful forest setting near Amsterdam. It makes a perfect add-on to a city trip and the production design (forest stages, canopy lighting, art installations) punches well above its weight for a single-day event.",
    travelTips: "Fly into Amsterdam Schiphol (AMS) — one of Europe's best-connected airports. The Amsterdamse Bos is accessible by bike from Amsterdam city centre in 30 minutes. Buses run from Amsterdam Amstel station. Eurostar from London to Amsterdam is 3.5 hours and often cheaper than flying.",
    accommodation: "Amsterdam has everything — luxury hotels, design hostels, Airbnbs. Stay in the Jordaan or De Pijp neighbourhoods for the best atmosphere. Book well in advance as Amsterdam hotels fill up fast and are expensive last-minute.",
    packingHighlights: ["Light jacket (Amsterdam weather is unpredictable)", "Comfortable dancing shoes", "Sun cream", "Portable charger", "Euro cash for food stalls", "Bike lock if cycling"],
    survivalTips: "The festival is one day so there's no pacing required — go hard. The forest paths between stages can be muddy after rain; comfortable shoes rather than sandals. Amsterdam has strict open container laws outside festival grounds — respect them. Download the maps before you go, phone signal in the woods is weak.",
    nearbyTrips: "Amsterdam itself is the trip — the canal rings, the Rijksmuseum, the Jordaan neighbourhood. Rotterdam (1 hr by train) has a world-class club scene for an evening extension. Utrecht is 30 minutes and worth a few hours.",
    youtubePromoId: "Xva1gxyubKQ",
  },
  // ── Global additions ──
  {
    slug: "movement-detroit",
    name: "Movement Detroit",
    country: "USA",
    city: "Detroit, Michigan",
    dates: "May 23–25, 2026",
    genres: ["Techno", "House", "Minimal / Deep Tech", "Electro", "Jungle / DnB", "Experimental Electronic"],
    vibe: "Pilgrimage to techno's birthplace",
    region: "global",
    type: "city",
    firstTimerFriendly: false,
    budgetLevel: "big-trip",
    status: "on-sale",
    image: festivalEdc,
    description: "The world's premier techno festival, held every Memorial Day weekend at Hart Plaza — Isamu Noguchi's concrete riverfront plaza in Downtown Detroit, on the banks of the Detroit River. Six stages across three days, from the Movement Main Stage to the underground tunnels, built on the ground where techno was born.",
    whyGo: "If techno matters to you, you owe it to yourself to go to Movement. This is ground zero — the city of Derrick May, Juan Atkins, Kevin Saunderson, and Robert Hood. Standing in Hart Plaza listening to Detroit techno as the sun goes down over the river is a spiritual experience. The lineup balances Detroit heritage acts with the best international names, and the whole city comes alive for the weekend with official afterparties in legendary clubs and the broader Movement ecosystem of events across Greektown and Eastern Market.",
    travelTips: "Fly into Detroit Metropolitan Wayne County Airport (DTW), 20 miles / 30 minutes southwest of Downtown. UK visitors need an ESTA ($21 USD — apply weeks ahead). From DTW, rideshare to downtown costs ~$35–50. Once downtown, most hotels are within a 5–10 minute walk of Hart Plaza. The Detroit People Mover (free elevated rail) runs a loop connecting the Financial District station — steps from Hart Plaza — to Greektown, Brickell City Center, and hotel districts; extended weekend hours until 1am Saturday/Sunday. The QLINE streetcar runs free along Woodward Avenue connecting Midtown to Congress Street near Hart Plaza. Rideshare works but surges at midnight close — designate a pickup spot on Jefferson Ave away from the main exit crush.",
    accommodation: "Downtown Detroit / Renaissance Center is the optimal base — a 5–10 minute walk to Hart Plaza and in the People Mover loop. Greektown (10–15 min walk) is lively with afterparty venues and People Mover access. Midtown is more affordable and near QLINE, but 1.5–2 miles from Hart Plaza (rideshare needed at night). Corktown is the most authentic Detroit neighbourhood with great food and bars, but 1.5+ miles out with no direct transit — mostly Airbnb options. Book Downtown or Greektown as early as possible — Memorial Day weekend clears out fast.",
    packingHighlights: [
      "High-fidelity earplugs (Eargasm, Loop, or custom moulds) — sustained levels near stages exceed 100 dB; three days unprotected risks permanent hearing damage",
      "Comfortable broken-in trainers with cushioned insoles — concrete plaza for 8–10 hours per day across three days",
      "Packable layers: sun hat + SPF50 sunscreen for afternoon exposure, hoodie or light jacket for evening river wind, compact poncho for rain (roughly 40% chance any day)",
      "Portable charger (10,000+ mAh) — essential for afterparty navigation, rideshare, and group coordination after midnight",
      "Small clear bag, fanny pack, or running belt — keeps hands free and reduces pickpocket risk at dense stages",
      "Refillable water bottle or empty hydration pack (plastic only, no glass) — free water refill stations available inside",
      "Sunglasses for afternoon stages and blowing dust on the plaza",
      "Blister plasters and ibuprofen — your feet and knees will need them by Day 2",
    ],
    survivalTips: "The festival is primarily cashless — load money onto your Movement RFID wristband via the app before you arrive to skip bar queues. Re-entry is allowed throughout the festival with your wristband scan, so you can return to your hotel to recharge mid-day, especially on the Monday. Rent a locker inside to stash layers and extras and move freely between stages. Plan your afterparties vs. sleep carefully — official afterparties run until 4–6am, but gates open at 2pm each day; doing all three nights of afters plus full festival days will wreck you by Monday. Grab a Coney Island hotdog from Lafayette or American Coney Island at 3am — it's a Detroit ritual. Explore all six stages, not just the Main Stage — the Underground and smaller stages consistently have the best Detroit techno sets with smaller, more engaged crowds.",
    nearbyTrips: "Detroit's Eastern Market on Saturday morning is a Detroit institution — one of North America's oldest and largest public markets. The Motown Museum on West Grand Boulevard is essential. The Detroit Institute of Arts is world-class. Windsor, Canada is less than a mile via the Detroit-Windsor Tunnel — bring your passport for cross-border afterparty options (Canadian clubs often go later). Toronto is 4 hours by car for an extended club-city trip.",
    youtubePromoId: "Dx-XWvQmz-A",
    flightsUrl: "https://www.skyscanner.net/transport/flights/anywhere/DTW/260522/260522/",
    hotelUrl: "https://www.booking.com/search.html?ss=Downtown+Detroit%2C+Michigan&checkin=2026-05-22&checkout=2026-05-26",
    coords: { lat: 42.3314, lng: -83.0458 },
    capacity: 30000,
    survivalIntelBullets: [
      "Load your RFID wristband via the Movement app before arriving — the festival is primarily cashless and bar queues are long for people topping up on-site.",
      "Re-entry is allowed — scan out and back in freely all three days. Use this to rest at your hotel between afternoon and evening sets.",
      "People Mover (free) runs to Financial District station steps from Hart Plaza until 1am Saturday and Sunday — the most reliable late-night exit option.",
      "Official afterparties from Paxahau and other Detroit promoters sell out early — buy tickets before the festival weekend, not when you arrive.",
      "If crossing to Windsor, Canada for after-hours events, your passport is required at the Detroit-Windsor Tunnel border — do not attempt the crossing without it.",
    ],
    travelAdviceInfo: {
      airport: "Detroit Metropolitan Wayne County Airport (DTW) — 20 miles / ~30 min drive southwest of Downtown",
      flightCost: "£450–700 return from London (Delta/Virgin direct to DTW, book 2–4 months ahead)",
      transferOptions: "Rideshare from DTW to downtown ~$35–50. Once downtown: People Mover (free, until 1am Sat/Sun) or walk from most hotels to Hart Plaza in 5–10 min.",
      totalJourney: "~9 hrs door to door from UK (8.5hr flight + immigration + 30min downtown transfer). ESTA required ($21 USD — apply weeks in advance).",
    },
    accommodationTiers: {
      budget: "Midtown Detroit: Airbnbs from ~£80/night, good restaurant scene, QLINE streetcar access. Corktown: Airbnbs from ~£70/night, authentic neighbourhood but rideshare-dependent.",
      midRange: "Greektown hotels from ~£130/night — People Mover access and walking distance to Hart Plaza and afterparty venues.",
      premium: "Detroit Marriott Renaissance Center £200–300+/night — literally on the riverfront, 5 min walk to Hart Plaza. MotorCity Casino Hotel from £180/night.",
      bookingTip: "Book Downtown or Greektown at least 3 months ahead — Memorial Day weekend sells out fast and prices spike sharply in the final weeks.",
    },
    environmentRisks: [
      "Hart Plaza is almost entirely concrete, steel steps, and hard surfaces — foot, knee, and back fatigue across three 8–10 hour days is significant.",
      "Variable late-May weather: average highs 20–23°C (68–74°F), lows around 10°C (50°F), with a roughly 40% chance of rain on any given day.",
      "Wind off the Detroit River can make evenings feel significantly colder than the air temperature — layers are essential even on warm afternoons.",
      "Very loud sound levels near stages, especially the Underground Stage — sustained exposure above 100 dB is common.",
      "The festival runs rain or shine with no cancellations for weather; attendees must be prepared for sudden downpours.",
    ],
    faqs: [
      {
        q: "Is it safe to stay downtown near Hart Plaza?",
        a: "Yes. Downtown Detroit is well-patrolled during Memorial Day weekend with extra police and festival security. Stick to main streets — the Renaissance Center, Greektown, and the Riverwalk are busy and safe throughout the festival. Travel in groups at night and avoid poorly lit side streets. The narrative around Detroit's safety has changed significantly in recent years; the downtown core is genuinely safe for festival attendees.",
      },
      {
        q: "How do I get back to my hotel after midnight without a car?",
        a: "Rideshare (Uber/Lyft) is the most common option — set your pickup point a block or two from the main exit on Jefferson Ave to avoid surge pricing and the exit crush. The People Mover runs until 1am on Saturday and Sunday. For afterparties, pre-book a rideshare or taxi ahead of time. Walking is fine if your hotel is within a mile and you stick to lit streets.",
      },
      {
        q: "What is Movement's re-entry policy?",
        a: "Re-entry is allowed throughout festival hours with your RFID wristband. Weekend pass holders can enter and exit freely all three days. Single-day pass holders can re-enter on their ticketed day only. You must scan your wristband out every time you leave and back in on return — security bag check and metal detector apply on every entry.",
      },
      {
        q: "How loud is it really, and do I need professional earplugs?",
        a: "Very loud — sustained levels of 95–110 dB near the main and Underground stages are typical. Standard conversation is about 60 dB. High-fidelity earplugs (Loop, Eargasm, or custom moulds) are strongly recommended; they reduce volume evenly without muffling the music. Foam plugs work in a pinch but muffle high frequencies and kill the sound quality. Three days of unprotected exposure at these levels risks permanent hearing damage.",
      },
      {
        q: "Can I bring a hydration pack or outside water into the festival?",
        a: "Yes — empty plastic hydration packs (like CamelBaks) and empty plastic water bottles are allowed through security. No glass containers. Free water refill stations are available inside GA and VIP areas. One sealed water bottle (500ml or less) per person may also be permitted at entry — check the official site for the current year's policy.",
      },
      {
        q: "How bad is the weather usually on Memorial Day weekend in Detroit?",
        a: "Expect highs of 18–24°C (65–75°F) and lows around 7–13°C (45–55°F). There is roughly a 40% chance of rain on any given day, and wind off the Detroit River can make evenings feel 5–10°C colder than the air temperature. The festival runs rain or shine with no cancellations. Pack for sun, rain, and cold evening wind — you may experience all three in a single day.",
      },
      {
        q: "What time should I arrive to avoid long queues?",
        a: "Gates open at 2pm each day. Arriving within the first 30 minutes means shorter security lines. Peak entry is 4–6pm as headliner crowds build. Saturday is the busiest entry day. Security includes bag checks and walk-through metal detectors — streamline what you carry and have your bag open and pockets empty before you reach the checkpoint.",
      },
      {
        q: "Are there afterparties, and how do I find them?",
        a: "Yes — official Movement afterparties are announced on the festival website and app closer to the event, typically running midnight to 4–6am at venues across Greektown, Downtown, and Eastern Market. Unofficial afterparties are also abundant. Follow Movement's social channels and Detroit promoters (Paxahau, Charivari, Blank Code) for announcements. Tickets for popular afterparties sell out fast — buy before the festival weekend, not when you arrive.",
      },
      {
        q: "Is the festival all ages?",
        a: "General Admission is all ages. Kids 12 and under get free admission when accompanied by a parent or guardian. VIP is 21+ only. A government-issued ID is required to purchase or consume alcohol anywhere on the festival grounds.",
      },
      {
        q: "What happens if I lose my wristband?",
        a: "Visit the on-site Box Office tent for a replacement — there is a $20 replacement fee. The wristband is non-transferable and required for every entry and exit scan, so do not remove it during the weekend. The festival is not responsible for lost, stolen, or damaged wristbands.",
      },
    ],
  },
  {
    slug: "time-warp-mannheim",
    name: "Time Warp",
    country: "Germany",
    city: "Mannheim",
    dates: "Apr 4–5, 2026",
    genres: ["Techno", "Deep Techno", "Minimal"],
    vibe: "Warehouse techno institution",
    region: "eu",
    type: "city",
    firstTimerFriendly: false,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalTerminalV,
    description: "A two-day indoor techno event in the Maimarktgelände exhibition halls. Time Warp is one of the most respected events in electronic music — running since 1994, it's a rite of passage for techno heads.",
    whyGo: "Time Warp is the benchmark. Since 1994, this event in the industrial halls of Mannheim has defined what a techno event should look and sound like. The production is legendary — VOID acoustics systems, immersive lighting, multiple rooms each with their own sonic identity. The lineup reads like a Who's Who of international techno. It's not a festival — it's a masterclass.",
    travelTips: "Fly into Frankfurt (FRA) or Stuttgart (STR) — both around 1 hour by train to Mannheim. Direct trains from Frankfurt run frequently. Mannheim Hauptbahnhof is 20 minutes by tram from the Maimarkgelände venue. Many people come from Amsterdam, Berlin, and Paris by train for the weekend.",
    accommodation: "Mannheim city centre hotels and Airbnbs book out months in advance for Time Warp weekend. Heidelberg (15 min by train) is a beautiful alternative base with more options. Frankfurt is 1 hour away if you want a city base.",
    packingHighlights: ["Earplugs (VOID sound systems are immense)", "Comfortable trainers", "Layers (the halls vary from tropical to cool)", "Power bank", "Euro cash", "Minimal outfit (it's a serious techno crowd)"],
    survivalTips: "The event runs through the night — doors open at 6pm and the best sets are between 2am and 6am. The outdoor area between halls is essential for air and ear recovery. Don't make the mistake of only staying in the main hall — the smaller rooms consistently feature the best sets. Mannheim's Wasserturm area has good food for pre-event fuelling.",
    nearbyTrips: "Heidelberg is one of Germany's most beautiful cities — 15 minutes away and worth a full day. Frankfurt has excellent clubs for an extended techno weekend. The Rhine Valley wine region is a stunning day trip by train.",
    youtubePromoId: "2a3ft-FFVHw",
  },

  // ── BATCH: 7 Rich Festivals (Perplexity Research, March 2026) ────────────

  {
    slug: "suncebeat-new-horizons",
    name: "Suncebeat New Horizons",
    country: "Portugal",
    city: "Costa da Caparica",
    dates: "Jun 18–22, 2026",
    genres: ["Deep House", "Afro House", "Soulful House", "Disco", "Funk", "Soul"],
    vibe: "Soul House",
    region: "eu",
    type: "beach",
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "on-sale",
    image: heroFestival,
    description: "Five days of deep house, afro house, and soulful grooves on the Atlantic coast of Portugal. Suncebeat New Horizons takes place at Praia Irmão, Costa da Caparica — a beautiful beach 30 minutes from Lisbon — with boat parties on the River Tagus and afterparties at Praia da Sereia.",
    whyGo: "Suncebeat sits at the intersection of soulful house, classic disco, and spiritual dance music in a stunning beach setting. Louie Vega, Kenny Dope, Jeremy Underground, Tama Sumo — the lineup reads like a house music hall of fame. With no camping and a Lisbon base, you get Atlantic sunsets, proper restaurants, and a crowd who are there to actually dance.",
    travelTips: "Fly London → Lisbon (LIS, ~2.5h, £80–190 return). Uber or taxi to the venue takes about 30 minutes (~€15–25). Night buses run until 4am back to Lisbon via Alcântara and Cais do Sodré.",
    accommodation: "No on-site camping. Stay in Costa da Caparica for maximum proximity — there are hostels, apartments, and hotels on the beachfront. Alternatively, stay in Lisbon (Baixa or Bairro Alto) and travel 30 min each way.",
    packingHighlights: ["SPF 50+ reef-safe suncream", "Portable fan", "Euro cash", "GHIC/EHIC card", "Light layers for ocean breezes", "Comfortable dancing shoes"],
    survivalTips: "Book boat party tickets before you arrive — they sell out fast. Bar staff have short-changed customers in the past; always check your change. The Atlantic sun is intense despite the breeze — sunscreen is non-negotiable.",
    nearbyTrips: "Lisbon's Alfama and Belém districts are worth a full day. Sintra (palaces and fairytale architecture) is 45 minutes by train. The Setúbal Peninsula beaches to the south are stunning for recovery days.",
    ticketUrl: "https://suncebeat.com",
    officialSiteOnly: true,
    coords: { lat: 38.6412, lng: -9.2354 },
    capacity: 5000,
    vibes: {
      energyLevel: 7,
      darknessScore: 2,
      firstTimerScore: 9,
      bestFor: "House music devotees who want soul over spectacle",
      crowdVibe: "Friendly, mixed ages, serious music lovers",
    },
    survivalIntelBullets: [
      "Book boat party tickets in advance — they sell out fast",
      "Stay in Costa da Caparica or Lisbon — no on-site accommodation",
      "Pack SPF 50+ suncream and a hat; Atlantic sun is intense",
      "Night buses run until 4am back to Lisbon (Alcântara, Cais do Sodré)",
      "Bar staff have short-changed customers — always check your change",
    ],
    travelAdviceInfo: {
      airport: "Lisbon (LIS)",
      flightCost: "£80–190 return from London",
      transferOptions: "Uber/taxi ~30 min to venue (~€15–25)",
      totalJourney: "~5–6 hours from London",
    },
    accommodationTiers: {
      budget: "Costa da Caparica beach hostels ~€25–40/night",
      midRange: "Lisbon Airbnb (Baixa/Bairro Alto) ~€70–120/night",
      premium: "Lisbon boutique hotel ~€150–250/night",
      bookingTip: "Book Lisbon accommodation well in advance — June is peak tourist season",
    },
    lineup: [
      { artist: "Louie Vega", genre: "Deep House / Soulful House", description: "NYC house royalty and Nervous Records co-founder" },
      { artist: "Kenny Dope", genre: "Deep House / Garage", description: "Masters At Work legend, NYC dance floor architect" },
      { artist: "Jeremy Underground", genre: "Deep House / Disco", description: "French selector known for marathon deep house sets" },
      { artist: "Henrik Schwarz", genre: "Deep House / Electronic", description: "German producer/DJ bridging jazz and house" },
      { artist: "DJ Spen", genre: "Soulful House / Gospel House", description: "Baltimore's finest, spiritual house pioneer" },
      { artist: "DJEFF", genre: "Afro House / Deep House", description: "Angolan producer championing African house music" },
      { artist: "Chez Damier", genre: "Deep House / Detroit", description: "Detriot house legend and Balance label founder" },
      { artist: "Tama Sumo", genre: "Deep House / Electronic", description: "Berlin resident DJ with a distinct musical identity" },
      { artist: "Rich Medina", genre: "Soul / Funk / House", description: "Philadelphia DJ blending soul, funk, and house" },
      { artist: "Sandy Rivera (K.O.T)", genre: "Soulful House / Deep House", description: "Kings of Tomorrow producer and NYC house icon" },
    ],
    youtubePromoId: "azjhlrKt6Y4",
  },

  {
    slug: "goodlife-festival",
    name: "Goodlife Festival",
    country: "UK",
    city: "Leeds",
    dates: "Jun 6, 2026",
    genres: ["Classic House", "Vocal House", "Soulful House", "Disco", "Nu-Disco", "Funk"],
    vibe: "Daytime Disco",
    region: "uk",
    type: "city",
    firstTimerFriendly: true,
    budgetLevel: "cheap",
    status: "on-sale",
    image: heroFestival,
    description: "A one-day house and disco celebration at the stunning Harewood House estate, just outside Leeds. 12,000 capacity, 12pm–11pm, no camping — Goodlife is the perfect entry-level UK festival for soulful house lovers.",
    whyGo: "Harewood House is one of the most beautiful festival grounds in the UK. Goodlife packs a serious lineup — Armand Van Helden, Groove Armada, Roger Sanchez — into a single glorious day. No camping chaos, proper facilities, and a crowd that's there to dance in a park.",
    travelTips: "Train from London Kings Cross → Leeds (~2h 10m, LNER). Bus No.36 from Leeds to Harewood takes about 20 minutes. Total journey ~2.5–3 hours from London.",
    accommodation: "No on-site camping. Leeds city centre has plenty of hotels and Airbnbs — stay the night and make a weekend of it. Book early for June.",
    packingHighlights: ["Blanket (camping chairs not permitted)", "Comfortable shoes", "Cash for on-site food/drink", "Light waterproof jacket", "ID"],
    survivalTips: "No pass-outs — once you leave you cannot re-enter. Last entry is 4:30pm so arrive early. Bag maximum 35cm x 40cm x 19cm; no aerosols, roll-on deodorant only. Budget for on-site food and drink as nothing can be brought in.",
    nearbyTrips: "Leeds city centre has excellent nightlife — Mint Club, Warehouse 23 and Hyde Park Book Club are all worth visiting the night before or after. The Yorkshire Dales are a beautiful day trip if you make a weekend of it.",
    ticketUrl: "https://www.skiddle.com/festivals/goodlife-festival/?sktag=15628",
    coords: { lat: 53.8967, lng: -1.5395 },
    capacity: 12000,
    vibes: {
      energyLevel: 7,
      darknessScore: 1,
      firstTimerScore: 9,
      bestFor: "First-timers wanting a low-stress, high-quality UK festival day",
      crowdVibe: "Sunny, friendly, mixed-age house crowd",
    },
    survivalIntelBullets: [
      "No food or drink allowed in — budget for on-site spending",
      "Bring a blanket — camping chairs not permitted",
      "No pass-outs — once you leave you cannot re-enter",
      "Arrive early — last entry 4:30pm; queues reported at debut 2025 event",
      "Bag max 35cm x 40cm x 19cm; no aerosols; roll-on deodorant only",
    ],
    travelAdviceInfo: {
      airport: "Leeds Bradford (LBA) or Manchester (MAN)",
      flightCost: "N/A — Leeds is 2h from London by train",
      transferOptions: "LNER from London Kings Cross → Leeds (~2h 10m), then Bus No.36 to Harewood",
      totalJourney: "~2.5–3 hours from London",
    },
    accommodationTiers: {
      budget: "Leeds city centre hostel ~£25–45/night",
      midRange: "Leeds city centre hotel ~£70–120/night",
      premium: "Harrogate boutique hotel ~£150–200/night (15 min from venue)",
      bookingTip: "Book well ahead — June Leeds hotel prices spike for festival weekends",
    },
    lineup: [
      { artist: "Armand Van Helden", genre: "House / Disco House", description: "You Don't Know Me — one of the biggest names in house music history" },
      { artist: "Groove Armada", genre: "Electronic / House / Downtempo", description: "If Everybody Looked The Same, At The River — iconic UK duo" },
      { artist: "Roger Sanchez", genre: "Deep House / US House", description: "Release Yourself — Grammy-winning NYC house legend" },
      { artist: "Inner City (Live)", genre: "Chicago House / Electronic", description: "Good Life — original Detroit/Chicago house pioneers performing live" },
      { artist: "The Shapeshifters", genre: "Vocal House / Deep House", description: "Lola's Theme — Swedish house duo, UK chart hitmakers" },
      { artist: "Craig Charles", genre: "Funk / Soul / Disco", description: "Red Dwarf actor turned funk DJ and BBC broadcaster" },
      { artist: "Alison Limerick", genre: "Soulful House / Vocal House", description: "Where Love Lives — defining voice of UK house music" },
      { artist: "K-Klass", genre: "Classic House / UK House", description: "Rhythm Is A Mystery — early 90s UK house legends" },
      { artist: "Michael Gray", genre: "Soulful House / Vocal House", description: "The Weekend — UK house producer and remixer" },
      { artist: "Ian Ossia", genre: "House / Techno", description: "Veteran UK DJ and producer with 30 years in the game" },
    ],
  },

  {
    slug: "mint-festival",
    name: "Mint Festival",
    country: "UK",
    city: "Leeds",
    dates: "May 2–3, 2026",
    genres: ["Tech House", "Minimal House", "Deep Tech", "House", "Techno", "UK Garage", "Bassline"],
    vibe: "Tech House",
    region: "uk",
    type: "city",
    firstTimerFriendly: false,
    budgetLevel: "cheap",
    status: "on-sale",
    image: festivalTerminalV,
    description: "Leeds' premier tech house and minimal festival, held over two days at Newsam Green Farm. With 7,500–10,000 capacity per day and consistently excellent bookings, Mint is a sell-out institution for northern UK underground music.",
    whyGo: "Mint books the most consistent underground lineup in the UK festival calendar. Enzo Siragusa, Luuk Van Dijk, Shanti Celeste, Sidney Charles — this is proper tech house without the commercial edge. The site is well-run, the sound is excellent, and tickets vanish in minutes. If you're into underground house and techno, this is your UK home.",
    travelTips: "Train from London Kings Cross → Leeds (~2h 10m). Free shuttle bus from Leeds city centre is included if tickets are bought before 31 December. Total journey ~2.5–3 hours.",
    accommodation: "No on-site camping. Leeds city centre hotels and Airbnbs are the obvious choice — a 10-minute shuttle ride from the venue.",
    packingHighlights: ["Comfortable trainers", "Layers (May weather is unpredictable)", "Power bank", "Cash for on-site", "ID"],
    survivalTips: "Get to the shuttle bus early — return queues can be very long. Entry queues have been an hour+ in past years; arrive well before your planned stage time. Sign up on mintfestival.co.uk to get ticket access — it sells out instantly on public sale.",
    nearbyTrips: "Leeds has a thriving nightlife scene — Mint Club (the venue's home club), Belgrave Music Hall, and Wharf Chambers are all within a short taxi. Make it a full Leeds weekend.",
    ticketUrl: "https://www.skiddle.com/festivals/mint-festival/?sktag=15628",
    coords: { lat: 53.7791, lng: -1.4603 },
    capacity: 10000,
    vibes: {
      energyLevel: 8,
      darknessScore: 5,
      firstTimerScore: 6,
      bestFor: "Underground house and techno heads looking for quality over spectacle",
      crowdVibe: "Serious music crowd, northern underground energy",
    },
    survivalIntelBullets: [
      "Get to the shuttle bus early — return queues can be very long",
      "Arrive early — entry queues have been an hour+ in past years",
      "Sign up on mintfestival.co.uk for ticket access — sells out instantly",
      "Free return shuttle bus included if tickets bought before 31 December",
      "No food or drink allowed in — budget for on-site spending",
    ],
    travelAdviceInfo: {
      airport: "Leeds Bradford (LBA) or Manchester (MAN)",
      flightCost: "N/A — Leeds is 2h from London by train",
      transferOptions: "LNER from London Kings Cross → Leeds, then free shuttle bus (if ticket bought before Dec 31)",
      totalJourney: "~2.5–3 hours from London",
    },
    accommodationTiers: {
      budget: "Leeds city centre hostel ~£25–45/night",
      midRange: "Leeds city centre hotel ~£60–110/night",
      premium: "Leeds boutique hotel ~£120–200/night",
      bookingTip: "Book early — Mint weekend is busy and Leeds hotels spike in price",
    },
    lineup: [
      { artist: "Enzo Siragusa", genre: "Tech House / Deep Tech", description: "Fuse London founder, one of the most respected selectors in underground house" },
      { artist: "Ewan McVicar", genre: "Tech House / Minimal", description: "Fuse resident, known for marathon dancefloor sets" },
      { artist: "Luuk Van Dijk", genre: "Tech House / Melodic House", description: "Dutch producer blending melodic and tech house" },
      { artist: "Max Dean", genre: "Tech House / Deep Tech", description: "Fuse London resident with a distinctive deep tech sound" },
      { artist: "Shanti Celeste", genre: "Deep House / House", description: "Chilean-British DJ and Peach Discs founder" },
      { artist: "Sidney Charles", genre: "Tech House / Deep Tech", description: "Fuse affiliate with infectious, hard-working sets" },
      { artist: "Obskur", genre: "Tech House / Minimal", description: "Rising star in the underground tech house scene" },
      { artist: "Danny Bond", genre: "Tech House / Bassline", description: "Yorkshire native bringing local flavour to the lineup" },
      { artist: "Morgan Seatree", genre: "House / Tech House", description: "Mint resident and UK underground circuit stalwart" },
      { artist: "Sally C", genre: "House / Disco House", description: "Glasgow-based DJ with eclectic, feel-good selections" },
    ],
  },

  {
    slug: "defected-croatia",
    name: "Defected Croatia",
    country: "Croatia",
    city: "Tisno",
    dates: "Jul 29–Aug 2, 2026",
    genres: ["House", "Deep House", "Vocal House", "Nu-Disco", "Soulful House", "Garage", "Afro House", "Disco"],
    vibe: "House Paradise",
    region: "eu",
    type: "beach",
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "selling-fast",
    image: heroFestival,
    description: "The final ever edition of Defected Croatia — 'One Last Dance' — at The Garden Resort in Tisno. Five days of house music royalty on the Adriatic coast: floating stages, day parties, boat trips to Barbarella's, and the most soulful lineup Defected has ever assembled. 95% sold out.",
    whyGo: "This is a once-in-a-lifetime event. Defected Croatia is ending after this edition, making 2026 the last chance to experience what many consider the finest house music festival in Europe. Groove Armada, Moodymann, Seth Troxler, Carl Craig, Purple Disco Machine — on an outdoor floating stage over the Adriatic. The Garden Resort is genuinely one of the most beautiful festival venues in the world.",
    travelTips: "Fly London → Zadar (ZAD, ~2.5h, £40–80 one-way). Official coach transfer ~£30 each way. Total ~5–7 hours from London. Uber doesn't operate in Tisno; garden taxis wait outside the site (night rates 3–5x daytime).",
    accommodation: "No on-site camping. Hotel Miran is the official partner hotel — 12 min from site, 2 pools, private beach. Book well in advance. Tisno village has apartments and villas. Šibenik (20km) has more options.",
    packingHighlights: ["Reef shoes (sea urchins on rocks)", "SPF 50+ suncream", "Euro cash (ATMs in Tisno run dry)", "GHIC/EHIC card", "Valid passport (Croatia is Schengen)", "Electrolytes for the 35°C+ heat"],
    survivalTips: "Book Barbarella's tickets separately and in advance — the legendary afterparty venue sells out independently, and the shuttle costs ~€4pp each way. Cashless RFID on-site; keep Euro cash for taxis and external bars. Sun regularly exceeds 35°C in late July.",
    nearbyTrips: "Šibenik is a stunning medieval city 20km away — worth a morning visit. The Krka National Park waterfalls are an unmissable day trip 40 minutes inland. Split (1.5h) is worth an extra day.",
    ticketUrl: "https://croatia.defected.com/book-2026-tickets",
    officialSiteOnly: true,
    coords: { lat: 43.8068, lng: 15.6404 },
    capacity: 5000,
    vibes: {
      energyLevel: 7,
      darknessScore: 2,
      firstTimerScore: 8,
      bestFor: "House music fans who want sunshine, sea, and world-class selectors",
      crowdVibe: "Warm, mixed ages, proper house music crowd",
    },
    survivalIntelBullets: [
      "Sun exceeds 35°C in late July — SPF, hat, and electrolytes essential",
      "Book Barbarella's tickets in advance — they sell independently and go fast; shuttle ~€4pp",
      "Bring reef shoes — sea urchins on rocks around swimming and dancing areas",
      "Croatia uses Euro; RFID cashless on-site but keep cash for taxis",
      "Carry valid passport (Croatia is Schengen); GHIC/EHIC for health coverage",
    ],
    travelAdviceInfo: {
      airport: "Zadar (ZAD)",
      flightCost: "£40–80 one-way from London",
      transferOptions: "Official coach transfer ~£30 each way (~40 min from Zadar)",
      totalJourney: "~5–7 hours from London",
    },
    accommodationTiers: {
      budget: "Tisno village apartments ~€50–80/night",
      midRange: "Hotel Miran (official partner) ~€100–180/night",
      premium: "Private villa with pool near Tisno ~€200–400/night",
      bookingTip: "Hotel Miran sells out months in advance for Defected week — book immediately",
    },
    lineup: [
      { artist: "Groove Armada", genre: "Electronic / House", description: "Iconic UK duo closing out Defected Croatia in style" },
      { artist: "Moodymann", genre: "Detroit House / Deep House", description: "Legendary Detroit house enigma and KDJ Records founder" },
      { artist: "Jayda G", genre: "Deep House / Disco", description: "Canadian DJ/producer blending deep house with social consciousness" },
      { artist: "Seth Troxler", genre: "Techno / Deep House", description: "Global DJ and Tuskegee Records founder" },
      { artist: "Carl Craig", genre: "Detroit Techno / Electronic", description: "Detroit techno pioneer and Planet E label founder" },
      { artist: "Purple Disco Machine", genre: "Nu-Disco / Deep House", description: "German disco-influenced house producer and live performer" },
      { artist: "TSHA", genre: "Deep House / Electronic", description: "UK producer delivering emotional, driving house sets" },
      { artist: "Floorplan", genre: "Detroit House / Gospel House", description: "Robert Hood's spiritual house alias — euphoric and powerful" },
      { artist: "Skream", genre: "House / Bass House / UK Garage", description: "Dubstep pioneer turned house selector and Skreamizm label boss" },
      { artist: "Dennis Ferrer", genre: "Deep House / Soulful House", description: "NYC producer behind Objective Function and Hey Hey" },
    ],
  },

  {
    slug: "love-international",
    name: "Love International",
    country: "Croatia",
    city: "Tisno",
    dates: "Jul 8–14, 2026",
    genres: ["Deep House", "Techno", "Minimal", "Ambient", "Balearic", "Disco", "Leftfield Electronica", "Breaks", "Dub"],
    vibe: "Leftfield Utopia",
    region: "eu",
    type: "beach",
    firstTimerFriendly: false,
    budgetLevel: "medium",
    status: "on-sale",
    image: heroFestival,
    description: "Seven days of eclectic, forward-thinking music at The Garden Resort in Tisno. Love International is the thinking raver's Croatian festival — deeper, weirder, and more intimate than its neighbours, with a lineup that spans ambient Balearic sets to peak-time techno.",
    whyGo: "A week in Tisno. Love International has built a devoted following by booking artists you won't see elsewhere — Daniel Avery, Call Super, Optimo, Mathew Jonson live. The venue is the same Garden Resort as Defected but the atmosphere is completely different: more introspective, more surprising, more likely to blow your mind at 6am. The cashless RFID wristband is €3.50 to activate.",
    travelTips: "Fly London → Zadar (ZAD, ~2.5h, £40–80 one-way). Official coach transfer ~£30 each way. Total ~5–7 hours from London. Same travel logistics as Defected Croatia.",
    accommodation: "No on-site camping. Hotel Miran is the official partner hotel for all Tisno festivals — 12 min from site, 2 pools. Tisno village apartments are the most popular choice. Book at least 3 months in advance.",
    packingHighlights: ["Reef shoes (sea urchins endemic to rocky Adriatic coast)", "ID at all times (Croatian law — €400 fines)", "Euro cash for taxis and Barbarella's", "Electrolytes and SPF", "GHIC/EHIC card"],
    survivalTips: "Croatian law requires ID to be carried at all times — €400 on-the-spot fines have been reported. Pace yourself over 7 days: four stages of programming, boat parties, and Barbarella's will burn you out if you go hard from day one. Free water refills on-site near the shower block.",
    nearbyTrips: "Krka National Park waterfalls (40 min), Šibenik medieval city (20km), Split (1.5h) for the Diocletian's Palace old town.",
    ticketUrl: "https://loveinternational.hr/tickets",
    officialSiteOnly: true,
    coords: { lat: 43.8068, lng: 15.6404 },
    capacity: 5000,
    vibes: {
      energyLevel: 6,
      darknessScore: 5,
      firstTimerScore: 6,
      bestFor: "Seasoned ravers who want depth, discovery, and a week in the sun",
      crowdVibe: "Curation-obsessed, open-minded, devoted regulars",
    },
    survivalIntelBullets: [
      "Pace yourself — 7 days of 4-stage programming, boat parties, and Barbarella's causes burnout",
      "Carry ID at all times — Croatian law requires it; €400 on-the-spot fines reported",
      "Reef shoes essential — sea urchins endemic to the rocky Adriatic coastline",
      "Book Barbarella's separately and early — sells out; shuttle nightly",
      "Free water refills on-site (near shower block); no outside food or drink permitted",
    ],
    travelAdviceInfo: {
      airport: "Zadar (ZAD)",
      flightCost: "£40–80 one-way from London",
      transferOptions: "Official coach ~£30 each way from Zadar Airport",
      totalJourney: "~5–7 hours from London",
    },
    accommodationTiers: {
      budget: "Tisno village apartments ~€50–80/night",
      midRange: "Hotel Miran (official partner) ~€100–180/night",
      premium: "Private villa rental near Tisno ~€200–350/night",
      bookingTip: "Same venue as Defected — Hotel Miran gets booked across multiple festivals; reserve early",
    },
    lineup: [
      { artist: "Daniel Avery", genre: "Techno / Electronic", description: "UK producer known for hypnotic, atmospheric techno sets" },
      { artist: "Midland", genre: "Deep House / Techno", description: "Secretive UK producer with a distinct melodic-techno signature" },
      { artist: "Nightmares on Wax (DJ)", genre: "Hip Hop / Downtempo / House", description: "George Evelyn's warm, eclectic DJ sets spanning decades" },
      { artist: "Call Super", genre: "Techno / Deep House / Experimental", description: "Berlin-based UK producer known for highly textured sets" },
      { artist: "Saoirse", genre: "Techno / Electronic", description: "London DJ pushing boundaries between techno and experimentalism" },
      { artist: "Palms Trax", genre: "House / Italo Disco / Electro", description: "Berlin selector blending disco, italo and deep house" },
      { artist: "Craig Richards", genre: "Deep House / Techno", description: "Fabric resident with legendary long-form DJ sets" },
      { artist: "Mathew Jonson (Live)", genre: "Techno / Minimal / Electronic", description: "Canadian producer performing intricate live techno" },
      { artist: "Shanti Celeste", genre: "Deep House / House", description: "Chilean-British DJ and Peach Discs founder" },
      { artist: "Optimo (Espacio)", genre: "Leftfield / House / Techno / Punk", description: "Glasgow duo famous for genre-defying, 6-hour marathon sets" },
    ],
  },

  {
    slug: "dimensions-festival",
    name: "Dimensions Festival",
    country: "Croatia",
    city: "Tisno",
    dates: "Aug 27–31, 2026",
    genres: ["Techno", "Electro", "Minimal", "Ambient", "Breaks", "Acid", "Deep House", "Experimental Electronics", "Dub"],
    vibe: "Dark Techno",
    region: "eu",
    type: "beach",
    firstTimerFriendly: false,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalTerminalV,
    description: "Five days and nights of techno, electro, and experimental music at The Garden Resort and Barbarella's, Tisno. Dimensions is the darkest and most sonically adventurous of the Tisno festivals — sold exclusively via Resident Advisor.",
    whyGo: "Dimensions is where the underground gets serious. Helena Hauff b2b Moopie, Objekt, Moritz Von Oswald, Roza Terenzi live — the lineup is consistently some of the most credible in European techno. The combination of The Garden's outdoor stages and Barbarella's brutalist cave makes for an unmatched day-to-night-to-morning experience.",
    travelTips: "Fly London → Zadar (ZAD) or Split (SPU), ~2.5h, £40–80 one-way. Official coach ~£30 each way. Total ~5–7 hours. ATMs in Tisno can run dry during festival weeks — withdraw cash before arriving.",
    accommodation: "No on-site camping. Hotel Miran official partner hotel (12 min, 2 pools, private beach). Tisno village apartments popular. Šibenik (20km) has wider options. On-site lockers ~€8/day + €50 RFID deposit.",
    packingHighlights: ["Reef shoes", "Empty reusable water bottle", "Euro cash (ATMs run dry in Tisno)", "GHIC/EHIC + travel insurance", "Layers for late nights", "ID at all times"],
    survivalTips: "Zero-tolerance drug policy — Croatian police, minimum £300 fine, bag searches on entry. Boat parties require separate tickets; arrive at the jetty 30 minutes early as there are no refunds for late arrivals. Nearest hospital is in Šibenik (20km).",
    nearbyTrips: "Krka National Park (40 min), Šibenik old town (20km), Kornati Islands by speedboat. Split is worth 1–2 days if you're extending the trip.",
    ticketUrl: "https://ra.co/promoters/dimensionsfestival",
    officialSiteOnly: true,
    coords: { lat: 43.8068, lng: 15.6404 },
    capacity: 5000,
    vibes: {
      energyLevel: 7,
      darknessScore: 7,
      firstTimerScore: 5,
      bestFor: "Dedicated techno and experimental electronic music fans",
      crowdVibe: "Serious, no-nonsense, genre-literate underground crowd",
    },
    survivalIntelBullets: [
      "On-site lockers ~€8/day + €50 RFID deposit (refunded on return)",
      "Zero-tolerance drug policy — Croatian police, minimum £300 fine, bag searches on entry",
      "Boat parties require separate tickets; arrive at jetty 30 min early, no refunds for late arrivals",
      "Bring empty reusable water bottle; ATMs in Tisno can run dry — withdraw cash before arriving",
      "Medical/welfare tent on-site; nearest hospital Šibenik (20km); carry GHIC/EHIC + travel insurance",
    ],
    travelAdviceInfo: {
      airport: "Zadar (ZAD) or Split (SPU)",
      flightCost: "£40–80 one-way from London",
      transferOptions: "Official coach ~£30 each way from either airport",
      totalJourney: "~5–7 hours from London",
    },
    accommodationTiers: {
      budget: "Tisno village apartments ~€50–80/night",
      midRange: "Hotel Miran (official partner) ~€100–180/night",
      premium: "Private villa near Tisno or Šibenik ~€200–350/night",
      bookingTip: "Dimensions is RA-ticketed only — check ra.co; sell out quickly",
    },
    lineup: [
      { artist: "Helena Hauff b2b Moopie", genre: "Electro / Techno", description: "Hamburg's finest hard electro pioneer b2b with Dutch talent" },
      { artist: "John Talabot", genre: "Techno / House / Balearic", description: "Spanish producer and Hivern Discs label boss" },
      { artist: "Satoshi Tomiie (Live)", genre: "Deep House / Minimal", description: "Japanese-American deep house pioneer performing live" },
      { artist: "Sonja Moonear", genre: "Techno / Minimal", description: "Geneva-based DJ with hypnotic, stripped-back sets" },
      { artist: "Eris Drew & Octo Octa", genre: "Trance / Rave / House", description: "Trans duo bringing euphoric, spiritual rave energy" },
      { artist: "Marcellus Pittman", genre: "Detroit House / Techno", description: "Detroit lifer and 3 Chairs co-founder" },
      { artist: "Objekt", genre: "Techno / Electro / Breaks", description: "Berlin-based UK artist with devastating peak-time sets" },
      { artist: "Moritz Von Oswald", genre: "Dub Techno / Ambient", description: "Basic Channel founder, inventor of dub techno" },
      { artist: "Roza Terenzi (Live)", genre: "Electro / Techno / Industrial", description: "Australian artist delivering ferocious live electronics" },
      { artist: "DMX Krew (Live)", genre: "Electro / Acid / IDM", description: "UK electro and acid veteran Ed DMX performing live" },
    ],
    youtubePromoId: "Yvd9iCwA6YM",
  },

  {
    slug: "electric-love-festival",
    name: "Electric Love Festival",
    country: "Austria",
    city: "Salzburg",
    dates: "Jul 9–11, 2026",
    genres: ["EDM", "Progressive House", "Big Room", "Trance", "Hardstyle", "Hard Dance", "Drum & Bass", "Future Bass", "Melodic Techno"],
    vibe: "Alpine EDM",
    region: "eu",
    type: "camping",
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalCamping,
    description: "Austria's biggest electronic music festival at the Salzburgring circuit near Salzburg. 180,000 capacity over three days, with Swedish House Mafia and Armin van Buuren headlining — Electric Love is the Alpine answer to Tomorrowland.",
    whyGo: "Electric Love punches above its weight. The Salzburgring setting — mountains, forests, and a race circuit — is spectacular. The production is world-class, the camping is enormous, and the lineup spans the full spectrum from trance to drum and bass. This is the festival that converts non-EDM fans.",
    travelTips: "Fly London → Salzburg (SZG, ~2h, £40–80 one-way). Bus 2 or 27 to Salzburg Central Station. FREE Electric Love shuttle direct to the festival. Total ~4–5 hours from London.",
    accommodation: "Camping on-site (~€50 supplement). Thunderstorms are almost guaranteed — invest in a waterproof tent; cheap pop-ups will not survive. There is zero shade on the campsite; bring a reflective tarp. Salzburg hotels are an alternative for the non-camping premium.",
    packingHighlights: ["Waterproof tent and rain gear (thunderstorms guaranteed)", "Reflective tarp for campsite shade", "Padlocks for lockers (theft reported)", "€15 garbage bag deposit (refunded when returned full)", "Earplugs for camping", "Layers for Alpine nights"],
    survivalTips: "Lock everything — theft has been reported at the campsite. Skip the Wednesday warm-up or lower expectations — the main days (Thu–Sat) are significantly better. The campsite heats up by 8am; earplugs are essential for sleep. Your €15 garbage bag deposit is refunded when you return it full — keep it.",
    nearbyTrips: "Salzburg city is one of Europe's most beautiful — Mozart's birthplace, Hohensalzburg Castle, and the Old Town are all within easy reach. The Salzkammergut lakes (Hallstatt, Wolfgangsee) are a 1-hour drive for a stunning post-festival recovery day.",
    ticketUrl: "https://www.electric-love.at/tickets",
    officialSiteOnly: true,
    coords: { lat: 47.7437, lng: 13.1779 },
    capacity: 180000,
    vibes: {
      energyLevel: 9,
      darknessScore: 3,
      firstTimerScore: 8,
      bestFor: "EDM and trance fans wanting a stadium-scale European camping experience",
      crowdVibe: "High-energy, international crowd, big smiles",
    },
    survivalIntelBullets: [
      "Thunderstorms are almost guaranteed — invest in a waterproof tent; cheap pop-ups will not survive",
      "Campsite has zero shade — sun heats tents by 8am; bring reflective tarp; earplugs essential",
      "Lock everything — theft reported at campsite; use padlocks and lockers",
      "€15 garbage bag deposit refunded when returned full — keep yours",
      "Skip the Wednesday warm-up or lower expectations — the main days (Thu–Sat) are significantly better",
    ],
    travelAdviceInfo: {
      airport: "Salzburg (SZG)",
      flightCost: "£40–80 one-way from London (~2h)",
      transferOptions: "Bus 2 or 27 to Salzburg Central Station, then FREE Electric Love shuttle to festival",
      totalJourney: "~4–5 hours from London",
    },
    accommodationTiers: {
      budget: "On-site camping ~€50 supplement",
      midRange: "Salzburg city centre hotel ~€100–160/night",
      premium: "Salzburg boutique hotel ~€180–300/night",
      bookingTip: "If camping, buy a quality waterproof tent before you go — Alpine thunderstorms are brutal",
    },
    lineup: [
      { artist: "Swedish House Mafia", genre: "Progressive House / EDM", description: "One last time — iconic Swedish trio headlining the main stage" },
      { artist: "Armin van Buuren", genre: "Trance / Progressive Trance", description: "A State of Trance host and global trance ambassador" },
      { artist: "Paul Kalkbrenner", genre: "Techno / Melodic Techno", description: "Berlin artist behind Sky And Sand — bridges techno and mainstream" },
      { artist: "Pendulum (DJ Set)", genre: "Drum & Bass / Electronic Rock", description: "Perth drum and bass legends delivering the DJ experience" },
      { artist: "Dimitri Vegas", genre: "Big Room / EDM", description: "Belgian DJ and festival main stage powerhouse" },
      { artist: "KSHMR", genre: "Future Bass / EDM", description: "Indian-American producer known for cinematic big room tracks" },
      { artist: "John Newman", genre: "Soul / Pop / Electronic", description: "UK vocalist behind Love Me Again, live with electronic production" },
      { artist: "Hugel", genre: "House / Tech House / EDM", description: "French DJ bridging underground house and festival audiences" },
      { artist: "BUNT.", genre: "Future House / Melodic House", description: "German duo known for uplifting melodic house tracks" },
      { artist: "Annix", genre: "Drum & Bass / Neurofunk", description: "UK drum and bass duo with high-energy festival sets" },
    ],
  },

  // ── Primavera Sound (promoted from CSV — Perplexity research April 2026) ──
  {
    slug: "primavera-sound",
    name: "Primavera Sound",
    country: "Spain",
    city: "Barcelona",
    dates: "Jun 4–6, 2026",
    genres: ["Indie Rock", "Alternative", "Post-Punk", "Shoegaze", "Electronic", "Pop", "Hip-Hop", "Experimental"],
    vibe: "Barcelona's flagship indie and alternative festival",
    region: "eu",
    type: "city",
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "on-sale",
    image: festivalUltra,
    description: "Three days of music at the Parc del Fòrum, a sweeping open-air waterfront complex on Barcelona's Mediterranean coast, with 12+ stages running from mid-afternoon until 5–6am. The festival extends across the city as Primavera a la Ciutat (June 1–7) — 50+ shows in Barcelona's best clubs including Sala Apolo and Razzmatazz.",
    whyGo: "Primavera is one of Europe's most credible and diverse festivals — the lineup consistently delivers artists you'd never see on the same bill anywhere else, from indie legends and post-punk icons to hyperpop and electronic crossover acts. You get all of this in Barcelona, one of the world's great cities for food, architecture, and late nights. The week-long city programme means it's genuinely worth 5–7 days rather than a weekend dash.",
    travelTips: "Fly into Barcelona El Prat (BCN), 18km from the city — the Aerobus runs to Plaça Catalunya in 30–40 minutes (~€6.75). From the city, the easiest route to Parc del Fòrum is Metro Line 4 (L4 Yellow Line) to El Maresme–Fòrum station — L4 runs 24 hours on Saturday nights and until 2am on Fridays during the festival. The Tram T4 (Trambesòs) stops at the Fòrum terminus and runs extended hours. A Primavera shuttle runs from Plaça Catalunya (~€2). For budget options, Girona Airport (GRO, 103km) serves Ryanair routes — factor in an extra 70–90 minutes and ~€15–20 for the bus to Barcelona Nord.",
    accommodation: "Poblenou (Sant Martí district) is the closest neighbourhood to the festival — 10–20 minutes' walk — with good local restaurants and beach access. El Born is the best balance of location, nightlife, and metro access (~15 min on L4). Eixample has the widest hotel selection from budget to luxury with excellent metro links. Avoid the Gothic Quarter for late-night logistics — it's 20–25 minutes by metro and Barcelona's biggest pickpocket hotspot. Book the full week (June 1–7) if you're doing Primavera a la Ciutat — prices triple in central areas during festival week.",
    packingHighlights: [
      "Sunscreen SPF50+ — reapply every 2 hours; UV index is 7–9+ on the fully exposed concrete esplanade",
      "Well-cushioned trainers or running shoes broken in before the trip — the entire site is concrete, no grass",
      "Light jacket, hoodie or windbreaker — the Mediterranean sea breeze drops temperatures to 17–18°C after midnight",
      "Portable power bank (10,000+ mAh) and short charging cable",
      "High-fidelity earplugs (Loop, Eargasm) — protect your hearing without killing the sound quality",
      "Empty refillable plastic water bottle (max 50cl, no cap allowed through security) — free refill stations are on-site",
      "Wide-brim hat or cap and UV-blocking sunglasses for daytime sessions",
      "Small crossbody bag worn across your chest — quicker through security and harder to pickpocket than a backpack",
      "Lightweight rain poncho — brief June thunderstorms are possible with no shelter on the open esplanade",
      "Cash €30–50 backup; the festival is largely cashless but some Primavera a la Ciutat venues are cash-only",
    ],
    survivalTips: "Don't try to see everything — sets run mid-afternoon to 5–6am. Pick 6–8 must-sees per day and leave gaps for food, rest, and discovery. Take a mid-afternoon break in the shade: eat, hydrate, sit down. You'll last much longer into the night. Use the metro or tram home rather than waiting for taxis — on Friday and Saturday nights the metro runs all night, and leaving 10 minutes before the headliner's last song beats the exit crush. Also book Primavera a la Ciutat shows — festival pass holders can reserve free tickets in Barcelona's clubs (€15 refundable deposit). These intimate club gigs are often the highlight of the whole week.",
    nearbyTrips: "Barcelona rewards extra days. Montjuïc castle and gardens are 30 minutes from the festival site. Sitges is a 40-minute train ride for a classic Catalan beach day. The Costa Brava (Cadaqués, Calella de Palafrugell) is 2–3 hours north for dramatic coastal scenery. Montserrat mountain monastery is 90 minutes by train and rack railway.",
    flightsUrl: "https://www.skyscanner.net/transport/flights/anywhere/BCN/260604/260604/",
    hotelUrl: "https://www.booking.com/search.html?ss=Barcelona%2C+Spain&checkin=2026-06-03&checkout=2026-06-07",
    coords: { lat: 41.4059, lng: 2.2212 },
    capacity: 50000,
    environmentRisks: [
      "Strong Mediterranean sun — UV index 7–9+ in early June; sunburn risk is high even on overcast days. The site has no natural shade.",
      "Daytime temperatures of 24–28°C (75–82°F) with humidity around 70%, making it feel warmer than the reading suggests.",
      "The entire Parc del Fòrum site is hard concrete and stone with no grass — foot, knee and back fatigue builds significantly over multi-hour days.",
      "Sets run until approximately 5–6am; cumulative sleep deprivation across three days is a real risk.",
      "Sea breeze off the Mediterranean can drop the perceived temperature noticeably after midnight — a sudden chill after sweating.",
      "Brief but intense thunderstorms are possible (average 4–7 rain days in June) with little natural shelter on the exposed esplanade.",
      "Barcelona is one of Europe's pickpocketing hotspots — crowded metro carriages and headline stage areas are peak risk zones.",
    ],
    faqs: [
      {
        q: "How hot does it actually get at Primavera Sound in early June?",
        a: "Daytime highs are typically 24–28°C (75–82°F) with humidity around 70%, so it feels warmer than the thermometer reads. The UV index hits 7–9, which is 'very high' — sunburn can happen in under 30 minutes of direct exposure on the concrete site. Sunscreen SPF50+ and a hat are non-negotiable from the moment you arrive.",
      },
      {
        q: "Is the concrete at Parc del Fòrum really that brutal on your feet?",
        a: "Yes. The entire site is paved stone and concrete — there is no grass anywhere. After 10+ hours of standing and walking each day, feet, knees and lower backs take a beating. Cushioned trainers and gel insoles are strongly recommended. Many veterans take brief seated breaks every couple of hours and leave slightly early each night to protect their legs for the next day.",
      },
      {
        q: "Which neighbourhood is best to stay in for quick late-night returns?",
        a: "Poblenou is the closest — a 10–20 minute walk with no transport needed. El Born and Barceloneta are 15–20 minutes by L4 metro. Eixample and the Gothic Quarter work but add 20–30 minutes by metro or taxi. If budget allows, Poblenou removes all transport stress and lets you walk home at 5am safely.",
      },
      {
        q: "How do I get back to the city centre after the headliner finishes?",
        a: "Metro L4 runs until 2am on Fridays and 24 hours on Saturday nights during the festival. On Thursday (a weeknight) it closes at midnight — use the Nit Bus N6, the Tram T4, or the festival shuttle to Plaça Catalunya. Leave slightly before the final song to avoid the worst of the exit crush at El Maresme–Fòrum station.",
      },
      {
        q: "Is it safe to walk back to my accommodation late at night?",
        a: "Walking to Poblenou is fine — the route is well-lit and full of fellow festival-goers. For areas further away, stick to the metro or tram. Avoid walking alone through quiet or poorly lit streets late at night. If taking a taxi or rideshare, use the FreeNow or Cabify apps rather than accepting rides from unmarked cars.",
      },
      {
        q: "Can I bring a water bottle, and are there refill points?",
        a: "Yes — a soft plastic bottle (max 50cl) is allowed but the cap will be confiscated at security. Free water refill stations are available throughout the site, though queues can build at peak times. Stash a spare cap in your pocket to reseal the bottle outside.",
      },
      {
        q: "How bad is the pickpocketing problem — should I be worried?",
        a: "Barcelona is consistently ranked one of Europe's top pickpocketing cities, but violence is extremely rare. Inside the festival the risk is moderate; the bigger danger is on crowded metro carriages after the festival and in tourist areas like La Rambla and the Gothic Quarter. Use a zipped crossbody bag worn across your chest, keep your phone in a front pocket, and leave your passport in your accommodation safe.",
      },
      {
        q: "What happens if it rains?",
        a: "June rain in Barcelona is uncommon but possible — typically brief, intense showers (average 4–7 rain days in June). The site is fully exposed with minimal shelter. A lightweight packable rain poncho takes up no space and is the only realistic option. The festival continues regardless of rain.",
      },
      {
        q: "Is the festival cashless, and do I need euros?",
        a: "The main festival at Parc del Fòrum operates largely cashless — contactless card or phone payment works at most bars and food vendors. Carry €30–50 cash as backup for taxis, city-side bars, and some Primavera a la Ciutat venues that are cash-only.",
      },
      {
        q: "What time do the stages actually open and close each day?",
        a: "Gates typically open in the mid-to-late afternoon (around 3–5pm) and music runs until approximately 5–6am. The exact schedule is published in the official Primavera Sound app a few days before the festival. Pace yourself — trying to go from open to close every night leads to burnout by Saturday. The mid-afternoon break strategy (shade, food, hydration at ~6pm) is the most effective way to last until dawn.",
      },
    ],
  },

  // ── Ultra Miami (new rich entry — missing flagship, Perplexity research April 2026) ──
  // Note: 2026 edition ran March 27–29 (just passed). Page remains live for post-event
  // search traffic and 2027 planning. Update dates/status when 2027 is announced.
  {
    slug: "ultra-miami",
    name: "Ultra Music Festival Miami",
    country: "USA",
    city: "Miami, Florida",
    dates: "Mar 27–29, 2026",
    genres: ["EDM", "House", "Techno", "Trance", "Bass", "Hardstyle", "Progressive House", "Afro House"],
    vibe: "Downtown Miami waterfront mega-festival",
    region: "global",
    type: "city",
    firstTimerFriendly: false,
    budgetLevel: "big-trip",
    status: "tbc",
    image: festivalEdc,
    description: "Three days of electronic music at Bayfront Park, a waterfront urban park on Biscayne Bay in Downtown Miami — 55,000 people daily across Main Stage, RESISTANCE Megastructure, The Cove, and more. Ultra runs alongside Miami Music Week, one of the global electronic music industry's biggest annual gatherings.",
    whyGo: "Ultra Miami is the season opener — the first major global festival of the year, held in late March in Downtown Miami with Biscayne Bay as the backdrop. The RESISTANCE Megastructure is one of the most intense enclosed techno experiences anywhere, while the Main Stage delivers the biggest EDM names on the planet. Being there during Miami Music Week means the whole city is a festival — pool parties, brand showcases, and club nights every day and night from Sunday to the following weekend.",
    travelTips: "Fly into Miami International Airport (MIA), 13km from Bayfront Park. Take the Metrorail Orange Line to Government Center station, then board the free Metromover to Bayfront Park station — about 25 minutes total. The Metromover runs extended hours during Ultra (until 2am Friday and Saturday, midnight Sunday) and is by far the best way in and out. From Fort Lauderdale (FLL), the Brightline train to MiamiCentral station is a 30-minute ride, then a 10-minute walk to Bayfront Park. Do not try to drive — streets around Bayfront Park are closed from Thursday 9pm to Monday 7am. Rideshare surges badly from the festival; set your pickup 3–4 blocks away to reduce cost.",
    accommodation: "Downtown Miami is the best base — some hotels are literally across the street from Bayfront Park. Book 4–6 weeks out as Downtown sells out fast. Brickell (10–15 min walk south along the waterfront or one free Metromover stop) is quieter at night and has newer hotels with better pools. Miami Beach (South Beach) has more inventory and the best nightlife for after-parties but budget 45–60 min each way — the MacArthur Causeway gridlocks during the festival and turns a 15-min drive into an hour or more. Wynwood and Midtown are more affordable with great food and Miami Music Week side events, but require rideshare to reach Bayfront Park.",
    packingHighlights: [
      "Clear plastic bag (max 13×17 in) or fanny pack — Ultra enforces a strict clear-bag policy; backpacks and opaque bags are banned at the gate",
      "Sunscreen (non-aerosol, sealed) — reapply every 2 hours; a Day 1 sunburn ruins the whole weekend in Miami heat",
      "Hat and sunglasses — essential for daytime sets in direct Florida sun",
      "Comfortable broken-in trainers — 8–12 hours daily on concrete and grass; new shoes will blister",
      "Hydration pack (not a backpack, must be empty on entry) — free water refill stations are inside",
      "High-fidelity earplugs — sound levels exceed 100 dB at main stages; quality earplugs reduce volume without killing sound clarity",
      "Compact rain poncho — umbrellas are prohibited; Florida afternoon storms are brief but intense",
      "Portable phone charger — your phone is your wristband, map, and meet-up lifeline",
      "Electrolyte packets — mix into water to replace salts lost sweating in Miami heat and humidity",
      "Valid photo ID — required at entry and to purchase alcohol (21+ for alcohol)",
    ],
    survivalTips: "There is NO re-entry at Ultra — once you leave, you cannot get back in that day. Plan food, hydration, and energy for the full session before you tap through the gates. Use the Metromover, not rideshare — it's free, avoids all traffic, and runs late. Designate a physical meeting point inside the venue because cell service degrades badly with 55,000 people in one park. Don't limit yourself to the Main Stage — RESISTANCE Megastructure and The Cove often have better sets with more room. Arrive early: TSA-style pat-downs slow entry significantly, and peak queueing is 5–7pm. Plan your exit before the headliner's last song — leave 10–15 minutes early to beat the gate crush and rideshare surge.",
    nearbyTrips: "Miami rewards extra days. Wynwood Walls street art district is a 20-minute walk north. South Beach Art Deco district and Ocean Drive are on the other side of Biscayne Bay. The Everglades are a 90-minute drive southwest for an airboat day trip. Key West is 3.5 hours south — perfect for a post-festival recovery overnight. Coconut Grove and Coral Gables offer quieter waterfront dining for when you need a break from festival energy.",
    flightsUrl: "https://www.skyscanner.net/transport/flights/anywhere/MIA/270327/270327/",
    hotelUrl: "https://www.booking.com/search.html?ss=Downtown+Miami%2C+Florida&checkin=2026-03-26&checkout=2026-03-30",
    coords: { lat: 25.7751, lng: -80.1858 },
    capacity: 55000,
    survivalIntelBullets: [
      "No re-entry under any circumstances — plan for the full day before you enter.",
      "Free Metromover to Bayfront Park station is the only stress-free transport option; runs until 2am Friday/Saturday.",
      "DDA Safety Walk (305-415-3896) provides a free escorted walk to your hotel until 2am — use it if travelling alone.",
      "Free water refill stations are throughout the venue — staying hydrated in Miami heat is the single most important thing you can do.",
      "Download the Ultra Worldwide app before you enter and save the map and schedule offline — cell data will be unreliable.",
    ],
    travelAdviceInfo: {
      airport: "Miami International (MIA) — 13km from Bayfront Park, Metrorail + Metromover ~25 min",
      flightCost: "£400–700 return from London (book 2–4 months ahead; Virgin, BA, American direct to MIA)",
      transferOptions: "Metrorail Orange Line → Government Center → free Metromover to Bayfront Park. Or Brightline from FLL to MiamiCentral (~30 min), then 10-min walk.",
      totalJourney: "~10 hrs door to door from UK (9hr flight + immigration + 25min transit). ESTA required ($21 USD).",
    },
    accommodationTiers: {
      budget: "Wynwood/Midtown Airbnbs from ~£100/night. Brickell budget hotels from ~£130/night. Add rideshare cost each way.",
      midRange: "Brickell hotels (1Hotels, SLS Brickell) £200–300/night — walk to Bayfront Park. Downtown Miami properties from £180/night.",
      premium: "Intercontinental Miami or Four Seasons Brickell from £350+/night. Some suites have Biscayne Bay views.",
      bookingTip: "Book Downtown or Brickell as soon as you secure tickets — both areas sell out 4–6 weeks ahead of Ultra weekend.",
    },
    environmentRisks: [
      "Heat and humidity — late-March Miami averages 28–30°C (82–86°F) with high humidity; heat exhaustion is the top reason people end up at the medical tent.",
      "Afternoon thunderstorms — Florida March storms are possible; Ultra may pause stages during lightning. The festival continues in light rain (umbrellas are banned — bring a poncho).",
      "Extreme sound pressure — RESISTANCE Megastructure and main stages push well above 100 dB; sustained exposure without earplugs causes permanent hearing damage.",
      "Crowd density — single-venue urban footprint means tight bottlenecks at peak headliner times; agree on exit strategies before large sets.",
      "Concrete and grass surface — 8–12 hours of standing and dancing on hard ground causes significant foot and knee fatigue by Day 2.",
      "No re-entry — once you exit the venue, you cannot return that day. If you feel unwell mid-day, use the on-site medical tent rather than leaving.",
    ],
    faqs: [
      {
        q: "What time does Ultra end each night and how do I get back to my hotel?",
        a: "The last sets finish around 11pm–midnight (Main Stage headline slots typically end 10:45pm Friday/Saturday, around 9pm Sunday). Metromover and Metrorail run until 2am on Friday and Saturday, midnight on Sunday. Freebee cars operate until 1am Friday/Saturday. Rideshare works but expect heavy surge pricing — set your pickup a few blocks from Bayfront Park to cut costs.",
      },
      {
        q: "Is it better to stay in Downtown/Brickell or on Miami Beach?",
        a: "Downtown or Brickell if Ultra is your priority — both are walking distance to Bayfront Park. Miami Beach has more hotel inventory and the best nightlife for after-parties, but the MacArthur Causeway gridlocks during the festival, turning a 15-minute drive into an hour or more. If you stay on the Beach, budget serious commute time or plan to leave Ultra early each night.",
      },
      {
        q: "How strict is the bag policy and can I bring a hydration pack?",
        a: "Very strict. Only clear plastic/PVC bags (max 13×17 in), one-gallon zip-top bags, fanny packs, small hand-sized clutches, and hydration packs that are not backpacks are permitted. All hydration packs must be empty on entry. Backpacks, opaque purses, and tote bags will be turned away at the gate — no exceptions.",
      },
      {
        q: "Does Ultra allow re-entry if I leave during the day?",
        a: "No. Ultra has a strict no re-entry policy. Once you exit, you cannot get back in that day. Plan to bring everything you need for the full session — sunscreen, charged phone, and enough energy to last. If you feel unwell, use the on-site medical tent rather than exiting.",
      },
      {
        q: "What happens if it rains or there are electrical storms?",
        a: "Light rain — the festival continues and you dance through it (bring a compact poncho; umbrellas are banned). Electrical storms — Ultra will pause stages and may evacuate areas temporarily until the storm passes. Florida storms are usually short and intense, then clear. Follow the Ultra Worldwide app for real-time safety alerts.",
      },
      {
        q: "Is Ultra safe for solo travellers?",
        a: "Yes — thousands attend solo every year. Use the Metromover so you're not reliant on anyone for transport, keep valuables in a front-facing fanny pack, share your live location with someone back home, and use the free DDA Safety Walk service (305-415-3896) for an escorted walk to your hotel after the event. The Reddit r/UMF community also organises meetup groups for solo attendees.",
      },
      {
        q: "How early should I arrive to avoid long security queues?",
        a: "Gates open around 3–4pm on Friday and noon on Saturday and Sunday. Arriving within the first 30 minutes of gate opening means shorter lines. Peak entry is 5–7pm when most people show up. TSA-style pat-downs slow entry — have your clear bag open and pockets emptied before you reach the checkpoint.",
      },
      {
        q: "Is there free water inside the festival?",
        a: "Yes. Ultra provides free water refill stations throughout the venue. Bring an empty hydration pack or buy a reusable bottle inside. Staying hydrated in Miami's heat and humidity is the single most important thing you can do — dehydration is the number-one reason people end up at the medical tent.",
      },
      {
        q: "Do I need cash or is everything cashless?",
        a: "Ultra has moved toward cashless payments for food, drinks, and merchandise. Bring a contactless credit or debit card. Some vendors may still accept cash but don't rely on it. ATMs inside tend to have long queues and high fees.",
      },
      {
        q: "What about phone signal — will I be able to reach my friends inside?",
        a: "Expect significantly degraded cell service with 55,000+ people on-site. Texts are more reliable than calls. Agree on a physical meeting point with your group before entering — ideally a specific landmark near a water station. Download offline maps and the Ultra app schedule before arriving so you're not dependent on data.",
      },
    ],
  },
  {
    slug: "sziget",
    name: "Sziget Festival",
    country: "Hungary",
    city: "Budapest",
    dates: "Aug 11–15, 2026",
    image: festivalCamping,
    region: "eu",
    type: "camping",
    capacity: 80000,
    coords: { lat: 47.5637, lng: 19.0468 },
    firstTimerFriendly: true,
    budgetLevel: "medium",
    genres: ["pop", "rock", "electronic", "hip-hop", "indie"],
    ticketUrl: "https://www.skiddle.com/festivals/sziget-festival/?sktag=15628",
    description:
      "Sziget (pronounced 'Sig-et', meaning 'island') transforms Óbuda Island in the heart of Budapest into a self-contained city of 80,000 daily visitors for five days each August. It's one of Europe's largest and most diverse music festivals — spanning pop, rock, electronic, hip-hop, and everything in between across more than 60 stages. The island setting is genuinely unique: you're surrounded by the Danube, re-entry is allowed throughout the day, and the whole thing feels more like a village you live in than a concert you attend. Most people camp on-site and treat it as a full week-long experience.",
    whyGo:
      "Where else can you watch a headline act, stroll to a silent disco, catch a circus performance, and swim in a pool — all without leaving an island in the middle of Budapest? Sziget's scale and lineup diversity means there's genuinely something for everyone. The city backdrop, the Danube views, and the sheer volume of weird and wonderful things happening across 264 acres make it a one-of-a-kind experience in European festival culture.",
    travelTips:
      "Fly into Budapest Airport (BUD) — well served from most UK/EU cities with budget carriers including Ryanair, Wizzair, and easyJet. From the airport, take the 100E express bus directly to Deák Ferenc tér (downtown), then switch to the M2 metro towards Örs vezér tere, exit at Batthyány tér, and board the HÉV H5 commuter rail to Filatorigát — the island is a short walk from there. Wristband exchange begins from 10 Aug at the K Bridge entrance. Moving-in day is 10 August; the festival proper starts 11 August. Book Budapest accommodation or camping pitches well in advance — the city fills up in August.",
    accommodation:
      "Five tiers to suit every budget: Basic Camping is included in most ticket packages (bring your own tent, first-come pitch allocation); Siesta Camping is a paid upgrade with quieter zones and better facilities; Sziget Ville Premium is the glamping tier with pre-pitched bell tents and semi-private areas; Pre-Pitched Tent packages give you a tent already set up on arrival; and Budapest city hotels offer comfort at the cost of a 30–40-minute commute each day via HÉV H5. For first-timers, on-island camping is strongly recommended — you won't want to commute.",
    survivalTips:
      "Festipay is Sziget's RFID cashless wristband system — top it up online before you arrive to skip the on-site queues. Free drinking water is available at Waterpoints across the island (look for the blue signs). The island is 2.5km end to end so expect 20,000+ steps per day — break in your footwear before you go. Download the Sziget app for the daily timetable and map; signal on-island is patchy. Re-entry is allowed so you can head into Budapest for a day if needed. The E4U pop-up embassy service (near the main entrance) handles lost passports and emergency consular help.",
    survivalIntelBullets: [
      "Pre-load your Festipay wristband online — on-site top-up queues can be 30+ minutes long",
      "Dust masks or buff gaiters are essential when it's dry — 80k people on dry grass = serious dust",
      "Free Waterpoints are marked on the app map — refill constantly, August heat can exceed 35°C",
      "The island is 2.5km end to end — wear shoes you've already broken in, not festival debuts",
      "HÉV H5 runs until around midnight; after that, taxis and ride-share are your only option back to the city",
      "E4U embassy service near the main gate handles lost passports, medical emergencies, and welfare issues",
      "Wristband exchange opens 10 Aug at K Bridge — collect yours before moving-in day rush",
      "Re-entry is allowed all day — you can leave, grab food in Budapest, and come back",
    ],
    packingHighlights: [
      "Dust mask or buff gaiter (essential in dry conditions)",
      "High-SPF sunscreen — the island has limited shade",
      "Hydration pack or large reusable bottle (2L+)",
      "Broken-in trainers or boots — 20,000+ steps daily",
      "Lightweight waterproof (August storms arrive fast)",
      "Portable phone charger — charging points fill up quickly",
      "Cash in HUF for Budapest restaurants and transport",
      "Earplugs for camping (sound carries all night)",
      "Offline maps of Budapest downloaded before arrival",
    ],
    environmentRisks: [
      "Extreme August heat — temperatures routinely exceed 35°C on-island with limited natural shade",
      "Dust storms — 80,000 people on dry grass creates significant dust; respiratory irritation is common",
      "Walking distances — the island is 2.5km end to end; blisters and heat exhaustion from walking are common medical complaints",
      "Sleep deprivation — music continues until 6am across stages; camping directly next to stages means noise all night",
      "Sudden thunderstorms — Budapest August weather can shift quickly; lightning protocol may pause outdoor stages",
    ],
    faqs: [
      {
        q: "Is Sziget too hot to enjoy in August?",
        a: "It can be intense — expect 30–38°C during peak afternoon hours with limited shade on the island. The key is timing: hit the stages you care about in the evening when it cools down, and use the midday heat for swimming, shade-hunting in the art areas, or a trip into Budapest. Hydrate constantly using the free Waterpoints and wear SPF50+ every morning. Heat exhaustion is the number-one medical complaint at Sziget, but it's almost entirely avoidable.",
      },
      {
        q: "Should I camp on the island or stay in a Budapest hotel?",
        a: "For first-timers, camp on the island — the commute from the city adds 30–40 minutes each way via HÉV H5 and turns late-night decisions into logistical problems. On-island camping means you can go back to your tent whenever you need to, re-entry is permitted all day, and you get the full immersive experience. Hotels make sense if you're attending for fewer than three days, prioritise sleep quality, or are travelling with someone who can't camp.",
      },
      {
        q: "Does the HÉV H5 train run all night?",
        a: "No — HÉV H5 service to Filatorigát runs until approximately midnight. After that, your options are taxi (Bolt is the dominant app in Budapest) or ride-share. Factor this into your plans if you're staying in the city; missing the last HÉV means a 20–30-minute taxi ride. On-island campers don't need to worry about this.",
      },
      {
        q: "What's the Festipay system and how does it work?",
        a: "Festipay is Sziget's RFID cashless payment system built into your wristband. You top up a balance online before arriving (strongly recommended) or at on-site top-up stations (expect queues). All food, drink, and merchandise vendors on-island accept Festipay — cash is not accepted inside the festival. Unspent credit can be refunded after the festival via the Festipay website within a set window. Pre-loading at least 50,000 HUF (~€125) is a reasonable starting point for a five-day stay.",
      },
      {
        q: "What happens if I lose my passport or phone on the island?",
        a: "For passports, go directly to the E4U pop-up embassy service near the main entrance — it's staffed by multilingual welfare workers who can initiate emergency travel document procedures with your home country's embassy. For lost phones, report it to the Lost & Found tent near the main entrance. For medical emergencies, the on-site medical centre is staffed 24/7 and located at a fixed point on the festival map — save the location in your offline map before you enter.",
      },
      {
        q: "Is there free drinking water on the island?",
        a: "Yes — Waterpoints with free drinking water are distributed across the island and marked on the official Sziget app map and the paper maps available at info points. Find them before you need them. Tap water in Budapest is safe to drink, so any bottle you can refill at a Waterpoint is fine. Buying bottled water inside the festival via Festipay is an option but gets expensive over five days.",
      },
      {
        q: "Do I need a dust mask?",
        a: "During dry spells, yes — 80,000 people moving across dry grass and compacted earth generates significant dust clouds, particularly near stages during peak crowd movement. A simple washable buff gaiter (pull it up over your nose when needed) is the practical solution most regulars use. A basic disposable dust mask works too. In wet weather it's not an issue, but August at Sziget is more often dry than not.",
      },
      {
        q: "What items are prohibited at Sziget?",
        a: "Sziget prohibits glass containers, cans, professional camera equipment (detachable lens), selfie sticks, drones, pets, and fireworks. Umbrellas with metal tips are also banned. Camping gas canisters are restricted — check the official website for the exact approved sizes. Foldable chairs are allowed on campsite but not in the crowd areas near stages.",
      },
      {
        q: "How big is the site and will I get lost?",
        a: "Óbuda Island covers approximately 264 acres and the festival footprint is roughly 2.5km from the main gate to the far end. It's genuinely large — expect 15,000–25,000 steps on a busy day. Download the Sziget app before you arrive and save your campsite location with a pin; the app has an offline map mode. Agree on a fixed meeting point with your group in case you get separated (the main water tower is a common landmark). Getting slightly lost is part of the experience.",
      },
      {
        q: "Can I leave the island and come back on the same day?",
        a: "Yes — Sziget allows re-entry on the same day as long as your wristband is valid and scanned on the way out. This means you can head into Budapest for lunch, visit the thermal baths, or grab supplies from a supermarket (significantly cheaper than on-island prices) and return without any issue. Keep your wristband on and dry — damaged RFID chips at the exit scanner can cause delays.",
      },
    ],
  },
  // ── Night Horizon Festival (Case A — new, no CSV stub) ──
  {
    slug: "night-horizon",
    name: "Night Horizon Festival",
    country: "Croatia",
    city: "Novalja, Pag Island",
    dates: "Aug 16–21, 2026",
    image: festivalUltra,
    region: "eu",
    type: "beach",
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "on-sale",
    genres: ["Techno", "Tech-house", "Melodic techno"],
    coords: { lat: 44.5582, lng: 14.8897 },
    description:
      "Night Horizon is a brand-new six-night techno and tech-house festival at LIFT Beach Club on Zrce Bay, Pag Island — the only remaining open-air beach club on Zrce Beach, fully redesigned and reopened in May 2026. Expect over-the-water decks, sea-view stages, sunset warm-up sets rolling into 6am afterhours, and an intimate first-edition crowd of serious electronic music fans. The Adriatic setting — stone beach, warm sea, mountain backdrop — makes this one of the most naturally stunning festival environments in Europe.",
    whyGo:
      "Zrce Beach has hosted some of the most memorable sunrise sets in European electronic music history, and Night Horizon is the 2026 chapter of that story. Being a first-edition festival means a tighter, more dedicated crowd and shorter queues — you'll actually get close to the stage. The LIFT venue is fully rebuilt over the water, so the sound carries across the bay and the sunset views during the warm-up sets are genuinely extraordinary. Add six nights of programming, daytime boat parties, and one of Europe's warmest August seas, and this is a compelling alternative to legacy Zrce festivals.",
    travelTips:
      "Fly into Zadar Airport (ZAD) — closest at 85 km / ~1.5 hours by road. Pre-book a shared shuttle or private transfer from Zadar to Novalja; festival-week slots fill fast. Split (SPU, ~2.25 hours) is a viable alternative if flights to Zadar are expensive. Once in Novalja, the festival shuttle runs to Zrce Beach day and night for €2–5 per ride with multiple departures per hour. Do not walk the Novalja-to-Zrce road at night — it is unlit with no pavement.",
    accommodation:
      "Stay in Novalja town centre (best for first-timers: widest choice of apartments, restaurants, ATMs, pharmacies, and regular shuttle access to Zrce all night) or Gajac (modern apartment complexes, often with pools, slightly quieter). There is virtually no accommodation directly on Zrce Beach — the beach is a party venue only. Book 3+ months out; Novalja fills during August festival weeks. Confirm air conditioning before booking — daytime temperatures hit 33°C regularly.",
    survivalTips:
      "Sets run from around 8pm to 6am across six consecutive nights. Pace yourself: pick three or four peak nights for full sessions, use the others for daytime beach, boat parties, or proper sleep. Download the Bolt app before arriving for late-night rides back to Novalja. Croatia uses the Euro; carry €50–100 in cash for taxis and cash-only vendors. Travel insurance covering festival attendance is strongly recommended — the nearest hospital for serious cases is Zadar General (~1.5 hours). Emergency number: 112.",
    survivalIntelBullets: [
      "Never walk the Novalja-to-Zrce road at night — no lighting, no pavement, genuine risk",
      "Alternate every alcoholic drink with a full glass of water — heat + alcohol dehydrates faster than you expect",
      "Agree a meeting point with your group before entering — signal at beach venues is unreliable",
      "Book your festival shuttle/taxi back to Novalja before you need it — queues at 4am are long",
      "Swim sober and with a buddy — even calm Adriatic water is dangerous when coordination is impaired",
      "Use a zipped crossbody bag or running belt — beach and over-water venues make dropped items unrecoverable",
      "Sleep 5–6 hours per day minimum — heat + sleep deprivation is a dangerous combination over six nights",
    ],
    packingHighlights: [
      "High-SPF sunscreen (50+), UV lip balm, and a hat — 12+ hours of direct Adriatic sun daily",
      "Swimwear and a quick-dry towel (sea temperature ~25–26°C in August)",
      "Breathable daytime clothing (linen/cotton) plus a light long-sleeve for post-midnight wind chill",
      "Sturdy comfortable shoes for dancing on hard decks and stone/pebble surfaces",
      "Electrolyte sachets or tablets and a 1L+ refillable water bottle",
      "High-fidelity earplugs (musician-grade) — open-air sound systems for 8+ hours will damage hearing",
      "Small waterproof dry bag for phone and valuables — over-the-water venue means sea spray is likely",
      "Portable phone charger — long nights away from accommodation drain batteries fast",
      "Basic first aid: blister plasters, paracetamol, anti-diarrhoea tablets, personal medication",
    ],
    environmentRisks: [
      "Intense August heat — 29–33°C during the day with 12+ hours of direct Mediterranean sun; heatstroke risk is real outdoors",
      "Sleep deprivation — sets run sunset to early morning across six consecutive nights; cumulative fatigue compounds every other risk",
      "Dehydration accelerated by alcohol — high heat plus drinking strips fluid faster than most people expect",
      "Sustained loud sound levels — open-air club systems for 8+ hours a night cause lasting hearing damage without quality earplugs",
      "Pebble and stone beach surfaces — Zrce Beach is not sand; barefoot injuries are common, and over-water decks at LIFT are slippery when wet",
      "Bora wind gusts — rare in August but possible; sudden cool gusts off the mountains can catch people off guard when damp from swimming",
    ],
    nearbyTrips:
      "Zadar old town is 85 km from Novalja — beautiful Roman forum, stunning sea organ, and the best coffee in Dalmatia. Plitvice Lakes National Park is a 2-hour drive inland — a UNESCO-listed waterfall landscape perfect for a recovery day. The island of Pag itself has a remarkable moonscape interior worth exploring if you have a hire car.",
    faqs: [
      {
        q: "Which airport is best for Night Horizon Festival and how do I get to Zrce Bay?",
        a: "Zadar (ZAD) is the closest at 85 km / ~1.5 hours by road. Pre-book a shared shuttle or private transfer to Novalja. Split (SPU) works too at ~2.25 hours if flights are cheaper. From Novalja, shuttle buses run to Zrce Beach day and night during festival week for €2–5.",
      },
      {
        q: "Is it better to stay in Novalja town or closer to Zrce Beach?",
        a: "Novalja town centre is the best base for first-timers — widest choice of apartments, restaurants, shops, and pharmacies, with regular shuttle and taxi access to Zrce all night. There is virtually no accommodation directly on Zrce Beach itself; the beach is purely a party venue.",
      },
      {
        q: "How intense is the August heat and can you actually sleep during the day?",
        a: "Expect 29–33°C during the day and 21–23°C at night. Air conditioning in your accommodation is essential — confirm it before booking. Use blackout curtains or a sleep mask, earplugs, and try to get at least 5–6 hours of sleep per day to avoid dangerous fatigue over a six-night run.",
      },
      {
        q: "Are there safe taxis or shuttles back to accommodation late at night?",
        a: "Yes. Festival-week shuttles run between Novalja and Zrce Beach throughout the night (multiple departures per hour, ~€2–5). Taxis wait at Zrce Beach but expect queues and higher prices (€15–25) after midnight. The Bolt app also works in Novalja. Never walk the road at night — it is unlit with no pavement.",
      },
      {
        q: "Can I swim during the festival and is it safe after drinking?",
        a: "The sea at Zrce Bay is warm (~25–26°C in August) and great for daytime swims between sessions. Do not swim after drinking or at night — even calm Mediterranean water is dangerous when your judgement and coordination are impaired. Always swim with a buddy.",
      },
      {
        q: "Is Night Horizon Festival safe for solo travellers or small groups?",
        a: "Yes. Zrce Beach has hosted international festival crowds for over a decade. The venue is contained, well-staffed, and the crowd skews friendly and international. Solo travellers should share their live location with someone at home, stay aware of their surroundings, and use shuttles or taxis rather than walking alone at night.",
      },
      {
        q: "What is LIFT Beach Club like as a venue?",
        a: "LIFT is a newly redesigned, fully open-air beach club set above the water on Zrce Bay — the only remaining over-the-water venue on the beach. Expect sea-view decks, high-end sound, and an intimate atmosphere compared to the now-closed larger clubs. It reopened in May 2026 after a full renovation.",
      },
      {
        q: "How do I pace myself across five or six nights of partying?",
        a: "Pick your priority nights (usually when headliners play) and go lighter on the others. Use daytime for sleeping, eating properly, swimming, and hydrating. A boat party is a great lower-intensity alternative to a full club night. Skipping one night entirely to rest is smart, not weak.",
      },
      {
        q: "Do I need cash or can I pay by card everywhere?",
        a: "Croatia uses the Euro. Most venues and restaurants accept cards, but some taxis, small vendors, and shuttle buses may be cash-only. Carry €50–100 in cash as backup. ATMs are available in Novalja town centre.",
      },
      {
        q: "What should I do in a medical emergency at the festival?",
        a: "Call 112 (Croatia's universal emergency number). Alert venue security or first aid staff immediately — the festival has on-site medical support. The nearest clinic is Ambulanta Novalja in town; serious cases are transferred to Zadar General Hospital (~1.5 hours away). Travel insurance covering festival attendance is strongly recommended.",
      },
    ],
  },
  // ── Untold Festival (Case A — CSV stub → rich entry) ──
  {
    slug: "untold-festival",
    name: "Untold Festival",
    country: "Romania",
    city: "Cluj-Napoca",
    dates: "Aug 6–9, 2026",
    image: festivalTomorrowland,
    region: "eu",
    type: "city",
    capacity: 300000,
    coords: { lat: 46.7712, lng: 23.5869 },
    firstTimerFriendly: true,
    budgetLevel: "medium",
    status: "on-sale",
    genres: ["EDM", "House", "Techno", "Drum & Bass", "Trance", "Hip-Hop", "Live Acts"],
    ticketUrl: "https://www.skiddle.com/festivals/untold-festival/?sktag=15628",
    description:
      "UNTOLD is Romania's biggest music festival and one of the most decorated in the world — rated 3rd best festival globally. Four days in Cluj-Napoca, August 6–9 2026, across six stages centred on Cluj Arena stadium, Central Park, and the Someș Riverbank. Over 300,000 attendees, sets running until 05:00 every night, and a lineup that spans EDM, house, techno, drum & bass, trance, hip-hop, and live acts. And it costs a fraction of Tomorrowland or Glastonbury to attend. Cluj-Napoca is a university city with a genuine bar and restaurant scene — you can eat brilliantly for £10 and get a taxi for £2.",
    whyGo:
      "UNTOLD is the biggest festival bargain in Europe right now. You get a world-class lineup, immaculate production inside a real football stadium, and four nights of music until dawn — all in one of Romania's most liveable, architecturally rich cities. The locals are warm, the food is excellent, and your festival budget goes three times as far as it would in Belgium or the UK. It's not widely known outside Eastern Europe yet, which makes the crowds younger, more energetic, and less jaded than you'd find at equivalent Western European events.",
    travelTips:
      "Fly direct to Cluj-Napoca International Airport (CLJ, 8 km from city centre) — served from London, Milan, Barcelona, Munich, Vienna, and Budapest. Book early: festival-week flights fill fast. From the airport, take a Bolt or taxi to the centre (~10–15 min, ~€8 / RON 40) or bus lines A1E, 5, or 8 (~25 min, ~€1.20 / RON 6; runs 05:00–23:00). If you can't find CLJ flights, Bucharest (OTP, ~450 km) has more international routes — from there, take a domestic flight (~1 hr) or train (~8–9 hrs). From the city centre, Cluj Arena is a 15–20 min walk or a short Bolt ride. Pre-book a Bolt for the 05:00 finish to avoid a scramble.",
    accommodation:
      "Book the moment you secure your ticket — Cluj fills for UNTOLD months in advance and prices inflate dramatically. City centre (Piața Unirii area) is the most popular base: walking distance to restaurants and bars, 15–20 min walk or short taxi to Cluj Arena. Near the arena (Grigorescu / Mărăști) is ideal if you can find it — walking distance to the venue. Zorilor and Mănăștur offer better availability with good bus connections. Florești suburb is the budget fallback (~30 min by bus). Official UNTOLD partner dorms (student accommodation empty in August) and hostels are bookable via the festival website — check there first.",
    survivalTips:
      "Complete online check-in within 30 days of ticket purchase — late or on-site check-in costs €25 extra. Order your wristband for home delivery in July or collect from pick-up points in Cluj (e.g., Iulius Mall) before the festival. The festival is fully cashless: your wristband has an RFID payment chip. Top up your credit online before arriving — on-site top-up queues are long. Two entries per day are allowed per wristband (access runs 16:00–05:00). Umbrellas are banned — bring a rain cape instead. Max bag size is 29 × 21 × 12 cm. Download offline maps of Cluj and save your accommodation address before arrival: phone networks overload on peak nights.",
    survivalIntelBullets: [
      "Complete online check-in within 30 days of purchase — on-site check-in costs €25 extra",
      "Top up your RFID wristband credit online before arriving — on-site queues are long",
      "Umbrellas are banned — pack a lightweight rain cape or poncho instead",
      "Bag limit is 29 × 21 × 12 cm — standard backpacks will be turned away",
      "Two entries per day allowed; festival access runs 16:00–05:00 each day",
      "Pre-book a Bolt for the 05:00 finish — there's no such thing as an easy taxi at 5am with 100k people leaving",
      "Romania's emergency number is 112 — save it before you travel",
    ],
    packingHighlights: [
      "SPF 50 sunscreen (non-aerosol, allowed through security) — Cluj Arena open roof means full sun exposure",
      "Comfortable broken-in trainers — 10+ hours on feet per night on concrete and grass",
      "Light jacket or hoodie — temperatures drop to 15°C between 03:00 and 06:00",
      "Rain cape or poncho (umbrellas banned) — August thunderstorms are common",
      "Power bank and charging cable — your phone is your ticket, wallet, and map",
      "High-fidelity earplugs (Loop, Eargasm) — four nights of festival sound",
      "Small crossbody bag within the 29 × 21 × 12 cm size limit — zippered to deter pickpockets",
      "Card and some cash for wristband top-ups (Visa, Mastercard, Amex, and cash accepted at credit points)",
      "Valid photo ID or passport — required for wristband collection and age verification",
      "Tissues and wet wipes; basic painkillers in a cut blister pack (no full boxes through security)",
    ],
    nearbyTrips:
      "Cluj-Napoca is worth a day of exploring before or after the festival — the Old Town, Piața Unirii, and the Botanical Garden are all excellent. Turda Salt Mine (40 km south) is one of Romania's most remarkable attractions — an underground theme park in a former salt mine. The Apuseni Mountains are an hour west for hiking and caving. Sibiu is a beautiful medieval city 2 hours by train for a recovery day.",
    environmentRisks: [
      "August daytime highs of 27–28°C with strong UV, especially inside the open-roof Cluj Arena — SPF 50 is essential",
      "Sets run until 05:00 each night; four consecutive late-night sessions cause serious cumulative fatigue",
      "Peak crowd density inside Cluj Arena on Friday and Saturday can exceed 100,000 people — know where exits are",
      "Afternoon thunderstorms are common (~9–11 rainy days in August); umbrellas are banned so rain capes are mandatory",
      "Nighttime temperatures can drop to 15°C — a sharp contrast to daytime heat that catches people off guard in light summer clothing",
    ],
    faqs: [
      {
        q: "How hot does it get at UNTOLD and what should I wear?",
        a: "Daytime highs reach 27–28°C with strong UV. By 03:00–05:00 it can drop to 15°C. Wear light breathable clothes during the day and bring a light jacket for the early morning hours. Sunscreen (non-aerosol) is allowed through security — apply it.",
      },
      {
        q: "How early do I need to book accommodation in Cluj?",
        a: "Immediately after buying your ticket. Cluj-Napoca sells out months in advance for UNTOLD and prices inflate dramatically. Check the official UNTOLD website for partner dorms and hotels first, then Booking.com and Airbnb. Florești suburb is a good budget alternative if the city centre is sold out.",
      },
      {
        q: "Is it safe to walk back to my hotel at 5am?",
        a: "Cluj is a generally safe city with low violent crime. Stick to main, well-lit roads and travel in a group where possible. Bolt operates 24/7 and is the safest and easiest late-night option. Avoid poorly lit shortcuts and keep valuables hidden. Save 112 (Romania's emergency number) in your phone.",
      },
      {
        q: "How do I get from Cluj airport to the festival?",
        a: "CLJ airport is 8 km from the city. Bolt or taxi takes 10–15 min (~€8 / RON 40). Bus lines A1E, 5, and 8 run every 10–30 min from 05:00 to 23:00 (~€1.20 / RON 6, 25 min). From the city centre, Cluj Arena is a 15–20 min walk or short Bolt ride.",
      },
      {
        q: "What is UNTOLD's re-entry policy?",
        a: "Two entries per day are allowed per wristband. Festival access runs from 16:00 to 05:00 each day. Your wristband is scanned on entry and exit. Do not remove or damage your wristband — replacements require proof of purchase or a new ticket.",
      },
      {
        q: "Is UNTOLD suitable for solo travellers?",
        a: "Yes. The crowd is friendly and international, Cluj is safe, and there is a strong solo-traveller community (check r/UntoldFestival on Reddit). Book a hostel or official dorm to meet people naturally. Set a physical meeting point with any new friends in case phone signal drops on peak nights.",
      },
      {
        q: "Is the festival cashless? How do I pay for food and drinks?",
        a: "Entirely cashless. Your wristband has an integrated RFID payment chip. Top up online before arriving to skip queues. On-site credit points accept Visa, Mastercard, Amex, and cash. Unused credit can be refunded after the festival via the UNTOLD website.",
      },
      {
        q: "What bag size is allowed and what items are banned?",
        a: "Max bag size is 29 × 21 × 12 cm (roughly a small crossbody bag). Banned items include glass bottles, cans, food and drink, umbrellas, drones, professional cameras, selfie sticks, and weapons. Sunscreen (non-aerosol), compact cameras, GoPros, lighters, and small power banks are allowed.",
      },
      {
        q: "How do I handle my wristband and check-in?",
        a: "Complete online check-in within 30 days of purchase — it's free, and avoids a €25 on-site check-in fee. You can order wristband home delivery in July or collect from pick-up points in Cluj (e.g., Iulius Mall). Bring your QR code and valid photo ID.",
      },
      {
        q: "What happens if it rains?",
        a: "August in Cluj averages 9–11 rainy days, mostly afternoon thunderstorms. Umbrellas are banned, so bring a lightweight rain cape or poncho — this is non-negotiable. The main stage area at Cluj Arena is open-air; you will get wet if it rains. Stages in Central Park have some tree cover.",
      },
    ],
  },
];

// ─── GUIDES ─────────────────────────────────────────────────

export interface Guide {
  slug: string;
  title: string;
  category: string;
  excerpt: string;
  readTime: string;
  image: string;
  content: string;
}

export const guides: Guide[] = [
  {
    slug: "first-international-festival",
    title: "Your First International Festival: The Complete Guide",
    category: "First Time Abroad",
    excerpt: "Everything you need to know before booking your first festival trip abroad — from choosing the right festival to surviving the journey home.",
    readTime: "12 min read",
    image: festivalCamping,
    content: `Going to your first festival abroad is one of those life experiences that changes you. The combination of music, travel, new people, and total freedom is unlike anything else. But it can also be overwhelming if you don't plan properly.

## Choosing Your First Festival

Not all festivals are created equal for first-timers. Here's what to consider:

**Start European.** Your first international festival should be in Europe — shorter flights, no visa hassles (for UK passport holders), and easier logistics. Tomorrowland, Ultra Europe, and Sziget are all excellent first choices.

**Consider the vibe.** Do you want camping or city? Mud and wellies or beach and sunshine? A 200,000-person mega-festival or a 5,000-person boutique event? Be honest about what you'll enjoy.

**Budget realistically.** Your first big festival abroad will cost £500–1,500 all-in (ticket, travel, accommodation, spending money). Don't let the ticket price fool you — it's usually only 30–40% of the total cost.

## Booking Your Trip

**Tickets first, everything else second.** Many big festivals sell out within hours. Set alerts, join waitlists, and be ready to buy the moment tickets drop. Don't book flights until you have your ticket confirmed.

**Flights: the earlier, the cheaper.** Festival flight prices spike as the event approaches. Book within a week of securing your ticket. Use Skyscanner or Google Flights to find the best deals. Consider nearby airports — flying into Antwerp instead of Brussels, or Bergamo instead of Milan, can save you £50–100.

**Travel insurance is non-negotiable.** You need cover for medical emergencies, lost/stolen belongings, and trip cancellation. Make sure your policy covers festival attendance. SafetyWing and World Nomads are solid options.

## What to Pack

Your packing list will vary by festival, but these are universal essentials:

1. **Passport and copies** — keep digital copies in your email
2. **Phone charger and power bank** — 20,000mAh minimum
3. **Earplugs** — Loop Experience or similar high-fidelity plugs
4. **Basic first aid** — plasters, painkillers, rehydration sachets
5. **Cash and cards** — notify your bank about travel, bring backup payment
6. **Comfortable shoes** — broken in, not brand new
7. **Rain protection** — even Mediterranean festivals can surprise you

Check our festival-specific packing lists for detailed gear recommendations.

## At the Festival

**Day one is orientation day.** Don't try to see everything immediately. Walk the site, find water points, locate medical tents, identify meeting points, and get your bearings.

**Buddy system works.** Even if you're going solo, making friends early and having people who know where you're sleeping is smart safety practice.

**Pace yourself.** Multi-day festivals are marathons, not sprints. Eat proper meals, sleep when you can, and don't go too hard on day one.

## Coming Home

The post-festival blues are real. You've just had one of the best experiences of your life, and now you're back to reality. It helps to:

- Book a recovery day before going back to work
- Share photos and stories with your festival crew
- Start planning your next one (it helps, trust us)

Your first international festival is just the beginning. Welcome to the Travel Ravers community.`
  },
  {
    slug: "ultimate-festival-packing-list",
    title: "The Ultimate Festival Packing List (2026 Edition)",
    category: "Packing & Gear",
    excerpt: "A no-nonsense, category-by-category packing list built by people who've forgotten stuff at every major festival so you don't have to.",
    readTime: "8 min read",
    image: gearFlatlay,
    content: `We've collectively attended 200+ festivals. We've forgotten sunscreen in Croatia, wellies in Cheshire, and a tent at Tomorrowland (long story). This list exists so you don't make our mistakes.

## The Non-Negotiables

These items are universal. Every festival. Every time.

- **Ticket / wristband** — obvious but people forget
- **Passport / ID** — for international festivals
- **Phone + charger + 20,000mAh power bank**
- **Cash + bank card** (notify bank about travel)
- **Travel insurance documents**
- **Earplugs** — Loop Experience, Eargasm, or similar
- **Reusable water bottle** — many festivals have free refill points
- **Sun cream SPF 30+**
- **Basic first aid kit** — plasters, ibuprofen, paracetamol, rehydration sachets

## Camping Essentials

If your festival involves camping, add these:

- **Tent** — practice pitching before you go
- **Sleeping bag** — rated to 5°C for UK festivals, lighter for Mediterranean
- **Roll mat or air mattress** — your back will thank you
- **Pillow** — inflatable or compressible
- **Head torch** — red light mode to not blind your neighbours
- **Dry bags** — for keeping electronics and clothes dry
- **Bin bags** — for wet/dirty clothes and general tidiness
- **Duct tape** — fixes everything

## Clothing

Pack for the weather, but expect the unexpected:

- **Comfortable shoes** — broken in, not new
- **Wellies** — for UK festivals, always
- **Rain jacket / poncho** — lightweight and packable
- **Warm hoodie or fleece** — nights get cold everywhere
- **Shorts + t-shirts** for daytime
- **Swimwear** — for beach/pool festivals or unexpected hose-downs

## Tech & Power

- **Portable charger 20,000mAh+**
- **Charging cables (2x)** — one always breaks
- **Waterproof phone case**
- **Small bluetooth speaker** — for the campsite
- **Head torch** — much better than phone torch

## The Travel Ravers App

Download our companion app for an interactive, festival-specific packing checklist that adapts based on your destination, weather forecast, and festival type. Check items off as you pack, and never forget essentials again.`
  },
  {
    slug: "solo-raver-safety",
    title: "Solo Raver Safety Guide: How to Festival Alone (And Love It)",
    category: "First Time Abroad",
    excerpt: "Going solo doesn't mean going unprepared. Practical safety tips, meeting people strategies, and mindset advice for independent festival-goers.",
    readTime: "10 min read",
    image: heroFestival,
    content: `Some of the best festival experiences happen when you go alone. You follow the music, not the group. You meet people from every corner of the world. You discover things about yourself.

But going solo also means being your own safety net. Here's how to do it right.

## Before You Go

**Tell someone your plans.** Share your itinerary, accommodation details, and check-in schedule with a trusted friend or family member. The Travel Ravers app has a squad feature that lets people track your general location (with your permission).

**Book safe accommodation.** For solo travellers, hostels are often safer than isolated campsites. You'll meet people, have a locker for valuables, and have staff nearby if you need help.

**Research the area.** Know the local emergency number, nearest hospital, and how to get back to your accommodation from the festival at 4am.

## At the Festival

**Trust your instincts.** If a situation feels wrong, leave. No set, no DJ, no party is worth your safety.

**Watch your drinks.** Never leave drinks unattended. Accept drinks only from bartenders. If your drink tastes weird, dump it.

**Make festival friends early.** The camping queue, the first act of the day, the food area — these are all great places to meet people. Solo ravers tend to find each other.

**Keep your phone charged.** Your phone is your map, your ticket, your communication lifeline, and potentially your safety device. Carry a power bank always.

**Know your limits.** Without friends to check on you, you need to be more self-aware about hydration, exhaustion, and substance use.

## Getting Home Safe

**Pre-plan your exit.** Know the last bus, train, or shuttle time. Have a taxi app installed with payment set up. Share your ride details with someone.

**Buddy up for the journey.** Even if you festival alone, try to leave with other people heading the same direction.

**Trust the welfare team.** Every reputable festival has welfare services. They're not there to get you in trouble — they're there to help. Use them.`
  },
  {
    slug: "best-hydration-packs",
    title: "Best Hydration Packs for Festivals (Tested & Ranked)",
    category: "Packing & Gear",
    excerpt: "We tested 8 popular hydration packs at real festivals. Here are the ones that actually survived mud, crowds, and 14-hour days.",
    readTime: "6 min read",
    image: gearFlatlay,
    content: `A hydration pack is one of the smartest investments you can make for festival season. Hands-free water access means you drink more, feel better, and don't miss a beat while your friends queue at the bar.

## What to Look For

- **Capacity:** 2L bladder minimum for day festivals, 3L for multi-day camping
- **Pockets:** Room for phone, power bank, earplugs, and cash
- **Comfort:** Padded straps that don't dig in after 8 hours
- **Security:** Anti-theft features like hidden zips and RFID pockets
- **Washability:** You need to be able to clean the bladder properly

## Our Top Picks

### 1. CamelBak Rogue Light — Best Overall
The gold standard. 2L bladder, comfortable mesh back panel, and enough pocket space without being bulky. Survives festival abuse year after year.

**Best for:** Most festivals
**Price:** ~£65

### 2. Osprey Hydraulics — Best for Multi-Day
Slightly larger with a 2.5L bladder and more pocket space. The magnetic bite valve is genius — it clips to the shoulder strap and stays clean.

**Best for:** Camping festivals, multi-day events
**Price:** ~£80

### 3. Vibedration VIP — Best Budget
Affordable, loads of designs (including some proper rave-ready ones), and gets the job done. The bladder isn't as durable as CamelBak but it's half the price.

**Best for:** First-timers, budget ravers
**Price:** ~£30

## Pro Tips

- **Freeze the bladder** the night before for ice-cold water on day one
- **Clean with bicarbonate of soda** after every use to prevent mould
- **Add electrolyte tablets** — especially at hot festivals
- **Practice the bite valve** before the festival (sounds dumb, but first-timers always struggle)`
  },
  {
    slug: "creamfields-camping-survival",
    title: "Creamfields Camping Survival Guide",
    category: "Festival Deep Dives",
    excerpt: "Everything you need to know about surviving (and thriving at) the UK's biggest dance music festival. From mud strategy to stage navigation.",
    readTime: "9 min read",
    image: festivalCreamfields,
    content: `Creamfields is a beast. 80,000 people, eight stages, four days, and the near-certainty of mud. This guide is for people who want to do it properly — not just survive, but actually have the time of their life.

## Getting There

**Coach is king.** National Express and various regional coach operators run directly to the site. No parking stress, no designated-driver politics, and you can start the weekend on the bus.

**Train + shuttle** is the second best option. Runcorn or Warrington Bank Quay are both within 20 minutes of shuttle buses. Book your shuttle in advance — the queues are brutal if you haven't.

**Driving** works if you're a group of four or more splitting the cost. Get the official car park (not the dodgy unofficial ones on farm fields). Factor in that you won't be drinking for the drive home.

## Arriving and Setting Up Camp

The gates usually open midday on Thursday for Thursday ticket holders, Wednesday for some packages. **Arriving early is massively worth it** — better pitch locations, shorter queues for everything, and time to find your bearings before it kicks off.

**Good pitch location principles:**
- Away from the arena entrance (noisy all night)
- Near a water point but not directly on it (crowded and muddy)
- Near a recognisable landmark (big tree, distinctive tent, campsite flag)
- Slightly elevated if possible (drainage when it rains)

**Bring a trolley.** The walk from the car park or shuttle drop-off to camping can be 1.5km. Without a trolley, you're making five trips or destroying your back.

## Mud Strategy

It will probably be muddy. It might be very muddy. It has, historically, been catastrophically muddy.

**Wellies are non-negotiable.** Don't bring festival shoes you care about. Bring wellies and a pair of trainers for inside your tent.

**Dry bags** for your phone, power bank, and any valuables. Seal them inside your tent pocket too.

**Bin bags** — one for sitting on at the campsite, one for storing dirty clothes.

## The Site Layout

The arena and camping are separate, with a walk of 20–30 minutes between them depending on your pitch location. Plan your exits before you need them — leaving a headliner to find your tent at 3am in the dark is a uniquely miserable experience.

Key things to locate on your first walk-around:
- Medical tent and welfare point
- Free water refill stations (there are several — find the one nearest your stage of the day)
- Cash points (limited — bring cash from home)
- Your preferred stage exits

## Stage Strategy

Creamfields stages run simultaneously with overlapping sets. Download the app and build a rough schedule on Thursday evening, but don't be a slave to it — some of the best Creamfields memories come from wandering into the wrong stage at the right moment.

**The steel yard** is the dedicated underground stage for techno/house heads. Less commercial, better production for serious music fans.

**Arc** is the big EDM mainstage experience — spectacular production, massive crowds.

## Surviving Multi-Day

- Eat a proper meal once a day. Festival food is expensive and mediocre but you need fuel.
- Sleep when tired. Day 1 survivors who push through often struggle to function by day 3.
- Hydration is underrated — alcohol plus physical exertion plus limited sleep is a recipe for feeling terrible. Match every drink with water.
- Find your squad before the signal dies. Tell people where you're camping, not just "somewhere in Blue Zone".`
  },
  {
    slug: "festival-budget-breakdown",
    title: "Festival Budget Breakdown: What a Trip Actually Costs in 2026",
    category: "Money & Logistics",
    excerpt: "The honest numbers behind a festival trip abroad. We break down every cost so you can plan without nasty surprises.",
    readTime: "8 min read",
    image: heroFestival,
    content: `"The ticket is the expensive bit, right?" Wrong. For most international festival trips, the ticket is only 30–40% of the total cost. This guide gives you the honest breakdown so you can budget properly.

## The Four Cost Buckets

Every festival trip has four main cost areas: **Ticket, Travel, Accommodation, and On-Site Spending.** Let's break each down by trip tier.

---

## Budget Trip: Creamfields or EXIT Serbia (~£300–450 all-in)

**Creamfields (UK camping)**
- 4-day ticket: £175–225
- Coach (return): £20–40
- Food & drinks on-site (4 days): £80–120
- **Total: £280–390**

**EXIT Festival (Serbia)**
- 4-day ticket: £80–110
- Return flights (UK–Belgrade): £60–120
- Accommodation (3 nights guesthouse): £30–50
- Food & drinks (very cheap in Serbia): £60–80
- **Total: £230–360**

EXIT is genuinely one of the best-value major festivals in Europe. Serbian prices are 40–50% cheaper than Western Europe.

---

## Mid-Range Trip: Tomorrowland or Dimensions (~£700–1,200 all-in)

**Tomorrowland (Belgium)**
- Weekend ticket: £250–350
- Return flights (UK–Brussels): £80–160
- DreamVille camping: £200–350 (depending on package)
- Food & drinks on-site: £150–250
- **Total: £680–1,110**

The DreamVille camping prices vary wildly — Magnificent Greens (budget camping, £200) vs Comfort packages (£350+). Your choice here drives the budget more than anything else.

**Dimensions (Croatia)**
- 5-day ticket: £160–200
- Return flights (UK–Pula): £80–150
- On-site camping: £30–50
- Food & drinks: £100–150
- **Total: £370–550** — this is excellent value for a 5-day boutique festival.

---

## Big Trip: EDC Las Vegas or Movement Detroit (~£1,200–2,000+)

**EDC Las Vegas**
- 3-day ticket: £200–280
- Return flights (UK–Las Vegas): £400–700
- Hotel on the Strip (3 nights, split 2 ways): £150–300
- Food, drinks & gambling losses: £200–400
- **Total: £950–1,680**

The Strip hotel price depends massively on whether you're sharing. Split between four people in a suite, accommodation drops to £80–100 each.

---

## Hidden Costs to Budget For

These are the things people consistently forget:

- **Travel insurance:** £20–60 for a European festival trip. Non-negotiable.
- **ESTA/visa fees:** US trips require an ESTA ($21). Australia needs an ETA.
- **Airport transfers:** Taxis from airports are 3–5x pricier than shuttles. Research in advance.
- **Gear you don't own:** First-time campers often need to buy a tent, sleeping bag, wellies. Budget £80–150 for kit if starting from scratch.
- **Currency conversion fees:** Using your debit card abroad without a travel card (Wise, Revolut, Monzo) typically costs 3–5% per transaction.

## Saving Money Without Suffering

- **Buy tickets from official presales** — face value saves 20–40% vs resale.
- **Use Skyscanner everywhere tickets** to track flight prices over time.
- **Split accommodation** — a 4-person Airbnb costs the same per-head as a hostel dorm but you get a kitchen.
- **Prep festival snacks** — protein bars, electrolyte sachets, and a reusable bottle save £40–80 in food costs at a 4-day festival.
- **Sort currency before you go** — Wise or Revolut cards, or withdraw cash from a local ATM on arrival (avoid airport exchange desks).`
  },
  {
    slug: "best-earplugs-for-raves",
    title: "Best Earplugs for Raves and Festivals (2026 Guide)",
    category: "Packing & Gear",
    excerpt: "High-fidelity, comfortable, and actually stays in your ear. We tested the top earplug options for festival-goers.",
    readTime: "7 min read",
    image: gearFlatlay,
    content: `Tinnitus is permanent. That ringing after a night out that lasts three days? That's your ears telling you they took damage. The good news: modern high-fidelity earplugs reduce volume without killing the music quality, and the best ones are genuinely unnoticeable after 20 minutes.

## Why Cheap Foam Plugs Don't Cut It

The foam earplugs you buy at a petrol station work by blocking all frequencies equally — mainly the high-end. The result is bass-heavy, muffled music that sounds like you're listening through a duvet. They're better than nothing, but they make the music worse.

**High-fidelity earplugs** use tuned acoustic filters to reduce volume across the whole frequency range evenly. The music sounds the same — just quieter. That's the goal.

## Our Tested Picks

### 1. Loop Experience Plus — Best All-Rounder

The gold standard for festival earplugs. 18dB attenuation (Experience) or switchable 14–23dB (Experience Plus), clear sound quality, and a distinctive circular design that doesn't look embarrassing.

The Experience Plus has a mute button — useful for conversations without removing them.

**SNR rating:** 18dB (Experience) / up to 23dB (Experience Plus)
**Price:** £24.95 (Experience) / £34.95 (Experience Plus)
**Best for:** Most festivals and nightclubs

**Verdict:** If you buy one pair of earplugs, make it these.

---

### 2. Eargasm High Fidelity — Best for Deep Bass

A popular alternative to Loop with a slightly different filter profile. Some users prefer the Eargasm for bass-heavy genres (techno, DnB) because the low-end comes through with more warmth.

Comes in a small carry case that fits on a keyring.

**SNR rating:** 21dB
**Price:** ~£35
**Best for:** Techno, DnB, bass-heavy genres

---

### 3. EarPeace HD — Best Budget High-Fi Option

£20 and does the job well. Three interchangeable filter caps (low, medium, high attenuation) so you can adjust by venue. Slightly bulkier than Loop but more affordable.

**SNR rating:** Variable (10–26dB depending on cap)
**Price:** ~£20
**Best for:** Beginners, occasional festival-goers

---

### 4. Etymotic Research ER20XS — Best for Sound Accuracy

Trusted by professional musicians for decades. The ER20XS offers extremely flat attenuation — the most natural sound reproduction of any earplug at this price. Slightly less comfortable for extended wear but sonically superior.

**SNR rating:** 20dB
**Price:** ~£22
**Best for:** Audiophiles, musicians, live sound professionals

---

### 5. Custom moulded — Best for Regular Ravers

If you go to 10+ events per year, custom-moulded plugs are worth the investment. An audiologist takes ear impressions and makes plugs that fit your ears exactly — maximum comfort, superior seal, and they last years.

**SNR rating:** Various (choose your filter)
**Price:** £100–200 (audiologist fitting included)
**Best for:** Regular ravers, DJs, music professionals

---

## How to Wear Them Correctly

Most earplug failures are fitting failures, not product failures.

1. **Pull your ear up and back** while inserting — this straightens the ear canal
2. **Insert fully** — the plug should sit flush with the ear entrance, not sticking out
3. **Wait 30 seconds** for foam plugs to expand; high-fi plugs seat immediately
4. **Check the seal** — if you can still hear external voices clearly without effort, re-seat

## The Bottom Line

Spend £25 on Loop Experience earplugs. Wear them every time. Your ears in 20 years will thank you.`
  },
  {
    slug: "best-festivals-for-first-timers",
    title: "Best Festivals for First-Timers (2026)",
    category: "First Time Abroad",
    excerpt: "Not sure where to start? These festivals are the perfect entry point for anyone doing their first big rave abroad.",
    readTime: "7 min read",
    image: festivalUltra,
    content: `Your first festival abroad should be unforgettable for the right reasons. These picks balance incredible music with manageable logistics, good infrastructure, and welcoming crowds.

## Our Top 5 for First-Timers

### 1. Tomorrowland — Belgium
Yes, it's the biggest. Yes, it's expensive. But Tomorrowland is also the most well-organized festival on Earth. Everything works — transport, camping, food, water, safety. The Tomorrowland app and DreamVille camping system are designed for international visitors.

**Why it works for first-timers:** Incredible infrastructure, multilingual staff, safe campsite, shuttle system from airports.

### 2. Ultra Europe — Croatia
A festival holiday in the sun. The main event is in Split, but the Destination Ultra package adds beach parties on Hvar and Vis. It's manageable in size, the city has great hostels, and Croatia is beautiful.

**Why it works for first-timers:** City festival (no camping stress), warm weather, affordable destination.

### 3. Sziget — Hungary
A week-long festival on an island in the middle of Budapest. It's massive but incredibly friendly, with diverse music beyond just electronic. Great for people who want a festival experience that's more than just DJs.

**Why it works for first-timers:** Long duration (ease into it), diverse music, Budapest is cheap and fun.

### 4. Creamfields — UK
If flying abroad feels like too much for your first big one, Creamfields is the UK's biggest dance festival and it delivers. No passport needed, easy logistics, incredible lineups.

**Why it works for first-timers:** No travel complexity, great lineup, classic UK festival vibe.

### 5. Sonar — Spain
Barcelona in June. Cutting-edge electronic music, art, and technology. Sonar by Day and Sonar by Night are two different experiences. The city itself is the accommodation.

**Why it works for first-timers:** City festival, world-class food and culture around it, good weather guaranteed.`
  },
];

// ─── GEAR PRODUCTS ──────────────────────────────────────────

export interface GearProduct {
  slug: string;
  name: string;
  category: string;
  benefit: string;
  price: string;
  affiliateUrl: string;
  image: string;
}

export const gearCategories = [
  { slug: "tents-sleep", name: "Tents & Sleep", icon: "tent" },
  { slug: "bags-hydration", name: "Bags & Hydration", icon: "backpack" },
  { slug: "clothing-layers", name: "Clothing & Layers", icon: "shirt" },
  { slug: "tech-power", name: "Tech & Power", icon: "battery" },
  { slug: "safety-welfare", name: "Safety & Welfare", icon: "heart" },
];

export const gearProducts: GearProduct[] = [
  { slug: "loop-experience-earplugs", name: "Loop Experience Earplugs", category: "Safety & Welfare", benefit: "High-fidelity ear protection that reduces volume without killing the music quality. Essential for multi-day festivals.", price: "£24.95", affiliateUrl: "#", image: gearFlatlay },
  { slug: "camelbak-rogue-light", name: "CamelBak Rogue Light", category: "Bags & Hydration", benefit: "2L hydration pack with mesh back panel. Keeps you hydrated hands-free all day without overheating.", price: "£65.00", affiliateUrl: "#", image: gearFlatlay },
  { slug: "anker-power-bank-20k", name: "Anker PowerCore 20,000mAh", category: "Tech & Power", benefit: "Charges your phone 4–5 times. Compact enough for a bumbag. USB-C fast charging.", price: "£35.99", affiliateUrl: "#", image: gearFlatlay },
  { slug: "festival-bumbag", name: "Festival Running Belt", category: "Bags & Hydration", benefit: "Low-profile bumbag that sits flat against your body. Anti-theft design with hidden zip.", price: "£12.99", affiliateUrl: "#", image: gearFlatlay },
  { slug: "dry-bag-5l", name: "Waterproof Dry Bag 5L", category: "Tents & Sleep", benefit: "Keeps phone, wallet, and spare clothes bone dry even in a downpour. Rolls up to nothing.", price: "£8.99", affiliateUrl: "#", image: gearFlatlay },
  { slug: "head-torch-rechargeable", name: "Rechargeable Head Torch", category: "Tech & Power", benefit: "USB rechargeable with red light mode so you don't blind your tent neighbours at 4am.", price: "£14.99", affiliateUrl: "#", image: gearFlatlay },
];

// ─── MERCH ──────────────────────────────────────────────────

export interface MerchProduct {
  slug: string;
  title: string;
  category: string;
  description: string;
  price: string;
  image: string;
  purchaseUrl: string;
}

export const merchProducts: MerchProduct[] = [
  { slug: "tr-signal-tee", title: "TR Signal Tee", category: "Apparel", description: "100% organic cotton tee with the Travel Ravers signal waveform on the chest. Lightweight and breathable — designed for festivals.", price: "£28.00", image: gearFlatlay, purchaseUrl: "#" },
  { slug: "tr-survival-hoodie", title: "Survival Hoodie", category: "Apparel", description: "Heavyweight 400gsm hoodie. Perfect for cold festival nights and the journey home. Embroidered TR logo.", price: "£55.00", image: gearFlatlay, purchaseUrl: "#" },
  { slug: "tr-bumbag", title: "TR Bumbag", category: "Accessories", description: "Reflective details, waterproof lining, hidden pocket. The only bumbag you need.", price: "£22.00", image: gearFlatlay, purchaseUrl: "#" },
  { slug: "tr-earplug-case", title: "TR Earplug Case", category: "Accessories", description: "Aluminium keyring case for your earplugs. Never lose them in your bag again.", price: "£6.00", image: gearFlatlay, purchaseUrl: "#" },
  { slug: "tr-packing-pdf", title: "Ultimate Packing PDF", category: "Digital", description: "Printable checklist PDF with festival-specific add-ons. A5 format for easy reference.", price: "Free", image: gearFlatlay, purchaseUrl: "#" },
  { slug: "tr-lanyard", title: "TR Festival Lanyard", category: "Accessories", description: "Breakaway lanyard with phone loop and card holder. Wear your phone safely.", price: "£8.00", image: gearFlatlay, purchaseUrl: "#" },
];

// ─── MIXES / MUSIC ──────────────────────────────────────────

export interface Mix {
  slug: string;
  title: string;
  type: "original" | "curated" | "partner";
  vibe: string;
  /** Each platform has a name and a URL (use "#" as placeholder until real links are available). */
  platforms: { name: string; url: string }[];
  image: string;
  /** Full SoundCloud track URL — renders an embedded player on the Music page when present. */
  soundcloudUrl?: string;
}

export const mixes: Mix[] = [
  {
    slug: "pre-flight-warmup",
    title: "Pre-Flight Warmup",
    type: "original",
    vibe: "Progressive house and melodic techno to get you hyped on the journey",
    platforms: [
      { name: "Spotify", url: "#" },
      { name: "Apple Music", url: "#" },
      { name: "SoundCloud", url: "https://soundcloud.com/travel-ravers/living-for-the-moment-club" },
    ],
    image: festivalTomorrowland,
    soundcloudUrl: "https://soundcloud.com/travel-ravers/fields-of-gold",
  },
  {
    slug: "campsite-sessions",
    title: "Campsite Sessions Vol. 1",
    type: "original",
    vibe: "Chilled house and deep cuts for sunset at the campsite",
    platforms: [
      { name: "Spotify", url: "#" },
      { name: "Apple Music", url: "#" },
      { name: "SoundCloud", url: "https://soundcloud.com/mixmag/floating-points-mixmag-lab-london" },
    ],
    image: festivalCamping,
    soundcloudUrl: "https://soundcloud.com/travel-ravers/we-are-the-travel-ravers",
  },
  {
    slug: "tomorrowland-prep",
    title: "Tomorrowland 2026 Prep",
    type: "curated",
    vibe: "Every confirmed artist, one playlist. Updated weekly.",
    platforms: [
      { name: "Spotify", url: "#" },
      { name: "Apple Music", url: "#" },
    ],
    image: festivalTomorrowland,
  },
  {
    slug: "techno-bunker",
    title: "Techno Bunker",
    type: "partner",
    vibe: "Dark, driving techno for the warehouse heads. Mixed by DJ Ren.",
    platforms: [
      { name: "SoundCloud", url: "https://soundcloud.com/travel-ravers/people-of-tomorrow" },
      { name: "YouTube", url: "#" },
    ],
    image: festivalTerminalV,
    soundcloudUrl: "https://soundcloud.com/travel-ravers/body-lanuage-club",
  },
  {
    slug: "beach-rave-essentials",
    title: "Beach Rave Essentials",
    type: "curated",
    vibe: "Vocal house, disco edits, and feel-good summer bangers",
    platforms: [
      { name: "Spotify", url: "#" },
      { name: "Apple Music", url: "#" },
      { name: "YouTube", url: "#" },
    ],
    image: festivalUltra,
  },
  {
    slug: "recovery-mode",
    title: "Recovery Mode",
    type: "original",
    vibe: "Ambient, downtempo, lo-fi. For the morning after.",
    platforms: [
      { name: "Spotify", url: "#" },
      { name: "Apple Music", url: "#" },
      { name: "SoundCloud", url: "https://soundcloud.com/travel-ravers/lose-your-mind" },
    ],
    image: festivalCamping,
    soundcloudUrl: "https://soundcloud.com/travel-ravers/fields-of-gold-europa",
  },
];
