# 📋 Task Management

A full‑stack task management application built with **Django REST Framework** (backend) and **React** (frontend).  
Users can register/login, create, update, delete, and list tasks via a RESTful API with JWT authentication.

---

## 🛠️ Technology Stack

- **Backend**  
  - Python 3, Django 4.x  
  - Django REST Framework  
  - SQLite (development); easily switchable to PostgreSQL, etc.
- **Frontend**  
  - React (Create React App)  
  - Axios for API calls  
  - CSS modules / plain CSS for styling

---

## 🚀 Getting Started

Clone the repository:

```bash
git clone <repo-url>
cd Task-Management-
```

---

### 🐍 Backend Setup

1. **Create & activate a virtualenv:**

   ```bash
   cd backend
   python -m venv venv
   .\\venv\\Scripts\\activate     # Windows
   source venv/bin/activate       # macOS/Linux
   ```

2. **Install dependencies:**

   ```bash
   pip install -r requirements.txt
   ```

3. **Database migrations:**

   ```bash
   python manage.py migrate
   ```

4. **Create a superuser (optional):**

   ```bash
   python manage.py createsuperuser
   ```

5. **Run the development server:**

   ```bash
   python manage.py runserver
   ```

   - API root: `http://127.0.0.1:8000/`  
   - Task endpoints available under `/api/tasks/` (see `tasks/urls.py`).

---

### ⚛️ Frontend Setup

1. **Install Node dependencies:**

   ```bash
   cd ../frontend
   npm install
   ```

2. **Start the React app:**

   ```bash
   npm start
   ```

   This runs on `http://localhost:3000/` by default and will proxy API calls to the Django backend.

3. **Build for production:**

   ```bash
   npm run build
   ```

   - Output in `frontend/build/` can be served by any static server or integrated with Django.

---

## 🔐 Authentication

The backend uses JWT tokens.  
Register/login via the frontend forms (see `Register.js`/`Login.js`).  
Tokens are stored in localStorage and included automatically in API requests via `services/api.js`.

---

## 🧪 Testing

- **Backend**:

  ```bash
  cd backend
  python manage.py test
  ```

- **Frontend**:

  ```bash
  cd frontend
  npm test
  ```

---

## 📦 Deployment

- **Heroku** / **Vercel** / **Render** are all viable.
- Backend `Procfile` and `runtime.txt` are already provided.
- Frontend `vercel.json` shows Vercel configuration.

> ✅ For full-stack hosting, build React (`npm run build`) and serve static files from Django (`Whitenoise` or similar).

---

## 📁 Project Structure

```
backend/
  manage.py
  smarttodo/         # Django project
  tasks/             # Django app (models, views, serializers, urls, etc.)
frontend/
  src/
    components/      # React UI components
    services/        # API helper
    styles/
  public/
```

---

## 🤝 Contributing

1. Fork the repo.
2. Create a feature branch (`git checkout -b feat/xyz`).
3. Commit & push your changes.
4. Open a pull request.

---

## 📄 License

This project is open‑source. Add your preferred license here (MIT, Apache 2.0, etc.).

---

Feel free to adjust or extend this README as the project evolves! 
