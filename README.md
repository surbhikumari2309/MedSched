# MedSched

## Description
MedSched is basically a full-stack healthcare appointment scheduling app that makes booking doctor appointments super easy. Instead of going to the hospital just to book a slot, patients can do everything from their phone, anytime and from anywhere, which is pretty convenient. Doctors also get their own separate dashboard, but they can't just sign up and start using it. They first have to send a verification request, and once the admin approves it, they're good to go. I also added a credit-based payment system, so the whole appointment booking process feels smooth. Overall, the idea was to make healthcare a little more accessible and way less of a headache for both patients and doctors..

## Features

- **Dedicated Portals** :
Separate Dashboards for Patients, Doctors and Admins.

- **Doctor Verification** :
Admins can review and verify or reject doctor profiles before they can accept appointments.

- **Availabillity Management** :
Doctors can set up and manage their available time slots and the upcoming appointments will be visible to the doctor.

- **Appointment Booking System** :
Patients can browse verified doctors, view available slots and book appointments and the the following appointments will be shown in My Appointment section.

- **Appointment History** :
Patients and doctors can view upcoming and past consultations.

- **Video Consultation (Coming Soon)** :
Future support for high-quality video calls.

## Active Bugs
None I guess

## Tech Stack
- **Framework** : Next.js (App Router, v16.2.9)
- **Frontend Library** : React (v19.2.4)
- **Styling** : Tailwind CSS, Shadcn UI (Radix UI), Lucide React
- **Authentication** : Clerk (@clerk/nextjs)
- **Database / ORM** : PostgreSQL (Neon Serverless), Prisma Client (@prisma/client)
- **Forms & Validation** : React Hook Form, Zod
- **Notifications** : Sonner
- **Utilities** : Date-fns, Class Variance Authority (CVA), tailwind-merge, clsx

## AI Usage
- Debugging 
- help with readme file especially how to run locally part

## How to run locally
- Node.js
- PostgreSQL Database (e.g: Neon)
- Clerk Account

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/medsched.git 
   cd medsched
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Third-Party services &Environment Variables:
    Create a .env file in the root directory. You will need to create accounts and retrieve keys for the following services:

    - Authentication (Clerk) :
      Create an application at [Clerk](https://clerk.com/) and copy the API keys.
    - Database (Neon/PostgreSQL):
      Create a Postgres database at [Neon](https://neon.tech/) and copy the connection string.
    
    Add these to your `.env` file:
    ```env
     NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
     CLERK_SECRET_KEY=your_clerk_secret_key
     DATABASE_URL=your_postgresql_database_url
    NEXT_PUBLIC_APP_URL=http://localhost:3000
    ```
4. Initialize the Dtabase:
   Generate the custom Prisma client into the local `lib/generated/prisma` directory:
    ```bash
   npx prisma generate
   ```
   Push the schema to your remote database to create the necessary tables:
   ```bash
   npx prisma db push
   ```
5. Run the development server:
   ```bash
   npm run dev
   ```
6. Access the application:
   open [http://localhost:3000](http://localhost:3000) in your browser.

    