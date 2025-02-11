// Copyright 2006 Google Inc.
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//   http://www.apache.org/licenses/LICENSE-2.0
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.
// Modifications by Graham Breach ( http://www.goat1000.com/ )
//  - apply globalAlpha in drawImage
// Known Issues:
// * Patterns only support repeat.
// * Radial gradient are not implemented. The VML version of these look very
//   different from the canvas one.
// * Clipping paths are not implemented.
// * Coordsize. The width and height attribute have higher priority than the
//   width and height style values which isn't correct.
// * Painting mode isn't implemented.
// * Canvas width/height should is using content-box by default. IE in
//   Quirks mode will draw the canvas using border-box. Either change your
//   doctype to HTML5
//   (http://www.whatwg.org/specs/web-apps/current-work/#the-doctype)
//   or use Box Sizing Behavior from WebFX
//   (http://webfx.eae.net/dhtml/boxsizing/boxsizing.html)
// * Non uniform scaling does not correctly scale strokes.
// * Optimize. There is always room for speed improvements.
// Only add this code if we do not already have a canvas implementation
document.createElement("canvas").getContext||function(){
// alias some functions to make (compiled) code shorter
var t=Math,e=t.round,i=t.sin,r=t.cos,n=t.abs,a=t.sqrt,s=10,o=s/2;navigator.userAgent.match(/MSIE ([\d.]+)?/)[1];
/**
   * This funtion is assigned to the <canvas> elements as element.getContext().
   * @this {HTMLElement}
   * @return {CanvasRenderingContext2D_}
   */
function l(){return this.context_||(this.context_=new z(this))}var h=Array.prototype.slice;
/**
   * Binds a function to an object. The returned function will always use the
   * passed in {@code obj} as {@code this}.
   *
   * Example:
   *
   *   g = bind(f, obj, a, b)
   *   g(c, d) // will do f.call(obj, a, b, c, d)
   *
   * @param {Function} f The function to bind the object to
   * @param {Object} obj The object that should act as this when the function
   *     is called
   * @param {*} var_args Rest arguments that will be used as the initial
   *     arguments when the function is called
   * @return {Function} A new function that has bound this
   */function c(t){return String(t).replace(/&/g,"&amp;").replace(/"/g,"&quot;")}function u(t,e,i){t.namespaces[e]||t.namespaces.add(e,i,"#default#VML")}function d(t){
// Setup default CSS.  Only add one style sheet per document
if(u(t,"g_vml_","urn:schemas-microsoft-com:vml"),u(t,"g_o_","urn:schemas-microsoft-com:office:office"),!t.styleSheets.ex_canvas_){var e=t.createStyleSheet();e.owningElement.id="ex_canvas_",e.cssText="canvas{display:inline-block;overflow:hidden;text-align:left;width:300px;height:150px}"}}
// Add namespaces and stylesheet at startup.
d(document);var f={init:function(t){var e=t||document;
// Create a dummy element so that IE will allow canvas elements to be
// recognized.
e.createElement("canvas"),e.attachEvent("onreadystatechange",function(t,e,i){var r=h.call(arguments,2);return function(){return t.apply(e,r.concat(h.call(arguments)))}}(this.init_,this,e))},init_:function(t){for(
// find all canvas elements
var e=t.getElementsByTagName("canvas"),i=0;i<e.length;i++)this.initElement(e[i])},
/**
     * Public initializes a canvas element so that it can be used as canvas
     * element from now on. This is called automatically before the page is
     * loaded but if you are creating elements using createElement you need to
     * make sure this is called on the element.
     * @param {HTMLElement} el The canvas element to initialize.
     * @return {HTMLElement} the element that was created.
     */
initElement:function(t){if(!t.getContext){t.getContext=l,
// Add namespaces and stylesheet to document of the element.
d(t.ownerDocument),
// Remove fallback content. There is no way to hide text nodes so we
// just remove all childNodes. We could hide all elements and remove
// text nodes but who really cares about the fallback content.
t.innerHTML="",
// do not use inline function because that will leak memory
t.attachEvent("onpropertychange",p),t.attachEvent("onresize",_);var e=t.attributes;e.width&&e.width.specified?
// TODO: use runtimeStyle and coordsize
// el.getContext().setWidth_(attrs.width.nodeValue);
t.style.width=e.width.nodeValue+"px":t.width=t.clientWidth,e.height&&e.height.specified?
// TODO: use runtimeStyle and coordsize
// el.getContext().setHeight_(attrs.height.nodeValue);
t.style.height=e.height.nodeValue+"px":t.height=t.clientHeight}return t}};function p(t){var e=t.srcElement;switch(t.propertyName){case"width":e.getContext().clearRect(),e.style.width=e.attributes.width.nodeValue+"px",
// In IE8 this does not trigger onresize.
e.firstChild.style.width=e.clientWidth+"px";break;case"height":e.getContext().clearRect(),e.style.height=e.attributes.height.nodeValue+"px",e.firstChild.style.height=e.clientHeight+"px"}}function _(t){var e=t.srcElement;e.firstChild&&(e.firstChild.style.width=e.clientWidth+"px",e.firstChild.style.height=e.clientHeight+"px")}f.init();for(
// precompute "00" to "FF"
var y=[],g=0;g<16;g++)for(var m=0;m<16;m++)y[16*g+m]=g.toString(16)+m.toString(16);function F(t,e){for(var i=[[1,0,0],[0,1,0],[0,0,1]],r=0;r<3;r++)for(var n=0;n<3;n++){for(var a=0,s=0;s<3;s++)a+=t[r][s]*e[s][n];i[r][n]=a}return i}function x(t,e){e.fillStyle=t.fillStyle,e.lineCap=t.lineCap,e.lineJoin=t.lineJoin,e.lineWidth=t.lineWidth,e.miterLimit=t.miterLimit,e.shadowBlur=t.shadowBlur,e.shadowColor=t.shadowColor,e.shadowOffsetX=t.shadowOffsetX,e.shadowOffsetY=t.shadowOffsetY,e.strokeStyle=t.strokeStyle,e.globalAlpha=t.globalAlpha,e.font=t.font,e.textAlign=t.textAlign,e.textBaseline=t.textBaseline,e.arcScaleX_=t.arcScaleX_,e.arcScaleY_=t.arcScaleY_,e.lineScale_=t.lineScale_}var v={aliceblue:"#F0F8FF",antiquewhite:"#FAEBD7",aquamarine:"#7FFFD4",azure:"#F0FFFF",beige:"#F5F5DC",bisque:"#FFE4C4",black:"#000000",blanchedalmond:"#FFEBCD",blueviolet:"#8A2BE2",brown:"#A52A2A",burlywood:"#DEB887",cadetblue:"#5F9EA0",chartreuse:"#7FFF00",chocolate:"#D2691E",coral:"#FF7F50",cornflowerblue:"#6495ED",cornsilk:"#FFF8DC",crimson:"#DC143C",cyan:"#00FFFF",darkblue:"#00008B",darkcyan:"#008B8B",darkgoldenrod:"#B8860B",darkgray:"#A9A9A9",darkgreen:"#006400",darkgrey:"#A9A9A9",darkkhaki:"#BDB76B",darkmagenta:"#8B008B",darkolivegreen:"#556B2F",darkorange:"#FF8C00",darkorchid:"#9932CC",darkred:"#8B0000",darksalmon:"#E9967A",darkseagreen:"#8FBC8F",darkslateblue:"#483D8B",darkslategray:"#2F4F4F",darkslategrey:"#2F4F4F",darkturquoise:"#00CED1",darkviolet:"#9400D3",deeppink:"#FF1493",deepskyblue:"#00BFFF",dimgray:"#696969",dimgrey:"#696969",dodgerblue:"#1E90FF",firebrick:"#B22222",floralwhite:"#FFFAF0",forestgreen:"#228B22",gainsboro:"#DCDCDC",ghostwhite:"#F8F8FF",gold:"#FFD700",goldenrod:"#DAA520",grey:"#808080",greenyellow:"#ADFF2F",honeydew:"#F0FFF0",hotpink:"#FF69B4",indianred:"#CD5C5C",indigo:"#4B0082",ivory:"#FFFFF0",khaki:"#F0E68C",lavender:"#E6E6FA",lavenderblush:"#FFF0F5",lawngreen:"#7CFC00",lemonchiffon:"#FFFACD",lightblue:"#ADD8E6",lightcoral:"#F08080",lightcyan:"#E0FFFF",lightgoldenrodyellow:"#FAFAD2",lightgreen:"#90EE90",lightgrey:"#D3D3D3",lightpink:"#FFB6C1",lightsalmon:"#FFA07A",lightseagreen:"#20B2AA",lightskyblue:"#87CEFA",lightslategray:"#778899",lightslategrey:"#778899",lightsteelblue:"#B0C4DE",lightyellow:"#FFFFE0",limegreen:"#32CD32",linen:"#FAF0E6",magenta:"#FF00FF",mediumaquamarine:"#66CDAA",mediumblue:"#0000CD",mediumorchid:"#BA55D3",mediumpurple:"#9370DB",mediumseagreen:"#3CB371",mediumslateblue:"#7B68EE",mediumspringgreen:"#00FA9A",mediumturquoise:"#48D1CC",mediumvioletred:"#C71585",midnightblue:"#191970",mintcream:"#F5FFFA",mistyrose:"#FFE4E1",moccasin:"#FFE4B5",navajowhite:"#FFDEAD",oldlace:"#FDF5E6",olivedrab:"#6B8E23",orange:"#FFA500",orangered:"#FF4500",orchid:"#DA70D6",palegoldenrod:"#EEE8AA",palegreen:"#98FB98",paleturquoise:"#AFEEEE",palevioletred:"#DB7093",papayawhip:"#FFEFD5",peachpuff:"#FFDAB9",peru:"#CD853F",pink:"#FFC0CB",plum:"#DDA0DD",powderblue:"#B0E0E6",rosybrown:"#BC8F8F",royalblue:"#4169E1",saddlebrown:"#8B4513",salmon:"#FA8072",sandybrown:"#F4A460",seagreen:"#2E8B57",seashell:"#FFF5EE",sienna:"#A0522D",skyblue:"#87CEEB",slateblue:"#6A5ACD",slategray:"#708090",slategrey:"#708090",snow:"#FFFAFA",springgreen:"#00FF7F",steelblue:"#4682B4",tan:"#D2B48C",thistle:"#D8BFD8",tomato:"#FF6347",turquoise:"#40E0D0",violet:"#EE82EE",wheat:"#F5DEB3",whitesmoke:"#F5F5F5",yellowgreen:"#9ACD32"};function E(t){var e=t.indexOf("(",3),i=t.indexOf(")",e+1),r=t.substring(e+1,i).split(",");
// add alpha if needed
return 4==r.length&&"a"==t.charAt(3)||(r[3]=1),r}function A(t){return parseFloat(t)/100}function w(t,e,i){return Math.min(i,Math.max(e,t))}function b(t,e,i){return i<0&&i++,i>1&&i--,6*i<1?t+6*(e-t)*i:2*i<1?e:3*i<2?t+(e-t)*(2/3-i)*6:t}var C={};function D(t){if(t in C)return C[t];var e=1;if("#"==(t=String(t)).charAt(0))n=t;else if(/^rgb/.test(t)){for(var i,r=E(t),n="#",a=0;a<3;a++)i=-1!=r[a].indexOf("%")?Math.floor(255*A(r[a])):+r[a],n+=y[w(i,0,255)];e=+r[3]}else if(/^hsl/.test(t)){n=function(t){var e,i,r,n,a,s;if((n=parseFloat(t[0])/360%360)<0&&n++,a=w(A(t[1]),0,1),s=w(A(t[2]),0,1),0==a)e=i=r=s;// achromatic
else{var o=s<.5?s*(1+a):s+a-s*a,l=2*s-o;e=b(l,o,n+1/3),i=b(l,o,n),r=b(l,o,n-1/3)}return"#"+y[Math.floor(255*e)]+y[Math.floor(255*i)]+y[Math.floor(255*r)]}(r=E(t)),e=r[3]}else n=v[t]||t;return C[t]={color:n,alpha:e}}var S="normal",k="normal",T="normal",R=10,B="sans-serif",M={};
// Internal text style cache
var I={butt:"flat",round:"round"};
/**
   * This class implements CanvasRenderingContext2D interface as described by
   * the WHATWG.
   * @param {HTMLElement} canvasElement The element that the 2D context should
   * be associated with
   */
function z(t){this.m_=[[1,0,0],[0,1,0],[0,0,1]],this.mStack_=[],this.aStack_=[],this.currentPath_=[],
// Canvas context properties
this.strokeStyle="#000",this.fillStyle="#000",this.lineWidth=1,this.lineJoin="miter",this.lineCap="butt",this.miterLimit=1*s,this.globalAlpha=1,this.font="10px sans-serif",this.textAlign="left",this.textBaseline="alphabetic",this.canvas=t;var e="width:"+t.clientWidth+"px;height:"+t.clientHeight+"px;overflow:hidden;position:absolute",i=t.ownerDocument.createElement("div");i.style.cssText=e,t.appendChild(i);var r=i.cloneNode(!1);
// Use a non transparent background.
r.style.backgroundColor="red",r.style.filter="alpha(opacity=0)",t.appendChild(r),this.element_=i,this.arcScaleX_=1,this.arcScaleY_=1,this.lineScale_=1}var O=z.prototype;
// Helper function that takes the already fixed cordinates.
function P(t,e,i,r){t.currentPath_.push({type:"bezierCurveTo",cp1x:e.x,cp1y:e.y,cp2x:i.x,cp2y:i.y,x:r.x,y:r.y}),t.currentX_=r.x,t.currentY_=r.y}function N(t,e){var i,r=D(t.strokeStyle),n=r.color,a=r.alpha*t.globalAlpha,s=t.lineScale_*t.lineWidth;
// VML cannot correctly render a line if the width is less than 1px.
// In that case, we dilute the color to make the line look thinner.
s<1&&(a*=s),e.push("<g_vml_:stroke",' opacity="',a,'"',' joinstyle="',t.lineJoin,'"',' miterlimit="',t.miterLimit,'"',' endcap="',(i=t.lineCap,I[i]||"square"),'"',' weight="',s,'px"',' color="',n,'" />')}function L(e,i,r,n){var a=e.fillStyle,o=e.arcScaleX_,l=e.arcScaleY_,h=n.x-r.x,c=n.y-r.y;if(a instanceof H){
// TODO: Gradients transformed with the transformation matrix.
var u=0,d={x:0,y:0},f=0,p=1;if("gradient"==a.type_){var _=a.x0_/o,y=a.y0_/l,g=a.x1_/o,m=a.y1_/l,F=X(e,_,y),x=X(e,g,m),v=x.x-F.x,E=x.y-F.y;
// The angle should be a non-negative number.
(u=180*Math.atan2(v,E)/Math.PI)<0&&(u+=360),
// Very small angles produce an unexpected result because they are
// converted to a scientific notation string.
u<1e-6&&(u=0)}else{d={x:((F=X(e,a.x0_,a.y0_)).x-r.x)/h,y:(F.y-r.y)/c},h/=o*s,c/=l*s;var A=t.max(h,c);f=2*a.r0_/A,p=2*a.r1_/A-f}
// We need to sort the color stops in ascending order by offset,
// otherwise IE won't interpret it correctly.
var w=a.colors_;w.sort((function(t,e){return t.offset-e.offset}));for(var b=w.length,C=w[0].color,S=w[b-1].color,k=w[0].alpha*e.globalAlpha,T=w[b-1].alpha*e.globalAlpha,R=[],B=0;B<b;B++){var M=w[B];R.push(M.offset*p+f+" "+M.color)}
// When colors attribute is used, the meanings of opacity and o:opacity2
// are reversed.
i.push('<g_vml_:fill type="',a.type_,'"',' method="none" focus="100%"',' color="',C,'"',' color2="',S,'"',' colors="',R.join(","),'"',' opacity="',T,'"',' g_o_:opacity2="',k,'"',' angle="',u,'"',' focusposition="',d.x,",",d.y,'" />')}else if(a instanceof W){if(h&&c){var I=-r.x,z=-r.y;i.push("<g_vml_:fill",' position="',I/h*o*o,",",z/c*l*l,'"',' type="tile"',
// TODO: Figure out the correct size to fit the scale.
//' size="', w, 'px ', h, 'px"',
' src="',a.src_,'" />')}}else{var O=D(e.fillStyle),P=O.color,N=O.alpha*e.globalAlpha;i.push('<g_vml_:fill color="',P,'" opacity="',N,'" />')}}function X(t,e,i){var r=t.m_;return{x:s*(e*r[0][0]+i*r[1][0]+r[2][0])-o,y:s*(e*r[0][1]+i*r[1][1]+r[2][1])-o}}function Y(t,e,i){if(function(t){return isFinite(t[0][0])&&isFinite(t[0][1])&&isFinite(t[1][0])&&isFinite(t[1][1])&&isFinite(t[2][0])&&isFinite(t[2][1])}(e)&&(t.m_=e,i)){
// Get the line scale.
// Determinant of this.m_ means how much the area is enlarged by the
// transformation. So its square root can be used as a scale factor
// for width.
var r=e[0][0]*e[1][1]-e[0][1]*e[1][0];t.lineScale_=a(n(r))}}
// Gradient / Pattern Stubs
function H(t){this.type_=t,this.x0_=0,this.y0_=0,this.r0_=0,this.x1_=0,this.y1_=0,this.r1_=0,this.colors_=[]}function W(t,e){switch(function(t){t&&1==t.nodeType&&"IMG"==t.tagName||q("TYPE_MISMATCH_ERR");"complete"!=t.readyState&&q("INVALID_STATE_ERR")}(t),e){case"repeat":case null:case"":this.repetition_="repeat";break;case"repeat-x":case"repeat-y":case"no-repeat":this.repetition_=e;break;default:q("SYNTAX_ERR")}this.src_=t.src,this.width_=t.width,this.height_=t.height}function q(t){throw new V(t)}function V(t){this.code=this[t],this.message=t+": DOM Exception "+this.code}O.clearRect=function(){this.textMeasureEl_&&(this.textMeasureEl_.removeNode(!0),this.textMeasureEl_=null),this.element_.innerHTML=""},O.beginPath=function(){
// TODO: Branch current matrix so that save/restore has no effect
//       as per safari docs.
this.currentPath_=[]},O.moveTo=function(t,e){var i=X(this,t,e);this.currentPath_.push({type:"moveTo",x:i.x,y:i.y}),this.currentX_=i.x,this.currentY_=i.y},O.lineTo=function(t,e){var i=X(this,t,e);this.currentPath_.push({type:"lineTo",x:i.x,y:i.y}),this.currentX_=i.x,this.currentY_=i.y},O.bezierCurveTo=function(t,e,i,r,n,a){var s=X(this,n,a);P(this,X(this,t,e),X(this,i,r),s)},O.quadraticCurveTo=function(t,e,i,r){
// the following is lifted almost directly from
// http://developer.mozilla.org/en/docs/Canvas_tutorial:Drawing_shapes
var n=X(this,t,e),a=X(this,i,r),s={x:this.currentX_+2/3*(n.x-this.currentX_),y:this.currentY_+2/3*(n.y-this.currentY_)};P(this,s,{x:s.x+(a.x-this.currentX_)/3,y:s.y+(a.y-this.currentY_)/3},a)},O.arc=function(t,e,n,a,l,h){n*=s;var c=h?"at":"wa",u=t+r(a)*n-o,d=e+i(a)*n-o,f=t+r(l)*n-o,p=e+i(l)*n-o;
// IE won't render arches drawn counter clockwise if xStart == xEnd.
u!=f||h||(u+=.125);var _=X(this,t,e),y=X(this,u,d),g=X(this,f,p);this.currentPath_.push({type:c,x:_.x,y:_.y,radius:n,xStart:y.x,yStart:y.y,xEnd:g.x,yEnd:g.y})},O.rect=function(t,e,i,r){this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+r),this.lineTo(t,e+r),this.closePath()},O.strokeRect=function(t,e,i,r){var n=this.currentPath_;this.beginPath(),this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+r),this.lineTo(t,e+r),this.closePath(),this.stroke(),this.currentPath_=n},O.fillRect=function(t,e,i,r){var n=this.currentPath_;this.beginPath(),this.moveTo(t,e),this.lineTo(t+i,e),this.lineTo(t+i,e+r),this.lineTo(t,e+r),this.closePath(),this.fill(),this.currentPath_=n},O.createLinearGradient=function(t,e,i,r){var n=new H("gradient");return n.x0_=t,n.y0_=e,n.x1_=i,n.y1_=r,n},O.createRadialGradient=function(t,e,i,r,n,a){var s=new H("gradientradial");return s.x0_=t,s.y0_=e,s.r0_=i,s.x1_=r,s.y1_=n,s.r1_=a,s},O.drawImage=function(i,r){var n,a,o,l,h,c,u,d,f=i.runtimeStyle.width,p=i.runtimeStyle.height;
// to find the original width we overide the width and height
i.runtimeStyle.width="auto",i.runtimeStyle.height="auto";
// get the original size
var _=i.width,y=i.height;if(
// and remove overides
i.runtimeStyle.width=f,i.runtimeStyle.height=p,3==arguments.length)n=arguments[1],a=arguments[2],h=c=0,u=o=_,d=l=y;else if(5==arguments.length)n=arguments[1],a=arguments[2],o=arguments[3],l=arguments[4],h=c=0,u=_,d=y;else{if(9!=arguments.length)throw Error("Invalid number of arguments");h=arguments[1],c=arguments[2],u=arguments[3],d=arguments[4],n=arguments[5],a=arguments[6],o=arguments[7],l=arguments[8]}var g=X(this,n,a),m=[];
// If filters are necessary (rotation exists), create them
// filters are bog-slow, so only create them if abbsolutely necessary
// The following check doesn't account for skews (which don't exist
// in the canvas spec (yet) anyway.
if(
// For some reason that I've now forgotten, using divs didn't work
m.push(" <g_vml_:group",' coordsize="',10*s,",",10*s,'"',' coordorigin="0,0"',' style="width:',10,"px;height:",10,"px;position:absolute;"),1!=this.m_[0][0]||this.m_[0][1]||1!=this.m_[1][1]||this.m_[1][0]){var F=[];
// Note the 12/21 reversal
F.push("M11=",this.m_[0][0],",","M12=",this.m_[1][0],",","M21=",this.m_[0][1],",","M22=",this.m_[1][1],",","Dx=",e(g.x/s),",","Dy=",e(g.y/s),"");
// Bounding box calculation (need to minimize displayed area so that
// filters don't waste time on unused pixels.
var x=g,v=X(this,n+o,a),E=X(this,n,a+l),A=X(this,n+o,a+l);x.x=t.max(x.x,v.x,E.x,A.x),x.y=t.max(x.y,v.y,E.y,A.y),m.push("padding:0 ",e(x.x/s),"px ",e(x.y/s),"px 0;filter:progid:DXImageTransform.Microsoft.Matrix(",F.join(""),", sizingmethod='clip');")}else m.push("top:",e(g.y/s),"px;left:",e(g.x/s),"px;");var w=~~(100*this.globalAlpha);m.push(' ">','<g_vml_:image src="',i.src,'"',' style="width:',s*o,"px;"," height:",s*l,"px;"," -ms-filter:progid:DXImageTransform.Microsoft.Alpha(Opacity=",w,");"," filter:alpha(opacity=",w,')"',' cropleft="',h/_,'"',' croptop="',c/y,'"',' cropright="',(_-h-u)/_,'"',' cropbottom="',(y-c-d)/y,'"'," />","</g_vml_:group>"),this.element_.insertAdjacentHTML("BeforeEnd",m.join(""))},O.stroke=function(t){var i=[];i.push("<g_vml_:shape",' filled="',!!t,'"',' style="position:absolute;width:',10,"px;height:",10,'px;"',' coordorigin="0,0"',' coordsize="',10*s,",",10*s,'"',' stroked="',!t,'"',' path="');for(var r={x:null,y:null},n={x:null,y:null},a=0;a<this.currentPath_.length;a++){var o=this.currentPath_[a];switch(o.type){case"moveTo":o,i.push(" m ",e(o.x),",",e(o.y));break;case"lineTo":i.push(" l ",e(o.x),",",e(o.y));break;case"close":i.push(" x "),o=null;break;case"bezierCurveTo":i.push(" c ",e(o.cp1x),",",e(o.cp1y),",",e(o.cp2x),",",e(o.cp2y),",",e(o.x),",",e(o.y));break;case"at":case"wa":i.push(" ",o.type," ",e(o.x-this.arcScaleX_*o.radius),",",e(o.y-this.arcScaleY_*o.radius)," ",e(o.x+this.arcScaleX_*o.radius),",",e(o.y+this.arcScaleY_*o.radius)," ",e(o.xStart),",",e(o.yStart)," ",e(o.xEnd),",",e(o.yEnd))}
// TODO: Following is broken for curves due to
//       move to proper paths.
// Figure out dimensions so we can do gradient fills
// properly
o&&((null==r.x||o.x<r.x)&&(r.x=o.x),(null==n.x||o.x>n.x)&&(n.x=o.x),(null==r.y||o.y<r.y)&&(r.y=o.y),(null==n.y||o.y>n.y)&&(n.y=o.y))}i.push(' ">'),t?L(this,i,r,n):N(this,i),i.push("</g_vml_:shape>"),this.element_.insertAdjacentHTML("beforeEnd",i.join(""))},O.fill=function(){this.stroke(!0)},O.closePath=function(){this.currentPath_.push({type:"close"})},O.save=function(){var t={};x(this,t),this.aStack_.push(t),this.mStack_.push(this.m_),this.m_=F([[1,0,0],[0,1,0],[0,0,1]],this.m_)},O.restore=function(){this.aStack_.length&&(x(this.aStack_.pop(),this),this.m_=this.mStack_.pop())},O.translate=function(t,e){Y(this,F([[1,0,0],[0,1,0],[t,e,1]],this.m_),!1)},O.rotate=function(t){var e=r(t),n=i(t);Y(this,F([[e,n,0],[-n,e,0],[0,0,1]],this.m_),!1)},O.scale=function(t,e){this.arcScaleX_*=t,this.arcScaleY_*=e,Y(this,F([[t,0,0],[0,e,0],[0,0,1]],this.m_),!0)},O.transform=function(t,e,i,r,n,a){Y(this,F([[t,e,0],[i,r,0],[n,a,1]],this.m_),!0)},O.setTransform=function(t,e,i,r,n,a){Y(this,[[t,e,0],[i,r,0],[n,a,1]],!0)},
/**
   * The text drawing function.
   * The maxWidth argument isn't taken in account, since no browser supports
   * it yet.
   */
O.drawText_=function(t,i,r,n,a){var o,l=this.m_,h=1e3,u=0,d=h,f={x:0,y:0},p=[],_=function(t,e){var i={};for(var r in t)i[r]=t[r];
// Compute the size
var n=parseFloat(e.currentStyle.fontSize),a=parseFloat(t.size);return"number"==typeof t.size?i.size=t.size:-1!=t.size.indexOf("px")?i.size=a:-1!=t.size.indexOf("em")?i.size=n*a:-1!=t.size.indexOf("%")?i.size=n/100*a:-1!=t.size.indexOf("pt")?i.size=a/.75:i.size=n,
// Different scaling between normal text and VML text. This was found using
// trial and error to get the same size as non VML text.
i.size*=.981,i}(function(t){if(M[t])return M[t];var e=document.createElement("div").style;try{e.font=t}catch(t){
// Ignore failures to set to invalid font.
}return M[t]={style:e.fontStyle||S,variant:e.fontVariant||k,weight:e.fontWeight||T,size:e.fontSize||R,family:e.fontFamily||B}}(this.font),this.element_),y=(o=_).style+" "+o.variant+" "+o.weight+" "+o.size+"px "+o.family,g=this.element_.currentStyle,m=this.textAlign.toLowerCase();switch(m){case"left":case"center":case"right":break;case"end":m="ltr"==g.direction?"right":"left";break;case"start":m="rtl"==g.direction?"right":"left";break;default:m="left"}
// 1.75 is an arbitrary number, as there is no info about the text baseline
switch(this.textBaseline){case"hanging":case"top":f.y=_.size/1.75;break;case"middle":break;default:f.y=-_.size/2.25}switch(m){case"right":u=h,d=.05;break;case"center":u=d=500}var F=X(this,i+f.x,r+f.y);p.push('<g_vml_:line from="',-u,' 0" to="',d,' 0.05" ',' coordsize="100 100" coordorigin="0 0"',' filled="',!a,'" stroked="',!!a,'" style="position:absolute;width:1px;height:1px;">'),a?N(this,p):
// TODO: Fix the min and max params.
L(this,p,{x:-u,y:0},{x:d,y:_.size});var x=l[0][0].toFixed(3)+","+l[1][0].toFixed(3)+","+l[0][1].toFixed(3)+","+l[1][1].toFixed(3)+",0,0",v=e(F.x/s)+","+e(F.y/s);p.push('<g_vml_:skew on="t" matrix="',x,'" ',' offset="',v,'" origin="',u,' 0" />','<g_vml_:path textpathok="true" />','<g_vml_:textpath on="true" string="',c(t),'" style="v-text-align:',m,";font:",c(y),'" /></g_vml_:line>'),this.element_.insertAdjacentHTML("beforeEnd",p.join(""))},O.fillText=function(t,e,i,r){this.drawText_(t,e,i,r,!1)},O.strokeText=function(t,e,i,r){this.drawText_(t,e,i,r,!0)},O.measureText=function(t){if(!this.textMeasureEl_){this.element_.insertAdjacentHTML("beforeEnd",'<span style="position:absolute;top:-20000px;left:0;padding:0;margin:0;border:none;white-space:pre;"></span>'),this.textMeasureEl_=this.element_.lastChild}var e=this.element_.ownerDocument;return this.textMeasureEl_.innerHTML="",this.textMeasureEl_.style.font=this.font,
// Don't use innerHTML or innerText because they allow markup/whitespace.
this.textMeasureEl_.appendChild(e.createTextNode(t)),{width:this.textMeasureEl_.offsetWidth}},
/******** STUBS ********/
O.clip=function(){
// TODO: Implement
},O.arcTo=function(){
// TODO: Implement
},O.createPattern=function(t,e){return new W(t,e)},H.prototype.addColorStop=function(t,e){e=D(e),this.colors_.push({offset:t,color:e.color,alpha:e.alpha})};var j=V.prototype=new Error;j.INDEX_SIZE_ERR=1,j.DOMSTRING_SIZE_ERR=2,j.HIERARCHY_REQUEST_ERR=3,j.WRONG_DOCUMENT_ERR=4,j.INVALID_CHARACTER_ERR=5,j.NO_DATA_ALLOWED_ERR=6,j.NO_MODIFICATION_ALLOWED_ERR=7,j.NOT_FOUND_ERR=8,j.NOT_SUPPORTED_ERR=9,j.INUSE_ATTRIBUTE_ERR=10,j.INVALID_STATE_ERR=11,j.SYNTAX_ERR=12,j.INVALID_MODIFICATION_ERR=13,j.NAMESPACE_ERR=14,j.INVALID_ACCESS_ERR=15,j.VALIDATION_ERR=16,j.TYPE_MISMATCH_ERR=17,
// set up externs
G_vmlCanvasManager=f,CanvasRenderingContext2D=z,CanvasGradient=H,CanvasPattern=W,DOMException=V}();// if