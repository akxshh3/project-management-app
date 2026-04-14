# Project Management App

A full-stack project management application with user authentication, project creation, and task management.

## Features

✅ **User Authentication** - Sign up and login with JWT tokens  
✅ **Project Management** - Create, edit, and delete projects  
✅ **Task Management** - Create, edit, delete tasks with status and priority  
✅ **User-Specific Data** - Each user sees only their own projects and tasks  
✅ **Responsive Design** - Works on desktop and mobile  
✅ **Secure** - Password hashing and JWT authentication  

## Tech Stack

- **Backend**: Flask (Python)
- **Database**: SQLite (development) / PostgreSQL (production)
- **Authentication**: JWT (JSON Web Tokens)
- **Frontend**: HTML, CSS, JavaScript (Vanilla)
- **Password Hashing**: Bcrypt

## Project Structure

```
project-management-app/
├── app.py                 # Flask backend application
├── index.html            # Frontend (single-page app)
├── requirements.txt      # Python dependencies
├── .env                  # Environment variables
├── .gitignore           # Git ignore file
└── README.md            # This file
```

## Setup & Installation

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd project-management-app
```

### 2. Backend Setup

#### Create Virtual Environment

```bash
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate
```

#### Install Dependencies

```bash
pip install -r requirements.txt
```

#### Configure Environment Variables

Update `.env` file with your settings:

```env
DATABASE_URL=sqlite:///project_manager.db
JWT_SECRET_KEY=your-super-secret-key-change-this-in-production
FLASK_ENV=development
```

### 3. Initialize Database

```bash
python
>>> from app import app, db
>>> with app.app_context():
...     db.create_all()
>>> exit()
```

### 4. Run Backend Server

```bash
python app.py
```

Backend will run on: `http://localhost:5000`

### 5. Run Frontend

Open `index.html` in your browser or serve it with a simple HTTP server:

```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

Frontend will run on: `http://localhost:8000`

## API Endpoints

### Authentication

- `POST /api/auth/signup` - Create new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)

### Projects

- `GET /api/projects` - Get all user projects (protected)
- `POST /api/projects` - Create new project (protected)
- `GET /api/projects/<id>` - Get project details (protected)
- `PUT /api/projects/<id>` - Update project (protected)
- `DELETE /api/projects/<id>` - Delete project (protected)

### Tasks

- `POST /api/projects/<id>/tasks` - Create task (protected)
- `PUT /api/tasks/<id>` - Update task (protected)
- `DELETE /api/tasks/<id>` - Delete task (protected)

## Database Schema

### Users Table
```
id (PK)
username (unique)
email (unique)
password (hashed)
created_at
```

### Projects Table
```
id (PK)
title
description
user_id (FK)
created_at
updated_at
```

### Tasks Table
```
id (PK)
title
description
status (todo, in_progress, completed)
priority (low, medium, high)
project_id (FK)
created_at
updated_at
```

## Usage

1. **Sign Up**: Create a new account with username, email, and password
2. **Create Project**: Click "New Project" and add title & description
3. **View Project**: Click on a project card to see details and tasks
4. **Add Task**: Click "New Task" to add tasks to a project
5. **Edit Task**: Click "Edit" to change task details, status, or priority
6. **Delete**: Remove tasks or projects (confirmation required)

## Deployment

### Deploy on Render.com (Free)

1. Push code to GitHub
2. Connect GitHub repo to Render
3. Create new Web Service
4. Set Environment Variables in Render dashboard
5. Deploy!

**Production Database URL** (PostgreSQL on Render):
```
DATABASE_URL=postgresql://user:password@host:5432/dbname
JWT_SECRET_KEY=your-production-secret-key-here
FLASK_ENV=production
```

### Deploy on Railway.app

1. Push to GitHub
2. Connect Railway to GitHub repo
3. Add environment variables
4. Railway auto-detects Flask and deploys

## Future Enhancements

- [ ] Team collaboration (share projects)
- [ ] Comments on tasks
- [ ] Due dates and reminders
- [ ] File attachments
- [ ] Activity log
- [ ] Dark mode
- [ ] Mobile app (React Native)

## Security Notes

⚠️ **Before Production:**
- Change `JWT_SECRET_KEY` in `.env`
- Use PostgreSQL instead of SQLite
- Enable HTTPS
- Set `FLASK_ENV=production`
- Use strong password policies
- Implement rate limiting
- Add CSRF protection

## Troubleshooting

**Backend not connecting?**
- Ensure backend is running on port 5000
- Check CORS is enabled in `app.py`
- Check browser console for errors

**Login not working?**
- Verify email and password in database
- Check JWT token in browser localStorage
- Ensure Authorization header is sent

**Tasks not saving?**
- Check browser console for errors
- Verify JWT token is valid
- Ensure project exists

## License

MIT License - Feel free to use this project for learning and development!

## Support

For issues or questions, check the GitHub issues or create a new one.

---

**Built with ❤️ for learning full-stack development**
