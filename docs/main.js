(()=>{"use strict";class t extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML='\n        <canvas id="canvas" width=120 height=50></canvas>\n        ',this.context=null}connectedCallback(){this.context=this.shadowRoot.getElementById("canvas").getContext("2d"),this.draw(0),this.target=0}get target(){return parseInt(this.getAttribute("target"))}set target(t){this.setAttribute("target",t)}static get observedAttributes(){return["target"]}attributeChangedCallback(t,e,i){"target"==t&&this.draw(parseInt(i))}draw(t){this.context.clearRect(0,0,120,50),this.context.beginPath(),this.context.rect(0,0,120,50),this.context.fillStyle="rgba(0,0,0,1)",this.context.fill(),this.context.beginPath(),this.context.arc(30,25,10,0*Math.PI/180,360*Math.PI/180,!1),this.context.fillStyle=1===t?"rgba(0,0,255,1)":"rgba(0,0,255,0.3)",this.context.fill(),this.context.beginPath(),this.context.arc(60,25,10,0*Math.PI/180,360*Math.PI/180,!1),this.context.fillStyle=2===t?"rgba(255,255,0,1)":"rgba(255,255,0,0.3)",this.context.fill(),this.context.beginPath(),this.context.arc(90,25,10,0*Math.PI/180,360*Math.PI/180,!1),this.context.fillStyle=3===t?"rgba(255,0,0,1)":"rgba(255,0,0,0.3)",this.context.fill()}}customElements.define("traffic-light-elem",t);class e extends HTMLElement{constructor(){super(),this.attachShadow({mode:"open"}),this.shadowRoot.innerHTML=`\n        <style>\n        :host{\n            border: solid 1px #888888; \n            display: inline-block;\n            vertical-align: bottom;\n            font-size: 0; \n        }\n        #canvas { \n             user-select: none;\n             touch-action: none ;\n        }\n        </style>\n        <canvas id="canvas" width=${this.width} height=${this.height}></canvas>\n        `,this.canvas=null,this.context=null,this.canvasArray=[],this.prevPoint=null,this.startPoint=null,this.clickCount=0,this.distance=0,this.color=this.color?this.color:"#000000"}connectedCallback(){this.canvas=this.shadowRoot.getElementById("canvas"),this.context=this.canvas.getContext("2d"),"ontouchstart"in window?(this.canvas.addEventListener("touchstart",(t=>{this.mouseDown(t),t.preventDefault()}),{passive:!1}),this.canvas.addEventListener("touchmove",(t=>{this.mouseMove(t),t.preventDefault()}),{passive:!1}),this.canvas.addEventListener("touchend",(t=>{this.mouseUp(t),t.preventDefault()}),{passive:!1})):(this.canvas.addEventListener("mousedown",(t=>this.mouseDown(t))),this.canvas.addEventListener("mousemove",(t=>{1===t.buttons&&this.mouseMove(t)})),this.canvas.addEventListener("mouseup",(t=>this.mouseUp(t)))),this.draw()}static get observedAttributes(){return["width","height","color"]}attributeChangedCallback(t,e,i){switch(t){case"width":this.shadowRoot.getElementById("canvas").width=i;break;case"height":this.shadowRoot.getElementById("canvas").height=i}this.draw()}get width(){return parseInt(this.getAttribute("width"))}set width(t){this.setAttribute("width",t)}get height(){return parseInt(this.getAttribute("height"))}set height(t){this.setAttribute("height",t)}get value(){return parseInt(this.getAttribute("value"))}set value(t){this.setAttribute("value",t)}get color(){return this.getAttribute("color")}set color(t){this.setAttribute("color",t)}draw(){if(null!==this.context){this.context.clearRect(0,0,this.width,this.height);for(let t=0;t<this.canvasArray.length;t++)this.context.drawImage(this.canvasArray[t],0,0,this.width,this.height)}}drawLine(t,e,i){null!==this.context&&(t.fillStyle=this.color,t.strokeStyle=this.color,t.beginPath(),null==this.prevPoint?(t.arc(e,i,2,0*Math.PI/180,360*Math.PI/180,!1),t.fill()):(t.lineWidth=3,t.moveTo(this.prevPoint.x,this.prevPoint.y),t.lineTo(e,i),t.stroke()))}mouseUp(t){let e=this.prevPoint,i=this.value;this.drawLine(this.canvasArray[this.canvasArray.length-1].getContext("2d"),e.x,e.y),this.draw(),this.prevPoint=null,this.distance=Math.max(this.getDistance(e,this.startPoint),this.distance),this.distance<7?1==this.clickCount?(this.canvasArray.pop(),this.canvasArray.pop(),this.draw(),this.clickCount=0):(this.canvasArray.pop(),this.draw(),this.clickCount+=1):this.clickCount=0,this.distance=0,this.value=this.canvasArray.length,this.dispatchEvent(new CustomEvent("change",{detail:{oldValue:isNaN(i)?0:i,newValue:this.value}}))}mouseMove(t){let e=this.getMousePosition(t);this.drawLine(this.canvasArray[this.canvasArray.length-1].getContext("2d"),e.x,e.y),this.draw();let i=this.getDistance(e,this.startPoint);this.distance=Math.max(i,this.distance),this.prevPoint=e}mouseDown(t){let e=this.getMousePosition(t),i=document.createElement("canvas");i.width=this.width,i.height=this.height,this.canvasArray.push(i),this.draw(),this.prevPoint=e,this.startPoint=e}getMousePosition(t){if(null==t)return;t.clientX||(t=t.touches||t.touches?t.touches[0]:event.touches[0]);let e=t.target.getBoundingClientRect();return new i(t.clientX-e.left,t.clientY-e.top)}getDistance(t,e){return Math.sqrt(Math.pow(t.x-e.x,2)+Math.pow(t.y-e.y,2))}}class i{constructor(t,e){this.x=t,this.y=e}}function s(t){document.getElementById("traffic_light1").setAttribute("target",t),document.getElementById("traffic_light2").setAttribute("target",t),document.getElementById("traffic_light3").setAttribute("target",t)}customElements.define("input-tally",e),document.addEventListener("DOMContentLoaded",(function(){document.getElementById("button_b").addEventListener("click",(t=>{s(1)})),document.getElementById("button_y").addEventListener("click",(t=>{s(2)})),document.getElementById("button_r").addEventListener("click",(t=>{s(3)})),document.getElementById("tally").addEventListener("change",(t=>{document.getElementById("result").value=t.detail.newValue}))}))})();