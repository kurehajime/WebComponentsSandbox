export class InputTally extends HTMLElement {

    constructor() {
        super();
        this.attachShadow({
            mode: 'open'
        });
        this.shadowRoot.innerHTML = `
        <canvas id="canvas" width=${this.width} height=${this.height}></canvas>
        <style>
        #canvas {
             border: solid 3px #000; 
             user-select: none;
            }
        </style>
        `;
        this.context = null;
        this.canvasArray = [];
        this.prevPoint = null;
        this.startPoint = null;
        this.clickCount = 0;
        this.distance = 0;
    }

    //#region WebCompornents Methods

    // 読み込み時
    connectedCallback() {
        this.context = this.shadowRoot.getElementById('canvas').getContext('2d');
        if ('ontouchstart' in window) {
            this.shadowRoot.getElementById('canvas').addEventListener('touchstart', (e) => this.mouseDown(e));
            this.shadowRoot.getElementById('canvas').addEventListener('touchmove', (e) => this.mouseMove(e));
            this.shadowRoot.getElementById('canvas').addEventListener('touchend', (e) => this.mouseUp(e));
        } else {
            this.shadowRoot.getElementById('canvas').addEventListener('mousedown', (e) => this.mouseDown(e));
            this.shadowRoot.getElementById('canvas').addEventListener('mousemove', (e) => {
                if (e.buttons === 1) { this.mouseMove(e) }
            });
            this.shadowRoot.getElementById('canvas').addEventListener('mouseup', (e) => this.mouseUp(e));
        }
        this.draw();
    }

    // 購読
    static get observedAttributes() {

        return ['width', 'height'];
    }

    // 監視イベント
    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case "width":
                this.shadowRoot.getElementById('canvas').width = newValue;
                break;
            case "height":
                this.shadowRoot.getElementById('canvas').height = newValue;
                break;
            default:
                break;
        }
        this.draw();
    }

    //#endregion

    // #region Props

    // width
    get width() {
        return parseInt(this.getAttribute('width'));
    }
    set width(value) {
        this.setAttribute('width', value);
    }

    // height
    get height() {
        return parseInt(this.getAttribute('height'));
    }
    set height(value) {
        this.setAttribute('height', value);
    }

    // value
    get value() {
        return parseInt(this.getAttribute('value'));
    }
    set value(_value) {
        this.setAttribute('value', _value);
    }

    // #endregion

    //#region Draws

    // 描画
    draw() {
        if (this.context === null) {
            return;
        }
        this.context.clearRect(0, 0, this.width, this.height);
        for (let i = 0; i < this.canvasArray.length; i++) {
            this.context.drawImage(this.canvasArray[i], 0, 0, this.width, this.height);
        }
    }

    // 線を描画
    drawLine(context, x, y) {
        if (this.context === null) {
            return;
        }

        context.fillStyle = "rgba(0,0,0,1)";
        context.strokeStyle = "rgba(0,0,0,1)";
        context.beginPath();
        if (this.prevPoint == null) {
            context.arc(x, y, 2, 0 * Math.PI / 180, 360 * Math.PI / 180, false);
            context.fill();
        } else {
            context.lineWidth = 3;
            context.moveTo(this.prevPoint.x, this.prevPoint.y);
            context.lineTo(x, y);
            context.stroke();
        }

    }

    //#endregion

    // #region Events

    mouseUp(e) {
        let point = this.getMousePosition(e);
        let oldValue = this.value;
        this.drawLine(this.canvasArray[this.canvasArray.length - 1].getContext('2d'), point.x, point.y);
        this.draw();
        this.prevPoint = null;
        let _distance = this.getDistance(point, this.startPoint)
        this.distance = Math.max(_distance, this.distance);
        if (this.distance < 7) {
            if (this.clickCount == 1) {
                this.canvasArray.pop();
                this.canvasArray.pop();
                this.draw();
                this.clickCount = 0;
            } else {
                this.canvasArray.pop();
                this.draw();
                this.clickCount += 1;
            }
        } else {
            this.clickCount = 0;
        }
        this.distance = 0;
        this.value = this.canvasArray.length;
        this.dispatchEvent(new CustomEvent("change", {
            detail: {
                oldValue: isNaN(oldValue) ? 0 : oldValue,
                newValue: this.value
            }
        }));
    }
    mouseMove(e) {
        let point = this.getMousePosition(e);
        this.drawLine(this.canvasArray[this.canvasArray.length - 1].getContext('2d'), point.x, point.y);
        this.draw();
        let _distance = this.getDistance(point, this.startPoint)
        this.distance = Math.max(_distance, this.distance);
        this.prevPoint = point;
    }

    mouseDown(e) {
        let point = this.getMousePosition(e);
        let canvas = document.createElement('canvas');
        canvas.width = this.width;
        canvas.height = this.height;
        this.canvasArray.push(canvas);
        this.draw();
        this.startPoint = point;
    }

    // #endregion

    //#region Utils

    // マウス位置取得
    getMousePosition(e) {
        if (e == null) {
            return;
        }
        if (!e.clientX) { // SmartPhone
            if (e.touches) {
                e = e.touches[0];
            } else if (e.touches) {
                e = e.touches[0];
            } else {
                e = (event).touches[0];
            }
        }
        let rect = e.target.getBoundingClientRect();
        return new Point(e.clientX - rect.left, e.clientY - rect.top);
    }

    // 距離を測る
    getDistance(p1, p2) {
        return Math.sqrt(Math.pow(p1.x - p2.x, 2) + Math.pow(p1.y - p2.y, 2));
    }

    //#endregion

}

class Point {
    constructor(_x, _y) {
        this.x = _x;
        this.y = _y;
    }
}

customElements.define('input-tally', InputTally);