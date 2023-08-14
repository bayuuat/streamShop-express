// import model category
const { StatusCodes } = require('http-status-codes');
const { getAllVideos, createVideos, getOneVideos, updateVideos, deleteVideos } = require('../../services/videos');

// buat function create
const create = async (req, res, next) => {
	try {
		const result = await createVideos(req);

		res.status(StatusCodes.CREATED).json({
			data: result,
		});
	} catch (err) {
		next(err);
	}
};

const index = async (req, res, next) => {
	try {
		const result = await getAllVideos(req);

		res.status(StatusCodes.OK).json({
			data: result,
			message: 'Success get videos data'
		});
	} catch (err) {
		next(err);
	}
};

const find = async (req, res, next) => {
	try {
		const result = await getOneVideos(req);

		res.status(StatusCodes.OK).json({
			data: result,
			message: 'Success finding videos data'
		});
	} catch (err) {
		next(err);
	}
};

const update = async (req, res, next) => {
	try {
		const result = await updateVideos(req);

		res.status(StatusCodes.OK).json({
			data: result,
			message: 'Success update videos data'
		});
	} catch (err) {
		next(err);
	}
};

const destroy = async (req, res, next) => {
	try {
		const result = await deleteVideos(req);

		res.status(StatusCodes.OK).json({
			data: result,
			message: 'Success delete videos data'
		});
	} catch (err) {
		next(err);
	}
};

module.exports = {
	find,
	index,
	create,
	update,
	destroy,
};
