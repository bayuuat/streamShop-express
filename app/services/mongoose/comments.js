const Comments = require('../../api/v1/comments/model');
const { checkingVideos } = require('./videos');

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require('../../errors');

const getAllComments = async (req) => {
	const { videoId } = req.query;
	
	let condition = {};

	if (videoId) {
		condition = { ...condition, video: videoId };
	}

	const result = await Comments.find(condition)
		.select('_id username comment video createdAt');

	return result;
};

const createComments = async (req) => {
	const { username, comment, video } = req.body;

	await checkingVideos(video);

	const result = await Comments.create({
		username,
		comment,
		video,
	});

	return result;
};

const getOneComments = async (req) => {
	const { id } = req.params;

	const result = await Comments.findOne({ _id: id })
		.populate({
			path: 'video',
			select: '_id name',
		})
		.select('_id username comment video');

	if (!result) throw new NotFoundError(`Tidak ada comment dengan id :  ${id}`);

	return result;
};

const updateComments = async (req) => {
	const { id } = req.params;
	const { username, comment, video } = req.body;

	await checkingVideos(video);

	const result = await Comments.findOneAndUpdate(
		{ _id: id },
		{
			username,
			comment,
			video,
		},
		{ new: true, runValidators: true }
	);

	if (!result) throw new NotFoundError(`Tidak ada comment dengan id :  ${id}`);

	return result;
};

const deleteComments = async (req) => {
	const { id } = req.params;

	const result = await Comments.findOne({
		_id: id,
	});

	if (!result) throw new NotFoundError(`Tidak ada comment dengan id :  ${id}`);

	await result.remove();

	return result;
};

module.exports = {
	getAllComments,
	createComments,
	getOneComments,
	updateComments,
	deleteComments,
};
