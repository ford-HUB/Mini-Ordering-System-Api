import app from "./app.js";

const PORT = 8002
app.listen(PORT, () => {
    console.log(`Notification Service running on port ${PORT}`);
})