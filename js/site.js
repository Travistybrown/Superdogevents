function displayMessage(){
  
    let msg =  document.getElementById("message").value;


    //alert(msg);

    swal.fire(
        {
            backdrop: false,
            title: 'App Name',
            text: msg,
        }

    )
}

