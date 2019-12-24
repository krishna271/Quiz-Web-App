<?php
if(isset($_POST['signo']))
{
	session_destroy();
	header('location:homepage.html');
}
?>