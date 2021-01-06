export class trafficLightElement extends HTMLElement {
    // コンストラクタ
    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = `
        <canvas id="canvas" width=120 height=50></canvas>
        `;
        this.context = null;
    }
    // 読み込み時
    connectedCallback() {
        this.context = this.shadowRoot.getElementById('canvas').getContext('2d');
        this.draw(0);
        this.target = 0;
    }
    // getter
    get target() {
        return parseInt(this.getAttribute('target'));
    }
    
    // setter
    set target(value) {
        this.setAttribute('target', value);
    }

    // 購読
    static get observedAttributes() {
        return ['target'];
    }

    // 監視イベント
    attributeChangedCallback(name, oldValue, newValue) {
        if(name =='target'){
            this.draw(parseInt(newValue));
        }
    }

    // 描画
    draw(target) {
        this.context.clearRect(0, 0, 120, 50);
        this.context.beginPath () ;
        this.context.rect( 0, 0, 120, 50 )
        this.context.fillStyle = "rgba(0,0,0,1)" ;
        this.context.fill() ;


        this.context.beginPath () ;
        this.context.arc( 30, 25, 10, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
        this.context.fillStyle = target === 1 ?  "rgba(0,0,255,1)" :"rgba(0,0,255,0.3)" ;
        this.context.fill() ;
        
        this.context.beginPath () ;
        this.context.arc( 60, 25, 10, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
        this.context.fillStyle = target === 2 ?  "rgba(255,255,0,1)" :"rgba(255,255,0,0.3)" ;
        this.context.fill() ;

        this.context.beginPath () ;
        this.context.arc( 90, 25, 10, 0 * Math.PI / 180, 360 * Math.PI / 180, false ) ;
        this.context.fillStyle = target === 3 ?  "rgba(255,0,0,1)" :"rgba(255,0,0,0.3)" ;
        this.context.fill() ;
    }
}
customElements.define('traffic-light-elem', trafficLightElement);