function validate()
{
var rnamev=document.forms[0].rname.value;
var runamev=document.forms[0].runame.value;
var rpswdv=document.forms[0].rpswd.value;
var rcpswdv=document.forms[0].rcpswd.value;
var remailv=document.forms[0].remail.value;
var rnamereg=/[a-z A-Z]*/;
var runamereg=/[a-zA-Z][a-zA-Z0-9]*/;
var remailreg=/[a-zA-Z][a-zA-Z0-9_.]*@[a-zA-Z][a-zA-Z0-9_.]*.[a-zA-Z][azA-Z0-9_.]{2}.[a-zA-Z][a-zA-Z0-9_.]{2}$|^[a-zA-Z][a-zA-Z0-9_.]*@[a-zA-Z][a-zA-Z0-9_.]*.[a-zAZ][a-zA-Z0-9_.]{3}/;
var rnamer=rnamereg.test(rnamev);
var runamer=runamereg.test(runamev);
var remailr=remailreg.test(remailv);
if(rnamer && runamer && remailr && (rpswdv.length >= 6) && (rpswdv==rcpswdv))
{
return true;
}
else
{
if(!rnamer) { 
alert("Name invalid");
document.forms[0].rname.focus();
}

if(!runamer) { 
alert("username invalid");
document.forms[0].runame.focus();
}

if(rpswdv.length < 6) { 
alert("password invalid");
document.forms[0].rpswd.focus();
}

if(!remailr) { 
alert("Email invalid");	
document.forms[0].remail.focus();
}

if(rpswdv!=rcpswdv)
{
alert("Passwords didnot match");
document.forms[0].rcpswd.focus();
}
return false;
}
}