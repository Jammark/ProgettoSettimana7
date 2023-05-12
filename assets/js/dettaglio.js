const productsUrl = 'https://striveschool-api.herokuapp.com/api/product/';



window.onload = () => {
    let item = sessionStorage.getItem('detail');
    if(item){
        let product = JSON.parse(item);
        console.log(product._id);
        console.log(product.name);
        fetch(`${productsUrl}${product._id}`, {
            headers: {
                "Authorization" : "Bearer "+ sessionStorage.getItem('token')
            }
        })
        .then(response => response.json())
        .then(item => {
            domElement(item);
        })
        .catch(error => console.error(error))
      
    }else{
        alert('Errore caricamento prodotto');
    }
};

function domElement(product){
    
    let img = document.getElementById('img');
    img.src = product.imageUrl;
    
 
    let title = document.getElementById('nome');
   
    title.innerText = product.name;
   
    let brand = document.getElementById('brand');
   
    brand.innerText = product.brand;
   
    let description = document.getElementById('desc');
   
    description.innerText = product.description;
  
    let price = document.getElementById('prezzo');
    
    price.innerText = "prezzo: " + product.price +"\u20AC";
    

   
    
}