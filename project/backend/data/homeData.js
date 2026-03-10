import { ORGANIZATION_INFO } from "../constants/index.js";

const homeData = {
  organizationName: ORGANIZATION_INFO.name,

  logo: ORGANIZATION_INFO.branding.logo,  // optional (for future use)

  heroMessage: {
    headline: "Empowering Youth Through Sports & Education",
    subText:
      "Building discipline, leadership, and confidence through structured sports programs and community engagement."
  },

  vision:
    "To create a strong sporting culture that nurtures talent and transforms lives through opportunity and guidance.",

  mission:
    "Providing professional training, organizing tournaments, promoting education, and supporting youth development across communities.",

  aboutPreview:
    "Giri Nestham Sports Welfare Foundation is committed to developing young athletes by providing quality training, competitive exposure, and mentorship opportunities.",

  activities: [
    "Professional Sports Training",
    "Membership & Development Programs",
    "District & State-Level Tournaments",
    "Sports Library & Digital Learning",
    "Volunteer & Community Engagement Programs"
  ],

  stats: {
    students: 520,
    tournaments: 28,
    volunteers: 60,
    yearsOfService: 5
  },

  contact: ORGANIZATION_INFO.contact,

  socialLinks: ORGANIZATION_INFO.socialLinks
};

export default homeData;