const db = require("../../database/models");
const getUrl = (req) => {
	return `${req.protocol}://${req.get("host")}${req.originalUrl}`
}

module.exports = {
	create: (req, res) => {
		const {
			title,
			rating,
			awards,
			release_date,
			length,
			genre_id
		} = req.body;

		db.Movie.create({
			title,
			rating,
			awards,
			release_date,
			length,
			genre_id
		})
		.then(movie => {
            res.status(201).json ({
            	meta: {
					endpoint: getUrl(req),
					msg: "La pelicula fue agregada exitosamente"
				},
				data: movie
            })
        }).catch(errors => console.log(errors));
	},
	delete: (req, res) => {
		db.Movie.delete({
			where: {
				id: req.params.id
			}
		})
        .then(movie => {
            return res.status(200).json ({
            	meta: {
					endpoint: getUrl(req),
					msg: "La pelicula fue eliminada exitosamente"
				},
				data: movie
            })
        }).catch(errors => console.log(errors));
	}
}