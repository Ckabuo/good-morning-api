# Good Morning Message API

## Overview

A Node.js, Express, and Typescript API that provides daily morning messages. The API automatically rotates messages every 24 hours or at 8 AM each day.

## Features

* GET endpoint to retrieve daily morning messages
* POST endpoint to add new morning messages
* Automatic message rotation every 24 hours or at 8 AM
* Message persistence across server restarts
* RESTful API design
* Typescript for type safety and better development experience

## Tech Stack

* Node.js
* Express
* TypeScript
* Express Rate Limit
* Helmet (Security)
* Morgan (Logging)

## Prerequisites

Before running this project, make sure you have:
* Node.js (v18 or higher)
* npm (v10 or higher)
* Git

## Project Structure

```sh
goodMorningApi/
├── src/
│   ├── controllers/
│   │   └── messageController.ts
│   ├── routes/
│   │   └── messageRoutes.ts
│   ├── types.ts
│   ├── messageService.ts
│   ├── config.ts
│   └── app.ts
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Installation

1. Clone the repository:
```
git clone https://github.com/Ckabuo/good-morning-api.git
cd good-morning-api
```

2. Install dependencies:
```sh
npm install
```

3. Create a ``.env``file in the root directory (optional):
```
PORT=3000
NODE_ENV=development
```

4. Run the development server:
```sh
npm run dev
```

## API Endpoints

### Get Current Message
```
GET api/messages/
```
Returns the current morning message and its last update time.

### Get All Messages
```
GET api/messages/all
```
Returns all available morning messages.

### Get Current Message Index
```
GET api/messages/current-index
```
Returns the index of the current message.

### Get Last Update Time
```
GET api/messages/last-update
```
Returns when the message was last updated.

### Get Total Message Count
```
GET api/messages/count
```
Returns the Total count of messages in the rotation.

### Add New Message
```
POST api/messages/
Content-Type: application/json

{
    "message": "Your morning message here"
}
```

## Usage

### Development Mode
To start the server in development mode with live reloading:
```sh
npm run dev
```

### Production Mode
To build and run the server in production mode:
```sh
npm run build
npm start
```

## Contributing
Contributions are welcomed! Please feel free to submit a pull request or open issues for any improvement or bug reports.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

