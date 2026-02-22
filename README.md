# Nimble Gravity Challenge

This project is a web application developed as part of a technical challenge for **Nimble Gravity**. The platform allows users to view candidate information, list open job positions, and submit applications using GitHub repository URLs, all wrapped in a modern and optimized UI/UX.

## 🚀 Tech Stack

- **React 19**: Core library for the user interface.
- **TypeScript**: Static typing for more robust development.
- **Vite 7**: Fast next-generation frontend tooling.
- **Tailwind CSS 4**: Modern utility-first styling with responsive design.
- **Axios**: HTTP client for consuming API services.
- **PostCSS**: CSS processing with Tailwind v4 integration.

## 🛠️ Installation and Setup

Follow these steps to run the project locally:

### 1. Clone the Repository

```bash
git clone https://github.com/juliandebra/nimble-gravity-challenge.git
cd nimble-gravity-challenge
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables Configuration

The project uses environment variables to handle sensitive data and configurations.

- Create a `.env` file in the project root.
- Copy the content from `.env.example` and fill in your details:

```env
VITE_CANDIDATE_EMAIL=your_email@example.com
VITE_API_BASE_URL=https://challenge-api-url.com
```

> **Note**: The `.env` file is ignored by Git for security reasons.

### 4. Run the Project

Start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:5173`.

## 📦 Available Scripts

- `npm run dev`: Starts the development server with HMR.
- `npm run build`: Builds the application for production.
- `npm run preview`: Locally runs the production build.
- `npm run lint`: Runs the linter to verify code quality.

## ✨ UI Features

- **Optimized Header**: Modern design with attractive gradients and animated badges.
- **Candidate Cards**: Clear and concise information with automatic initial generation.
- **Job Listings**: Cards with hover effects and visual loading feedback (skeletons).
- **Responsive Design**: Fully adapted for mobile, tablet, and desktop devices.
