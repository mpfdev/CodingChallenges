const allPromotions = document.querySelector('.allPromos');
const newCustomers = document.querySelector('.newPromos');
const URL = "http://www.mocky.io/v2/5bc3b9cc30000012007586b7";
const list = document.querySelector('.promotion-card');


allPromotions.addEventListener('click', ev => {

    list.innerHTML = "";

    fetch(URL)
    .then(res => res.json())
    .then(data => {

        data.forEach((data, i) => {
            const cardContent = `<div class="card mt-3" id=${i}>
                <img src="${data.heroImageUrl}" class="card-img-top" alt="...">
            
                <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.description}</p>
                    <div class="options text-center">
                        <a href="#" class="btn btn-primary">${data.termsAndConditionsButtonText}</a>
                        <a href="#" class="btn btn-danger">${data.joinNowButtonText}</a>
                    </div>  
                </div>
            </div>`

        list.innerHTML += cardContent;
        })

    })
    .catch(err => console.log(err));
})

newCustomers.addEventListener('click', ev => {
    list.innerHTML = "";

    fetch(URL)
    .then(res => res.json())
    .then(data => {

        data.filter(data => data.onlyNewCustomers).forEach((data, i) => {
            const cardContent = `<div class="card mt-3" id=${i}>
                <img src="${data.heroImageUrl}" class="card-img-top" alt="...">
            
                <div class="card-body">
                <h5 class="card-title">${data.name}</h5>
                <p class="card-text">${data.description}</p>
                    <div class="options text-center">
                        <a href="#" class="btn btn-primary">${data.termsAndConditionsButtonText}</a>
                        <a href="#" class="btn btn-danger">${data.joinNowButtonText}</a>
                    </div>  
                </div>
            </div>`

        list.innerHTML += cardContent;
        });

    })
    .catch(err => console.log(err));
})