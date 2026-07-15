# MedSched

## Description
MedSched is basically a full-stack healthcare appointment scheduling app that makes booking doctor appointments super easy. Instead of going to the hospital just to book a slot, patients can do everything from their phone, anytime and from anywhere, which is pretty convenient. Doctors also get their own separate dashboard, but they can't just sign up and start using it. They first have to send a verification request, and once the admin approves it, they're good to go. I also added a credit-based payment system, so the whole appointment booking process feels smooth. Overall, the idea was to make healthcare a little more accessible and way less of a headache for both patients and doctors..

## Features

- **Dedicated Portals** :
Separate Dashboards for Patients and Doctors.
Admin Dashboard can onlyl be accessed from the backend with login credentials to approve doctors. Not exactly a feature and cannot be tested by third party without local installation.

- **Doctor Verification** :
From backend, Admins can review and verify or reject doctor profiles before they can accept appointments.
To open admin dashboard, go to actions/admin.js -> make lines 28-30 active and comment lines 7-26 then visit localhost:3000/admin in url bar in browser (assuming that the app is running at localhost:3000)

- **Availabillity Management** :
Doctors can set up and manage their available time slots and the upcoming appointments will be visible to the doctor.

- **Appointment Booking System** :
Patients can browse verified doctors, view available slots and book appointments and the the following appointments will be shown in My Appointment section.

- **Appointment History** :
Patients and doctors can view upcoming and past consultations.

- **Appointment Rescheduling & Cancellation (Coming Soon)**

- **Video Consultation (Coming Soon)** :
Future support for high-quality video calls.

- **Payments**:
  It doesn't support payments yet but it will in the future.

## Tech Stack
- **Framework** : Next.js (App Router, v16.2.9)
- **Frontend Library** : React (v19.2.4)
- **Styling** : Tailwind CSS, Shadcn UI (Radix UI), Lucide React
- **Authentication** : Clerk (@clerk/nextjs)
- **Database / ORM** : PostgreSQL (Neon Serverless), Prisma Client (@prisma/client)
- **Forms & Validation** : React Hook Form, Zod
- **Notifications** : Sonner
- **Utilities** : Date-fns, Class Variance Authority (CVA), tailwind-merge, clsx

## Problems
### Disclaimer
- Deployment is done while clerk is in development mode. I got to know later that clerk does not allow .vercel.app or such domains
- Purchase doesn't trigger payment. It automatically adds credits. I will add this in future version
- Limitation: Appointement booking can only be made upto 4 days in advance. This is by intention but can seem like a bug that's why it is mentioned here.
- Appointment Rescheduling & Cancellation is not available yet
  
### Bugs
- User must complete profile before booking appointments or doing other other stuff.
- Last slot as per timings set by a docotr is sometimes not visible
  
## AI Usage
- Debugging 
- help with readme file especially how to run locally part

## Screenshots
<img width="2844" height="1518" alt="Screenshot 2026-07-15 115248" src="https://github.com/user-attachments/assets/d43f37cb-8d2c-48b2-b2a2-a71c72fce177" />
<img width="2828" height="1506" alt="Screenshot 2026-07-15 115211" src="https://github.com/user-attachments/assets/048df7b6-13f1-40eb-af9c-f52db5d68802" />
<img width="2880" height="1800" alt="Screenshot 2026-07-15 114631" src="https://github.com/user-attachments/assets/3608d5d6-bc3f-4d74-982f-9493e293113d" />
<img width="2880" height="1800" alt="Screenshot 2026-07-15 114542" src="https://github.com/user-attachments/assets/4fd0ba0a-281a-49af-8394-3e716d6edc5b" />
<img width="2822" height="1511" alt="Screenshot 2026-07-14 201130" src="https://github.com/user-attachments/assets/7ed009c4-91ee-48aa-87b7-a7334ae08b11" />
<img width="2826" height="1490" alt="Screenshot 2026-07-14 190912" src="https://github.com/user-attachments/assets/c4812d74-69fb-4b24-b2ff-b48a8d6c954d" />
<img width="2834" height="1496" alt="Screenshot 2026-07-14 185443" src="https://github.com/user-attachments/assets/ef739608-1baf-4d04-b04e-0d04ba1d9028" />

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

    
