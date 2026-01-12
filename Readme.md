# E-Shop Project

A full-stack e-commerce web application built with **React**, **Tailwind CSS**, **Express**, **MongoDB**, and **Stripe** for payments. The project is structured with separate `client` (frontend) and `backend` (API server) folders.

---

## Project Structure


E-Shop/
├── client/        # React frontend
├── backend/       # Express backend
├── README.md      # This file


---

## Features

- User authentication with JWT
- Product listing and filtering
- Shopping cart functionality
- Orders page for logged-in users
- Stripe integration for payments
- Responsive design for desktop and mobile

---

## Technologies Used

**Frontend (`client`):**

- React 19
- React Router DOM
- Tailwind CSS
- React Icons
- React Hot Toast
- Axios
- Stripe React SDK

**Backend (`backend`):**

- Node.js & Express
- MongoDB & Mongoose
- JWT authentication
- Bcrypt for password hashing
- Stripe API for payment processing
- CORS & dotenv for configuration

---

## Setup Instructions

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd E-Shop
````

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` folder with the following variables:

```
PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
```

Start the backend server:

```bash
npm run dev
```

The backend will run on `http://localhost:5000`.

### 3. Setup Frontend

```bash
cd ../client
npm install
```

Start the frontend development server:

```bash
npm run dev
```

The frontend will run on `http://localhost:5173` (or the port Vite assigns).

---

## Available Scripts

### Client

| Script            | Description                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Starts the Vite development server |
| `npm run build`   | Builds the production bundle       |
| `npm run preview` | Preview the production build       |
| `npm run lint`    | Runs ESLint on the codebase        |

### Backend

| Script        | Description                 |
| ------------- | --------------------------- |
| `npm run dev` | Starts backend with Nodemon |

---

## Environment Variables

**Backend `.env` file:**

```
PORT=5000                     # Port where backend runs
MONGO_URI=<your-mongo-uri>    # MongoDB connection string
JWT_SECRET=<your-jwt-secret>  # Secret key for JWT authentication
STRIPE_SECRET_KEY=<your-stripe-key> # Stripe secret key
```

**Frontend** does not require environment variables for basic setup, but you may add `VITE_API_URL=http://localhost:5000` if needed.

---

## Notes

* Ensure MongoDB is running locally or provide a cloud MongoDB URI.
* Stripe requires live or test API keys.
* JWT is stored in localStorage for authentication.
* Responsive design works for both desktop and mobile devices.

---

## License

This project is **MIT Licensed**.

---

```

This is fully ready to **copy and paste** into your main project folder.  

If you want, I can also **add an “API Endpoints” section** showing your backend routes for `/products`, `/orders`, `/login`, etc., so it’s even more professional.  

Do you want me to add that?
```
