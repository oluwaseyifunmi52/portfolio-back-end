import { connectDB } from '../config/database.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Service } from '../models/Service.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';

/*
|--------------------------------------------------------------------------
| Portfolio Content
|--------------------------------------------------------------------------
|
| This seed data mirrors the published portfolio content that the frontend
| renders. The frontend fetches ALL display data from these collections via
| the REST API, so the seed must keep them in sync with the live site.
|
*/

const projects = [
  {
    id: 'royal-schools',
    title: 'Royal Higher Life Schools Platform',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description:
      'A full-stack MERN school management platform with role-based access control for students, teachers, parents, and administrators. Features JWT authentication with refresh tokens, academic term management, assessments, assignments, meetings, learning resources, and admission workflows.',
    problem: 'Schools needed a unified digital platform to manage academic operations, communication, and records across multiple user roles with secure access control.',
    solution: 'Built a complete MERN stack application with role-based dashboards, JWT/refresh-token authentication, and comprehensive academic management features.',
    keyFeatures: [
      'Role-based access control (Student, Teacher, Parent, Admin)',
      'JWT authentication with refresh-token rotation',
      'Academic term, assessment, and grading structure',
      'Assignments, meetings, and learning resources modules',
      'Admission application and management workflow',
      'MongoDB/Mongoose data modeling for complex relationships',
    ],
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
      'Refresh Tokens',
      'RBAC',
    ],
    myContribution: 'Full-stack development — designed database schema, built REST APIs, implemented authentication/authorization, developed all frontend dashboards, and deployed to production.',
    challenges: [
      'Designing RBAC for four distinct user types with overlapping permissions',
      'Implementing secure refresh-token rotation without UX disruption',
      'Modeling complex academic data relationships in MongoDB',
    ],
    solutions: [
      'Created middleware-based permission system with role hierarchies',
      'Used httpOnly cookies for refresh tokens with automatic silent renewal',
      'Designed Mongoose schemas with references and virtual populations',
    ],
    github: 'https://github.com/oluwaseyifunmi52/royal-higherlife-schools',
    demo: 'https://royal-higherlife-schools-v2-rgmd.vercel.app',
    featured: true,
    video: null,
  },

  {
    id: 'hospital-management',
    title: 'Hospital Management System',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80',
    description:
      'A full-stack hospital management web application built with the MERN stack. Includes patient management, doctor scheduling, appointment booking, medical records, and administrative dashboards.',
    problem: 'Healthcare facilities needed a digital system to manage patient flow, appointments, and medical records efficiently.',
    solution: 'Developed a MERN stack application with role-based access for patients, doctors, and administrators, featuring appointment scheduling and record management.',
    keyFeatures: [
      'Patient registration and medical records management',
      'Doctor scheduling and appointment booking system',
      'Role-based dashboards for patients, doctors, and admins',
      'Secure authentication and data protection',
      'MongoDB data modeling for healthcare workflows',
    ],
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT Authentication',
    ],
    myContribution: 'Full-stack development — API design, database modeling, frontend implementation, authentication, and deployment.',
    challenges: [
      'Managing complex appointment scheduling logic',
      'Ensuring patient data privacy and security',
    ],
    solutions: [
      'Implemented time-slot based scheduling with conflict detection',
      'Used JWT with role-based route protection and data encryption',
    ],
    github: 'https://github.com/oluwaseyifunmi52/hospital-management-system',
    demo: 'https://hospital-management-system-514x.vercel.app',
    featured: true,
    video: null,
  },

  {
    id: 'rhcm',
    title: 'Royal Higher Life Christian Ministries',
    image: 'https://images.unsplash.com/photo-1507692049790-de58290a4334?w=800&q=80',
    description:
      'A React/Vite web application for a Christian ministry organization. Features responsive design, routing for multiple pages, event listings, sermon archives, and ministry information.',
    problem: 'The ministry needed a modern web presence to share events, sermons, and connect with their community online.',
    solution: 'Built a responsive React SPA with Vite, React Router for navigation, and a clean component architecture.',
    keyFeatures: [
      'Multi-page layout with React Router',
      'Responsive design for all devices',
      'Event and sermon content sections',
      'Ministry information and contact pages',
      'Optimized Vite build for production',
    ],
    technologies: ['React', 'Vite', 'React Router', 'CSS3', 'Responsive Design'],
    myContribution: 'Frontend development — component architecture, routing, responsive styling, and deployment.',
    challenges: ['Creating a maintainable component structure with vanilla CSS'],
    solutions: ['Organized components by feature, used CSS custom properties for theming'],
    github: 'https://github.com/oluwaseyifunmi52/royal-higher-life-ministries',
    demo: 'https://royal-higher-life-ag25.vercel.app',
    featured: true,
    video: null,
  },

  {
    id: 'online-voting',
    title: 'Online Voting Application',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    description:
      'A MERN-based voting platform with backend API development, authentication/authorization, data modeling, and deployment. Features election management, candidate registration, secure voting, and results tabulation.',
    problem: 'Organizations needed a secure, transparent digital voting system for elections and polls.',
    solution: 'Built a full-stack voting platform with REST API, JWT authentication, role-based access, and secure vote recording.',
    keyFeatures: [
      'Backend REST API with Express.js and MongoDB',
      'JWT authentication and authorization',
      'Election and candidate management',
      'Secure vote casting and duplicate prevention',
      'Results calculation and display',
      'CORS configuration and deployment troubleshooting',
    ],
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'JWT',
    ],
    myContribution: 'Full-stack development — API design, authentication system, data modeling, debugging CORS issues, and production deployment.',
    challenges: [
      'CORS configuration for cross-origin API requests',
      'Preventing duplicate votes while maintaining voter privacy',
      'Debugging deployment environment variables',
    ],
    solutions: [
      'Configured Express CORS middleware with proper origins',
      'Implemented vote tracking with hashed identifiers',
      'Resolved environment-specific configuration issues',
    ],
    github: 'https://github.com/oluwaseyifunmi52/online-voting-app',
    demo: 'https://online-voting-app.vercel.app',
    featured: true,
    video: null,
  },

  {
    id: 'sarah-beauty',
    title: 'Sarah Beauty Store',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    description:
      'A React e-commerce frontend for a beauty products store. Features product presentation, a skin-type quiz with scoring logic, responsive design, and clean frontend architecture.',
    problem: 'Beauty brand needed an engaging product showcase with personalized recommendations based on skin type.',
    solution: 'Developed a React e-commerce frontend with interactive skin-type quiz, product catalog, and responsive design.',
    keyFeatures: [
      'Product catalog with category filtering',
      'Interactive skin-type quiz with scoring algorithm',
      'Personalized product recommendations',
      'Responsive design for mobile and desktop',
      'Clean component architecture and state management',
    ],
    technologies: ['React', 'JavaScript (ES6+)', 'CSS3', 'Responsive Design'],
    myContribution: 'Frontend development — quiz logic, product components, responsive styling, and deployment.',
    challenges: ['Implementing scoring logic for skin-type quiz', 'Managing quiz state across multiple steps'],
    solutions: ['Created reusable quiz hook with reducer pattern', 'Used React Context for quiz state management'],
    github: 'https://github.com/oluwaseyifunmi52/sarah-beauty-store',
    demo: 'https://sarah-beauty-store.vercel.app',
    featured: false,
    video: null,
  },

  {
    id: 'task-manager-api',
    title: 'Task Manager REST API',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description:
      'A Node.js/Express REST API for task management with JWT authentication, CRUD operations, pagination, search, and MVC architecture.',
    problem: 'Needed a robust backend API for task management applications with proper authentication and data organization.',
    solution: 'Built a RESTful API with Express.js, MongoDB, JWT authentication, and clean MVC structure.',
    keyFeatures: [
      'RESTful API design with proper HTTP status codes',
      'JWT authentication with protected routes',
      'Full CRUD operations for tasks',
      'Pagination and search functionality',
      'MVC architecture for maintainability',
      'Input validation and error handling',
    ],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'JWT'],
    myContribution: 'Backend development — API design, authentication, database modeling, validation, and documentation.',
    challenges: ['Structuring MVC architecture in Express', 'Implementing efficient pagination and search'],
    solutions: ['Organized routes, controllers, models, and middleware separately', 'Used Mongoose query helpers for pagination'],
    github: 'https://github.com/oluwaseyifunmi52/task-manager-api',
    demo: '',
    featured: false,
    video: null,
  },

  {
    id: 'blog-api',
    title: 'Blog API',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description:
      'A REST API for a blogging platform with PostgreSQL, JWT authentication, CRUD operations, pagination, and search functionality.',
    problem: 'Needed a backend API for a blog platform with relational data modeling and secure authentication.',
    solution: 'Developed a REST API with Express.js, PostgreSQL, and JWT authentication following REST conventions.',
    keyFeatures: [
      'PostgreSQL database with relational schema design',
      'JWT authentication and authorization',
      'CRUD operations for posts, categories, comments',
      'Pagination, filtering, and search',
      'Role-based access control (author, admin)',
    ],
    technologies: ['Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'REST API'],
    myContribution: 'Backend development — PostgreSQL schema design, API endpoints, authentication, and query optimization.',
    challenges: ['Relational schema design for blog content', 'Complex queries with joins for nested comments'],
    solutions: [      'Designed normalized tables with foreign keys', 'Used parameterized queries for security and performance'],
    github: 'https://github.com/oluwaseyifunmi52/blog-api',
    demo: '',
    featured: false,
    video: null,
  },

  {
    id: 'url-shortener',
    title: 'URL Shortener Service',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description:
      'A URL shortener service with click tracking, analytics, and REST API design. Built with Node.js, Express.js, and MongoDB.',
    problem: 'Needed a service to create short URLs with tracking capabilities for marketing and analytics.',
    solution: 'Built a URL shortening service with unique slug generation, click analytics, and RESTful endpoints.',
    keyFeatures: [
      'Short URL generation with custom slugs',
      'Click tracking and basic analytics',
      'REST API design',
      'MongoDB for URL storage and analytics',
      'Redirect handling with proper HTTP codes',
    ],
    technologies: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'REST API'],
    myContribution: 'Backend development — API design, slug generation algorithm, click tracking, and database indexing.',
    challenges: ['Generating collision-resistant short slugs', 'Efficient click tracking without performance impact'],
    solutions: ['Used base62 encoding with timestamp entropy', 'Asynchronous analytics writes with MongoDB indexes'],
    github: 'https://github.com/oluwaseyifunmi52/url-shortener',
    demo: '',
    featured: false,
    video: null,
  },
];

const skills = [
  { name: 'HTML5', percentage: 95, category: 'frontend' },
  { name: 'CSS3', percentage: 90, category: 'frontend' },
  { name: 'JavaScript', percentage: 88, category: 'frontend' },
  { name: 'TypeScript', percentage: 85, category: 'frontend' },
  { name: 'React', percentage: 90, category: 'frontend' },
  { name: 'Vite', percentage: 80, category: 'frontend' },
  { name: 'Tailwind CSS', percentage: 80, category: 'frontend' },
  { name: 'Node.js', percentage: 85, category: 'backend' },
  { name: 'Express.js', percentage: 85, category: 'backend' },
  { name: 'REST APIs', percentage: 85, category: 'backend' },
  { name: 'MongoDB', percentage: 80, category: 'database' },
  { name: 'Mongoose', percentage: 80, category: 'database' },
  { name: 'PostgreSQL', percentage: 75, category: 'database' },
  { name: 'MySQL', percentage: 70, category: 'database' },
  { name: 'JWT Authentication', percentage: 85, category: 'auth' },
  { name: 'Refresh Tokens', percentage: 80, category: 'auth' },
  { name: 'Role-Based Access Control', percentage: 75, category: 'auth' },
  { name: 'Protected Routes', percentage: 80, category: 'auth' },
  { name: 'API Security', percentage: 80, category: 'auth' },
  { name: 'Git', percentage: 85, category: 'tools' },
  { name: 'GitHub', percentage: 85, category: 'tools' },
  { name: 'VS Code', percentage: 95, category: 'tools' },
  { name: 'Postman', percentage: 90, category: 'tools' },
  { name: 'npm', percentage: 85, category: 'tools' },
  { name: 'Linux CLI', percentage: 75, category: 'tools' },
  { name: 'Vercel', percentage: 85, category: 'tools' },
  { name: 'Render', percentage: 80, category: 'tools' },
  { name: 'Cloudinary', percentage: 70, category: 'tools' },
  { name: 'MVC Architecture', percentage: 80, category: 'concepts' },
  { name: 'REST API Design', percentage: 85, category: 'concepts' },
  { name: 'Pagination & Search', percentage: 80, category: 'concepts' },
  { name: 'Responsive / Mobile-First', percentage: 90, category: 'concepts' },
  { name: 'Debugging & Troubleshooting', percentage: 90, category: 'concepts' },
  { name: 'CORS Configuration', percentage: 85, category: 'concepts' },
  { name: 'Environment Configuration', percentage: 85, category: 'concepts' },
  { name: 'Continuous Learning', percentage: 95, category: 'concepts' },
];

const services = [
  {
    title: 'Frontend Development',
    description:
      'Building modern, responsive, and interactive user interfaces using React, HTML5, CSS3, JavaScript, and Bootstrap to deliver exceptional user experiences.',
    icon: 'frontend',
  },
  {
    title: 'Backend Development',
    description:
      'Developing secure and scalable server-side applications with Node.js, Express.js, REST APIs, authentication, authorization, and business logic.',
    icon: 'backend',
  },
  {
    title: 'Database Design',
    description:
      'Designing, managing, and optimizing MongoDB databases with efficient schemas, validation, indexing, and secure data management.',
    icon: 'database',
  },
  {
    title: 'Responsive Web Design',
    description:
      'Creating fast, responsive websites that provide seamless experiences across desktops, tablets, and mobile devices.',
    icon: 'responsive',
  },
  {
    title: 'Deployment & Hosting',
    description:
      'Deploying and maintaining applications using Vercel, Render, MongoDB Atlas, GitHub, and secure production environments.',
    icon: 'deployment',
  },
  {
    title: 'Electrical Installation',
    description:
      'Professional residential and commercial electrical installation, house wiring, fault diagnosis, electrical maintenance, and power distribution systems.',
    icon: 'electrical',
  },
  {
    title: 'Solar Energy Solutions',
    description:
      'Installation of solar panels, inverters, lithium battery systems, charge controllers, system maintenance, troubleshooting, and renewable energy solutions.',
    icon: 'solar',
  },
  {
    title: 'Technical Support & Maintenance',
    description:
      'Providing software maintenance, debugging, performance optimization, electrical system servicing, and ongoing technical support for web and engineering projects.',
    icon: 'support',
  },
];

const experiences = [
  {
    role: 'Full-Stack Web Developer (Project-Based)',
    company: 'Self-Directed / Freelance',
    duration: '2025 — Present',
    location: 'Ibadan, Nigeria (Remote)',
    description: [
      'Built and deployed 4+ full-stack MERN applications with authentication, role-based access, and production deployments on Vercel/Render.',
      'Designed REST APIs with Express.js, MongoDB/Mongoose, and PostgreSQL — including pagination, search, and JWT/refresh-token authentication.',
      'Implemented RBAC systems for multi-user platforms (students, teachers, parents, admins; patients, doctors, admins).',
      'Debugged and resolved CORS issues, deployment environment mismatches, and API integration challenges.',
      'Applied MVC architecture, middleware patterns, and error-handling strategies across backend services.',
    ],
    technologies: [
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Mongoose',
      'PostgreSQL',
      'JWT',
      'Vercel',
      'Render',
    ],
  },
  {
    role: 'Full-Stack Web Developer Certificate',
    company: 'ClaspTek Coaching Limited',
    duration: '2025 — 2026',
    location: 'Nigeria',
    description: [
      'Completed intensive full-stack web development training covering HTML5, CSS3, JavaScript (ES6+), React, Node.js, Express.js, MongoDB, Git, and GitHub.',
      'Built multiple capstone projects including REST APIs, authenticated applications, and deployed full-stack solutions.',
      'Learned modern development practices: component-based architecture, state management, API design, database modeling, and deployment workflows.',
    ],
    technologies: [
      'HTML5',
      'CSS3',
      'JavaScript',
      'React',
      'Node.js',
      'Express.js',
      'MongoDB',
      'Git',
      'GitHub',
    ],
  },
  {
    role: 'BSc Computer Science (In Progress)',
    company: 'University of the People',
    duration: '2026 — Present',
    location: 'Online (Remote)',
    description: [
      'Studying software engineering, web development, database systems, networking, operating systems, data structures, algorithms, and modern programming concepts.',
      'Applying academic concepts directly to real-world project development.',
    ],
    technologies: [
      'Data Structures',
      'Algorithms',
      'Database Systems',
      'Networking',
      'Operating Systems',
    ],
  },
  {
    role: 'Electrical & Electronics Technician',
    company: 'Independent / Contract Projects',
    duration: '2016 — 2024',
    location: 'Ibadan, Nigeria',
    description: [
      'Installed, maintained, and repaired residential and commercial electrical systems — wiring, distribution boards, lighting, fault diagnosis, preventive maintenance, and safety compliance.',
      'Developed systematic troubleshooting methodology: isolate variables, trace root causes, implement fixes, verify results — directly transferable to software debugging.',
      'Managed client communication, project planning, and on-site delivery for electrical installations.',
    ],
    technologies: [
      'Electrical Systems',
      'Fault Diagnosis',
      'Preventive Maintenance',
      'Safety Compliance',
      'Client Management',
    ],
  },
  {
    role: 'Solar Installation Specialist',
    company: 'Renewable Energy Projects',
    duration: '2016 — 2024',
    location: 'Ibadan, Nigeria',
    description: [
      'Designed and installed solar PV systems, inverters, lithium battery banks, charge controllers, and backup power solutions for homes and businesses.',
      'Performed system testing, troubleshooting, maintenance, and energy optimization.',
      'Applied precision, safety standards, and quality workmanship — habits that now inform code quality and deployment reliability.',
    ],
    technologies: [
      'Solar PV',
      'Inverters',
      'Battery Systems',
      'Energy Optimization',
      'System Testing',
    ],
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'University of the People',
    duration: '2026 - Present',
    description:
      'Currently studying software engineering, web development, database systems, networking, operating systems, data structures, algorithms, and modern programming concepts.',
  },
  {
    degree: 'Certificate in Full-Stack Web Development',
    school: 'Clasptek Coaching Limited',
    duration: '2025 - 2026',
    description:
      'Successfully completed professional training in Full-Stack Web Development, gaining hands-on experience building responsive and scalable web applications using HTML5, CSS3, JavaScript (ES6+), React, Node.js, Express.js, MongoDB, Git, and GitHub. Developed practical projects covering frontend, backend, REST APIs, authentication, and modern web development best practices.',
  },
  {
    degree: 'Bachelor of Engineering',
    school: 'Lagos State University of Science and Technology (LASUSTECH)',
    duration: '2021 - 2024',
    description:
      'Studied electrical and electronics engineering with a focus on electrical systems, electronics, power engineering, control systems, digital electronics, telecommunications, and engineering project design.',
  },
  {
    degree: 'National Technical Certificate (NTC) in Electrical Engineering',
    school: 'Government Technical Science College, Ijebu-Ode, Ogun State',
    duration: '2016 - 2019',
    description:
      'Completed technical training in Electrical Engineering, gaining practical knowledge in electrical installation, wiring, electronics, electrical machines, industrial safety, and maintenance of electrical systems.',
  },
];

/*
|--------------------------------------------------------------------------
| Seed the database (full replace)
|--------------------------------------------------------------------------
*/

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

    return true;
  } catch (error) {
    console.error('\n========================================');
    console.error('DATABASE SEEDING FAILED');
    console.error('========================================');
    console.error(error);
    console.error('========================================\n');
    throw error;
  }
}

/*
|--------------------------------------------------------------------------
| Seed only if a collection is empty (used on server startup)
|--------------------------------------------------------------------------
*/

async function isEmpty(model) {
  const count = await model.countDocuments();
  return count === 0;
}

export async function seedIfEmpty() {
  try {
    const checks = [
      { name: 'Project', model: Project, data: projects },
      { name: 'Skill', model: Skill, data: skills },
      { name: 'Service', model: Service, data: services },
      { name: 'Experience', model: Experience, data: experiences },
      { name: 'Education', model: Education, data: education },
    ];

    for (const { name, model, data } of checks) {
      if (await isEmpty(model)) {
        await model.insertMany(data);
        console.log(`Auto-seeded ${data.length} ${name} records`);
      }
    }
  } catch (error) {
    console.error('Auto-seed failed:', error.message);
  }
}

export { seedDatabase };
export default seedDatabase;

/*
|--------------------------------------------------------------------------
| Run seed when executed directly (npm run seed). Not run on import
| (e.g. by server.js) so startup only auto-seeds empty collections.
|--------------------------------------------------------------------------
*/

const isMainModule =
  process.argv[1] && process.argv[1].endsWith('seed.js');

if (isMainModule) {
  seedDatabase().catch((error) => {
    console.error('Seed failed:', error);
    process.exit(1);
  });
}
