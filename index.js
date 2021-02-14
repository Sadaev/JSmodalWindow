const fruits = [
    {id: 1, title: 'Яблоки', price: 20},
    {id: 2, title: 'Апельсин', price: 30},
    {id: 3, title: 'Манго', price: 40}
]
/*
 *1. Динамичемки создавать карточки фруктов
 *2.Покозать цену в модалке (и это должна быть одна модалка) 
 *3.Модалка для удаления с 2 кнопками
 *----------------
 *4. Динамически удаление карточки. На основе плагина модуль сделать плагин $.confirm(Promise)
 **/
const modal = $.modal({
    width : '400px',
    closable : true,
    title : 'Sadaev Modal',
    content : `
        <h4>Modal is workin</h4>
        <p>This is body by mo</p>
        <p>This is body by mo</p>
    `,
    footerButtons: [
        {
            text: 'Ok', 
            type: 'primary', 
            handler(){
                console.log('Primery btn clicked');
                modal.close()
            }
        },
        {
            text: 'Cancel', 
            type: 'danger', 
            handler(){
            console.log('Danger btn clicked');
            modal.close()
            }
        }
    ]
})
