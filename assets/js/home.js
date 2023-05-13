const user = 'marco.dinicola@yahoo.it', password = 'amen123';
const loginUrl = 'https://striveschool-api.herokuapp.com/api/account/login';
const TOKEN_KEY = 'token';
const productsUrl = 'https://striveschool-api.herokuapp.com/api/product/';


var progProcess;

window.onload = () => {

    this.progProcess = setInterval(() => {
        incrementBar();
    }, 50);

        fetch(loginUrl, {
            method: "POST",
            body: JSON.stringify({
                username : user,
                password : password
            }),
            headers :{
                "Content-Type" : "application/json"
            } 
        })
        .then(response => response.json())
        .then(({access_token}) => {
            //throw new Error('errore');
            sessionStorage.setItem(TOKEN_KEY, access_token);
            setTimeout(() => fetchProducts(), 1000);
            
            })
         .catch(error => {
            showModal('Errore di autenticazione');
            console.error(error);
         });

            document.getElementById('new').onclick = () => {
                sessionStorage.removeItem('prod');
                window.location = './back-office.html';
            };

};

function fetchProducts(){
    fetch(productsUrl, {
            headers:{
                "Authorization" : `Bearer ${sessionStorage.getItem(TOKEN_KEY)}`
            }
        })
        .then(response => response.json())
        .then(products => {

            clearInterval(this.progProcess);
            this.progProcess = setInterval(() => incrementBar(), 1);

            console.log('Products');
            console.table(products);
            products.forEach(element => {
                let domEl = domElement(element);
                document.getElementById('list').appendChild(domEl);
            });

        })
        .catch(error => {
            showModal('Errore caricamento prodotti.');
            console.error(error)
        });
}

function domElement(product){
    let col = document.createElement('div');
    col.classList = 'col-12 col-md-4 col-lg-3';
    let card = document.createElement('div');
    card.classList = 'card shadow-lg h-100';
    col.appendChild(card);
    let img = document.createElement('img');
    img.src = product.imageUrl;
    img.classList = 'img-fluid card-img-top';
    card.appendChild(img);
    let body = document.createElement('div');
    body.classList = 'card-body';
    card.appendChild(body);
    let title = document.createElement('h4');
    title.classList = 'card-title fs-4 fw-bold';
    title.innerText = product.name;
    body.appendChild(title);
    let brand = document.createElement('h5');
    brand.classList = 'card-text fs-5';
    brand.innerText = product.brand;
    body.appendChild(brand);
    let description = document.createElement('p');
    description.classList = 'card-text fs-6';
    description.innerText = product.description;
    body.appendChild(description);
    let price = document.createElement('p');
    price.classList = 'card-text fs-6';
    price.innerText = "prezzo: " + product.price +"\u20AC";
    body.appendChild(price);

    let footer = document.createElement('div');
    footer.classList = 'card-footer container px-2';
    card.appendChild(footer);
    let row = document.createElement('div');
    row.classList = 'row justify-content-around gx-2';
    footer.appendChild(row);

    let btnC = document.createElement('div');
    btnC.classList = 'col-6';
    let button = document.createElement('button');
    button.classList = 'w-100 py-1';
    btnC.appendChild(button);
    button.innerText = "Scopri di più";
    row.appendChild(btnC);
    button.onclick = () =>{
        sessionStorage.setItem('detail', JSON.stringify(product));
        window.location = './dettaglio.html';
    } ;


    let btnC2 = document.createElement('div');
    btnC2.classList = 'col-6';
    let button2 = document.createElement('button');
    button2.classList = 'w-100 py-1';
    button2.innerText = "Modifica";
    btnC2.appendChild(button2);
    row.appendChild(btnC2);
    button2.onclick = () =>{
        sessionStorage.setItem('prod', JSON.stringify(product));
        window.location = './back-office.html';
    } ;
    return col;
}

function incrementBar(){
    let progressBar = document.getElementsByClassName('progress-bar')[0];
    let prog = Number(progressBar.getAttribute('aria-valuenow'));
    if(prog < 100){
        prog++;
        progressBar.setAttribute('aria-valuenow', String(prog));
        progressBar.style = `width:${prog}%`;
    }else{
     //   document.getElementsByClassName('progress')[0].style = 'display:none';
        setTimeout(()=>document.getElementsByClassName('progress')[0].style = 'display:none', 800);
        clearInterval(this.progProcess);
       
    }
}

function showModal(message){
    document.getElementById('message').innerText = message;
    var myModal = new bootstrap.Modal(document.getElementById('modal'));
    myModal.show();
}