<?php
if(isset($_POST['send']))
{
	$name=$_POST['rname'];
	$username=$_POST['runame'];
	$password=$_POST['rpswd'];
	$email=$_POST['remail'];
	$flag=0;
	$con=new mysqli('localhost','root','','quizdata');
	$res=mysqli_query($con,"select username from quiz where username='$username'");
	$rese=mysqli_query($con,"select email from quiz where email='$email'");
	if(mysqli_num_rows($res)>0)
	{
		echo '<script type="text/javascript">
			  alert("username already exist!! Try another!!");
			  </script>';
		$flag=1;
	}
	else if(mysqli_num_rows($rese)>0)
	{
		echo '<script type="text/javascript">
			  alert("Email already exists");
			  </script>';
		$flag=1;
	}
	if($flag==0)
	{
		mysqli_query($con,"INSERT INTO quiz (Name,Username,Password,Email) VALUES('$name','$username','$password','$email')");
		echo '<script type="text/javascript">
			  alert("successfully registered!!");
			  </script>';
	}
}
header("Refresh:0 , url=register.html");
?>