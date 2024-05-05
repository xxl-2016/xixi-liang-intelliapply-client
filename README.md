# IntelliApply Pro

![IntelliApply Pro Logo](src/assets/logos/intelliapply-logo.png)

## Overview

IntelliApply Pro is a React-based web application designed to revolutionize the job application process. By integrating job search APIs from Indeed, Glassdoor, and LinkedIn, IntelliApply Pro offers users a comprehensive platform to find and apply for job listings efficiently. With AI-powered cover letter and resume generation capabilities, the platform ensures that users' application materials are tailored to each job listing, saving time and effort in the application process.

## Installation
To install IntelliApply Pro locally, follow steps:
- Clone the repository: git clone https://github.com/xxl-2016/xixi-liang-intelliapply-client
- npm i
- npm start


## Problem
Job seekers often face the challenge of navigating multiple job search platforms to find suitable job opportunities. Analyzing job listings, tailoring application materials, and managing the application process can be time-consuming and tedious. IntelliApply Pro addresses these pain points by centralizing job search, automating application material generation, and streamlining the application process.

## Demo
![IntelliApply Pro Demo](src/assets/demos/IntelliApply-demo2.gif)


### User Profile
- Job seekers:
    - Seeking efficient job search and application processes
    - Interested in personalized application material generation
    - Looking to manage job applications effectively

### Features
- Seamless Integration of Job Search APIs: Access job listings from Indeed, Glassdoor, and LinkedIn in one platform.
- AI-Powered Cover Letter and Resume Generation: Automatically generate tailored cover letters and resumes based on user-provided information and job listing requirements.
- Sorting and Filtering: Sort and filter job listings by criteria such as title, salary, and location.
- User Authentication: Secure user authentication for account creation, login, and profile management.
- Resume Upload: Allow users to upload their resumes for job applications.
- Responsive UI: User-friendly interface built with React.js and UI libraries for optimal user experience across devices.

## Implementation

### Tech Stack
- React.js
- Node.js/Express.js
- MySQL
- GPT Model (Generative Pre-trained Transformer)
- UI Frameworks (e.g., Figma)
- Authentication Services
- APIs (e.g., RapidAPI, Postman)
    - Indeed Job Search API
    - Glassdoor Job Search API
    - LinkedIn Job Search API

### Sitemap (See mockup PDF)
- Home page 
- Job listings
- Job details
- User authentication (register, login)
- Profile management


### Data
SQL Diagram

### Endpoints

**GET /jobs**
- Retrieve a list of job listings based on search criteria.
- Parameters:
    - title (optional): Search term to filter job listings by title.
    - date (optional): Filter job listings by date posted.
    - token (optional): JWT used for authentication.
- Response:
[
    {
        "id": 1,
        "title": "Software Engineer",
        "company": "Example Tech",
        "location": "San Francisco, CA",
        "salary": "$100,000 - $120,000",
        "datePosted": "2024-04-20",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        ...
    },
    ...
]

**GET /jobs/:id**
- Retrieve details of a specific job listing by its ID.
- Parameters:
    - id: Job ID as a number.
    - token (optional): JWT used for authentication.
- Response:
{
    "id": 1,
    "title": "Software Engineer",
    "company": "Example Tech",
    "location": "San Francisco, CA",
    "salary": "$100,000 - $120,000",
    "datePosted": "2024-04-20",
    "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
    ...
}

**GET /jobs/date**
- Retrieve job listings sorted by date posted.
- Parameters:
    - date: Date range to filter job listings by date posted.
    - token (optional): JWT used for authentication.
- Response:
[
    {
        "id": 1,
        "title": "Software Engineer",
        "company": "Example Tech",
        "location": "San Francisco, CA",
        "salary": "$100,000 - $120,000",
        "datePosted": "2024-04-20",
        "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
        ...
    },
    ...
]

**POST /users/register**
- Register a new user account.
- Parameters:
    - email: User's email address.
    - username: User's username.
    - password: User's chosen password.
- Response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}

**POST /users/login**
- Log in an existing user.
- Parameters:
    - username: User's username.
    - password: User's password.
- Response:
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6I..."
}

### Auth
JWT-based authentication for user accounts.

### Roadmap
- Set up React project with routing and boilerplate pages.
- Set up Express project with routing and placeholder responses.
- Create database migrations and seed data.
- Integrate job search APIs and implement job listing retrieval.
- Implement cover letter and resume generation functionality.
- Implement user authentication (registration, login).
- Build UI components for job listings, job details, and user authentication.
- Implement sorting and filtering options for job listings.
- Deploy client and server projects for production use.
- Bug fixes and improvements.
- Demo Day presentation.


### Nice-to-haves
- Enhanced job recommendation system based on user preferences.
- Integration with additional job search platforms.
- Advanced sorting and filtering options.
- Resume parsing functionality to extract information from uploaded resumes.
- Integration with LinkedIn for user profile information retrieval.
- User feedback and rating system for job listings.
- Unit and integration tests for robustness and reliability.

## Contact Information
For any inquiries or assistance, please feel free to reach out via email at: lxx260905@gmail.com# xixi-liang-IntelliApplyPro-client

# xixi-liang-intelliapply-server
https://github.com/xxl-2016/xixi-liang-intelliapply-server
