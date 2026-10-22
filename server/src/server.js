import app  from "./app/app.js"
import connectDB from "./config/db.config.js";


const PORT = 3000;

await connectDB();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});