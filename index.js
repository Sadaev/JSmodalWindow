let fruits = [
    {id: 1, title: 'Яблоки', price: 20},
    {id: 2, title: 'Апельсин', price: 30},
    {id: 3, title: 'Манго', price: 40}
]


const toHtml = fruit => `
<div class="col">
    <div class="card">
    <img src="..." class="card-img-top" alt="${fruit.title}">
    <div class="card-body">
        <h5 class="card-title">${fruit.title}</h5>
        <a href="#" class="btn btn-primary" data-btn="price" data-id="${fruit.id}">Посмотреть цену</a>
        <a href="#" class="btn btn-danger" data-btn="remove"  data-id="${fruit.id}">Удалить</a>
    </div>
    </div>
</div>
`

/*
 *1. Динамичемки создавать карточки фруктов
 *2.Покозать цену в модалке (и это должна быть одна модалка) 
 *3.Модалка для удаления с 2 кнопками
 *----------------
 *4. Динамически удаление карточки. На основе плагина модуль сделать плагин $.confirm(Promise)
 **/

function render() {
    const html = fruits.map(toHtml).join('')
    document.querySelector('#fruit').innerHTML = html
}
render()
const priceModal = $.modal({
    width : '400px',
    closable : true,
    title : 'Цена на Товара',
    footerButtons: [
        {
            text: 'Закрыть', 
            type: 'primary', 
            handler(){
                priceModal.close()
            }
        }
    ]
})


document.addEventListener('click', event => {
    event.preventDefault()
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)

    if(btnType === 'price'){
        
        priceModal.setContent(`
            <p>Цена на ${fruit.title}: <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
    }else if(btnType === 'remove'){
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        })
        .then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        })
        .catch(() => {
        })
    }

    
})
