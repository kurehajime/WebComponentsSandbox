(()=>{"use strict";class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n        <canvas id="canvas" width=120 height=50></canvas>\n        ',this.context=null}connectedCallback(){this.context=this.shadowRoot.getElementById("canvas").getContext("2d"),this.draw(0),this.target=0}get target(){return parseInt(this.getAttribute("target"))}set target(t){this.setAttribute("target",t)}static get observedAttributes(){return["target"]}attributeChangedCallback(t,e,s){"target"==t&&this.draw(parseInt(s))}draw(t){this.context.clearRect(0,0,120,50),this.context.beginPath(),this.context.rect(0,0,120,50),this.context.fillStyle="rgba(0,0,0,1)",this.context.fill(),this.context.beginPath(),this.context.arc(30,25,10,0*Math.PI/180,360*Math.PI/180,!1),this.context.fillStyle=1===t?"rgba(0,0,255,1)":"rgba(0,0,255,0.3)",this.context.fill(),this.context.beginPath(),this.context.arc(60,25,10,0*Math.PI/180,360*Math.PI/180,!1),this.context.fillStyle=2===t?"rgba(255,255,0,1)":"rgba(255,255,0,0.3)",this.context.fill(),this.context.beginPath(),this.context.arc(90,25,10,0*Math.PI/180,360*Math.PI/180,!1),this.context.fillStyle=3===t?"rgba(255,0,0,1)":"rgba(255,0,0,0.3)",this.context.fill()}}customElements.define("traffic-light-elem",t);class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`\n        <canvas id="canvas" width=${this.width} height=${this.height}></canvas>\n        <style>\n        #canvas {\n             border: solid 3px #000; \n             user-select: none;\n            }\n        </style>\n        `,this.width(500),this.height(500),this.context=null,this.canvasArray=[],this.prevPoint=null,this.startPoint=null,this.clickCount=0,this.distance=0}connectedCallback(){this.context=this.shadowRoot.getElementById("canvas").getContext("2d"),"ontouchstart"in window?(this.shadowRoot.getElementById("canvas").addEventListener("touchstart",(t=>this.mouseDown(t))),this.shadowRoot.getElementById("canvas").addEventListener("touchmove",(t=>this.mouseMove(t))),this.shadowRoot.getElementById("canvas").addEventListener("touchend",(t=>this.mouseUp(t)))):(this.shadowRoot.getElementById("canvas").addEventListener("mousedown",(t=>this.mouseDown(t))),this.shadowRoot.getElementById("canvas").addEventListener("mousemove",(t=>{1===t.buttons&&this.mouseMove(t)})),this.shadowRoot.getElementById("canvas").addEventListener("mouseup",(t=>this.mouseUp(t)))),this.draw()}static get observedAttributes(){return["width","height"]}attributeChangedCallback(t,e,s){switch(t){case"width":this.shadowRoot.getElementById("canvas").width=s;break;case"height":this.shadowRoot.getElementById("canvas").height=s}this.draw()}get width(){return parseInt(this.getAttribute("width"))}set width(t){this.setAttribute("width",t)}get height(){return parseInt(this.getAttribute("height"))}set height(t){this.setAttribute("height",t)}get value(){return parseInt(this.getAttribute("value"))}set value(t){this.setAttribute("value",t)}draw(){if(null!==this.context){this.context.clearRect(0,0,this.width,this.height);for(let t=0;t<this.canvasArray.length;t++)this.context.drawImage(this.canvasArray[t],0,0,this.width,this.height)}}drawLine(t,e,s){null!==this.context&&(t.fillStyle="rgba(0,0,0,1)",t.strokeStyle="rgba(0,0,0,1)",t.beginPath(),null==this.prevPoint?(t.arc(e,s,2,0*Math.PI/180,360*Math.PI/180,!1),t.fill()):(t.lineWidth=3,t.moveTo(this.prevPoint.x,this.prevPoint.y),t.lineTo(e,s),t.stroke()))}mouseUp(t){let e=this.getMousePosition(t),s=this.value;this.drawLine(this.canvasArray[this.canvasArray.length-1].getContext("2d"),e.x,e.y),this.draw(),this.prevPoint=null;let i=this.getDistance(e,this.startPoint);this.distance=Math.max(i,this.distance),this.distance<7?1==this.clickCount?(this.canvasArray.pop(),this.canvasArray.pop(),this.draw(),this.clickCount=0):(this.canvasArray.pop(),this.draw(),this.clickCount+=1):this.clickCount=0,this.distance=0,this.value=this.canvasArray.length,this.dispatchEvent(new CustomEvent("change",{detail:{oldValue:isNaN(s)?0:s,newValue:this.value}}))}mouseMove(t){let e=this.getMousePosition(t);this.drawLine(this.canvasArray[this.canvasArray.length-1].getContext("2d"),e.x,e.y),this.draw();let s=this.getDistance(e,this.startPoint);this.distance=Math.max(s,this.distance),this.prevPoint=e}mouseDown(t){let e=this.getMousePosition(t),s=document.createElement("canvas");s.width=this.width,s.height=this.height,this.canvasArray.push(s),this.draw(),this.startPoint=e}getMousePosition(t){if(null==t)return;t.clientX||(t=t.touches||t.touches?t.touches[0]:event.touches[0]);let e=t.target.getBoundingClientRect();return new s(t.clientX-e.left,t.clientY-e.top)}getDistance(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}}class s{constructor(t,e){this.x=t,this.y=e}}function i(t){document.getElementById("traffic_light1").setAttribute("target",t),document.getElementById("traffic_light2").setAttribute("target",t),document.getElementById("traffic_light3").setAttribute("target",t)}customElements.define("input-tally",e),document.addEventListener("DOMContentLoaded",(function(){document.getElementById("button_b").addEventListener("click",(t=>{i(1)})),document.getElementById("button_y").addEventListener("click",(t=>{i(2)})),document.getElementById("button_r").addEventListener("click",(t=>{i(3)})),document.getElementById("tally").addEventListener("change",(t=>{document.getElementById("result").value=t.detail.newValue}))}))})();