const db = require("../../database/models");
const getUrl = (req) => {
	return `${req.protocol}://${req.get("host")}${req.originalUrl}`
}

module.exports = {
	list: (req, res) => {
		db.Genre.findAll({
			include: [{
				association: "movies"
			}]
		})
		.then((genres) => {
			return res.json({
				meta: {
					endpoint: getUrl(req),
					status: 200,
					total: genres.length
				},
				data: genres
			})
		}).catch(errors => console.log(errors));
	},
	detail: (req, res) => {
		db.Genre.findByPk(req.params.id)
        .then(genre => {
            return res.status(200).json ({
            	meta: {
					endpoint: getUrl(req),
					status: 200
				},
				data: genre
            })
        }).catch(errors => console.log(errors));
	}
}