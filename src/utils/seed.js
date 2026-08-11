import { connectDB } from '../config/database.js';
import { Project } from '../models/Project.js';
import { Skill } from '../models/Skill.js';
import { Service } from '../models/Service.js';
import { Experience } from '../models/Experience.js';
import { Education } from '../models/Education.js';

const projects = [
  {
    id: 'portfolio-website',
    title: 'Portfolio Website',
    image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&q=80',
    description: 'A modern, responsive portfolio website built with React and Vite, featuring smooth animations and a clean design to showcase projects and skills.',
    problem: 'Needed a professional online presence to showcase development skills and projects to potential employers and clients.',
    solution: 'Built a fully responsive portfolio with React, featuring project filtering, smooth scroll animations, and a contact form with backend integration.',
    keyFeatures: [
      'Responsive design for all devices',
      'Smooth scroll animations with Framer Motion',
      'Project filtering by category',
      'Contact form with email notifications',
      'Dark/light mode toggle',
      'SEO optimized with meta tags'
    ],
    technologies: ['React', 'Vite', 'Tailwind CSS', 'Framer Motion', 'React Router', 'Node.js', 'Express', 'MongoDB'],
    myContribution: 'Full-stack development including frontend architecture, backend API, database design, and deployment configuration.',
    challenges: [
      'Optimizing animation performance on mobile devices',
      'Implementing smooth project filtering without layout shift',
      'Configuring CORS and environment variables for production'
    ],
    solutions: [
      'Used Framer Motion with reduced motion preferences',
      'Implemented CSS Grid with proper gap handling',
      'Set up proper proxy configuration for development and production'
    ],
    github: 'https://github.com/username/portfolio',
    demo: 'https://portfolio.example.com',
    featured: true,
    video: null,
  },
  {
    id: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80',
    description: 'A full-featured e-commerce platform with user authentication, product management, shopping cart, and payment integration.',
    problem: 'Small businesses needed an affordable, customizable online store solution without relying on expensive SaaS platforms.',
    solution: 'Developed a scalable e-commerce platform with MERN stack, featuring admin dashboard, inventory management, and Stripe payment integration.',
    keyFeatures: [
      'User authentication with JWT',
      'Product catalog with categories and filters',
      'Shopping cart with persistence',
      'Stripe payment integration',
      'Admin dashboard for orders and products',
      'Email notifications for orders',
      'Inventory tracking',
      'Review and rating system'
    ],
    technologies: ['React', 'Redux Toolkit', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'JWT', 'Tailwind CSS'],
    myContribution: 'Led full-stack development including API design, database schema, payment integration, and deployment pipeline.',
    challenges: [
      'Handling concurrent inventory updates',
      'Securing payment flow with Stripe webhooks',
      'Managing complex state with Redux'
    ],
    solutions: [
      'Implemented optimistic locking for inventory',
      'Used idempotency keys for webhook processing',
      'Structured Redux with RTK Query for caching'
    ],
    github: 'https://github.com/username/ecommerce',
    demo: 'https://shop.example.com',
    featured: true,
    video: null,
  },
  {
    id: 'task-management-app',
    title: 'Task Management App',
    image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&q=80',
    description: 'A collaborative task management application with real-time updates, team workspaces, and drag-and-drop board views.',
    problem: 'Teams needed a lightweight, self-hosted alternative to Trello/Jira with real-time collaboration features.',
    solution: 'Built a real-time task manager using WebSockets for live updates, with Kanban boards, team workspaces, and role-based permissions.',
    keyFeatures: [
      'Real-time collaboration with Socket.io',
      'Kanban board with drag-and-drop',
      'Team workspaces and projects',
      'Role-based access control',
      'Task assignments and due dates',
      'Comments and mentions',
      'Activity feed',
      'Dark mode support'
    ],
    technologies: ['React', 'Socket.io', 'Node.js', 'Express', 'MongoDB', 'Redis', 'Tailwind CSS', 'dnd-kit'],
    myContribution: 'Designed real-time architecture, implemented WebSocket event handling, and built the drag-and-drop Kanban board.',
    challenges: [
      'Synchronizing state across multiple clients',
      'Optimizing WebSocket connection management',
      'Implementing smooth drag-and-drop with real-time updates'
    ],
    solutions: [
      'Used operational transformation for conflict resolution',
      'Implemented connection pooling and heartbeat mechanism',
      'Separated optimistic updates from server confirmation'
    ],
    github: 'https://github.com/username/task-manager',
    demo: 'https://tasks.example.com',
    featured: false,
    video: null,
  },
];

const skills = [
  { name: 'React', percentage: 95, category: 'frontend' },
  { name: 'TypeScript', percentage: 90, category: 'frontend' },
  { name: 'Next.js', percentage: 85, category: 'frontend' },
  { name: 'Tailwind CSS', percentage: 95, category: 'frontend' },
  { name: 'Framer Motion', percentage: 80, category: 'frontend' },
  { name: 'Node.js', percentage: 90, category: 'backend' },
  { name: 'Express', percentage: 92, category: 'backend' },
  { name: 'MongoDB', percentage: 88, category: 'database' },
  { name: 'PostgreSQL', percentage: 80, category: 'database' },
  { name: 'Redis', percentage: 75, category: 'database' },
  { name: 'Docker', percentage: 85, category: 'tools' },
  { name: 'Git', percentage: 95, category: 'tools' },
  { name: 'CI/CD', percentage: 80, category: 'tools' },
  { name: 'AWS', percentage: 70, category: 'tools' },
  { name: 'GraphQL', percentage: 75, category: 'backend' },
  { name: 'WebSockets', percentage: 80, category: 'backend' },
];

const services = [
  {
    title: 'Full-Stack Web Development',
    description: 'Building complete web applications from concept to deployment using modern technologies like React, Node.js, and cloud platforms.',
    icon: 'code',
  },
  {
    title: 'API Design & Development',
    description: 'Creating robust RESTful APIs and GraphQL endpoints with proper authentication, validation, documentation, and testing.',
    icon: 'api',
  },
  {
    title: 'Database Design & Optimization',
    description: 'Designing efficient database schemas, writing optimized queries, and implementing caching strategies for scalable applications.',
    icon: 'database',
  },
  {
    title: 'DevOps & Cloud Deployment',
    description: 'Setting up CI/CD pipelines, containerizing applications with Docker, and deploying to cloud platforms like AWS, Vercel, and Render.',
    icon: 'cloud',
  },
  {
    title: 'Real-Time Applications',
    description: 'Building collaborative features with WebSockets, Server-Sent Events, and real-time databases for instant user interactions.',
    icon: 'wifi',
  },
  {
    title: 'Performance Optimization',
    description: 'Improving application speed through code splitting, lazy loading, caching strategies, and bundle optimization.',
    icon: 'speed',
  },
];

const experiences = [
  {
    role: 'Senior Full-Stack Developer',
    company: 'Tech Solutions Inc.',
    duration: '2022 - Present',
    description: 'Leading development of enterprise web applications, mentoring junior developers, and architecting scalable solutions for clients across various industries.',
    technologies: ['React', 'Node.js', 'TypeScript', 'AWS', 'Docker', 'PostgreSQL'],
  },
  {
    role: 'Full-Stack Developer',
    company: 'Digital Agency',
    duration: '2020 - 2022',
    description: 'Built and maintained multiple client projects including e-commerce platforms, dashboards, and custom CMS solutions. Collaborated with designers and project managers to deliver high-quality products.',
    technologies: ['React', 'Vue.js', 'Express', 'MongoDB', 'GraphQL', 'Tailwind CSS'],
  },
  {
    role: 'Frontend Developer',
    company: 'StartupXYZ',
    duration: '2018 - 2020',
    description: 'Developed responsive user interfaces for SaaS products, implemented complex animations, and optimized performance for large-scale applications.',
    technologies: ['React', 'Redux', 'SASS', 'Webpack', 'Jest', 'Cypress'],
  },
];

const education = [
  {
    degree: 'Bachelor of Science in Computer Science',
    school: 'University of Technology',
    duration: '2014 - 2018',
    description: 'Focused on software engineering, algorithms, data structures, and web technologies. Graduated with honors. Capstone project: Real-time collaborative code editor.',
  },
  {
    degree: 'AWS Certified Solutions Architect',
    school: 'Amazon Web Services',
    duration: '2021',
    description: 'Professional certification covering architecting on AWS, security, migration, and cost optimization strategies.',
  },
];

async function seedDatabase() {
  try {
    await connectDB();
    console.log('Connected to database');

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

    console.log('\n✅ Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
}

seedDatabase();