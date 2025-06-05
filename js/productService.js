function getProducts() {
    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = '<h4 class="text-center">Lista de Productos</h4>';

    fetch("https://fakestoreapi.com/products", {
        method: "GET",
        headers: {
            "Content-type": "application/json",
            "x-api-key": "reqres-free-v1"
        }
    })
    .then((result) => result.json().then(data => ({
        status: result.status,
        body: data
    })))
    .then((response) => {
        if (response.status === 200) {
            let listProducts = `
                <div class="table-responsive mt-3">
                    <table class="table table-bordered table-hover align-middle">
                        <thead class="table-dark">
                            <tr>
                                <th scope="col">ID</th>
                                <th scope="col">Título</th>
                                <th scope="col">Precio</th>
                                <th scope="col">Descripción</th>
                                <th scope="col">Categoría</th>
                                <th scope="col">Imagen</th>
                                <th scope="col">Acciones</th> <!-- Nueva columna para acciones -->
                            </tr>
                        </thead>
                        <tbody>
            `;

            response.body.forEach(product => {
                listProducts += `
                    <tr>
                        <td>${product.id}</td>
                        <td>${product.title}</td>
                        <td>$${product.price}</td>
                        <td>${product.description.substring(0, 100)}...</td>
                        <td>${product.category}</td>
                        <td><img src="${product.image}" alt="${product.title}" height="50"></td>
                        <td>
                            <button class="btn btn-primary" onclick="addToCart('${product.title}', ${product.price})">Añadir al carrito</button>
                        </td>
                    </tr>
                `;
            });

            listProducts += `
                        </tbody>
                    </table>
                </div>
            `;

            infoDiv.innerHTML += listProducts;
        } else {
            infoDiv.innerHTML = '<h3 class="text-danger">No se encontraron productos.</h3>';
        }
    })
    .catch(error => {
        infoDiv.innerHTML = `<p class="text-danger">Error al obtener los productos: ${error}</p>`;
    });
}


let cart = [];


function addToCart(productName, productPrice) {
    cart.push({ name: productName, price: productPrice });
    updateCart();
    alert(`${productName} ha sido añadido al carrito.`);
}


function removeFromCart(index) {
    cart.splice(index, 1);
    updateCart();
}


function updateCart() {
    const cartList = document.getElementById('cart');
    cartList.innerHTML = '';
    let total = 0; 

    cart.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'list-group-item d-flex justify-content-between align-items-center';
        li.textContent = `${item.name} - $${item.price}`;
        
        
        const removeButton = document.createElement('button');
        removeButton.className = 'btn btn-danger btn-sm';
        removeButton.textContent = 'Eliminar';
        removeButton.onclick = () => removeFromCart(index);
        
        li.appendChild(removeButton);
        cartList.appendChild(li);
        total += item.price; 
    });

    
    document.getElementById('total').textContent = `Total: $${total.toFixed(2)}`;
}