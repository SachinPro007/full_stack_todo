# Secure Todo Application

## 🚀 Project Overview

This is a robust, full-stack To-Do application built with **Next.js 15.5.4 (App Router)**. This project serves as a comprehensive showcase of modern, secure architecture and full-stack implementation, going far beyond basic task management.

The primary focus of this application is on **security, data isolation, and advanced user management**, ensuring every user's data is private and secure.

---

## ✨ Key Features & Technical Highlights

### 🔒 Security and Authentication

- **Custom Secure Session Management:** Implements cookied-based sessions with multi-step verification, utilizing **`crypto.createHmac`** to ensure session IDs are tamper-proof and robust against potential hijacking.
- **Encrypted Credentials:** User passwords are never stored directly; they are secured using **Bcrypt hashing**.
- **OAuth Integration:** Seamless login experience using **Google OAuth** powered by Auth.js.
- **Data Isolation:** Built to ensure strict data privacy—no user can view the tasks or data of any other user.
- **Hosted Database:** Uses an external **MySQL** database (hosted on TiDB Cloud) separate from the application code for enhanced security.
- **Secure Secrets Handling:** Utilizes environment variables (`.env` and `.env.local`) for keeping personal keys and data secure.

### 💻 Application Architecture

- **Code Quality Pipeline:** Implements **ESLint** (for fixing errors and learning code quality) and **Prettier** (as a dedicated formatter) for maintaining high-quality, consistent code across the entire project.
- **Automated Code Checks:** Uses **Husky** with **`lint-staged`** to automatically lint and format *only the staged files* before every commit, ensuring clean code is always pushed to the repository.
- **Next.js Full-Stack (v15.5.4):** Leverages the latest features of the App Router, including dedicated **Route Handlers** (`route.js`) for REST APIs and powerful **Server Actions** for form mutations and server-side data logic.
- **Intelligent Middleware:** Custom Next.js Middleware redirects users based on their authentication state, preventing logged-in users from accessing authentication pages and protecting core pages from logged-out users.
- **Reliable Data Validation:** Integrates **Zod** for powerful, schema-based validation on all incoming form data and API requests.
- **Proper Folder Structure:** Maintained for project scalability and clarity.
- **Loading States:** Proper handling of loading and submission states is implemented throughout the application for an improved user experience.

### 🧪 Testing & Demo Access

- **Public Demo Account:** A pre-configured demo account is available for users to test the application's core functionality immediately without needing to register.
  - **NOTE:** Tasks added to the demo account are visible to all users. A **prominent in-app notice** clarifies that all data in the demo account is public, encouraging users to create a private account for security.

---

## 🛠️ Tech Stack

| Category | Technology | Purpose |
| :--- | :--- | :--- |
| **Framework** | **Next.js 15.5.4** | Full-stack architecture (App Router, Server Components) |
| **Database** | **MySQL** | Persistence layer (Hosted via TiDB Cloud) |
| **Authentication** | **Auth.js** (NextAuth.js) | Handles Google OAuth and base session flow |
| **Validation** | **Zod** | Schema validation |
| **Security** | **Bcrypt, createHmac** | Password hashing and custom cookie signing |
| **Code Quality** | **ESLint, Prettier** | Enforcing code consistency, auto-fixing errors, and formatting. |
| **Git Workflow** | **Husky, lint-staged** | Automating pre-commit code quality checks. |

---

## ⚙️ Getting Started

To set up and run this application locally, you will need Node.js and either npm or yarn.

### Installation & Local Setup

1. Clone the Repository: Clone this repository and navigate into the project directory.

2. Install Dependencies: Run your package manager's install command (`npm install` or `yarn`).

3. Configure Environment: You must create a `.env` and `.env.local` file in the root directory and populate it with the following required credentials:

**Create .env file:**

```env
# Custom HMAC Key (used with crypto.createHmac for cookie signing)
COOKIE_SECRET="VERY_LONG_AND_UNIQUE_SECRET"

# Database Connection
DB_HOST="..."
DB_USER="..."
DB_PASSWORD="..."
DB_DATABASE="..."
```

**Create .env.local file:**

```env.local
# AUTH.JS secret key.....
AUTH_SECRET=this_key_auto_genret_when_you_install_auth.js

# Google OAuth (If using social login)
AUTH_GOOGLE_ID="..."
AUTH_GOOGLE_SECRET="..."
```

### Running Locally

```bash
npm run dev
# or
yarn dev
```

## Code Quality Scripts (For Contributors)
To manually run the code quality checks or format the entire codebase:

```bash
# Lints and fixes errors across the entire codebase
npm run lint:fix

# Formats all files according to Prettier rules
npm run format
```
