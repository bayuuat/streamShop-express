const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let productSchema = Schema(
	{
		link: {
			type: String,
			required: [true, 'Link Product harus diisi'],
		},
		title: {
			type: String,
			required: [true, 'Title Product harus diisi'],
		},
		price: {
			type: Number,
			required: [true, 'Harga Product harus diisi'],
		},
		video: {
			type: mongoose.Types.ObjectId,
			ref: 'Video',
			required: true,
		},
	},
	{ timestamps: true }
);

module.exports = model('Product', productSchema);
