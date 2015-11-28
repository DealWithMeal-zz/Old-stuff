
	//chat div
    var chatDiv = document.getElementById('chat');
	//users div
    var usersDiv = document.getElementById('users');
	//users counter
    var userscounter = document.getElementById('usercounter');

	//last time chat was updated
    var historyLastLoaded = "";
	//last time users area was updated
    var usersLastLoaded = "";

	//buffer for the dateModified history check
    var buffH = "";
	//buffer for the dateModified users check
    var buffU = "";

    //did the loop of joined users start?
    var usersIntervaled = false;
    //did the loop of new messages check start?
    var historyIntervaled = false;

	//reports to the server that user joined
    userJoined();
	//checks and loads new history if needed
    loadHistory();
	//checks and loads userlist if needed
    loadUsers();

    //filters message by selected setting [ all, past 7 days, today ]
    //setting is done by user, selecting a radiobox on top of the chat window
    //returns message only if it fits to the filter setting
    function filterMessage(message) {

		if(message.length != "")
		{
			var i = message.indexOf("<d>") + 3;
			var date = message.substring(i, message.indexOf("</d>"));
			message = message.replace('<d>', '');
			message = message.replace('</d>', '');

			if(document.getElementById('filterall').checked) {
				return message;
			} else if(document.getElementById('filter7').checked) {
				var dateParts = date.split(".");
				var messagedate = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);

				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1;
				var yyyy = today.getFullYear();

				var timeDiff = Math.abs(today.getTime() - messagedate.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

				if(diffDays <= 7)
					return message;

			} else if(document.getElementById('filter1').checked) {
				var dateParts = date.split(".");
				var messagedate = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0]);

				var today = new Date();
				var dd = today.getDate();
				var mm = today.getMonth()+1;
				var yyyy = today.getFullYear();

				var timeDiff = Math.abs(today.getTime() - messagedate.getTime());
				var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));

				if(diffDays <= 1)
					return message;
			}
		}
	}

    window.onbeforeunload = function () {
        userLeft();
    }

	//sends message that user joined
    function userJoined() {
        $.post("writer.php", {user_joined: username + "\n"}, function (results) {
        });
    }

	//send message that user left
    function userLeft() {
        $.post("writer.php", {user_left: username + "\n"}, function (results) {
        });
    }

    function userLogOff() {
        $.post("writer.php", {user_left: username + "\n"}, function (results) {
            window.location.href = "index.php";
        });


    }

	//function for sending a message to chat and server
    function sendMessage() {
        var text = document.getElementById('messagebox').value;

        if (text != '') {
            var time = new Date();

            var MyTimeString = time.getHours() + ':'
                + ('0' + (time.getMinutes() + 1)).slice(-2);

            var MyDateString = ('0' + time.getDate()).slice(-2) + '.'
                + ('0' + (time.getMonth() + 1)).slice(-2) + '.'
                + time.getFullYear();

            var message = "";
            message += "<span class='username'>" + username + " - <d>" + MyDateString + "</d>, " + MyTimeString + "</span> <br>";
            message += "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "<span class='usermessage'>" + text + "</span><br><br>";

            chatDiv.innerHTML += message;
            document.getElementById('messagebox').value = '';

            sendMessageToServer(message + "\n");
        }

        dropScrollbar();
    }

	//send message to server
    function sendMessageToServer(params) {
        $.post("writer.php", {data: params}, function (results) {

        });
    }

	//check if file got modified and load new messages if needed
    function loadHistory() {

        if(!historyIntervaled) {
            setInterval(loadHistory, 500);
            historyIntervaled = true;
        }
		
            var xhr = $.ajax({
                url: "database.txt",
                success: function (response) {
                    window.buffH = xhr.getResponseHeader("Last-Modified");
                }
            });

            if (window.buffH != window.historyLastLoaded) {

            $.post("writer.php", {get_history: 1}, function (results) {

                chatDiv.innerHTML = "";

                var res = results.split("\n");

                for (var i = 0; i < res.length; i++) {
					if(typeof filterMessage(res[i]) != 'undefined')
						chatDiv.innerHTML += filterMessage(res[i]);
                }

				//keep the last update date
                window.historyLastLoaded = window.buffH;

                dropScrollbar();
            });
        }

    }

	//check if file got modified and load new users if needed
    function loadUsers() {

        if(!usersIntervaled)
        {
            setInterval(loadUsers, 500);
            usersIntervaled = true;
        }

        var xhr = $.ajax({
            url: "users.txt",
            success: function (response) {
                window.buffU = xhr.getResponseHeader("Last-Modified");
            }
        });

        if (window.buffU != window.usersLastLoaded) {
            $.post("writer.php", {get_users: 1}, function (results) {

                usersDiv.innerHTML = "";

                var i = 0;

                var array = results.split("\n");
                array.forEach(function (entry) {
                    if (entry != "") {
                        //if file was changed, we load new users and keep the last updated date
                        window.usersLastLoaded = window.buffU;
                        usersDiv.innerHTML += "<div class='userOnline'> <img src='graphics/usericon.gif' style='margin-right:10px; vertical-align:middle;'/>" + entry + "</div>";
                        i++;
                    }
                });

				//user counter, how many online?
                if(i > 0)
                    userscounter.innerHTML = i + ' Users logged in';
                else
                    userscounter.innerHTML = '';
            });
        }
    }

    //catch the enter key pressed
    function keyPressed(e) {
        if (e.keyCode == 13) {
            sendMessage();
            return false;
        }
    }

    //drop scoll bar when updated the chat
    function dropScrollbar() {
        chatDiv.scrollTop = chatDiv.scrollHeight;
    }
