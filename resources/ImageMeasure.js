/* Author: Vienna Ly, BCIT LTC
 * June 20, 2022
 *
 * Repo: GitHub "ImageMeasure"
 * Demo POC: https://vie74050.github.io/ImageMeasure/demo.html
 * 
 * HTML template setup note:
 * 
 * - Get image from HTML: expect 1 <img> tag
 * - Get scale from table: table format must be
 *  <table>
      <thead><tr><th>Scale</th><th>Unit</th></tr></thead>
      <tbody><tr><td>1</td><td>cm</td></tr></tbody>
	</table>
 * 
 * Usage:
 * 
 * Instructor in learning Hub Edit Mode 
 * 1. insert an image (D2L Learning Hub feature).
 * 2. move calliper ends to a known length on image (desired length, L)
 * 3. console outputs the pixel length (P)
 * 4. calculate scale
 *   	Scale = L/P
 * 5. enter the Scale in the table under "Scale"
 * 6. set the number of significant figures to show in the table under "SigFig"
 * 
 * User:
 * User will see 2 draggable end points that can be positioned.
 * As user adjusts end points, the scaled length of the line will be shown in the #outputBox
 * 
 */
	
/** Creates calliper for measuring lengths in image according to the provided image scale 
*/
class ImageMeasure extends HTMLElement  {
	constructor() {
		self = super(); 
		const $img = document.querySelector('img');
		const $table = document.querySelector('table');
				
		self.uiSetup($img, $table);
	}

	/** Helper: Parses a table with headings as key and column text values.
	 * @param {HTMLTableElement} table  The table to query
	 * @param {string} queryS  (optional) Returns {key: value} where queryS matches key (table heading text). First exact match.
	 * @returns {string:string, ..}
	 */
	getTableValues(table, queryS) {
		const tr1 = table.getElementsByTagName("tr")[1];
		const th = table.getElementsByTagName("th");
		const tds = tr1.getElementsByTagName("td");
		
		let retObj = {};

		for (let i = 0; i < th.length; i++) {
			let k = th[i].textContent ||  th[i].innerText; 
			let vals = [];
					
			vals = tds[i].textContent || tds[i].innerText;
			retObj[k] = vals;

		}

		//console.log(retObj);

		if (queryS) {
			return retObj[queryS] || "";
		}else {
			return retObj;
		}
		
	}

	uiSetup(img, table) {
		const me = this;
		const div = document.createElement('div');
		const initPromp = document.createElement('div');	
		const initPromptTxt = document.createTextNode("Drag calliper points to position");	
		table.remove();

		// Create component container to zero img position
		document.body.appendChild(div);
		div.setAttribute("id", "imgMeasureContainer");
		img.setAttribute("id", "imgRef");
		div.appendChild(img);

		// initial prompt
		initPromp.classList.add('prompt','arrow');
		initPromp.appendChild(initPromptTxt);
		div.appendChild(initPromp);

		// Calliper elements
		const sigFig = Number(self.getTableValues(table, 'SigFig')) || 1;
		const scale = Number(self.getTableValues(table, 'Scale')) || 1;
		const line = document.createElement('div');
		const outputLabel = document.createElement('div');
		outputLabel.setAttribute("id", "output");
		line.setAttribute("id", "line");
		line.appendChild(outputLabel);		
		div.appendChild(line);
		
		const p1 = new DragElement(div);
		const p2 = new DragElement(div);

		p1.addEventListener('myPosition', (e) => { 
			let h = me.adjustLine(p1, p2, line, output); 
			outputLabel.textContent = (h*scale).toFixed(sigFig) ;
			initPromp.remove();
		});
		p2.addEventListener('myPosition', (e) => { 
			let h = me.adjustLine(p1, p2, line, output); 
			outputLabel.textContent = (h*scale).toFixed(sigFig) ;
			initPromp.remove();
		});
	}

	/** updates $line according to $from and $to positions
	 * @param {HTMLElement} from 
	 * @param {HTMLElement} to 
	 * @param {HTMLElement} line
	 * @param {HTMLElement} output Optional
	 * @return {integer} Line height in pixels
	 */
	adjustLine(from, to, line, output){	
		var fT = from.offsetTop  + from.offsetHeight/2;
	  	var tT = to.offsetTop 	 + to.offsetHeight/2;
		var fL = from.offsetLeft + from.offsetWidth/2;
		var tL = to.offsetLeft 	 + to.offsetWidth/2;
		
		var CA   = Math.abs(tT - fT);
		var CO   = Math.abs(tL - fL);
		var H    = Math.sqrt(CA*CA + CO*CO);
		var ANG  = 180 / Math.PI * Math.acos( CA/H );
		
		if(tT > fT){
			var top  = (tT-fT)/2 + fT;
		}else{
			var top  = (fT-tT)/2 + tT;
		}
		if(tL > fL){
			var left = (tL-fL)/2 + fL;
		}else{
			var left = (fL-tL)/2 + tL;
		}
		
		if(( fT < tT && fL < tL) || ( tT < fT && tL < fL) || (fT > tT && fL > tL) || (tT > fT && tL > fL)){
			ANG *= -1;
		}
		top-= H/2;
		
		line.style["-webkit-transform"] = 'rotate('+ ANG +'deg)';
		line.style["-moz-transform"] = 'rotate('+ ANG +'deg)';
		line.style["-ms-transform"] = 'rotate('+ ANG +'deg)';
		line.style["-o-transform"] = 'rotate('+ ANG +'deg)';
		line.style["-transform"] = 'rotate('+ ANG +'deg)';
		line.style.top    = top+'px';
		line.style.left   = left+'px';
		line.style.height = H + 'px';

		if (output) {
			output.style["-webkit-transform"] = 'rotate('+ -ANG +'deg)';
			output.style["-moz-transform"] = 'rotate('+ -ANG +'deg)';
			output.style["-ms-transform"] = 'rotate('+ -ANG +'deg)';
			output.style["-o-transform"] = 'rotate('+ -ANG +'deg)';
			output.style["-transform"] = 'rotate('+ -ANG +'deg)';
		}

		console.log(H, "Scale = L / " + H);
		return H;
	}
}

/** Creates a draggable div 
 * @param {HTMLElement} $parent Container parent for draggable object
 * @param {} options {
 * 	'shape': 'dot', 
 * 	'color': '#000', 
 * 	'fill':'#000',
 * 	'width': '1', //px
 *  'height': '10' //px
 * }
*/
class DragElement {

	constructor($parent=document.getElementById("imgMeasureContainer"), options) {
		const defaultAttr = {
			'shape' : 'dot',
			'color' : '#fff',
			'width': '30', //px
			'height': '30' //px
		};
		const el = document.createElement("div");
		const attrs = {...defaultAttr, ...options};
		const me = this;
		const newPos = new CustomEvent('myPosition', 
		{detail: { 
			top: el.style.top, 
			left: el.style.left 
			}
		});
		me.pos1 = 0;
		me.pos2 = 0;
		me.pos3 = 0;
		me.pos4 = 0;

		el.classList.add('draggable',attrs['shape']);
		el.style.color = attrs['color'];
		el.style.width  = attrs['width'] + 'px';
		el.style.height = attrs['height'] + 'px';

		el.onmousedown = dragMouseDown;

		// Event handlers
		function dragMouseDown(e) {
			e = e || window.event;
			e.preventDefault();
		
			// get the mouse cursor position at startup:
			me.pos3 = e.clientX;
			me.pos4 = e.clientY;
			document.onmouseup = closeDragElement;
			// call a function whenever the cursor moves:
			document.onmousemove = elementDrag;

			//console.log(this.pos1, this.pos2, this.pos3, this.pos4);
		}
		
		function elementDrag(e) {
			e = e || window.event;
			e.preventDefault();
			// calculate the new cursor position:
			me.pos1 = me.pos3 - e.clientX;
			me.pos2 = me.pos4 - e.clientY;
			me.pos3 = e.clientX;
			me.pos4 = e.clientY;
			// set the element's new position:
			el.style.top = (el.offsetTop - me.pos2) + "px";
			el.style.left = (el.offsetLeft - me.pos1) + "px";

			el.dispatchEvent(newPos);
			//console.log(e.clientX, e.clientY);
		}

		function closeDragElement() {
			// stop moving when mouse button is released:
			document.onmouseup = null;
			document.onmousemove = null;
		}
	 		
		$parent.appendChild(el);

		return el;
	}

}

window.onload = (event) => {

	const el = document.createElement("img-measure");
	customElements.define('img-measure', ImageMeasure);
	customElements.upgrade(el);
	//console.assert(el instanceof ImageMeasure);
};

