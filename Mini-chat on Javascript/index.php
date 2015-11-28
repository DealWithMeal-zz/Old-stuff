<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html>
<head>
    <meta charset="utf-8">
    <title>Index</title>
	
	<?php
    if(!empty($_POST['username']))  
	{  
	?> 
    <link rel="stylesheet" href="style.css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js"></script>
	<?php
	}
	?>
	<?php
    if(!empty($_POST['username']))  //pass the user name to external script
		echo '<script>var username = "'.$_POST['username'].'"; </script>';
	
	?> 
	
	<script src="script.js" defer></script>
	
</head>
<body style="background:#f3f3f4;">
    
	
	<?php
    if(!empty($_POST['username']))  
	{  

	//full access to the chat if user has logged in
	
	?> 
	
	<br><br><br>
	
	<table width="50%" height="60%" align="center" style="min-width: 720px">
		<tr>
			<td> 
				<div class="userHeaderDiv">
					<table  width="100%">
						<tr height="23px"><td width="110px"><span style="color: #92b9ee; font-size: 10pt; font-weight: bold;"><? echo $_POST['username'] ?></span></td><td width="95px"></td><td width="70px"></td><td style="float:right;"><span style="color: #ffffff; margin-right:15px;"><a href="" onclick="userLogOff();" style="text-decoration:none; color:#ffffff;"><img src="graphics/lockicon.gif" style="margin-right:10px; vertical-align:middle;"/>Log Out</a></span></td></tr>
						<tr height="30px">
							<td>
								Messages:
								<input type="radio" onclick="historyLastLoaded=''; loadHistory();" id="filterall" name="messages" checked="true" value="all"><span style="color:#000000;">All</span>
							</td>
							<td>
								<input type="radio" onclick="historyLastLoaded=''; loadHistory();" id="filter7" name="messages" value="7days"><span style="color:#000000;">Past 7 days</span>
							</td>
							<td>
								<input type="radio" onclick="historyLastLoaded=''; loadHistory();" id="filter1" name="messages" value="today"><span style="color:#000000;">Today</span>
							</td>
						</tr>
					</table>
				</div>
			</td>
			<td width="220px" height="100%" class="usersTD" rowspan="3">
				<div class="userHeaderDiv2">
					<div style="background: url('graphics/columncorner_bottomleft.gif') left bottom no-repeat; display:block; height:100%; width:100%;">
						<div style="background: url('graphics/columncorner_bottomright.gif') right bottom no-repeat; display:block; height:100%; width:100%;">
							<table width="100%" height="100%">
								<tr>
									<td  width="100%" height="20px">
										<div style="color: #92b9ee; font-size: 10pt; font-weight: bold; margin-left:15px;">Users</div>
									</td>
								</tr>
								<tr >
									<td width="100%" height="100%"> 
										<div id="users"></div>
									</td>
								</tr>
								<tr>
									<td width="100%" height="27px"><span id="usercounter" style="font-size: 9pt; color: #6e7c90; padding-left:15px;"></span></td>
								</tr>
							</table>
						</div>
					</div>
				</div>
			</td>
		</tr>
		<tr>
			<td>
				<div id='chat'></div> 
			</td>
		</tr>
		<tr height="77">
			<td class="messageBoxTD">
				<div style="background: url('graphics/columncorner_bottomleft.gif') left bottom no-repeat; display:block; height:100%; width:100%;">
					<div style="background: url('graphics/columncorner_bottomright.gif') right bottom no-repeat; display:block; height:100%; width:100%;">
						<table class="messageBoxTable">
							<tr>
								<td>
									<textarea id="messagebox" onkeypress="return keyPressed(event);"></textarea>  
								</td>
								<td width="20"></td>
								<td width="100" style="vertical-align: top;">
									<input type="submit" class="sendButton" value="Send" onclick="sendMessage();">  
								</td>
							</tr>
						</table>
					</div>
				</div>
			</td>
		</tr>
	</table>
	
	
    <?php  
	}    
	else  
	{  
    //login form if not
    ?> 
	
	
	<div style="width:365px; height:80px; display: block; position:absolute; left:50%; top:50%; margin-left:-182px; margin-top:-40px;">
		<div style="background: url('graphics/columntop_background.gif') top repeat-x; display:block; height:40px; width:365px;">
		<div style="background: url('graphics/columncorner_topright.gif') right top no-repeat; display:block; height:40px; width:365px;">
		<div style="background: url('graphics/columncorner_topleft.gif') left top no-repeat; display:block; height:40px; width:365px;">
		
		
		<div style="height:auto; width:auto; margin:0 auto; padding-top:25px; font-family: Tahoma; font-size: 10pt; color: #6e7c90;">
			<form method="post" action="index.php" name="loginform" id="loginform" style="border: none;overflow: auto;outline: none;-webkit-box-shadow: none;-moz-box-shadow: none;box-shadow: none; text-align:center;">  
					<label for="username">User name: </label><input type="text" name="username" id="username" size="22">  
					<input type="submit" name="login" id="login" value="Log in" style="width:60px;">   
			</form>
		</div>
			
		
		</div>
		</div>
		</div>
		
		
		
		<div style="background: url('graphics/columnbottom_background.gif') bottom repeat-x; display:block; height:40px; width:365px; margin-top:-5px;">
		<div style="background: url('graphics/columncorner_bottomleft.gif') left bottom no-repeat; display:block; height:40px; width:365px; margin-top:-5px;">
		<div style="background: url('graphics/columncorner_bottomright.gif') right bottom no-repeat; display:block; height:40px;  width:365px; margin-top:-5px;">
		
		</div>
		</div>
		</div>
	</div>
 
	<?php  
	}  
	?>
</body>
</html>