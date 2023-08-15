const socketIo = require('socket.io');
const { createComments } = require('./comments');

function initializeSocket(server) {
	const io = socketIo(server, {
		cors: {
			origin: 'https://stream-shop.vercel.app', // Replace with your React app's URL
			methods: ['GET', 'POST'],
		},
	});

	io.on('connection', (socket) => {
		socket.on('loadComment', (id) => {
			socket.join(id);
		});

		socket.on('newComment', async (data) => {
			try {
				const result = await createComments(data);
				if (result) {
					io.to(data.body.video).emit('newComment', result);
				}
			} catch (e) {
				console.error(e);
			}
		});
	});

	return io;
}

module.exports = initializeSocket;
