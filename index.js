import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import courseRoutes from './routes/course.route.js';
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;
const MONGODB_URI = process.env.MONGODB_URI;





try {
  mongoose.connect(MONGODB_URI);
  console.log('Connected to MongoDB');
}
catch (error) {
  console.error('Error connecting to MongoDB:', error);

}

app.use(express.json());
app.use(cookieParser());


app.use("/api/user", userRoutes);
app.use("/api/course", courseRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
