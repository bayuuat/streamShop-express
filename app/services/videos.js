// import model videos
const Videos = require('../api/videos/model');

// import custom error not found dan bad request
const { NotFoundError, BadRequestError } = require('../errors');

const getAllVideos = async (req) => {
	const { name } = req.query;
	let condition = {};

	if (!!name) {
		const regex = new RegExp(name, 'i');
		condition = { ...condition, name: regex };
	}

	const result = await Videos.find(condition);

	return result;
};

const createVideos = async (req) => {
	const { name } = req.body;

	const check = await Videos.findOne({ name });

	if (check) throw new BadRequestError('video nama duplikat');

	const result = await Videos.create({
		name,
		imageThumbnail: req.file ? `uploads/${req.file.filename}` : 'uploads/default.jpg',
	});

	return result;
};

const getOneVideos = async (req) => {
	const { id } = req.params;

	const result = await Videos.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada Video dengan id :  ${id}`);

	return result;
};

const updateVideos = async (req) => {
	const { id } = req.params;
	const { name } = req.body;

	const check = await Videos.findOne({
		name,
		_id: { $ne: id },
	});

	if (check) throw new BadRequestError('video nama duplikat');

	const newFile = req.file ?? { imageThumbnail: `uploads/${req.file.filename}` };

	const result = await Videos.findOneAndUpdate({ _id: id }, { name, ...(newFile && { newFile }) }, { new: true, runValidators: true });

	if (!result) throw new NotFoundError(`Tidak ada Video dengan id :  ${id}`);

	return result;
};

const deleteVideos = async (req) => {
	const { id } = req.params;

	const result = await Videos.findByIdAndRemove(id);

	if (!result) {
		return res.status(404).json({ message: 'id video tidak ditemukan' });
	}

	return result;
};

const checkingVideos = async (id) => {
	const result = await Videos.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada Video dengan id :  ${id}`);

	return result;
};

module.exports = {
	getAllVideos,
	createVideos,
	getOneVideos,
	updateVideos,
	deleteVideos,
	checkingVideos,
};
