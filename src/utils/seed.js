import { connectDB } from '../config/database.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Service } from '../models/Service.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';



const projects = [
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    image:
      'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description:
      'A modern and responsive full-stack developer portfolio website built to showcase projects, technical skills, experience, education, and contact information.',
    problem:
      'Needed a professional online presence where potential employers and clients could easily learn about my skills, projects, and development experience.',
    solution:
      'Built a responsive portfolio using React and Vite with a Node.js and Express backend connected to MongoDB.',
    keyFeatures: [
      'Responsive design for desktop, tablet, and mobile',
      'Project showcase and project details',
      'Skills and technology section',
      'Experience and education sections',
      'Contact form with backend integration',
      'MongoDB database integration',
      'REST API integration',
      'Modern responsive user interface',
    ],
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'HTML',
      'CSS',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'Git',
      'GitHub',
    ],
    myContribution:
      'Designed and developed the frontend and backend, created REST API endpoints, connected MongoDB, implemented the database models, and configured the application for deployment.',
    challenges: [
      'Connecting the React frontend to the Express backend',
      'Designing a clean MongoDB data structure',
      'Making the application responsive across different screen sizes',
      'Handling API requests and errors',
    ],
    solutions: [
      'Created reusable API services for frontend-backend communication',
      'Used Mongoose models for structured MongoDB data',
      'Implemented responsive layouts using CSS',
      'Added proper API error handling and validation',
    ],
    github: 'https://github.com/oluwaseyifunmi52/portfolio',
    demo: '',
    featured: true,
    video: null,
  },

  {
    id: 'royal-higher-life-website',
    title: 'Royal Higher Life Christian Ministries Website',
    image:
      'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80',
    description:
      'A modern responsive ministry website designed to provide information about the ministry, sermons, events, prayer requests, donations, and online engagement.',
    problem:
      'The ministry needed a professional online platform where visitors could learn about the ministry, access media content, submit prayer requests, and support the organization.',
    solution:
      'Developed a full-stack web application using React on the frontend and Node.js, Express, and MongoDB on the backend.',
    keyFeatures: [
      'Responsive ministry website',
      'About and mission sections',
      'Sermon and media section',
      'Prayer request functionality',
      'Contact form',
      'Online donation system',
      'Event management',
      'Member management',
      'Admin dashboard',
      'REST API backend',
      'MongoDB database',
    ],
    technologies: [
      'React',
      'Vite',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'REST API',
      'Git',
      'GitHub',
    ],
    myContribution:
      'Worked on the frontend interface, backend API, MongoDB database integration, authentication, and application functionality.',
    challenges: [
      'Connecting multiple frontend pages to backend APIs',
      'Managing authentication and protected routes',
      'Designing database models for different types of ministry data',
      'Building a responsive experience for mobile users',
    ],
    solutions: [
      'Created reusable API service functions',
      'Implemented authentication and protected routes',
      'Separated database models according to application features',
      'Used responsive layouts for different screen sizes',
    ],
    github: '',
    demo: '',
    featured: true,
    video: null,
  },

  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    description:
      'A full-stack e-commerce application designed to demonstrate product management, authentication, shopping cart functionality, and online payments.',
    problem:
      'Small businesses need affordable online platforms that allow customers to browse products, manage their carts, and place orders online.',
    solution:
      'Built an e-commerce application using the MERN stack with a React frontend, Express backend, and MongoDB database.',
    keyFeatures: [
      'User registration and login',
      'JWT authentication',
      'Product catalog',
      'Product categories',
      'Shopping cart',
      'Order management',
      'Admin product management',
      'User dashboard',
      'Responsive design',
      'REST API',
    ],
    technologies: [
      'React',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'JWT',
      'REST API',
      'CSS',
    ],
    myContribution:
      'Developed the frontend and backend architecture, created REST API endpoints, designed MongoDB models, implemented authentication, and connected the frontend to the backend.',
    challenges: [
      'Managing authentication between frontend and backend',
      'Designing product and order database structures',
      'Managing shopping cart state',
      'Protecting administrative functionality',
    ],
    solutions: [
      'Implemented JWT-based authentication',
      'Created separate MongoDB models for products, users, and orders',
      'Created reusable frontend state and API services',
      'Protected admin routes with authentication middleware',
    ],
    github: '',
    demo: '',
    featured: true,
    video: null,
  },

  {
    id: 'task-management-app',
    title: 'Task Management Application',
    image:
      'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    description:
      'A task management application designed to help users organize projects, tasks, deadlines, and daily activities.',
    problem:
      'Users need a simple way to organize tasks, track progress, and manage their work from a single application.',
    solution:
      'Created a responsive task management application with a React frontend and Node.js, Express, and MongoDB backend.',
    keyFeatures: [
      'User authentication',
      'Create and manage tasks',
      'Task status management',
      'Task deadlines',
      'Task filtering',
      'User dashboard',
      'Responsive interface',
      'REST API',
      'MongoDB persistence',
    ],
    technologies: [
      'React',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'JWT',
      'REST API',
      'CSS',
    ],
    myContribution:
      'Built the frontend interface, backend API, database models, authentication flow, and task management functionality.',
    challenges: [
      'Keeping task data synchronized with the database',
      'Implementing authentication',
      'Creating a simple and responsive dashboard',
    ],
    solutions: [
      'Used REST APIs for frontend-backend communication',
      'Implemented JWT authentication',
      'Created reusable React components and responsive layouts',
    ],
    github: '',
    demo: '',
    featured: false,
    video: null,
  },
];


const skills = [
  {
    name: 'HTML',
    percentage: 85,
    category: 'frontend',
  },
  {
    name: 'CSS',
    percentage: 80,
    category: 'frontend',
  },
  {
    name: 'JavaScript',
    percentage: 80,
    category: 'frontend',
  },
  {
    name: 'React',
    percentage: 75,
    category: 'frontend',
  },
  {
    name: 'Vite',
    percentage: 75,
    category: 'frontend',
  },
  {
    name: 'Node.js',
    percentage: 75,
    category: 'backend',
  },
  {
    name: 'Express',
    percentage: 75,
    category: 'backend',
  },
  {
    name: 'REST API',
    percentage: 75,
    category: 'backend',
  },
  {
    name: 'MongoDB',
    percentage: 75,
    category: 'database',
  },
  {
    name: 'Mongoose',
    percentage: 70,
    category: 'database',
  },
  {
    name: 'JWT Authentication',
    percentage: 70,
    category: 'backend',
  },
  {
    name: 'Git',
    percentage: 75,
    category: 'tools',
  },
  {
    name: 'GitHub',
    percentage: 75,
    category: 'tools',
  },
];


const services = [
  {
    title: 'Frontend Web Development',
    description:
      'Building responsive and user-friendly websites and web applications using HTML, CSS, JavaScript, React, and Vite.',
    icon: 'code',
  },

  {
    title: 'Full-Stack Web Development',
    description:
      'Developing complete web applications with React on the frontend and Node.js, Express, and MongoDB on the backend.',
    icon: 'code',
  },

  {
    title: 'REST API Development',
    description:
      'Creating structured REST APIs with Express and Node.js for authentication, data management, and communication between frontend and backend applications.',
    icon: 'api',
  },

  {
    title: 'MongoDB Database Development',
    description:
      'Creating and managing MongoDB databases and Mongoose models for web applications.',
    icon: 'database',
  },

  {
    title: 'Authentication & Authorization',
    description:
      'Implementing secure user authentication and protected application features using JWT and backend middleware.',
    icon: 'security',
  },

  {
    title: 'Responsive Web Design',
    description:
      'Creating websites that work properly across desktop computers, tablets, and mobile devices.',
    icon: 'responsive',
  },
];



const experiences = [
  {
    role: 'Junior Full-Stack Web Developer',
    company: 'Independent Projects',
    duration: '2026 - Present',
    description:
      'Developing full-stack web applications using React, JavaScript, Node.js, Express, and MongoDB. Building REST APIs, authentication systems, dashboards, and responsive user interfaces while continuously improving software development skills.',
    technologies: [
      'React',
      'JavaScript',
      'Node.js',
      'Express',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Vite',
      'Git',
      'GitHub',
    ],
  },

  {
    role: 'Customer Service Representative',
    company: 'Class54 Educational Practice App',
    duration: '2024 - 2025',
    description:
      'Provided customer support and assisted users with questions and issues related to the educational practice platform. Communicated with users and helped resolve problems effectively.',
    technologies: [
      'Customer Support',
      'Communication',
      'Problem Solving',
    ],
  },

  {
    role: 'Electrical & Solar Technician',
    company: 'Independent / Contract Work',
    duration: '2016 - Present',
    description:
      'Worked on electrical installation, house wiring, solar installation, electrical maintenance, and related technical projects. Developed strong practical problem-solving and troubleshooting skills.',
    technologies: [
      'Electrical Installation',
      'House Wiring',
      'Solar Installation',
      'Electrical Maintenance',
      'Troubleshooting',
    ],
  },
];


const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'University of the People',
    duration: '2026 - Present',
    description:
      'Currently studying Computer Science with a focus on software development, programming, computer science fundamentals, and web technologies.',
  },

  {
    degree: 'National Diploma in Electrical/Electronics Engineering',
    school: 'Lagos State Polytechnic',
    duration: 'Completed 2023',
    description:
      'Studied electrical and electronics engineering with practical experience in electrical systems, maintenance, troubleshooting, and related technical work.',
  },
];



async function seedDatabase() {
  try {
    console.log('Connecting to database...');

    await connectDB();

    console.log('Connected to database successfully.');


    await Project.deleteMany({});
    await Project.insertMany(projects);

    console.log(`Seeded ${projects.length} projects`);

  

    await Skill.deleteMany({});
    await Skill.insertMany(skills);

    console.log(`Seeded ${skills.length} skills`);

    

    await Service.deleteMany({});
    await Service.insertMany(services);

    console.log(`Seeded ${services.length} services`);

   

    await Experience.deleteMany({});
    await Experience.insertMany(experiences);

    console.log(`Seeded ${experiences.length} experiences`);


    await Education.deleteMany({});
    await Education.insertMany(education);

    console.log(`Seeded ${education.length} education entries`);

 

    console.log('\n========================================');
    console.log('DATABASE SEEDED SUCCESSFULLY');
    console.log('========================================');
    console.log(`Projects:    ${projects.length}`);
    console.log(`Skills:      ${skills.length}`);
    console.log(`Services:    ${services.length}`);
    console.log(`Experience:  ${experiences.length}`);
    console.log(`Education:   ${education.length}`);
    console.log('========================================\n');

    process.exit(0);
  } catch (error) {
    console.error('\n========================================');
    console.error('DATABASE SEEDING FAILED');
    console.error('========================================');
    console.error(error);
    console.error('========================================\n');

    process.exit(1);
  }
}


seedDatabase();