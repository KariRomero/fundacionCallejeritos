const {adoptarController, deleteAdoptarController} = require('../controllers/adoptarControllers')

const adoptarHandler = async (req, res) => {
  const { userId, adopcionId } = req.body;

  try {
    const result = await adoptarController(userId, adopcionId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const deleteAdoptarHandler = async (req,res)=>{
  const { userId, adopcionId } = req.body;

  try {
    const result = await deleteAdoptarController(userId, adopcionId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

}
module.exports = {adoptarHandler,deleteAdoptarHandler};  