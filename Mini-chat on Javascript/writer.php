<?php
//put new messages to the file
if(!empty($_POST['data'])){
	$data = $_POST['data'];
	$fname = "database.txt";
	$file = fopen($fname, 'a');
	fwrite($file, $data);
	fclose($file);
}
//put new user to the file
else if(!empty($_POST['user_joined'])){
	$fname = "users.txt";
	$handle = fopen($fname, "r");

	$pos = -1;
	$str = "";
	
	if ($handle) {
		while (($line = fgets($handle)) !== false) {
			if(($line."\n" == $_POST['user_joined']) or ($line."\n" == $_POST['user_joined']."\n") or ($line == $_POST['user_joined']."\n") or ($line == $_POST['user_joined']))
				$pos = 1;			
		}
		fclose($handle);
	}
	
	$file = fopen($fname, 'a');
	
	if($pos < 0)
	{
		fwrite($file, $_POST['user_joined']);
	}
	
	fclose($file);
}
//remove left user from the file
else if(!empty($_POST['user_left'])){
	$fname = "users.txt";
	
	$FileContent = file_get_contents($fname);
	$FileContent = str_replace($_POST['user_left'], "", $FileContent);    
	file_put_contents($fname, $FileContent);	
}
//send content of the chat file
else if(!empty($_POST['get_history']))
{
	$fname = "database.txt";
	$FileContent = file_get_contents($fname);
	
	echo($FileContent);
}
//send content of the users file
else if(!empty($_POST['get_users']))
{
	$fname = "users.txt";
	$FileContent = file_get_contents($fname);
	
	echo($FileContent);
}
?>