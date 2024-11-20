const db = require("../database/index");
const getbrands = async (req, res) => {
    try {
        const lessons = await db.brands.findAll();
        console.log(lessons);

        res.send(lessons);
    } catch (error) {
        console.error("Error fetching brands:", error);
        res.status(500).send("Failed to fetch brands");
    }
};



module.exports = {

    getbrands,
   
};