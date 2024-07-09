import express from "express";
import cors from "cors";

const app = express();
app.use(cors())
const port = 8081;

app.get('/', (req, res) => {
    return res.json({ suggestion: "Hello from server!" });
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});