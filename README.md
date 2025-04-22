# Cairbnb – An Airbnb Clone

Cairbnb is a web application inspired by Airbnb, designed to allow users to list, discover, and book accommodations. Built using Node.js, Express, and MongoDB, Cairbnb offers a platform for property owners to showcase their spaces and for travelers to find unique places to stay.

## Features

- **Property Listings:** Browse a variety of listings with details, images, and pricing.
- **User Authentication:** Secure user registration and login.
- **Booking System:** Reserve accommodations for specific dates.
- **Review and Ratings:** Allow users to leave reviews and ratings for properties.
- **Search and Filters:** Find properties based on location, price, and amenities.
- **Responsive Design:** Built with Bootstrap for a seamless experience on all devices.

## Tech Stack

- **Backend:**
  - Node.js
  - Express
  - MongoDB
  - Mongoose
  - Passport (for authentication)
- **Frontend:**
  - EJS (Templating)
  - Bootstrap
  - CSS

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/cairbnb.git
   cd cairbnb
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure MongoDB:**

   - Ensure MongoDB is installed and running.
   - Update the connection string in `config/database.js` (or similar) to point to your MongoDB instance.

4. **Set up environment variables:**

   - Create a `.env` file in the root directory.
   - Add the following variables:

     ```
     SESSION_SECRET=your-secret-key
     MONGODB_URI=mongodb://localhost:27017/cairbnb
     ```

5. **Run the application:**

   ```bash
   npm start
   ```

6. **Access the Application:**

   Open your browser and visit [http://localhost:3000](http://localhost:3000) to see Cairbnb in action.

## Project Structure

```
cairbnb/
├── app.js                   # Main Express application file
├── models/
│   ├── listing.js           # Mongoose schema and model for property listings
│   └── review.js            # Mongoose schema and model for reviews
│   └── user.js              # Mongoose schema and model for users
├── routes/
│   ├── listing.js           # Routes for property listings
│   ├── review.js            # Routes for reviews
│   └── user.js              # Routes for user authentication
├── views/
│   ├── layouts/             # Layout templates
│   │   └── boilerplate.ejs  # Main layout file
│   ├── includes/            # Include templates
│   │   ├── navbar.ejs       # Navbar file
│   │   ├── footer.ejs       # Footer file
│   │   └── flash.ejs        # Flash file
│   ├── listings/            # Listing-related views
│   │   ├── listing.ejs      # Display all listings
│   │   ├── show.ejs         # Show a single listing
│   │   ├── new.ejs          # Create a new listing
│   │   ├── edit.ejs         # Edit an existing listing
│   │   └── error.ejs        # Error page
│   └── users/               # User-related views
│       ├── signup.ejs       # Registration form
│       └── login.ejs        # Login form
├── public/                  # Static assets (CSS, JavaScript, images)
│   ├── css/
│   │   └── style.css        # Main stylesheet
│   ├── js/
│   │   └── script.js        # Main JavaScript file
├── utils/                   # Utility functions
│   └── middleware.js        # Custom middleware functions
├── .env                     # Environment variables
└── README.md                # This file
```

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your changes.

## License

[Choose a license - e.g., MIT]
