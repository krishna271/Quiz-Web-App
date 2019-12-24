<?php
if(isset($_POST['sign']))
{
	$username=$_POST['luname'];
	$password=$_POST['lpswd'];
	$con=new mysqli('localhost','root','','quizdata');
	$res=mysqli_query($con,"select * from quiz where username='$username' and password='$password'");
	if(mysqli_num_rows($res)>0)
	{
		session_start();
		header('refresh:0 , url=quizhome.html');
	}
	else
	{
		echo '<script type="text/javascript">
			  alert("Invalid login credentials!!")
			  </script>';
		header('refresh:0 , url=homepage.html');
	}
}
?>