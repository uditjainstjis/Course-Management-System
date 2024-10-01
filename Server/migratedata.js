const mongoose = require('mongoose');
const Course = require('courses');  // Import your Course model

// Connect to your MongoDB database
const dbUri = 'mongodb+srv://uditjain:u1d2i3t4@lms-cluster.s5q8x.mongodb.net/ApplicationDB';  // Replace with your MongoDB URI
mongoose.connect(dbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    migrateData();  // Call the function after successful connection
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

// Function to update all documents in the collection
async function migrateData() {
  try {
    // Apply your changes to all documents in the 'courses' collection
    const result = await Course.updateMany(
      {},  // Update all documents
      {
        $set: {
          videos: {
            thumbnails: [],  // Initialize empty arrays for thumbnails, videos, and titles
            videos: [],
            titles: []
          },
          price: "₹5000",  // Ensure other fields follow the new structure
          url: "http://localhost:3030/Web-Files/slide3.jpeg",
          about: "About this course-Starts from 21 September"
        }
      }
    );

    console.log(`${result.nModified} documents updated`);
  } catch (err) {
    console.error('Error updating documents:', err);
  } finally {
    mongoose.connection.close(); // Close the connection when done
  }
}
