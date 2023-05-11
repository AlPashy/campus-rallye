function myFunction() {
    let un = document.forms["myForm"]["Uname"].value;
    let pw = document.forms["myForm"]["Pass"].value;

    if(un == "student" && pw == "1234") {
      window.location .href = "index.html" 
    }
    else {
        alert("Invalid Username and Password");
    }
}