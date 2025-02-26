const apiUrl = 'https://crudcrud.com/api/dea6a84d5f1f4415b085e68de63cce83/products';

document.getElementById('productForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    
    const name = document.getElementById('productName').value.trim();
    const description = document.getElementById('productDescription').value.trim();
    const quantity = parseInt(document.getElementById('productQuantity').value, 10);
    
    if (!name || !description || isNaN(quantity) || quantity <= 0) {
        alert('Todos los campos deben estar completos y la cantidad debe ser mayor a 0.');
        return;
    }
    
    const product = { name, description, quantity };
    await createProduct(product);
    
    document.getElementById('productForm').reset();
});

document.getElementById('showProducts').addEventListener('click', async function() {
    const products = await getProducts();
    products.forEach(product => {
        console.log(`Nombre: ${product.name}, Cantidad: ${product.quantity}`);
    });
});

async function createProduct(product) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(product)
    });
    return response.json();
}

async function getProducts() {
    const response = await fetch(apiUrl);
    return response.json();
}