// import model Products
const Products = require('../api/products/model');
const { checkingVideos } = require('./videos');

const { BadRequestError, NotFoundError } = require('../errors');

const getAllProducts = async (req) => {
	const { videoId } = req.query;

	let condition = {};

	if (videoId) {
		condition = { ...condition, video: videoId };
	}

	const result = await Products.find(condition)
		.select('_id link title price img');

	return result;
};

const createProducts = async (req) => {
	const { link, title, price, video } = req.body;

	const check = await checkingVideos(video);
	console.log(check);

	const result = await Products.create({ link, price, title, video });

	return result;
};

const getOneProducts = async (req) => {
	const { id } = req.params;

	const result = await Products.findOne({ _id: id })
		.populate({
			path: 'video',
			select: '_id name',
		})
		.select('_id link title video');

	if (!result) throw new NotFoundError(`Tidak ada pembicara dengan id :  ${id}`);

	return result;
};

const updateProducts = async (req) => {
	const { id } = req.params;
	const { link, title, price, video } = req.body;

	const check = await Products.findOne({
		link,
		title,
		_id: { $ne: id },
	});

	if (check) throw new BadRequestError('Sudah ada Product yang sama ');

	const result = await Products.findOneAndUpdate({ _id: id }, { link, price, title, video }, { new: true, runValidators: true });

	if (!result) throw new NotFoundError(`Tidak ada product dengan id :  ${id}`);

	return result;
};

const deleteProducts = async (req) => {
	const { id } = req.params;

	const result = await Products.findOne({
		_id: id,
	});

	if (!result) throw new NotFoundError(`Tidak ada product dengan id :  ${id}`);

	await result.remove();

	return result;
};

const checkingProducts = async (id) => {
	const result = await Products.findOne({ _id: id });

	if (!result) throw new NotFoundError(`Tidak ada product dengan id :  ${id}`);

	return result;
};

module.exports = {
	getAllProducts,
	createProducts,
	getOneProducts,
	updateProducts,
	deleteProducts,
	checkingProducts,
};
