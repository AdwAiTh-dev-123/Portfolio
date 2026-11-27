/**
 * Centralized portfolio configuration for Adwaith P.
 *
 * Quick customization guide:
 * 1. Email: Update `contact.email` once you switch to a professional domain email.
 * 2. Profile photo: Drop your photo in `public/profile.jpg` and set `profileImage: '/profile.jpg'`.
 * 3. Optional dates/institutions: Fill in `period` or `institution` strings whenever ready.
 * 4. Projects: Append new project objects to the `projects` array.
 */
export const portfolioData = {
  personal: {
    name: 'Adwaith P',
    initials: 'AP',
    roleTitle: 'Aspiring Full-Stack Developer',
    heroHeadline: 'Building modern web applications with the MERN stack.',
    heroTagline:
      'Transitioning from Mechatronics & Industrial Maintenance into full-stack software development — focused on crafting clean interfaces, scalable APIs, and practical web products.',
    bio: 'I am currently learning the MERN stack and am deeply interested in developing web applications and software. With a technical foundation in Mechatronics Engineering and hands-on industrial maintenance experience, I bring structured problem-solving and a systems mindset to modern web development.',
    profileImage: '/profile.png',
    profileImageAlt: 'Adwaith P profile portrait',
    availabilityBadge: 'Learning MERN Stack • Open to Opportunities',
  },

  contact: {
    // Update this single field when you get your professional email address
    email: 'adwaith87140@gmail.com',
    github: 'https://github.com/AdwAiTh-dev-123',
    linkedin:
      'https://www.linkedin.com/in/adwaith-p-p-104642384?utm_source=share_via&utm_content=profile&utm_medium=member_android',
    location: 'India',
    contactEndpoint: '/api/contact',
  },

  education: [
    {
      title: 'Diploma in Mechatronics Engineering and Smart Factory',
      institution: null, // Optional: add your institution name here
      period: null, // Optional: add graduation year here
      status: 'Completed',
      summary:
        'Built a multidisciplinary foundation across electronics, automation systems, mechanical integration, and smart-factory workflows.',
    },
    {
      title: 'MERN Stack Web & Software Development',
      institution: 'Self-Directed Learning & Project Building',
      period: 'In Progress',
      status: 'Active',
      summary:
        'Mastering end-to-end JavaScript development across MongoDB, Express.js, React.js, Node.js, and RESTful API architecture.',
    },
  ],

  experience: [
    {
      role: 'Junior Technical Associate (Maintenance Engineer)',
      company: 'ITC Limited — Snacks Division',
      location: 'Thiruchirapally',
      period: null, // Optional: add employment dates here (e.g., '2023 – 2024')
      summary:
        'Worked in industrial maintenance engineering operations, diagnosing technical faults, supporting equipment reliability, and collaborating in a structured manufacturing environment.',
    },
  ],

  skillGroups: [
    {
      category: 'Frontend',
      accent: 'sky',
      items: [
        { name: 'HTML', level: 'Core' },
        { name: 'CSS', level: 'Core' },
        { name: 'JavaScript', level: 'Core' },
        { name: 'React.js', level: 'MERN' },
      ],
    },
    {
      category: 'Backend',
      accent: 'teal',
      items: [
        { name: 'Node.js', level: 'MERN' },
        { name: 'Express.js', level: 'MERN' },
      ],
    },
    {
      category: 'Database',
      accent: 'cyan',
      items: [{ name: 'MongoDB', level: 'MERN' }],
    },
    {
      category: 'Tools & Architecture',
      accent: 'slate',
      items: [
        { name: 'Git', level: 'Workflow' },
        { name: 'GitHub', level: 'Workflow' },
        { name: 'REST APIs', level: 'Integration' },
      ],
    },
  ],

  projects: [
    {
      id: 'altier-stores',
      title: 'Altier Stores',
      badge: 'Featured MERN Project',
      description:
        'An e-commerce platform built using the MERN stack, combining a React.js storefront with a Node.js, Express.js, and MongoDB backend.',
      techStack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'REST APIs'],
      githubUrl: 'https://github.com/AdwAiTh-dev-123/ALTIER-ECOMM',
      liveUrl: 'https://altierstores.adwaith.xyz',
      liveLabel: 'altierstores.adwaith.xyz',
      previewImage: '/altier-stores.png',
    },
  ],

  currentFocus: {
    note: 'I am currently in the learning stage and do not offer freelance or commercial services yet. My focus right now is building strong fundamentals and shipping real applications.',
    pillars: [
      {
        index: '01',
        title: 'MERN Stack Mastery',
        description:
          'Strengthening full-stack patterns across React component architecture, Express middleware, REST APIs, and MongoDB data modeling.',
      },
      {
        index: '02',
        title: 'Hands-On Software Projects',
        description:
          'Continuing to build and iterate on real-world web applications like Altier Stores to turn concepts into deployed products.',
      },
      {
        index: '03',
        title: 'Growth & Collaboration',
        description:
          'Open to internships, junior developer opportunities, mentorship, and collaborating with fellow learners and builders.',
      },
    ],
  },
}
