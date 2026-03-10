import { ORGANIZATION_INFO } from "../constants/index.js";

const homeData = {
  organizationName: ORGANIZATION_INFO.name,
  logo: ORGANIZATION_INFO.branding.logo,

  seo: {
    title: "Giri Nestham Sports Welfare Foundation",
    description:
      "Empowering youth through sports training, education, leadership development, tournaments, and community engagement.",
    keywords: [
      "sports foundation",
      "youth sports development",
      "sports academy",
      "sports training programs",
      "sports tournaments",
      "volunteer programs",
      "sports education",
      "athlete mentorship"
    ]
  },

  heroSection: {
    headline: "Empowering Youth Through Sports, Education & Leadership",
    subText:
      "Developing confident athletes and responsible leaders through structured training, tournaments, mentorship, and community engagement.",
    highlightPoints: [
      "Professional Sports Coaching",
      "District & State-Level Tournaments",
      "Sports Library & Knowledge Center",
      "Youth Leadership Programs",
      "Athlete Development Programs"
    ],
    ctaButtons: [
      { label: "Join Membership", link: "/membership" },
      { label: "Become a Volunteer", link: "/volunteer" },
      { label: "Support Our Mission", link: "/donate" }
    ]
  },

  foundationOverview: {
    establishedYear: 2021,
    description:
      "Giri Nestham Sports Welfare Foundation is a non-profit organization committed to empowering youth through sports, education, and leadership programs. Our foundation creates opportunities for young athletes to grow physically, mentally, and socially.",
    mission:
      "To provide professional sports training, organize tournaments, promote education, and support youth development.",
    vision:
      "To build a thriving sports ecosystem that nurtures talent and transforms lives."
  },

  values: [
    "Discipline",
    "Integrity",
    "Teamwork",
    "Leadership",
    "Community Service",
    "Continuous Improvement"
  ],

  focusAreas: [
    "Youth Sports Development",
    "Athlete Training Programs",
    "Sports Education",
    "Leadership Development",
    "Community Engagement"
  ],

  sportsPrograms: [
    {
      name: "Volleyball Training Program",
      description:
        "Professional coaching program designed to improve volleyball skills, teamwork, and competitive performance.",
      levels: ["Beginner", "Intermediate", "Advanced"]
    },
    {
      name: "Badminton Development Program",
      description:
        "Skill development training focused on agility, speed, and match performance.",
      levels: ["Intermediate", "Advanced"]
    },
    {
      name: "Cricket Training Program",
      description:
        "Structured cricket coaching covering batting, bowling, and fielding techniques.",
      levels: ["Beginner", "Intermediate", "Advanced"]
    },
    {
      name: "Kabaddi Training Program",
      description:
        "Specialized kabaddi training focusing on strength, agility, and strategy.",
      levels: ["Competitive"]
    }
  ],

  athleteDevelopment: {
    programs: [
      "Strength & Conditioning",
      "Sports Nutrition Awareness",
      "Sports Psychology Training",
      "Performance Monitoring",
      "Injury Prevention Workshops"
    ]
  },

  communityPrograms: [
    "Youth Leadership Training",
    "Sports Awareness Campaigns",
    "School Sports Programs",
    "Volunteer Development Programs",
    "Community Fitness Initiatives"
  ],

  upcomingEvents: [
    {
      title: "District Volleyball Championship",
      date: "2026-05-12",
      location: "Guntur Sports Complex",
      participantsExpected: 120
    },
    {
      title: "Youth Badminton Open Tournament",
      date: "2026-06-18",
      location: "Vijayawada Indoor Stadium",
      participantsExpected: 80
    }
  ],

  impactMetrics: {
    studentsTrained: 520,
    tournamentsOrganized: 28,
    volunteersActive: 60,
    coachesAssociated: 12,
    communitiesReached: 18,
    yearsOfService: 5
  },

  achievements: [
    "Trained more than 500 young athletes",
    "Organized 25+ sports tournaments",
    "Produced district and state-level winners",
    "Created a strong volunteer network",
    "Promoted sports culture across communities"
  ],

  athleteSuccessStories: [
    {
      name: "Ravi Kumar",
      sport: "Volleyball",
      achievement: "District Level Champion",
      year: 2024
    },
    {
      name: "Priya Sharma",
      sport: "Badminton",
      achievement: "State Level Runner-Up",
      year: 2025
    }
  ],

  mediaHighlights: [
    {
      title: "Youth Sports Initiative Gains Recognition",
      source: "Regional Sports News",
      year: 2024
    },
    {
      title: "Foundation Organizes Major District Tournament",
      source: "Local Media",
      year: 2025
    }
  ],

  partners: [
    "Local Sports Associations",
    "Educational Institutions",
    "Community Organizations",
    "Youth Development Groups"
  ],

  sponsors: [
    {
      name: "Local Sports Association",
      type: "Community Partner"
    },
    {
      name: "Youth Development Trust",
      type: "Support Partner"
    }
  ],

  galleryPreview: [
    {
      title: "Volleyball Tournament",
      image: "/images/gallery/volleyball.jpg"
    },
    {
      title: "Training Session",
      image: "/images/gallery/training.jpg"
    },
    {
      title: "Award Ceremony",
      image: "/images/gallery/certificates.jpg"
    }
  ],

  testimonials: [
    {
      name: "Ravi Kumar",
      role: "Student Athlete",
      message:
        "This foundation helped me improve my volleyball skills and compete in district tournaments."
    },
    {
      name: "Anitha Reddy",
      role: "Parent",
      message:
        "My child gained discipline and confidence through the sports programs."
    },
    {
      name: "Suresh Babu",
      role: "Volunteer",
      message:
        "Volunteering here has allowed me to support young athletes and contribute to the community."
    }
  ],

  faq: [
    {
      question: "How can students join the sports programs?",
      answer:
        "Students can register through the membership program and choose their preferred sports training."
    },
    {
      question: "Do you organize tournaments?",
      answer:
        "Yes. We organize district, state, and community-level tournaments."
    },
    {
      question: "Can I volunteer with the foundation?",
      answer:
        "Yes. Volunteers can assist with events, training programs, and community activities."
    }
  ],

  announcements: [
    {
      title: "New Volleyball Coaching Batch Starting Soon",
      date: "2026-04-01"
    },
    {
      title: "Sports Library Digital Access Now Available",
      date: "2026-03-20"
    }
  ],

  statistics: {
    totalStudents: 520,
    totalTournaments: 28,
    activeVolunteers: 60,
    yearsOfService: 5
  },

  callToAction: {
    title: "Join the Movement for Youth Sports Development",
    description:
      "Be part of a community that empowers youth through sports training, education, and leadership.",
    buttons: [
      { label: "Join Membership", link: "/membership" },
      { label: "Volunteer With Us", link: "/volunteer" },
      { label: "Donate & Support", link: "/donate" }
    ]
  },

  contact: ORGANIZATION_INFO.contact,
  socialLinks: ORGANIZATION_INFO.socialLinks
};

export default homeData;
