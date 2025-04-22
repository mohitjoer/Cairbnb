# Cairbnb – An Airbnb Clone

**Cairbnb** is a full-featured web application inspired by Airbnb. It allows users to **list**, **search**, and **book** accommodations. Whether you're a traveler or a host, Cairbnb offers a seamless platform built with **Node.js**, **Express**, and **MongoDB**.

🔗 **Live Website:** [https://cairbnb-project.onrender.com/listings](https://cairbnb-project.onrender.com/listings)

---

## 🚀 Features

- 🏠 **Property Listings:** Add and browse detailed listings with images and prices.
- 👤 **User Authentication:** Register and log in securely using Passport.js.
- 📅 **Booking System:** Reserve listings for specific dates.
- ✍️ **Reviews & Ratings:** Users can leave feedback for listings.
- 🔎 **Search & Filters:** Easily find places by price, location, and more.
- 📱 **Responsive Design:** Looks great on mobile, tablet, and desktop.

---

## 🛠 Tech Stack

### Backend
- **Node.js** – Runtime environment
- **Express.js** – Server framework
- **MongoDB** & **Mongoose** – Database and ODM
- **Passport.js** – Authentication

### Frontend
- **EJS** – Templating engine
- **Bootstrap** – Responsive UI framework
- **Custom CSS** – Styling

---

## ⚙️ Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/mohitjoer/Cairbnb.git
   cd Cairbnb
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the root:

   ```env
   SESSION_SECRET=your-secret-key
   MONGODB_URI=mongodb://localhost:27017/cairbnb
   ```

4. **Run MongoDB locally** or use a MongoDB cloud provider like Atlas.

5. **Start the server**

   ```bash
   npm start
   ```

6. **View the app**

   Visit [http://localhost:3000](http://localhost:3000)

---

## 📁 Project Structure

```
Cairbnb/
├── app.js                  # Main Express app
├── cloudconfig.js          # Cloudinary setup
├── controllers/            # Request handlers
├── init/                   # Initial setup (e.g., DB seeding)
├── middleware.js           # Custom middleware
├── models/                 # Mongoose models (Listing, User, Review)
├── public/                 # Static files (CSS, JS, Images)
├── routes/                 # Route files
├── schema.js               # Joi schemas for validation
├── utils/                  # Utility functions
├── views/                  # EJS templates
│   ├── listings/
│   ├── users/
│   ├── partials/
│   └── ...
├── package.json            # Project metadata
└── README.md               # Project documentation
```

> 🛑 **Note:** Files ignored by `.gitignore` (like `node_modules`, `.env`, etc.) are excluded from the structure.

---

## 🤝 Contributing

We welcome contributions! To contribute:

1. Fork the repository.
2. Create your branch:

   ```bash
   git checkout -b feature/YourFeature
   ```

3. Commit your changes and push:

   ```bash
   git commit -m "Add: your feature"
   git push origin feature/YourFeature
   ```

4. Open a Pull Request.

---

## 📄 License

This project is open-source. License details coming soon.

---

### 👨‍💻 Made by [Mohit Joe .R](https://github.com/mohitjoer)
