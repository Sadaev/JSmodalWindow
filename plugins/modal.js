Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

function _createModalFooter(buttons = []){
    if(buttons.length === 0){
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
        const $btn = document.createElement('button')
        $btn.textContent = btn.text
        $btn.classList.add('btn')
        $btn.classList.add(`btn-${btn.type || 'secondary'}`)
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}




function _createModal({title = 'Modal', closable = true, content = '', width = '600px', footerButtons}){
    const modal = document.createElement('div')
    modal.classList.add('smodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay" data-close = "true">
        <div class="modal-window" style ="width: ${width} !important">
            <div class="modal-header">
                <span class="modal-title">${title}</span>
                ${closable ? `<span class="modal-close" data-close = "true">&times;</span>` : ``}
            </div>
            <div class="modal-body" data-content>
                ${content}
            </div>
        </div>
    </div>
    `)
    const footer = _createModalFooter(footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}

/**
 * 
 * title: string+
 * closable: boolean+
 * content: string  (format html dinamic content)+
 * width: string ('400px')+
 * destroy(){}: void+
 * 
 * close modal window when press on overlay or cross+
 * -------------------------
 *public method for instanse setContent(html: string): void +
 *
 dynamykacl change contain of this modal
 *public method liveCicle hooks:
 *onClose() : void
 *onOpen(): void
 *beforeClose() : boolean
 *--------------------------
 *Animate Css animate.css
 *use library animate.css
*/

$.modal  = function (options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false
    let destroyed = false

    const modal = {
        open(){
            if(destroyed){
                return console.log('Modal is destroyed')
            }
            !closing && $modal.classList.add('open')
        },
        close(){
            closeing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
            }, ANIMATION_SPEED)
        },
    }

    const listener = event => {
        if(event.target.dataset.close){
            modal.close()
        }
    }

    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal) // delete in html
            $modal.removeEventListener('click', listener) // delet listeneres befor safe listener in cach
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}