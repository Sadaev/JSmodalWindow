function _createModal(options){
    const modal = document.createElement('div')
    modal.classList.add('smodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal-overlay">
        <div class="modal-window">
            <div class="modal-header">
                <span class="modal-title">Modal title</span>
                <span class="modal-close">&times;</span>
            </div>
            <div class="modal-body">
                <p>Lorem ipsum dolor sit.</p>
                <p>Lorem ipsum dolor sit.</p>
            </div>
            <div class="modal-footer">
                <button class="btn btn-success">Ok</button>
                <button class="btn btn-warning">Cancel</button>
            </div>
        </div>
    </div>
    `)
    document.body.appendChild(modal)
    return modal
}

/**
 * 
 * title: string
 * closable: boolean
 * content: string  (format html dinamic content)
 * width: string ('400px')
 * destroy(){}: void
 * 
 * close modal window when press on overlay or cross
 * -------------------------
 *public method for instanse setContent(html: string): void 
 dynamykacl change contain of this modal
 *public method liveCicle hooks
 *onClose() : void
 *onOpen(): void
 *beforeClose() : boolean
 *---------------
 *Animate Css animate.css
 *use library animate.css


$.modal  = function (options) {
    const ANIMATION_SPEED = 200
    const $modal = _createModal(options)
    let closing = false

    return {
        open(){
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
        destroy(){}        
    }
}