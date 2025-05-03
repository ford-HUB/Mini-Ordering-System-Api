import app from "./app.js";

const PORT = 8000

app.listen(PORT, () => {
    console.log(`Inventory Service running on port ${PORT}`);
});