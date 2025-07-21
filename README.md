# 📘 FakeRestAPI Automation Tests

This project contains end-to-end automated API tests for the [FakeRestAPI](https://fakerestapi.azurewebsites.net/index.html), specifically the **Books** and **Authors** endpoints.

Tests are written in **JavaScript** using:

- [Mocha](https://mochajs.org/) – Testing framework
- [Chai](https://www.chaijs.com/) – Assertions
- [Supertest](https://github.com/visionmedia/supertest) – HTTP request assertions
- [Mochawesome](https://github.com/adamgruber/mochawesome) – HTML test report generator

---

## How to Set Up and Run the Tests

Follow these steps to get the project running locally:

### 1. Prerequisites

Make sure the following are installed:

- **[Node.js](https://nodejs.org/)** (v16 or later)
- **npm** (comes with Node.js)
- **Git** (or GitHub Desktop / Sourcetree)

---

### 2. Clone the Repository
https://github.com/kostovskaivona/FakeRestAPIs.git

### 3. Install Dependencies

npm install --save-dev mocha chai supertest mochawesome

---

## Project Structure

├── tests/
│ ├── booksAPI.js # Tests for Books API endpoints
│ └── authorsAPI.js # Tests for Authors API endpoints
├── mochawesome-report/ # Generated test reports
├── Dockerfile # Docker setup to run tests in container
├── .github/
│ └── workflows/
│ └── ci.yml # GitHub Actions CI pipeline
├── package-lock.json
├── package.json
└── README.md

## Running Tests
You can run all or specific API tests via the following scripts:
Run All Tests - npm test
Run Only Books API Tests - npm run test:books
Run Only Authors API Tests - npm run test:authors

## Test Report:
After test execution, a Mochawesome HTML report is generated at:
mochawesome-report/mochawesome.html
Open this file in your browser to view test results with logs and metadata.

## API Endpoints Covered

Books API:
GET	/api/v1/Books	
GET	/api/v1/Books/{id}	
POST	/api/v1/Books	
PUT	/api/v1/Books/{id}	
DELETE	/api/v1/Books/{id}	

Authors API
GET	/api/v1/Authors	
GET	/api/v1/Authors/{id}	
POST	/api/v1/Authors	
PUT	/api/v1/Authors/{id}	
DELETE	/api/v1/Authors/{id}

Note: because the endpoints 
- does not have validations
- does not return errors
- does not insert or edit data in DB
- data is constantly changing
I wrote tests for what is returned after execution of every endpoint


## Running Tests with Docker and CI/CD Pipeline
This project includes a Dockerfile and a GitHub Actions workflow for running tests in a containerized environment as part of a CI/CD pipeline.

The Dockerfile builds a container image that installs dependencies and runs the test suite with Mochawesome reporting.

The GitHub Actions workflow (.github/workflows/ci.yml) builds the Docker image, runs the tests inside the container on GitHub’s Linux runners, and uploads the test reports as artifacts.

# Local Docker Usage
Due to restrictions on the computer (e.g., inability to update WSL or install Docker Desktop properly), running Docker locally was not possible.

If your environment supports Docker, you can run tests locally in Docker with:

docker build -t api-tests .
docker run --rm api-tests

# Running Tests Without Docker Locally
You can run the tests directly on your local machine without Docker:

npm install
npm test
This executes the same test suite and generates reports identically.

## Continuous Integration (CI)
Tests run automatically on every push and pull request to the main branch using the GitHub Actions workflow.

This workflow uses Docker on GitHub’s hosted runners, so tests run in a consistent containerized environment without requiring Docker on your local machine.

Test reports are uploaded as workflow artifacts and can be downloaded from the GitHub Actions interface.