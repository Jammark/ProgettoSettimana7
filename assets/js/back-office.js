const productsUrl = 'https://striveschool-api.herokuapp.com/api/product/';

window.onload = () => {
    let item = sessionStorage.getItem('prod');
    if(item){
        let buttonSave = document.getElementById('salva');
        buttonSave.classList.add('hide');
        populateFields(JSON.parse(item));

        let buttonModify = document.getElementById('modifica');
        buttonModify.onclick = () => {
            if(isValidForm()){
            modifyProduct();
        }else{
            showModalForm();
        }
        };

        let buttonDelete = document.getElementById('cancella');
        buttonDelete.onclick = () => {
            document.getElementById('confirm').onclick = () => cancella();
            
        };

    }else{
        let buttonModify = document.getElementById('modifica');
        buttonModify.classList.add('hide');
        let buttonDelete = document.getElementById('cancella');
        buttonDelete.classList.add('hide');

        let buttonSave = document.getElementById('salva');
        buttonSave.onclick = () => {
            if(isValidForm()){
            saveNewProduct();
            }else{
                showModalForm();
            }
        };
    }

    let reset = document.getElementById('reset');
    reset.onclick = () => {
        document.getElementById('confirm').onclick = () => {
        document.getElementById('nome').value = '';
        document.getElementById('brand').value = '';
        document.getElementById('price').value = '';
        document.getElementById('description').value = '';
        document.getElementById('img').value = '';
        };
    };
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
            showModal('Errore salvataggio prodotto');
        }
    })
    .catch(error => {
        showModal('Errore salvataggio prodotto');
        console.error(error);
    });
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
            showModal('Errore salvataggio prodotto');
        }
    })
    .catch(error => {
        showModal('Errore salvataggio prodotto');
        console.error(error);
    });
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
            showModal('Errore cancellazione prodotto');
        }
    })
    .catch(error => {
        showModal('Errore cancellazione prodotto.');
        console.error(error);
    });
}

function isValidForm(){
    return  document.getElementById('nome').value != '' &&
    document.getElementById('brand').value != '' &&
    document.getElementById('price').value != '' &&
    document.getElementById('img').value != '' &&
    document.getElementById('description').value  != '' ;
}

function showModal(message){
    document.getElementById('message').innerText = message;
    var myModal = new bootstrap.Modal(document.getElementById('modal'));
    myModal.show();
    
}

function showModalForm(){
    var myModal = new bootstrap.Modal(document.getElementById('modalForm'));
    myModal.show();
}