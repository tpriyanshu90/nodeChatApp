$(function(){
   	//make connection
	//enter the host url here
	var socket = io.connect('localhost:3000')
    //buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")
    var countTotalUsers =$("#countTotalUsers")
	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})
    socket.emit('countUsers', {countTotalUsers : countTotalUsers.text()})

    //Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>")
	})

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})

    $('#send_username').click(function(){
        $('.place-id').hide(500);
        $('.chat').show(500);
        $('.your_username').text("User : "+username.val())
    });

    //count total users
    socket.on('countUsers', (data) => {
        countTotalUsers.val('');
        countTotalUsers.append(data.countTotalUsers)
    })
    //
});


