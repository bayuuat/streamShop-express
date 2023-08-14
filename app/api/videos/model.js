const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let videoSchema = Schema(
	{
		name: {
			type: String,
			required: [true, 'Nama harus diisi'],
		},
		imageThumbnail: {
			type: String,
			required: [true, 'Harus memiliki thumbnail'],
		},
		videoLink: {
			type: String,
			required: [true, 'Harus memiliki link vide'],
		},
	},
	{ timestamps: true }
);

module.exports = model('Video', videoSchema);
