// Tournament data
export const mockTournaments = [
  {
    id: 1,
    title: "Sahiwal Indoor Cricket Championship",
    game: "Cricket",
    category: "Cricket",
    status: "Ongoing",
    venue: "Sahiwal Sports Complex",
    location: { lat: 30.6682, lng: 73.1114 },
    date: "Dec 15-20, 2026",
    entryFee: 2000,
    prizePool: 50000,
    teamSize: "6 Players",
    format: "Round Robin → Knockout",
    maxTeams: 16,
    registeredTeams: 12,
    rules: [
      "6 overs per innings",
      "6 players per team",
      "Last man stands rule applies",
      "No LBW",
      "Boundary rules: 4 off walls, 6 over net",
      "Umpire decision is final"
    ],
    schedule: [
      { round: "Group Stage", date: "Dec 15-17, 2026", details: "4 groups of 4 teams" },
      { round: "Quarter Finals", date: "Dec 18, 2026", details: "Top 2 from each group" },
      { round: "Semi Finals", date: "Dec 19, 2026", details: "4 teams" },
      { round: "Grand Final", date: "Dec 20, 2026", details: "Winner takes all" }
    ],
    description: "The biggest indoor cricket tournament in Sahiwal! Compete against the best local teams and win big. All matches held at the state-of-the-art Sahiwal Sports Complex indoor arena."
  },
  {
    id: 2,
    title: "Padel Kings Sahiwal Open",
    game: "Padel",
    category: "Padel",
    status: "Upcoming",
    venue: "Sahiwal Padel Club",
    location: { lat: 30.6720, lng: 73.1050 },
    date: "Jan 5-8, 2027",
    entryFee: 3000,
    prizePool: 75000,
    teamSize: "Doubles (2 Players)",
    format: "Double Elimination",
    maxTeams: 32,
    registeredTeams: 18,
    rules: [
      "Standard padel rules apply",
      "Best of 3 sets",
      "Tie-break at 6-6",
      "Players must wear proper sports attire",
      "Own rackets required",
      "Tournament balls provided"
    ],
    schedule: [
      { round: "Round of 32", date: "Jan 5, 2027", details: "All registered teams" },
      { round: "Round of 16", date: "Jan 6, 2027", details: "16 winning teams" },
      { round: "Quarter & Semi Finals", date: "Jan 7, 2027", details: "8 teams → 2 teams" },
      { round: "Grand Final", date: "Jan 8, 2027", details: "Best of 5 sets" }
    ],
    description: "Sahiwal's premier padel tournament! Whether you're a seasoned player or just getting started, come test your skills on the court."
  },
  {
    id: 3,
    title: "Tekken 8 Battleground",
    game: "Tekken",
    category: "Gaming",
    status: "Ongoing",
    venue: "GameZone Arena",
    location: { lat: 30.6650, lng: 73.1200 },
    date: "Dec 10-12, 2026",
    entryFee: 500,
    prizePool: 25000,
    teamSize: "Solo",
    format: "Double Elimination Bracket",
    maxTeams: 64,
    registeredTeams: 48,
    rules: [
      "Tekken 8 latest patch",
      "Double elimination bracket",
      "Best of 3 rounds per match",
      "Best of 5 for Grand Final",
      "Random stage select",
      "No pausing during rounds",
      "Controller/stick of choice allowed"
    ],
    schedule: [
      { round: "Pools", date: "Dec 10, 2026", details: "64 players in 8 pools" },
      { round: "Top 16", date: "Dec 11, 2026", details: "Winners and losers bracket" },
      { round: "Top 8 & Grand Final", date: "Dec 12, 2026", details: "Live streamed on YouTube" }
    ],
    description: "The ultimate Tekken 8 showdown in Sahiwal! Show your fighting game skills and claim the crown. Bring your own controller or arcade stick."
  },
  {
    id: 4,
    title: "FIFA 25 Champions League",
    game: "FIFA",
    category: "Gaming",
    status: "Registration Open",
    venue: "eSports Lounge Sahiwal",
    location: { lat: 30.6700, lng: 73.1150 },
    date: "Jan 15-16, 2027",
    entryFee: 1000,
    prizePool: 40000,
    teamSize: "Solo",
    format: "Group Stage → Knockout",
    maxTeams: 32,
    registeredTeams: 8,
    rules: [
      "FIFA 25 latest update",
      "6 minute halves",
      "Any club or national team allowed",
      "No custom formations exploits",
      "Legacy defending only",
      "No rage quits - automatic loss",
      "PS5 controllers provided"
    ],
    schedule: [
      { round: "Group Stage", date: "Jan 15, 2027", details: "8 groups of 4" },
      { round: "Knockout & Final", date: "Jan 16, 2027", details: "Top 2 advance" }
    ],
    description: "Are you Sahiwal's best FIFA player? Prove it in the FIFA 25 Champions League. Compete solo for a massive prize pool!"
  },
  {
    id: 5,
    title: "Night Cricket Bash",
    game: "Cricket",
    category: "Cricket",
    status: "Registration Open",
    venue: "Farid Town Cricket Ground",
    location: { lat: 30.6600, lng: 73.1080 },
    date: "Jan 25-28, 2027",
    entryFee: 2500,
    prizePool: 60000,
    teamSize: "8 Players",
    format: "Knockout",
    maxTeams: 16,
    registeredTeams: 5,
    rules: [
      "8 overs per innings",
      "8 players per team",
      "Floodlit matches only",
      "White ball used",
      "Power play: first 2 overs",
      "Free hit on no balls"
    ],
    schedule: [
      { round: "Round of 16", date: "Jan 25, 2027", details: "16 teams" },
      { round: "Quarter Finals", date: "Jan 26, 2027", details: "8 teams" },
      { round: "Semi Finals", date: "Jan 27, 2027", details: "4 teams" },
      { round: "Final", date: "Jan 28, 2027", details: "Floodlit grand finale" }
    ],
    description: "Experience cricket under the lights! Night Cricket Bash brings the excitement of floodlit cricket to Sahiwal."
  },
  {
    id: 6,
    title: "Padel Doubles Showdown",
    game: "Padel",
    category: "Padel",
    status: "Completed",
    venue: "Sahiwal Padel Club",
    location: { lat: 30.6720, lng: 73.1050 },
    date: "Nov 20-22, 2026",
    entryFee: 2500,
    prizePool: 55000,
    teamSize: "Doubles (2 Players)",
    format: "Round Robin",
    maxTeams: 12,
    registeredTeams: 12,
    rules: [
      "Standard padel rules",
      "Best of 3 sets",
      "Round robin format",
      "Top 4 advance to semis"
    ],
    schedule: [
      { round: "Round Robin", date: "Nov 20-21, 2026", details: "All teams play each other" },
      { round: "Finals", date: "Nov 22, 2026", details: "Top 4 teams" }
    ],
    description: "The Padel Doubles Showdown has concluded! Congratulations to all participants."
  }
];

// Registered players (mock - these simulate players who have registered)
export const mockRegistrations = [
  {
    id: 1,
    tournamentId: 1,
    playerName: "Ahmed Khan",
    email: "ahmed.khan@email.com",
    gamingHandle: "AK_Striker",
    paymentScreenshot: "screenshot_ahmed.jpg",
    status: "verified",
    registeredAt: "2026-12-01"
  },
  {
    id: 2,
    tournamentId: 3,
    playerName: "Hassan Ali",
    email: "hassan.ali@email.com",
    gamingHandle: "TekkenMaster_HA",
    paymentScreenshot: "screenshot_hassan.jpg",
    status: "pending",
    registeredAt: "2026-12-05"
  },
  {
    id: 3,
    tournamentId: 4,
    playerName: "Usman Tariq",
    email: "usman.t@email.com",
    gamingHandle: "FIFA_Usman",
    paymentScreenshot: "screenshot_usman.jpg",
    status: "pending",
    registeredAt: "2026-12-08"
  },
  {
    id: 4,
    tournamentId: 2,
    playerName: "Bilal Farooq",
    email: "bilal.f@email.com",
    gamingHandle: "PadelPro_B",
    paymentScreenshot: "screenshot_bilal.jpg",
    status: "rejected",
    registeredAt: "2026-12-03"
  },
  {
    id: 5,
    tournamentId: 1,
    playerName: "Zain Malik",
    email: "zain.m@email.com",
    gamingHandle: "CricketKing_Z",
    paymentScreenshot: "screenshot_zain.jpg",
    status: "verified",
    registeredAt: "2026-12-02"
  },
  {
    id: 6,
    tournamentId: 5,
    playerName: "Omar Sheikh",
    email: "omar.s@email.com",
    gamingHandle: "NightBatsman",
    paymentScreenshot: "screenshot_omar.jpg",
    status: "pending",
    registeredAt: "2026-12-09"
  }
];

// Payment info (static)
export const paymentInfo = {
  bankName: "HBL (Habib Bank Limited)",
  accountTitle: "STAG ARENA Sahiwal",
  accountNumber: "1234-5678901-03",
  easypaisaNumber: "0300-1234567",
  jazzcashNumber: "0301-7654321",
  instructions: "Please transfer the exact entry fee amount to STAG ARENA and take a clear screenshot of the payment confirmation. Upload the screenshot in the registration form. Your registration will be verified within 24 hours."
};
