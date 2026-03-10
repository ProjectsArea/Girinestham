const tournamentData = {
  pageTitle: "Sports Tournaments",

  description:
    "We organize district, state, and community-level tournaments to provide athletes with competitive exposure, recognition, and opportunities to grow in sports.",

  upcomingTournaments: [
    {
      id: 1,
      name: "District Volleyball Championship",
      sport: "Volleyball",
      level: "District",

      schedule: {
        startDate: "2026-04-15",
        endDate: "2026-04-17",
        registrationDeadline: "2026-04-05"
      },

      venue: {
        city: "Hyderabad",
        stadium: "Hyderabad Sports Complex",
        address: "Main Stadium Road"
      },

      participation: {
        categories: ["Under 16", "Under 21", "Open"],
        maxParticipants: 120,
        teamSize: 6,
        substitutesAllowed: 2
      },

      registration: {
        fee: 300,
        status: "Open",
        method: ["Online", "Offline"]
      },

      organizer: {
        name: "Giri Nestham Sports Welfare Foundation",
        contact: "+91-9876543210",
        email: "tournaments@girinestham.org"
      },

      prizes: {
        winner: "₹25,000 + Trophy",
        runnerUp: "₹15,000 + Trophy",
        thirdPlace: "₹5,000 + Medal"
      },

      sponsors: [
        "Local Sports Club",
        "Community Youth Association"
      ],

      description:
        "A district-level volleyball championship designed to promote young talent and provide competitive opportunities.",

      status: "Upcoming"
    },

    {
      id: 2,
      name: "State Badminton Open",
      sport: "Badminton",
      level: "State",

      schedule: {
        startDate: "2026-05-10",
        endDate: "2026-05-12",
        registrationDeadline: "2026-04-30"
      },

      venue: {
        city: "Warangal",
        stadium: "Warangal Indoor Stadium",
        address: "Sports Complex Road"
      },

      participation: {
        categories: ["Under 18", "Open"],
        maxParticipants: 80
      },

      registration: {
        fee: 250,
        status: "Open",
        method: ["Online", "Offline"]
      },

      organizer: {
        name: "Giri Nestham Sports Welfare Foundation",
        contact: "+91-9876543210"
      },

      prizes: {
        winner: "₹20,000 + Medal",
        runnerUp: "₹10,000 + Medal"
      },

      status: "Upcoming"
    }
  ],

  ongoingTournaments: [
    {
      id: 3,
      name: "Inter-School Cricket Cup",
      sport: "Cricket",
      location: "Vijayawada",
      teams: 12,
      matchesPlayed: 8,
      status: "Ongoing"
    }
  ],

  pastTournaments: [
    {
      id: 101,
      name: "Youth Kabaddi Championship",
      sport: "Kabaddi",
      year: 2025,
      location: "Guntur",
      participants: 64,
      winner: "Guntur Warriors",
      runnerUp: "Krishna Raiders"
    }
  ],

  matchSchedule: [
    {
      matchId: 1,
      tournamentId: 1,
      teamA: "Hyderabad Spikers",
      teamB: "Warangal Smashers",
      date: "2026-04-15",
      time: "10:00 AM",
      venue: "Court 1"
    }
  ],

  leaderboard: [
    {
      team: "Hyderabad Spikers",
      matchesPlayed: 3,
      wins: 2,
      losses: 1,
      points: 6
    }
  ],

  tournamentStats: {
    totalTournaments: 28,
    upcoming: 6,
    ongoing: 2,
    completed: 20,
    totalParticipants: 1500,
    sportsCovered: 5
  },

  volunteers: [
    {
      name: "Ramesh Kumar",
      role: "Tournament Coordinator"
    },
    {
      name: "Sita Devi",
      role: "Registration Manager"
    }
  ],

  officials: [
    {
      name: "Certified Referee",
      role: "Head Referee"
    }
  ],

  certificates: {
    types: [
      "Winner Certificate",
      "Runner-Up Certificate",
      "Participation Certificate"
    ]
  },

  gallery: [
    {
      title: "Volleyball Final Match",
      image: "/images/tournaments/volleyball-final.jpg"
    },
    {
      title: "Badminton Semi Final",
      image: "/images/tournaments/badminton-match.jpg"
    }
  ],

  rules: [
    "Players must arrive 30 minutes before match time.",
    "All participants must follow fair play rules.",
    "Organizers reserve the right to change schedules."
  ],

  benefits: [
    "Competitive sports exposure",
    "Opportunity to showcase talent",
    "Certificates and awards",
    "Networking with coaches and athletes"
  ],

  faq: [
    {
      question: "Who can participate in tournaments?",
      answer:
        "Students and athletes registered with the foundation or eligible through open registration."
    },
    {
      question: "How can I register?",
      answer:
        "Participants can register online through our portal or through volunteers."
    }
  ],

  contactSupport: {
    email: "[tournaments@girinestham.org](mailto:tournaments@girinestham.org)",
    phone: "+91-9876543210"
  }
};

export default tournamentData;
