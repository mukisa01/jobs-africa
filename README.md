# Jobs Africa

## Africa's Freelance Job Platform

Jobs Africa is a web-based freelance job platform designed to connect students and skilled freelancers with clients who need services. The platform provides a secure environment where students can find freelance opportunities, clients can post jobs, and administrators can manage the platform.

## Project Overview

Jobs Africa provides three main types of users:

- **Students/Freelancers** – create accounts, browse available jobs, apply for jobs, and complete verification.
- **Clients** – create accounts, post freelance jobs, and review applications.
- **Administrators** – manage users, jobs, applications, and student verification requests.

## Main Features

### Student Features

- Student registration and login
- Student dashboard
- Browse available freelance jobs
- View job details
- Apply for jobs
- View submitted applications
- Student verification
- Proof-of-payment submission

### Client Features

- Client registration and login
- Client dashboard
- Post freelance jobs
- Specify job description, budget, and required skills
- View job applications

### Administrator Features

- Secure administrator authentication
- Admin dashboard
- Manage users
- Manage jobs
- View applications
- Manage student verification requests
- Review proof of payment
- Approve, reject, or request additional information

## Verification

Students are required to complete the verification process before accessing the relevant verified-user features.

The verification fee is **US$3**.

Students can submit proof of payment through the platform, after which an administrator can review the verification request.

## Technology Stack

Jobs Africa is built using:

- **Next.js** – web application framework
- **React** – user interface
- **TypeScript** – programming language
- **Prisma ORM** – database access
- **PostgreSQL** – relational database
- **Neon** – hosted PostgreSQL database
- **bcryptjs** – password hashing
- **Jose** – authentication/security utilities
- **Vercel** – production deployment
- **GitHub** – source code management

## System Workflow

### Student Workflow

1. Student creates an account.
2. Student logs in.
3. Student browses available jobs.
4. Student selects a suitable job.
5. Student submits an application.
6. Student can view the application from the dashboard.
7. Student completes verification and submits proof of payment where required.

### Client Workflow

1. Client creates an account.
2. Client logs in.
3. Client opens the Client Dashboard.
4. Client posts a freelance job.
5. The job becomes available to students.
6. Client can view applications submitted for the job.

### Administrator Workflow

1. Administrator logs in securely.
2. Administrator accesses the Admin Dashboard.
3. Administrator manages users and jobs.
4. Administrator reviews applications.
5. Administrator reviews verification requests.
6. Administrator approves, rejects, or requests additional information.

## Database

Jobs Africa uses PostgreSQL as its relational database.

Prisma ORM is used to define the database schema and communicate with PostgreSQL.

The main entities include:

- Users
- Jobs
- Applications
- Messages
- Verification Requests

## Security

The application includes role-based access control.

Users have different roles:

- `STUDENT`
- `CLIENT`
- `ADMIN`

Administrative pages are protected so that ordinary students and clients cannot access administrator functions.

Passwords are securely hashed before being stored.

## Local Development

### Requirements

Before running the project locally, install:

- Node.js
- npm
- PostgreSQL or access to a PostgreSQL database

### Installation

Clone the repository and enter the project directory:

```bash
git clone https://github.com/mukisa01/jobs-africa.git
cd jobs-africa