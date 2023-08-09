const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let commentsSchema = Schema(
	{
		username: {
			type: String,
			required: [true, 'Username harus diisi'],
		},
		comment: {
			type: String,
			required: [true, 'Comment harus diisi'],
		},
		video: {
			type: mongoose.Types.ObjectId,
			ref: 'Video',
			required: [true, 'Harus mengirim video id'],
		},
	},
	{ timestamps: true }
);

module.exports = model('Comment', commentsSchema);
