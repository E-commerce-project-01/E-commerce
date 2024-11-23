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
const deletebrand = async (req, res) => {
    const { id } = req.params; 
    try {
        const result = await db.brands.destroy({
            where: { id: id }
        });
        
        if (result) {
            res.status(200).send({ message: "Brand deleted successfully." });
        } else {
            res.status(404).send({ message: "Brand not found." });
        }
    } catch (error) {
        console.error("Error deleting brand:", error);
        res.status(500).send("Failed to delete brand");
    }
};


module.exports = {

    getbrands,deletebrand
   
};