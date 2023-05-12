const productsUrl = 'https://striveschool-api.herokuapp.com/api/product/';

window.onload = () => {
    let item = sessionStorage.getItem('prod');
    if(item){
        let buttonSave = document.getElementById('salva');
        buttonSave.classList.add('hide');
        populateFields(JSON.parse(item));

        let buttonModify = document.getElementById('modifica');
        buttonModify.onclick = () => {
            modifyProduct();
        };

        let buttonDelete = document.getElementById('cancella');
        buttonDelete.onclick = () => {
            cancella();
        };

    }else{
        let buttonModify = document.getElementById('modifica');
        buttonModify.classList.add('hide');
        let buttonDelete = document.getElementById('cancella');
        buttonDelete.classList.add('hide');

        let buttonSave = document.getElementById('salva');
        buttonSave.onclick = () => {
            saveNewProduct();
        };
    }
};

function populateFields(item){
    document.getElementById('nome').value = item.name;
    document.getElementById('brand').value = item.brand;
    document.getElementById('price').value = item.price;
    document.getElementById('description').value = item.description;
    document.getElementById('img').value = item.imageUrl;
}

class Product{
    constructor(name, brand, price, imageUrl, description){
    this.name = name;
    this.brand = brand;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    }
}

class ModifiedProduct extends Product{
    constructor(_id, name, brand, price, imageUrl, description){
        super(name, brand, price, imageUrl, description);
        this._id = _id;

    }
}

function saveNewProduct(){
    let product = new Product(   document.getElementById('nome').value,
    document.getElementById('brand').value,
    document.getElementById('price').value  ,
    document.getElementById('img').value,
    document.getElementById('description').value      
    );

    fetch(productsUrl, {
        method: 'POST',
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + sessionStorage.getItem('token')
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        if(response.ok){
            window.location = './home.html';
        }else{
            alert('Errore salvataggio prodotto');
        }
    })
    .catch(error => console.error(error));
}

function modifyProduct(){
    let item = sessionStorage.getItem('prod');
    let id = JSON.parse(item)._id;
    let product =  new Product(  
      
        document.getElementById('nome').value,
    document.getElementById('brand').value,
    document.getElementById('price').value  ,
    document.getElementById('img').value,
    document.getElementById('description').value      
    );

    fetch(productsUrl + id, {
        method: 'PUT',
        headers : {
            "Content-Type" : "application/json",
            "Authorization" : "Bearer " + sessionStorage.getItem('token')
        },
        body: JSON.stringify(product)
    })
    .then(response => {
        if(response.ok){
            window.location = './home.html';
        }else{
            alert('Errore salvataggio prodotto');
        }
    })
    .catch(error => console.error(error));
}

function cancella(){
    let item = sessionStorage.getItem('prod');
    let id = JSON.parse(item)._id;

    fetch(productsUrl + id, {
        method: 'DELETE',
        headers : {
            "Authorization" : "Bearer " + sessionStorage.getItem('token')
        }
    })
    .then(response => {
        if(response.ok){
            window.location = './home.html';
        }else{
            alert('Errore cancellazione prodotto');
        }
    })
    .catch(error => console.error(error));
}