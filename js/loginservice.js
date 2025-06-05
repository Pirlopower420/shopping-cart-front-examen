document.getElementById("formLogin").addEventListener('submit' , function(e){
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
   login(username, password)
})

function login(username, password){
     let message = ""
     let alerType = ""
     localStorage.removeItem("token")
    fetch("https://fakestoreapi.com/auth/login",{
        method: "POST",
        headers: {
            "Content-type": "application/json",
            "x-api-key": "reqres-free-v1"
        },
        body: JSON.stringify({username, password})
    })
    .then((response) => {
        if(response.status === 200){
            alerType = "success"
            message = 'Incio de secion exitosa'
            console.log("Responde bien"+ response)
            alertBuilder(alerType,message)
            response.json().then((data)=>(
                localStorage.setItem("token", data.token)
            ))
            setTimeout(() => {
                  location.href= "admin/dashboard.html"
            }, 2000) // 2000 ms = 2 segundos 
           
        }else{
             alerType = "danger"
             message = "Nombre de usuario o contraseña incorrecta"
             alertBuilder(alerType,message)

        }
       
    })
    .catch((error) => {
        calerType = 'danger';
        message = 'Error inesperado';
        console.error(error)
        alertBuilder(alerType, message)
    })
}
   

    function alertBuilder(alerType, message){
        let alert = `
    <div class="alert alert-${alerType} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div> 
    `;
    document.getElementById("alert").innerHTML = alert
}