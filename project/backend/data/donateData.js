const donateData = {
  organizationName: "Giri Nestham Sports Welfare Foundation",

  headline: "Support Youth Through Sports",

  donationMessage:
    "Your contribution helps us provide training, sports equipment, tournaments, and educational opportunities for young athletes. Every donation directly supports youth development and community sports programs.",

  impactStatement:
    "With your support, we can empower talented students, organize tournaments, provide training resources, and build a stronger sports ecosystem for future generations.",

  donationPrograms: [
    {
      title: "Sponsor a Student",
      description:
        "Help a young athlete receive professional sports training and mentorship."
    },
    {
      title: "Tournament Support",
      description:
        "Support the organization of district and state-level sports tournaments."
    },
    {
      title: "Sports Equipment Fund",
      description:
        "Provide essential sports equipment such as balls, nets, kits, and training gear."
    },
    {
      title: "General Foundation Support",
      description:
        "Contribute to the overall development and expansion of foundation programs."
    }
  ],

  suggestedDonations: [
    {
      amount: 500,
      description: "Support training materials for one student"
    },
    {
      amount: 1000,
      description: "Provide sports equipment for training sessions"
    },
    {
      amount: 5000,
      description: "Sponsor a student for a sports training program"
    },
    {
      amount: 10000,
      description: "Support tournament organization and logistics"
    }
  ],

  paymentMethods: {
    bankTransfer: {
      accountName: "Giri Nestham Sports Welfare Foundation",
      bankName: "State Bank of India",
      accountNumber: "1234567890",
      ifscCode: "SBIN0001234",
      branch: "Guntur Branch"
    },


    // upi: {
    //   upiId: "girinestham@upi",
    //   upiName: "Giri Nestham Sports Welfare Foundation",
    //   qrCode: "/images/donation/upi-qr.png"
    // },

    // onlinePayment: {
    //   enabled: true,
    //   methods: ["UPI", "Debit Card", "Credit Card", "Net Banking"]
    // }

  },

  donorBenefits: [
    "Official donation receipt",
    "Recognition in foundation reports",
    "Updates on foundation activities",
    "Invitation to foundation events"
  ],

  transparency: {
    financialUsage:
      "All donations are used strictly for sports development programs, training initiatives, tournaments, and youth empowerment activities.",
    reporting:
      "Annual financial summaries and activity reports are shared with supporters and stakeholders."
  },

  donorWall: [
    {
      name: "Community Supporter",
      contribution: 10000
    },
    {
      name: "Local Business Sponsor",
      contribution: 25000
    }
  ],

  faq: [
    {
      question: "Is my donation tax deductible?",
      answer:
        "Depending on applicable registrations such as 80G, donations may be eligible for tax benefits."
    },
    {
      question: "How will my donation be used?",
      answer:
        "Funds are used for sports training, tournaments, equipment, youth development programs, and educational initiatives."
    },
    {
      question: "Will I receive a receipt for my donation?",
      answer:
        "Yes, all donors receive an official receipt from the foundation."
    }
  ],

  contactSupport: {
    email: "[support@girinestham.org](mailto:support@girinestham.org)",
    phone: "+91-9876543210"
  }
};

export default donateData;
