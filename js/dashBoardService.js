tokenValidate();


function getUsers(){
    document.getElementById('cardHeader').innerHTML = '<h4>Listado de Usarios</h4>'
    fetch("https://reqres.in/api/users?page=1", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response) =>{
        if(response.status === 200){
            let listUser = `
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">First Name</th>
                    <th scope="col">Last Name</th>
                    <th scope="col">Avatar</th>
                    </tr>
                </thead>
                <tbody>
            `


            response.body.data.forEach(user => {
                listUser = listUser.concat(`
                <tr>
                    <td>${user.id}</td>
                    <td>${user.firts_name}</td>
                    <td>${user.last_name}</td>
                    <td><img src="${user.avatar}" alt="Avatar" class="avatar"></td>
                </tr>
                    `)
            });
            listUser = listUser.concat(`
                <tbody>
            </table>
                `)
                document.getElementById('info').innerHTML = listUser
        }else{
            document.getElementById('info')
            .innerHTML = '<h3>No se encontraron Usuarios</h3>'
        }
    })
   
}


function getProducts(){
    document.getElementById('info').innerHTML = '<h4>Lista de Productos</h4>'
    document.getElementById('info').innerHTML = ''
    fetch("https://reqres.in/api/unknow", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            'x-api-key': 'reqres-free-v1'
        }
    })
    .then((result) =>{
        return result.json().then(
            data => {
                return {
                    status: result.status,
                    body: data
                }
            }
        )
    })
    .then((response) =>{
        if(response.status === 200){
            let listProducts = `
            <table class="table">
                <thead>
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Year</th>
                    <th scope="col">Color</th>
                    <th scope="col">Pantone Value</th>
                    </tr>
                </thead>
                <tbody>
            `


            response.body.data.forEach(product => {
                listProducts = listProducts.concat(`
                <tr>
                    <td>${product.id}</td>
                    <td>${product.name}</td>
                    <td>${product.year}</td>
                    <td style="background-color:${product.color}">${product.color}</td>
                    <td>${product.pantone_value}</td>
                </tr>
                    `)
            });
            listProducts = listProducts.concat(`
                <tbody>
            </table>
                `)
                document.getElementById('info').innerHTML = listProducts
        }else{
            document.getElementById('info').innerHTML = '<h3>No se encontraron Productos</h3>'
        }
    })
}


function logout(){
    localStorage.removeItem('token')
    location.href = '../login.html'
}


function tokenValidate(){
    const TOKEN = localStorage.getItem('token')
    if (TOKEN == null){
        location.href = '../login.html'
    }
    console.log('AUTENTICADO' , TOKEN)
}