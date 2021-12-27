let express = require("express");
let router = express.Router();
const moviesController = require('../../controllers/api/moviesController');

router.post('/', moviesController.create);
router.delete('/movies/:id', moviesController.delete);

module.exports = router;