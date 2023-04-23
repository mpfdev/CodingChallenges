const simulate = document.querySelector('#simulate');
const URL = "http://api.mathjs.org/v4/";


simulate.addEventListener('submit', e => {
    e.preventDefault();

    const user = getUser();

    console.log(user);

    postForm(user);
})


function getUser() {
    const userName = document.querySelector('#formName').value;
    const userPay = Number(document.querySelector('#formMensal').value);
    const userDuration = Number(document.querySelector('#formDuration').value);

    const user = {
        name: userName,
        mensal: userPay,
        tempo: userDuration
    }
    return user;
}

function cleanForm() {
    document.querySelector('#formName').value = "";
    document.querySelector('#formMensal').value = "";
    document.querySelector('#formDuration').value = 1;
}

async function postForm(user) {

    try {

        const res = await fetch(URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "expr": [`${user.mensal} * (((1 + 0.00517) ^ (${user.tempo} * 12) - 1) / 0.00517)`]
            }),
        });

        const data = await res.json();

        renderHTMLPost(user, data);

    } catch (error) {
        console.error(error);
    }
}

function renderHTMLPost(user, data) {
    document.querySelector('.main').innerHTML = "";

    const content = `
        <div class="p-3">
            <p class="fs-3">Olá ${user.name} juntando R$ ${Number(user.mensal).toFixed(2)} todo mês, você terá R$${Number(data.result).toFixed(2)} em ${user.tempo} anos.</p>
        </div>
        <div class="d-grid col-8 mx-auto">
            <a href="/index.html" class="btn btn-primary" >Simular novamente</a>
        </div>
        
    `
    document.querySelector('.main').innerHTML += content;
}