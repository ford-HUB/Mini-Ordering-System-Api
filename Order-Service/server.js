import app from "./app.js";

const PORT = 8003
app.listen(PORT, () => {
    console.log(`Order Service running on port ${PORT}`);
});