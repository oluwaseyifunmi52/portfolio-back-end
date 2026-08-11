# Portfolio Backend API

A RESTful API built with Node.js, Express, and MongoDB for a portfolio website.

## Features

- **Contact Form** - Submit messages with email notifications
- **Projects** - CRUD operations for portfolio projects
- **Skills** - Manage technical skills with proficiency levels
- **Services** - List offered services
- **Experience** - Work history and roles
- **Education** - Academic background
- **Health Check** - `/api/health` endpoint for monitoring
- **Rate Limiting** - Protection on contact form
- **Input Validation** - Zod schema validation
- **Error Handling** - Centralized error middleware

## Tech Stack

- **Runtime**: Node.js 20+
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Email**: Nodemailer
- **Validation**: Zod
- **Security**: Helmet, CORS, Rate Limiting
- **Dev Tools**: Nodemon

## Getting Started

### Prerequisites

- Node.js 20+
- MongoDB Atlas account (or local MongoDB)
- Email service (Gmail, SendGrid, etc.)

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your credentials
# MONGO_URI, EMAIL_USER, EMAIL_PASS are required

# Start development server
npm run dev

# Start production server
npm start
```

### Database Seeding

```bash
npm run seed
```

This populates the database with sample data matching the frontend.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| POST | `/api/contact` | Submit contact form |
| GET | `/api/contact` | List contact messages |
| GET | `/api/contact/:id` | Get single message |
| PATCH | `/api/contact/:id/status` | Update message status |
| DELETE | `/api/contact/:id` | Delete message |
| GET | `/api/projects` | List projects |
| GET | `/api/projects/:id` | Get project by ID |
| POST | `/api/projects` | Create project |
| PATCH | `/api/projects/:id` | Update project |
| DELETE | `/api/projects/:id` | Delete project |
| GET | `/api/skills` | List skills |
| GET | `/api/skills/:id` | Get skill |
| POST | `/api/skills` | Create skill |
| PATCH | `/api/skills/:id` | Update skill |
| DELETE | `/api/skills/:id` | Delete skill |
| GET | `/api/services` | List services |
| GET | `/api/services/:id` | Get service |
| POST | `/api/services` | Create service |
| PATCH | `/api/services/:id` | Update service |
| DELETE | `/api/services/:id` | Delete service |
| GET | `/api/experience` | List experience |
| GET | `/api/experience/:id` | Get experience |
| POST | `/api/experience` | Create experience |
| PATCH | `/api/experience/:id` | Update experience |
| DELETE | `/api/experience/:id` | Delete experience |
| GET | `/api/education` | List education |
| GET | `/api/education/:id` | Get education |
| POST | `/api/education` | Create education |
| PATCH | `/api/education/:id` | Update education |
| DELETE | `/api/education/:id` | Delete education |

## Contact Form Email

The contact form sends emails using Nodemailer. Configure in `.env`:

```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-app-password
EMAIL_FROM=your-email@gmail.com
EMAIL_TO=recipient@gmail.com
```

For Gmail, use an App Password (not your regular password).

## Deployment (Render)

1. Push to GitHub
2. Create new Web Service on Render
3. Connect repository
4. Configure:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Health Check Path**: `/api/health`
5. Add environment variables in Render dashboard
6. Deploy

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port (default: 5000) | No |
| `NODE_ENV` | Environment (development/production) | No |
| `MONGO_URI` | MongoDB connection string | Yes |
| `FRONTEND_URL` | Frontend URL for CORS | No |
| `EMAIL_HOST` | SMTP host | Yes |
| `EMAIL_PORT` | SMTP port | Yes |
| `EMAIL_USER` | SMTP username | Yes |
| `EMAIL_PASS` | SMTP password | Yes |
| `EMAIL_FROM` | Sender email | No |
| `EMAIL_TO` | Recipient email | No |

## Project Structure

```
src/
├── config/
│   ├── database.js    # MongoDB connection
│   └── env.js         # Environment config
├── controllers/       # Route handlers
├── middleware/
│   └── errorMiddleware.js
├── models/            # Mongoose models
├── routes/            # Express routes
├── services/
│   └── emailService.js
├── utils/
│   ├── errors.js      # Custom error classes
│   └── seed.js        # Database seeding
├── validations/
│   └── contactValidation.js
├── app.js             # Express app setup
└── server.js          # Entry point
```

## License

MIT