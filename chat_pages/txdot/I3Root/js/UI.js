/************************************************************************************************
* This file contains Javascript code authored by Interactive Intelligence, Inc.                 *
*                                                                                               *
* The contents of this file are warranted to function as intended, provided they are not        *
* modified in any way by customers, end users, or other parties.                                *
*                                                                                               *
* During the course of this product's support lifecycle, Interactive Intelligence, Inc. may     *
* publish updates to this file at any time, via an SU or similar process.  If other             *
* modifications are made to this file, these modifications may therefore be overwritten.        *
*                                                                                               *
* Customers are encouraged to extend the functionality provided in this file, by creating       *
* additional file(s) which use this file as an API.                                             *
************************************************************************************************/


/* Interaction Center 4.0 SU4 */ 
var ININ_Web_Chat_UI_Fileversion = "4.0004.0017.316"; 

/*
 * jQuery JavaScript Library v1.3.2
 * http://jquery.com/
 *
 * Copyright (c) 2009 John Resig
 * Dual licensed under the MIT and GPL licenses.
 * http://docs.jquery.com/License
 *
 * Date: 2009-02-19 17:34:21 -0500 (Thu, 19 Feb 2009)
 * Revision: 6246
 */
(function(){var l=this,g,y=l.jQuery,p=l.$,o=l.jQuery=l.$=function(E,F){return new o.fn.init(E,F)},D=/^[^<]*(<(.|\s)+>)[^>]*$|^#([\w-]+)$/,f=/^.[^:#\[\.,]*$/;o.fn=o.prototype={init:function(E,H){E=E||document;if(E.nodeType){this[0]=E;this.length=1;this.context=E;return this}if(typeof E==="string"){var G=D.exec(E);if(G&&(G[1]||!H)){if(G[1]){E=o.clean([G[1]],H)}else{var I=document.getElementById(G[3]);if(I&&I.id!=G[3]){return o().find(E)}var F=o(I||[]);F.context=document;F.selector=E;return F}}else{return o(H).find(E)}}else{if(o.isFunction(E)){return o(document).ready(E)}}if(E.selector&&E.context){this.selector=E.selector;this.context=E.context}return this.setArray(o.isArray(E)?E:o.makeArray(E))},selector:"",jquery:"1.3.2",size:function(){return this.length},get:function(E){return E===g?Array.prototype.slice.call(this):this[E]},pushStack:function(F,H,E){var G=o(F);G.prevObject=this;G.context=this.context;if(H==="find"){G.selector=this.selector+(this.selector?" ":"")+E}else{if(H){G.selector=this.selector+"."+H+"("+E+")"}}return G},setArray:function(E){this.length=0;Array.prototype.push.apply(this,E);return this},each:function(F,E){return o.each(this,F,E)},index:function(E){return o.inArray(E&&E.jquery?E[0]:E,this)},attr:function(F,H,G){var E=F;if(typeof F==="string"){if(H===g){return this[0]&&o[G||"attr"](this[0],F)}else{E={};E[F]=H}}return this.each(function(I){for(F in E){o.attr(G?this.style:this,F,o.prop(this,E[F],G,I,F))}})},css:function(E,F){if((E=="width"||E=="height")&&parseFloat(F)<0){F=g}return this.attr(E,F,"curCSS")},text:function(F){if(typeof F!=="object"&&F!=null){return this.empty().append((this[0]&&this[0].ownerDocument||document).createTextNode(F))}var E="";o.each(F||this,function(){o.each(this.childNodes,function(){if(this.nodeType!=8){E+=this.nodeType!=1?this.nodeValue:o.fn.text([this])}})});return E},wrapAll:function(E){if(this[0]){var F=o(E,this[0].ownerDocument).clone();if(this[0].parentNode){F.insertBefore(this[0])}F.map(function(){var G=this;while(G.firstChild){G=G.firstChild}return G}).append(this)}return this},wrapInner:function(E){return this.each(function(){o(this).contents().wrapAll(E)})},wrap:function(E){return this.each(function(){o(this).wrapAll(E)})},append:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.appendChild(E)}})},prepend:function(){return this.domManip(arguments,true,function(E){if(this.nodeType==1){this.insertBefore(E,this.firstChild)}})},before:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this)})},after:function(){return this.domManip(arguments,false,function(E){this.parentNode.insertBefore(E,this.nextSibling)})},end:function(){return this.prevObject||o([])},push:[].push,sort:[].sort,splice:[].splice,find:function(E){if(this.length===1){var F=this.pushStack([],"find",E);F.length=0;o.find(E,this[0],F);return F}else{return this.pushStack(o.unique(o.map(this,function(G){return o.find(E,G)})),"find",E)}},clone:function(G){var E=this.map(function(){if(!o.support.noCloneEvent&&!o.isXMLDoc(this)){var I=this.outerHTML;if(!I){var J=this.ownerDocument.createElement("div");J.appendChild(this.cloneNode(true));I=J.innerHTML}return o.clean([I.replace(/ jQuery\d+="(?:\d+|null)"/g,"").replace(/^\s*/,"")])[0]}else{return this.cloneNode(true)}});if(G===true){var H=this.find("*").andSelf(),F=0;E.find("*").andSelf().each(function(){if(this.nodeName!==H[F].nodeName){return}var I=o.data(H[F],"events");for(var K in I){for(var J in I[K]){o.event.add(this,K,I[K][J],I[K][J].data)}}F++})}return E},filter:function(E){return this.pushStack(o.isFunction(E)&&o.grep(this,function(G,F){return E.call(G,F)})||o.multiFilter(E,o.grep(this,function(F){return F.nodeType===1})),"filter",E)},closest:function(E){var G=o.expr.match.POS.test(E)?o(E):null,F=0;return this.map(function(){var H=this;while(H&&H.ownerDocument){if(G?G.index(H)>-1:o(H).is(E)){o.data(H,"closest",F);return H}H=H.parentNode;F++}})},not:function(E){if(typeof E==="string"){if(f.test(E)){return this.pushStack(o.multiFilter(E,this,true),"not",E)}else{E=o.multiFilter(E,this)}}var F=E.length&&E[E.length-1]!==g&&!E.nodeType;return this.filter(function(){return F?o.inArray(this,E)<0:this!=E})},add:function(E){return this.pushStack(o.unique(o.merge(this.get(),typeof E==="string"?o(E):o.makeArray(E))))},is:function(E){return !!E&&o.multiFilter(E,this).length>0},hasClass:function(E){return !!E&&this.is("."+E)},val:function(K){if(K===g){var E=this[0];if(E){if(o.nodeName(E,"option")){return(E.attributes.value||{}).specified?E.value:E.text}if(o.nodeName(E,"select")){var I=E.selectedIndex,L=[],M=E.options,H=E.type=="select-one";if(I<0){return null}for(var F=H?I:0,J=H?I+1:M.length;F<J;F++){var G=M[F];if(G.selected){K=o(G).val();if(H){return K}L.push(K)}}return L}return(E.value||"").replace(/\r/g,"")}return g}if(typeof K==="number"){K+=""}return this.each(function(){if(this.nodeType!=1){return}if(o.isArray(K)&&/radio|checkbox/.test(this.type)){this.checked=(o.inArray(this.value,K)>=0||o.inArray(this.name,K)>=0)}else{if(o.nodeName(this,"select")){var N=o.makeArray(K);o("option",this).each(function(){this.selected=(o.inArray(this.value,N)>=0||o.inArray(this.text,N)>=0)});if(!N.length){this.selectedIndex=-1}}else{this.value=K}}})},html:function(E){return E===g?(this[0]?this[0].innerHTML.replace(/ jQuery\d+="(?:\d+|null)"/g,""):null):this.empty().append(E)},replaceWith:function(E){return this.after(E).remove()},eq:function(E){return this.slice(E,+E+1)},slice:function(){return this.pushStack(Array.prototype.slice.apply(this,arguments),"slice",Array.prototype.slice.call(arguments).join(","))},map:function(E){return this.pushStack(o.map(this,function(G,F){return E.call(G,F,G)}))},andSelf:function(){return this.add(this.prevObject)},domManip:function(J,M,L){if(this[0]){var I=(this[0].ownerDocument||this[0]).createDocumentFragment(),F=o.clean(J,(this[0].ownerDocument||this[0]),I),H=I.firstChild;if(H){for(var G=0,E=this.length;G<E;G++){L.call(K(this[G],H),this.length>1||G>0?I.cloneNode(true):I)}}if(F){o.each(F,z)}}return this;function K(N,O){return M&&o.nodeName(N,"table")&&o.nodeName(O,"tr")?(N.getElementsByTagName("tbody")[0]||N.appendChild(N.ownerDocument.createElement("tbody"))):N}}};o.fn.init.prototype=o.fn;function z(E,F){if(F.src){o.ajax({url:F.src,async:false,dataType:"script"})}else{o.globalEval(F.text||F.textContent||F.innerHTML||"")}if(F.parentNode){F.parentNode.removeChild(F)}}function e(){return +new Date}o.extend=o.fn.extend=function(){var J=arguments[0]||{},H=1,I=arguments.length,E=false,G;if(typeof J==="boolean"){E=J;J=arguments[1]||{};H=2}if(typeof J!=="object"&&!o.isFunction(J)){J={}}if(I==H){J=this;--H}for(;H<I;H++){if((G=arguments[H])!=null){for(var F in G){var K=J[F],L=G[F];if(J===L){continue}if(E&&L&&typeof L==="object"&&!L.nodeType){J[F]=o.extend(E,K||(L.length!=null?[]:{}),L)}else{if(L!==g){J[F]=L}}}}}return J};var b=/z-?index|font-?weight|opacity|zoom|line-?height/i,q=document.defaultView||{},s=Object.prototype.toString;o.extend({noConflict:function(E){l.$=p;if(E){l.jQuery=y}return o},isFunction:function(E){return s.call(E)==="[object Function]"},isArray:function(E){return s.call(E)==="[object Array]"},isXMLDoc:function(E){return E.nodeType===9&&E.documentElement.nodeName!=="HTML"||!!E.ownerDocument&&o.isXMLDoc(E.ownerDocument)},globalEval:function(G){if(G&&/\S/.test(G)){var F=document.getElementsByTagName("head")[0]||document.documentElement,E=document.createElement("script");E.type="text/javascript";if(o.support.scriptEval){E.appendChild(document.createTextNode(G))}else{E.text=G}F.insertBefore(E,F.firstChild);F.removeChild(E)}},nodeName:function(F,E){return F.nodeName&&F.nodeName.toUpperCase()==E.toUpperCase()},each:function(G,K,F){var E,H=0,I=G.length;if(F){if(I===g){for(E in G){if(K.apply(G[E],F)===false){break}}}else{for(;H<I;){if(K.apply(G[H++],F)===false){break}}}}else{if(I===g){for(E in G){if(K.call(G[E],E,G[E])===false){break}}}else{for(var J=G[0];H<I&&K.call(J,H,J)!==false;J=G[++H]){}}}return G},prop:function(H,I,G,F,E){if(o.isFunction(I)){I=I.call(H,F)}return typeof I==="number"&&G=="curCSS"&&!b.test(E)?I+"px":I},className:{add:function(E,F){o.each((F||"").split(/\s+/),function(G,H){if(E.nodeType==1&&!o.className.has(E.className,H)){E.className+=(E.className?" ":"")+H}})},remove:function(E,F){if(E.nodeType==1){E.className=F!==g?o.grep(E.className.split(/\s+/),function(G){return !o.className.has(F,G)}).join(" "):""}},has:function(F,E){return F&&o.inArray(E,(F.className||F).toString().split(/\s+/))>-1}},swap:function(H,G,I){var E={};for(var F in G){E[F]=H.style[F];H.style[F]=G[F]}I.call(H);for(var F in G){H.style[F]=E[F]}},css:function(H,F,J,E){if(F=="width"||F=="height"){var L,G={position:"absolute",visibility:"hidden",display:"block"},K=F=="width"?["Left","Right"]:["Top","Bottom"];function I(){L=F=="width"?H.offsetWidth:H.offsetHeight;if(E==="border"){return}o.each(K,function(){if(!E){L-=parseFloat(o.curCSS(H,"padding"+this,true))||0}if(E==="margin"){L+=parseFloat(o.curCSS(H,"margin"+this,true))||0}else{L-=parseFloat(o.curCSS(H,"border"+this+"Width",true))||0}})}if(H.offsetWidth!==0){I()}else{o.swap(H,G,I)}return Math.max(0,Math.round(L))}return o.curCSS(H,F,J)},curCSS:function(I,F,G){var L,E=I.style;if(F=="opacity"&&!o.support.opacity){L=o.attr(E,"opacity");return L==""?"1":L}if(F.match(/float/i)){F=w}if(!G&&E&&E[F]){L=E[F]}else{if(q.getComputedStyle){if(F.match(/float/i)){F="float"}F=F.replace(/([A-Z])/g,"-$1").toLowerCase();var M=q.getComputedStyle(I,null);if(M){L=M.getPropertyValue(F)}if(F=="opacity"&&L==""){L="1"}}else{if(I.currentStyle){var J=F.replace(/\-(\w)/g,function(N,O){return O.toUpperCase()});L=I.currentStyle[F]||I.currentStyle[J];if(!/^\d+(px)?$/i.test(L)&&/^\d/.test(L)){var H=E.left,K=I.runtimeStyle.left;I.runtimeStyle.left=I.currentStyle.left;E.left=L||0;L=E.pixelLeft+"px";E.left=H;I.runtimeStyle.left=K}}}}return L},clean:function(F,K,I){K=K||document;if(typeof K.createElement==="undefined"){K=K.ownerDocument||K[0]&&K[0].ownerDocument||document}if(!I&&F.length===1&&typeof F[0]==="string"){var H=/^<(\w+)\s*\/?>$/.exec(F[0]);if(H){return[K.createElement(H[1])]}}var G=[],E=[],L=K.createElement("div");o.each(F,function(P,S){if(typeof S==="number"){S+=""}if(!S){return}if(typeof S==="string"){S=S.replace(/(<(\w+)[^>]*?)\/>/g,function(U,V,T){return T.match(/^(abbr|br|col|img|input|link|meta|param|hr|area|embed)$/i)?U:V+"></"+T+">"});var O=S.replace(/^\s+/,"").substring(0,10).toLowerCase();var Q=!O.indexOf("<opt")&&[1,"<select multiple='multiple'>","</select>"]||!O.indexOf("<leg")&&[1,"<fieldset>","</fieldset>"]||O.match(/^<(thead|tbody|tfoot|colg|cap)/)&&[1,"<table>","</table>"]||!O.indexOf("<tr")&&[2,"<table><tbody>","</tbody></table>"]||(!O.indexOf("<td")||!O.indexOf("<th"))&&[3,"<table><tbody><tr>","</tr></tbody></table>"]||!O.indexOf("<col")&&[2,"<table><tbody></tbody><colgroup>","</colgroup></table>"]||!o.support.htmlSerialize&&[1,"div<div>","</div>"]||[0,"",""];L.innerHTML=Q[1]+S+Q[2];while(Q[0]--){L=L.lastChild}if(!o.support.tbody){var R=/<tbody/i.test(S),N=!O.indexOf("<table")&&!R?L.firstChild&&L.firstChild.childNodes:Q[1]=="<table>"&&!R?L.childNodes:[];for(var M=N.length-1;M>=0;--M){if(o.nodeName(N[M],"tbody")&&!N[M].childNodes.length){N[M].parentNode.removeChild(N[M])}}}if(!o.support.leadingWhitespace&&/^\s/.test(S)){L.insertBefore(K.createTextNode(S.match(/^\s*/)[0]),L.firstChild)}S=o.makeArray(L.childNodes)}if(S.nodeType){G.push(S)}else{G=o.merge(G,S)}});if(I){for(var J=0;G[J];J++){if(o.nodeName(G[J],"script")&&(!G[J].type||G[J].type.toLowerCase()==="text/javascript")){E.push(G[J].parentNode?G[J].parentNode.removeChild(G[J]):G[J])}else{if(G[J].nodeType===1){G.splice.apply(G,[J+1,0].concat(o.makeArray(G[J].getElementsByTagName("script"))))}I.appendChild(G[J])}}return E}return G},attr:function(J,G,K){if(!J||J.nodeType==3||J.nodeType==8){return g}var H=!o.isXMLDoc(J),L=K!==g;G=H&&o.props[G]||G;if(J.tagName){var F=/href|src|style/.test(G);if(G=="selected"&&J.parentNode){J.parentNode.selectedIndex}if(G in J&&H&&!F){if(L){if(G=="type"&&o.nodeName(J,"input")&&J.parentNode){throw"type property can't be changed"}J[G]=K}if(o.nodeName(J,"form")&&J.getAttributeNode(G)){return J.getAttributeNode(G).nodeValue}if(G=="tabIndex"){var I=J.getAttributeNode("tabIndex");return I&&I.specified?I.value:J.nodeName.match(/(button|input|object|select|textarea)/i)?0:J.nodeName.match(/^(a|area)$/i)&&J.href?0:g}return J[G]}if(!o.support.style&&H&&G=="style"){return o.attr(J.style,"cssText",K)}if(L){J.setAttribute(G,""+K)}var E=!o.support.hrefNormalized&&H&&F?J.getAttribute(G,2):J.getAttribute(G);return E===null?g:E}if(!o.support.opacity&&G=="opacity"){if(L){J.zoom=1;J.filter=(J.filter||"").replace(/alpha\([^)]*\)/,"")+(parseInt(K)+""=="NaN"?"":"alpha(opacity="+K*100+")")}return J.filter&&J.filter.indexOf("opacity=")>=0?(parseFloat(J.filter.match(/opacity=([^)]*)/)[1])/100)+"":""}G=G.replace(/-([a-z])/ig,function(M,N){return N.toUpperCase()});if(L){J[G]=K}return J[G]},trim:function(E){return(E||"").replace(/^\s+|\s+$/g,"")},makeArray:function(G){var E=[];if(G!=null){var F=G.length;if(F==null||typeof G==="string"||o.isFunction(G)||G.setInterval){E[0]=G}else{while(F){E[--F]=G[F]}}}return E},inArray:function(G,H){for(var E=0,F=H.length;E<F;E++){if(H[E]===G){return E}}return -1},merge:function(H,E){var F=0,G,I=H.length;if(!o.support.getAll){while((G=E[F++])!=null){if(G.nodeType!=8){H[I++]=G}}}else{while((G=E[F++])!=null){H[I++]=G}}return H},unique:function(K){var F=[],E={};try{for(var G=0,H=K.length;G<H;G++){var J=o.data(K[G]);if(!E[J]){E[J]=true;F.push(K[G])}}}catch(I){F=K}return F},grep:function(F,J,E){var G=[];for(var H=0,I=F.length;H<I;H++){if(!E!=!J(F[H],H)){G.push(F[H])}}return G},map:function(E,J){var F=[];for(var G=0,H=E.length;G<H;G++){var I=J(E[G],G);if(I!=null){F[F.length]=I}}return F.concat.apply([],F)}});var C=navigator.userAgent.toLowerCase();o.browser={version:(C.match(/.+(?:rv|it|ra|ie)[\/: ]([\d.]+)/)||[0,"0"])[1],safari:/webkit/.test(C),opera:/opera/.test(C),msie:/msie/.test(C)&&!/opera/.test(C),mozilla:/mozilla/.test(C)&&!/(compatible|webkit)/.test(C)};o.each({parent:function(E){return E.parentNode},parents:function(E){return o.dir(E,"parentNode")},next:function(E){return o.nth(E,2,"nextSibling")},prev:function(E){return o.nth(E,2,"previousSibling")},nextAll:function(E){return o.dir(E,"nextSibling")},prevAll:function(E){return o.dir(E,"previousSibling")},siblings:function(E){return o.sibling(E.parentNode.firstChild,E)},children:function(E){return o.sibling(E.firstChild)},contents:function(E){return o.nodeName(E,"iframe")?E.contentDocument||E.contentWindow.document:o.makeArray(E.childNodes)}},function(E,F){o.fn[E]=function(G){var H=o.map(this,F);if(G&&typeof G=="string"){H=o.multiFilter(G,H)}return this.pushStack(o.unique(H),E,G)}});o.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(E,F){o.fn[E]=function(G){var J=[],L=o(G);for(var K=0,H=L.length;K<H;K++){var I=(K>0?this.clone(true):this).get();o.fn[F].apply(o(L[K]),I);J=J.concat(I)}return this.pushStack(J,E,G)}});o.each({removeAttr:function(E){o.attr(this,E,"");if(this.nodeType==1){this.removeAttribute(E)}},addClass:function(E){o.className.add(this,E)},removeClass:function(E){o.className.remove(this,E)},toggleClass:function(F,E){if(typeof E!=="boolean"){E=!o.className.has(this,F)}o.className[E?"add":"remove"](this,F)},remove:function(E){if(!E||o.filter(E,[this]).length){o("*",this).add([this]).each(function(){o.event.remove(this);o.removeData(this)});if(this.parentNode){this.parentNode.removeChild(this)}}},empty:function(){o(this).children().remove();while(this.firstChild){this.removeChild(this.firstChild)}}},function(E,F){o.fn[E]=function(){return this.each(F,arguments)}});function j(E,F){return E[0]&&parseInt(o.curCSS(E[0],F,true),10)||0}var h="jQuery"+e(),v=0,A={};o.extend({cache:{},data:function(F,E,G){F=F==l?A:F;var H=F[h];if(!H){H=F[h]=++v}if(E&&!o.cache[H]){o.cache[H]={}}if(G!==g){o.cache[H][E]=G}return E?o.cache[H][E]:H},removeData:function(F,E){F=F==l?A:F;var H=F[h];if(E){if(o.cache[H]){delete o.cache[H][E];E="";for(E in o.cache[H]){break}if(!E){o.removeData(F)}}}else{try{delete F[h]}catch(G){if(F.removeAttribute){F.removeAttribute(h)}}delete o.cache[H]}},queue:function(F,E,H){if(F){E=(E||"fx")+"queue";var G=o.data(F,E);if(!G||o.isArray(H)){G=o.data(F,E,o.makeArray(H))}else{if(H){G.push(H)}}}return G},dequeue:function(H,G){var E=o.queue(H,G),F=E.shift();if(!G||G==="fx"){F=E[0]}if(F!==g){F.call(H)}}});o.fn.extend({data:function(E,G){var H=E.split(".");H[1]=H[1]?"."+H[1]:"";if(G===g){var F=this.triggerHandler("getData"+H[1]+"!",[H[0]]);if(F===g&&this.length){F=o.data(this[0],E)}return F===g&&H[1]?this.data(H[0]):F}else{return this.trigger("setData"+H[1]+"!",[H[0],G]).each(function(){o.data(this,E,G)})}},removeData:function(E){return this.each(function(){o.removeData(this,E)})},queue:function(E,F){if(typeof E!=="string"){F=E;E="fx"}if(F===g){return o.queue(this[0],E)}return this.each(function(){var G=o.queue(this,E,F);if(E=="fx"&&G.length==1){G[0].call(this)}})},dequeue:function(E){return this.each(function(){o.dequeue(this,E)})}});
/*
 * Sizzle CSS Selector Engine - v0.9.3
 *  Copyright 2009, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
(function(){var R=/((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^[\]]*\]|['"][^'"]*['"]|[^[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?/g,L=0,H=Object.prototype.toString;var F=function(Y,U,ab,ac){ab=ab||[];U=U||document;if(U.nodeType!==1&&U.nodeType!==9){return[]}if(!Y||typeof Y!=="string"){return ab}var Z=[],W,af,ai,T,ad,V,X=true;R.lastIndex=0;while((W=R.exec(Y))!==null){Z.push(W[1]);if(W[2]){V=RegExp.rightContext;break}}if(Z.length>1&&M.exec(Y)){if(Z.length===2&&I.relative[Z[0]]){af=J(Z[0]+Z[1],U)}else{af=I.relative[Z[0]]?[U]:F(Z.shift(),U);while(Z.length){Y=Z.shift();if(I.relative[Y]){Y+=Z.shift()}af=J(Y,af)}}}else{var ae=ac?{expr:Z.pop(),set:E(ac)}:F.find(Z.pop(),Z.length===1&&U.parentNode?U.parentNode:U,Q(U));af=F.filter(ae.expr,ae.set);if(Z.length>0){ai=E(af)}else{X=false}while(Z.length){var ah=Z.pop(),ag=ah;if(!I.relative[ah]){ah=""}else{ag=Z.pop()}if(ag==null){ag=U}I.relative[ah](ai,ag,Q(U))}}if(!ai){ai=af}if(!ai){throw"Syntax error, unrecognized expression: "+(ah||Y)}if(H.call(ai)==="[object Array]"){if(!X){ab.push.apply(ab,ai)}else{if(U.nodeType===1){for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&(ai[aa]===true||ai[aa].nodeType===1&&K(U,ai[aa]))){ab.push(af[aa])}}}else{for(var aa=0;ai[aa]!=null;aa++){if(ai[aa]&&ai[aa].nodeType===1){ab.push(af[aa])}}}}}else{E(ai,ab)}if(V){F(V,U,ab,ac);if(G){hasDuplicate=false;ab.sort(G);if(hasDuplicate){for(var aa=1;aa<ab.length;aa++){if(ab[aa]===ab[aa-1]){ab.splice(aa--,1)}}}}}return ab};F.matches=function(T,U){return F(T,null,null,U)};F.find=function(aa,T,ab){var Z,X;if(!aa){return[]}for(var W=0,V=I.order.length;W<V;W++){var Y=I.order[W],X;if((X=I.match[Y].exec(aa))){var U=RegExp.leftContext;if(U.substr(U.length-1)!=="\\"){X[1]=(X[1]||"").replace(/\\/g,"");Z=I.find[Y](X,T,ab);if(Z!=null){aa=aa.replace(I.match[Y],"");break}}}}if(!Z){Z=T.getElementsByTagName("*")}return{set:Z,expr:aa}};F.filter=function(ad,ac,ag,W){var V=ad,ai=[],aa=ac,Y,T,Z=ac&&ac[0]&&Q(ac[0]);while(ad&&ac.length){for(var ab in I.filter){if((Y=I.match[ab].exec(ad))!=null){var U=I.filter[ab],ah,af;T=false;if(aa==ai){ai=[]}if(I.preFilter[ab]){Y=I.preFilter[ab](Y,aa,ag,ai,W,Z);if(!Y){T=ah=true}else{if(Y===true){continue}}}if(Y){for(var X=0;(af=aa[X])!=null;X++){if(af){ah=U(af,Y,X,aa);var ae=W^!!ah;if(ag&&ah!=null){if(ae){T=true}else{aa[X]=false}}else{if(ae){ai.push(af);T=true}}}}}if(ah!==g){if(!ag){aa=ai}ad=ad.replace(I.match[ab],"");if(!T){return[]}break}}}if(ad==V){if(T==null){throw"Syntax error, unrecognized expression: "+ad}else{break}}V=ad}return aa};var I=F.selectors={order:["ID","NAME","TAG"],match:{ID:/#((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,CLASS:/\.((?:[\w\u00c0-\uFFFF_-]|\\.)+)/,NAME:/\[name=['"]*((?:[\w\u00c0-\uFFFF_-]|\\.)+)['"]*\]/,ATTR:/\[\s*((?:[\w\u00c0-\uFFFF_-]|\\.)+)\s*(?:(\S?=)\s*(['"]*)(.*?)\3|)\s*\]/,TAG:/^((?:[\w\u00c0-\uFFFF\*_-]|\\.)+)/,CHILD:/:(only|nth|last|first)-child(?:\((even|odd|[\dn+-]*)\))?/,POS:/:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^-]|$)/,PSEUDO:/:((?:[\w\u00c0-\uFFFF_-]|\\.)+)(?:\((['"]*)((?:\([^\)]+\)|[^\2\(\)]*)+)\2\))?/},attrMap:{"class":"className","for":"htmlFor"},attrHandle:{href:function(T){return T.getAttribute("href")}},relative:{"+":function(aa,T,Z){var X=typeof T==="string",ab=X&&!/\W/.test(T),Y=X&&!ab;if(ab&&!Z){T=T.toUpperCase()}for(var W=0,V=aa.length,U;W<V;W++){if((U=aa[W])){while((U=U.previousSibling)&&U.nodeType!==1){}aa[W]=Y||U&&U.nodeName===T?U||false:U===T}}if(Y){F.filter(T,aa,true)}},">":function(Z,U,aa){var X=typeof U==="string";if(X&&!/\W/.test(U)){U=aa?U:U.toUpperCase();for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){var W=Y.parentNode;Z[V]=W.nodeName===U?W:false}}}else{for(var V=0,T=Z.length;V<T;V++){var Y=Z[V];if(Y){Z[V]=X?Y.parentNode:Y.parentNode===U}}if(X){F.filter(U,Z,true)}}},"":function(W,U,Y){var V=L++,T=S;if(!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("parentNode",U,V,W,X,Y)},"~":function(W,U,Y){var V=L++,T=S;if(typeof U==="string"&&!U.match(/\W/)){var X=U=Y?U:U.toUpperCase();T=P}T("previousSibling",U,V,W,X,Y)}},find:{ID:function(U,V,W){if(typeof V.getElementById!=="undefined"&&!W){var T=V.getElementById(U[1]);return T?[T]:[]}},NAME:function(V,Y,Z){if(typeof Y.getElementsByName!=="undefined"){var U=[],X=Y.getElementsByName(V[1]);for(var W=0,T=X.length;W<T;W++){if(X[W].getAttribute("name")===V[1]){U.push(X[W])}}return U.length===0?null:U}},TAG:function(T,U){return U.getElementsByTagName(T[1])}},preFilter:{CLASS:function(W,U,V,T,Z,aa){W=" "+W[1].replace(/\\/g,"")+" ";if(aa){return W}for(var X=0,Y;(Y=U[X])!=null;X++){if(Y){if(Z^(Y.className&&(" "+Y.className+" ").indexOf(W)>=0)){if(!V){T.push(Y)}}else{if(V){U[X]=false}}}}return false},ID:function(T){return T[1].replace(/\\/g,"")},TAG:function(U,T){for(var V=0;T[V]===false;V++){}return T[V]&&Q(T[V])?U[1]:U[1].toUpperCase()},CHILD:function(T){if(T[1]=="nth"){var U=/(-?)(\d*)n((?:\+|-)?\d*)/.exec(T[2]=="even"&&"2n"||T[2]=="odd"&&"2n+1"||!/\D/.test(T[2])&&"0n+"+T[2]||T[2]);T[2]=(U[1]+(U[2]||1))-0;T[3]=U[3]-0}T[0]=L++;return T},ATTR:function(X,U,V,T,Y,Z){var W=X[1].replace(/\\/g,"");if(!Z&&I.attrMap[W]){X[1]=I.attrMap[W]}if(X[2]==="~="){X[4]=" "+X[4]+" "}return X},PSEUDO:function(X,U,V,T,Y){if(X[1]==="not"){if(X[3].match(R).length>1||/^\w/.test(X[3])){X[3]=F(X[3],null,null,U)}else{var W=F.filter(X[3],U,V,true^Y);if(!V){T.push.apply(T,W)}return false}}else{if(I.match.POS.test(X[0])||I.match.CHILD.test(X[0])){return true}}return X},POS:function(T){T.unshift(true);return T}},filters:{enabled:function(T){return T.disabled===false&&T.type!=="hidden"},disabled:function(T){return T.disabled===true},checked:function(T){return T.checked===true},selected:function(T){T.parentNode.selectedIndex;return T.selected===true},parent:function(T){return !!T.firstChild},empty:function(T){return !T.firstChild},has:function(V,U,T){return !!F(T[3],V).length},header:function(T){return/h\d/i.test(T.nodeName)},text:function(T){return"text"===T.type},radio:function(T){return"radio"===T.type},checkbox:function(T){return"checkbox"===T.type},file:function(T){return"file"===T.type},password:function(T){return"password"===T.type},submit:function(T){return"submit"===T.type},image:function(T){return"image"===T.type},reset:function(T){return"reset"===T.type},button:function(T){return"button"===T.type||T.nodeName.toUpperCase()==="BUTTON"},input:function(T){return/input|select|textarea|button/i.test(T.nodeName)}},setFilters:{first:function(U,T){return T===0},last:function(V,U,T,W){return U===W.length-1},even:function(U,T){return T%2===0},odd:function(U,T){return T%2===1},lt:function(V,U,T){return U<T[3]-0},gt:function(V,U,T){return U>T[3]-0},nth:function(V,U,T){return T[3]-0==U},eq:function(V,U,T){return T[3]-0==U}},filter:{PSEUDO:function(Z,V,W,aa){var U=V[1],X=I.filters[U];if(X){return X(Z,W,V,aa)}else{if(U==="contains"){return(Z.textContent||Z.innerText||"").indexOf(V[3])>=0}else{if(U==="not"){var Y=V[3];for(var W=0,T=Y.length;W<T;W++){if(Y[W]===Z){return false}}return true}}}},CHILD:function(T,W){var Z=W[1],U=T;switch(Z){case"only":case"first":while(U=U.previousSibling){if(U.nodeType===1){return false}}if(Z=="first"){return true}U=T;case"last":while(U=U.nextSibling){if(U.nodeType===1){return false}}return true;case"nth":var V=W[2],ac=W[3];if(V==1&&ac==0){return true}var Y=W[0],ab=T.parentNode;if(ab&&(ab.sizcache!==Y||!T.nodeIndex)){var X=0;for(U=ab.firstChild;U;U=U.nextSibling){if(U.nodeType===1){U.nodeIndex=++X}}ab.sizcache=Y}var aa=T.nodeIndex-ac;if(V==0){return aa==0}else{return(aa%V==0&&aa/V>=0)}}},ID:function(U,T){return U.nodeType===1&&U.getAttribute("id")===T},TAG:function(U,T){return(T==="*"&&U.nodeType===1)||U.nodeName===T},CLASS:function(U,T){return(" "+(U.className||U.getAttribute("class"))+" ").indexOf(T)>-1},ATTR:function(Y,W){var V=W[1],T=I.attrHandle[V]?I.attrHandle[V](Y):Y[V]!=null?Y[V]:Y.getAttribute(V),Z=T+"",X=W[2],U=W[4];return T==null?X==="!=":X==="="?Z===U:X==="*="?Z.indexOf(U)>=0:X==="~="?(" "+Z+" ").indexOf(U)>=0:!U?Z&&T!==false:X==="!="?Z!=U:X==="^="?Z.indexOf(U)===0:X==="$="?Z.substr(Z.length-U.length)===U:X==="|="?Z===U||Z.substr(0,U.length+1)===U+"-":false},POS:function(X,U,V,Y){var T=U[2],W=I.setFilters[T];if(W){return W(X,V,U,Y)}}}};var M=I.match.POS;for(var O in I.match){I.match[O]=RegExp(I.match[O].source+/(?![^\[]*\])(?![^\(]*\))/.source)}var E=function(U,T){U=Array.prototype.slice.call(U);if(T){T.push.apply(T,U);return T}return U};try{Array.prototype.slice.call(document.documentElement.childNodes)}catch(N){E=function(X,W){var U=W||[];if(H.call(X)==="[object Array]"){Array.prototype.push.apply(U,X)}else{if(typeof X.length==="number"){for(var V=0,T=X.length;V<T;V++){U.push(X[V])}}else{for(var V=0;X[V];V++){U.push(X[V])}}}return U}}var G;if(document.documentElement.compareDocumentPosition){G=function(U,T){var V=U.compareDocumentPosition(T)&4?-1:U===T?0:1;if(V===0){hasDuplicate=true}return V}}else{if("sourceIndex" in document.documentElement){G=function(U,T){var V=U.sourceIndex-T.sourceIndex;if(V===0){hasDuplicate=true}return V}}else{if(document.createRange){G=function(W,U){var V=W.ownerDocument.createRange(),T=U.ownerDocument.createRange();V.selectNode(W);V.collapse(true);T.selectNode(U);T.collapse(true);var X=V.compareBoundaryPoints(Range.START_TO_END,T);if(X===0){hasDuplicate=true}return X}}}}(function(){var U=document.createElement("form"),V="script"+(new Date).getTime();U.innerHTML="<input name='"+V+"'/>";var T=document.documentElement;T.insertBefore(U,T.firstChild);if(!!document.getElementById(V)){I.find.ID=function(X,Y,Z){if(typeof Y.getElementById!=="undefined"&&!Z){var W=Y.getElementById(X[1]);return W?W.id===X[1]||typeof W.getAttributeNode!=="undefined"&&W.getAttributeNode("id").nodeValue===X[1]?[W]:g:[]}};I.filter.ID=function(Y,W){var X=typeof Y.getAttributeNode!=="undefined"&&Y.getAttributeNode("id");return Y.nodeType===1&&X&&X.nodeValue===W}}T.removeChild(U)})();(function(){var T=document.createElement("div");T.appendChild(document.createComment(""));if(T.getElementsByTagName("*").length>0){I.find.TAG=function(U,Y){var X=Y.getElementsByTagName(U[1]);if(U[1]==="*"){var W=[];for(var V=0;X[V];V++){if(X[V].nodeType===1){W.push(X[V])}}X=W}return X}}T.innerHTML="<a href='#'></a>";if(T.firstChild&&typeof T.firstChild.getAttribute!=="undefined"&&T.firstChild.getAttribute("href")!=="#"){I.attrHandle.href=function(U){return U.getAttribute("href",2)}}})();if(document.querySelectorAll){(function(){var T=F,U=document.createElement("div");U.innerHTML="<p class='TEST'></p>";if(U.querySelectorAll&&U.querySelectorAll(".TEST").length===0){return}F=function(Y,X,V,W){X=X||document;if(!W&&X.nodeType===9&&!Q(X)){try{return E(X.querySelectorAll(Y),V)}catch(Z){}}return T(Y,X,V,W)};F.find=T.find;F.filter=T.filter;F.selectors=T.selectors;F.matches=T.matches})()}if(document.getElementsByClassName&&document.documentElement.getElementsByClassName){(function(){var T=document.createElement("div");T.innerHTML="<div class='test e'></div><div class='test'></div>";if(T.getElementsByClassName("e").length===0){return}T.lastChild.className="e";if(T.getElementsByClassName("e").length===1){return}I.order.splice(1,0,"CLASS");I.find.CLASS=function(U,V,W){if(typeof V.getElementsByClassName!=="undefined"&&!W){return V.getElementsByClassName(U[1])}}})()}function P(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1&&!ac){T.sizcache=Y;T.sizset=W}if(T.nodeName===Z){X=T;break}T=T[U]}ad[W]=X}}}function S(U,Z,Y,ad,aa,ac){var ab=U=="previousSibling"&&!ac;for(var W=0,V=ad.length;W<V;W++){var T=ad[W];if(T){if(ab&&T.nodeType===1){T.sizcache=Y;T.sizset=W}T=T[U];var X=false;while(T){if(T.sizcache===Y){X=ad[T.sizset];break}if(T.nodeType===1){if(!ac){T.sizcache=Y;T.sizset=W}if(typeof Z!=="string"){if(T===Z){X=true;break}}else{if(F.filter(Z,[T]).length>0){X=T;break}}}T=T[U]}ad[W]=X}}}var K=document.compareDocumentPosition?function(U,T){return U.compareDocumentPosition(T)&16}:function(U,T){return U!==T&&(U.contains?U.contains(T):true)};var Q=function(T){return T.nodeType===9&&T.documentElement.nodeName!=="HTML"||!!T.ownerDocument&&Q(T.ownerDocument)};var J=function(T,aa){var W=[],X="",Y,V=aa.nodeType?[aa]:aa;while((Y=I.match.PSEUDO.exec(T))){X+=Y[0];T=T.replace(I.match.PSEUDO,"")}T=I.relative[T]?T+"*":T;for(var Z=0,U=V.length;Z<U;Z++){F(T,V[Z],W)}return F.filter(X,W)};o.find=F;o.filter=F.filter;o.expr=F.selectors;o.expr[":"]=o.expr.filters;F.selectors.filters.hidden=function(T){return T.offsetWidth===0||T.offsetHeight===0};F.selectors.filters.visible=function(T){return T.offsetWidth>0||T.offsetHeight>0};F.selectors.filters.animated=function(T){return o.grep(o.timers,function(U){return T===U.elem}).length};o.multiFilter=function(V,T,U){if(U){V=":not("+V+")"}return F.matches(V,T)};o.dir=function(V,U){var T=[],W=V[U];while(W&&W!=document){if(W.nodeType==1){T.push(W)}W=W[U]}return T};o.nth=function(X,T,V,W){T=T||1;var U=0;for(;X;X=X[V]){if(X.nodeType==1&&++U==T){break}}return X};o.sibling=function(V,U){var T=[];for(;V;V=V.nextSibling){if(V.nodeType==1&&V!=U){T.push(V)}}return T};return;l.Sizzle=F})();o.event={add:function(I,F,H,K){if(I.nodeType==3||I.nodeType==8){return}if(I.setInterval&&I!=l){I=l}if(!H.guid){H.guid=this.guid++}if(K!==g){var G=H;H=this.proxy(G);H.data=K}var E=o.data(I,"events")||o.data(I,"events",{}),J=o.data(I,"handle")||o.data(I,"handle",function(){return typeof o!=="undefined"&&!o.event.triggered?o.event.handle.apply(arguments.callee.elem,arguments):g});J.elem=I;o.each(F.split(/\s+/),function(M,N){var O=N.split(".");N=O.shift();H.type=O.slice().sort().join(".");var L=E[N];if(o.event.specialAll[N]){o.event.specialAll[N].setup.call(I,K,O)}if(!L){L=E[N]={};if(!o.event.special[N]||o.event.special[N].setup.call(I,K,O)===false){if(I.addEventListener){I.addEventListener(N,J,false)}else{if(I.attachEvent){I.attachEvent("on"+N,J)}}}}L[H.guid]=H;o.event.global[N]=true});I=null},guid:1,global:{},remove:function(K,H,J){if(K.nodeType==3||K.nodeType==8){return}var G=o.data(K,"events"),F,E;if(G){if(H===g||(typeof H==="string"&&H.charAt(0)==".")){for(var I in G){this.remove(K,I+(H||""))}}else{if(H.type){J=H.handler;H=H.type}o.each(H.split(/\s+/),function(M,O){var Q=O.split(".");O=Q.shift();var N=RegExp("(^|\\.)"+Q.slice().sort().join(".*\\.")+"(\\.|$)");if(G[O]){if(J){delete G[O][J.guid]}else{for(var P in G[O]){if(N.test(G[O][P].type)){delete G[O][P]}}}if(o.event.specialAll[O]){o.event.specialAll[O].teardown.call(K,Q)}for(F in G[O]){break}if(!F){if(!o.event.special[O]||o.event.special[O].teardown.call(K,Q)===false){if(K.removeEventListener){K.removeEventListener(O,o.data(K,"handle"),false)}else{if(K.detachEvent){K.detachEvent("on"+O,o.data(K,"handle"))}}}F=null;delete G[O]}}})}for(F in G){break}if(!F){var L=o.data(K,"handle");if(L){L.elem=null}o.removeData(K,"events");o.removeData(K,"handle")}}},trigger:function(I,K,H,E){var G=I.type||I;if(!E){I=typeof I==="object"?I[h]?I:o.extend(o.Event(G),I):o.Event(G);if(G.indexOf("!")>=0){I.type=G=G.slice(0,-1);I.exclusive=true}if(!H){I.stopPropagation();if(this.global[G]){o.each(o.cache,function(){if(this.events&&this.events[G]){o.event.trigger(I,K,this.handle.elem)}})}}if(!H||H.nodeType==3||H.nodeType==8){return g}I.result=g;I.target=H;K=o.makeArray(K);K.unshift(I)}I.currentTarget=H;var J=o.data(H,"handle");if(J){J.apply(H,K)}if((!H[G]||(o.nodeName(H,"a")&&G=="click"))&&H["on"+G]&&H["on"+G].apply(H,K)===false){I.result=false}if(!E&&H[G]&&!I.isDefaultPrevented()&&!(o.nodeName(H,"a")&&G=="click")){this.triggered=true;try{H[G]()}catch(L){}}this.triggered=false;if(!I.isPropagationStopped()){var F=H.parentNode||H.ownerDocument;if(F){o.event.trigger(I,K,F,true)}}},handle:function(K){var J,E;K=arguments[0]=o.event.fix(K||l.event);K.currentTarget=this;var L=K.type.split(".");K.type=L.shift();J=!L.length&&!K.exclusive;var I=RegExp("(^|\\.)"+L.slice().sort().join(".*\\.")+"(\\.|$)");E=(o.data(this,"events")||{})[K.type];for(var G in E){var H=E[G];if(J||I.test(H.type)){K.handler=H;K.data=H.data;var F=H.apply(this,arguments);if(F!==g){K.result=F;if(F===false){K.preventDefault();K.stopPropagation()}}if(K.isImmediatePropagationStopped()){break}}}},props:"altKey attrChange attrName bubbles button cancelable charCode clientX clientY ctrlKey currentTarget data detail eventPhase fromElement handler keyCode metaKey newValue originalTarget pageX pageY prevValue relatedNode relatedTarget screenX screenY shiftKey srcElement target toElement view wheelDelta which".split(" "),fix:function(H){if(H[h]){return H}var F=H;H=o.Event(F);for(var G=this.props.length,J;G;){J=this.props[--G];H[J]=F[J]}if(!H.target){H.target=H.srcElement||document}if(H.target.nodeType==3){H.target=H.target.parentNode}if(!H.relatedTarget&&H.fromElement){H.relatedTarget=H.fromElement==H.target?H.toElement:H.fromElement}if(H.pageX==null&&H.clientX!=null){var I=document.documentElement,E=document.body;H.pageX=H.clientX+(I&&I.scrollLeft||E&&E.scrollLeft||0)-(I.clientLeft||0);H.pageY=H.clientY+(I&&I.scrollTop||E&&E.scrollTop||0)-(I.clientTop||0)}if(!H.which&&((H.charCode||H.charCode===0)?H.charCode:H.keyCode)){H.which=H.charCode||H.keyCode}if(!H.metaKey&&H.ctrlKey){H.metaKey=H.ctrlKey}if(!H.which&&H.button){H.which=(H.button&1?1:(H.button&2?3:(H.button&4?2:0)))}return H},proxy:function(F,E){E=E||function(){return F.apply(this,arguments)};E.guid=F.guid=F.guid||E.guid||this.guid++;return E},special:{ready:{setup:B,teardown:function(){}}},specialAll:{live:{setup:function(E,F){o.event.add(this,F[0],c)},teardown:function(G){if(G.length){var E=0,F=RegExp("(^|\\.)"+G[0]+"(\\.|$)");o.each((o.data(this,"events").live||{}),function(){if(F.test(this.type)){E++}});if(E<1){o.event.remove(this,G[0],c)}}}}}};o.Event=function(E){if(!this.preventDefault){return new o.Event(E)}if(E&&E.type){this.originalEvent=E;this.type=E.type}else{this.type=E}this.timeStamp=e();this[h]=true};function k(){return false}function u(){return true}o.Event.prototype={preventDefault:function(){this.isDefaultPrevented=u;var E=this.originalEvent;if(!E){return}if(E.preventDefault){E.preventDefault()}E.returnValue=false},stopPropagation:function(){this.isPropagationStopped=u;var E=this.originalEvent;if(!E){return}if(E.stopPropagation){E.stopPropagation()}E.cancelBubble=true},stopImmediatePropagation:function(){this.isImmediatePropagationStopped=u;this.stopPropagation()},isDefaultPrevented:k,isPropagationStopped:k,isImmediatePropagationStopped:k};var a=function(F){var E=F.relatedTarget;while(E&&E!=this){try{E=E.parentNode}catch(G){E=this}}if(E!=this){F.type=F.data;o.event.handle.apply(this,arguments)}};o.each({mouseover:"mouseenter",mouseout:"mouseleave"},function(F,E){o.event.special[E]={setup:function(){o.event.add(this,F,a,E)},teardown:function(){o.event.remove(this,F,a)}}});o.fn.extend({bind:function(F,G,E){return F=="unload"?this.one(F,G,E):this.each(function(){o.event.add(this,F,E||G,E&&G)})},one:function(G,H,F){var E=o.event.proxy(F||H,function(I){o(this).unbind(I,E);return(F||H).apply(this,arguments)});return this.each(function(){o.event.add(this,G,E,F&&H)})},unbind:function(F,E){return this.each(function(){o.event.remove(this,F,E)})},trigger:function(E,F){return this.each(function(){o.event.trigger(E,F,this)})},triggerHandler:function(E,G){if(this[0]){var F=o.Event(E);F.preventDefault();F.stopPropagation();o.event.trigger(F,G,this[0]);return F.result}},toggle:function(G){var E=arguments,F=1;while(F<E.length){o.event.proxy(G,E[F++])}return this.click(o.event.proxy(G,function(H){this.lastToggle=(this.lastToggle||0)%F;H.preventDefault();return E[this.lastToggle++].apply(this,arguments)||false}))},hover:function(E,F){return this.mouseenter(E).mouseleave(F)},ready:function(E){B();if(o.isReady){E.call(document,o)}else{o.readyList.push(E)}return this},live:function(G,F){var E=o.event.proxy(F);E.guid+=this.selector+G;o(document).bind(i(G,this.selector),this.selector,E);return this},die:function(F,E){o(document).unbind(i(F,this.selector),E?{guid:E.guid+this.selector+F}:null);return this}});function c(H){var E=RegExp("(^|\\.)"+H.type+"(\\.|$)"),G=true,F=[];o.each(o.data(this,"events").live||[],function(I,J){if(E.test(J.type)){var K=o(H.target).closest(J.data)[0];if(K){F.push({elem:K,fn:J})}}});F.sort(function(J,I){return o.data(J.elem,"closest")-o.data(I.elem,"closest")});o.each(F,function(){if(this.fn.call(this.elem,H,this.fn.data)===false){return(G=false)}});return G}function i(F,E){return["live",F,E.replace(/\./g,"`").replace(/ /g,"|")].join(".")}o.extend({isReady:false,readyList:[],ready:function(){if(!o.isReady){o.isReady=true;if(o.readyList){o.each(o.readyList,function(){this.call(document,o)});o.readyList=null}o(document).triggerHandler("ready")}}});var x=false;function B(){if(x){return}x=true;if(document.addEventListener){document.addEventListener("DOMContentLoaded",function(){document.removeEventListener("DOMContentLoaded",arguments.callee,false);o.ready()},false)}else{if(document.attachEvent){document.attachEvent("onreadystatechange",function(){if(document.readyState==="complete"){document.detachEvent("onreadystatechange",arguments.callee);o.ready()}});if(document.documentElement.doScroll&&l==l.top){(function(){if(o.isReady){return}try{document.documentElement.doScroll("left")}catch(E){setTimeout(arguments.callee,0);return}o.ready()})()}}}o.event.add(l,"load",o.ready)}o.each(("blur,focus,load,resize,scroll,unload,click,dblclick,mousedown,mouseup,mousemove,mouseover,mouseout,mouseenter,mouseleave,change,select,submit,keydown,keypress,keyup,error").split(","),function(F,E){o.fn[E]=function(G){return G?this.bind(E,G):this.trigger(E)}});o(l).bind("unload",function(){for(var E in o.cache){if(E!=1&&o.cache[E].handle){o.event.remove(o.cache[E].handle.elem)}}});(function(){o.support={};var F=document.documentElement,G=document.createElement("script"),K=document.createElement("div"),J="script"+(new Date).getTime();K.style.display="none";K.innerHTML='   <link/><table></table><a href="/a" style="color:red;float:left;opacity:.5;">a</a><select><option>text</option></select><object><param/></object>';var H=K.getElementsByTagName("*"),E=K.getElementsByTagName("a")[0];if(!H||!H.length||!E){return}o.support={leadingWhitespace:K.firstChild.nodeType==3,tbody:!K.getElementsByTagName("tbody").length,objectAll:!!K.getElementsByTagName("object")[0].getElementsByTagName("*").length,htmlSerialize:!!K.getElementsByTagName("link").length,style:/red/.test(E.getAttribute("style")),hrefNormalized:E.getAttribute("href")==="/a",opacity:E.style.opacity==="0.5",cssFloat:!!E.style.cssFloat,scriptEval:false,noCloneEvent:true,boxModel:null};G.type="text/javascript";try{G.appendChild(document.createTextNode("window."+J+"=1;"))}catch(I){}F.insertBefore(G,F.firstChild);if(l[J]){o.support.scriptEval=true;delete l[J]}F.removeChild(G);if(K.attachEvent&&K.fireEvent){K.attachEvent("onclick",function(){o.support.noCloneEvent=false;K.detachEvent("onclick",arguments.callee)});K.cloneNode(true).fireEvent("onclick")}o(function(){var L=document.createElement("div");L.style.width=L.style.paddingLeft="1px";document.body.appendChild(L);o.boxModel=o.support.boxModel=L.offsetWidth===2;document.body.removeChild(L).style.display="none"})})();var w=o.support.cssFloat?"cssFloat":"styleFloat";o.props={"for":"htmlFor","class":"className","float":w,cssFloat:w,styleFloat:w,readonly:"readOnly",maxlength:"maxLength",cellspacing:"cellSpacing",rowspan:"rowSpan",tabindex:"tabIndex"};o.fn.extend({_load:o.fn.load,load:function(G,J,K){if(typeof G!=="string"){return this._load(G)}var I=G.indexOf(" ");if(I>=0){var E=G.slice(I,G.length);G=G.slice(0,I)}var H="GET";if(J){if(o.isFunction(J)){K=J;J=null}else{if(typeof J==="object"){J=o.param(J);H="POST"}}}var F=this;o.ajax({url:G,type:H,dataType:"html",data:J,complete:function(M,L){if(L=="success"||L=="notmodified"){F.html(E?o("<div/>").append(M.responseText.replace(/<script(.|\s)*?\/script>/g,"")).find(E):M.responseText)}if(K){F.each(K,[M.responseText,L,M])}}});return this},serialize:function(){return o.param(this.serializeArray())},serializeArray:function(){return this.map(function(){return this.elements?o.makeArray(this.elements):this}).filter(function(){return this.name&&!this.disabled&&(this.checked||/select|textarea/i.test(this.nodeName)||/text|hidden|password|search/i.test(this.type))}).map(function(E,F){var G=o(this).val();return G==null?null:o.isArray(G)?o.map(G,function(I,H){return{name:F.name,value:I}}):{name:F.name,value:G}}).get()}});o.each("ajaxStart,ajaxStop,ajaxComplete,ajaxError,ajaxSuccess,ajaxSend".split(","),function(E,F){o.fn[F]=function(G){return this.bind(F,G)}});var r=e();o.extend({get:function(E,G,H,F){if(o.isFunction(G)){H=G;G=null}return o.ajax({type:"GET",url:E,data:G,success:H,dataType:F})},getScript:function(E,F){return o.get(E,null,F,"script")},getJSON:function(E,F,G){return o.get(E,F,G,"json")},post:function(E,G,H,F){if(o.isFunction(G)){H=G;G={}}return o.ajax({type:"POST",url:E,data:G,success:H,dataType:F})},ajaxSetup:function(E){o.extend(o.ajaxSettings,E)},ajaxSettings:{url:location.href,global:true,type:"GET",contentType:"application/x-www-form-urlencoded",processData:true,async:true,xhr:function(){return l.ActiveXObject?new ActiveXObject("Microsoft.XMLHTTP"):new XMLHttpRequest()},accepts:{xml:"application/xml, text/xml",html:"text/html",script:"text/javascript, application/javascript",json:"application/json, text/javascript",text:"text/plain",_default:"*/*"}},lastModified:{},ajax:function(M){M=o.extend(true,M,o.extend(true,{},o.ajaxSettings,M));var W,F=/=\?(&|$)/g,R,V,G=M.type.toUpperCase();if(M.data&&M.processData&&typeof M.data!=="string"){M.data=o.param(M.data)}if(M.dataType=="jsonp"){if(G=="GET"){if(!M.url.match(F)){M.url+=(M.url.match(/\?/)?"&":"?")+(M.jsonp||"callback")+"=?"}}else{if(!M.data||!M.data.match(F)){M.data=(M.data?M.data+"&":"")+(M.jsonp||"callback")+"=?"}}M.dataType="json"}if(M.dataType=="json"&&(M.data&&M.data.match(F)||M.url.match(F))){W="jsonp"+r++;if(M.data){M.data=(M.data+"").replace(F,"="+W+"$1")}M.url=M.url.replace(F,"="+W+"$1");M.dataType="script";l[W]=function(X){V=X;I();L();l[W]=g;try{delete l[W]}catch(Y){}if(H){H.removeChild(T)}}}if(M.dataType=="script"&&M.cache==null){M.cache=false}if(M.cache===false&&G=="GET"){var E=e();var U=M.url.replace(/(\?|&)_=.*?(&|$)/,"$1_="+E+"$2");M.url=U+((U==M.url)?(M.url.match(/\?/)?"&":"?")+"_="+E:"")}if(M.data&&G=="GET"){M.url+=(M.url.match(/\?/)?"&":"?")+M.data;M.data=null}if(M.global&&!o.active++){o.event.trigger("ajaxStart")}var Q=/^(\w+:)?\/\/([^\/?#]+)/.exec(M.url);if(M.dataType=="script"&&G=="GET"&&Q&&(Q[1]&&Q[1]!=location.protocol||Q[2]!=location.host)){var H=document.getElementsByTagName("head")[0];var T=document.createElement("script");T.src=M.url;if(M.scriptCharset){T.charset=M.scriptCharset}if(!W){var O=false;T.onload=T.onreadystatechange=function(){if(!O&&(!this.readyState||this.readyState=="loaded"||this.readyState=="complete")){O=true;I();L();T.onload=T.onreadystatechange=null;H.removeChild(T)}}}H.appendChild(T);return g}var K=false;var J=M.xhr();if(M.username){J.open(G,M.url,M.async,M.username,M.password)}else{J.open(G,M.url,M.async)}try{if(M.data){J.setRequestHeader("Content-Type",M.contentType)}if(M.ifModified){J.setRequestHeader("If-Modified-Since",o.lastModified[M.url]||"Thu, 01 Jan 1970 00:00:00 GMT")}J.setRequestHeader("X-Requested-With","XMLHttpRequest");J.setRequestHeader("Accept",M.dataType&&M.accepts[M.dataType]?M.accepts[M.dataType]+", */*":M.accepts._default)}catch(S){}if(M.beforeSend&&M.beforeSend(J,M)===false){if(M.global&&!--o.active){o.event.trigger("ajaxStop")}J.abort();return false}if(M.global){o.event.trigger("ajaxSend",[J,M])}var N=function(X){if(J.readyState==0){if(P){clearInterval(P);P=null;if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}}else{if(!K&&J&&(J.readyState==4||X=="timeout")){K=true;if(P){clearInterval(P);P=null}R=X=="timeout"?"timeout":!o.httpSuccess(J)?"error":M.ifModified&&o.httpNotModified(J,M.url)?"notmodified":"success";if(R=="success"){try{V=o.httpData(J,M.dataType,M)}catch(Z){R="parsererror"}}if(R=="success"){var Y;try{Y=J.getResponseHeader("Last-Modified")}catch(Z){}if(M.ifModified&&Y){o.lastModified[M.url]=Y}if(!W){I()}}else{o.handleError(M,J,R)}L();if(X){J.abort()}if(M.async){J=null}}}};if(M.async){var P=setInterval(N,13);if(M.timeout>0){setTimeout(function(){if(J&&!K){N("timeout")}},M.timeout)}}try{J.send(M.data)}catch(S){o.handleError(M,J,null,S)}if(!M.async){N()}function I(){if(M.success){M.success(V,R)}if(M.global){o.event.trigger("ajaxSuccess",[J,M])}}function L(){if(M.complete){M.complete(J,R)}if(M.global){o.event.trigger("ajaxComplete",[J,M])}if(M.global&&!--o.active){o.event.trigger("ajaxStop")}}return J},handleError:function(F,H,E,G){if(F.error){F.error(H,E,G)}if(F.global){o.event.trigger("ajaxError",[H,F,G])}},active:0,httpSuccess:function(F){try{return !F.status&&location.protocol=="file:"||(F.status>=200&&F.status<300)||F.status==304||F.status==1223}catch(E){}return false},httpNotModified:function(G,E){try{var H=G.getResponseHeader("Last-Modified");return G.status==304||H==o.lastModified[E]}catch(F){}return false},httpData:function(J,H,G){var F=J.getResponseHeader("content-type"),E=H=="xml"||!H&&F&&F.indexOf("xml")>=0,I=E?J.responseXML:J.responseText;if(E&&I.documentElement.tagName=="parsererror"){throw"parsererror"}if(G&&G.dataFilter){I=G.dataFilter(I,H)}if(typeof I==="string"){if(H=="script"){o.globalEval(I)}if(H=="json"){I=l["eval"]("("+I+")")}}return I},param:function(E){var G=[];function H(I,J){G[G.length]=encodeURIComponent(I)+"="+encodeURIComponent(J)}if(o.isArray(E)||E.jquery){o.each(E,function(){H(this.name,this.value)})}else{for(var F in E){if(o.isArray(E[F])){o.each(E[F],function(){H(F,this)})}else{H(F,o.isFunction(E[F])?E[F]():E[F])}}}return G.join("&").replace(/%20/g,"+")}});var m={},n,d=[["height","marginTop","marginBottom","paddingTop","paddingBottom"],["width","marginLeft","marginRight","paddingLeft","paddingRight"],["opacity"]];function t(F,E){var G={};o.each(d.concat.apply([],d.slice(0,E)),function(){G[this]=F});return G}o.fn.extend({show:function(J,L){if(J){return this.animate(t("show",3),J,L)}else{for(var H=0,F=this.length;H<F;H++){var E=o.data(this[H],"olddisplay");this[H].style.display=E||"";if(o.css(this[H],"display")==="none"){var G=this[H].tagName,K;if(m[G]){K=m[G]}else{var I=o("<"+G+" />").appendTo("body");K=I.css("display");if(K==="none"){K="block"}I.remove();m[G]=K}o.data(this[H],"olddisplay",K)}}for(var H=0,F=this.length;H<F;H++){this[H].style.display=o.data(this[H],"olddisplay")||""}return this}},hide:function(H,I){if(H){return this.animate(t("hide",3),H,I)}else{for(var G=0,F=this.length;G<F;G++){var E=o.data(this[G],"olddisplay");if(!E&&E!=="none"){o.data(this[G],"olddisplay",o.css(this[G],"display"))}}for(var G=0,F=this.length;G<F;G++){this[G].style.display="none"}return this}},_toggle:o.fn.toggle,toggle:function(G,F){var E=typeof G==="boolean";return o.isFunction(G)&&o.isFunction(F)?this._toggle.apply(this,arguments):G==null||E?this.each(function(){var H=E?G:o(this).is(":hidden");o(this)[H?"show":"hide"]()}):this.animate(t("toggle",3),G,F)},fadeTo:function(E,G,F){return this.animate({opacity:G},E,F)},animate:function(I,F,H,G){var E=o.speed(F,H,G);return this[E.queue===false?"each":"queue"](function(){var K=o.extend({},E),M,L=this.nodeType==1&&o(this).is(":hidden"),J=this;for(M in I){if(I[M]=="hide"&&L||I[M]=="show"&&!L){return K.complete.call(this)}if((M=="height"||M=="width")&&this.style){K.display=o.css(this,"display");K.overflow=this.style.overflow}}if(K.overflow!=null){this.style.overflow="hidden"}K.curAnim=o.extend({},I);o.each(I,function(O,S){var R=new o.fx(J,K,O);if(/toggle|show|hide/.test(S)){R[S=="toggle"?L?"show":"hide":S](I)}else{var Q=S.toString().match(/^([+-]=)?([\d+-.]+)(.*)$/),T=R.cur(true)||0;if(Q){var N=parseFloat(Q[2]),P=Q[3]||"px";if(P!="px"){J.style[O]=(N||1)+P;T=((N||1)/R.cur(true))*T;J.style[O]=T+P}if(Q[1]){N=((Q[1]=="-="?-1:1)*N)+T}R.custom(T,N,P)}else{R.custom(T,S,"")}}});return true})},stop:function(F,E){var G=o.timers;if(F){this.queue([])}this.each(function(){for(var H=G.length-1;H>=0;H--){if(G[H].elem==this){if(E){G[H](true)}G.splice(H,1)}}});if(!E){this.dequeue()}return this}});o.each({slideDown:t("show",1),slideUp:t("hide",1),slideToggle:t("toggle",1),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"}},function(E,F){o.fn[E]=function(G,H){return this.animate(F,G,H)}});o.extend({speed:function(G,H,F){var E=typeof G==="object"?G:{complete:F||!F&&H||o.isFunction(G)&&G,duration:G,easing:F&&H||H&&!o.isFunction(H)&&H};E.duration=o.fx.off?0:typeof E.duration==="number"?E.duration:o.fx.speeds[E.duration]||o.fx.speeds._default;E.old=E.complete;E.complete=function(){if(E.queue!==false){o(this).dequeue()}if(o.isFunction(E.old)){E.old.call(this)}};return E},easing:{linear:function(G,H,E,F){return E+F*G},swing:function(G,H,E,F){return((-Math.cos(G*Math.PI)/2)+0.5)*F+E}},timers:[],fx:function(F,E,G){this.options=E;this.elem=F;this.prop=G;if(!E.orig){E.orig={}}}});o.fx.prototype={update:function(){if(this.options.step){this.options.step.call(this.elem,this.now,this)}(o.fx.step[this.prop]||o.fx.step._default)(this);if((this.prop=="height"||this.prop=="width")&&this.elem.style){this.elem.style.display="block"}},cur:function(F){if(this.elem[this.prop]!=null&&(!this.elem.style||this.elem.style[this.prop]==null)){return this.elem[this.prop]}var E=parseFloat(o.css(this.elem,this.prop,F));return E&&E>-10000?E:parseFloat(o.curCSS(this.elem,this.prop))||0},custom:function(I,H,G){this.startTime=e();this.start=I;this.end=H;this.unit=G||this.unit||"px";this.now=this.start;this.pos=this.state=0;var E=this;function F(J){return E.step(J)}F.elem=this.elem;if(F()&&o.timers.push(F)&&!n){n=setInterval(function(){var K=o.timers;for(var J=0;J<K.length;J++){if(!K[J]()){K.splice(J--,1)}}if(!K.length){clearInterval(n);n=g}},13)}},show:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.show=true;this.custom(this.prop=="width"||this.prop=="height"?1:0,this.cur());o(this.elem).show()},hide:function(){this.options.orig[this.prop]=o.attr(this.elem.style,this.prop);this.options.hide=true;this.custom(this.cur(),0)},step:function(H){var G=e();if(H||G>=this.options.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;var E=true;for(var F in this.options.curAnim){if(this.options.curAnim[F]!==true){E=false}}if(E){if(this.options.display!=null){this.elem.style.overflow=this.options.overflow;this.elem.style.display=this.options.display;if(o.css(this.elem,"display")=="none"){this.elem.style.display="block"}}if(this.options.hide){o(this.elem).hide()}if(this.options.hide||this.options.show){for(var I in this.options.curAnim){o.attr(this.elem.style,I,this.options.orig[I])}}this.options.complete.call(this.elem)}return false}else{var J=G-this.startTime;this.state=J/this.options.duration;this.pos=o.easing[this.options.easing||(o.easing.swing?"swing":"linear")](this.state,J,0,1,this.options.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update()}return true}};o.extend(o.fx,{speeds:{slow:600,fast:200,_default:400},step:{opacity:function(E){o.attr(E.elem.style,"opacity",E.now)},_default:function(E){if(E.elem.style&&E.elem.style[E.prop]!=null){E.elem.style[E.prop]=E.now+E.unit}else{E.elem[E.prop]=E.now}}}});if(document.documentElement.getBoundingClientRect){o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}var G=this[0].getBoundingClientRect(),J=this[0].ownerDocument,F=J.body,E=J.documentElement,L=E.clientTop||F.clientTop||0,K=E.clientLeft||F.clientLeft||0,I=G.top+(self.pageYOffset||o.boxModel&&E.scrollTop||F.scrollTop)-L,H=G.left+(self.pageXOffset||o.boxModel&&E.scrollLeft||F.scrollLeft)-K;return{top:I,left:H}}}else{o.fn.offset=function(){if(!this[0]){return{top:0,left:0}}if(this[0]===this[0].ownerDocument.body){return o.offset.bodyOffset(this[0])}o.offset.initialized||o.offset.initialize();var J=this[0],G=J.offsetParent,F=J,O=J.ownerDocument,M,H=O.documentElement,K=O.body,L=O.defaultView,E=L.getComputedStyle(J,null),N=J.offsetTop,I=J.offsetLeft;while((J=J.parentNode)&&J!==K&&J!==H){M=L.getComputedStyle(J,null);N-=J.scrollTop,I-=J.scrollLeft;if(J===G){N+=J.offsetTop,I+=J.offsetLeft;if(o.offset.doesNotAddBorder&&!(o.offset.doesAddBorderForTableAndCells&&/^t(able|d|h)$/i.test(J.tagName))){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}F=G,G=J.offsetParent}if(o.offset.subtractsBorderForOverflowNotVisible&&M.overflow!=="visible"){N+=parseInt(M.borderTopWidth,10)||0,I+=parseInt(M.borderLeftWidth,10)||0}E=M}if(E.position==="relative"||E.position==="static"){N+=K.offsetTop,I+=K.offsetLeft}if(E.position==="fixed"){N+=Math.max(H.scrollTop,K.scrollTop),I+=Math.max(H.scrollLeft,K.scrollLeft)}return{top:N,left:I}}}o.offset={initialize:function(){if(this.initialized){return}var L=document.body,F=document.createElement("div"),H,G,N,I,M,E,J=L.style.marginTop,K='<div style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;"><div></div></div><table style="position:absolute;top:0;left:0;margin:0;border:5px solid #000;padding:0;width:1px;height:1px;" cellpadding="0" cellspacing="0"><tr><td></td></tr></table>';M={position:"absolute",top:0,left:0,margin:0,border:0,width:"1px",height:"1px",visibility:"hidden"};for(E in M){F.style[E]=M[E]}F.innerHTML=K;L.insertBefore(F,L.firstChild);H=F.firstChild,G=H.firstChild,I=H.nextSibling.firstChild.firstChild;this.doesNotAddBorder=(G.offsetTop!==5);this.doesAddBorderForTableAndCells=(I.offsetTop===5);H.style.overflow="hidden",H.style.position="relative";this.subtractsBorderForOverflowNotVisible=(G.offsetTop===-5);L.style.marginTop="1px";this.doesNotIncludeMarginInBodyOffset=(L.offsetTop===0);L.style.marginTop=J;L.removeChild(F);this.initialized=true},bodyOffset:function(E){o.offset.initialized||o.offset.initialize();var G=E.offsetTop,F=E.offsetLeft;if(o.offset.doesNotIncludeMarginInBodyOffset){G+=parseInt(o.curCSS(E,"marginTop",true),10)||0,F+=parseInt(o.curCSS(E,"marginLeft",true),10)||0}return{top:G,left:F}}};o.fn.extend({position:function(){var I=0,H=0,F;if(this[0]){var G=this.offsetParent(),J=this.offset(),E=/^body|html$/i.test(G[0].tagName)?{top:0,left:0}:G.offset();J.top-=j(this,"marginTop");J.left-=j(this,"marginLeft");E.top+=j(G,"borderTopWidth");E.left+=j(G,"borderLeftWidth");F={top:J.top-E.top,left:J.left-E.left}}return F},offsetParent:function(){var E=this[0].offsetParent||document.body;while(E&&(!/^body|html$/i.test(E.tagName)&&o.css(E,"position")=="static")){E=E.offsetParent}return o(E)}});o.each(["Left","Top"],function(F,E){var G="scroll"+E;o.fn[G]=function(H){if(!this[0]){return null}return H!==g?this.each(function(){this==l||this==document?l.scrollTo(!F?H:o(l).scrollLeft(),F?H:o(l).scrollTop()):this[G]=H}):this[0]==l||this[0]==document?self[F?"pageYOffset":"pageXOffset"]||o.boxModel&&document.documentElement[G]||document.body[G]:this[0][G]}});o.each(["Height","Width"],function(I,G){var E=I?"Left":"Top",H=I?"Right":"Bottom",F=G.toLowerCase();o.fn["inner"+G]=function(){return this[0]?o.css(this[0],F,false,"padding"):null};o.fn["outer"+G]=function(K){return this[0]?o.css(this[0],F,false,K?"margin":"border"):null};var J=G.toLowerCase();o.fn[J]=function(K){return this[0]==l?document.compatMode=="CSS1Compat"&&document.documentElement["client"+G]||document.body["client"+G]:this[0]==document?Math.max(document.documentElement["client"+G],document.body["scroll"+G],document.documentElement["scroll"+G],document.body["offset"+G],document.documentElement["offset"+G]):K===g?(this.length?o.css(this[0],J):null):this.css(J,typeof K==="string"?K:K+"px")}})})();
/*
 * jQuery UI 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI
 */jQuery.ui||(function(c){var i=c.fn.remove,d=c.browser.mozilla&&(parseFloat(c.browser.version)<1.9);c.ui={version:"1.7.1",plugin:{add:function(k,l,n){var m=c.ui[k].prototype;for(var j in n){m.plugins[j]=m.plugins[j]||[];m.plugins[j].push([l,n[j]])}},call:function(j,l,k){var n=j.plugins[l];if(!n||!j.element[0].parentNode){return}for(var m=0;m<n.length;m++){if(j.options[n[m][0]]){n[m][1].apply(j.element,k)}}}},contains:function(k,j){return document.compareDocumentPosition?k.compareDocumentPosition(j)&16:k!==j&&k.contains(j)},hasScroll:function(m,k){if(c(m).css("overflow")=="hidden"){return false}var j=(k&&k=="left")?"scrollLeft":"scrollTop",l=false;if(m[j]>0){return true}m[j]=1;l=(m[j]>0);m[j]=0;return l},isOverAxis:function(k,j,l){return(k>j)&&(k<(j+l))},isOver:function(o,k,n,m,j,l){return c.ui.isOverAxis(o,n,j)&&c.ui.isOverAxis(k,m,l)},keyCode:{BACKSPACE:8,CAPS_LOCK:20,COMMA:188,CONTROL:17,DELETE:46,DOWN:40,END:35,ENTER:13,ESCAPE:27,HOME:36,INSERT:45,LEFT:37,NUMPAD_ADD:107,NUMPAD_DECIMAL:110,NUMPAD_DIVIDE:111,NUMPAD_ENTER:108,NUMPAD_MULTIPLY:106,NUMPAD_SUBTRACT:109,PAGE_DOWN:34,PAGE_UP:33,PERIOD:190,RIGHT:39,SHIFT:16,SPACE:32,TAB:9,UP:38}};if(d){var f=c.attr,e=c.fn.removeAttr,h="http://www.w3.org/2005/07/aaa",a=/^aria-/,b=/^wairole:/;c.attr=function(k,j,l){var m=l!==undefined;return(j=="role"?(m?f.call(this,k,j,"wairole:"+l):(f.apply(this,arguments)||"").replace(b,"")):(a.test(j)?(m?k.setAttributeNS(h,j.replace(a,"aaa:"),l):f.call(this,k,j.replace(a,"aaa:"))):f.apply(this,arguments)))};c.fn.removeAttr=function(j){return(a.test(j)?this.each(function(){this.removeAttributeNS(h,j.replace(a,""))}):e.call(this,j))}}c.fn.extend({remove:function(){c("*",this).add(this).each(function(){c(this).triggerHandler("remove")});return i.apply(this,arguments)},enableSelection:function(){return this.attr("unselectable","off").css("MozUserSelect","").unbind("selectstart.ui")},disableSelection:function(){return this.attr("unselectable","on").css("MozUserSelect","none").bind("selectstart.ui",function(){return false})},scrollParent:function(){var j;if((c.browser.msie&&(/(static|relative)/).test(this.css("position")))||(/absolute/).test(this.css("position"))){j=this.parents().filter(function(){return(/(relative|absolute|fixed)/).test(c.curCSS(this,"position",1))&&(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0)}else{j=this.parents().filter(function(){return(/(auto|scroll)/).test(c.curCSS(this,"overflow",1)+c.curCSS(this,"overflow-y",1)+c.curCSS(this,"overflow-x",1))}).eq(0)}return(/fixed/).test(this.css("position"))||!j.length?c(document):j}});c.extend(c.expr[":"],{data:function(l,k,j){return !!c.data(l,j[3])},focusable:function(k){var l=k.nodeName.toLowerCase(),j=c.attr(k,"tabindex");return(/input|select|textarea|button|object/.test(l)?!k.disabled:"a"==l||"area"==l?k.href||!isNaN(j):!isNaN(j))&&!c(k)["area"==l?"parents":"closest"](":hidden").length},tabbable:function(k){var j=c.attr(k,"tabindex");return(isNaN(j)||j>=0)&&c(k).is(":focusable")}});function g(m,n,o,l){function k(q){var p=c[m][n][q]||[];return(typeof p=="string"?p.split(/,?\s+/):p)}var j=k("getter");if(l.length==1&&typeof l[0]=="string"){j=j.concat(k("getterSetter"))}return(c.inArray(o,j)!=-1)}c.widget=function(k,j){var l=k.split(".")[0];k=k.split(".")[1];c.fn[k]=function(p){var n=(typeof p=="string"),o=Array.prototype.slice.call(arguments,1);if(n&&p.substring(0,1)=="_"){return this}if(n&&g(l,k,p,o)){var m=c.data(this[0],k);return(m?m[p].apply(m,o):undefined)}return this.each(function(){var q=c.data(this,k);(!q&&!n&&c.data(this,k,new c[l][k](this,p))._init());(q&&n&&c.isFunction(q[p])&&q[p].apply(q,o))})};c[l]=c[l]||{};c[l][k]=function(o,n){var m=this;this.namespace=l;this.widgetName=k;this.widgetEventPrefix=c[l][k].eventPrefix||k;this.widgetBaseClass=l+"-"+k;this.options=c.extend({},c.widget.defaults,c[l][k].defaults,c.metadata&&c.metadata.get(o)[k],n);this.element=c(o).bind("setData."+k,function(q,p,r){if(q.target==o){return m._setData(p,r)}}).bind("getData."+k,function(q,p){if(q.target==o){return m._getData(p)}}).bind("remove",function(){return m.destroy()})};c[l][k].prototype=c.extend({},c.widget.prototype,j);c[l][k].getterSetter="option"};c.widget.prototype={_init:function(){},destroy:function(){this.element.removeData(this.widgetName).removeClass(this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").removeAttr("aria-disabled")},option:function(l,m){var k=l,j=this;if(typeof l=="string"){if(m===undefined){return this._getData(l)}k={};k[l]=m}c.each(k,function(n,o){j._setData(n,o)})},_getData:function(j){return this.options[j]},_setData:function(j,k){this.options[j]=k;if(j=="disabled"){this.element[k?"addClass":"removeClass"](this.widgetBaseClass+"-disabled "+this.namespace+"-state-disabled").attr("aria-disabled",k)}},enable:function(){this._setData("disabled",false)},disable:function(){this._setData("disabled",true)},_trigger:function(l,m,n){var p=this.options[l],j=(l==this.widgetEventPrefix?l:this.widgetEventPrefix+l);m=c.Event(m);m.type=j;if(m.originalEvent){for(var k=c.event.props.length,o;k;){o=c.event.props[--k];m[o]=m.originalEvent[o]}}this.element.trigger(m,n);return !(c.isFunction(p)&&p.call(this.element[0],m,n)===false||m.isDefaultPrevented())}};c.widget.defaults={disabled:false};c.ui.mouse={_mouseInit:function(){var j=this;this.element.bind("mousedown."+this.widgetName,function(k){return j._mouseDown(k)}).bind("click."+this.widgetName,function(k){if(j._preventClickEvent){j._preventClickEvent=false;k.stopImmediatePropagation();return false}});if(c.browser.msie){this._mouseUnselectable=this.element.attr("unselectable");this.element.attr("unselectable","on")}this.started=false},_mouseDestroy:function(){this.element.unbind("."+this.widgetName);(c.browser.msie&&this.element.attr("unselectable",this._mouseUnselectable))},_mouseDown:function(l){l.originalEvent=l.originalEvent||{};if(l.originalEvent.mouseHandled){return}(this._mouseStarted&&this._mouseUp(l));this._mouseDownEvent=l;var k=this,m=(l.which==1),j=(typeof this.options.cancel=="string"?c(l.target).parents().add(l.target).filter(this.options.cancel).length:false);if(!m||j||!this._mouseCapture(l)){return true}this.mouseDelayMet=!this.options.delay;if(!this.mouseDelayMet){this._mouseDelayTimer=setTimeout(function(){k.mouseDelayMet=true},this.options.delay)}if(this._mouseDistanceMet(l)&&this._mouseDelayMet(l)){this._mouseStarted=(this._mouseStart(l)!==false);if(!this._mouseStarted){l.preventDefault();return true}}this._mouseMoveDelegate=function(n){return k._mouseMove(n)};this._mouseUpDelegate=function(n){return k._mouseUp(n)};c(document).bind("mousemove."+this.widgetName,this._mouseMoveDelegate).bind("mouseup."+this.widgetName,this._mouseUpDelegate);(c.browser.safari||l.preventDefault());l.originalEvent.mouseHandled=true;return true},_mouseMove:function(j){if(c.browser.msie&&!j.button){return this._mouseUp(j)}if(this._mouseStarted){this._mouseDrag(j);return j.preventDefault()}if(this._mouseDistanceMet(j)&&this._mouseDelayMet(j)){this._mouseStarted=(this._mouseStart(this._mouseDownEvent,j)!==false);(this._mouseStarted?this._mouseDrag(j):this._mouseUp(j))}return !this._mouseStarted},_mouseUp:function(j){c(document).unbind("mousemove."+this.widgetName,this._mouseMoveDelegate).unbind("mouseup."+this.widgetName,this._mouseUpDelegate);if(this._mouseStarted){this._mouseStarted=false;this._preventClickEvent=(j.target==this._mouseDownEvent.target);this._mouseStop(j)}return false},_mouseDistanceMet:function(j){return(Math.max(Math.abs(this._mouseDownEvent.pageX-j.pageX),Math.abs(this._mouseDownEvent.pageY-j.pageY))>=this.options.distance)},_mouseDelayMet:function(j){return this.mouseDelayMet},_mouseStart:function(j){},_mouseDrag:function(j){},_mouseStop:function(j){},_mouseCapture:function(j){return true}};c.ui.mouse.defaults={cancel:null,distance:1,delay:0}})(jQuery);;/*
 * jQuery UI Draggable 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Draggables
 *
 * Depends:
 *    ui.core.js
 */(function(a){a.widget("ui.draggable",a.extend({},a.ui.mouse,{_init:function(){if(this.options.helper=="original"&&!(/^(?:r|a|f)/).test(this.element.css("position"))){this.element[0].style.position="relative"}(this.options.addClasses&&this.element.addClass("ui-draggable"));(this.options.disabled&&this.element.addClass("ui-draggable-disabled"));this._mouseInit()},destroy:function(){if(!this.element.data("draggable")){return}this.element.removeData("draggable").unbind(".draggable").removeClass("ui-draggable ui-draggable-dragging ui-draggable-disabled");this._mouseDestroy()},_mouseCapture:function(b){var c=this.options;if(this.helper||c.disabled||a(b.target).is(".ui-resizable-handle")){return false}this.handle=this._getHandle(b);if(!this.handle){return false}return true},_mouseStart:function(b){var c=this.options;this.helper=this._createHelper(b);this._cacheHelperProportions();if(a.ui.ddmanager){a.ui.ddmanager.current=this}this._cacheMargins();this.cssPosition=this.helper.css("position");this.scrollParent=this.helper.scrollParent();this.offset=this.element.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};a.extend(this.offset,{click:{left:b.pageX-this.offset.left,top:b.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(b);this.originalPageX=b.pageX;this.originalPageY=b.pageY;if(c.cursorAt){this._adjustOffsetFromHelper(c.cursorAt)}if(c.containment){this._setContainment()}this._trigger("start",b);this._cacheHelperProportions();if(a.ui.ddmanager&&!c.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,b)}this.helper.addClass("ui-draggable-dragging");this._mouseDrag(b,true);return true},_mouseDrag:function(b,d){this.position=this._generatePosition(b);this.positionAbs=this._convertPositionTo("absolute");if(!d){var c=this._uiHash();this._trigger("drag",b,c);this.position=c.position}if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"}if(a.ui.ddmanager){a.ui.ddmanager.drag(this,b)}return false},_mouseStop:function(c){var d=false;if(a.ui.ddmanager&&!this.options.dropBehaviour){d=a.ui.ddmanager.drop(this,c)}if(this.dropped){d=this.dropped;this.dropped=false}if((this.options.revert=="invalid"&&!d)||(this.options.revert=="valid"&&d)||this.options.revert===true||(a.isFunction(this.options.revert)&&this.options.revert.call(this.element,d))){var b=this;a(this.helper).animate(this.originalPosition,parseInt(this.options.revertDuration,10),function(){b._trigger("stop",c);b._clear()})}else{this._trigger("stop",c);this._clear()}return false},_getHandle:function(b){var c=!this.options.handle||!a(this.options.handle,this.element).length?true:false;a(this.options.handle,this.element).find("*").andSelf().each(function(){if(this==b.target){c=true}});return c},_createHelper:function(c){var d=this.options;var b=a.isFunction(d.helper)?a(d.helper.apply(this.element[0],[c])):(d.helper=="clone"?this.element.clone():this.element);if(!b.parents("body").length){b.appendTo((d.appendTo=="parent"?this.element[0].parentNode:d.appendTo))}if(b[0]!=this.element[0]&&!(/(fixed|absolute)/).test(b.css("position"))){b.css("position","absolute")}return b},_adjustOffsetFromHelper:function(b){if(b.left!=undefined){this.offset.click.left=b.left+this.margins.left}if(b.right!=undefined){this.offset.click.left=this.helperProportions.width-b.right+this.margins.left}if(b.top!=undefined){this.offset.click.top=b.top+this.margins.top}if(b.bottom!=undefined){this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)){b={top:0,left:0}}return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.element.position();return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.element.css("marginLeft"),10)||0),top:(parseInt(this.element.css("marginTop"),10)||0)}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e=this.options;if(e.containment=="parent"){e.containment=this.helper[0].parentNode}if(e.containment=="document"||e.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]}if(!(/^(document|window|parent)$/).test(e.containment)&&e.containment.constructor!=Array){var c=a(e.containment)[0];if(!c){return}var d=a(e.containment).offset();var b=(a(c).css("overflow")!="hidden");this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}else{if(e.containment.constructor==Array){this.containment=e.containment}}},_convertPositionTo:function(f,h){if(!h){h=this.position}var c=f=="absolute"?1:-1;var e=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=(/(html|body)/i).test(b[0].tagName);return{top:(h.top+this.offset.relative.top*c+this.offset.parent.top*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(g?0:b.scrollTop()))*c)),left:(h.left+this.offset.relative.left*c+this.offset.parent.left*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:b.scrollLeft())*c))}},_generatePosition:function(e){var h=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(b[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()}var d=e.pageX;var c=e.pageY;if(this.originalPosition){if(this.containment){if(e.pageX-this.offset.click.left<this.containment[0]){d=this.containment[0]+this.offset.click.left}if(e.pageY-this.offset.click.top<this.containment[1]){c=this.containment[1]+this.offset.click.top}if(e.pageX-this.offset.click.left>this.containment[2]){d=this.containment[2]+this.offset.click.left}if(e.pageY-this.offset.click.top>this.containment[3]){c=this.containment[3]+this.offset.click.top}}if(h.grid){var g=this.originalPageY+Math.round((c-this.originalPageY)/h.grid[1])*h.grid[1];c=this.containment?(!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:(!(g-this.offset.click.top<this.containment[1])?g-h.grid[1]:g+h.grid[1])):g;var f=this.originalPageX+Math.round((d-this.originalPageX)/h.grid[0])*h.grid[0];d=this.containment?(!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:(!(f-this.offset.click.left<this.containment[0])?f-h.grid[0]:f+h.grid[0])):f}}return{top:(c-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:b.scrollTop())))),left:(d-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:b.scrollLeft())))}},_clear:function(){this.helper.removeClass("ui-draggable-dragging");if(this.helper[0]!=this.element[0]&&!this.cancelHelperRemoval){this.helper.remove()}this.helper=null;this.cancelHelperRemoval=false},_trigger:function(b,c,d){d=d||this._uiHash();a.ui.plugin.call(this,b,[c,d]);if(b=="drag"){this.positionAbs=this._convertPositionTo("absolute")}return a.widget.prototype._trigger.call(this,b,c,d)},plugins:{},_uiHash:function(b){return{helper:this.helper,position:this.position,absolutePosition:this.positionAbs,offset:this.positionAbs}}}));a.extend(a.ui.draggable,{version:"1.7.1",eventPrefix:"drag",defaults:{addClasses:true,appendTo:"parent",axis:false,cancel:":input,option",connectToSortable:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,grid:false,handle:false,helper:"original",iframeFix:false,opacity:false,refreshPositions:false,revert:false,revertDuration:500,scope:"default",scroll:true,scrollSensitivity:20,scrollSpeed:20,snap:false,snapMode:"both",snapTolerance:20,stack:false,zIndex:false}});a.ui.plugin.add("draggable","connectToSortable",{start:function(c,e){var d=a(this).data("draggable"),f=d.options,b=a.extend({},e,{item:d.element});d.sortables=[];a(f.connectToSortable).each(function(){var g=a.data(this,"sortable");if(g&&!g.options.disabled){d.sortables.push({instance:g,shouldRevert:g.options.revert});g._refreshItems();g._trigger("activate",c,b)}})},stop:function(c,e){var d=a(this).data("draggable"),b=a.extend({},e,{item:d.element});a.each(d.sortables,function(){if(this.instance.isOver){this.instance.isOver=0;d.cancelHelperRemoval=true;this.instance.cancelHelperRemoval=false;if(this.shouldRevert){this.instance.options.revert=true}this.instance._mouseStop(c);this.instance.options.helper=this.instance.options._helper;if(d.options.helper=="original"){this.instance.currentItem.css({top:"auto",left:"auto"})}}else{this.instance.cancelHelperRemoval=false;this.instance._trigger("deactivate",c,b)}})},drag:function(c,f){var e=a(this).data("draggable"),b=this;var d=function(i){var n=this.offset.click.top,m=this.offset.click.left;var g=this.positionAbs.top,k=this.positionAbs.left;var j=i.height,l=i.width;var p=i.top,h=i.left;return a.ui.isOver(g+n,k+m,p,h,j,l)};a.each(e.sortables,function(g){this.instance.positionAbs=e.positionAbs;this.instance.helperProportions=e.helperProportions;this.instance.offset.click=e.offset.click;if(this.instance._intersectsWith(this.instance.containerCache)){if(!this.instance.isOver){this.instance.isOver=1;this.instance.currentItem=a(b).clone().appendTo(this.instance.element).data("sortable-item",true);this.instance.options._helper=this.instance.options.helper;this.instance.options.helper=function(){return f.helper[0]};c.target=this.instance.currentItem[0];this.instance._mouseCapture(c,true);this.instance._mouseStart(c,true,true);this.instance.offset.click.top=e.offset.click.top;this.instance.offset.click.left=e.offset.click.left;this.instance.offset.parent.left-=e.offset.parent.left-this.instance.offset.parent.left;this.instance.offset.parent.top-=e.offset.parent.top-this.instance.offset.parent.top;e._trigger("toSortable",c);e.dropped=this.instance.element;e.currentItem=e.element;this.instance.fromOutside=e}if(this.instance.currentItem){this.instance._mouseDrag(c)}}else{if(this.instance.isOver){this.instance.isOver=0;this.instance.cancelHelperRemoval=true;this.instance.options.revert=false;this.instance._trigger("out",c,this.instance._uiHash(this.instance));this.instance._mouseStop(c,true);this.instance.options.helper=this.instance.options._helper;this.instance.currentItem.remove();if(this.instance.placeholder){this.instance.placeholder.remove()}e._trigger("fromSortable",c);e.dropped=false}}})}});a.ui.plugin.add("draggable","cursor",{start:function(c,d){var b=a("body"),e=a(this).data("draggable").options;if(b.css("cursor")){e._cursor=b.css("cursor")}b.css("cursor",e.cursor)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._cursor){a("body").css("cursor",d._cursor)}}});a.ui.plugin.add("draggable","iframeFix",{start:function(b,c){var d=a(this).data("draggable").options;a(d.iframeFix===true?"iframe":d.iframeFix).each(function(){a('<div class="ui-draggable-iframeFix" style="background: #fff;"></div>').css({width:this.offsetWidth+"px",height:this.offsetHeight+"px",position:"absolute",opacity:"0.001",zIndex:1000}).css(a(this).offset()).appendTo("body")})},stop:function(b,c){a("div.ui-draggable-iframeFix").each(function(){this.parentNode.removeChild(this)})}});a.ui.plugin.add("draggable","opacity",{start:function(c,d){var b=a(d.helper),e=a(this).data("draggable").options;if(b.css("opacity")){e._opacity=b.css("opacity")}b.css("opacity",e.opacity)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._opacity){a(c.helper).css("opacity",d._opacity)}}});a.ui.plugin.add("draggable","scroll",{start:function(c,d){var b=a(this).data("draggable");if(b.scrollParent[0]!=document&&b.scrollParent[0].tagName!="HTML"){b.overflowOffset=b.scrollParent.offset()}},drag:function(d,e){var c=a(this).data("draggable"),f=c.options,b=false;if(c.scrollParent[0]!=document&&c.scrollParent[0].tagName!="HTML"){if(!f.axis||f.axis!="x"){if((c.overflowOffset.top+c.scrollParent[0].offsetHeight)-d.pageY<f.scrollSensitivity){c.scrollParent[0].scrollTop=b=c.scrollParent[0].scrollTop+f.scrollSpeed}else{if(d.pageY-c.overflowOffset.top<f.scrollSensitivity){c.scrollParent[0].scrollTop=b=c.scrollParent[0].scrollTop-f.scrollSpeed}}}if(!f.axis||f.axis!="y"){if((c.overflowOffset.left+c.scrollParent[0].offsetWidth)-d.pageX<f.scrollSensitivity){c.scrollParent[0].scrollLeft=b=c.scrollParent[0].scrollLeft+f.scrollSpeed}else{if(d.pageX-c.overflowOffset.left<f.scrollSensitivity){c.scrollParent[0].scrollLeft=b=c.scrollParent[0].scrollLeft-f.scrollSpeed}}}}else{if(!f.axis||f.axis!="x"){if(d.pageY-a(document).scrollTop()<f.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()-f.scrollSpeed)}else{if(a(window).height()-(d.pageY-a(document).scrollTop())<f.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()+f.scrollSpeed)}}}if(!f.axis||f.axis!="y"){if(d.pageX-a(document).scrollLeft()<f.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()-f.scrollSpeed)}else{if(a(window).width()-(d.pageX-a(document).scrollLeft())<f.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()+f.scrollSpeed)}}}}if(b!==false&&a.ui.ddmanager&&!f.dropBehaviour){a.ui.ddmanager.prepareOffsets(c,d)}}});a.ui.plugin.add("draggable","snap",{start:function(c,d){var b=a(this).data("draggable"),e=b.options;b.snapElements=[];a(e.snap.constructor!=String?(e.snap.items||":data(draggable)"):e.snap).each(function(){var g=a(this);var f=g.offset();if(this!=b.element[0]){b.snapElements.push({item:this,width:g.outerWidth(),height:g.outerHeight(),top:f.top,left:f.left})}})},drag:function(u,p){var g=a(this).data("draggable"),q=g.options;var y=q.snapTolerance;var x=p.offset.left,w=x+g.helperProportions.width,f=p.offset.top,e=f+g.helperProportions.height;for(var v=g.snapElements.length-1;v>=0;v--){var s=g.snapElements[v].left,n=s+g.snapElements[v].width,m=g.snapElements[v].top,A=m+g.snapElements[v].height;if(!((s-y<x&&x<n+y&&m-y<f&&f<A+y)||(s-y<x&&x<n+y&&m-y<e&&e<A+y)||(s-y<w&&w<n+y&&m-y<f&&f<A+y)||(s-y<w&&w<n+y&&m-y<e&&e<A+y))){if(g.snapElements[v].snapping){(g.options.snap.release&&g.options.snap.release.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))}g.snapElements[v].snapping=false;continue}if(q.snapMode!="inner"){var c=Math.abs(m-e)<=y;var z=Math.abs(A-f)<=y;var j=Math.abs(s-w)<=y;var k=Math.abs(n-x)<=y;if(c){p.position.top=g._convertPositionTo("relative",{top:m-g.helperProportions.height,left:0}).top-g.margins.top}if(z){p.position.top=g._convertPositionTo("relative",{top:A,left:0}).top-g.margins.top}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s-g.helperProportions.width}).left-g.margins.left}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n}).left-g.margins.left}}var h=(c||z||j||k);if(q.snapMode!="outer"){var c=Math.abs(m-f)<=y;var z=Math.abs(A-e)<=y;var j=Math.abs(s-x)<=y;var k=Math.abs(n-w)<=y;if(c){p.position.top=g._convertPositionTo("relative",{top:m,left:0}).top-g.margins.top}if(z){p.position.top=g._convertPositionTo("relative",{top:A-g.helperProportions.height,left:0}).top-g.margins.top}if(j){p.position.left=g._convertPositionTo("relative",{top:0,left:s}).left-g.margins.left}if(k){p.position.left=g._convertPositionTo("relative",{top:0,left:n-g.helperProportions.width}).left-g.margins.left}}if(!g.snapElements[v].snapping&&(c||z||j||k||h)){(g.options.snap.snap&&g.options.snap.snap.call(g.element,u,a.extend(g._uiHash(),{snapItem:g.snapElements[v].item})))}g.snapElements[v].snapping=(c||z||j||k||h)}}});a.ui.plugin.add("draggable","stack",{start:function(b,c){var e=a(this).data("draggable").options;var d=a.makeArray(a(e.stack.group)).sort(function(g,f){return(parseInt(a(g).css("zIndex"),10)||e.stack.min)-(parseInt(a(f).css("zIndex"),10)||e.stack.min)});a(d).each(function(f){this.style.zIndex=e.stack.min+f});this[0].style.zIndex=e.stack.min+d.length}});a.ui.plugin.add("draggable","zIndex",{start:function(c,d){var b=a(d.helper),e=a(this).data("draggable").options;if(b.css("zIndex")){e._zIndex=b.css("zIndex")}b.css("zIndex",e.zIndex)},stop:function(b,c){var d=a(this).data("draggable").options;if(d._zIndex){a(c.helper).css("zIndex",d._zIndex)}}})})(jQuery);;/*
 * jQuery UI Droppable 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Droppables
 *
 * Depends:
 *    ui.core.js
 *    ui.draggable.js
 */(function(a){a.widget("ui.droppable",{_init:function(){var c=this.options,b=c.accept;this.isover=0;this.isout=1;this.options.accept=this.options.accept&&a.isFunction(this.options.accept)?this.options.accept:function(e){return e.is(b)};this.proportions={width:this.element[0].offsetWidth,height:this.element[0].offsetHeight};a.ui.ddmanager.droppables[this.options.scope]=a.ui.ddmanager.droppables[this.options.scope]||[];a.ui.ddmanager.droppables[this.options.scope].push(this);(this.options.addClasses&&this.element.addClass("ui-droppable"))},destroy:function(){var b=a.ui.ddmanager.droppables[this.options.scope];for(var c=0;c<b.length;c++){if(b[c]==this){b.splice(c,1)}}this.element.removeClass("ui-droppable ui-droppable-disabled").removeData("droppable").unbind(".droppable")},_setData:function(b,c){if(b=="accept"){this.options.accept=c&&a.isFunction(c)?c:function(e){return e.is(c)}}else{a.widget.prototype._setData.apply(this,arguments)}},_activate:function(c){var b=a.ui.ddmanager.current;if(this.options.activeClass){this.element.addClass(this.options.activeClass)}(b&&this._trigger("activate",c,this.ui(b)))},_deactivate:function(c){var b=a.ui.ddmanager.current;if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}(b&&this._trigger("deactivate",c,this.ui(b)))},_over:function(c){var b=a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0]){return}if(this.options.accept.call(this.element[0],(b.currentItem||b.element))){if(this.options.hoverClass){this.element.addClass(this.options.hoverClass)}this._trigger("over",c,this.ui(b))}},_out:function(c){var b=a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0]){return}if(this.options.accept.call(this.element[0],(b.currentItem||b.element))){if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("out",c,this.ui(b))}},_drop:function(c,d){var b=d||a.ui.ddmanager.current;if(!b||(b.currentItem||b.element)[0]==this.element[0]){return false}var e=false;this.element.find(":data(droppable)").not(".ui-draggable-dragging").each(function(){var f=a.data(this,"droppable");if(f.options.greedy&&a.ui.intersect(b,a.extend(f,{offset:f.element.offset()}),f.options.tolerance)){e=true;return false}});if(e){return false}if(this.options.accept.call(this.element[0],(b.currentItem||b.element))){if(this.options.activeClass){this.element.removeClass(this.options.activeClass)}if(this.options.hoverClass){this.element.removeClass(this.options.hoverClass)}this._trigger("drop",c,this.ui(b));return this.element}return false},ui:function(b){return{draggable:(b.currentItem||b.element),helper:b.helper,position:b.position,absolutePosition:b.positionAbs,offset:b.positionAbs}}});a.extend(a.ui.droppable,{version:"1.7.1",eventPrefix:"drop",defaults:{accept:"*",activeClass:false,addClasses:true,greedy:false,hoverClass:false,scope:"default",tolerance:"intersect"}});a.ui.intersect=function(q,j,o){if(!j.offset){return false}var e=(q.positionAbs||q.position.absolute).left,d=e+q.helperProportions.width,n=(q.positionAbs||q.position.absolute).top,m=n+q.helperProportions.height;var g=j.offset.left,c=g+j.proportions.width,p=j.offset.top,k=p+j.proportions.height;switch(o){case"fit":return(g<e&&d<c&&p<n&&m<k);break;case"intersect":return(g<e+(q.helperProportions.width/2)&&d-(q.helperProportions.width/2)<c&&p<n+(q.helperProportions.height/2)&&m-(q.helperProportions.height/2)<k);break;case"pointer":var h=((q.positionAbs||q.position.absolute).left+(q.clickOffset||q.offset.click).left),i=((q.positionAbs||q.position.absolute).top+(q.clickOffset||q.offset.click).top),f=a.ui.isOver(i,h,p,g,j.proportions.height,j.proportions.width);return f;break;case"touch":return((n>=p&&n<=k)||(m>=p&&m<=k)||(n<p&&m>k))&&((e>=g&&e<=c)||(d>=g&&d<=c)||(e<g&&d>c));break;default:return false;break}};a.ui.ddmanager={current:null,droppables:{"default":[]},prepareOffsets:function(e,g){var b=a.ui.ddmanager.droppables[e.options.scope];var f=g?g.type:null;var h=(e.currentItem||e.element).find(":data(droppable)").andSelf();droppablesLoop:for(var d=0;d<b.length;d++){if(b[d].options.disabled||(e&&!b[d].options.accept.call(b[d].element[0],(e.currentItem||e.element)))){continue}for(var c=0;c<h.length;c++){if(h[c]==b[d].element[0]){b[d].proportions.height=0;continue droppablesLoop}}b[d].visible=b[d].element.css("display")!="none";if(!b[d].visible){continue}b[d].offset=b[d].element.offset();b[d].proportions={width:b[d].element[0].offsetWidth,height:b[d].element[0].offsetHeight};if(f=="mousedown"){b[d]._activate.call(b[d],g)}}},drop:function(b,c){var d=false;a.each(a.ui.ddmanager.droppables[b.options.scope],function(){if(!this.options){return}if(!this.options.disabled&&this.visible&&a.ui.intersect(b,this,this.options.tolerance)){d=this._drop.call(this,c)}if(!this.options.disabled&&this.visible&&this.options.accept.call(this.element[0],(b.currentItem||b.element))){this.isout=1;this.isover=0;this._deactivate.call(this,c)}});return d},drag:function(b,c){if(b.options.refreshPositions){a.ui.ddmanager.prepareOffsets(b,c)}a.each(a.ui.ddmanager.droppables[b.options.scope],function(){if(this.options.disabled||this.greedyChild||!this.visible){return}var e=a.ui.intersect(b,this,this.options.tolerance);var g=!e&&this.isover==1?"isout":(e&&this.isover==0?"isover":null);if(!g){return}var f;if(this.options.greedy){var d=this.element.parents(":data(droppable):eq(0)");if(d.length){f=a.data(d[0],"droppable");f.greedyChild=(g=="isover"?1:0)}}if(f&&g=="isover"){f.isover=0;f.isout=1;f._out.call(f,c)}this[g]=1;this[g=="isout"?"isover":"isout"]=0;this[g=="isover"?"_over":"_out"].call(this,c);if(f&&g=="isout"){f.isout=0;f.isover=1;f._over.call(f,c)}})}}})(jQuery);;/*
 * jQuery UI Resizable 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Resizables
 *
 * Depends:
 *    ui.core.js
 */(function(c){c.widget("ui.resizable",c.extend({},c.ui.mouse,{_init:function(){var e=this,j=this.options;this.element.addClass("ui-resizable");c.extend(this,{_aspectRatio:!!(j.aspectRatio),aspectRatio:j.aspectRatio,originalElement:this.element,_proportionallyResizeElements:[],_helper:j.helper||j.ghost||j.animate?j.helper||"ui-resizable-helper":null});if(this.element[0].nodeName.match(/canvas|textarea|input|select|button|img/i)){if(/relative/.test(this.element.css("position"))&&c.browser.opera){this.element.css({position:"relative",top:"auto",left:"auto"})}this.element.wrap(c('<div class="ui-wrapper" style="overflow: hidden;"></div>').css({position:this.element.css("position"),width:this.element.outerWidth(),height:this.element.outerHeight(),top:this.element.css("top"),left:this.element.css("left")}));this.element=this.element.parent().data("resizable",this.element.data("resizable"));this.elementIsWrapper=true;this.element.css({marginLeft:this.originalElement.css("marginLeft"),marginTop:this.originalElement.css("marginTop"),marginRight:this.originalElement.css("marginRight"),marginBottom:this.originalElement.css("marginBottom")});this.originalElement.css({marginLeft:0,marginTop:0,marginRight:0,marginBottom:0});this.originalResizeStyle=this.originalElement.css("resize");this.originalElement.css("resize","none");this._proportionallyResizeElements.push(this.originalElement.css({position:"static",zoom:1,display:"block"}));this.originalElement.css({margin:this.originalElement.css("margin")});this._proportionallyResize()}this.handles=j.handles||(!c(".ui-resizable-handle",this.element).length?"e,s,se":{n:".ui-resizable-n",e:".ui-resizable-e",s:".ui-resizable-s",w:".ui-resizable-w",se:".ui-resizable-se",sw:".ui-resizable-sw",ne:".ui-resizable-ne",nw:".ui-resizable-nw"});if(this.handles.constructor==String){if(this.handles=="all"){this.handles="n,e,s,w,se,sw,ne,nw"}var k=this.handles.split(",");this.handles={};for(var f=0;f<k.length;f++){var h=c.trim(k[f]),d="ui-resizable-"+h;var g=c('<div class="ui-resizable-handle '+d+'"></div>');if(/sw|se|ne|nw/.test(h)){g.css({zIndex:++j.zIndex})}if("se"==h){g.addClass("ui-icon ui-icon-gripsmall-diagonal-se")}this.handles[h]=".ui-resizable-"+h;this.element.append(g)}}this._renderAxis=function(p){p=p||this.element;for(var m in this.handles){if(this.handles[m].constructor==String){this.handles[m]=c(this.handles[m],this.element).show()}if(this.elementIsWrapper&&this.originalElement[0].nodeName.match(/textarea|input|select|button/i)){var n=c(this.handles[m],this.element),o=0;o=/sw|ne|nw|se|n|s/.test(m)?n.outerHeight():n.outerWidth();var l=["padding",/ne|nw|n/.test(m)?"Top":/se|sw|s/.test(m)?"Bottom":/^e$/.test(m)?"Right":"Left"].join("");p.css(l,o);this._proportionallyResize()}if(!c(this.handles[m]).length){continue}}};this._renderAxis(this.element);this._handles=c(".ui-resizable-handle",this.element).disableSelection();this._handles.mouseover(function(){if(!e.resizing){if(this.className){var i=this.className.match(/ui-resizable-(se|sw|ne|nw|n|e|s|w)/i)}e.axis=i&&i[1]?i[1]:"se"}});if(j.autoHide){this._handles.hide();c(this.element).addClass("ui-resizable-autohide").hover(function(){c(this).removeClass("ui-resizable-autohide");e._handles.show()},function(){if(!e.resizing){c(this).addClass("ui-resizable-autohide");e._handles.hide()}})}this._mouseInit()},destroy:function(){this._mouseDestroy();var d=function(f){c(f).removeClass("ui-resizable ui-resizable-disabled ui-resizable-resizing").removeData("resizable").unbind(".resizable").find(".ui-resizable-handle").remove()};if(this.elementIsWrapper){d(this.element);var e=this.element;e.parent().append(this.originalElement.css({position:e.css("position"),width:e.outerWidth(),height:e.outerHeight(),top:e.css("top"),left:e.css("left")})).end().remove()}this.originalElement.css("resize",this.originalResizeStyle);d(this.originalElement)},_mouseCapture:function(e){var f=false;for(var d in this.handles){if(c(this.handles[d])[0]==e.target){f=true}}return this.options.disabled||!!f},_mouseStart:function(f){var i=this.options,e=this.element.position(),d=this.element;this.resizing=true;this.documentScroll={top:c(document).scrollTop(),left:c(document).scrollLeft()};if(d.is(".ui-draggable")||(/absolute/).test(d.css("position"))){d.css({position:"absolute",top:e.top,left:e.left})}if(c.browser.opera&&(/relative/).test(d.css("position"))){d.css({position:"relative",top:"auto",left:"auto"})}this._renderProxy();var j=b(this.helper.css("left")),g=b(this.helper.css("top"));if(i.containment){j+=c(i.containment).scrollLeft()||0;g+=c(i.containment).scrollTop()||0}this.offset=this.helper.offset();this.position={left:j,top:g};this.size=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalSize=this._helper?{width:d.outerWidth(),height:d.outerHeight()}:{width:d.width(),height:d.height()};this.originalPosition={left:j,top:g};this.sizeDiff={width:d.outerWidth()-d.width(),height:d.outerHeight()-d.height()};this.originalMousePosition={left:f.pageX,top:f.pageY};this.aspectRatio=(typeof i.aspectRatio=="number")?i.aspectRatio:((this.originalSize.width/this.originalSize.height)||1);var h=c(".ui-resizable-"+this.axis).css("cursor");c("body").css("cursor",h=="auto"?this.axis+"-resize":h);d.addClass("ui-resizable-resizing");this._propagate("start",f);return true},_mouseDrag:function(d){var g=this.helper,f=this.options,l={},p=this,i=this.originalMousePosition,m=this.axis;var q=(d.pageX-i.left)||0,n=(d.pageY-i.top)||0;var h=this._change[m];if(!h){return false}var k=h.apply(this,[d,q,n]),j=c.browser.msie&&c.browser.version<7,e=this.sizeDiff;if(this._aspectRatio||d.shiftKey){k=this._updateRatio(k,d)}k=this._respectSize(k,d);this._propagate("resize",d);g.css({top:this.position.top+"px",left:this.position.left+"px",width:this.size.width+"px",height:this.size.height+"px"});if(!this._helper&&this._proportionallyResizeElements.length){this._proportionallyResize()}this._updateCache(k);this._trigger("resize",d,this.ui());return false},_mouseStop:function(g){this.resizing=false;var h=this.options,l=this;if(this._helper){var f=this._proportionallyResizeElements,d=f.length&&(/textarea/i).test(f[0].nodeName),e=d&&c.ui.hasScroll(f[0],"left")?0:l.sizeDiff.height,j=d?0:l.sizeDiff.width;var m={width:(l.size.width-j),height:(l.size.height-e)},i=(parseInt(l.element.css("left"),10)+(l.position.left-l.originalPosition.left))||null,k=(parseInt(l.element.css("top"),10)+(l.position.top-l.originalPosition.top))||null;if(!h.animate){this.element.css(c.extend(m,{top:k,left:i}))}l.helper.height(l.size.height);l.helper.width(l.size.width);if(this._helper&&!h.animate){this._proportionallyResize()}}c("body").css("cursor","auto");this.element.removeClass("ui-resizable-resizing");this._propagate("stop",g);if(this._helper){this.helper.remove()}return false},_updateCache:function(d){var e=this.options;this.offset=this.helper.offset();if(a(d.left)){this.position.left=d.left}if(a(d.top)){this.position.top=d.top}if(a(d.height)){this.size.height=d.height}if(a(d.width)){this.size.width=d.width}},_updateRatio:function(g,f){var h=this.options,i=this.position,e=this.size,d=this.axis;if(g.height){g.width=(e.height*this.aspectRatio)}else{if(g.width){g.height=(e.width/this.aspectRatio)}}if(d=="sw"){g.left=i.left+(e.width-g.width);g.top=null}if(d=="nw"){g.top=i.top+(e.height-g.height);g.left=i.left+(e.width-g.width)}return g},_respectSize:function(k,f){var i=this.helper,h=this.options,q=this._aspectRatio||f.shiftKey,p=this.axis,s=a(k.width)&&h.maxWidth&&(h.maxWidth<k.width),l=a(k.height)&&h.maxHeight&&(h.maxHeight<k.height),g=a(k.width)&&h.minWidth&&(h.minWidth>k.width),r=a(k.height)&&h.minHeight&&(h.minHeight>k.height);if(g){k.width=h.minWidth}if(r){k.height=h.minHeight}if(s){k.width=h.maxWidth}if(l){k.height=h.maxHeight}var e=this.originalPosition.left+this.originalSize.width,n=this.position.top+this.size.height;var j=/sw|nw|w/.test(p),d=/nw|ne|n/.test(p);if(g&&j){k.left=e-h.minWidth}if(s&&j){k.left=e-h.maxWidth}if(r&&d){k.top=n-h.minHeight}if(l&&d){k.top=n-h.maxHeight}var m=!k.width&&!k.height;if(m&&!k.left&&k.top){k.top=null}else{if(m&&!k.top&&k.left){k.left=null}}return k},_proportionallyResize:function(){var j=this.options;if(!this._proportionallyResizeElements.length){return}var f=this.helper||this.element;for(var e=0;e<this._proportionallyResizeElements.length;e++){var g=this._proportionallyResizeElements[e];if(!this.borderDif){var d=[g.css("borderTopWidth"),g.css("borderRightWidth"),g.css("borderBottomWidth"),g.css("borderLeftWidth")],h=[g.css("paddingTop"),g.css("paddingRight"),g.css("paddingBottom"),g.css("paddingLeft")];this.borderDif=c.map(d,function(k,m){var l=parseInt(k,10)||0,n=parseInt(h[m],10)||0;return l+n})}if(c.browser.msie&&!(!(c(f).is(":hidden")||c(f).parents(":hidden").length))){continue}g.css({height:(f.height()-this.borderDif[0]-this.borderDif[2])||0,width:(f.width()-this.borderDif[1]-this.borderDif[3])||0})}},_renderProxy:function(){var e=this.element,h=this.options;this.elementOffset=e.offset();if(this._helper){this.helper=this.helper||c('<div style="overflow:hidden;"></div>');var d=c.browser.msie&&c.browser.version<7,f=(d?1:0),g=(d?2:-1);this.helper.addClass(this._helper).css({width:this.element.outerWidth()+g,height:this.element.outerHeight()+g,position:"absolute",left:this.elementOffset.left-f+"px",top:this.elementOffset.top-f+"px",zIndex:++h.zIndex});this.helper.appendTo("body").disableSelection()}else{this.helper=this.element}},_change:{e:function(f,e,d){return{width:this.originalSize.width+e}},w:function(g,e,d){var i=this.options,f=this.originalSize,h=this.originalPosition;return{left:h.left+e,width:f.width-e}},n:function(g,e,d){var i=this.options,f=this.originalSize,h=this.originalPosition;return{top:h.top+d,height:f.height-d}},s:function(f,e,d){return{height:this.originalSize.height+d}},se:function(f,e,d){return c.extend(this._change.s.apply(this,arguments),this._change.e.apply(this,[f,e,d]))},sw:function(f,e,d){return c.extend(this._change.s.apply(this,arguments),this._change.w.apply(this,[f,e,d]))},ne:function(f,e,d){return c.extend(this._change.n.apply(this,arguments),this._change.e.apply(this,[f,e,d]))},nw:function(f,e,d){return c.extend(this._change.n.apply(this,arguments),this._change.w.apply(this,[f,e,d]))}},_propagate:function(e,d){c.ui.plugin.call(this,e,[d,this.ui()]);(e!="resize"&&this._trigger(e,d,this.ui()))},plugins:{},ui:function(){return{originalElement:this.originalElement,element:this.element,helper:this.helper,position:this.position,size:this.size,originalSize:this.originalSize,originalPosition:this.originalPosition}}}));c.extend(c.ui.resizable,{version:"1.7.1",eventPrefix:"resize",defaults:{alsoResize:false,animate:false,animateDuration:"slow",animateEasing:"swing",aspectRatio:false,autoHide:false,cancel:":input,option",containment:false,delay:0,distance:1,ghost:false,grid:false,handles:"e,s,se",helper:false,maxHeight:null,maxWidth:null,minHeight:10,minWidth:10,zIndex:1000}});c.ui.plugin.add("resizable","alsoResize",{start:function(e,f){var d=c(this).data("resizable"),g=d.options;_store=function(h){c(h).each(function(){c(this).data("resizable-alsoresize",{width:parseInt(c(this).width(),10),height:parseInt(c(this).height(),10),left:parseInt(c(this).css("left"),10),top:parseInt(c(this).css("top"),10)})})};if(typeof(g.alsoResize)=="object"&&!g.alsoResize.parentNode){if(g.alsoResize.length){g.alsoResize=g.alsoResize[0];_store(g.alsoResize)}else{c.each(g.alsoResize,function(h,i){_store(h)})}}else{_store(g.alsoResize)}},resize:function(f,h){var e=c(this).data("resizable"),i=e.options,g=e.originalSize,k=e.originalPosition;var j={height:(e.size.height-g.height)||0,width:(e.size.width-g.width)||0,top:(e.position.top-k.top)||0,left:(e.position.left-k.left)||0},d=function(l,m){c(l).each(function(){var p=c(this),q=c(this).data("resizable-alsoresize"),o={},n=m&&m.length?m:["width","height","top","left"];c.each(n||["width","height","top","left"],function(r,t){var s=(q[t]||0)+(j[t]||0);if(s&&s>=0){o[t]=s||null}});if(/relative/.test(p.css("position"))&&c.browser.opera){e._revertToRelativePosition=true;p.css({position:"absolute",top:"auto",left:"auto"})}p.css(o)})};if(typeof(i.alsoResize)=="object"&&!i.alsoResize.nodeType){c.each(i.alsoResize,function(l,m){d(l,m)})}else{d(i.alsoResize)}},stop:function(e,f){var d=c(this).data("resizable");if(d._revertToRelativePosition&&c.browser.opera){d._revertToRelativePosition=false;el.css({position:"relative"})}c(this).removeData("resizable-alsoresize-start")}});c.ui.plugin.add("resizable","animate",{stop:function(h,m){var n=c(this).data("resizable"),i=n.options;var g=n._proportionallyResizeElements,d=g.length&&(/textarea/i).test(g[0].nodeName),e=d&&c.ui.hasScroll(g[0],"left")?0:n.sizeDiff.height,k=d?0:n.sizeDiff.width;var f={width:(n.size.width-k),height:(n.size.height-e)},j=(parseInt(n.element.css("left"),10)+(n.position.left-n.originalPosition.left))||null,l=(parseInt(n.element.css("top"),10)+(n.position.top-n.originalPosition.top))||null;n.element.animate(c.extend(f,l&&j?{top:l,left:j}:{}),{duration:i.animateDuration,easing:i.animateEasing,step:function(){var o={width:parseInt(n.element.css("width"),10),height:parseInt(n.element.css("height"),10),top:parseInt(n.element.css("top"),10),left:parseInt(n.element.css("left"),10)};if(g&&g.length){c(g[0]).css({width:o.width,height:o.height})}n._updateCache(o);n._propagate("resize",h)}})}});c.ui.plugin.add("resizable","containment",{start:function(e,q){var s=c(this).data("resizable"),i=s.options,k=s.element;var f=i.containment,j=(f instanceof c)?f.get(0):(/parent/.test(f))?k.parent().get(0):f;if(!j){return}s.containerElement=c(j);if(/document/.test(f)||f==document){s.containerOffset={left:0,top:0};s.containerPosition={left:0,top:0};s.parentData={element:c(document),left:0,top:0,width:c(document).width(),height:c(document).height()||document.body.parentNode.scrollHeight}}else{var m=c(j),h=[];c(["Top","Right","Left","Bottom"]).each(function(p,o){h[p]=b(m.css("padding"+o))});s.containerOffset=m.offset();s.containerPosition=m.position();s.containerSize={height:(m.innerHeight()-h[3]),width:(m.innerWidth()-h[1])};var n=s.containerOffset,d=s.containerSize.height,l=s.containerSize.width,g=(c.ui.hasScroll(j,"left")?j.scrollWidth:l),r=(c.ui.hasScroll(j)?j.scrollHeight:d);s.parentData={element:j,left:n.left,top:n.top,width:g,height:r}}},resize:function(f,p){var s=c(this).data("resizable"),h=s.options,e=s.containerSize,n=s.containerOffset,l=s.size,m=s.position,q=s._aspectRatio||f.shiftKey,d={top:0,left:0},g=s.containerElement;if(g[0]!=document&&(/static/).test(g.css("position"))){d=n}if(m.left<(s._helper?n.left:0)){s.size.width=s.size.width+(s._helper?(s.position.left-n.left):(s.position.left-d.left));if(q){s.size.height=s.size.width/h.aspectRatio}s.position.left=h.helper?n.left:0}if(m.top<(s._helper?n.top:0)){s.size.height=s.size.height+(s._helper?(s.position.top-n.top):s.position.top);if(q){s.size.width=s.size.height*h.aspectRatio}s.position.top=s._helper?n.top:0}s.offset.left=s.parentData.left+s.position.left;s.offset.top=s.parentData.top+s.position.top;var k=Math.abs((s._helper?s.offset.left-d.left:(s.offset.left-d.left))+s.sizeDiff.width),r=Math.abs((s._helper?s.offset.top-d.top:(s.offset.top-n.top))+s.sizeDiff.height);var j=s.containerElement.get(0)==s.element.parent().get(0),i=/relative|absolute/.test(s.containerElement.css("position"));if(j&&i){k-=s.parentData.left}if(k+s.size.width>=s.parentData.width){s.size.width=s.parentData.width-k;if(q){s.size.height=s.size.width/s.aspectRatio}}if(r+s.size.height>=s.parentData.height){s.size.height=s.parentData.height-r;if(q){s.size.width=s.size.height*s.aspectRatio}}},stop:function(e,m){var p=c(this).data("resizable"),f=p.options,k=p.position,l=p.containerOffset,d=p.containerPosition,g=p.containerElement;var i=c(p.helper),q=i.offset(),n=i.outerWidth()-p.sizeDiff.width,j=i.outerHeight()-p.sizeDiff.height;if(p._helper&&!f.animate&&(/relative/).test(g.css("position"))){c(this).css({left:q.left-d.left-l.left,width:n,height:j})}if(p._helper&&!f.animate&&(/static/).test(g.css("position"))){c(this).css({left:q.left-d.left-l.left,width:n,height:j})}}});c.ui.plugin.add("resizable","ghost",{start:function(f,g){var d=c(this).data("resizable"),h=d.options,e=d.size;d.ghost=d.originalElement.clone();d.ghost.css({opacity:0.25,display:"block",position:"relative",height:e.height,width:e.width,margin:0,left:0,top:0}).addClass("ui-resizable-ghost").addClass(typeof h.ghost=="string"?h.ghost:"");d.ghost.appendTo(d.helper)},resize:function(e,f){var d=c(this).data("resizable"),g=d.options;if(d.ghost){d.ghost.css({position:"relative",height:d.size.height,width:d.size.width})}},stop:function(e,f){var d=c(this).data("resizable"),g=d.options;if(d.ghost&&d.helper){d.helper.get(0).removeChild(d.ghost.get(0))}}});c.ui.plugin.add("resizable","grid",{resize:function(d,l){var n=c(this).data("resizable"),g=n.options,j=n.size,h=n.originalSize,i=n.originalPosition,m=n.axis,k=g._aspectRatio||d.shiftKey;g.grid=typeof g.grid=="number"?[g.grid,g.grid]:g.grid;var f=Math.round((j.width-h.width)/(g.grid[0]||1))*(g.grid[0]||1),e=Math.round((j.height-h.height)/(g.grid[1]||1))*(g.grid[1]||1);if(/^(se|s|e)$/.test(m)){n.size.width=h.width+f;n.size.height=h.height+e}else{if(/^(ne)$/.test(m)){n.size.width=h.width+f;n.size.height=h.height+e;n.position.top=i.top-e}else{if(/^(sw)$/.test(m)){n.size.width=h.width+f;n.size.height=h.height+e;n.position.left=i.left-f}else{n.size.width=h.width+f;n.size.height=h.height+e;n.position.top=i.top-e;n.position.left=i.left-f}}}}});var b=function(d){return parseInt(d,10)||0};var a=function(d){return !isNaN(parseInt(d,10))}})(jQuery);;/*
 * jQuery UI Selectable 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Selectables
 *
 * Depends:
 *    ui.core.js
 */(function(a){a.widget("ui.selectable",a.extend({},a.ui.mouse,{_init:function(){var b=this;this.element.addClass("ui-selectable");this.dragged=false;var c;this.refresh=function(){c=a(b.options.filter,b.element[0]);c.each(function(){var d=a(this);var e=d.offset();a.data(this,"selectable-item",{element:this,$element:d,left:e.left,top:e.top,right:e.left+d.outerWidth(),bottom:e.top+d.outerHeight(),startselected:false,selected:d.hasClass("ui-selected"),selecting:d.hasClass("ui-selecting"),unselecting:d.hasClass("ui-unselecting")})})};this.refresh();this.selectees=c.addClass("ui-selectee");this._mouseInit();this.helper=a(document.createElement("div")).css({border:"1px dotted black"}).addClass("ui-selectable-helper")},destroy:function(){this.element.removeClass("ui-selectable ui-selectable-disabled").removeData("selectable").unbind(".selectable");this._mouseDestroy()},_mouseStart:function(d){var b=this;this.opos=[d.pageX,d.pageY];if(this.options.disabled){return}var c=this.options;this.selectees=a(c.filter,this.element[0]);this._trigger("start",d);a(c.appendTo).append(this.helper);this.helper.css({"z-index":100,position:"absolute",left:d.clientX,top:d.clientY,width:0,height:0});if(c.autoRefresh){this.refresh()}this.selectees.filter(".ui-selected").each(function(){var e=a.data(this,"selectable-item");e.startselected=true;if(!d.metaKey){e.$element.removeClass("ui-selected");e.selected=false;e.$element.addClass("ui-unselecting");e.unselecting=true;b._trigger("unselecting",d,{unselecting:e.element})}});a(d.target).parents().andSelf().each(function(){var e=a.data(this,"selectable-item");if(e){e.$element.removeClass("ui-unselecting").addClass("ui-selecting");e.unselecting=false;e.selecting=true;e.selected=true;b._trigger("selecting",d,{selecting:e.element});return false}})},_mouseDrag:function(i){var c=this;this.dragged=true;if(this.options.disabled){return}var e=this.options;var d=this.opos[0],h=this.opos[1],b=i.pageX,g=i.pageY;if(d>b){var f=b;b=d;d=f}if(h>g){var f=g;g=h;h=f}this.helper.css({left:d,top:h,width:b-d,height:g-h});this.selectees.each(function(){var j=a.data(this,"selectable-item");if(!j||j.element==c.element[0]){return}var k=false;if(e.tolerance=="touch"){k=(!(j.left>b||j.right<d||j.top>g||j.bottom<h))}else{if(e.tolerance=="fit"){k=(j.left>d&&j.right<b&&j.top>h&&j.bottom<g)}}if(k){if(j.selected){j.$element.removeClass("ui-selected");j.selected=false}if(j.unselecting){j.$element.removeClass("ui-unselecting");j.unselecting=false}if(!j.selecting){j.$element.addClass("ui-selecting");j.selecting=true;c._trigger("selecting",i,{selecting:j.element})}}else{if(j.selecting){if(i.metaKey&&j.startselected){j.$element.removeClass("ui-selecting");j.selecting=false;j.$element.addClass("ui-selected");j.selected=true}else{j.$element.removeClass("ui-selecting");j.selecting=false;if(j.startselected){j.$element.addClass("ui-unselecting");j.unselecting=true}c._trigger("unselecting",i,{unselecting:j.element})}}if(j.selected){if(!i.metaKey&&!j.startselected){j.$element.removeClass("ui-selected");j.selected=false;j.$element.addClass("ui-unselecting");j.unselecting=true;c._trigger("unselecting",i,{unselecting:j.element})}}}});return false},_mouseStop:function(d){var b=this;this.dragged=false;var c=this.options;a(".ui-unselecting",this.element[0]).each(function(){var e=a.data(this,"selectable-item");e.$element.removeClass("ui-unselecting");e.unselecting=false;e.startselected=false;b._trigger("unselected",d,{unselected:e.element})});a(".ui-selecting",this.element[0]).each(function(){var e=a.data(this,"selectable-item");e.$element.removeClass("ui-selecting").addClass("ui-selected");e.selecting=false;e.selected=true;e.startselected=true;b._trigger("selected",d,{selected:e.element})});this._trigger("stop",d);this.helper.remove();return false}}));a.extend(a.ui.selectable,{version:"1.7.1",defaults:{appendTo:"body",autoRefresh:true,cancel:":input,option",delay:0,distance:0,filter:"*",tolerance:"touch"}})})(jQuery);;/*
 * jQuery UI Sortable 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Sortables
 *
 * Depends:
 *    ui.core.js
 */(function(a){a.widget("ui.sortable",a.extend({},a.ui.mouse,{_init:function(){var b=this.options;this.containerCache={};this.element.addClass("ui-sortable");this.refresh();this.floating=this.items.length?(/left|right/).test(this.items[0].item.css("float")):false;this.offset=this.element.offset();this._mouseInit()},destroy:function(){this.element.removeClass("ui-sortable ui-sortable-disabled").removeData("sortable").unbind(".sortable");this._mouseDestroy();for(var b=this.items.length-1;b>=0;b--){this.items[b].item.removeData("sortable-item")}},_mouseCapture:function(e,f){if(this.reverting){return false}if(this.options.disabled||this.options.type=="static"){return false}this._refreshItems(e);var d=null,c=this,b=a(e.target).parents().each(function(){if(a.data(this,"sortable-item")==c){d=a(this);return false}});if(a.data(e.target,"sortable-item")==c){d=a(e.target)}if(!d){return false}if(this.options.handle&&!f){var g=false;a(this.options.handle,d).find("*").andSelf().each(function(){if(this==e.target){g=true}});if(!g){return false}}this.currentItem=d;this._removeCurrentsFromItems();return true},_mouseStart:function(e,f,b){var g=this.options,c=this;this.currentContainer=this;this.refreshPositions();this.helper=this._createHelper(e);this._cacheHelperProportions();this._cacheMargins();this.scrollParent=this.helper.scrollParent();this.offset=this.currentItem.offset();this.offset={top:this.offset.top-this.margins.top,left:this.offset.left-this.margins.left};this.helper.css("position","absolute");this.cssPosition=this.helper.css("position");a.extend(this.offset,{click:{left:e.pageX-this.offset.left,top:e.pageY-this.offset.top},parent:this._getParentOffset(),relative:this._getRelativeOffset()});this.originalPosition=this._generatePosition(e);this.originalPageX=e.pageX;this.originalPageY=e.pageY;if(g.cursorAt){this._adjustOffsetFromHelper(g.cursorAt)}this.domPosition={prev:this.currentItem.prev()[0],parent:this.currentItem.parent()[0]};if(this.helper[0]!=this.currentItem[0]){this.currentItem.hide()}this._createPlaceholder();if(g.containment){this._setContainment()}if(g.cursor){if(a("body").css("cursor")){this._storedCursor=a("body").css("cursor")}a("body").css("cursor",g.cursor)}if(g.opacity){if(this.helper.css("opacity")){this._storedOpacity=this.helper.css("opacity")}this.helper.css("opacity",g.opacity)}if(g.zIndex){if(this.helper.css("zIndex")){this._storedZIndex=this.helper.css("zIndex")}this.helper.css("zIndex",g.zIndex)}if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){this.overflowOffset=this.scrollParent.offset()}this._trigger("start",e,this._uiHash());if(!this._preserveHelperProportions){this._cacheHelperProportions()}if(!b){for(var d=this.containers.length-1;d>=0;d--){this.containers[d]._trigger("activate",e,c._uiHash(this))}}if(a.ui.ddmanager){a.ui.ddmanager.current=this}if(a.ui.ddmanager&&!g.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,e)}this.dragging=true;this.helper.addClass("ui-sortable-helper");this._mouseDrag(e);return true},_mouseDrag:function(f){this.position=this._generatePosition(f);this.positionAbs=this._convertPositionTo("absolute");if(!this.lastPositionAbs){this.lastPositionAbs=this.positionAbs}if(this.options.scroll){var g=this.options,b=false;if(this.scrollParent[0]!=document&&this.scrollParent[0].tagName!="HTML"){if((this.overflowOffset.top+this.scrollParent[0].offsetHeight)-f.pageY<g.scrollSensitivity){this.scrollParent[0].scrollTop=b=this.scrollParent[0].scrollTop+g.scrollSpeed}else{if(f.pageY-this.overflowOffset.top<g.scrollSensitivity){this.scrollParent[0].scrollTop=b=this.scrollParent[0].scrollTop-g.scrollSpeed}}if((this.overflowOffset.left+this.scrollParent[0].offsetWidth)-f.pageX<g.scrollSensitivity){this.scrollParent[0].scrollLeft=b=this.scrollParent[0].scrollLeft+g.scrollSpeed}else{if(f.pageX-this.overflowOffset.left<g.scrollSensitivity){this.scrollParent[0].scrollLeft=b=this.scrollParent[0].scrollLeft-g.scrollSpeed}}}else{if(f.pageY-a(document).scrollTop()<g.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()-g.scrollSpeed)}else{if(a(window).height()-(f.pageY-a(document).scrollTop())<g.scrollSensitivity){b=a(document).scrollTop(a(document).scrollTop()+g.scrollSpeed)}}if(f.pageX-a(document).scrollLeft()<g.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()-g.scrollSpeed)}else{if(a(window).width()-(f.pageX-a(document).scrollLeft())<g.scrollSensitivity){b=a(document).scrollLeft(a(document).scrollLeft()+g.scrollSpeed)}}}if(b!==false&&a.ui.ddmanager&&!g.dropBehaviour){a.ui.ddmanager.prepareOffsets(this,f)}}this.positionAbs=this._convertPositionTo("absolute");if(!this.options.axis||this.options.axis!="y"){this.helper[0].style.left=this.position.left+"px"}if(!this.options.axis||this.options.axis!="x"){this.helper[0].style.top=this.position.top+"px"}for(var d=this.items.length-1;d>=0;d--){var e=this.items[d],c=e.item[0],h=this._intersectsWithPointer(e);if(!h){continue}if(c!=this.currentItem[0]&&this.placeholder[h==1?"next":"prev"]()[0]!=c&&!a.ui.contains(this.placeholder[0],c)&&(this.options.type=="semi-dynamic"?!a.ui.contains(this.element[0],c):true)){this.direction=h==1?"down":"up";if(this.options.tolerance=="pointer"||this._intersectsWithSides(e)){this._rearrange(f,e)}else{break}this._trigger("change",f,this._uiHash());break}}this._contactContainers(f);if(a.ui.ddmanager){a.ui.ddmanager.drag(this,f)}this._trigger("sort",f,this._uiHash());this.lastPositionAbs=this.positionAbs;return false},_mouseStop:function(c,d){if(!c){return}if(a.ui.ddmanager&&!this.options.dropBehaviour){a.ui.ddmanager.drop(this,c)}if(this.options.revert){var b=this;var e=b.placeholder.offset();b.reverting=true;a(this.helper).animate({left:e.left-this.offset.parent.left-b.margins.left+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollLeft),top:e.top-this.offset.parent.top-b.margins.top+(this.offsetParent[0]==document.body?0:this.offsetParent[0].scrollTop)},parseInt(this.options.revert,10)||500,function(){b._clear(c)})}else{this._clear(c,d)}return false},cancel:function(){var b=this;if(this.dragging){this._mouseUp();if(this.options.helper=="original"){this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else{this.currentItem.show()}for(var c=this.containers.length-1;c>=0;c--){this.containers[c]._trigger("deactivate",null,b._uiHash(this));if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",null,b._uiHash(this));this.containers[c].containerCache.over=0}}}if(this.placeholder[0].parentNode){this.placeholder[0].parentNode.removeChild(this.placeholder[0])}if(this.options.helper!="original"&&this.helper&&this.helper[0].parentNode){this.helper.remove()}a.extend(this,{helper:null,dragging:false,reverting:false,_noFinalSort:null});if(this.domPosition.prev){a(this.domPosition.prev).after(this.currentItem)}else{a(this.domPosition.parent).prepend(this.currentItem)}return true},serialize:function(d){var b=this._getItemsAsjQuery(d&&d.connected);var c=[];d=d||{};a(b).each(function(){var e=(a(d.item||this).attr(d.attribute||"id")||"").match(d.expression||(/(.+)[-=_](.+)/));if(e){c.push((d.key||e[1]+"[]")+"="+(d.key&&d.expression?e[1]:e[2]))}});return c.join("&")},toArray:function(d){var b=this._getItemsAsjQuery(d&&d.connected);var c=[];d=d||{};b.each(function(){c.push(a(d.item||this).attr(d.attribute||"id")||"")});return c},_intersectsWith:function(m){var e=this.positionAbs.left,d=e+this.helperProportions.width,k=this.positionAbs.top,j=k+this.helperProportions.height;var f=m.left,c=f+m.width,n=m.top,i=n+m.height;var o=this.offset.click.top,h=this.offset.click.left;var g=(k+o)>n&&(k+o)<i&&(e+h)>f&&(e+h)<c;if(this.options.tolerance=="pointer"||this.options.forcePointerForContainers||(this.options.tolerance!="pointer"&&this.helperProportions[this.floating?"width":"height"]>m[this.floating?"width":"height"])){return g}else{return(f<e+(this.helperProportions.width/2)&&d-(this.helperProportions.width/2)<c&&n<k+(this.helperProportions.height/2)&&j-(this.helperProportions.height/2)<i)}},_intersectsWithPointer:function(d){var e=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,d.top,d.height),c=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,d.left,d.width),g=e&&c,b=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();if(!g){return false}return this.floating?(((f&&f=="right")||b=="down")?2:1):(b&&(b=="down"?2:1))},_intersectsWithSides:function(e){var c=a.ui.isOverAxis(this.positionAbs.top+this.offset.click.top,e.top+(e.height/2),e.height),d=a.ui.isOverAxis(this.positionAbs.left+this.offset.click.left,e.left+(e.width/2),e.width),b=this._getDragVerticalDirection(),f=this._getDragHorizontalDirection();if(this.floating&&f){return((f=="right"&&d)||(f=="left"&&!d))}else{return b&&((b=="down"&&c)||(b=="up"&&!c))}},_getDragVerticalDirection:function(){var b=this.positionAbs.top-this.lastPositionAbs.top;return b!=0&&(b>0?"down":"up")},_getDragHorizontalDirection:function(){var b=this.positionAbs.left-this.lastPositionAbs.left;return b!=0&&(b>0?"right":"left")},refresh:function(b){this._refreshItems(b);this.refreshPositions()},_connectWith:function(){var b=this.options;return b.connectWith.constructor==String?[b.connectWith]:b.connectWith},_getItemsAsjQuery:function(b){var l=this;var g=[];var e=[];var h=this._connectWith();if(h&&b){for(var d=h.length-1;d>=0;d--){var k=a(h[d]);for(var c=k.length-1;c>=0;c--){var f=a.data(k[c],"sortable");if(f&&f!=this&&!f.options.disabled){e.push([a.isFunction(f.options.items)?f.options.items.call(f.element):a(f.options.items,f.element).not(".ui-sortable-helper"),f])}}}}e.push([a.isFunction(this.options.items)?this.options.items.call(this.element,null,{options:this.options,item:this.currentItem}):a(this.options.items,this.element).not(".ui-sortable-helper"),this]);for(var d=e.length-1;d>=0;d--){e[d][0].each(function(){g.push(this)})}return a(g)},_removeCurrentsFromItems:function(){var d=this.currentItem.find(":data(sortable-item)");for(var c=0;c<this.items.length;c++){for(var b=0;b<d.length;b++){if(d[b]==this.items[c].item[0]){this.items.splice(c,1)}}}},_refreshItems:function(b){this.items=[];this.containers=[this];var h=this.items;var p=this;var f=[[a.isFunction(this.options.items)?this.options.items.call(this.element[0],b,{item:this.currentItem}):a(this.options.items,this.element),this]];var l=this._connectWith();if(l){for(var e=l.length-1;e>=0;e--){var m=a(l[e]);for(var d=m.length-1;d>=0;d--){var g=a.data(m[d],"sortable");if(g&&g!=this&&!g.options.disabled){f.push([a.isFunction(g.options.items)?g.options.items.call(g.element[0],b,{item:this.currentItem}):a(g.options.items,g.element),g]);this.containers.push(g)}}}}for(var e=f.length-1;e>=0;e--){var k=f[e][1];var c=f[e][0];for(var d=0,n=c.length;d<n;d++){var o=a(c[d]);o.data("sortable-item",k);h.push({item:o,instance:k,width:0,height:0,left:0,top:0})}}},refreshPositions:function(b){if(this.offsetParent&&this.helper){this.offset.parent=this._getParentOffset()}for(var d=this.items.length-1;d>=0;d--){var e=this.items[d];if(e.instance!=this.currentContainer&&this.currentContainer&&e.item[0]!=this.currentItem[0]){continue}var c=this.options.toleranceElement?a(this.options.toleranceElement,e.item):e.item;if(!b){e.width=c.outerWidth();e.height=c.outerHeight()}var f=c.offset();e.left=f.left;e.top=f.top}if(this.options.custom&&this.options.custom.refreshContainers){this.options.custom.refreshContainers.call(this)}else{for(var d=this.containers.length-1;d>=0;d--){var f=this.containers[d].element.offset();this.containers[d].containerCache.left=f.left;this.containers[d].containerCache.top=f.top;this.containers[d].containerCache.width=this.containers[d].element.outerWidth();this.containers[d].containerCache.height=this.containers[d].element.outerHeight()}}},_createPlaceholder:function(d){var b=d||this,e=b.options;if(!e.placeholder||e.placeholder.constructor==String){var c=e.placeholder;e.placeholder={element:function(){var f=a(document.createElement(b.currentItem[0].nodeName)).addClass(c||b.currentItem[0].className+" ui-sortable-placeholder").removeClass("ui-sortable-helper")[0];if(!c){f.style.visibility="hidden"}return f},update:function(f,g){if(c&&!e.forcePlaceholderSize){return}if(!g.height()){g.height(b.currentItem.innerHeight()-parseInt(b.currentItem.css("paddingTop")||0,10)-parseInt(b.currentItem.css("paddingBottom")||0,10))}if(!g.width()){g.width(b.currentItem.innerWidth()-parseInt(b.currentItem.css("paddingLeft")||0,10)-parseInt(b.currentItem.css("paddingRight")||0,10))}}}}b.placeholder=a(e.placeholder.element.call(b.element,b.currentItem));b.currentItem.after(b.placeholder);e.placeholder.update(b,b.placeholder)},_contactContainers:function(d){for(var c=this.containers.length-1;c>=0;c--){if(this._intersectsWith(this.containers[c].containerCache)){if(!this.containers[c].containerCache.over){if(this.currentContainer!=this.containers[c]){var h=10000;var g=null;var e=this.positionAbs[this.containers[c].floating?"left":"top"];for(var b=this.items.length-1;b>=0;b--){if(!a.ui.contains(this.containers[c].element[0],this.items[b].item[0])){continue}var f=this.items[b][this.containers[c].floating?"left":"top"];if(Math.abs(f-e)<h){h=Math.abs(f-e);g=this.items[b]}}if(!g&&!this.options.dropOnEmpty){continue}this.currentContainer=this.containers[c];g?this._rearrange(d,g,null,true):this._rearrange(d,null,this.containers[c].element,true);this._trigger("change",d,this._uiHash());this.containers[c]._trigger("change",d,this._uiHash(this));this.options.placeholder.update(this.currentContainer,this.placeholder)}this.containers[c]._trigger("over",d,this._uiHash(this));this.containers[c].containerCache.over=1}}else{if(this.containers[c].containerCache.over){this.containers[c]._trigger("out",d,this._uiHash(this));this.containers[c].containerCache.over=0}}}},_createHelper:function(c){var d=this.options;var b=a.isFunction(d.helper)?a(d.helper.apply(this.element[0],[c,this.currentItem])):(d.helper=="clone"?this.currentItem.clone():this.currentItem);if(!b.parents("body").length){a(d.appendTo!="parent"?d.appendTo:this.currentItem[0].parentNode)[0].appendChild(b[0])}if(b[0]==this.currentItem[0]){this._storedCSS={width:this.currentItem[0].style.width,height:this.currentItem[0].style.height,position:this.currentItem.css("position"),top:this.currentItem.css("top"),left:this.currentItem.css("left")}}if(b[0].style.width==""||d.forceHelperSize){b.width(this.currentItem.width())}if(b[0].style.height==""||d.forceHelperSize){b.height(this.currentItem.height())}return b},_adjustOffsetFromHelper:function(b){if(b.left!=undefined){this.offset.click.left=b.left+this.margins.left}if(b.right!=undefined){this.offset.click.left=this.helperProportions.width-b.right+this.margins.left}if(b.top!=undefined){this.offset.click.top=b.top+this.margins.top}if(b.bottom!=undefined){this.offset.click.top=this.helperProportions.height-b.bottom+this.margins.top}},_getParentOffset:function(){this.offsetParent=this.helper.offsetParent();var b=this.offsetParent.offset();if(this.cssPosition=="absolute"&&this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0])){b.left+=this.scrollParent.scrollLeft();b.top+=this.scrollParent.scrollTop()}if((this.offsetParent[0]==document.body)||(this.offsetParent[0].tagName&&this.offsetParent[0].tagName.toLowerCase()=="html"&&a.browser.msie)){b={top:0,left:0}}return{top:b.top+(parseInt(this.offsetParent.css("borderTopWidth"),10)||0),left:b.left+(parseInt(this.offsetParent.css("borderLeftWidth"),10)||0)}},_getRelativeOffset:function(){if(this.cssPosition=="relative"){var b=this.currentItem.position();return{top:b.top-(parseInt(this.helper.css("top"),10)||0)+this.scrollParent.scrollTop(),left:b.left-(parseInt(this.helper.css("left"),10)||0)+this.scrollParent.scrollLeft()}}else{return{top:0,left:0}}},_cacheMargins:function(){this.margins={left:(parseInt(this.currentItem.css("marginLeft"),10)||0),top:(parseInt(this.currentItem.css("marginTop"),10)||0)}},_cacheHelperProportions:function(){this.helperProportions={width:this.helper.outerWidth(),height:this.helper.outerHeight()}},_setContainment:function(){var e=this.options;if(e.containment=="parent"){e.containment=this.helper[0].parentNode}if(e.containment=="document"||e.containment=="window"){this.containment=[0-this.offset.relative.left-this.offset.parent.left,0-this.offset.relative.top-this.offset.parent.top,a(e.containment=="document"?document:window).width()-this.helperProportions.width-this.margins.left,(a(e.containment=="document"?document:window).height()||document.body.parentNode.scrollHeight)-this.helperProportions.height-this.margins.top]}if(!(/^(document|window|parent)$/).test(e.containment)){var c=a(e.containment)[0];var d=a(e.containment).offset();var b=(a(c).css("overflow")!="hidden");this.containment=[d.left+(parseInt(a(c).css("borderLeftWidth"),10)||0)+(parseInt(a(c).css("paddingLeft"),10)||0)-this.margins.left,d.top+(parseInt(a(c).css("borderTopWidth"),10)||0)+(parseInt(a(c).css("paddingTop"),10)||0)-this.margins.top,d.left+(b?Math.max(c.scrollWidth,c.offsetWidth):c.offsetWidth)-(parseInt(a(c).css("borderLeftWidth"),10)||0)-(parseInt(a(c).css("paddingRight"),10)||0)-this.helperProportions.width-this.margins.left,d.top+(b?Math.max(c.scrollHeight,c.offsetHeight):c.offsetHeight)-(parseInt(a(c).css("borderTopWidth"),10)||0)-(parseInt(a(c).css("paddingBottom"),10)||0)-this.helperProportions.height-this.margins.top]}},_convertPositionTo:function(f,h){if(!h){h=this.position}var c=f=="absolute"?1:-1;var e=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,g=(/(html|body)/i).test(b[0].tagName);return{top:(h.top+this.offset.relative.top*c+this.offset.parent.top*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(g?0:b.scrollTop()))*c)),left:(h.left+this.offset.relative.left*c+this.offset.parent.left*c-(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():g?0:b.scrollLeft())*c))}},_generatePosition:function(e){var h=this.options,b=this.cssPosition=="absolute"&&!(this.scrollParent[0]!=document&&a.ui.contains(this.scrollParent[0],this.offsetParent[0]))?this.offsetParent:this.scrollParent,i=(/(html|body)/i).test(b[0].tagName);if(this.cssPosition=="relative"&&!(this.scrollParent[0]!=document&&this.scrollParent[0]!=this.offsetParent[0])){this.offset.relative=this._getRelativeOffset()}var d=e.pageX;var c=e.pageY;if(this.originalPosition){if(this.containment){if(e.pageX-this.offset.click.left<this.containment[0]){d=this.containment[0]+this.offset.click.left}if(e.pageY-this.offset.click.top<this.containment[1]){c=this.containment[1]+this.offset.click.top}if(e.pageX-this.offset.click.left>this.containment[2]){d=this.containment[2]+this.offset.click.left}if(e.pageY-this.offset.click.top>this.containment[3]){c=this.containment[3]+this.offset.click.top}}if(h.grid){var g=this.originalPageY+Math.round((c-this.originalPageY)/h.grid[1])*h.grid[1];c=this.containment?(!(g-this.offset.click.top<this.containment[1]||g-this.offset.click.top>this.containment[3])?g:(!(g-this.offset.click.top<this.containment[1])?g-h.grid[1]:g+h.grid[1])):g;var f=this.originalPageX+Math.round((d-this.originalPageX)/h.grid[0])*h.grid[0];d=this.containment?(!(f-this.offset.click.left<this.containment[0]||f-this.offset.click.left>this.containment[2])?f:(!(f-this.offset.click.left<this.containment[0])?f-h.grid[0]:f+h.grid[0])):f}}return{top:(c-this.offset.click.top-this.offset.relative.top-this.offset.parent.top+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollTop():(i?0:b.scrollTop())))),left:(d-this.offset.click.left-this.offset.relative.left-this.offset.parent.left+(a.browser.safari&&this.cssPosition=="fixed"?0:(this.cssPosition=="fixed"?-this.scrollParent.scrollLeft():i?0:b.scrollLeft())))}},_rearrange:function(g,f,c,e){c?c[0].appendChild(this.placeholder[0]):f.item[0].parentNode.insertBefore(this.placeholder[0],(this.direction=="down"?f.item[0]:f.item[0].nextSibling));this.counter=this.counter?++this.counter:1;var d=this,b=this.counter;window.setTimeout(function(){if(b==d.counter){d.refreshPositions(!e)}},0)},_clear:function(d,e){this.reverting=false;var f=[],b=this;if(!this._noFinalSort&&this.currentItem[0].parentNode){this.placeholder.before(this.currentItem)}this._noFinalSort=null;if(this.helper[0]==this.currentItem[0]){for(var c in this._storedCSS){if(this._storedCSS[c]=="auto"||this._storedCSS[c]=="static"){this._storedCSS[c]=""}}this.currentItem.css(this._storedCSS).removeClass("ui-sortable-helper")}else{this.currentItem.show()}if(this.fromOutside&&!e){f.push(function(g){this._trigger("receive",g,this._uiHash(this.fromOutside))})}if((this.fromOutside||this.domPosition.prev!=this.currentItem.prev().not(".ui-sortable-helper")[0]||this.domPosition.parent!=this.currentItem.parent()[0])&&!e){f.push(function(g){this._trigger("update",g,this._uiHash())})}if(!a.ui.contains(this.element[0],this.currentItem[0])){if(!e){f.push(function(g){this._trigger("remove",g,this._uiHash())})}for(var c=this.containers.length-1;c>=0;c--){if(a.ui.contains(this.containers[c].element[0],this.currentItem[0])&&!e){f.push((function(g){return function(h){g._trigger("receive",h,this._uiHash(this))}}).call(this,this.containers[c]));f.push((function(g){return function(h){g._trigger("update",h,this._uiHash(this))}}).call(this,this.containers[c]))}}}for(var c=this.containers.length-1;c>=0;c--){if(!e){f.push((function(g){return function(h){g._trigger("deactivate",h,this._uiHash(this))}}).call(this,this.containers[c]))}if(this.containers[c].containerCache.over){f.push((function(g){return function(h){g._trigger("out",h,this._uiHash(this))}}).call(this,this.containers[c]));this.containers[c].containerCache.over=0}}if(this._storedCursor){a("body").css("cursor",this._storedCursor)}if(this._storedOpacity){this.helper.css("opacity",this._storedOpacity)}if(this._storedZIndex){this.helper.css("zIndex",this._storedZIndex=="auto"?"":this._storedZIndex)}this.dragging=false;if(this.cancelHelperRemoval){if(!e){this._trigger("beforeStop",d,this._uiHash());for(var c=0;c<f.length;c++){f[c].call(this,d)}this._trigger("stop",d,this._uiHash())}return false}if(!e){this._trigger("beforeStop",d,this._uiHash())}this.placeholder[0].parentNode.removeChild(this.placeholder[0]);if(this.helper[0]!=this.currentItem[0]){this.helper.remove()}this.helper=null;if(!e){for(var c=0;c<f.length;c++){f[c].call(this,d)}this._trigger("stop",d,this._uiHash())}this.fromOutside=false;return true},_trigger:function(){if(a.widget.prototype._trigger.apply(this,arguments)===false){this.cancel()}},_uiHash:function(c){var b=c||this;return{helper:b.helper,placeholder:b.placeholder||a([]),position:b.position,absolutePosition:b.positionAbs,offset:b.positionAbs,item:b.currentItem,sender:c?c.element:null}}}));a.extend(a.ui.sortable,{getter:"serialize toArray",version:"1.7.1",eventPrefix:"sort",defaults:{appendTo:"parent",axis:false,cancel:":input,option",connectWith:false,containment:false,cursor:"auto",cursorAt:false,delay:0,distance:1,dropOnEmpty:true,forcePlaceholderSize:false,forceHelperSize:false,grid:false,handle:false,helper:"original",items:"> *",opacity:false,placeholder:false,revert:false,scroll:true,scrollSensitivity:20,scrollSpeed:20,scope:"default",tolerance:"intersect",zIndex:1000}})})(jQuery);;/*
 * jQuery UI Accordion 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Accordion
 *
 * Depends:
 *    ui.core.js
 */(function(a){a.widget("ui.accordion",{_init:function(){var d=this.options,b=this;this.running=0;if(d.collapsible==a.ui.accordion.defaults.collapsible&&d.alwaysOpen!=a.ui.accordion.defaults.alwaysOpen){d.collapsible=!d.alwaysOpen}if(d.navigation){var c=this.element.find("a").filter(d.navigationFilter);if(c.length){if(c.filter(d.header).length){this.active=c}else{this.active=c.parent().parent().prev();c.addClass("ui-accordion-content-active")}}}this.element.addClass("ui-accordion ui-widget ui-helper-reset");if(this.element[0].nodeName=="UL"){this.element.children("li").addClass("ui-accordion-li-fix")}this.headers=this.element.find(d.header).addClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all").bind("mouseenter.accordion",function(){a(this).addClass("ui-state-hover")}).bind("mouseleave.accordion",function(){a(this).removeClass("ui-state-hover")}).bind("focus.accordion",function(){a(this).addClass("ui-state-focus")}).bind("blur.accordion",function(){a(this).removeClass("ui-state-focus")});this.headers.next().addClass("ui-accordion-content ui-helper-reset ui-widget-content ui-corner-bottom");this.active=this._findActive(this.active||d.active).toggleClass("ui-state-default").toggleClass("ui-state-active").toggleClass("ui-corner-all").toggleClass("ui-corner-top");this.active.next().addClass("ui-accordion-content-active");a("<span/>").addClass("ui-icon "+d.icons.header).prependTo(this.headers);this.active.find(".ui-icon").toggleClass(d.icons.header).toggleClass(d.icons.headerSelected);if(a.browser.msie){this.element.find("a").css("zoom","1")}this.resize();this.element.attr("role","tablist");this.headers.attr("role","tab").bind("keydown",function(e){return b._keydown(e)}).next().attr("role","tabpanel");this.headers.not(this.active||"").attr("aria-expanded","false").attr("tabIndex","-1").next().hide();if(!this.active.length){this.headers.eq(0).attr("tabIndex","0")}else{this.active.attr("aria-expanded","true").attr("tabIndex","0")}if(!a.browser.safari){this.headers.find("a").attr("tabIndex","-1")}if(d.event){this.headers.bind((d.event)+".accordion",function(e){return b._clickHandler.call(b,e,this)})}},destroy:function(){var c=this.options;this.element.removeClass("ui-accordion ui-widget ui-helper-reset").removeAttr("role").unbind(".accordion").removeData("accordion");this.headers.unbind(".accordion").removeClass("ui-accordion-header ui-helper-reset ui-state-default ui-corner-all ui-state-active ui-corner-top").removeAttr("role").removeAttr("aria-expanded").removeAttr("tabindex");this.headers.find("a").removeAttr("tabindex");this.headers.children(".ui-icon").remove();var b=this.headers.next().css("display","").removeAttr("role").removeClass("ui-helper-reset ui-widget-content ui-corner-bottom ui-accordion-content ui-accordion-content-active");if(c.autoHeight||c.fillHeight){b.css("height","")}},_setData:function(b,c){if(b=="alwaysOpen"){b="collapsible";c=!c}a.widget.prototype._setData.apply(this,arguments)},_keydown:function(e){var g=this.options,f=a.ui.keyCode;if(g.disabled||e.altKey||e.ctrlKey){return}var d=this.headers.length;var b=this.headers.index(e.target);var c=false;switch(e.keyCode){case f.RIGHT:case f.DOWN:c=this.headers[(b+1)%d];break;case f.LEFT:case f.UP:c=this.headers[(b-1+d)%d];break;case f.SPACE:case f.ENTER:return this._clickHandler({target:e.target},e.target)}if(c){a(e.target).attr("tabIndex","-1");a(c).attr("tabIndex","0");c.focus();return false}return true},resize:function(){var e=this.options,d;if(e.fillSpace){if(a.browser.msie){var b=this.element.parent().css("overflow");this.element.parent().css("overflow","hidden")}d=this.element.parent().height();if(a.browser.msie){this.element.parent().css("overflow",b)}this.headers.each(function(){d-=a(this).outerHeight()});var c=0;this.headers.next().each(function(){c=Math.max(c,a(this).innerHeight()-a(this).height())}).height(Math.max(0,d-c)).css("overflow","auto")}else{if(e.autoHeight){d=0;this.headers.next().each(function(){d=Math.max(d,a(this).outerHeight())}).height(d)}}},activate:function(b){var c=this._findActive(b)[0];this._clickHandler({target:c},c)},_findActive:function(b){return b?typeof b=="number"?this.headers.filter(":eq("+b+")"):this.headers.not(this.headers.not(b)):b===false?a([]):this.headers.filter(":eq(0)")},_clickHandler:function(b,f){var d=this.options;if(d.disabled){return false}if(!b.target&&d.collapsible){this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");var h=this.active.next(),e={options:d,newHeader:a([]),oldHeader:d.active,newContent:a([]),oldContent:h},c=(this.active=a([]));this._toggle(c,h,e);return false}var g=a(b.currentTarget||f);var i=g[0]==this.active[0];if(this.running||(!d.collapsible&&i)){return false}this.active.removeClass("ui-state-active ui-corner-top").addClass("ui-state-default ui-corner-all").find(".ui-icon").removeClass(d.icons.headerSelected).addClass(d.icons.header);this.active.next().addClass("ui-accordion-content-active");if(!i){g.removeClass("ui-state-default ui-corner-all").addClass("ui-state-active ui-corner-top").find(".ui-icon").removeClass(d.icons.header).addClass(d.icons.headerSelected);g.next().addClass("ui-accordion-content-active")}var c=g.next(),h=this.active.next(),e={options:d,newHeader:i&&d.collapsible?a([]):g,oldHeader:this.active,newContent:i&&d.collapsible?a([]):c.find("> *"),oldContent:h.find("> *")},j=this.headers.index(this.active[0])>this.headers.index(g[0]);this.active=i?a([]):g;this._toggle(c,h,e,i,j);return false},_toggle:function(b,i,g,j,k){var d=this.options,m=this;this.toShow=b;this.toHide=i;this.data=g;var c=function(){if(!m){return}return m._completed.apply(m,arguments)};this._trigger("changestart",null,this.data);this.running=i.size()===0?b.size():i.size();if(d.animated){var f={};if(d.collapsible&&j){f={toShow:a([]),toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace}}else{f={toShow:b,toHide:i,complete:c,down:k,autoHeight:d.autoHeight||d.fillSpace}}if(!d.proxied){d.proxied=d.animated}if(!d.proxiedDuration){d.proxiedDuration=d.duration}d.animated=a.isFunction(d.proxied)?d.proxied(f):d.proxied;d.duration=a.isFunction(d.proxiedDuration)?d.proxiedDuration(f):d.proxiedDuration;var l=a.ui.accordion.animations,e=d.duration,h=d.animated;if(!l[h]){l[h]=function(n){this.slide(n,{easing:h,duration:e||700})}}l[h](f)}else{if(d.collapsible&&j){b.toggle()}else{i.hide();b.show()}c(true)}i.prev().attr("aria-expanded","false").attr("tabIndex","-1").blur();b.prev().attr("aria-expanded","true").attr("tabIndex","0").focus()},_completed:function(b){var c=this.options;this.running=b?0:--this.running;if(this.running){return}if(c.clearStyle){this.toShow.add(this.toHide).css({height:"",overflow:""})}this._trigger("change",null,this.data)}});a.extend(a.ui.accordion,{version:"1.7.1",defaults:{active:null,alwaysOpen:true,animated:"slide",autoHeight:true,clearStyle:false,collapsible:false,event:"click",fillSpace:false,header:"> li > :first-child,> :not(li):even",icons:{header:"ui-icon-triangle-1-e",headerSelected:"ui-icon-triangle-1-s"},navigation:false,navigationFilter:function(){return this.href.toLowerCase()==location.href.toLowerCase()}},animations:{slide:function(j,h){j=a.extend({easing:"swing",duration:300},j,h);if(!j.toHide.size()){j.toShow.animate({height:"show"},j);return}if(!j.toShow.size()){j.toHide.animate({height:"hide"},j);return}var c=j.toShow.css("overflow"),g,d={},f={},e=["height","paddingTop","paddingBottom"],b;var i=j.toShow;b=i[0].style.width;i.width(parseInt(i.parent().width(),10)-parseInt(i.css("paddingLeft"),10)-parseInt(i.css("paddingRight"),10)-(parseInt(i.css("borderLeftWidth"),10)||0)-(parseInt(i.css("borderRightWidth"),10)||0));a.each(e,function(k,m){f[m]="hide";var l=(""+a.css(j.toShow[0],m)).match(/^([\d+-.]+)(.*)$/);d[m]={value:l[1],unit:l[2]||"px"}});j.toShow.css({height:0,overflow:"hidden"}).show();j.toHide.filter(":hidden").each(j.complete).end().filter(":visible").animate(f,{step:function(k,l){if(l.prop=="height"){g=(l.now-l.start)/(l.end-l.start)}j.toShow[0].style[l.prop]=(g*d[l.prop].value)+d[l.prop].unit},duration:j.duration,easing:j.easing,complete:function(){if(!j.autoHeight){j.toShow.css("height","")}j.toShow.css("width",b);j.toShow.css({overflow:c});j.complete()}})},bounceslide:function(b){this.slide(b,{easing:b.down?"easeOutBounce":"swing",duration:b.down?1000:200})},easeslide:function(b){this.slide(b,{easing:"easeinout",duration:700})}}})})(jQuery);;/*
 * jQuery UI Dialog 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Dialog
 *
 * Depends:
 *    ui.core.js
 *    ui.draggable.js
 *    ui.resizable.js
 */(function(c){var b={dragStart:"start.draggable",drag:"drag.draggable",dragStop:"stop.draggable",maxHeight:"maxHeight.resizable",minHeight:"minHeight.resizable",maxWidth:"maxWidth.resizable",minWidth:"minWidth.resizable",resizeStart:"start.resizable",resize:"drag.resizable",resizeStop:"stop.resizable"},a="ui-dialog ui-widget ui-widget-content ui-corner-all ";c.widget("ui.dialog",{_init:function(){this.originalTitle=this.element.attr("title");var l=this,m=this.options,j=m.title||this.originalTitle||"&nbsp;",e=c.ui.dialog.getTitleId(this.element),k=(this.uiDialog=c("<div/>")).appendTo(document.body).hide().addClass(a+m.dialogClass).css({position:"absolute",overflow:"hidden",zIndex:m.zIndex}).attr("tabIndex",-1).css("outline",0).keydown(function(n){(m.closeOnEscape&&n.keyCode&&n.keyCode==c.ui.keyCode.ESCAPE&&l.close(n))}).attr({role:"dialog","aria-labelledby":e}).mousedown(function(n){l.moveToTop(false,n)}),g=this.element.show().removeAttr("title").addClass("ui-dialog-content ui-widget-content").appendTo(k),f=(this.uiDialogTitlebar=c("<div></div>")).addClass("ui-dialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix").prependTo(k),i=c('<a href="#"/>').addClass("ui-dialog-titlebar-close ui-corner-all").attr("role","button").hover(function(){i.addClass("ui-state-hover")},function(){i.removeClass("ui-state-hover")}).focus(function(){i.addClass("ui-state-focus")}).blur(function(){i.removeClass("ui-state-focus")}).mousedown(function(n){n.stopPropagation()}).click(function(n){l.close(n);return false}).appendTo(f),h=(this.uiDialogTitlebarCloseText=c("<span/>")).addClass("ui-icon ui-icon-closethick").text(m.closeText).appendTo(i),d=c("<span/>").addClass("ui-dialog-title").attr("id",e).html(j).prependTo(f);f.find("*").add(f).disableSelection();(m.draggable&&c.fn.draggable&&this._makeDraggable());(m.resizable&&c.fn.resizable&&this._makeResizable());this._createButtons(m.buttons);this._isOpen=false;(m.bgiframe&&c.fn.bgiframe&&k.bgiframe());(m.autoOpen&&this.open())},destroy:function(){(this.overlay&&this.overlay.destroy());this.uiDialog.hide();this.element.unbind(".dialog").removeData("dialog").removeClass("ui-dialog-content ui-widget-content").hide().appendTo("body");this.uiDialog.remove();(this.originalTitle&&this.element.attr("title",this.originalTitle))},close:function(e){var d=this;if(false===d._trigger("beforeclose",e)){return}(d.overlay&&d.overlay.destroy());d.uiDialog.unbind("keypress.ui-dialog");(d.options.hide?d.uiDialog.hide(d.options.hide,function(){d._trigger("close",e)}):d.uiDialog.hide()&&d._trigger("close",e));c.ui.dialog.overlay.resize();d._isOpen=false},isOpen:function(){return this._isOpen},moveToTop:function(f,e){if((this.options.modal&&!f)||(!this.options.stack&&!this.options.modal)){return this._trigger("focus",e)}if(this.options.zIndex>c.ui.dialog.maxZ){c.ui.dialog.maxZ=this.options.zIndex}(this.overlay&&this.overlay.$el.css("z-index",c.ui.dialog.overlay.maxZ=++c.ui.dialog.maxZ));var d={scrollTop:this.element.attr("scrollTop"),scrollLeft:this.element.attr("scrollLeft")};this.uiDialog.css("z-index",++c.ui.dialog.maxZ);this.element.attr(d);this._trigger("focus",e)},open:function(){if(this._isOpen){return}var e=this.options,d=this.uiDialog;this.overlay=e.modal?new c.ui.dialog.overlay(this):null;(d.next().length&&d.appendTo("body"));this._size();this._position(e.position);d.show(e.show);this.moveToTop(true);(e.modal&&d.bind("keypress.ui-dialog",function(h){if(h.keyCode!=c.ui.keyCode.TAB){return}var g=c(":tabbable",this),i=g.filter(":first")[0],f=g.filter(":last")[0];if(h.target==f&&!h.shiftKey){setTimeout(function(){i.focus()},1)}else{if(h.target==i&&h.shiftKey){setTimeout(function(){f.focus()},1)}}}));c([]).add(d.find(".ui-dialog-content :tabbable:first")).add(d.find(".ui-dialog-buttonpane :tabbable:first")).add(d).filter(":first").focus();this._trigger("open");this._isOpen=true},_createButtons:function(g){var f=this,d=false,e=c("<div></div>").addClass("ui-dialog-buttonpane ui-widget-content ui-helper-clearfix");this.uiDialog.find(".ui-dialog-buttonpane").remove();(typeof g=="object"&&g!==null&&c.each(g,function(){return !(d=true)}));if(d){c.each(g,function(h,i){c('<button type="button"></button>').addClass("ui-state-default ui-corner-all").text(h).click(function(){i.apply(f.element[0],arguments)}).hover(function(){c(this).addClass("ui-state-hover")},function(){c(this).removeClass("ui-state-hover")}).focus(function(){c(this).addClass("ui-state-focus")}).blur(function(){c(this).removeClass("ui-state-focus")}).appendTo(e)});e.appendTo(this.uiDialog)}},_makeDraggable:function(){var d=this,f=this.options,e;this.uiDialog.draggable({cancel:".ui-dialog-content",handle:".ui-dialog-titlebar",containment:"document",start:function(){e=f.height;c(this).height(c(this).height()).addClass("ui-dialog-dragging");(f.dragStart&&f.dragStart.apply(d.element[0],arguments))},drag:function(){(f.drag&&f.drag.apply(d.element[0],arguments))},stop:function(){c(this).removeClass("ui-dialog-dragging").height(e);(f.dragStop&&f.dragStop.apply(d.element[0],arguments));c.ui.dialog.overlay.resize()}})},_makeResizable:function(g){g=(g===undefined?this.options.resizable:g);var d=this,f=this.options,e=typeof g=="string"?g:"n,e,s,w,se,sw,ne,nw";this.uiDialog.resizable({cancel:".ui-dialog-content",alsoResize:this.element,maxWidth:f.maxWidth,maxHeight:f.maxHeight,minWidth:f.minWidth,minHeight:f.minHeight,start:function(){c(this).addClass("ui-dialog-resizing");(f.resizeStart&&f.resizeStart.apply(d.element[0],arguments))},resize:function(){(f.resize&&f.resize.apply(d.element[0],arguments))},handles:e,stop:function(){c(this).removeClass("ui-dialog-resizing");f.height=c(this).height();f.width=c(this).width();(f.resizeStop&&f.resizeStop.apply(d.element[0],arguments));c.ui.dialog.overlay.resize()}}).find(".ui-resizable-se").addClass("ui-icon ui-icon-grip-diagonal-se")},_position:function(i){var e=c(window),f=c(document),g=f.scrollTop(),d=f.scrollLeft(),h=g;if(c.inArray(i,["center","top","right","bottom","left"])>=0){i=[i=="right"||i=="left"?i:"center",i=="top"||i=="bottom"?i:"middle"]}if(i.constructor!=Array){i=["center","middle"]}if(i[0].constructor==Number){d+=i[0]}else{switch(i[0]){case"left":d+=0;break;case"right":d+=e.width()-this.uiDialog.outerWidth();break;default:case"center":d+=(e.width()-this.uiDialog.outerWidth())/2}}if(i[1].constructor==Number){g+=i[1]}else{switch(i[1]){case"top":g+=0;break;case"bottom":g+=e.height()-this.uiDialog.outerHeight();break;default:case"middle":g+=(e.height()-this.uiDialog.outerHeight())/2}}g=Math.max(g,h);this.uiDialog.css({top:g,left:d})},_setData:function(e,f){(b[e]&&this.uiDialog.data(b[e],f));switch(e){case"buttons":this._createButtons(f);break;case"closeText":this.uiDialogTitlebarCloseText.text(f);break;case"dialogClass":this.uiDialog.removeClass(this.options.dialogClass).addClass(a+f);break;case"draggable":(f?this._makeDraggable():this.uiDialog.draggable("destroy"));break;case"height":this.uiDialog.height(f);break;case"position":this._position(f);break;case"resizable":var d=this.uiDialog,g=this.uiDialog.is(":data(resizable)");(g&&!f&&d.resizable("destroy"));(g&&typeof f=="string"&&d.resizable("option","handles",f));(g||this._makeResizable(f));break;case"title":c(".ui-dialog-title",this.uiDialogTitlebar).html(f||"&nbsp;");break;case"width":this.uiDialog.width(f);break}c.widget.prototype._setData.apply(this,arguments)},_size:function(){var e=this.options;this.element.css({height:0,minHeight:0,width:"auto"});var d=this.uiDialog.css({height:"auto",width:e.width}).height();this.element.css({minHeight:Math.max(e.minHeight-d,0),height:e.height=="auto"?"auto":Math.max(e.height-d,0)})}});c.extend(c.ui.dialog,{version:"1.7.1",defaults:{autoOpen:true,bgiframe:false,buttons:{},closeOnEscape:true,closeText:"close",dialogClass:"",draggable:true,hide:null,height:"auto",maxHeight:false,maxWidth:false,minHeight:150,minWidth:150,modal:false,position:"center",resizable:true,show:null,stack:true,title:"",width:300,zIndex:1000},getter:"isOpen",uuid:0,maxZ:0,getTitleId:function(d){return"ui-dialog-title-"+(d.attr("id")||++this.uuid)},overlay:function(d){this.$el=c.ui.dialog.overlay.create(d)}});c.extend(c.ui.dialog.overlay,{instances:[],maxZ:0,events:c.map("focus,mousedown,mouseup,keydown,keypress,click".split(","),function(d){return d+".dialog-overlay"}).join(" "),create:function(e){if(this.instances.length===0){setTimeout(function(){c(document).bind(c.ui.dialog.overlay.events,function(f){var g=c(f.target).parents(".ui-dialog").css("zIndex")||0;return(g>c.ui.dialog.overlay.maxZ)})},1);c(document).bind("keydown.dialog-overlay",function(f){(e.options.closeOnEscape&&f.keyCode&&f.keyCode==c.ui.keyCode.ESCAPE&&e.close(f))});c(window).bind("resize.dialog-overlay",c.ui.dialog.overlay.resize)}var d=c("<div></div>").appendTo(document.body).addClass("ui-widget-overlay").css({width:this.width(),height:this.height()});(e.options.bgiframe&&c.fn.bgiframe&&d.bgiframe());this.instances.push(d);return d},destroy:function(d){this.instances.splice(c.inArray(this.instances,d),1);if(this.instances.length===0){c([document,window]).unbind(".dialog-overlay")}d.remove()},height:function(){if(c.browser.msie&&c.browser.version<7){var e=Math.max(document.documentElement.scrollHeight,document.body.scrollHeight);var d=Math.max(document.documentElement.offsetHeight,document.body.offsetHeight);if(e<d){return c(window).height()+"px"}else{return e+"px"}}else{return c(document).height()+"px"}},width:function(){if(c.browser.msie&&c.browser.version<7){var d=Math.max(document.documentElement.scrollWidth,document.body.scrollWidth);var e=Math.max(document.documentElement.offsetWidth,document.body.offsetWidth);if(d<e){return c(window).width()+"px"}else{return d+"px"}}else{return c(document).width()+"px"}},resize:function(){var d=c([]);c.each(c.ui.dialog.overlay.instances,function(){d=d.add(this)});d.css({width:0,height:0}).css({width:c.ui.dialog.overlay.width(),height:c.ui.dialog.overlay.height()})}});c.extend(c.ui.dialog.overlay.prototype,{destroy:function(){c.ui.dialog.overlay.destroy(this.$el)}})})(jQuery);;/*
 * jQuery UI Slider 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Slider
 *
 * Depends:
 *    ui.core.js
 */(function(a){a.widget("ui.slider",a.extend({},a.ui.mouse,{_init:function(){var b=this,c=this.options;this._keySliding=false;this._handleIndex=null;this._detectOrientation();this._mouseInit();this.element.addClass("ui-slider ui-slider-"+this.orientation+" ui-widget ui-widget-content ui-corner-all");this.range=a([]);if(c.range){if(c.range===true){this.range=a("<div></div>");if(!c.values){c.values=[this._valueMin(),this._valueMin()]}if(c.values.length&&c.values.length!=2){c.values=[c.values[0],c.values[0]]}}else{this.range=a("<div></div>")}this.range.appendTo(this.element).addClass("ui-slider-range");if(c.range=="min"||c.range=="max"){this.range.addClass("ui-slider-range-"+c.range)}this.range.addClass("ui-widget-header")}if(a(".ui-slider-handle",this.element).length==0){a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")}if(c.values&&c.values.length){while(a(".ui-slider-handle",this.element).length<c.values.length){a('<a href="#"></a>').appendTo(this.element).addClass("ui-slider-handle")}}this.handles=a(".ui-slider-handle",this.element).addClass("ui-state-default ui-corner-all");this.handle=this.handles.eq(0);this.handles.add(this.range).filter("a").click(function(d){d.preventDefault()}).hover(function(){a(this).addClass("ui-state-hover")},function(){a(this).removeClass("ui-state-hover")}).focus(function(){a(".ui-slider .ui-state-focus").removeClass("ui-state-focus");a(this).addClass("ui-state-focus")}).blur(function(){a(this).removeClass("ui-state-focus")});this.handles.each(function(d){a(this).data("index.ui-slider-handle",d)});this.handles.keydown(function(i){var f=true;var e=a(this).data("index.ui-slider-handle");if(b.options.disabled){return}switch(i.keyCode){case a.ui.keyCode.HOME:case a.ui.keyCode.END:case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:f=false;if(!b._keySliding){b._keySliding=true;a(this).addClass("ui-state-active");b._start(i,e)}break}var g,d,h=b._step();if(b.options.values&&b.options.values.length){g=d=b.values(e)}else{g=d=b.value()}switch(i.keyCode){case a.ui.keyCode.HOME:d=b._valueMin();break;case a.ui.keyCode.END:d=b._valueMax();break;case a.ui.keyCode.UP:case a.ui.keyCode.RIGHT:if(g==b._valueMax()){return}d=g+h;break;case a.ui.keyCode.DOWN:case a.ui.keyCode.LEFT:if(g==b._valueMin()){return}d=g-h;break}b._slide(i,e,d);return f}).keyup(function(e){var d=a(this).data("index.ui-slider-handle");if(b._keySliding){b._stop(e,d);b._change(e,d);b._keySliding=false;a(this).removeClass("ui-state-active")}});this._refreshValue()},destroy:function(){this.handles.remove();this.range.remove();this.element.removeClass("ui-slider ui-slider-horizontal ui-slider-vertical ui-slider-disabled ui-widget ui-widget-content ui-corner-all").removeData("slider").unbind(".slider");this._mouseDestroy()},_mouseCapture:function(d){var e=this.options;if(e.disabled){return false}this.elementSize={width:this.element.outerWidth(),height:this.element.outerHeight()};this.elementOffset=this.element.offset();var h={x:d.pageX,y:d.pageY};var j=this._normValueFromMouse(h);var c=this._valueMax()-this._valueMin()+1,f;var k=this,i;this.handles.each(function(l){var m=Math.abs(j-k.values(l));if(c>m){c=m;f=a(this);i=l}});if(e.range==true&&this.values(1)==e.min){f=a(this.handles[++i])}this._start(d,i);k._handleIndex=i;f.addClass("ui-state-active").focus();var g=f.offset();var b=!a(d.target).parents().andSelf().is(".ui-slider-handle");this._clickOffset=b?{left:0,top:0}:{left:d.pageX-g.left-(f.width()/2),top:d.pageY-g.top-(f.height()/2)-(parseInt(f.css("borderTopWidth"),10)||0)-(parseInt(f.css("borderBottomWidth"),10)||0)+(parseInt(f.css("marginTop"),10)||0)};j=this._normValueFromMouse(h);this._slide(d,i,j);return true},_mouseStart:function(b){return true},_mouseDrag:function(d){var b={x:d.pageX,y:d.pageY};var c=this._normValueFromMouse(b);this._slide(d,this._handleIndex,c);return false},_mouseStop:function(b){this.handles.removeClass("ui-state-active");this._stop(b,this._handleIndex);this._change(b,this._handleIndex);this._handleIndex=null;this._clickOffset=null;return false},_detectOrientation:function(){this.orientation=this.options.orientation=="vertical"?"vertical":"horizontal"},_normValueFromMouse:function(d){var c,h;if("horizontal"==this.orientation){c=this.elementSize.width;h=d.x-this.elementOffset.left-(this._clickOffset?this._clickOffset.left:0)}else{c=this.elementSize.height;h=d.y-this.elementOffset.top-(this._clickOffset?this._clickOffset.top:0)}var f=(h/c);if(f>1){f=1}if(f<0){f=0}if("vertical"==this.orientation){f=1-f}var e=this._valueMax()-this._valueMin(),i=f*e,b=i%this.options.step,g=this._valueMin()+i-b;if(b>(this.options.step/2)){g+=this.options.step}return parseFloat(g.toFixed(5))},_start:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("start",d,b)},_slide:function(f,e,d){var g=this.handles[e];if(this.options.values&&this.options.values.length){var b=this.values(e?0:1);if((e==0&&d>=b)||(e==1&&d<=b)){d=b}if(d!=this.values(e)){var c=this.values();c[e]=d;var h=this._trigger("slide",f,{handle:this.handles[e],value:d,values:c});var b=this.values(e?0:1);if(h!==false){this.values(e,d,(f.type=="mousedown"&&this.options.animate),true)}}}else{if(d!=this.value()){var h=this._trigger("slide",f,{handle:this.handles[e],value:d});if(h!==false){this._setData("value",d,(f.type=="mousedown"&&this.options.animate))}}}},_stop:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("stop",d,b)},_change:function(d,c){var b={handle:this.handles[c],value:this.value()};if(this.options.values&&this.options.values.length){b.value=this.values(c);b.values=this.values()}this._trigger("change",d,b)},value:function(b){if(arguments.length){this._setData("value",b);this._change(null,0)}return this._value()},values:function(b,e,c,d){if(arguments.length>1){this.options.values[b]=e;this._refreshValue(c);if(!d){this._change(null,b)}}if(arguments.length){if(this.options.values&&this.options.values.length){return this._values(b)}else{return this.value()}}else{return this._values()}},_setData:function(b,d,c){a.widget.prototype._setData.apply(this,arguments);switch(b){case"orientation":this._detectOrientation();this.element.removeClass("ui-slider-horizontal ui-slider-vertical").addClass("ui-slider-"+this.orientation);this._refreshValue(c);break;case"value":this._refreshValue(c);break}},_step:function(){var b=this.options.step;return b},_value:function(){var b=this.options.value;if(b<this._valueMin()){b=this._valueMin()}if(b>this._valueMax()){b=this._valueMax()}return b},_values:function(b){if(arguments.length){var c=this.options.values[b];if(c<this._valueMin()){c=this._valueMin()}if(c>this._valueMax()){c=this._valueMax()}return c}else{return this.options.values}},_valueMin:function(){var b=this.options.min;return b},_valueMax:function(){var b=this.options.max;return b},_refreshValue:function(c){var f=this.options.range,d=this.options,l=this;if(this.options.values&&this.options.values.length){var i,h;this.handles.each(function(p,n){var o=(l.values(p)-l._valueMin())/(l._valueMax()-l._valueMin())*100;var m={};m[l.orientation=="horizontal"?"left":"bottom"]=o+"%";a(this).stop(1,1)[c?"animate":"css"](m,d.animate);if(l.options.range===true){if(l.orientation=="horizontal"){(p==0)&&l.range.stop(1,1)[c?"animate":"css"]({left:o+"%"},d.animate);(p==1)&&l.range[c?"animate":"css"]({width:(o-lastValPercent)+"%"},{queue:false,duration:d.animate})}else{(p==0)&&l.range.stop(1,1)[c?"animate":"css"]({bottom:(o)+"%"},d.animate);(p==1)&&l.range[c?"animate":"css"]({height:(o-lastValPercent)+"%"},{queue:false,duration:d.animate})}}lastValPercent=o})}else{var j=this.value(),g=this._valueMin(),k=this._valueMax(),e=k!=g?(j-g)/(k-g)*100:0;var b={};b[l.orientation=="horizontal"?"left":"bottom"]=e+"%";this.handle.stop(1,1)[c?"animate":"css"](b,d.animate);(f=="min")&&(this.orientation=="horizontal")&&this.range.stop(1,1)[c?"animate":"css"]({width:e+"%"},d.animate);(f=="max")&&(this.orientation=="horizontal")&&this.range[c?"animate":"css"]({width:(100-e)+"%"},{queue:false,duration:d.animate});(f=="min")&&(this.orientation=="vertical")&&this.range.stop(1,1)[c?"animate":"css"]({height:e+"%"},d.animate);(f=="max")&&(this.orientation=="vertical")&&this.range[c?"animate":"css"]({height:(100-e)+"%"},{queue:false,duration:d.animate})}}}));a.extend(a.ui.slider,{getter:"value values",version:"1.7.1",eventPrefix:"slide",defaults:{animate:false,delay:0,distance:0,max:100,min:0,orientation:"horizontal",range:false,step:1,value:0,values:null}})})(jQuery);;/*
 * jQuery UI Tabs 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Tabs
 *
 * Depends:
 *    ui.core.js
 */(function(a){a.widget("ui.tabs",{_init:function(){if(this.options.deselectable!==undefined){this.options.collapsible=this.options.deselectable}this._tabify(true)},_setData:function(b,c){if(b=="selected"){if(this.options.collapsible&&c==this.options.selected){return}this.select(c)}else{this.options[b]=c;if(b=="deselectable"){this.options.collapsible=c}this._tabify()}},_tabId:function(b){return b.title&&b.title.replace(/\s/g,"_").replace(/[^A-Za-z0-9\-_:\.]/g,"")||this.options.idPrefix+a.data(b)},_sanitizeSelector:function(b){return b.replace(/:/g,"\\:")},_cookie:function(){var b=this.cookie||(this.cookie=this.options.cookie.name||"ui-tabs-"+a.data(this.list[0]));return a.cookie.apply(null,[b].concat(a.makeArray(arguments)))},_ui:function(c,b){return{tab:c,panel:b,index:this.anchors.index(c)}},_cleanup:function(){this.lis.filter(".ui-state-processing").removeClass("ui-state-processing").find("span:data(label.tabs)").each(function(){var b=a(this);b.html(b.data("label.tabs")).removeData("label.tabs")})},_tabify:function(n){this.list=this.element.children("ul:first");this.lis=a("li:has(a[href])",this.list);this.anchors=this.lis.map(function(){return a("a",this)[0]});this.panels=a([]);var p=this,d=this.options;var c=/^#.+/;this.anchors.each(function(r,o){var q=a(o).attr("href");var s=q.split("#")[0],u;if(s&&(s===location.toString().split("#")[0]||(u=a("base")[0])&&s===u.href)){q=o.hash;o.href=q}if(c.test(q)){p.panels=p.panels.add(p._sanitizeSelector(q))}else{if(q!="#"){a.data(o,"href.tabs",q);a.data(o,"load.tabs",q.replace(/#.*$/,""));var w=p._tabId(o);o.href="#"+w;var v=a("#"+w);if(!v.length){v=a(d.panelTemplate).attr("id",w).addClass("ui-tabs-panel ui-widget-content ui-corner-bottom").insertAfter(p.panels[r-1]||p.list);v.data("destroy.tabs",true)}p.panels=p.panels.add(v)}else{d.disabled.push(r)}}});if(n){this.element.addClass("ui-tabs ui-widget ui-widget-content ui-corner-all");this.list.addClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.lis.addClass("ui-state-default ui-corner-top");this.panels.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom");if(d.selected===undefined){if(location.hash){this.anchors.each(function(q,o){if(o.hash==location.hash){d.selected=q;return false}})}if(typeof d.selected!="number"&&d.cookie){d.selected=parseInt(p._cookie(),10)}if(typeof d.selected!="number"&&this.lis.filter(".ui-tabs-selected").length){d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))}d.selected=d.selected||0}else{if(d.selected===null){d.selected=-1}}d.selected=((d.selected>=0&&this.anchors[d.selected])||d.selected<0)?d.selected:0;d.disabled=a.unique(d.disabled.concat(a.map(this.lis.filter(".ui-state-disabled"),function(q,o){return p.lis.index(q)}))).sort();if(a.inArray(d.selected,d.disabled)!=-1){d.disabled.splice(a.inArray(d.selected,d.disabled),1)}this.panels.addClass("ui-tabs-hide");this.lis.removeClass("ui-tabs-selected ui-state-active");if(d.selected>=0&&this.anchors.length){this.panels.eq(d.selected).removeClass("ui-tabs-hide");this.lis.eq(d.selected).addClass("ui-tabs-selected ui-state-active");p.element.queue("tabs",function(){p._trigger("show",null,p._ui(p.anchors[d.selected],p.panels[d.selected]))});this.load(d.selected)}a(window).bind("unload",function(){p.lis.add(p.anchors).unbind(".tabs");p.lis=p.anchors=p.panels=null})}else{d.selected=this.lis.index(this.lis.filter(".ui-tabs-selected"))}this.element[d.collapsible?"addClass":"removeClass"]("ui-tabs-collapsible");if(d.cookie){this._cookie(d.selected,d.cookie)}for(var g=0,m;(m=this.lis[g]);g++){a(m)[a.inArray(g,d.disabled)!=-1&&!a(m).hasClass("ui-tabs-selected")?"addClass":"removeClass"]("ui-state-disabled")}if(d.cache===false){this.anchors.removeData("cache.tabs")}this.lis.add(this.anchors).unbind(".tabs");if(d.event!="mouseover"){var f=function(o,i){if(i.is(":not(.ui-state-disabled)")){i.addClass("ui-state-"+o)}};var j=function(o,i){i.removeClass("ui-state-"+o)};this.lis.bind("mouseover.tabs",function(){f("hover",a(this))});this.lis.bind("mouseout.tabs",function(){j("hover",a(this))});this.anchors.bind("focus.tabs",function(){f("focus",a(this).closest("li"))});this.anchors.bind("blur.tabs",function(){j("focus",a(this).closest("li"))})}var b,h;if(d.fx){if(a.isArray(d.fx)){b=d.fx[0];h=d.fx[1]}else{b=h=d.fx}}function e(i,o){i.css({display:""});if(a.browser.msie&&o.opacity){i[0].style.removeAttribute("filter")}}var k=h?function(i,o){a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.hide().removeClass("ui-tabs-hide").animate(h,h.duration||"normal",function(){e(o,h);p._trigger("show",null,p._ui(i,o[0]))})}:function(i,o){a(i).closest("li").removeClass("ui-state-default").addClass("ui-tabs-selected ui-state-active");o.removeClass("ui-tabs-hide");p._trigger("show",null,p._ui(i,o[0]))};var l=b?function(o,i){i.animate(b,b.duration||"normal",function(){p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");e(i,b);p.element.dequeue("tabs")})}:function(o,i,q){p.lis.removeClass("ui-tabs-selected ui-state-active").addClass("ui-state-default");i.addClass("ui-tabs-hide");p.element.dequeue("tabs")};this.anchors.bind(d.event+".tabs",function(){var o=this,r=a(this).closest("li"),i=p.panels.filter(":not(.ui-tabs-hide)"),q=a(p._sanitizeSelector(this.hash));if((r.hasClass("ui-tabs-selected")&&!d.collapsible)||r.hasClass("ui-state-disabled")||r.hasClass("ui-state-processing")||p._trigger("select",null,p._ui(this,q[0]))===false){this.blur();return false}d.selected=p.anchors.index(this);p.abort();if(d.collapsible){if(r.hasClass("ui-tabs-selected")){d.selected=-1;if(d.cookie){p._cookie(d.selected,d.cookie)}p.element.queue("tabs",function(){l(o,i)}).dequeue("tabs");this.blur();return false}else{if(!i.length){if(d.cookie){p._cookie(d.selected,d.cookie)}p.element.queue("tabs",function(){k(o,q)});p.load(p.anchors.index(this));this.blur();return false}}}if(d.cookie){p._cookie(d.selected,d.cookie)}if(q.length){if(i.length){p.element.queue("tabs",function(){l(o,i)})}p.element.queue("tabs",function(){k(o,q)});p.load(p.anchors.index(this))}else{throw"jQuery UI Tabs: Mismatching fragment identifier."}if(a.browser.msie){this.blur()}});this.anchors.bind("click.tabs",function(){return false})},destroy:function(){var b=this.options;this.abort();this.element.unbind(".tabs").removeClass("ui-tabs ui-widget ui-widget-content ui-corner-all ui-tabs-collapsible").removeData("tabs");this.list.removeClass("ui-tabs-nav ui-helper-reset ui-helper-clearfix ui-widget-header ui-corner-all");this.anchors.each(function(){var c=a.data(this,"href.tabs");if(c){this.href=c}var d=a(this).unbind(".tabs");a.each(["href","load","cache"],function(e,f){d.removeData(f+".tabs")})});this.lis.unbind(".tabs").add(this.panels).each(function(){if(a.data(this,"destroy.tabs")){a(this).remove()}else{a(this).removeClass(["ui-state-default","ui-corner-top","ui-tabs-selected","ui-state-active","ui-state-hover","ui-state-focus","ui-state-disabled","ui-tabs-panel","ui-widget-content","ui-corner-bottom","ui-tabs-hide"].join(" "))}});if(b.cookie){this._cookie(null,b.cookie)}},add:function(e,d,c){if(c===undefined){c=this.anchors.length}var b=this,g=this.options,i=a(g.tabTemplate.replace(/#\{href\}/g,e).replace(/#\{label\}/g,d)),h=!e.indexOf("#")?e.replace("#",""):this._tabId(a("a",i)[0]);i.addClass("ui-state-default ui-corner-top").data("destroy.tabs",true);var f=a("#"+h);if(!f.length){f=a(g.panelTemplate).attr("id",h).data("destroy.tabs",true)}f.addClass("ui-tabs-panel ui-widget-content ui-corner-bottom ui-tabs-hide");if(c>=this.lis.length){i.appendTo(this.list);f.appendTo(this.list[0].parentNode)}else{i.insertBefore(this.lis[c]);f.insertBefore(this.panels[c])}g.disabled=a.map(g.disabled,function(k,j){return k>=c?++k:k});this._tabify();if(this.anchors.length==1){i.addClass("ui-tabs-selected ui-state-active");f.removeClass("ui-tabs-hide");this.element.queue("tabs",function(){b._trigger("show",null,b._ui(b.anchors[0],b.panels[0]))});this.load(0)}this._trigger("add",null,this._ui(this.anchors[c],this.panels[c]))},remove:function(b){var d=this.options,e=this.lis.eq(b).remove(),c=this.panels.eq(b).remove();if(e.hasClass("ui-tabs-selected")&&this.anchors.length>1){this.select(b+(b+1<this.anchors.length?1:-1))}d.disabled=a.map(a.grep(d.disabled,function(g,f){return g!=b}),function(g,f){return g>=b?--g:g});this._tabify();this._trigger("remove",null,this._ui(e.find("a")[0],c[0]))},enable:function(b){var c=this.options;if(a.inArray(b,c.disabled)==-1){return}this.lis.eq(b).removeClass("ui-state-disabled");c.disabled=a.grep(c.disabled,function(e,d){return e!=b});this._trigger("enable",null,this._ui(this.anchors[b],this.panels[b]))},disable:function(c){var b=this,d=this.options;if(c!=d.selected){this.lis.eq(c).addClass("ui-state-disabled");d.disabled.push(c);d.disabled.sort();this._trigger("disable",null,this._ui(this.anchors[c],this.panels[c]))}},select:function(b){if(typeof b=="string"){b=this.anchors.index(this.anchors.filter("[href$="+b+"]"))}else{if(b===null){b=-1}}if(b==-1&&this.options.collapsible){b=this.options.selected}this.anchors.eq(b).trigger(this.options.event+".tabs")},load:function(e){var c=this,g=this.options,b=this.anchors.eq(e)[0],d=a.data(b,"load.tabs");this.abort();if(!d||this.element.queue("tabs").length!==0&&a.data(b,"cache.tabs")){this.element.dequeue("tabs");return}this.lis.eq(e).addClass("ui-state-processing");if(g.spinner){var f=a("span",b);f.data("label.tabs",f.html()).html(g.spinner)}this.xhr=a.ajax(a.extend({},g.ajaxOptions,{url:d,success:function(i,h){a(c._sanitizeSelector(b.hash)).html(i);c._cleanup();if(g.cache){a.data(b,"cache.tabs",true)}c._trigger("load",null,c._ui(c.anchors[e],c.panels[e]));try{g.ajaxOptions.success(i,h)}catch(j){}c.element.dequeue("tabs")}}))},abort:function(){this.element.queue([]);this.panels.stop(false,true);if(this.xhr){this.xhr.abort();delete this.xhr}this._cleanup()},url:function(c,b){this.anchors.eq(c).removeData("cache.tabs").data("load.tabs",b)},length:function(){return this.anchors.length}});a.extend(a.ui.tabs,{version:"1.7.1",getter:"length",defaults:{ajaxOptions:null,cache:false,cookie:null,collapsible:false,disabled:[],event:"click",fx:null,idPrefix:"ui-tabs-",panelTemplate:"<div></div>",spinner:"<em>Loading&#8230;</em>",tabTemplate:'<li><a href="#{href}"><span>#{label}</span></a></li>'}});a.extend(a.ui.tabs.prototype,{rotation:null,rotate:function(d,f){var b=this,g=this.options;var c=b._rotate||(b._rotate=function(h){clearTimeout(b.rotation);b.rotation=setTimeout(function(){var i=g.selected;b.select(++i<b.anchors.length?i:0)},d);if(h){h.stopPropagation()}});var e=b._unrotate||(b._unrotate=!f?function(h){if(h.clientX){b.rotate(null)}}:function(h){t=g.selected;c()});if(d){this.element.bind("tabsshow",c);this.anchors.bind(g.event+".tabs",e);c()}else{clearTimeout(b.rotation);this.element.unbind("tabsshow",c);this.anchors.unbind(g.event+".tabs",e);delete this._rotate;delete this._unrotate}}})})(jQuery);;/*
 * jQuery UI Datepicker 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Datepicker
 *
 * Depends:
 *    ui.core.js
 */(function($){$.extend($.ui,{datepicker:{version:"1.7.1"}});var PROP_NAME="datepicker";function Datepicker(){this.debug=false;this._curInst=null;this._keyEvent=false;this._disabledInputs=[];this._datepickerShowing=false;this._inDialog=false;this._mainDivId="ui-datepicker-div";this._inlineClass="ui-datepicker-inline";this._appendClass="ui-datepicker-append";this._triggerClass="ui-datepicker-trigger";this._dialogClass="ui-datepicker-dialog";this._disableClass="ui-datepicker-disabled";this._unselectableClass="ui-datepicker-unselectable";this._currentClass="ui-datepicker-current-day";this._dayOverClass="ui-datepicker-days-cell-over";this.regional=[];this.regional[""]={closeText:"Done",prevText:"Prev",nextText:"Next",currentText:"Today",monthNames:["January","February","March","April","May","June","July","August","September","October","November","December"],monthNamesShort:["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],dayNames:["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],dayNamesShort:["Sun","Mon","Tue","Wed","Thu","Fri","Sat"],dayNamesMin:["Su","Mo","Tu","We","Th","Fr","Sa"],dateFormat:"mm/dd/yy",firstDay:0,isRTL:false};this._defaults={showOn:"focus",showAnim:"show",showOptions:{},defaultDate:null,appendText:"",buttonText:"...",buttonImage:"",buttonImageOnly:false,hideIfNoPrevNext:false,navigationAsDateFormat:false,gotoCurrent:false,changeMonth:false,changeYear:false,showMonthAfterYear:false,yearRange:"-10:+10",showOtherMonths:false,calculateWeek:this.iso8601Week,shortYearCutoff:"+10",minDate:null,maxDate:null,duration:"normal",beforeShowDay:null,beforeShow:null,onSelect:null,onChangeMonthYear:null,onClose:null,numberOfMonths:1,showCurrentAtPos:0,stepMonths:1,stepBigMonths:12,altField:"",altFormat:"",constrainInput:true,showButtonPanel:false};$.extend(this._defaults,this.regional[""]);this.dpDiv=$('<div id="'+this._mainDivId+'" class="ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all ui-helper-hidden-accessible"></div>')}$.extend(Datepicker.prototype,{markerClassName:"hasDatepicker",log:function(){if(this.debug){console.log.apply("",arguments)}},setDefaults:function(settings){extendRemove(this._defaults,settings||{});return this},_attachDatepicker:function(target,settings){var inlineSettings=null;for(var attrName in this._defaults){var attrValue=target.getAttribute("date:"+attrName);if(attrValue){inlineSettings=inlineSettings||{};try{inlineSettings[attrName]=eval(attrValue)}catch(err){inlineSettings[attrName]=attrValue}}}var nodeName=target.nodeName.toLowerCase();var inline=(nodeName=="div"||nodeName=="span");if(!target.id){target.id="dp"+(++this.uuid)}var inst=this._newInst($(target),inline);inst.settings=$.extend({},settings||{},inlineSettings||{});if(nodeName=="input"){this._connectDatepicker(target,inst)}else{if(inline){this._inlineDatepicker(target,inst)}}},_newInst:function(target,inline){var id=target[0].id.replace(/([:\[\]\.])/g,"\\\\$1");return{id:id,input:target,selectedDay:0,selectedMonth:0,selectedYear:0,drawMonth:0,drawYear:0,inline:inline,dpDiv:(!inline?this.dpDiv:$('<div class="'+this._inlineClass+' ui-datepicker ui-widget ui-widget-content ui-helper-clearfix ui-corner-all"></div>'))}},_connectDatepicker:function(target,inst){var input=$(target);inst.trigger=$([]);if(input.hasClass(this.markerClassName)){return}var appendText=this._get(inst,"appendText");var isRTL=this._get(inst,"isRTL");if(appendText){input[isRTL?"before":"after"]('<span class="'+this._appendClass+'">'+appendText+"</span>")}var showOn=this._get(inst,"showOn");if(showOn=="focus"||showOn=="both"){input.focus(this._showDatepicker)}if(showOn=="button"||showOn=="both"){var buttonText=this._get(inst,"buttonText");var buttonImage=this._get(inst,"buttonImage");inst.trigger=$(this._get(inst,"buttonImageOnly")?$("<img/>").addClass(this._triggerClass).attr({src:buttonImage,alt:buttonText,title:buttonText}):$('<button type="button"></button>').addClass(this._triggerClass).html(buttonImage==""?buttonText:$("<img/>").attr({src:buttonImage,alt:buttonText,title:buttonText})));input[isRTL?"before":"after"](inst.trigger);inst.trigger.click(function(){if($.datepicker._datepickerShowing&&$.datepicker._lastInput==target){$.datepicker._hideDatepicker()}else{$.datepicker._showDatepicker(target)}return false})}input.addClass(this.markerClassName).keydown(this._doKeyDown).keypress(this._doKeyPress).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value}).bind("getData.datepicker",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst)},_inlineDatepicker:function(target,inst){var divSpan=$(target);if(divSpan.hasClass(this.markerClassName)){return}divSpan.addClass(this.markerClassName).append(inst.dpDiv).bind("setData.datepicker",function(event,key,value){inst.settings[key]=value}).bind("getData.datepicker",function(event,key){return this._get(inst,key)});$.data(target,PROP_NAME,inst);this._setDate(inst,this._getDefaultDate(inst));this._updateDatepicker(inst);this._updateAlternate(inst)},_dialogDatepicker:function(input,dateText,onSelect,settings,pos){var inst=this._dialogInst;if(!inst){var id="dp"+(++this.uuid);this._dialogInput=$('<input type="text" id="'+id+'" size="1" style="position: absolute; top: -100px;"/>');this._dialogInput.keydown(this._doKeyDown);$("body").append(this._dialogInput);inst=this._dialogInst=this._newInst(this._dialogInput,false);inst.settings={};$.data(this._dialogInput[0],PROP_NAME,inst)}extendRemove(inst.settings,settings||{});this._dialogInput.val(dateText);this._pos=(pos?(pos.length?pos:[pos.pageX,pos.pageY]):null);if(!this._pos){var browserWidth=window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth;var browserHeight=window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight;var scrollX=document.documentElement.scrollLeft||document.body.scrollLeft;var scrollY=document.documentElement.scrollTop||document.body.scrollTop;this._pos=[(browserWidth/2)-100+scrollX,(browserHeight/2)-150+scrollY]}this._dialogInput.css("left",this._pos[0]+"px").css("top",this._pos[1]+"px");inst.settings.onSelect=onSelect;this._inDialog=true;this.dpDiv.addClass(this._dialogClass);this._showDatepicker(this._dialogInput[0]);if($.blockUI){$.blockUI(this.dpDiv)}$.data(this._dialogInput[0],PROP_NAME,inst);return this},_destroyDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();$.removeData(target,PROP_NAME);if(nodeName=="input"){inst.trigger.remove();$target.siblings("."+this._appendClass).remove().end().removeClass(this.markerClassName).unbind("focus",this._showDatepicker).unbind("keydown",this._doKeyDown).unbind("keypress",this._doKeyPress)}else{if(nodeName=="div"||nodeName=="span"){$target.removeClass(this.markerClassName).empty()}}},_enableDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=false;inst.trigger.filter("button").each(function(){this.disabled=false}).end().filter("img").css({opacity:"1.0",cursor:""})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);inline.children().removeClass("ui-state-disabled")}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)})},_disableDatepicker:function(target){var $target=$(target);var inst=$.data(target,PROP_NAME);if(!$target.hasClass(this.markerClassName)){return}var nodeName=target.nodeName.toLowerCase();if(nodeName=="input"){target.disabled=true;inst.trigger.filter("button").each(function(){this.disabled=true}).end().filter("img").css({opacity:"0.5",cursor:"default"})}else{if(nodeName=="div"||nodeName=="span"){var inline=$target.children("."+this._inlineClass);inline.children().addClass("ui-state-disabled")}}this._disabledInputs=$.map(this._disabledInputs,function(value){return(value==target?null:value)});this._disabledInputs[this._disabledInputs.length]=target},_isDisabledDatepicker:function(target){if(!target){return false}for(var i=0;i<this._disabledInputs.length;i++){if(this._disabledInputs[i]==target){return true}}return false},_getInst:function(target){try{return $.data(target,PROP_NAME)}catch(err){throw"Missing instance data for this datepicker"}},_optionDatepicker:function(target,name,value){var settings=name||{};if(typeof name=="string"){settings={};settings[name]=value}var inst=this._getInst(target);if(inst){if(this._curInst==inst){this._hideDatepicker(null)}extendRemove(inst.settings,settings);var date=new Date();extendRemove(inst,{rangeStart:null,endDay:null,endMonth:null,endYear:null,selectedDay:date.getDate(),selectedMonth:date.getMonth(),selectedYear:date.getFullYear(),currentDay:date.getDate(),currentMonth:date.getMonth(),currentYear:date.getFullYear(),drawMonth:date.getMonth(),drawYear:date.getFullYear()});this._updateDatepicker(inst)}},_changeDatepicker:function(target,name,value){this._optionDatepicker(target,name,value)},_refreshDatepicker:function(target){var inst=this._getInst(target);if(inst){this._updateDatepicker(inst)}},_setDateDatepicker:function(target,date,endDate){var inst=this._getInst(target);if(inst){this._setDate(inst,date,endDate);this._updateDatepicker(inst);this._updateAlternate(inst)}},_getDateDatepicker:function(target){var inst=this._getInst(target);if(inst&&!inst.inline){this._setDateFromField(inst)}return(inst?this._getDate(inst):null)},_doKeyDown:function(event){var inst=$.datepicker._getInst(event.target);var handled=true;var isRTL=inst.dpDiv.is(".ui-datepicker-rtl");inst._keyEvent=true;if($.datepicker._datepickerShowing){switch(event.keyCode){case 9:$.datepicker._hideDatepicker(null,"");break;case 13:var sel=$("td."+$.datepicker._dayOverClass+", td."+$.datepicker._currentClass,inst.dpDiv);if(sel[0]){$.datepicker._selectDay(event.target,inst.selectedMonth,inst.selectedYear,sel[0])}else{$.datepicker._hideDatepicker(null,$.datepicker._get(inst,"duration"))}return false;break;case 27:$.datepicker._hideDatepicker(null,$.datepicker._get(inst,"duration"));break;case 33:$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M");break;case 34:$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M");break;case 35:if(event.ctrlKey||event.metaKey){$.datepicker._clearDate(event.target)}handled=event.ctrlKey||event.metaKey;break;case 36:if(event.ctrlKey||event.metaKey){$.datepicker._gotoToday(event.target)}handled=event.ctrlKey||event.metaKey;break;case 37:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?+1:-1),"D")}handled=event.ctrlKey||event.metaKey;if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?-$.datepicker._get(inst,"stepBigMonths"):-$.datepicker._get(inst,"stepMonths")),"M")}break;case 38:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,-7,"D")}handled=event.ctrlKey||event.metaKey;break;case 39:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,(isRTL?-1:+1),"D")}handled=event.ctrlKey||event.metaKey;if(event.originalEvent.altKey){$.datepicker._adjustDate(event.target,(event.ctrlKey?+$.datepicker._get(inst,"stepBigMonths"):+$.datepicker._get(inst,"stepMonths")),"M")}break;case 40:if(event.ctrlKey||event.metaKey){$.datepicker._adjustDate(event.target,+7,"D")}handled=event.ctrlKey||event.metaKey;break;default:handled=false}}else{if(event.keyCode==36&&event.ctrlKey){$.datepicker._showDatepicker(this)}else{handled=false}}if(handled){event.preventDefault();event.stopPropagation()}},_doKeyPress:function(event){var inst=$.datepicker._getInst(event.target);if($.datepicker._get(inst,"constrainInput")){var chars=$.datepicker._possibleChars($.datepicker._get(inst,"dateFormat"));var chr=String.fromCharCode(event.charCode==undefined?event.keyCode:event.charCode);return event.ctrlKey||(chr<" "||!chars||chars.indexOf(chr)>-1)}},_showDatepicker:function(input){input=input.target||input;if(input.nodeName.toLowerCase()!="input"){input=$("input",input.parentNode)[0]}if($.datepicker._isDisabledDatepicker(input)||$.datepicker._lastInput==input){return}var inst=$.datepicker._getInst(input);var beforeShow=$.datepicker._get(inst,"beforeShow");extendRemove(inst.settings,(beforeShow?beforeShow.apply(input,[input,inst]):{}));$.datepicker._hideDatepicker(null,"");$.datepicker._lastInput=input;$.datepicker._setDateFromField(inst);if($.datepicker._inDialog){input.value=""}if(!$.datepicker._pos){$.datepicker._pos=$.datepicker._findPos(input);$.datepicker._pos[1]+=input.offsetHeight}var isFixed=false;$(input).parents().each(function(){isFixed|=$(this).css("position")=="fixed";return !isFixed});if(isFixed&&$.browser.opera){$.datepicker._pos[0]-=document.documentElement.scrollLeft;$.datepicker._pos[1]-=document.documentElement.scrollTop}var offset={left:$.datepicker._pos[0],top:$.datepicker._pos[1]};$.datepicker._pos=null;inst.rangeStart=null;inst.dpDiv.css({position:"absolute",display:"block",top:"-1000px"});$.datepicker._updateDatepicker(inst);offset=$.datepicker._checkOffset(inst,offset,isFixed);inst.dpDiv.css({position:($.datepicker._inDialog&&$.blockUI?"static":(isFixed?"fixed":"absolute")),display:"none",left:offset.left+"px",top:offset.top+"px"});if(!inst.inline){var showAnim=$.datepicker._get(inst,"showAnim")||"show";var duration=$.datepicker._get(inst,"duration");var postProcess=function(){$.datepicker._datepickerShowing=true;if($.browser.msie&&parseInt($.browser.version,10)<7){$("iframe.ui-datepicker-cover").css({width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4})}};if($.effects&&$.effects[showAnim]){inst.dpDiv.show(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)}else{inst.dpDiv[showAnim](duration,postProcess)}if(duration==""){postProcess()}if(inst.input[0].type!="hidden"){inst.input[0].focus()}$.datepicker._curInst=inst}},_updateDatepicker:function(inst){var dims={width:inst.dpDiv.width()+4,height:inst.dpDiv.height()+4};var self=this;inst.dpDiv.empty().append(this._generateHTML(inst)).find("iframe.ui-datepicker-cover").css({width:dims.width,height:dims.height}).end().find("button, .ui-datepicker-prev, .ui-datepicker-next, .ui-datepicker-calendar td a").bind("mouseout",function(){$(this).removeClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).removeClass("ui-datepicker-prev-hover")}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).removeClass("ui-datepicker-next-hover")}}).bind("mouseover",function(){if(!self._isDisabledDatepicker(inst.inline?inst.dpDiv.parent()[0]:inst.input[0])){$(this).parents(".ui-datepicker-calendar").find("a").removeClass("ui-state-hover");$(this).addClass("ui-state-hover");if(this.className.indexOf("ui-datepicker-prev")!=-1){$(this).addClass("ui-datepicker-prev-hover")}if(this.className.indexOf("ui-datepicker-next")!=-1){$(this).addClass("ui-datepicker-next-hover")}}}).end().find("."+this._dayOverClass+" a").trigger("mouseover").end();var numMonths=this._getNumberOfMonths(inst);var cols=numMonths[1];var width=17;if(cols>1){inst.dpDiv.addClass("ui-datepicker-multi-"+cols).css("width",(width*cols)+"em")}else{inst.dpDiv.removeClass("ui-datepicker-multi-2 ui-datepicker-multi-3 ui-datepicker-multi-4").width("")}inst.dpDiv[(numMonths[0]!=1||numMonths[1]!=1?"add":"remove")+"Class"]("ui-datepicker-multi");inst.dpDiv[(this._get(inst,"isRTL")?"add":"remove")+"Class"]("ui-datepicker-rtl");if(inst.input&&inst.input[0].type!="hidden"&&inst==$.datepicker._curInst){$(inst.input[0]).focus()}},_checkOffset:function(inst,offset,isFixed){var dpWidth=inst.dpDiv.outerWidth();var dpHeight=inst.dpDiv.outerHeight();var inputWidth=inst.input?inst.input.outerWidth():0;var inputHeight=inst.input?inst.input.outerHeight():0;var viewWidth=(window.innerWidth||document.documentElement.clientWidth||document.body.clientWidth)+$(document).scrollLeft();var viewHeight=(window.innerHeight||document.documentElement.clientHeight||document.body.clientHeight)+$(document).scrollTop();offset.left-=(this._get(inst,"isRTL")?(dpWidth-inputWidth):0);offset.left-=(isFixed&&offset.left==inst.input.offset().left)?$(document).scrollLeft():0;offset.top-=(isFixed&&offset.top==(inst.input.offset().top+inputHeight))?$(document).scrollTop():0;offset.left-=(offset.left+dpWidth>viewWidth&&viewWidth>dpWidth)?Math.abs(offset.left+dpWidth-viewWidth):0;offset.top-=(offset.top+dpHeight>viewHeight&&viewHeight>dpHeight)?Math.abs(offset.top+dpHeight+inputHeight*2-viewHeight):0;return offset},_findPos:function(obj){while(obj&&(obj.type=="hidden"||obj.nodeType!=1)){obj=obj.nextSibling}var position=$(obj).offset();return[position.left,position.top]},_hideDatepicker:function(input,duration){var inst=this._curInst;if(!inst||(input&&inst!=$.data(input,PROP_NAME))){return}if(inst.stayOpen){this._selectDate("#"+inst.id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear))}inst.stayOpen=false;if(this._datepickerShowing){duration=(duration!=null?duration:this._get(inst,"duration"));var showAnim=this._get(inst,"showAnim");var postProcess=function(){$.datepicker._tidyDialog(inst)};if(duration!=""&&$.effects&&$.effects[showAnim]){inst.dpDiv.hide(showAnim,$.datepicker._get(inst,"showOptions"),duration,postProcess)}else{inst.dpDiv[(duration==""?"hide":(showAnim=="slideDown"?"slideUp":(showAnim=="fadeIn"?"fadeOut":"hide")))](duration,postProcess)}if(duration==""){this._tidyDialog(inst)}var onClose=this._get(inst,"onClose");if(onClose){onClose.apply((inst.input?inst.input[0]:null),[(inst.input?inst.input.val():""),inst])}this._datepickerShowing=false;this._lastInput=null;if(this._inDialog){this._dialogInput.css({position:"absolute",left:"0",top:"-100px"});if($.blockUI){$.unblockUI();$("body").append(this.dpDiv)}}this._inDialog=false}this._curInst=null},_tidyDialog:function(inst){inst.dpDiv.removeClass(this._dialogClass).unbind(".ui-datepicker-calendar")},_checkExternalClick:function(event){if(!$.datepicker._curInst){return}var $target=$(event.target);if(($target.parents("#"+$.datepicker._mainDivId).length==0)&&!$target.hasClass($.datepicker.markerClassName)&&!$target.hasClass($.datepicker._triggerClass)&&$.datepicker._datepickerShowing&&!($.datepicker._inDialog&&$.blockUI)){$.datepicker._hideDatepicker(null,"")}},_adjustDate:function(id,offset,period){var target=$(id);var inst=this._getInst(target[0]);if(this._isDisabledDatepicker(target[0])){return}this._adjustInstDate(inst,offset+(period=="M"?this._get(inst,"showCurrentAtPos"):0),period);this._updateDatepicker(inst)},_gotoToday:function(id){var target=$(id);var inst=this._getInst(target[0]);if(this._get(inst,"gotoCurrent")&&inst.currentDay){inst.selectedDay=inst.currentDay;inst.drawMonth=inst.selectedMonth=inst.currentMonth;inst.drawYear=inst.selectedYear=inst.currentYear}else{var date=new Date();inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear()}this._notifyChange(inst);this._adjustDate(target)},_selectMonthYear:function(id,select,period){var target=$(id);var inst=this._getInst(target[0]);inst._selectingMonthYear=false;inst["selected"+(period=="M"?"Month":"Year")]=inst["draw"+(period=="M"?"Month":"Year")]=parseInt(select.options[select.selectedIndex].value,10);this._notifyChange(inst);this._adjustDate(target)},_clickMonthYear:function(id){var target=$(id);var inst=this._getInst(target[0]);if(inst.input&&inst._selectingMonthYear&&!$.browser.msie){inst.input[0].focus()}inst._selectingMonthYear=!inst._selectingMonthYear},_selectDay:function(id,month,year,td){var target=$(id);if($(td).hasClass(this._unselectableClass)||this._isDisabledDatepicker(target[0])){return}var inst=this._getInst(target[0]);inst.selectedDay=inst.currentDay=$("a",td).html();inst.selectedMonth=inst.currentMonth=month;inst.selectedYear=inst.currentYear=year;if(inst.stayOpen){inst.endDay=inst.endMonth=inst.endYear=null}this._selectDate(id,this._formatDate(inst,inst.currentDay,inst.currentMonth,inst.currentYear));if(inst.stayOpen){inst.rangeStart=this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay));this._updateDatepicker(inst)}},_clearDate:function(id){var target=$(id);var inst=this._getInst(target[0]);inst.stayOpen=false;inst.endDay=inst.endMonth=inst.endYear=inst.rangeStart=null;this._selectDate(target,"")},_selectDate:function(id,dateStr){var target=$(id);var inst=this._getInst(target[0]);dateStr=(dateStr!=null?dateStr:this._formatDate(inst));if(inst.input){inst.input.val(dateStr)}this._updateAlternate(inst);var onSelect=this._get(inst,"onSelect");if(onSelect){onSelect.apply((inst.input?inst.input[0]:null),[dateStr,inst])}else{if(inst.input){inst.input.trigger("change")}}if(inst.inline){this._updateDatepicker(inst)}else{if(!inst.stayOpen){this._hideDatepicker(null,this._get(inst,"duration"));this._lastInput=inst.input[0];if(typeof(inst.input[0])!="object"){inst.input[0].focus()}this._lastInput=null}}},_updateAlternate:function(inst){var altField=this._get(inst,"altField");if(altField){var altFormat=this._get(inst,"altFormat")||this._get(inst,"dateFormat");var date=this._getDate(inst);dateStr=this.formatDate(altFormat,date,this._getFormatConfig(inst));$(altField).each(function(){$(this).val(dateStr)})}},noWeekends:function(date){var day=date.getDay();return[(day>0&&day<6),""]},iso8601Week:function(date){var checkDate=new Date(date.getFullYear(),date.getMonth(),date.getDate());var firstMon=new Date(checkDate.getFullYear(),1-1,4);var firstDay=firstMon.getDay()||7;firstMon.setDate(firstMon.getDate()+1-firstDay);if(firstDay<4&&checkDate<firstMon){checkDate.setDate(checkDate.getDate()-3);return $.datepicker.iso8601Week(checkDate)}else{if(checkDate>new Date(checkDate.getFullYear(),12-1,28)){firstDay=new Date(checkDate.getFullYear()+1,1-1,4).getDay()||7;if(firstDay>4&&(checkDate.getDay()||7)<firstDay-3){return 1}}}return Math.floor(((checkDate-firstMon)/86400000)/7)+1},parseDate:function(format,value,settings){if(format==null||value==null){throw"Invalid arguments"}value=(typeof value=="object"?value.toString():value+"");if(value==""){return null}var shortYearCutoff=(settings?settings.shortYearCutoff:null)||this._defaults.shortYearCutoff;var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var year=-1;var month=-1;var day=-1;var doy=-1;var literal=false;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var getNumber=function(match){lookAhead(match);var origSize=(match=="@"?14:(match=="y"?4:(match=="o"?3:2)));var size=origSize;var num=0;while(size>0&&iValue<value.length&&value.charAt(iValue)>="0"&&value.charAt(iValue)<="9"){num=num*10+parseInt(value.charAt(iValue++),10);size--}if(size==origSize){throw"Missing number at position "+iValue}return num};var getName=function(match,shortNames,longNames){var names=(lookAhead(match)?longNames:shortNames);var size=0;for(var j=0;j<names.length;j++){size=Math.max(size,names[j].length)}var name="";var iInit=iValue;while(size>0&&iValue<value.length){name+=value.charAt(iValue++);for(var i=0;i<names.length;i++){if(name==names[i]){return i+1}}size--}throw"Unknown name at position "+iInit};var checkLiteral=function(){if(value.charAt(iValue)!=format.charAt(iFormat)){throw"Unexpected literal at position "+iValue}iValue++};var iValue=0;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{checkLiteral()}}else{switch(format.charAt(iFormat)){case"d":day=getNumber("d");break;case"D":getName("D",dayNamesShort,dayNames);break;case"o":doy=getNumber("o");break;case"m":month=getNumber("m");break;case"M":month=getName("M",monthNamesShort,monthNames);break;case"y":year=getNumber("y");break;case"@":var date=new Date(getNumber("@"));year=date.getFullYear();month=date.getMonth()+1;day=date.getDate();break;case"'":if(lookAhead("'")){checkLiteral()}else{literal=true}break;default:checkLiteral()}}}if(year==-1){year=new Date().getFullYear()}else{if(year<100){year+=new Date().getFullYear()-new Date().getFullYear()%100+(year<=shortYearCutoff?0:-100)}}if(doy>-1){month=1;day=doy;do{var dim=this._getDaysInMonth(year,month-1);if(day<=dim){break}month++;day-=dim}while(true)}var date=this._daylightSavingAdjust(new Date(year,month-1,day));if(date.getFullYear()!=year||date.getMonth()+1!=month||date.getDate()!=day){throw"Invalid date"}return date},ATOM:"yy-mm-dd",COOKIE:"D, dd M yy",ISO_8601:"yy-mm-dd",RFC_822:"D, d M y",RFC_850:"DD, dd-M-y",RFC_1036:"D, d M y",RFC_1123:"D, d M yy",RFC_2822:"D, d M yy",RSS:"D, d M y",TIMESTAMP:"@",W3C:"yy-mm-dd",formatDate:function(format,date,settings){if(!date){return""}var dayNamesShort=(settings?settings.dayNamesShort:null)||this._defaults.dayNamesShort;var dayNames=(settings?settings.dayNames:null)||this._defaults.dayNames;var monthNamesShort=(settings?settings.monthNamesShort:null)||this._defaults.monthNamesShort;var monthNames=(settings?settings.monthNames:null)||this._defaults.monthNames;var lookAhead=function(match){var matches=(iFormat+1<format.length&&format.charAt(iFormat+1)==match);if(matches){iFormat++}return matches};var formatNumber=function(match,value,len){var num=""+value;if(lookAhead(match)){while(num.length<len){num="0"+num}}return num};var formatName=function(match,value,shortNames,longNames){return(lookAhead(match)?longNames[value]:shortNames[value])};var output="";var literal=false;if(date){for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{output+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":output+=formatNumber("d",date.getDate(),2);break;case"D":output+=formatName("D",date.getDay(),dayNamesShort,dayNames);break;case"o":var doy=date.getDate();for(var m=date.getMonth()-1;m>=0;m--){doy+=this._getDaysInMonth(date.getFullYear(),m)}output+=formatNumber("o",doy,3);break;case"m":output+=formatNumber("m",date.getMonth()+1,2);break;case"M":output+=formatName("M",date.getMonth(),monthNamesShort,monthNames);break;case"y":output+=(lookAhead("y")?date.getFullYear():(date.getYear()%100<10?"0":"")+date.getYear()%100);break;case"@":output+=date.getTime();break;case"'":if(lookAhead("'")){output+="'"}else{literal=true}break;default:output+=format.charAt(iFormat)}}}}return output},_possibleChars:function(format){var chars="";var literal=false;for(var iFormat=0;iFormat<format.length;iFormat++){if(literal){if(format.charAt(iFormat)=="'"&&!lookAhead("'")){literal=false}else{chars+=format.charAt(iFormat)}}else{switch(format.charAt(iFormat)){case"d":case"m":case"y":case"@":chars+="0123456789";break;case"D":case"M":return null;case"'":if(lookAhead("'")){chars+="'"}else{literal=true}break;default:chars+=format.charAt(iFormat)}}}return chars},_get:function(inst,name){return inst.settings[name]!==undefined?inst.settings[name]:this._defaults[name]},_setDateFromField:function(inst){var dateFormat=this._get(inst,"dateFormat");var dates=inst.input?inst.input.val():null;inst.endDay=inst.endMonth=inst.endYear=null;var date=defaultDate=this._getDefaultDate(inst);var settings=this._getFormatConfig(inst);try{date=this.parseDate(dateFormat,dates,settings)||defaultDate}catch(event){this.log(event);date=defaultDate}inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear();inst.currentDay=(dates?date.getDate():0);inst.currentMonth=(dates?date.getMonth():0);inst.currentYear=(dates?date.getFullYear():0);this._adjustInstDate(inst)},_getDefaultDate:function(inst){var date=this._determineDate(this._get(inst,"defaultDate"),new Date());var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");date=(minDate&&date<minDate?minDate:date);date=(maxDate&&date>maxDate?maxDate:date);return date},_determineDate:function(date,defaultDate){var offsetNumeric=function(offset){var date=new Date();date.setDate(date.getDate()+offset);return date};var offsetString=function(offset,getDaysInMonth){var date=new Date();var year=date.getFullYear();var month=date.getMonth();var day=date.getDate();var pattern=/([+-]?[0-9]+)\s*(d|D|w|W|m|M|y|Y)?/g;var matches=pattern.exec(offset);while(matches){switch(matches[2]||"d"){case"d":case"D":day+=parseInt(matches[1],10);break;case"w":case"W":day+=parseInt(matches[1],10)*7;break;case"m":case"M":month+=parseInt(matches[1],10);day=Math.min(day,getDaysInMonth(year,month));break;case"y":case"Y":year+=parseInt(matches[1],10);day=Math.min(day,getDaysInMonth(year,month));break}matches=pattern.exec(offset)}return new Date(year,month,day)};date=(date==null?defaultDate:(typeof date=="string"?offsetString(date,this._getDaysInMonth):(typeof date=="number"?(isNaN(date)?defaultDate:offsetNumeric(date)):date)));date=(date&&date.toString()=="Invalid Date"?defaultDate:date);if(date){date.setHours(0);date.setMinutes(0);date.setSeconds(0);date.setMilliseconds(0)}return this._daylightSavingAdjust(date)},_daylightSavingAdjust:function(date){if(!date){return null}date.setHours(date.getHours()>12?date.getHours()+2:0);return date},_setDate:function(inst,date,endDate){var clear=!(date);var origMonth=inst.selectedMonth;var origYear=inst.selectedYear;date=this._determineDate(date,new Date());inst.selectedDay=inst.currentDay=date.getDate();inst.drawMonth=inst.selectedMonth=inst.currentMonth=date.getMonth();inst.drawYear=inst.selectedYear=inst.currentYear=date.getFullYear();if(origMonth!=inst.selectedMonth||origYear!=inst.selectedYear){this._notifyChange(inst)}this._adjustInstDate(inst);if(inst.input){inst.input.val(clear?"":this._formatDate(inst))}},_getDate:function(inst){var startDate=(!inst.currentYear||(inst.input&&inst.input.val()=="")?null:this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return startDate},_generateHTML:function(inst){var today=new Date();today=this._daylightSavingAdjust(new Date(today.getFullYear(),today.getMonth(),today.getDate()));var isRTL=this._get(inst,"isRTL");var showButtonPanel=this._get(inst,"showButtonPanel");var hideIfNoPrevNext=this._get(inst,"hideIfNoPrevNext");var navigationAsDateFormat=this._get(inst,"navigationAsDateFormat");var numMonths=this._getNumberOfMonths(inst);var showCurrentAtPos=this._get(inst,"showCurrentAtPos");var stepMonths=this._get(inst,"stepMonths");var stepBigMonths=this._get(inst,"stepBigMonths");var isMultiMonth=(numMonths[0]!=1||numMonths[1]!=1);var currentDate=this._daylightSavingAdjust((!inst.currentDay?new Date(9999,9,9):new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");var drawMonth=inst.drawMonth-showCurrentAtPos;var drawYear=inst.drawYear;if(drawMonth<0){drawMonth+=12;drawYear--}if(maxDate){var maxDraw=this._daylightSavingAdjust(new Date(maxDate.getFullYear(),maxDate.getMonth()-numMonths[1]+1,maxDate.getDate()));maxDraw=(minDate&&maxDraw<minDate?minDate:maxDraw);while(this._daylightSavingAdjust(new Date(drawYear,drawMonth,1))>maxDraw){drawMonth--;if(drawMonth<0){drawMonth=11;drawYear--}}}inst.drawMonth=drawMonth;inst.drawYear=drawYear;var prevText=this._get(inst,"prevText");prevText=(!navigationAsDateFormat?prevText:this.formatDate(prevText,this._daylightSavingAdjust(new Date(drawYear,drawMonth-stepMonths,1)),this._getFormatConfig(inst)));var prev=(this._canAdjustMonth(inst,-1,drawYear,drawMonth)?'<a class="ui-datepicker-prev ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#'+inst.id+"', -"+stepMonths+", 'M');\" title=\""+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-prev ui-corner-all ui-state-disabled" title="'+prevText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"e":"w")+'">'+prevText+"</span></a>"));var nextText=this._get(inst,"nextText");nextText=(!navigationAsDateFormat?nextText:this.formatDate(nextText,this._daylightSavingAdjust(new Date(drawYear,drawMonth+stepMonths,1)),this._getFormatConfig(inst)));var next=(this._canAdjustMonth(inst,+1,drawYear,drawMonth)?'<a class="ui-datepicker-next ui-corner-all" onclick="DP_jQuery.datepicker._adjustDate(\'#'+inst.id+"', +"+stepMonths+", 'M');\" title=\""+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>":(hideIfNoPrevNext?"":'<a class="ui-datepicker-next ui-corner-all ui-state-disabled" title="'+nextText+'"><span class="ui-icon ui-icon-circle-triangle-'+(isRTL?"w":"e")+'">'+nextText+"</span></a>"));var currentText=this._get(inst,"currentText");var gotoDate=(this._get(inst,"gotoCurrent")&&inst.currentDay?currentDate:today);currentText=(!navigationAsDateFormat?currentText:this.formatDate(currentText,gotoDate,this._getFormatConfig(inst)));var controls=(!inst.inline?'<button type="button" class="ui-datepicker-close ui-state-default ui-priority-primary ui-corner-all" onclick="DP_jQuery.datepicker._hideDatepicker();">'+this._get(inst,"closeText")+"</button>":"");var buttonPanel=(showButtonPanel)?'<div class="ui-datepicker-buttonpane ui-widget-content">'+(isRTL?controls:"")+(this._isInRange(inst,gotoDate)?'<button type="button" class="ui-datepicker-current ui-state-default ui-priority-secondary ui-corner-all" onclick="DP_jQuery.datepicker._gotoToday(\'#'+inst.id+"');\">"+currentText+"</button>":"")+(isRTL?"":controls)+"</div>":"";var firstDay=parseInt(this._get(inst,"firstDay"),10);firstDay=(isNaN(firstDay)?0:firstDay);var dayNames=this._get(inst,"dayNames");var dayNamesShort=this._get(inst,"dayNamesShort");var dayNamesMin=this._get(inst,"dayNamesMin");var monthNames=this._get(inst,"monthNames");var monthNamesShort=this._get(inst,"monthNamesShort");var beforeShowDay=this._get(inst,"beforeShowDay");var showOtherMonths=this._get(inst,"showOtherMonths");var calculateWeek=this._get(inst,"calculateWeek")||this.iso8601Week;var endDate=inst.endDay?this._daylightSavingAdjust(new Date(inst.endYear,inst.endMonth,inst.endDay)):currentDate;var defaultDate=this._getDefaultDate(inst);var html="";for(var row=0;row<numMonths[0];row++){var group="";for(var col=0;col<numMonths[1];col++){var selectedDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,inst.selectedDay));var cornerClass=" ui-corner-all";var calender="";if(isMultiMonth){calender+='<div class="ui-datepicker-group ui-datepicker-group-';switch(col){case 0:calender+="first";cornerClass=" ui-corner-"+(isRTL?"right":"left");break;case numMonths[1]-1:calender+="last";cornerClass=" ui-corner-"+(isRTL?"left":"right");break;default:calender+="middle";cornerClass="";break}calender+='">'}calender+='<div class="ui-datepicker-header ui-widget-header ui-helper-clearfix'+cornerClass+'">'+(/all|left/.test(cornerClass)&&row==0?(isRTL?next:prev):"")+(/all|right/.test(cornerClass)&&row==0?(isRTL?prev:next):"")+this._generateMonthYearHeader(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,row>0||col>0,monthNames,monthNamesShort)+'</div><table class="ui-datepicker-calendar"><thead><tr>';var thead="";for(var dow=0;dow<7;dow++){var day=(dow+firstDay)%7;thead+="<th"+((dow+firstDay+6)%7>=5?' class="ui-datepicker-week-end"':"")+'><span title="'+dayNames[day]+'">'+dayNamesMin[day]+"</span></th>"}calender+=thead+"</tr></thead><tbody>";var daysInMonth=this._getDaysInMonth(drawYear,drawMonth);if(drawYear==inst.selectedYear&&drawMonth==inst.selectedMonth){inst.selectedDay=Math.min(inst.selectedDay,daysInMonth)}var leadDays=(this._getFirstDayOfMonth(drawYear,drawMonth)-firstDay+7)%7;var numRows=(isMultiMonth?6:Math.ceil((leadDays+daysInMonth)/7));var printDate=this._daylightSavingAdjust(new Date(drawYear,drawMonth,1-leadDays));for(var dRow=0;dRow<numRows;dRow++){calender+="<tr>";var tbody="";for(var dow=0;dow<7;dow++){var daySettings=(beforeShowDay?beforeShowDay.apply((inst.input?inst.input[0]:null),[printDate]):[true,""]);var otherMonth=(printDate.getMonth()!=drawMonth);var unselectable=otherMonth||!daySettings[0]||(minDate&&printDate<minDate)||(maxDate&&printDate>maxDate);tbody+='<td class="'+((dow+firstDay+6)%7>=5?" ui-datepicker-week-end":"")+(otherMonth?" ui-datepicker-other-month":"")+((printDate.getTime()==selectedDate.getTime()&&drawMonth==inst.selectedMonth&&inst._keyEvent)||(defaultDate.getTime()==printDate.getTime()&&defaultDate.getTime()==selectedDate.getTime())?" "+this._dayOverClass:"")+(unselectable?" "+this._unselectableClass+" ui-state-disabled":"")+(otherMonth&&!showOtherMonths?"":" "+daySettings[1]+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" "+this._currentClass:"")+(printDate.getTime()==today.getTime()?" ui-datepicker-today":""))+'"'+((!otherMonth||showOtherMonths)&&daySettings[2]?' title="'+daySettings[2]+'"':"")+(unselectable?"":" onclick=\"DP_jQuery.datepicker._selectDay('#"+inst.id+"',"+drawMonth+","+drawYear+', this);return false;"')+">"+(otherMonth?(showOtherMonths?printDate.getDate():"&#xa0;"):(unselectable?'<span class="ui-state-default">'+printDate.getDate()+"</span>":'<a class="ui-state-default'+(printDate.getTime()==today.getTime()?" ui-state-highlight":"")+(printDate.getTime()>=currentDate.getTime()&&printDate.getTime()<=endDate.getTime()?" ui-state-active":"")+'" href="#">'+printDate.getDate()+"</a>"))+"</td>";printDate.setDate(printDate.getDate()+1);printDate=this._daylightSavingAdjust(printDate)}calender+=tbody+"</tr>"}drawMonth++;if(drawMonth>11){drawMonth=0;drawYear++}calender+="</tbody></table>"+(isMultiMonth?"</div>"+((numMonths[0]>0&&col==numMonths[1]-1)?'<div class="ui-datepicker-row-break"></div>':""):"");group+=calender}html+=group}html+=buttonPanel+($.browser.msie&&parseInt($.browser.version,10)<7&&!inst.inline?'<iframe src="javascript:false;" class="ui-datepicker-cover" frameborder="0"></iframe>':"");inst._keyEvent=false;return html},_generateMonthYearHeader:function(inst,drawMonth,drawYear,minDate,maxDate,selectedDate,secondary,monthNames,monthNamesShort){minDate=(inst.rangeStart&&minDate&&selectedDate<minDate?selectedDate:minDate);var changeMonth=this._get(inst,"changeMonth");var changeYear=this._get(inst,"changeYear");var showMonthAfterYear=this._get(inst,"showMonthAfterYear");var html='<div class="ui-datepicker-title">';var monthHtml="";if(secondary||!changeMonth){monthHtml+='<span class="ui-datepicker-month">'+monthNames[drawMonth]+"</span> "}else{var inMinYear=(minDate&&minDate.getFullYear()==drawYear);var inMaxYear=(maxDate&&maxDate.getFullYear()==drawYear);monthHtml+='<select class="ui-datepicker-month" onchange="DP_jQuery.datepicker._selectMonthYear(\'#'+inst.id+"', this, 'M');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#"+inst.id+"');\">";for(var month=0;month<12;month++){if((!inMinYear||month>=minDate.getMonth())&&(!inMaxYear||month<=maxDate.getMonth())){monthHtml+='<option value="'+month+'"'+(month==drawMonth?' selected="selected"':"")+">"+monthNamesShort[month]+"</option>"}}monthHtml+="</select>"}if(!showMonthAfterYear){html+=monthHtml+((secondary||changeMonth||changeYear)&&(!(changeMonth&&changeYear))?"&#xa0;":"")}if(secondary||!changeYear){html+='<span class="ui-datepicker-year">'+drawYear+"</span>"}else{var years=this._get(inst,"yearRange").split(":");var year=0;var endYear=0;if(years.length!=2){year=drawYear-10;endYear=drawYear+10}else{if(years[0].charAt(0)=="+"||years[0].charAt(0)=="-"){year=drawYear+parseInt(years[0],10);endYear=drawYear+parseInt(years[1],10)}else{year=parseInt(years[0],10);endYear=parseInt(years[1],10)}}year=(minDate?Math.max(year,minDate.getFullYear()):year);endYear=(maxDate?Math.min(endYear,maxDate.getFullYear()):endYear);html+='<select class="ui-datepicker-year" onchange="DP_jQuery.datepicker._selectMonthYear(\'#'+inst.id+"', this, 'Y');\" onclick=\"DP_jQuery.datepicker._clickMonthYear('#"+inst.id+"');\">";for(;year<=endYear;year++){html+='<option value="'+year+'"'+(year==drawYear?' selected="selected"':"")+">"+year+"</option>"}html+="</select>"}if(showMonthAfterYear){html+=(secondary||changeMonth||changeYear?"&#xa0;":"")+monthHtml}html+="</div>";return html},_adjustInstDate:function(inst,offset,period){var year=inst.drawYear+(period=="Y"?offset:0);var month=inst.drawMonth+(period=="M"?offset:0);var day=Math.min(inst.selectedDay,this._getDaysInMonth(year,month))+(period=="D"?offset:0);var date=this._daylightSavingAdjust(new Date(year,month,day));var minDate=this._getMinMaxDate(inst,"min",true);var maxDate=this._getMinMaxDate(inst,"max");date=(minDate&&date<minDate?minDate:date);date=(maxDate&&date>maxDate?maxDate:date);inst.selectedDay=date.getDate();inst.drawMonth=inst.selectedMonth=date.getMonth();inst.drawYear=inst.selectedYear=date.getFullYear();if(period=="M"||period=="Y"){this._notifyChange(inst)}},_notifyChange:function(inst){var onChange=this._get(inst,"onChangeMonthYear");if(onChange){onChange.apply((inst.input?inst.input[0]:null),[inst.selectedYear,inst.selectedMonth+1,inst])}},_getNumberOfMonths:function(inst){var numMonths=this._get(inst,"numberOfMonths");return(numMonths==null?[1,1]:(typeof numMonths=="number"?[1,numMonths]:numMonths))},_getMinMaxDate:function(inst,minMax,checkRange){var date=this._determineDate(this._get(inst,minMax+"Date"),null);return(!checkRange||!inst.rangeStart?date:(!date||inst.rangeStart>date?inst.rangeStart:date))},_getDaysInMonth:function(year,month){return 32-new Date(year,month,32).getDate()},_getFirstDayOfMonth:function(year,month){return new Date(year,month,1).getDay()},_canAdjustMonth:function(inst,offset,curYear,curMonth){var numMonths=this._getNumberOfMonths(inst);var date=this._daylightSavingAdjust(new Date(curYear,curMonth+(offset<0?offset:numMonths[1]),1));if(offset<0){date.setDate(this._getDaysInMonth(date.getFullYear(),date.getMonth()))}return this._isInRange(inst,date)},_isInRange:function(inst,date){var newMinDate=(!inst.rangeStart?null:this._daylightSavingAdjust(new Date(inst.selectedYear,inst.selectedMonth,inst.selectedDay)));newMinDate=(newMinDate&&inst.rangeStart<newMinDate?inst.rangeStart:newMinDate);var minDate=newMinDate||this._getMinMaxDate(inst,"min");var maxDate=this._getMinMaxDate(inst,"max");return((!minDate||date>=minDate)&&(!maxDate||date<=maxDate))},_getFormatConfig:function(inst){var shortYearCutoff=this._get(inst,"shortYearCutoff");shortYearCutoff=(typeof shortYearCutoff!="string"?shortYearCutoff:new Date().getFullYear()%100+parseInt(shortYearCutoff,10));return{shortYearCutoff:shortYearCutoff,dayNamesShort:this._get(inst,"dayNamesShort"),dayNames:this._get(inst,"dayNames"),monthNamesShort:this._get(inst,"monthNamesShort"),monthNames:this._get(inst,"monthNames")}},_formatDate:function(inst,day,month,year){if(!day){inst.currentDay=inst.selectedDay;inst.currentMonth=inst.selectedMonth;inst.currentYear=inst.selectedYear}var date=(day?(typeof day=="object"?day:this._daylightSavingAdjust(new Date(year,month,day))):this._daylightSavingAdjust(new Date(inst.currentYear,inst.currentMonth,inst.currentDay)));return this.formatDate(this._get(inst,"dateFormat"),date,this._getFormatConfig(inst))}});function extendRemove(target,props){$.extend(target,props);for(var name in props){if(props[name]==null||props[name]==undefined){target[name]=props[name]}}return target}function isArray(a){return(a&&(($.browser.safari&&typeof a=="object"&&a.length)||(a.constructor&&a.constructor.toString().match(/\Array\(\)/))))}$.fn.datepicker=function(options){if(!$.datepicker.initialized){$(document).mousedown($.datepicker._checkExternalClick).find("body").append($.datepicker.dpDiv);$.datepicker.initialized=true}var otherArgs=Array.prototype.slice.call(arguments,1);if(typeof options=="string"&&(options=="isDisabled"||options=="getDate")){return $.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this[0]].concat(otherArgs))}return this.each(function(){typeof options=="string"?$.datepicker["_"+options+"Datepicker"].apply($.datepicker,[this].concat(otherArgs)):$.datepicker._attachDatepicker(this,options)})};$.datepicker=new Datepicker();$.datepicker.initialized=false;$.datepicker.uuid=new Date().getTime();$.datepicker.version="1.7.1";window.DP_jQuery=$})(jQuery);;/*
 * jQuery UI Progressbar 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Progressbar
 *
 * Depends:
 *   ui.core.js
 */(function(a){a.widget("ui.progressbar",{_init:function(){this.element.addClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").attr({role:"progressbar","aria-valuemin":this._valueMin(),"aria-valuemax":this._valueMax(),"aria-valuenow":this._value()});this.valueDiv=a('<div class="ui-progressbar-value ui-widget-header ui-corner-left"></div>').appendTo(this.element);this._refreshValue()},destroy:function(){this.element.removeClass("ui-progressbar ui-widget ui-widget-content ui-corner-all").removeAttr("role").removeAttr("aria-valuemin").removeAttr("aria-valuemax").removeAttr("aria-valuenow").removeData("progressbar").unbind(".progressbar");this.valueDiv.remove();a.widget.prototype.destroy.apply(this,arguments)},value:function(b){arguments.length&&this._setData("value",b);return this._value()},_setData:function(b,c){switch(b){case"value":this.options.value=c;this._refreshValue();this._trigger("change",null,{});break}a.widget.prototype._setData.apply(this,arguments)},_value:function(){var b=this.options.value;if(b<this._valueMin()){b=this._valueMin()}if(b>this._valueMax()){b=this._valueMax()}return b},_valueMin:function(){var b=0;return b},_valueMax:function(){var b=100;return b},_refreshValue:function(){var b=this.value();this.valueDiv[b==this._valueMax()?"addClass":"removeClass"]("ui-corner-right");this.valueDiv.width(b+"%");this.element.attr("aria-valuenow",b)}});a.extend(a.ui.progressbar,{version:"1.7.1",defaults:{value:0}})})(jQuery);;/*
 * jQuery UI Effects 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/
 */jQuery.effects||(function(d){d.effects={version:"1.7.1",save:function(g,h){for(var f=0;f<h.length;f++){if(h[f]!==null){g.data("ec.storage."+h[f],g[0].style[h[f]])}}},restore:function(g,h){for(var f=0;f<h.length;f++){if(h[f]!==null){g.css(h[f],g.data("ec.storage."+h[f]))}}},setMode:function(f,g){if(g=="toggle"){g=f.is(":hidden")?"show":"hide"}return g},getBaseline:function(g,h){var i,f;switch(g[0]){case"top":i=0;break;case"middle":i=0.5;break;case"bottom":i=1;break;default:i=g[0]/h.height}switch(g[1]){case"left":f=0;break;case"center":f=0.5;break;case"right":f=1;break;default:f=g[1]/h.width}return{x:f,y:i}},createWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent()}var g={width:f.outerWidth(true),height:f.outerHeight(true),"float":f.css("float")};f.wrap('<div class="ui-effects-wrapper" style="font-size:100%;background:transparent;border:none;margin:0;padding:0"></div>');var j=f.parent();if(f.css("position")=="static"){j.css({position:"relative"});f.css({position:"relative"})}else{var i=f.css("top");if(isNaN(parseInt(i,10))){i="auto"}var h=f.css("left");if(isNaN(parseInt(h,10))){h="auto"}j.css({position:f.css("position"),top:i,left:h,zIndex:f.css("z-index")}).show();f.css({position:"relative",top:0,left:0})}j.css(g);return j},removeWrapper:function(f){if(f.parent().is(".ui-effects-wrapper")){return f.parent().replaceWith(f)}return f},setTransition:function(g,i,f,h){h=h||{};d.each(i,function(k,j){unit=g.cssUnit(j);if(unit[0]>0){h[j]=unit[0]*f+unit[1]}});return h},animateClass:function(h,i,k,j){var f=(typeof k=="function"?k:(j?j:null));var g=(typeof k=="string"?k:null);return this.each(function(){var q={};var o=d(this);var p=o.attr("style")||"";if(typeof p=="object"){p=p.cssText}if(h.toggle){o.hasClass(h.toggle)?h.remove=h.toggle:h.add=h.toggle}var l=d.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add){o.addClass(h.add)}if(h.remove){o.removeClass(h.remove)}var m=d.extend({},(document.defaultView?document.defaultView.getComputedStyle(this,null):this.currentStyle));if(h.add){o.removeClass(h.add)}if(h.remove){o.addClass(h.remove)}for(var r in m){if(typeof m[r]!="function"&&m[r]&&r.indexOf("Moz")==-1&&r.indexOf("length")==-1&&m[r]!=l[r]&&(r.match(/color/i)||(!r.match(/color/i)&&!isNaN(parseInt(m[r],10))))&&(l.position!="static"||(l.position=="static"&&!r.match(/left|top|bottom|right/)))){q[r]=m[r]}}o.animate(q,i,g,function(){if(typeof d(this).attr("style")=="object"){d(this).attr("style")["cssText"]="";d(this).attr("style")["cssText"]=p}else{d(this).attr("style",p)}if(h.add){d(this).addClass(h.add)}if(h.remove){d(this).removeClass(h.remove)}if(f){f.apply(this,arguments)}})})}};function c(g,f){var i=g[1]&&g[1].constructor==Object?g[1]:{};if(f){i.mode=f}var h=g[1]&&g[1].constructor!=Object?g[1]:(i.duration?i.duration:g[2]);h=d.fx.off?0:typeof h==="number"?h:d.fx.speeds[h]||d.fx.speeds._default;var j=i.callback||(d.isFunction(g[1])&&g[1])||(d.isFunction(g[2])&&g[2])||(d.isFunction(g[3])&&g[3]);return[g[0],i,h,j]}d.fn.extend({_show:d.fn.show,_hide:d.fn.hide,__toggle:d.fn.toggle,_addClass:d.fn.addClass,_removeClass:d.fn.removeClass,_toggleClass:d.fn.toggleClass,effect:function(g,f,h,i){return d.effects[g]?d.effects[g].call(this,{method:g,options:f||{},duration:h,callback:i}):null},show:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._show.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"show"))}},hide:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))){return this._hide.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"hide"))}},toggle:function(){if(!arguments[0]||(arguments[0].constructor==Number||(/(slow|normal|fast)/).test(arguments[0]))||(arguments[0].constructor==Function)){return this.__toggle.apply(this,arguments)}else{return this.effect.apply(this,c(arguments,"toggle"))}},addClass:function(g,f,i,h){return f?d.effects.animateClass.apply(this,[{add:g},f,i,h]):this._addClass(g)},removeClass:function(g,f,i,h){return f?d.effects.animateClass.apply(this,[{remove:g},f,i,h]):this._removeClass(g)},toggleClass:function(g,f,i,h){return((typeof f!=="boolean")&&f)?d.effects.animateClass.apply(this,[{toggle:g},f,i,h]):this._toggleClass(g,f)},morph:function(f,h,g,j,i){return d.effects.animateClass.apply(this,[{add:h,remove:f},g,j,i])},switchClass:function(){return this.morph.apply(this,arguments)},cssUnit:function(f){var g=this.css(f),h=[];d.each(["em","px","%","pt"],function(j,k){if(g.indexOf(k)>0){h=[parseFloat(g),k]}});return h}});d.each(["backgroundColor","borderBottomColor","borderLeftColor","borderRightColor","borderTopColor","color","outlineColor"],function(g,f){d.fx.step[f]=function(h){if(h.state==0){h.start=e(h.elem,f);h.end=b(h.end)}h.elem.style[f]="rgb("+[Math.max(Math.min(parseInt((h.pos*(h.end[0]-h.start[0]))+h.start[0],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[1]-h.start[1]))+h.start[1],10),255),0),Math.max(Math.min(parseInt((h.pos*(h.end[2]-h.start[2]))+h.start[2],10),255),0)].join(",")+")"}});function b(g){var f;if(g&&g.constructor==Array&&g.length==3){return g}if(f=/rgb\(\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*\)/.exec(g)){return[parseInt(f[1],10),parseInt(f[2],10),parseInt(f[3],10)]}if(f=/rgb\(\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*,\s*([0-9]+(?:\.[0-9]+)?)\%\s*\)/.exec(g)){return[parseFloat(f[1])*2.55,parseFloat(f[2])*2.55,parseFloat(f[3])*2.55]}if(f=/#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})/.exec(g)){return[parseInt(f[1],16),parseInt(f[2],16),parseInt(f[3],16)]}if(f=/#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])/.exec(g)){return[parseInt(f[1]+f[1],16),parseInt(f[2]+f[2],16),parseInt(f[3]+f[3],16)]}if(f=/rgba\(0, 0, 0, 0\)/.exec(g)){return a.transparent}return a[d.trim(g).toLowerCase()]}function e(h,f){var g;do{g=d.curCSS(h,f);if(g!=""&&g!="transparent"||d.nodeName(h,"body")){break}f="backgroundColor"}while(h=h.parentNode);return b(g)}var a={aqua:[0,255,255],azure:[240,255,255],beige:[245,245,220],black:[0,0,0],blue:[0,0,255],brown:[165,42,42],cyan:[0,255,255],darkblue:[0,0,139],darkcyan:[0,139,139],darkgrey:[169,169,169],darkgreen:[0,100,0],darkkhaki:[189,183,107],darkmagenta:[139,0,139],darkolivegreen:[85,107,47],darkorange:[255,140,0],darkorchid:[153,50,204],darkred:[139,0,0],darksalmon:[233,150,122],darkviolet:[148,0,211],fuchsia:[255,0,255],gold:[255,215,0],green:[0,128,0],indigo:[75,0,130],khaki:[240,230,140],lightblue:[173,216,230],lightcyan:[224,255,255],lightgreen:[144,238,144],lightgrey:[211,211,211],lightpink:[255,182,193],lightyellow:[255,255,224],lime:[0,255,0],magenta:[255,0,255],maroon:[128,0,0],navy:[0,0,128],olive:[128,128,0],orange:[255,165,0],pink:[255,192,203],purple:[128,0,128],violet:[128,0,128],red:[255,0,0],silver:[192,192,192],white:[255,255,255],yellow:[255,255,0],transparent:[255,255,255]};d.easing.jswing=d.easing.swing;d.extend(d.easing,{def:"easeOutQuad",swing:function(g,h,f,j,i){return d.easing[d.easing.def](g,h,f,j,i)},easeInQuad:function(g,h,f,j,i){return j*(h/=i)*h+f},easeOutQuad:function(g,h,f,j,i){return -j*(h/=i)*(h-2)+f},easeInOutQuad:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h+f}return -j/2*((--h)*(h-2)-1)+f},easeInCubic:function(g,h,f,j,i){return j*(h/=i)*h*h+f},easeOutCubic:function(g,h,f,j,i){return j*((h=h/i-1)*h*h+1)+f},easeInOutCubic:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h+f}return j/2*((h-=2)*h*h+2)+f},easeInQuart:function(g,h,f,j,i){return j*(h/=i)*h*h*h+f},easeOutQuart:function(g,h,f,j,i){return -j*((h=h/i-1)*h*h*h-1)+f},easeInOutQuart:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h*h+f}return -j/2*((h-=2)*h*h*h-2)+f},easeInQuint:function(g,h,f,j,i){return j*(h/=i)*h*h*h*h+f},easeOutQuint:function(g,h,f,j,i){return j*((h=h/i-1)*h*h*h*h+1)+f},easeInOutQuint:function(g,h,f,j,i){if((h/=i/2)<1){return j/2*h*h*h*h*h+f}return j/2*((h-=2)*h*h*h*h+2)+f},easeInSine:function(g,h,f,j,i){return -j*Math.cos(h/i*(Math.PI/2))+j+f},easeOutSine:function(g,h,f,j,i){return j*Math.sin(h/i*(Math.PI/2))+f},easeInOutSine:function(g,h,f,j,i){return -j/2*(Math.cos(Math.PI*h/i)-1)+f},easeInExpo:function(g,h,f,j,i){return(h==0)?f:j*Math.pow(2,10*(h/i-1))+f},easeOutExpo:function(g,h,f,j,i){return(h==i)?f+j:j*(-Math.pow(2,-10*h/i)+1)+f},easeInOutExpo:function(g,h,f,j,i){if(h==0){return f}if(h==i){return f+j}if((h/=i/2)<1){return j/2*Math.pow(2,10*(h-1))+f}return j/2*(-Math.pow(2,-10*--h)+2)+f},easeInCirc:function(g,h,f,j,i){return -j*(Math.sqrt(1-(h/=i)*h)-1)+f},easeOutCirc:function(g,h,f,j,i){return j*Math.sqrt(1-(h=h/i-1)*h)+f},easeInOutCirc:function(g,h,f,j,i){if((h/=i/2)<1){return -j/2*(Math.sqrt(1-h*h)-1)+f}return j/2*(Math.sqrt(1-(h-=2)*h)+1)+f},easeInElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l)==1){return f+m}if(!k){k=l*0.3}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}return -(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f},easeOutElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l)==1){return f+m}if(!k){k=l*0.3}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}return h*Math.pow(2,-10*i)*Math.sin((i*l-j)*(2*Math.PI)/k)+m+f},easeInOutElastic:function(g,i,f,m,l){var j=1.70158;var k=0;var h=m;if(i==0){return f}if((i/=l/2)==2){return f+m}if(!k){k=l*(0.3*1.5)}if(h<Math.abs(m)){h=m;var j=k/4}else{var j=k/(2*Math.PI)*Math.asin(m/h)}if(i<1){return -0.5*(h*Math.pow(2,10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k))+f}return h*Math.pow(2,-10*(i-=1))*Math.sin((i*l-j)*(2*Math.PI)/k)*0.5+m+f},easeInBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}return k*(h/=j)*h*((i+1)*h-i)+f},easeOutBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}return k*((h=h/j-1)*h*((i+1)*h+i)+1)+f},easeInOutBack:function(g,h,f,k,j,i){if(i==undefined){i=1.70158}if((h/=j/2)<1){return k/2*(h*h*(((i*=(1.525))+1)*h-i))+f}return k/2*((h-=2)*h*(((i*=(1.525))+1)*h+i)+2)+f},easeInBounce:function(g,h,f,j,i){return j-d.easing.easeOutBounce(g,i-h,0,j,i)+f},easeOutBounce:function(g,h,f,j,i){if((h/=i)<(1/2.75)){return j*(7.5625*h*h)+f}else{if(h<(2/2.75)){return j*(7.5625*(h-=(1.5/2.75))*h+0.75)+f}else{if(h<(2.5/2.75)){return j*(7.5625*(h-=(2.25/2.75))*h+0.9375)+f}else{return j*(7.5625*(h-=(2.625/2.75))*h+0.984375)+f}}}},easeInOutBounce:function(g,h,f,j,i){if(h<i/2){return d.easing.easeInBounce(g,h*2,0,j,i)*0.5+f}return d.easing.easeOutBounce(g,h*2-i,0,j,i)*0.5+j*0.5+f}})})(jQuery);;/*
 * jQuery UI Effects Blind 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Blind
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.blind=function(b){return this.queue(function(){var d=a(this),c=["position","top","left"];var h=a.effects.setMode(d,b.options.mode||"hide");var g=b.options.direction||"vertical";a.effects.save(d,c);d.show();var j=a.effects.createWrapper(d).css({overflow:"hidden"});var e=(g=="vertical")?"height":"width";var i=(g=="vertical")?j.height():j.width();if(h=="show"){j.css(e,0)}var f={};f[e]=h=="show"?i:0;j.animate(f,b.duration,b.options.easing,function(){if(h=="hide"){d.hide()}a.effects.restore(d,c);a.effects.removeWrapper(d);if(b.callback){b.callback.apply(d[0],arguments)}d.dequeue()})})}})(jQuery);;/*
 * jQuery UI Effects Bounce 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Bounce
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.bounce=function(b){return this.queue(function(){var e=a(this),l=["position","top","left"];var k=a.effects.setMode(e,b.options.mode||"effect");var n=b.options.direction||"up";var c=b.options.distance||20;var d=b.options.times||5;var g=b.duration||250;if(/show|hide/.test(k)){l.push("opacity")}a.effects.save(e,l);e.show();a.effects.createWrapper(e);var f=(n=="up"||n=="down")?"top":"left";var p=(n=="up"||n=="left")?"pos":"neg";var c=b.options.distance||(f=="top"?e.outerHeight({margin:true})/3:e.outerWidth({margin:true})/3);if(k=="show"){e.css("opacity",0).css(f,p=="pos"?-c:c)}if(k=="hide"){c=c/(d*2)}if(k!="hide"){d--}if(k=="show"){var h={opacity:1};h[f]=(p=="pos"?"+=":"-=")+c;e.animate(h,g/2,b.options.easing);c=c/2;d--}for(var j=0;j<d;j++){var o={},m={};o[f]=(p=="pos"?"-=":"+=")+c;m[f]=(p=="pos"?"+=":"-=")+c;e.animate(o,g/2,b.options.easing).animate(m,g/2,b.options.easing);c=(k=="hide")?c*2:c/2}if(k=="hide"){var h={opacity:0};h[f]=(p=="pos"?"-=":"+=")+c;e.animate(h,g/2,b.options.easing,function(){e.hide();a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}})}else{var o={},m={};o[f]=(p=="pos"?"-=":"+=")+c;m[f]=(p=="pos"?"+=":"-=")+c;e.animate(o,g/2,b.options.easing).animate(m,g/2,b.options.easing,function(){a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}})}e.queue("fx",function(){e.dequeue()});e.dequeue()})}})(jQuery);;/*
 * jQuery UI Effects Clip 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Clip
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.clip=function(b){return this.queue(function(){var f=a(this),j=["position","top","left","height","width"];var i=a.effects.setMode(f,b.options.mode||"hide");var k=b.options.direction||"vertical";a.effects.save(f,j);f.show();var c=a.effects.createWrapper(f).css({overflow:"hidden"});var e=f[0].tagName=="IMG"?c:f;var g={size:(k=="vertical")?"height":"width",position:(k=="vertical")?"top":"left"};var d=(k=="vertical")?e.height():e.width();if(i=="show"){e.css(g.size,0);e.css(g.position,d/2)}var h={};h[g.size]=i=="show"?d:0;h[g.position]=i=="show"?0:d/2;e.animate(h,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){f.hide()}a.effects.restore(f,j);a.effects.removeWrapper(f);if(b.callback){b.callback.apply(f[0],arguments)}f.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Drop 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Drop
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.drop=function(b){return this.queue(function(){var e=a(this),d=["position","top","left","opacity"];var i=a.effects.setMode(e,b.options.mode||"hide");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e);var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight({margin:true})/2:e.outerWidth({margin:true})/2);if(i=="show"){e.css("opacity",0).css(f,c=="pos"?-j:j)}var g={opacity:i=="show"?1:0};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){e.hide()}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Explode 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Explode
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.explode=function(b){return this.queue(function(){var k=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;var e=b.options.pieces?Math.round(Math.sqrt(b.options.pieces)):3;b.options.mode=b.options.mode=="toggle"?(a(this).is(":visible")?"hide":"show"):b.options.mode;var h=a(this).show().css("visibility","hidden");var l=h.offset();l.top-=parseInt(h.css("marginTop"),10)||0;l.left-=parseInt(h.css("marginLeft"),10)||0;var g=h.outerWidth(true);var c=h.outerHeight(true);for(var f=0;f<k;f++){for(var d=0;d<e;d++){h.clone().appendTo("body").wrap("<div></div>").css({position:"absolute",visibility:"visible",left:-d*(g/e),top:-f*(c/k)}).parent().addClass("ui-effects-explode").css({position:"absolute",overflow:"hidden",width:g/e,height:c/k,left:l.left+d*(g/e)+(b.options.mode=="show"?(d-Math.floor(e/2))*(g/e):0),top:l.top+f*(c/k)+(b.options.mode=="show"?(f-Math.floor(k/2))*(c/k):0),opacity:b.options.mode=="show"?0:1}).animate({left:l.left+d*(g/e)+(b.options.mode=="show"?0:(d-Math.floor(e/2))*(g/e)),top:l.top+f*(c/k)+(b.options.mode=="show"?0:(f-Math.floor(k/2))*(c/k)),opacity:b.options.mode=="show"?1:0},b.duration||500)}}setTimeout(function(){b.options.mode=="show"?h.css({visibility:"visible"}):h.css({visibility:"visible"}).hide();if(b.callback){b.callback.apply(h[0])}h.dequeue();a("div.ui-effects-explode").remove()},b.duration||500)})}})(jQuery);;/*
 * jQuery UI Effects Fold 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Fold
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.fold=function(b){return this.queue(function(){var e=a(this),k=["position","top","left"];var h=a.effects.setMode(e,b.options.mode||"hide");var o=b.options.size||15;var n=!(!b.options.horizFirst);var g=b.duration?b.duration/2:a.fx.speeds._default/2;a.effects.save(e,k);e.show();var d=a.effects.createWrapper(e).css({overflow:"hidden"});var i=((h=="show")!=n);var f=i?["width","height"]:["height","width"];var c=i?[d.width(),d.height()]:[d.height(),d.width()];var j=/([0-9]+)%/.exec(o);if(j){o=parseInt(j[1],10)/100*c[h=="hide"?0:1]}if(h=="show"){d.css(n?{height:0,width:o}:{height:o,width:0})}var m={},l={};m[f[0]]=h=="show"?c[0]:o;l[f[1]]=h=="show"?c[1]:0;d.animate(m,g,b.options.easing).animate(l,g,b.options.easing,function(){if(h=="hide"){e.hide()}a.effects.restore(e,k);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(e[0],arguments)}e.dequeue()})})}})(jQuery);;/*
 * jQuery UI Effects Highlight 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Highlight
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.highlight=function(b){return this.queue(function(){var e=a(this),d=["backgroundImage","backgroundColor","opacity"];var h=a.effects.setMode(e,b.options.mode||"show");var c=b.options.color||"#ffff99";var g=e.css("backgroundColor");a.effects.save(e,d);e.show();e.css({backgroundImage:"none",backgroundColor:c});var f={backgroundColor:g};if(h=="hide"){f.opacity=0}e.animate(f,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(h=="hide"){e.hide()}a.effects.restore(e,d);if(h=="show"&&a.browser.msie){this.style.removeAttribute("filter")}if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Pulsate 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Pulsate
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.pulsate=function(b){return this.queue(function(){var d=a(this);var g=a.effects.setMode(d,b.options.mode||"show");var f=b.options.times||5;var e=b.duration?b.duration/2:a.fx.speeds._default/2;if(g=="hide"){f--}if(d.is(":hidden")){d.css("opacity",0);d.show();d.animate({opacity:1},e,b.options.easing);f=f-2}for(var c=0;c<f;c++){d.animate({opacity:0},e,b.options.easing).animate({opacity:1},e,b.options.easing)}if(g=="hide"){d.animate({opacity:0},e,b.options.easing,function(){d.hide();if(b.callback){b.callback.apply(this,arguments)}})}else{d.animate({opacity:0},e,b.options.easing).animate({opacity:1},e,b.options.easing,function(){if(b.callback){b.callback.apply(this,arguments)}})}d.queue("fx",function(){d.dequeue()});d.dequeue()})}})(jQuery);;/*
 * jQuery UI Effects Scale 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Scale
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.puff=function(b){return this.queue(function(){var f=a(this);var c=a.extend(true,{},b.options);var h=a.effects.setMode(f,b.options.mode||"hide");var g=parseInt(b.options.percent,10)||150;c.fade=true;var e={height:f.height(),width:f.width()};var d=g/100;f.from=(h=="hide")?e:{height:e.height*d,width:e.width*d};c.from=f.from;c.percent=(h=="hide")?g:100;c.mode=h;f.effect("scale",c,b.duration,b.callback);f.dequeue()})};a.effects.scale=function(b){return this.queue(function(){var g=a(this);var d=a.extend(true,{},b.options);var j=a.effects.setMode(g,b.options.mode||"effect");var h=parseInt(b.options.percent,10)||(parseInt(b.options.percent,10)==0?0:(j=="hide"?0:100));var i=b.options.direction||"both";var c=b.options.origin;if(j!="effect"){d.origin=c||["middle","center"];d.restore=true}var f={height:g.height(),width:g.width()};g.from=b.options.from||(j=="show"?{height:0,width:0}:f);var e={y:i!="horizontal"?(h/100):1,x:i!="vertical"?(h/100):1};g.to={height:f.height*e.y,width:f.width*e.x};if(b.options.fade){if(j=="show"){g.from.opacity=0;g.to.opacity=1}if(j=="hide"){g.from.opacity=1;g.to.opacity=0}}d.from=g.from;d.to=g.to;d.mode=j;g.effect("size",d,b.duration,b.callback);g.dequeue()})};a.effects.size=function(b){return this.queue(function(){var c=a(this),n=["position","top","left","width","height","overflow","opacity"];var m=["position","top","left","overflow","opacity"];var j=["width","height","overflow"];var p=["fontSize"];var k=["borderTopWidth","borderBottomWidth","paddingTop","paddingBottom"];var f=["borderLeftWidth","borderRightWidth","paddingLeft","paddingRight"];var g=a.effects.setMode(c,b.options.mode||"effect");var i=b.options.restore||false;var e=b.options.scale||"both";var o=b.options.origin;var d={height:c.height(),width:c.width()};c.from=b.options.from||d;c.to=b.options.to||d;if(o){var h=a.effects.getBaseline(o,d);c.from.top=(d.height-c.from.height)*h.y;c.from.left=(d.width-c.from.width)*h.x;c.to.top=(d.height-c.to.height)*h.y;c.to.left=(d.width-c.to.width)*h.x}var l={from:{y:c.from.height/d.height,x:c.from.width/d.width},to:{y:c.to.height/d.height,x:c.to.width/d.width}};if(e=="box"||e=="both"){if(l.from.y!=l.to.y){n=n.concat(k);c.from=a.effects.setTransition(c,k,l.from.y,c.from);c.to=a.effects.setTransition(c,k,l.to.y,c.to)}if(l.from.x!=l.to.x){n=n.concat(f);c.from=a.effects.setTransition(c,f,l.from.x,c.from);c.to=a.effects.setTransition(c,f,l.to.x,c.to)}}if(e=="content"||e=="both"){if(l.from.y!=l.to.y){n=n.concat(p);c.from=a.effects.setTransition(c,p,l.from.y,c.from);c.to=a.effects.setTransition(c,p,l.to.y,c.to)}}a.effects.save(c,i?n:m);c.show();a.effects.createWrapper(c);c.css("overflow","hidden").css(c.from);if(e=="content"||e=="both"){k=k.concat(["marginTop","marginBottom"]).concat(p);f=f.concat(["marginLeft","marginRight"]);j=n.concat(k).concat(f);c.find("*[width]").each(function(){child=a(this);if(i){a.effects.save(child,j)}var q={height:child.height(),width:child.width()};child.from={height:q.height*l.from.y,width:q.width*l.from.x};child.to={height:q.height*l.to.y,width:q.width*l.to.x};if(l.from.y!=l.to.y){child.from=a.effects.setTransition(child,k,l.from.y,child.from);child.to=a.effects.setTransition(child,k,l.to.y,child.to)}if(l.from.x!=l.to.x){child.from=a.effects.setTransition(child,f,l.from.x,child.from);child.to=a.effects.setTransition(child,f,l.to.x,child.to)}child.css(child.from);child.animate(child.to,b.duration,b.options.easing,function(){if(i){a.effects.restore(child,j)}})})}c.animate(c.to,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(g=="hide"){c.hide()}a.effects.restore(c,i?n:m);a.effects.removeWrapper(c);if(b.callback){b.callback.apply(this,arguments)}c.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Shake 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Shake
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.shake=function(b){return this.queue(function(){var e=a(this),l=["position","top","left"];var k=a.effects.setMode(e,b.options.mode||"effect");var n=b.options.direction||"left";var c=b.options.distance||20;var d=b.options.times||3;var g=b.duration||b.options.duration||140;a.effects.save(e,l);e.show();a.effects.createWrapper(e);var f=(n=="up"||n=="down")?"top":"left";var p=(n=="up"||n=="left")?"pos":"neg";var h={},o={},m={};h[f]=(p=="pos"?"-=":"+=")+c;o[f]=(p=="pos"?"+=":"-=")+c*2;m[f]=(p=="pos"?"-=":"+=")+c*2;e.animate(h,g,b.options.easing);for(var j=1;j<d;j++){e.animate(o,g,b.options.easing).animate(m,g,b.options.easing)}e.animate(o,g,b.options.easing).animate(h,g/2,b.options.easing,function(){a.effects.restore(e,l);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}});e.queue("fx",function(){e.dequeue()});e.dequeue()})}})(jQuery);;/*
 * jQuery UI Effects Slide 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Slide
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.slide=function(b){return this.queue(function(){var e=a(this),d=["position","top","left"];var i=a.effects.setMode(e,b.options.mode||"show");var h=b.options.direction||"left";a.effects.save(e,d);e.show();a.effects.createWrapper(e).css({overflow:"hidden"});var f=(h=="up"||h=="down")?"top":"left";var c=(h=="up"||h=="left")?"pos":"neg";var j=b.options.distance||(f=="top"?e.outerHeight({margin:true}):e.outerWidth({margin:true}));if(i=="show"){e.css(f,c=="pos"?-j:j)}var g={};g[f]=(i=="show"?(c=="pos"?"+=":"-="):(c=="pos"?"-=":"+="))+j;e.animate(g,{queue:false,duration:b.duration,easing:b.options.easing,complete:function(){if(i=="hide"){e.hide()}a.effects.restore(e,d);a.effects.removeWrapper(e);if(b.callback){b.callback.apply(this,arguments)}e.dequeue()}})})}})(jQuery);;/*
 * jQuery UI Effects Transfer 1.7.1
 *
 * Copyright (c) 2009 AUTHORS.txt (http://jqueryui.com/about)
 * Dual licensed under the MIT (MIT-LICENSE.txt)
 * and GPL (GPL-LICENSE.txt) licenses.
 *
 * http://docs.jquery.com/UI/Effects/Transfer
 *
 * Depends:
 *    effects.core.js
 */(function(a){a.effects.transfer=function(b){return this.queue(function(){var f=a(this),h=a(b.options.to),e=h.offset(),g={top:e.top,left:e.left,height:h.innerHeight(),width:h.innerWidth()},d=f.offset(),c=a('<div class="ui-effects-transfer"></div>').appendTo(document.body).addClass(b.options.className).css({top:d.top,left:d.left,height:f.innerHeight(),width:f.innerWidth(),position:"absolute"}).animate(g,b.duration,b.options.easing,function(){c.remove();(b.callback&&b.callback.apply(f[0],arguments));f.dequeue()})})}})(jQuery);;
$j = jQuery.noConflict();

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI.Interfaces");

/**
 * IStatusManager interface 
 * Provides methods: clearStatus(), setErrorStatus(), setStatus(), setBusy(), clearBusy(). 
 */
ININ.Web.Chat.UI.Interfaces.IStatusManager = new ININ.Web.Common.Interface('ININ.Web.Chat.UI.Interfaces.IStatusManager', ['clearStatus', 'setErrorStatus', 'setStatus', 'setBusy', 'clearBusy']);

/*global ININ: true, Class: true, debug: true, navigator: true, window: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI.ConfigConversions");

/**
 * ConfigConversions class 
 * This class provides methods to convert the values found in config.js into the values 
 * desired by ININ.Web.Chat.UI.Page.load(). 
 */
ININ.Web.Chat.UI.ConfigConversions.ChatInteractionType = "Chat";
ININ.Web.Chat.UI.ConfigConversions.CallbackInteractionType = "Callback";

// The following method is here for expansion purposes only, and is not supported at this time.
/* 
 * This method converts the value of "TextType" in config.js to a value that is acceptable for use as the 
 * useHtmlEditor parameter to Page.load(). 
 *  
 * Config.js contains either: 
 * TextType: Plain 
 * or: 
 * TextType: Html 
 *  
 * This method simply returns true if "Html" was specified, and false otherwise. 
 * It is case-insensitive. 
 * 
 * @param textType Either "Plain" or "Html"
 *
ININ.Web.Chat.UI.ConfigConversions.convertTextTypeToUseHtmlEditor = function(textType)
{
    if (null == textType)
    {
        return false;
    }
    if("plain" == textType.toLowerCase())
    {
        return false;
    }
    if("html" == textType.toLowerCase())
    {
        return true;
    }

    return false;
};
*/

/** 
 * This method converts the value of "InteractionTypes" in config.js to a value that is acceptable for use as the 
 * pageMode parameter to Page.load().
 *  
 * @param interactionTypes A specification of which interaction type(s) to allow in this session, in the format used by config.js, i.e. ["chat","callback"] 
 * @return A bitmap representing the specified interaction types 
 */
ININ.Web.Chat.UI.ConfigConversions.convertInteractionTypesToPageMode = function(interactionTypes)
{
    if(!interactionTypes)
    {
        return ININ.Web.Chat.UI.PageModes.CHAT_AND_CALLBACK;
    }

    if(ININ.Web.Common.Utilities.isType(interactionTypes, Array))
    {
        return ININ.Web.Chat.UI.ConfigConversions.convertInteractionTypeArrayToPageMode(interactionTypes);
    }

    return ININ.Web.Chat.UI.ConfigConversions.convertInteractionTypeScalarToPageMode(interactionTypes);
};

/** 
 * This method converts a scalar value of "InteractionTypes" in config.js to a value that is acceptable for use as the 
 * pageMode parameter to Page.load().
 * @see convertInteractionTypesToPageMode 
 *  
 * @param interactionType A specification of which interaction type to allow in this session, in the format used by config.js, i.e. "callback" 
 * @return A bitmap representing the specified interaction type 
 */
ININ.Web.Chat.UI.ConfigConversions.convertInteractionTypeScalarToPageMode = function(interactionType)
{
    if(interactionType == ININ.Web.Chat.UI.ConfigConversions.ChatInteractionType)
    {
        return ININ.Web.Chat.UI.PageModes.CHAT;
    }

    if(interactionType == ININ.Web.Chat.UI.ConfigConversions.CallbackInteractionType)
    {
        return ININ.Web.Chat.UI.PageModes.CALLBACK;
    }

    return ININ.Web.Chat.UI.PageModes.CHAT_AND_CALLBACK;
};

/** 
 * This method converts an array value of "InteractionTypes" in config.js to a value that is acceptable for use as the 
 * pageMode parameter to Page.load(). 
 * @see convertInteractionTypesToPageMode 
 *  
 * @param interactionTypes A specification of which interaction types to allow in this session, in the format used by config.js, i.e. ["chat","callback"] 
 * @return A bitmap representing the specified interaction types 
 */
ININ.Web.Chat.UI.ConfigConversions.convertInteractionTypeArrayToPageMode = function(interactionTypes)
{
    var isChatEnabled = ININ.Web.Chat.WebServices.Utilities.doesArrayHaveElement(interactionTypes, ININ.Web.Chat.UI.ConfigConversions.ChatInteractionType);
    var isCallbackEnabled = ININ.Web.Chat.WebServices.Utilities.doesArrayHaveElement(interactionTypes, ININ.Web.Chat.UI.ConfigConversions.CallbackInteractionType);
    if(isChatEnabled && isCallbackEnabled)
    {
        return ININ.Web.Chat.UI.PageModes.CHAT_AND_CALLBACK;
    }
    if(isChatEnabled)
    {
        return ININ.Web.Chat.UI.PageModes.CHAT;
    }
    if(isCallbackEnabled)
    {
        return ININ.Web.Chat.UI.PageModes.CALLBACK;
    }

    return ININ.Web.Chat.UI.PageModes.CHAT_AND_CALLBACK;
};

/**
 * Returns the URI fragment which the webserver has been configured to treat as a reverse proxy to 
 * the primary IC server.
 * Since AJAX requests can only be made to the originating server, it is necessary to configure a 
 * reverse proxy in order for the requests to get to the IC server(s).  If this Javascript was accessed from
 * http://this-server/somePage.html, then it cannot make AJAX requests to
 * http://IC-server-1:8114/..., even if there weren't a firewall in the way.  So, perhaps
 * this-server was configured in a way such that:
 * http://this-server/I3Root/Server1/websvcs/serverConfiguration reverse proxies to
 * http://IC-server-1:8114/websvcs/serverConfiguration.
 * In that case, "I3Root/Server1" is the "URI Fragment". 
 *  
 * @param icServerCount How many IC servers exist in this configuration 
 * @return The URI fragment that will result in a reverse proxy to the primary IC server. 
 */
ININ.Web.Chat.UI.ConfigConversions.convertICServerCountToCurrentUriFragment = function(icServerCount)
{
    return "I3Root/Server1";
};

/** 
 * Returns the set of URI fragments which map to all of the IC servers.  Currently only 1 or 2 IC servers 
 * are supported.
 *  
 * @param icServerCount How many IC servers exist in this configuration 
 * @return The URI fragments that will result in reverse proxies to the IC servers.
 */
ININ.Web.Chat.UI.ConfigConversions.convertICServerCountToUriFragments = function(icServerCount)
{
    if(icServerCount == 2)
    {
        return ["I3Root/Server1", "I3Root/Server2"];
    }

    return ["I3Root/Server1"];
};

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI.FormFieldTypes");

/**
 * ININ.Web.Chat.UI.FormFieldTypes enum 
 * Represents the various types of form fields that may be present in a Form. 
 */
ININ.Web.Chat.UI.FormFieldTypes.MIN = 1;

ININ.Web.Chat.UI.FormFieldTypes.Username = 1;
ININ.Web.Chat.UI.FormFieldTypes.Password = 2;
ININ.Web.Chat.UI.FormFieldTypes.ConfirmPassword = 3;
ININ.Web.Chat.UI.FormFieldTypes.FirstName = 4;
ININ.Web.Chat.UI.FormFieldTypes.MiddleName = 5;
ININ.Web.Chat.UI.FormFieldTypes.LastName = 6;
ININ.Web.Chat.UI.FormFieldTypes.HomeStreetAddress = 7;
ININ.Web.Chat.UI.FormFieldTypes.HomeCity = 8;
ININ.Web.Chat.UI.FormFieldTypes.HomeState = 9;
ININ.Web.Chat.UI.FormFieldTypes.HomePostalCode = 10;
ININ.Web.Chat.UI.FormFieldTypes.HomeCountry = 11;
ININ.Web.Chat.UI.FormFieldTypes.HomeEmail = 12;
ININ.Web.Chat.UI.FormFieldTypes.HomePhone = 13;
ININ.Web.Chat.UI.FormFieldTypes.HomePhone2 = 14;
ININ.Web.Chat.UI.FormFieldTypes.HomeFax = 15;
ININ.Web.Chat.UI.FormFieldTypes.HomePager = 16;
ININ.Web.Chat.UI.FormFieldTypes.HomeMobile = 17;
ININ.Web.Chat.UI.FormFieldTypes.HomeUrl = 18;
ININ.Web.Chat.UI.FormFieldTypes.Department = 19;
ININ.Web.Chat.UI.FormFieldTypes.Company = 20;
ININ.Web.Chat.UI.FormFieldTypes.JobTitle = 21;
ININ.Web.Chat.UI.FormFieldTypes.AssistantName = 22;
ININ.Web.Chat.UI.FormFieldTypes.AssistantPhone = 23;
ININ.Web.Chat.UI.FormFieldTypes.BusinessStreetAddress = 24;
ININ.Web.Chat.UI.FormFieldTypes.BusinessCity = 25;
ININ.Web.Chat.UI.FormFieldTypes.BusinessState = 26;
ININ.Web.Chat.UI.FormFieldTypes.BusinessPostalCode = 27;
ININ.Web.Chat.UI.FormFieldTypes.BusinessCountry = 28;
ININ.Web.Chat.UI.FormFieldTypes.BusinessEmail = 29;
ININ.Web.Chat.UI.FormFieldTypes.BusinessPhone = 30;
ININ.Web.Chat.UI.FormFieldTypes.BusinessPhone2 = 31;
ININ.Web.Chat.UI.FormFieldTypes.BusinessFax = 32;
ININ.Web.Chat.UI.FormFieldTypes.BusinessPager = 33;
ININ.Web.Chat.UI.FormFieldTypes.BusinessMobile = 34;
ININ.Web.Chat.UI.FormFieldTypes.BusinessUrl = 35;
ININ.Web.Chat.UI.FormFieldTypes.Remarks = 36;
ININ.Web.Chat.UI.FormFieldTypes.Name = 37;
ININ.Web.Chat.UI.FormFieldTypes.Subject = 38;
ININ.Web.Chat.UI.FormFieldTypes.Telephone = 39;

ININ.Web.Chat.UI.FormFieldTypes.MAX = 39;

/*global ININ: true, Class: true */

/**
 * IFormField interface
 * Represents a field within an ININ.Web.Chat.UI.IFormSection within an ININ.Web.Chat.UI.Form. 
 * The various types of fields are enumerated in ININ.Web.Chat.UI.FormFieldTypes. 
 * A field simply represents its FormFieldType. 
 */
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI.Interfaces");
ININ.Web.Chat.UI.Interfaces.IFormField = new ININ.Web.Common.Interface('ININ.Web.Chat.UI.Interfaces.IFormField', ['get_type']);

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * FormField class 
 * Implementation of IFormField interface. 
 */
ININ.Web.Chat.UI.FormField = Class.create(ININ.Web.Common.InterfaceImplementation, 
{
	/** 
	 * constructor 
	 * @param type - The FormFieldType of this FormField.
	 */
    initialize:function($super, type)
    {
        this._validateType(type);
        
        $super();

        this.addImplementedInterface(ININ.Web.Chat.UI.Interfaces.IFormField);

        this._type = type;
    },
    
    // methods

	/**
	 * Throws an exception if the supplied param is not one of the values enumerated in ININ.Web.Chat.UI.FormFieldTypes.
	 * (Private method) 
	 *  
	 * @param type - A value which the caller wishes to determine is or is not a valid form field type.
	 */
    _validateType : function(type)
    {
        ININ.Web.Common.ParameterValidation.validate([type], [{"type": Number, "required": true}] );

        if((type < ININ.Web.Chat.UI.FormFieldTypes.MIN) ||
           (type > ININ.Web.Chat.UI.FormFieldTypes.MAX))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Not a valid type: " + type);
        }
    },

	/**
	 * Returns the type of this FormField.
	 */
    get_type : function()
    {
        return this._type;
    }
});

/*global ININ: true, Class: true */

/**
 * IFormSection interface 
 * A Form is composed of zero or more IFormSections. 
 * An IFormSection is composed of a name, and zero or more IFormFields. 
 */
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI.Interfaces");
ININ.Web.Chat.UI.Interfaces.IFormSection = new ININ.Web.Common.Interface('ININ.Web.Chat.UI.Interfaces.IFormSection', ['get_name', 'get_fields', 'addFieldByFieldType', 'addField']);

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * FormSection class 
 * Implementation of IFormSection interface. 
 */
ININ.Web.Chat.UI.FormSection = Class.create(ININ.Web.Common.InterfaceImplementation, 
{
    /**
	 * constructor 
	 * @param name - Optional. The name of this section of the form.
	 * @param fields - Optional. The fields within this section of the form.
	 */
    initialize:function($super, name, fields)
    {
        ININ.Web.Common.ParameterValidation.validate([name, fields], [ {"type": String, "required": false, "allowEmpty": true}, {"type": Array, "required": false} ]);

        this._validateArrayElements(fields);

        $super();

        this.addImplementedInterface(ININ.Web.Chat.UI.Interfaces.IFormSection);

        this._name = name;
        this._fields = [];

        if(fields && fields.length > 0)
        {
            this._fields = fields;
        }
    },

    // methods

	/** 
	 * Ensures that each object in the supplied array is a valid IFormField. 
	 * (Private method)
	 */
    _validateArrayElements : function(fields)
    {
        if(fields)
        {
            for(var i = 0; i < fields.length; ++i)
            {
                ININ.Web.Common.Interface.ensureImplements(fields[i], ININ.Web.Chat.UI.Interfaces.IFormField);
            }
        }
    },

	/**
	 * Returns the name of this FormSection
	 */
    get_name : function()
    {
        return this._name;
    },

	/** 
	 * Returns an array containing the IFormFields in this FormSection 
	 */
    get_fields : function()
    {
        return this._fields;
    },

	/**
	 * Adds a new FormField of the specified type to this FormSection
	 * 
	 * @param fieldType - The type of FormField to add.  Must be a member of ININ.Web.Chat.UI.FormFieldTypes. 
	 * @returns The modified FormSection, to allow for chaining, such as: 
	 *          myFormSection.addFieldByFieldType(aFieldType).addFieldByFieldType(anotherFieldType) 
	 */
    addFieldByFieldType : function(fieldType)
    {
        return this.addField(new ININ.Web.Chat.UI.FormField(fieldType));
    },

	/**
	 * Adds a new IFormField to this FormSection. 
	 *  
	 * @param field - An instance of any class which implements the IFormField interface.
	 * @returns The modified FormSection, to allow for chaining, such as: 
	 *          myFormSection.addField(aField).addField(anotherField) 
	 */
    addField : function(field)
    {
        ININ.Web.Common.Interface.ensureImplements(field, ININ.Web.Chat.UI.Interfaces.IFormField);

        this._fields.push(field);
        return this;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * Form class 
 * A Form simply represents a collection of IFormSections.
 */
ININ.Web.Chat.UI.Form = Class.create(
{
    /**
	 * constructor 
	 * @param sections - Optional.  An array of instances of IFormSection. 
	 */
    initialize:function(sections)
    {
        ININ.Web.Common.ParameterValidation.validate([sections], [ {"type": Array, "required": false} ]);

        this._sections = [];

        if(sections && sections.length > 0)
        {
            this._sections = sections;
        }
    },

    // methods

	/**
	 * Returns the IFormSections in this form.
	 */
    get_sections : function()
    {
        return this._sections;
    },

	/**
	 * Adds an IFormSections to this Form. 
	 *  
	 * @param section The IFormSection to add to this Form. 
	 */
    addSection : function(section)
    {
        ININ.Web.Common.Interface.ensureImplements(section, ININ.Web.Chat.UI.Interfaces.IFormSection);

        this._sections.push(section);
        return this;
    }
});

/*global ININ: true, Class: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI._Internal");

/**
 * _ErrorDisplayTextBuilder class 
 * This is a singleton, which may be referenced as ININ.Web.Chat.UI.ErrorDisplayTextBuilder.
 * This class handles converting error codes into human-readable messages. 
 */
ININ.Web.Chat.UI._Internal._ErrorDisplayTextBuilder = Class.create(
{
	/**
	 * Builds an error message from an error code (from ININ.Web.Chat.WebServices.ErrorCodes) and/or a string. 
	 * If only the string is present, it will be returned. 
	 * If only the error code is present, a human-readable translation of it will be returned. 
	 * If both are present, the return value will be the string, followed by " - ", followed by the human-readable translation 
	 * of the error code. 
	 * If neither is present, '' will be returned.
	 *  
	 * @param error An ININ.Web.Chat.WebServices.ErrorCode 
	 * @param mainErrorText A string 
	 */
    build : function(error, mainErrorText)
    {
        var builtText = '';
        if(mainErrorText)
        {
            builtText = mainErrorText;
        }

        if(error)
        {
            if(builtText.length > 0)
            {
                builtText += ' - ';
            }

            builtText += this.buildError(error);
        }

        return builtText;
    },

	/**
	 * Takes an error code (from ININ.Web.Chat.WebServices.ErrorCodes) and returns its meaning in a human-readable format. 
	 *  
	 * @param error An ININ.Web.Chat.WebServices.ErrorCode 
	 */
    buildError : function(error)
    {
        ININ.Web.Common.Interface.ensureImplements(error, ININ.Web.Chat.WebServices.Interfaces.IError);

        switch(error.get_errorSource())
        {
            case ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC:
                return this.buildWebSvcError(error);
            case ININ.Web.Chat.WebServices.ErrorCodes.HTTP:
                return this.buildHttpError(error);
            default:
                return this.buildGeneralError(error);
        }
    },

	/**
	 * Takes an error code whose source is ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC and returns its meaning in 
	 * a human-readable format.  Unless you are sure that it's a WEBSVC error code, it would be safer to call build(). 
	 *  
	 * @param error An ININ.Web.Chat.WebServices.ErrorCode 
	 */
    buildWebSvcError : function(error)
    {
        ININ.Web.Common.Interface.ensureImplements(error, ININ.Web.Chat.WebServices.Interfaces.IError);

        switch(error.get_errorType())
        {
            case ININ.Web.Chat.WebServices.ErrorCodes.GENERAL:
                return this.buildGeneralError(error);
            case ININ.Web.Chat.WebServices.ErrorCodes.CONTENTTYPE:
                return this.buildContentTypeError(error);
            case ININ.Web.Chat.WebServices.ErrorCodes.CONTENT:
                return this.buildContentError(error);
            case ININ.Web.Chat.WebServices.ErrorCodes.UNKNOWNENTITY:
                return this.buildUnknownEntityError(error);
            case ININ.Web.Chat.WebServices.ErrorCodes.USERDB:
                return this.buildUserDbError(error);
            default:
                return this.buildGeneralError(error);
        }
    },

	/**
	 * Takes an error code whose source is not ININ.Web.Chat.WebServices.HTTP, and whose source is not 
	 * ININ.Web.Chat.WebServices.WEBSVC unless its error type is ININ.Web.Chat.WebServices.ErrorCodes.GENERAL. 
	 * Returns its meaning in a human-readable format. 
	 * Unless you are sure of the error code (and error type, if error code is WEBSVC), it would be safer to call build(). 
	 *  
	 * @param error An ININ.Web.Chat.WebServices.ErrorCode 
	 */
    buildGeneralError : function(error)
    {
        ININ.Web.Common.Interface.ensureImplements(error, ININ.Web.Chat.WebServices.Interfaces.IError);

        return ININ.Web.Common.Resources.LocalizedStrings.get("GeneralError");
    },

	/**
	 * Takes an error code whose source is ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC and whose error type is 
	 * ININ.Web.Chat.WebServices.ErrorCodes.CONTENTTYPE. 
	 * Returns its meaning in a human-readable format. 
	 * Unless you are sure that it's a WEBSVC error code, or if its error type, it would be safer to call build(). 
	 *  
	 * @param error An ININ.Web.Chat.WebServices.ErrorCode 
	 */
    buildContentTypeError : function(error)
    {
        ININ.Web.Common.Interface.ensureImplements(error, ININ.Web.Chat.WebServices.Interfaces.IError);

        switch(error.get_subErrorType())
        {
            case ININ.Web.Chat.WebServices.ErrorCodes.INVALIDCHARSET:
                return ININ.Web.Common.Resources.LocalizedStrings.get("InvalidCharSetError");
            case ININ.Web.Chat.WebServices.ErrorCodes.INVALIDCONTENTTYPE:
                return ININ.Web.Common.Resources.LocalizedStrings.get("InvalidContentTypeError");
            default:
                return ININ.Web.Common.Resources.LocalizedStrings.get("InvalidContentTypeError");
        }
    },

	/**
	 * Takes an error code whose source is ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC and whose error type is 
	 * ININ.Web.Chat.WebServices.ErrorCodes.CONTENT. 
	 * Returns its meaning in a human-readable format. 
	 * Unless you are sure that it's a WEBSVC error code, or if its error type, it would be safer to call build(). 
	 *  
	 * @param error An ININ.Web.Chat.WebServices.ErrorCode 
	 */
    buildContentError : function(error)
    {
        ININ.Web.Common.Interface.ensureImplements(error, ININ.Web.Chat.WebServices.Interfaces.IError);

        switch(error.get_subErrorType())
        {
            case ININ.Web.Chat.WebServices.ErrorCodes.INVALID:
                return this.buildContentInvalidError(error);
            default:
                return ININ.Web.Common.Resources.LocalizedStrings.get("ContentError");
        }
    },

	/**
	 * Takes an error code whose source is ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC and whose error type is 
	 * ININ.Web.Chat.WebServices.ErrorCodes.CONTENT and whose sub error type is INVALID.
	 * Returns its meaning in a human-readable format. 
	 * Unless you are sure that it's a WEBSVC error code, with error type of CONTENT and sub error type of INVALID, 
	 * it would be safer to call build(). 
	 *  
	 * @param error An ININ.Web.Chat.WebServices.ErrorCode 
	 */
    buildContentInvalidError : function(error)
    {
        ININ.Web.Common.Interface.ensureImplements(error, ININ.Web.Chat.WebServices.Interfaces.IError);

        switch(error.get_token(4))
        {
            case ININ.Web.Chat.WebServices.ErrorCodes.MISSINGDATA:
                return ININ.Web.Common.Resources.LocalizedStrings.get("MissingDataError");
            default:
                return ININ.Web.Common.Resources.LocalizedStrings.get("ContentError");
        }
    },

	/**
	 * Takes an error code whose source is ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC and whose error type is 
	 * ININ.Web.Chat.WebServices.ErrorCodes.UNKNOWNENTITY. 
	 * Returns its meaning in a human-readable format. 
	 * Unless you are sure that it's a WEBSVC error code, or if its error type, it would be safer to call build(). 
	 *  
	 * @param error An ININ.Web.Chat.WebServices.ErrorCode 
	 */
    buildUnknownEntityError : function(error)
    {
        ININ.Web.Common.Interface.ensureImplements(error, ININ.Web.Chat.WebServices.Interfaces.IError);

        switch(error.get_subErrorType())
        {
            case ININ.Web.Chat.WebServices.ErrorCodes.SESSION:
                return ININ.Web.Common.Resources.LocalizedStrings.get("UnknownSessionError");
            case ININ.Web.Chat.WebServices.ErrorCodes.PARTICIPANT:
                return ININ.Web.Common.Resources.LocalizedStrings.get("UnknownParticipantError");
            case ININ.Web.Chat.WebServices.ErrorCodes.BADTARGET:
                return ININ.Web.Common.Resources.LocalizedStrings.get("BadTargetError");
            default:
                return ININ.Web.Common.Resources.LocalizedStrings.get("UnknownEntityError");
        }
    },

	/**
	 * Takes an error code whose source is ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC and whose error type is 
	 * ININ.Web.Chat.WebServices.ErrorCodes.USERDB. 
	 * Returns its meaning in a human-readable format. 
	 * Unless you are sure that it's a WEBSVC error code, or if its error type, it would be safer to call build(). 
	 *  
	 * @param error An ININ.Web.Chat.WebServices.ErrorCode 
	 */
    buildUserDbError : function(error)
    {
        ININ.Web.Common.Interface.ensureImplements(error, ININ.Web.Chat.WebServices.Interfaces.IError);

        switch(error.get_subErrorType())
        {
            case ININ.Web.Chat.WebServices.ErrorCodes.NOTONLINE:
                return ININ.Web.Common.Resources.LocalizedStrings.get("UserNotOnline");
            case ININ.Web.Chat.WebServices.ErrorCodes.BADCREDENTIALS:
                return ININ.Web.Common.Resources.LocalizedStrings.get("BadCredentialsError");
            case ININ.Web.Chat.WebServices.ErrorCodes.ACCOUNTEXISTS:
                return ININ.Web.Common.Resources.LocalizedStrings.get("AccountExistsError");
            default:
                return ININ.Web.Common.Resources.LocalizedStrings.get("UserDbError");
        }
    },

	/**
	 * Takes an error code whose source is ININ.Web.Chat.WebServices.ErrorCodes.HTTP and returns its meaning in 
	 * a human-readable format.  Unless you are sure that it's an HTTP error code, it would be safer to call build(). 
	 *  
	 * @param error An ININ.Web.Chat.WebServices.ErrorCode 
	 */
    buildHttpError : function(error)
    {
        ININ.Web.Common.Interface.ensureImplements(error, ININ.Web.Chat.WebServices.Interfaces.IError);

        return ININ.Web.Common.Resources.LocalizedStrings.get("ErrorConnectingToServer");
    }
});

/**
 * Singleton instance of the _ErrorDisplayTextBuilder class.
 */
ININ.Web.Chat.UI.ErrorDisplayTextBuilder = new ININ.Web.Chat.UI._Internal._ErrorDisplayTextBuilder();

/*global ININ: true, Class: true, Option: true, Element: true, $j: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * Control class
 * Parent class for various GUI classes in this web application.  Each instance of this class wraps a DOM object. 
 * Also provides convenience methods for working with DOM objects. 
 */
ININ.Web.Chat.UI.Control = Class.create(ININ.Web.Common.InterfaceImplementation,
{
    /**
	 * Constructor
	 *  
	 * @param domObject the DOM object which the browser will use to display this Control.  In the default 
	 * implementation, this is treated as an abstract class, and its subclasses each have a method called 
	 * _buildDomObject().  These subclasses then simply include the following in their constructors: 
	 * $super(_buildDomObject()); 
	 * In turn, _buildDomObject() makes use of createElement(), createChildElement(), and/or createHiddenChildElement().
	 */
    initialize:function($super, domObject)
    {
        var numArgs = 2;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Control constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }
        
        if(!domObject)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Control constructor called with a null/undefined dom object paramter.");
        }

        $super();

        this._domObject = domObject;
    },
    
    /**
	 * destructor
	 */
    destroy : function()
    {
        if(this._domObject)
        {
            if(this._domObject.destroy)
            {
                this._domObject.destroy();
            }

            delete this._domObject;
            this._domObject = null;
        }
        
        ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Returns the DOM object which the browser will use to display this Control.
	 */
    get_domObject : function()
    {
        return this._domObject;
    },

	/**
	 * Enables (by passing true) or disables (by passing false) this Control. 
	 *  
	 * @param enabled If true, this Control will be enabled.  If false, this Control will be disabled. 
	 */
    enable : function(enabled)
    {
        this._domObject.disabled = !enabled;
    },

    /**
     * Returns a boolean indicating whether this Control is visible or not.
     *  
     * @return Boolean 
     */
    isVisible : function()
    {
        return this._domObject.visible();
    },

	/**
	 * Causes this Control to become visible in the browser.
	 */
    show : function()
    {
        Element.show(this._domObject);
    },

	/**
	 * Causes this control to become hidden in the browser.
	 */
    hide : function()
    {
        Element.hide(this._domObject);
    },

	/**
	 * Creates a DOM element. 
	 *  
	 * @param tag Which type of HTML tag the new element should have:  a, br, table, etc.
	 * @param id The ID of the new element (optional)
	 * @param attributes The attributes of the new element
	 * @param styles The CSS to apply to the new element (optional)
	 * @param innerHTML The inner HTML of the element (optional, and for compatible tags only)
	 * Example: 
	 * var a = createElement('a', 'myanchor', { 'class': 'foo', href: '/foo.html' }, 
	 *                       { backgroundColor: '#900', fontSize: '12px' }, 'my link to foo');
	 */
    createElement : function(tag, id, attributes, styles, innerHTML)
    {
        var element = new Element(tag, attributes);
        
        if(id)
        {
            element.id = id;
        }

        if(styles)
        {
            Element.setStyle(element, styles);
        }

        if(innerHTML)
        {
            element.innerHTML = innerHTML;
        }

        return element;
    },

	/**
	 * Creates a DOM element, as a child of the supplied DOM element 
	 * 
	 * @param parent An existing DOM element which will become the parent of the new DOM element
	 * @param tag Which type of HTML tag the new element should have:  a, br, table, etc.
	 * @param id The ID of the new element (optional)
	 * @param attributes The attributes of the new element
	 * @param styles The CSS to apply to the new element (optional)
	 * @param innerHTML The inner HTML of the element (optional, and for compatible tags only)
	 * Example: 
	 * var a = createChildElement(parentOfA, 'a', 'myanchor', { 'class': 'foo', href: '/foo.html' }, 
	 *                            { backgroundColor: '#900', fontSize: '12px' }, 'my link to foo');
	 */
    createChildElement : function(parent, tag, id, attributes, styles, innerHTML)
    {
        if(!parent)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("createChildElement: parent parameter is not defined");        
        }

        var element = this.createElement(tag, id, attributes, styles, innerHTML);
        parent.appendChild(element);
        return element;
    },

	/**
	 * Creates a DOM element, as a child of the supplied DOM element.  The new DOM element will initially be hidden.
	 * 
	 * @param parent An existing DOM element which will become the parent of the new DOM element
	 * @param tag Which type of HTML tag the new element should have:  a, br, table, etc.
	 * @param id The ID of the new element (optional)
	 * @param attributes The attributes of the new element
	 * @param styles The CSS to apply to the new element (optional)
	 * @param innerHTML The inner HTML of the element (optional, and for compatible tags only)
	 */
    createHiddenChildElement : function(parent, tag, id, attributes, styles, innerHTML)
    {
        var element = this.createElement(tag, id, attributes, styles, innerHTML);
        $j(element).hide();
        parent.appendChild(element);
        return element;
    },

    // private/protected methods

    /**
     * Finds all HTML elements of the specified type and CSS class, within the supplied element, 
     * and makes them be the same width (the width of whichever 
     * is currently widest).  This is useful because a phrase in 
     * one language may require more width than the same phrase in 
     * another language. 
     *  
     * @param tagName The type of HTML tags that are to be aligned. Example: "label" 
     * @param className Optional. If supplied, only tags with this CSS class will be affected. 
     * @param parent The DOM object on which to perform the work. Optional - if not supplied, the main DOM object for the control will be used. 
     */
    _alignTags : function(tagName, className, parent)
    {
        var maxWidth = 0;
        if (!parent)
        {
            parent = this.get_domObject();
            if (!parent)
            {
                return; // Control hasn't been drawn yet
            }
        }
        var elements = parent.getElementsByTagName(tagName);
        for (var i=0; i<elements.length; i++)
        {
            if ((!className) || (className == elements[i].className))
            {
                if (maxWidth < elements[i].clientWidth)
                {
                    maxWidth = elements[i].clientWidth;
                }
            }
        }

        if (0 == maxWidth)
        {
            return;
        }

        for (var i=0; i<elements.length; i++)
        {
            if ((!className) || (className == elements[i].className))
            {
                // Don't explicitly set the width of invisible or empty elements.
                // Otherwise, things won't work properly if this is called again after
                // they are shown/populated.
                if ((elements[i].visible()) && (elements[i].clientWidth > 0))
                {
                    elements[i].style.width = maxWidth + "px";
                }
            }
        }

        return maxWidth;
    },

    /**
     * Convenience method to return what the value of domElement.offsetRight would 
     * be, if browsers supported it. 
     * 
     * @param domElement Any DOM element 
     */
    _getOffsetRight : function(domElement)
    {
        return domElement.offsetLeft + domElement.offsetWidth;
    }
});

/*global ININ: true, Class: true, Option: true, Element: true, debug: true, document: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * FormPanelBase class 
 * Base class for UI representation of forms. 
 */
ININ.Web.Chat.UI.FormPanelBase = Class.create(ININ.Web.Chat.UI.Control,
{
    /**
     * constructor 
     *  
	 * @param statusManager - An instance of a class which implements ININ.Web.Chat.UI.Interfaces.IStatusManager
	 * @param registerFormContainer - The Panel that contains the registration form.  Must have 
	 *                                a showRegisterForm() method.
	 * @param submitButtonText - The text that should be displayed on the form's submit button
	 * @param formPanelClass - The CSS selector of the form.  The leading dot should not be included. 
	 * @param requiredFields - An array of FormFieldTypes, indicating which fields are required on this form. Optional. 
	 */
    initialize : function($super, statusManager, registerFormContainer, submitButtonText, formPanelClass, requiredFields)
    {
        if((arguments.length != 5) && (arguments.length != 6))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("FormPanelBase constructor called with " + arguments.length + " arguments, but expected 5 or 6.");
        }

        if(requiredFields)
        {
            this._requiredFields = requiredFields;
        }
        else
        {
            this._requiredFields = this.getRequiredFields();
        }

        this._submitButtonText = submitButtonText;
        this._formPanelClass = formPanelClass;
        this._statusManager = statusManager;
        this._registerFormContainer = registerFormContainer;

        var domObject = this._buildDomObject();
        this._validateDomObject();
        
        $super(domObject);
    },
    
    /**
	 * destructor
	 */
    destroy : function()
    {
        this._statusManager = null;

        ININ.Web.Chat.UI.Control.prototype.destroy.call(this);
    },

    // methods

    /**
     * Abstract method, should be overridden by subclass. 
     * Gets a list of fields which the user is required to fill in. 
     *  
     * @return An array of ININ.Web.Chat.UI.FormFieldTypes indicating the required fields of this form.
     */
    getRequiredFields : function()
    {
        return [];
    },

	/** 
	 * Returns 1 and displays an error if the field is required but blank. 
	 * Returns 0 otherwise. 
	 */
    _validateField : function(value, textbox, fieldType)
    {
        if(textbox)
        {
            if(ININ.Web.Chat.WebServices.Utilities.doesArrayHaveElement(this._requiredFields, fieldType))
            {
                if(!value)
                {
                    this._showFieldError(textbox, ININ.Web.Common.Resources.LocalizedStrings.get("FieldIsRequired"));
                    return 1;
                }
            }

            this._hideFieldError(textbox);
        }

        return 0;        
    },

	/**
	 * Hides the div in which error messages go.
	 */
    _hideFieldError : function(textbox)
    {
        var errorDiv = this._getTextBoxErrorDivFromTextBox(textbox);
        Element.hide(errorDiv);
    },

	/**
	 * Puts a message into the div in which error messages go, and ensures that the div is visible. 
	 *  
	 * @param textbox - The textbox to which the error pertains (so that an indicator may be shown next to it)
	 * @param errorText - the error message to display 
	 */
    _showFieldError : function(textbox, errorText)
    {
        this._setFieldError(textbox, errorText);
        var errorDiv = this._getTextBoxErrorDivFromTextBox(textbox);
        Element.show(errorDiv);
    },

	/**
	 * Given a textbox in the field, returns the corresponding error div, or null if not found.
	 */
    _getTextBoxErrorDivFromTextBox : function(textbox)
    {
        var parentDiv = Element.up(textbox, 'div');
        var divs = Element.select(parentDiv, 'span.iwc-formfielderror');
        if(divs && divs.length > 0)
        {
            return divs[0];
        }

        return null;
    },

	/**
	 * Sets the value of the textbox's error span to the supplied text. 
	 * @param textbox - the textbox to which the error pertains
	 * @param errorText - the error message 
	 */
    _setFieldError : function(textbox, errorText)
    {
        var errorDiv = this._getTextBoxErrorDivFromTextBox(textbox);
        var spans = Element.select(errorDiv, 'span');
        if(spans && spans.length > 0)
        {
            var span = spans[0];
            if(span)
            {
                span.innerHTML = errorText;
            }
        }
    },

	/**
	 * Erases the text in a textbox
	 */
    _clearTextboxIfAvailable : function(textbox)
    {
        if(textbox)
        {
            textbox.value = '';
        }

        return null;
    },

	/**
	 * Ensures that this is a valid form panel.  Subclasses may override - this implementation simply 
	 * checks if the form has a submit button. 
	 */
    _validateDomObject : function()
    {
        if(!this._submitButton)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Submit button not found");
        }
    },

	/**
	 * Builds the DOM representation of the form, so the browser can display it. 
	 * @see _buildInnerPanel() in subclasses 
	 */
    _buildDomObject : function()
    {
        var div = this.createElement('div', null, {'class': 'iwc-form-panel ' + this._formPanelClass});
        var form = this.createChildElement(div, 'form', null, {'action': '#', 'class': 'iwc-form'});
        form.onsubmit = function() { return false; }
        form.appendChild(this._buildInnerPanel());
        return div;
    },

	/**
	 * Builds the DOM representation of the div that contains this form's submit button.
	 */
    _buildButtonPanel : function()
    {
        var div = this.createElement('div', null, {'class': 'iwc-form-button-div'});
        this._submitButton = this.createChildElement(div, 'input', null, {'type': 'submit', 'value': this._submitButtonText});
        Element.observe(this._submitButton, 'click', this._onClickSubmitButton.bindAsEventListener(this));
        return div;
    },

	/**
	 * Adds a div to the form into which error messages can be placed.
	 */
    _addErrorDiv : function(div)
    {
        var divError = this.createChildElement(div, 'span', null, { 'class': 'iwc-formfielderror' }, { 'display': 'none' });
        this.createChildElement(divError, 'img', null, { 'src': 'img/error.png' });
        this.createChildElement(divError, 'span');
    },

	/**
	 * Handler for the submit button being clicked.
	 */
    _onClickSubmitButton : function()
    {
        // override this in derived class
    },

	/**
	 * Returns the text that is currently in the supplied textbox, if any.  Returns null otherwise.
	 */
    _getValueIfAvailable : function(textbox)
    {
        if(textbox)
        {
            return textbox.value;
        }

        return null;
    }
});

/*global ININ: true, Class: true, Option: true, Element: true, debug: true, document: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * LoginFormPanelBase class 
 *  
 * UI representation of a login form.  May be subclassed for specific purposes. 
 */
ININ.Web.Chat.UI.LoginFormPanelBase = Class.create(ININ.Web.Chat.UI.FormPanelBase,
{
    AUTHENTICATION_NONE : 0, // Should not actually be used, but is useful for variable initialization before ORing the other values.
    AUTHENTICATION_ANONYMOUS : 1,
    AUTHENTICATION_TRACKER : 2,
    //AUTHENTICATION_STS : 4,
    //...

    /**
     * constructor 
     *  
	 * @param statusManager - An instance of a class which implements ININ.Web.Chat.UI.Interfaces.IStatusManager
	 * @param registerFormContainer - The Panel that contains the registration form.  Must have 
	 *                                a showRegisterForm() method.
	 * @param submitButtonText - The text that should be displayed on the form's submit button
	 * @param formPanelClass - The CSS selector of the form.  The leading dot should not be included. 
     * @param allowedAccessTypes - A logical OR of one or more of the AUTHENTICATION_* constants above.
     * @param requiredFields - An array of FormFieldTypes, indicating which fields are required on this form. Optional.
     * @param strings - An object may be used to override some or all of the strings used in this control. Optional.
	 */
    initialize : function($super, statusManager, registerFormContainer, submitButtonText, formPanelClass, allowedAccessTypes, requiredFields, strings)
    {
        var minArgs = 6;
        var maxArgs = 8;
        if((arguments.length < minArgs) || (arguments.length > maxArgs))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("LoginFormPanel constructor called with " + arguments.length + " arguments, but expected between " + minArgs + " and " + maxArgs);
        }

        this._initializeStrings(strings);
        this._allowedAccessTypes = allowedAccessTypes;

        $super(statusManager, registerFormContainer, submitButtonText, formPanelClass, requiredFields);
    },

    /**
	 * destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.UI.FormPanelBase.prototype.destroy.call(this);
    },

    // methods

	/**
	 * Determines which form field should get focus when the overall form does.
	 */
    focus : function()
    {
        if(this._authenticatedRadio && this._anonymousRadio)
        {
            if(this._isAuthenticatedRadioClicked())
            {
                this._authenticatedIdentifierTextBox.focus();
            }
            else
            {
                this._anonymousIdentifierTextBox.focus();
            }
        }
        else if(this._authenticatedIdentifierTextBox)
        {
            this._authenticatedIdentifierTextBox.focus();
        }
        else if(this._anonymousIdentifierTextBox)
        {
            this._anonymousIdentifierTextBox.focus();
        }
        this._alignTags("label");
        this._alignSubmitButton();
    },

	/**
	 * Clears the fields of the form
	 */
    reset : function()
    {
        this._onClickAuthenticatedRadio();
        this._clearTextboxIfAvailable(this._anonymousIdentifierTextBox);
        this._clearTextboxIfAvailable(this._authenticatedIdentifierTextBox);
        this._clearTextboxIfAvailable(this._authenticatedCredentialsTextBox);
    },

    /**
     * Overrides the UI control to which the submit button should dynamically align. 
     * In LTR languages, the right edge of the button will align with the right edge of this control. 
     * If this method is never called, the target will default to the name/username 
     * textbox (see getSubmitButtonAlignmentTarget()). 
     * 
     * @param element Any DOM element on the screen.
     */
    setSubmitButtonAlignmentTarget : function(element)
    {
        this._submitButtonAlignmentTarget = element;
    },

    /**
     * Gets the UI control to which the submit button should dynamically align. 
     * In LTR languages, the right edge of the button will align with the right edge of this control. 
     * If setSubmitButtonAlignmentTarget() was ever called, the return value will be the parameter 
     * that was passed to that method.  Otherwise, the return value will be the name/username 
     * textbox.
     * 
     * @return A DOM element on the screen.
     */
    getSubmitButtonAlignmentTarget : function()
    {
        if (this._submitButtonAlignmentTarget)
        {
            return this._submitButtonAlignmentTarget;
        }

        if(this._authenticatedRadio && this._anonymousRadio)
        {
            if(this._isAuthenticatedRadioClicked())
            {
                return this._authenticatedIdentifierTextBox;
            }
            else
            {
                return this._anonymousIdentifierTextBox;
            }
        }
        else if(this._authenticatedIdentifierTextBox)
        {
            return this._authenticatedIdentifierTextBox;
        }
        else if(this._anonymousIdentifierTextBox)
        {
            return this._anonymousIdentifierTextBox;
        }
    },

    /**
     * Sets up the strings which will be used in this UI. 
     *  
     * @param defaultOverrides Optional. May be used to override the strings that would be used by default.
     */
    _initializeStrings : function(defaultOverrides)
    {
        this._strings = defaultOverrides;
        if (!this._strings)
        {
            this._strings = new Object();
        }

        if (!this._strings.authenticatedRadioLabel)
        {
            this._strings.authenticatedRadioLabel = ININ.Web.Common.Resources.LocalizedStrings.get("IHaveAnAccount");
        }

        if (!this._strings.anonymousRadioLabel)
        {
            this._strings.anonymousRadioLabel = ININ.Web.Common.Resources.LocalizedStrings.get("IDontHaveAnAccount");
        }

        if (!this._strings.createAccountLinkLabel)
        {
            this._strings.createAccountLinkLabel = ININ.Web.Common.Resources.LocalizedStrings.get("CreateAnAccount");
        }

        if (!this._strings.authenticatedIdentifierLabel)
        {
            this._strings.authenticatedIdentifierLabel = ININ.Web.Common.Resources.LocalizedStrings.get("UsernameLabel");
        }

        if (!this._strings.authenticatedCredentialsLabel)
        {
            this._strings.authenticatedCredentialsLabel = ININ.Web.Common.Resources.LocalizedStrings.get("PasswordLabel");
        }

        if (!this._strings.anonymousIdentifierLabel)
        {
            this._strings.anonymousIdentifierLabel = ININ.Web.Common.Resources.LocalizedStrings.get("NameLabel");
        }

        // Comparison is different here: if caller passes in nothing, the default value is used. If caller passes
        // in some other string, that string is used. If caller passes in false, the label is not displayed at all.
        if (!this._strings.anonymousIdentifierQualifierLabel && false !== this._strings.anonymousIdentifierQualifierLabel)
        {
            this._strings.anonymousIdentifierQualifierLabel = ININ.Web.Common.Resources.LocalizedStrings.get("OptionalTag");
        }
    },
    
    _buildInnerPanel : function()
    {
        var div = this.createElement('div');

        if (this._multipleAccessTypesAllowed())
        {
        div.appendChild(this._buildRadioButtonPanel());
        }

        if (this._allowedAccessTypes & this.AUTHENTICATION_TRACKER)
        {
        this._authenticatedCredentialsDiv = this._buildAuthenticatedCredentialsPanel();
        div.appendChild(this._authenticatedCredentialsDiv);
        }

        if (this._allowedAccessTypes & this.AUTHENTICATION_ANONYMOUS)
        {
        this._anonymousCredentialsDiv = this._buildAnonymousCredentialsPanel();
        div.appendChild(this._anonymousCredentialsDiv);
        }

        div.appendChild(this._buildExtraFormFields());
        this._buttonPanel = this._buildButtonPanel()
        div.appendChild(this._buttonPanel);

        this._onClickAuthenticatedRadio();

        return div;
    },

    /**
     * Returns true if the number of access types (anonymous, 
     * tracker, etc.) is >= 2.  Returns false otherwise. 
     */
    _multipleAccessTypesAllowed : function()
    {
        var alreadyFoundAOne = false;
        var bits = this._allowedAccessTypes;
        while (0 != bits)
        {
            if (bits & 1)
            {
                if (alreadyFoundAOne)
                {
                    return true;
                }
                alreadyFoundAOne = true;
            }
            bits >>= 1;
        }
        return false;
    },

    _buildRadioButtonPanel : function()
    {
        var div = this.createElement('div');
        var childDiv = null;

        if (this._allowedAccessTypes & this.AUTHENTICATION_TRACKER)
        {
            childDiv = this.createChildElement(div, 'div', null, {'class': 'iwc-form-field-div'});
            this._authenticatedRadio = this.createChildElement(childDiv, 'input', null, {'type': 'radio', 'defaultChecked': true, 'checked': true});
            var span = this.createChildElement(childDiv, 'span', null, { 'class': 'iwc-account-radio-button-label'}, null, this._strings.authenticatedRadioLabel);
        Element.observe(this._authenticatedRadio, 'click', this._onClickAuthenticatedRadio.bindAsEventListener(this));
        Element.observe(span, 'click', this._onClickAuthenticatedRadio.bindAsEventListener(this));
        }

        if (this._allowedAccessTypes & this.AUTHENTICATION_ANONYMOUS)
        {
            childDiv = this.createChildElement(div, 'div', null, {'class': 'iwc-form-field-div'});
            this._anonymousRadio = this.createChildElement(childDiv, 'input', null, {'type': 'radio'});
            var span = this.createChildElement(childDiv, 'span', null, { 'class': 'iwc-account-radio-button-label'}, null, this._strings.anonymousRadioLabel);
        Element.observe(this._anonymousRadio, 'click', this._onClickAnonymousRadio.bindAsEventListener(this));
        Element.observe(span, 'click', this._onClickAnonymousRadio.bindAsEventListener(this));
        }

        return div;
    },

    _onClickAuthenticatedRadio : function()
    {
        // if this form doesn't support both authentication types, these radio buttons won't be here
        if(this._authenticatedRadio && this._anonymousRadio)
        {
            this._authenticatedRadio.checked = true;
            this._anonymousRadio.checked = false;

            Element.show(this._authenticatedCredentialsDiv);
            Element.hide(this._anonymousCredentialsDiv);
        }

        this._alignTags("label");
        this._alignSubmitButton();
    },

    _onClickAnonymousRadio : function()
    {
        // if this form doesn't support both authentication types, these radio buttons won't be here
        if(this._authenticatedRadio && this._anonymousRadio)
        {
            this._authenticatedRadio.checked = false;
            this._anonymousRadio.checked = true;

            Element.hide(this._authenticatedCredentialsDiv);
            Element.show(this._anonymousCredentialsDiv);

            this._anonymousIdentifierTextBox.focus();
        }

        this._alignTags("label");
        this._alignSubmitButton();
    },

    _onClickCreateAccount : function()
    {
        this._registerFormContainer.showRegisterForm();
    },

    _shouldAddCreateAccountLink : function()
    {
        var tabVisibility = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility);
        if (tabVisibility.hideRegisterNewAccountTab())
        {
            return false;
        }

        return ININ.Web.Chat.WebServices.CapabilityRepository.isTrackerRegistrationCapabilityEnabled();

    },

    _onClickCreateAccount : function()
    {
        this._registerFormContainer.showRegisterForm();
    },

    _shouldAddCreateAccountLink : function()
    {
        var tabVisibility = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility);
        if (tabVisibility.hideRegisterNewAccountTab())
        {
            return false;
        }

        return ININ.Web.Chat.WebServices.CapabilityRepository.isTrackerRegistrationCapabilityEnabled();
    },

    _buildAuthenticatedCredentialsPanel : function()
    {
        var maximumFieldLengths = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths);
        var div = this.createElement('div', null, { 'class': 'iwc-account-indented-panel'});

        // authenticatedIdentifier (e.g. username) div
        var authenticatedIdentifierDiv = this.createChildElement(div, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(authenticatedIdentifierDiv, 'label', null, { 'class': 'iwc-label'}, null, this._strings.authenticatedIdentifierLabel);
        this._authenticatedIdentifierTextBox = this.createChildElement(authenticatedIdentifierDiv, 'input', null, { 'type': 'text', 'class': 'iwc-textbox', 'maxlength': maximumFieldLengths.get_nameMaximumLength()});
        this._addErrorDiv(authenticatedIdentifierDiv);

        // authenticated credentials (e.g. password) div
        var authenticatedCredentialsDiv = this.createChildElement(div, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(authenticatedCredentialsDiv, 'label', null, { 'class': 'iwc-label'}, null, this._strings.authenticatedCredentialsLabel);
        this._authenticatedCredentialsTextBox = this.createChildElement(authenticatedCredentialsDiv, 'input', null, { 'type': 'password', 'class': 'iwc-textbox', 'maxlength': maximumFieldLengths.get_passwordMaximumLength()});
        this._addErrorDiv(authenticatedCredentialsDiv);

        return div;
    },

    _buildAnonymousCredentialsPanel : function()
    {
        var maximumFieldLengths = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths);
        var div = this.createElement('div', null, { 'class': 'iwc-account-indented-panel'});

        // anonymous identifier (e.g. name) div
        var anonymousIdentifierDiv = this.createChildElement(div, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(anonymousIdentifierDiv, 'label', null, { 'class': 'iwc-label' }, null, this._strings.anonymousIdentifierLabel);
        this._anonymousIdentifierTextBox = this.createChildElement(anonymousIdentifierDiv, 'input', null, { 'type': 'text', 'class': 'iwc-textbox', 'maxlength': maximumFieldLengths.get_nameMaximumLength()});

        if (this._strings.anonymousIdentifierQualifierLabel)
        {
            this.createChildElement(anonymousIdentifierDiv, 'span', null, { 'class': 'iwc-label iwc-optional-label' }, null, this._strings.anonymousIdentifierQualifierLabel);
        }

        this._addErrorDiv(anonymousIdentifierDiv);

        return div;
    },

    _buildExtraFormFields : function()
    {
        // overload this in a derived class if you need to add extra form fields
        return this.createElement('div');
    },

    _isAuthenticatedRadioClicked : function()
    {
        return this._authenticatedRadio && this._authenticatedRadio.checked;        
    },

    _alignSubmitButton : function()
    {
        var target = this.getSubmitButtonAlignmentTarget();

        if (ININ.Web.Chat.UI.LanguageCodeConverter.currentLanguageIsRightToLeft())
        {
            this._buttonPanel.style.left = this._getOffsetRight(target) + "px";
        } else
        {
            this._buttonPanel.style.width = this._getOffsetRight(target) + "px";
        }
    }
});

/*global ININ: true, Class: true, Option: true, Element: true, debug: true, document: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * CallbackLoginFormPanel class 
 * Implements the panel in which the user types their name, phone number, subject of their callback request, etc. 
 */
ININ.Web.Chat.UI.CallbackLoginFormPanel = Class.create(ININ.Web.Chat.UI.LoginFormPanelBase,
{
    /**
	 * constructor 
	 *  
	 * @param callbackManager An instance of a subclass of ININ.Web.Chat.WebServices.CallbackManagerBase
	 * @param statusManager An instance of a class which implements ININ.Web.Chat.UI.Interfaces.IStatusManager
	 * @param registerFormContainer The Panel that contains the registration form.  Must have 
	 *                              a showRegisterForm() method.
     * @param callbackParameters An instance of CallbackParameters
	 * @param requiredFields Optional parameter.  An array of FormFieldTypes, indicating which fields are required on this form.
	 */
    initialize : function($super, callbackManager, statusManager, registerFormContainer, callbackParameters, requiredFields)
    {
        this._callbackManager = callbackManager;
        this._callbackParameters = callbackParameters;

        this._maxSubjectLen = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_subjectMaximumLength();

        var allowedAccessTypes = this.AUTHENTICATION_NONE;
        if (ININ.Web.Chat.WebServices.CapabilityRepository.isCallbackTrackerAuthenticationCapabilityEnabled())
        {
            allowedAccessTypes |= this.AUTHENTICATION_TRACKER;
        }
        if (ININ.Web.Chat.WebServices.CapabilityRepository.isCallbackAnonymousAuthenticationCapabilityEnabled())
        {
            allowedAccessTypes |= this.AUTHENTICATION_ANONYMOUS;
        }
        $super(statusManager, registerFormContainer, ININ.Web.Common.Resources.LocalizedStrings.get("StartCallbackButton"), 'iwc-callback-form-panel', allowedAccessTypes, requiredFields);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationFailureNotification);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackCreationFailureNotificationObserver(this);
    },
    
    /**
	 * destructor
	 */
    destroy : function()
    {
        this._callbackManager = null;

        ININ.Web.Chat.UI.LoginFormPanelBase.prototype.destroy.call(this);
    },

    // methods

	/**
	 * Clears the fields of the login form.
	 */
    reset : function()
    {
        this._onClickAuthenticatedRadio();
        this._clearTextboxIfAvailable(this._anonymousIdentifierTextBox);
        this._clearTextboxIfAvailable(this._authenticatedIdentifierTextBox);
        this._clearTextboxIfAvailable(this._authenticatedCredentialsTextBox);
        this._clearTextboxIfAvailable(this._subjectTextBox);
        this._clearTextboxIfAvailable(this._telephoneTextBox);
        this._statusManager.clearBusy();
    },

    /**
     * Gets a list of fields which the user is required to fill in. 
     *  
     * @return An array of FormFieldTypes 
     */
    getRequiredFields : function()
    {
        return [ININ.Web.Chat.UI.FormFieldTypes.Username, ININ.Web.Chat.UI.FormFieldTypes.Password,
                ININ.Web.Chat.UI.FormFieldTypes.Telephone, ININ.Web.Chat.UI.FormFieldTypes.Subject];
    },

    /**
     * Respond to notification that an attempt to create a Callback has failed. 
     * 
     * @param notification Contains an error indicating the reason for the failure.
     */
    processCallbackCreationFailureNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationFailureNotification);

        var error = notification.get_error();
        var text = ININ.Web.Chat.UI.ErrorDisplayTextBuilder.build(error, ININ.Web.Common.Resources.LocalizedStrings.get("CallbackFailed"));
        this._statusManager.setErrorStatus(text);
        this._statusManager.clearBusy();
    },

    // private methods

    _buildInnerPanel : function()
    {
        var div = this.createElement('div'); 

        // container div
        this._containerDiv = this.createChildElement(div, 'div');
        this._containerDiv.appendChild(ININ.Web.Chat.UI.LoginFormPanelBase.prototype._buildInnerPanel.call(this));

        return div;
    },

    _buildExtraFormFields : function()
    {
        // overload this in a derived class if you need to add extra form fields
        return this._buildCallbackDetailsPanel();
    },

    _buildCallbackDetailsPanel : function()
    {
        var div = this.createElement('div', null, { 'class': 'iwc-account-indented-panel'});

        // telephone div
        var telephoneDiv = this.createChildElement(div, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(telephoneDiv, 'label', null, { 'class': 'iwc-label'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("TelephoneLabel"));
        var maximumFieldLengths = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths);
        this._telephoneTextBox = this.createChildElement(telephoneDiv, 'input', null, { 'type': 'text', 'class': 'iwc-textbox', 'maxlength': maximumFieldLengths.get_telephoneMaximumLength()});
        this._addErrorDiv(telephoneDiv);

        // subject div
        var subjectDiv = this.createChildElement(div, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(subjectDiv, 'label', null, { 'class': 'iwc-label iwc-description-label'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("DescriptionLabel"));
        this._subjectTextBox = this.createChildElement(subjectDiv, 'textarea', null, { 'class': 'iwc-description-textarea'});
        Element.observe(this._subjectTextBox, 'keyup', this._onKeyUpTextArea.bindAsEventListener(this));
        this._addErrorDiv(subjectDiv);

        this.setSubmitButtonAlignmentTarget(this._subjectTextBox); // Make the submit button align with the textarea

        return div;
    },

    _onClickSubmitButton : function()
    {
        this._statusManager.clearStatus();
        
        var additionalErrorTextArray = [];
        
        var name = this._getValueIfAvailable(this._anonymousIdentifierTextBox);
        var username = this._getValueIfAvailable(this._authenticatedIdentifierTextBox);
        var password = this._getValueIfAvailable(this._authenticatedCredentialsTextBox);
        var subject = this._getValueIfAvailable(this._subjectTextBox);
        var telephone = this._getValueIfAvailable(this._telephoneTextBox);

        var numErrors = 0;
        if(this._isAuthenticatedRadioClicked())
        {
            numErrors += this._validateField(username, this._authenticatedIdentifierTextBox, ININ.Web.Chat.UI.FormFieldTypes.Username);
            numErrors += this._validateField(password, this._authenticatedCredentialsTextBox, ININ.Web.Chat.UI.FormFieldTypes.Password);
        }

        numErrors += this._validateField(subject, this._subjectTextBox, ININ.Web.Chat.UI.FormFieldTypes.Subject);
        numErrors += this._validateField(telephone, this._telephoneTextBox, ININ.Web.Chat.UI.FormFieldTypes.Telephone);

        // if errors are present, show the status and return
        if(numErrors > 0)
        {
            var errorText;

            if(numErrors == 1)
            {
                errorText = ININ.Web.Common.Resources.LocalizedStrings.get("OneErrorWithCallbackData");
            }
            else
            {
                errorText = ININ.Web.Common.Resources.LocalizedStrings.get("MultipleErrorsWithCallbackData").replace('%0', numErrors);
            }

            for(var i = 0; i < additionalErrorTextArray.length; ++i)
            {
                errorText += '<br />';
                errorText += additionalErrorTextArray[i];
            }

            this._statusManager.setErrorStatus(errorText);
        }
        else
        {
            this._callbackParameters.set_subject(subject);
            this._callbackParameters.set_telephone(telephone);

            if(this._isAuthenticatedRadioClicked())
            {
                this._callbackParameters.set_participantName(username);
                this._callbackParameters.set_participantCredentials(password);
                this._createCallback();
            }
            else
            {
                if(!name)
                {
                    name = ININ.Web.Common.Resources.LocalizedStrings.get("AnonymousUser");
                }

                this._callbackParameters.set_participantName(name);
                this._callbackParameters.set_participantCredentials(null);
                this._createCallback();
            }
        }
    },

    _createCallback : function()
    {
        try
        {
            this._statusManager.setBusy();
            this._callbackManager.createCallback(this._callbackParameters);
        }
        catch(ex)
        {
            this._statusManager.clearBusy();
            ININ.Web.Common.Debug.traceError("Caught unhandled exception:\n" + ex);
            ININ.Web.Common.Debug.alert("Caught unhandled exception:\n" + ex);
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(ex, "CallbackLoginFormPanel._createCallback()");
        }
    },

	/**
	 * Key handler.  Enforces maximum length, since the HTML textarea tag has no "maxlength" attribute.
	 */
    _onKeyUpTextArea : function(evt)
    {
        // This method will be called for special keys in Firefox, but not in IE.  Just ignore them.
        if (evt.keyCode == 37  || // Left arrow
            evt.keyCode == 38  || // Up arrow
            evt.keyCode == 39  || // Right arrow
            evt.keyCode == 40  || // Down arrow
            evt.keyCode == 8   || // Backspace
            evt.keyCode == 93  || // Right-click menu key
            evt.keyCode == 91  || // Window key
            evt.keyCode == 45  || // Insert
            evt.keyCode == 46  || // Delete
            evt.keyCode == 35  || // End
            evt.keyCode == 36  || // Home
            evt.keyCode == 33  || // PgUp
            evt.keyCode == 34  || // PgDn
            evt.keyCode == 116 || // Ctrl+F5 (reload)
            evt.keyCode == 192)   // Alt, when used in combination with another key.  For instance,
                                  // if Alt-LeftArrow is pressed to go back, this method will be
                                  // called twice, once with 192 and then again with 37.  If Alt is
                                  // pressed by itself, this method will not be called.
        {
            return;
        }

        var len = this._subjectTextBox.value.length;
      
        if (len >= this._maxSubjectLen)
        {
            evt.stop();

            // Handle the case in which the user just pasted a large block of text
            this._subjectTextBox.value = this._subjectTextBox.value.substr(0, this._maxSubjectLen);
        }
    },

    _onClickAuthenticatedRadio : function()
    {
        ININ.Web.Chat.UI.LoginFormPanelBase.prototype._onClickAuthenticatedRadio.call(this);
    },


    _onClickAnonymousRadio : function()
    {
        ININ.Web.Chat.UI.LoginFormPanelBase.prototype._onClickAnonymousRadio.call(this);
    }
});

/*global ININ: true, Class: true, Option: true, Element: true, debug: true, document: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * CallbackCreationSuccessPanel class 
 * Implements the panel in which the user is informed that a Callback was created successfully.
 */
ININ.Web.Chat.UI.CallbackCreationSuccessPanel = Class.create(ININ.Web.Chat.UI.Control,
{
    /**
	 * constructor 
	 */
    initialize : function($super)
    {
        this._formPanelClass = 'iwc-callback-creation-success-panel';

        var domObject = this._buildDomObject();
        this._validateDomObject();

        $super(domObject);
    },
    
    /**
	 * destructor
	 */
    destroy : function()
    {
    },

    // methods

    /** 
     * Shows the panel 
     */
    show : function()
    {
        Element.show(this._domObject);
    },

    /** 
     * Hides the panel 
     */
    hide : function()
    {
        Element.hide(this._domObject);
    },

    // private methods

    _buildDomObject : function()
    {
        var div = this.createElement('div', null, {'class': this._formPanelClass}, {'display': 'none'}); 
        this.createChildElement(div, 'img', null, {'src':'img/check.png'});
        this._messageSpan = this.createChildElement(div, 'span', null, {'class': 'iwc-label'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("CallbackSucceeded"));
        return div;
    },

    _validateDomObject : function()
    {
        if(!this._messageSpan)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackCreationSuccessPanel not built properly!");
        }
    }
});

/*global ININ: true, Class: true, Option: true, Element: true, debug: true, document: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * CallbackStatusPanel class 
 * Implements the panel in which the user manages previously-created Callbacks.
 * This is an abstract class. @see WebServicesCallbackStatusPanel. 
 */
ININ.Web.Chat.UI.CallbackStatusPanel = Class.create(ININ.Web.Chat.UI.Control,
{
    /**
     * constructor 
     *  
	 * @param statusManager An instance of a class which implements ININ.Web.Chat.UI.Interfaces.IStatusManager
	 */
    initialize : function($super, statusManager)
    {
        this._statusManager = statusManager;
        this._cssClass = 'iwc-callback-status-panel';

        var domObject = this._buildDomObject();
        this._validateDomObject();

        $super(domObject);

        if (this._isStatusSupported())
        {
            this._statusFieldsDisplay = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.StatusFieldsDisplay);
        }
    },
    
    /**
	 * destructor
	 */
    destroy : function()
    {
        this._statusFieldsDisplay = null;
    },

    // methods

    /**
     * What to do when the panel gets focus. 
     * Currently does nothing, since there are no textboxes, radio buttons, etc. 
     */
    focus : function()
    {
        // Nothing to do
    },

    /**
     * Resets the panel to its initial appearance.
     */
    reset : function()
    {
        this._callbackCreationSuccessPanel.hide();
        this.showDisconnectButtonPanel();
        this.hideAgentPhoto();
        this.hideCallbackParameters();
        this.hideStatus();
        this._statusManager.clearBusy();
    },

    /** 
     * Show the panel indicating that a callback has been created successfully
     */
    showCallbackCreationSuccessPanel : function()
    {
        this._callbackCreationSuccessPanel.show();
    },

    /** 
     * Show the panel containing the disconnect button (and hide the disconnect failure panel)
     */
    showDisconnectButtonPanel : function()
    {
        if (this._isDisconnectSupported())
        {
            Element.hide(this._disconnectFailurePanel);
            Element.show(this._disconnectButtonPanel);
        }
    },

    /**
     * Show the disconnect failure panel. 
     * The disconnect button panel is not hidden, so that the user may re-attempt the disconnect. 
     */
    showDisconnectFailurePanel : function()
    {
        if (this._isDisconnectSupported())
        {
            this.setStatusIndicator(null);
            Element.hide(this._statusFailurePanel);
            Element.show(this._disconnectFailurePanel);
            this._statusManager.clearBusy();
        }
    },

    /**
     * Abstract method, implemented in subclass. 
     * Does the work of disconnecting the callback. 
     */
    disconnect : function()
    {
        throw ININ.Web.Common.ExceptionFactory.createException("CallbackStatusPanel.disconnect(): Abstract method not overridden by child class!");
    },

    /**
     * Sets the displayed participant name, telephone number, subject, and creation date/time of the callback.
     * 
     * @param participantName The name or username of the web user who has created the callback request 
     * @param telephone The telephone number at which the participant indicated they would like to be called 
     * @param subject The subject of the callback (which the web user entered in the CallbackLoginPanel)
     * @param creationDateTime A Javascript Date object containing the timestamp of when the callback request was created 
     */
    showCallbackParameters : function(participantName, telephone, subject, creationDateTime)
    {
        if (!this._isStatusSupported())
        {
            return;
        }

        if (this._statusFieldsDisplay.get_showSubject())
        {
            this._subjectSpan.innerHTML = subject;
            Element.show(this._subjectSpan);
        }
        else
        {
            Element.hide(this._subjectSpan);
        }

        var showingAtLeastOneField = false; // (Excluding the subject)

        if (this._statusFieldsDisplay.get_showName())
        {
            this._participantNameField.innerHTML = participantName;
            showingAtLeastOneField = true;
        }

        if (this._statusFieldsDisplay.get_showTelephone())
        {
            this._telephoneNumberField.innerHTML = telephone;
            showingAtLeastOneField = true;
        }

        if (this._statusFieldsDisplay.get_showCreationDateTime())
        {
            this._creationDateTimeField.innerHTML = creationDateTime.toLocaleString();
            showingAtLeastOneField = true;
        }

        if (showingAtLeastOneField)
        {
            Element.show(this._parameterFieldsContainerDiv);
        }
    },

    /**
     * Hides the displayed subject of the callback
     */
    hideCallbackParameters : function()
    {
        if (this._isStatusSupported())
        {
            Element.hide(this._parameterFieldsContainerDiv);
            Element.hide(this._subjectSpan);
        }
    },

    /**
     * Sets the status indicator (quick visual reference of what state the callback is in).
     * 
     * @param status TODO
     */
    setStatusIndicator : function(statusKey)
    {
        if (!this._isStatusSupported())
        {
            return;
        }

        if (statusKey)
        {
            try
            {
                var status = ININ.Web.Common.Resources.LocalizedStrings.get(statusKey);
                this._statusIndicator.innerHTML = status;
                Element.show(this._statusIndicator);
            } catch (e)
            {
                ININ.Web.Common.Debug.traceWarning('Received status indicator "' + statusKey + '" is not a resource file key: ' + e);
            }
        }
        else
        {
            Element.hide(this._statusIndicator);
        }
    },

    /**
     * Sets the status fields and makes the panel visible 
     * @params A Javascript object containing any or all of the following fields: 
     * assignedAgentName, interactionState, estimatedCallbackTime (specified in seconds after now), 
     * queueWaitTime (in seconds), queuePosition, queueName, longestWaitTime (in seconds), 
     * interactionsWaitingCount, loggedInAgentsCount, availableAgentsCount
     */
    showStatus : function(params)
    {
        if (!this._isStatusSupported())
        {
            return;
        }

        Element.hide(this._statusFailurePanel);

        if (this._statusFieldsDisplay.get_showAssignedAgentName() && params.assignedAgentName)
        {
            this._assignedAgentField.innerHTML = params.assignedAgentName;
            Element.show(this._assignedAgentDiv);
        }
        else
        {
            Element.hide(this._assignedAgentDiv);
        }

        if (this._statusFieldsDisplay.get_showInteractionState() && params.interactionState && !(params.interactionState.match(/\%\d+\%/)))
        {
            this._callbackStateField.innerHTML = params.interactionState;
            Element.show(this._callbackStateDiv);
        }
        else
        {
            Element.hide(this._callbackStateDiv);
        }

        if (this._statusFieldsDisplay.get_showEstimatedCallbackTime() && params.estimatedCallbackTime && params.estimatedCallbackTime > 0)
        {
            this._estimatedCallbackTimeField.innerHTML = this._statusFieldsDisplay.formatTimeDuration("TimeDuration", params.estimatedCallbackTime);
            Element.show(this._estimatedCallbackTimeDiv);
        }
        else
        {
            Element.hide(this._estimatedCallbackTimeDiv);
        }

        if (this._statusFieldsDisplay.get_showQueueWaitTime() && params.queueWaitTime && params.queueName && params.queueWaitTime > 0)
        {
            this._queueWaitTimeLabel.innerHTML = ININ.Web.Common.Resources.LocalizedStrings.get("WaitTimeLabel");
            this._queueWaitTimeField.innerHTML = this._statusFieldsDisplay.formatTimeDuration("TimeDuration", params.queueWaitTime);
            Element.show(this._queueWaitTimeDiv);
        }
        else
        {
            Element.hide(this._queueWaitTimeDiv);
        }

        if (this._statusFieldsDisplay.get_showQueuePosition() && params.queuePosition && params.queueName && params.queuePosition > 0)
        {
            this._queuePositionLabel.innerHTML = ININ.Web.Common.Resources.LocalizedStrings.get("QueuePositionLabel").replace('%0', params.queueName);
            this._queuePositionField.innerHTML = params.queuePosition;
            Element.show(this._queuePositionDiv);
        }
        else
        {
            Element.hide(this._queuePositionDiv);
        }

        if (this._statusFieldsDisplay.get_showLongestWaitTime() && params.longestWaitTime && params.longestWaitTime > 0)
        {
            this._longestWaitTimeField.innerHTML = this._statusFieldsDisplay.formatTimeDuration("TimeDuration", params.longestWaitTime);
            Element.show(this._longestWaitTimeDiv);
        }
        else
        {
            Element.hide(this._longestWaitTimeDiv);
        }

        if (this._statusFieldsDisplay.get_showInteractionsWaitingCount() && params.interactionsWaitingCount && params.interactionsWaitingCount >= 0)
        {
            this._interactionsWaitingCountField.innerHTML = params.interactionsWaitingCount;
            Element.show(this._interactionsWaitingCountDiv);
        }
        else
        {
            Element.hide(this._interactionsWaitingCountDiv);
        }

        if (this._statusFieldsDisplay.get_showLoggedInAgentsCount() && params.loggedInAgentsCount && params.loggedInAgentsCount >= 0)
        {
            this._loggedInAgentsCountField.innerHTML = params.loggedInAgentsCount;
            Element.show(this._loggedInAgentsCountDiv);
        }
        else
        {
            Element.hide(this._loggedInAgentsCountDiv);
        }

        if (this._statusFieldsDisplay.get_showAvailableAgentsCount() && params.availableAgentsCount && params.availableAgentsCount >= 0)
        {
            this._availableAgentsCountField.innerHTML = params.availableAgentsCount;
            Element.show(this._availableAgentsCountDiv);
        }
        else
        {
            Element.hide(this._availableAgentsCountDiv);
        }

        Element.show(this._statusFieldsContainerDiv);
    },

    /**
     * Hides the status fields of the callback
     */
    hideStatus : function()
    {
        if (this._isStatusSupported())
        {
            Element.hide(this._statusFieldsContainerDiv);
        }
    },

    /**
     * Shows the failure message
     */
    showStatusFailure : function()
    {
        if (this._isStatusSupported())
        {
            Element.hide(this._statusFieldsContainerDiv);
            this.setStatusIndicator(null);
            this.hideAgentPhoto();
            Element.show(this._statusFailurePanel);
            Element.show(this._domObject);
        }
    },

    /**
     * Displays the photo at the supplied URL as the agent photo.
     * 
     * @param url The URL of the agent's photo
     */
    showAgentPhoto : function(url)
    {
        if (this._isStatusSupported())
        {
            this._assignedAgentPhoto.src = "/" + ININ.Web.Chat.WebServices.Servers.CurrentUriFragment + url;
            Element.show(this._assignedAgentPhoto);
        }
    },

    /**
     * Hides the agent's photo
     */
    hideAgentPhoto : function()
    {
        if (this._isStatusSupported())
        {
            Element.hide(this._assignedAgentPhoto);
            this._assignedAgentPhoto.src = "";
        }
    },

    /**
     * Abstract method, implemented in subclass. 
     * Does the work of querying the status. 
     */
    queryStatus : function()
    {
        throw ININ.Web.Common.ExceptionFactory.createException("CallbackStatusPanel.queryStatus(): Abstract method not overridden by child class!");
    },

    // private methods

    _buildDomObject : function()
    {
        // Root panel
        this._panelContainerDiv = this.createElement('div', null, {'class': 'containsFloatingChild ' + this._cssClass}, { 'display': 'none' });

        this._addCallbackCreationSuccessPanel();

        this._addStatusIndicatorAndButtonContainerDiv();

        this._addAssignedAgentPhotoDiv();

        this._addStatusAndFailureContainerDiv();

        return this._panelContainerDiv;
    },

    _addCallbackCreationSuccessPanel : function()
    {
        panel = new ININ.Web.Chat.UI.CallbackCreationSuccessPanel();
        this._panelContainerDiv.appendChild(panel.get_domObject());
        this._callbackCreationSuccessPanel = panel;
    },

    _addStatusIndicatorAndButtonContainerDiv : function()
    {
        if (this._isStatusSupported() || this._isDisconnectSupported())
        {
            this._statusIndicatorAndButtonContainerDiv = this.createChildElement(this._panelContainerDiv, 'div', null, {'class': 'iwc-callback-status-indicator-and-button-container'});
            this._addStatusIndicator();
            this._addDisconnectButtonPanel();
        }
    },

    _addStatusIndicator : function()
    {
        if (this._isStatusSupported())
        {
            this._statusIndicator = this.createChildElement(this._statusIndicatorAndButtonContainerDiv, 'div', null, {'class': 'iwc-callback-status-indicator'}, { 'display': 'none'});
        }
    },

    _addDisconnectButtonPanel : function()
    {
        if (this._isDisconnectSupported())
        {
            // The panel containing the button to initiate the disconnect
            this._disconnectButtonPanel = this.createChildElement(this._statusIndicatorAndButtonContainerDiv, 'div', null, {'class': 'iwc-callback-disconnect-button-panel'}, {'display': 'none'});
            var disconnectButton = this.createChildElement(this._disconnectButtonPanel, 'input', null, { 'type': 'button', 'class': 'iwc-callback-disconnect-button', 'value': ININ.Web.Common.Resources.LocalizedStrings.get("DisconnectCallback") });
            Element.observe(disconnectButton, 'click', this._onClickDisconnectButton.bindAsEventListener(this));
        }
    },

    _addAssignedAgentPhotoDiv : function()
    {
        if (this._isStatusSupported())
        {
            this._assignedAgentPhoto = this.createChildElement(this._panelContainerDiv, 'img', null, { 'class': 'iwc-callback-participant-avatar'}, {'display': 'none'});
        }
    },

    _addStatusAndFailureContainerDiv : function()
    {
        if (this._isStatusSupported() || this._isDisconnectSupported())
        {
            this._statusAndFailureContainerDiv = this.createChildElement(this._panelContainerDiv, 'div', null, {'class': 'iwc-callback-status-and-failure-container'});
        }
        this._addStatusPanel();
        this._addFailureContainerDiv();
    },

    _addStatusPanel : function()
    {
        if (!this._isStatusSupported())
        {
            return;
        }

        this._statusPanel = this.createChildElement(this._statusAndFailureContainerDiv, 'div', null, {'class': 'iwc-callback-status'});

        // Subject
        var subjectDiv = this.createChildElement(this._statusPanel, 'div', null, {'class': 'iwc-callback-status-subject-div'});
        this._subjectSpan = this.createChildElement(subjectDiv, 'span', null, { 'class': 'iwc-callback-status-subject' });

        // Container for fields that the web user entered him/herself
        this._parameterFieldsContainerDiv = this.createChildElement(this._statusPanel, 'div', null, {'class': 'iwc-callback-status-fields-container-div'}, {'display': 'none'});

        // Web user's name or username
        this._participantNameDiv = this.createChildElement(this._parameterFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(this._participantNameDiv, 'label', null, { 'class': 'iwc-key'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("CallbackCreatorNameLabel"));
        this._participantNameField = this.createChildElement(this._participantNameDiv, 'label', null, { 'class': 'iwc-label'});
        
        // Creation date/time
        this._creationDateTimeDiv = this.createChildElement(this._parameterFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(this._creationDateTimeDiv, 'label', null, { 'class': 'iwc-key'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("CallbackCreationDateTimeLabel"));
        this._creationDateTimeField = this.createChildElement(this._creationDateTimeDiv, 'label', null, { 'class': 'iwc-label'});

        // Telephone number
        this._telephoneNumberDiv = this.createChildElement(this._parameterFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(this._telephoneNumberDiv, 'label', null, { 'class': 'iwc-key'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("TelephoneLabel"));
        this._telephoneNumberField = this.createChildElement(this._telephoneNumberDiv, 'label', null, { 'class': 'iwc-label'});

        // Container for status fields obtained from IC
        this._statusFieldsContainerDiv = this.createChildElement(this._statusPanel, 'div', null, {'class': 'iwc-callback-status-fields-container-div'}, {'display': 'none'});

        // Assigned agent
        this._assignedAgentDiv = this.createChildElement(this._statusFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(this._assignedAgentDiv, 'label', null, { 'class': 'iwc-key'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("AssignedAgentLabel"));
        this._assignedAgentField = this.createChildElement(this._assignedAgentDiv, 'label', null, { 'class': 'iwc-label'});

        // Interaction state
        this._callbackStateDiv = this.createChildElement(this._statusFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(this._callbackStateDiv, 'label', null, { 'class': 'iwc-key'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("CallbackStateLabel"));
        this._callbackStateField = this.createChildElement(this._callbackStateDiv, 'label', null, { 'class': 'iwc-label'});

        // Queue wait time
        this._queueWaitTimeDiv = this.createChildElement(this._statusFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this._queueWaitTimeLabel = this.createChildElement(this._queueWaitTimeDiv, 'label', null, { 'class': 'iwc-key'});
        this._queueWaitTimeField = this.createChildElement(this._queueWaitTimeDiv, 'label', null, { 'class': 'iwc-label'});

        // Estimated callback time
        this._estimatedCallbackTimeDiv = this.createChildElement(this._statusFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(this._estimatedCallbackTimeDiv, 'label', null, { 'class': 'iwc-key'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("EstimatedCallbackTimeLabel"));
        this._estimatedCallbackTimeField = this.createChildElement(this._estimatedCallbackTimeDiv, 'label', null, { 'class': 'iwc-label'});

        // Queue position
        this._queuePositionDiv = this.createChildElement(this._statusFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this._queuePositionLabel = this.createChildElement(this._queuePositionDiv, 'label', null, { 'class': 'iwc-key'});
        this._queuePositionField = this.createChildElement(this._queuePositionDiv, 'label', null, { 'class': 'iwc-label'});

        // Longest wait time
        this._longestWaitTimeDiv = this.createChildElement(this._statusFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this._longestWaitTimeLabel = this.createChildElement(this._longestWaitTimeDiv, 'label', null, { 'class': 'iwc-key'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("LongestWaitTimeLabel"));
        this._longestWaitTimeField = this.createChildElement(this._longestWaitTimeDiv, 'label', null, { 'class': 'iwc-label'});

        // Calls waiting count
        this._interactionsWaitingCountDiv = this.createChildElement(this._statusFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this._interactionsWaitingCountLabel = this.createChildElement(this._interactionsWaitingCountDiv, 'label', null, { 'class': 'iwc-key'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("InteractionsWaitingCountLabel"));
        this._interactionsWaitingCountField = this.createChildElement(this._interactionsWaitingCountDiv, 'label', null, { 'class': 'iwc-label'});

        // Logged in agents count
        this._loggedInAgentsCountDiv = this.createChildElement(this._statusFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this._loggedInAgentsCountLabel = this.createChildElement(this._loggedInAgentsCountDiv, 'label', null, { 'class': 'iwc-key'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("LoggedInAgentsCountLabel"));
        this._loggedInAgentsCountField = this.createChildElement(this._loggedInAgentsCountDiv, 'label', null, { 'class': 'iwc-label'});

        // Available agents count
        this._availableAgentsCountDiv = this.createChildElement(this._statusFieldsContainerDiv, 'div', null, {'class': 'iwc-form-field-div'});
        this._availableAgentsCountLabel = this.createChildElement(this._availableAgentsCountDiv, 'label', null, { 'class': 'iwc-key'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("AvailableAgentsCountLabel"));
        this._availableAgentsCountField = this.createChildElement(this._availableAgentsCountDiv, 'label', null, { 'class': 'iwc-label'});
    },

    _addFailureContainerDiv : function()
    {
        if (this._isStatusSupported() || this._isDisconnectSupported())
        {
            this._failureContainerDiv = this.createChildElement(this._statusAndFailureContainerDiv, 'div', null, {'class': 'iwc-callback-status-failure-container'});
        }
        this._addStatusFailurePanel();
        this._addDisconnectFailurePanel();
    },

    _addStatusFailurePanel : function()
    {
        if (this._isStatusSupported())
        {
            this._statusFailurePanel = this.createChildElement(this._failureContainerDiv, 'div', null, {'class': 'iwc-callback-status-failure'}, {'display': 'none'});
            this.createChildElement(this._statusFailurePanel, 'img', null, {'src':'img/error.png'});
            this.createChildElement(this._statusFailurePanel, 'span', null, {'class': 'iwc-label'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("CallbackStatusFailed"));
        }
    },

    _addDisconnectFailurePanel : function()
    {
        if (this._isDisconnectSupported())
        {
            // The panel that informs the user that the disconnect has failed
            this._disconnectFailurePanel = this.createChildElement(this._failureContainerDiv, 'div', null, {'class': 'iwc-callback-disconnect-failure-panel'}, {'display': 'none'});
            this.createChildElement(this._disconnectFailurePanel, 'img', null, {'src':'img/error.png'});
            this.createChildElement(this._disconnectFailurePanel, 'span', null, {'class': 'iwc-label'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("DisconnectCallbackFailed"));
        }
    },

    _validateDomObject : function()
    {
        if((this._isDisconnectSupported() && !this._disconnectFailurePanel) ||
           (this._isStatusSupported() && !this._statusFailurePanel) ||
           (!this._callbackCreationSuccessPanel))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackStatusPanel not built properly!");
        }
    },

    _isStatusSupported : function()
    {
        return ININ.Web.Chat.WebServices.CapabilityRepository.isCallbackStatusCapabilityEnabled();
    },

    _isDisconnectSupported : function()
    {
        return ININ.Web.Chat.WebServices.CapabilityRepository.isDisconnectCallbackCapabilityEnabled();
    },

    _isReconnectSupported : function()
    {
        return ININ.Web.Chat.WebServices.CapabilityRepository.isReconnectCallbackCapabilityEnabled();
    },

    _onClickDisconnectButton : function()
    {
        this._statusManager.setBusy();
        this.disconnect(); // Abstract method
    }
});

/*global ININ: true, Class: true, Element: true, alert: true, Event: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * WebServicesCallbackStatusPanel class 
 *  
 * Handles the logic of the panel in which the web user may view the status of a callback.  For the 
 * UI, @see CallbackStatusPanel. 
 */
ININ.Web.Chat.UI.WebServicesCallbackStatusPanel = Class.create(ININ.Web.Chat.UI.CallbackStatusPanel,
{
    /**
     * When a callback is created, this determines how 
     * long (in milliseconds) before its status is polled. 
     * After that, it is polled every SUBSEQUENT_POLL_INTERVAL milliseconds. 
     */
    INITIAL_POLL_INTERVAL : 1500,

    /**
     * This determines how often (in milliseconds) a Callback's 
     * status should be polled.  But, after one is initially created, 
     * the first poll is done after INITIAL_POLL_INTERVAL milliseconds.
     */
    SUBSEQUENT_POLL_INTERVAL : 10000,

    m_initialPollTimerId : null,

	/**
	 * Constructor
	 * 
     * @param callbackManager An instance of a subclass of ININ.Web.Chat.WebServices.CallbackManagerBase
	 * @param statusManager An instance of a class which implements ININ.Web.Chat.UI.Interfaces.IStatusManager
     */
    initialize : function($super, callbackManager, statusManager)
    {
        this._callbackManager = callbackManager;
        this._statusManager = statusManager;
        this._statusPollTimer = null;
        this._participantId = null;

        $super(statusManager);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotification);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackCreationNotificationObserver(this);

        if (this._isDisconnectSupported())
        {
            this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotificationObserver);
            this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectFailureNotificationObserver);
            ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackDisconnectNotificationObserver(this);
            ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackDisconnectFailureNotificationObserver(this);
        }

        if (this._isReconnectSupported())
        {
            this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectNotification);
            ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackReconnectNotificationObserver(this);
        }

        if (this._isStatusSupported())
        {
            this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotificationObserver);
            this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusFailureNotificationObserver);
            this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotificationObserver);
            ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackStatusNotificationObserver(this);
            ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackStatusFailureNotificationObserver(this);
            ININ.Web.Chat.WebServices.NotificationRegistry.registerPartyInfoNotificationObserver(this);
        }
    },

    /**
	 * destructor
	 */
    destroy : function()
    {
        this._destroyTimer();

        this._callbackManager = null;
    },

    // methods

    /**
     * Disconnects the callback.
     */
    disconnect : function()
    {
        if (!this._isDisconnectSupported())
        {
            throw ININ.Web.Common.ExceptionFactory.createException("WebServicesCallbackStatusPanel.disconnect(): Disconnect capability not supported by server!");
        }
        this._callbackManager.disconnect(this._participantId);
    },

    /**
     * Queries the status of the callback.
     */
    queryStatus : function()
    {
        if (!this._isStatusSupported())
        {
            throw ININ.Web.Common.ExceptionFactory.createException("WebServicesCallbackStatusPanel.queryStatus(): QueryStatus capability not supported by server!");
        }

        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.queryStatus()");
        try
        {
            this._callbackManager.queryStatus(this._participantId);
        }
        catch(e)
        {
            ININ.Web.Common.Debug.traceWarning("WebServicesCallbackStatusPanel._doInitialStatusQuery(): Caught exception: " + e);
        }
        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.queryStatus()");
    },

    /**
     * This method is called when the recurring status poll timer fires. 
     * Do not call it directly. 
     * The status poll timer only runs when there is a callback to poll. 
     */
    onStatusPollTimer : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.onStatusPollTimer()");
        this.queryStatus();
        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.onStatusPollTimer()");
    },
    
    /**
     * Respond to notification that a Callback was created successfully.
     * 
     * @param callbackCreationNotification An implementation of ICallbackCreationNotification
     */
    processCallbackCreationNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.processCallbackCreationNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotification);

        this._participantId = notification.get_participantId();
        // Wait a bit before polling its status, so that ACD can start to route it.
        var _self = this;
        m_initialPollTimerId = window.setTimeout(_self._doInitialStatusQuery.bind(_self), this.INITIAL_POLL_INTERVAL);
        this.showCallbackCreationSuccessPanel();
        this.showDisconnectButtonPanel();
        var participantName = notification.get_participantName();
        var telephone = notification.get_telephone();
        var subject = notification.get_subject() || notification.get_callbackId();
        var creationDateTime = notification.get_creationDateTime();
        this.showCallbackParameters(participantName, telephone, subject, creationDateTime);

        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.processCallbackCreationNotification()");
    },

    /**
     * Respond to notification that a Callback has been disconnected
     * @param notification An implementation of ICallbackDisconnectNotification
     */
    processCallbackDisconnectNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.processCallbackDisconnectNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotification);

        if (m_initialPollTimerId)
        {
            // If the callback was canceled within INITIAL_POLL_INTERVAL milliseconds of creation,
            // there is still a pending call to _doInitialStatusQuery() which must be stopped.
            window.clearTimeout(m_initialPollTimerId);
        }

        var participantId = notification.get_participantId();
        if (participantId == this._participantId)
        {
            this._destroyTimer();
            this.reset();
            this._participantId = null;
        }

        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.processCallbackDisconnectNotification()");
    },

    /**
     * Respond to notification that a Callback was reconnected successfully.
     * 
     * @param callbackReconnectNotification An implementation of ICallbackReconnectNotification
     */
    processCallbackReconnectNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.processCallbackReconnectNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackReconnectNotification);

        this._participantId = notification.get_participantId();
        ININ.Web.Common.Debug.traceNote("WebServicesCallbackStatusPanel.processCallbackReconnectNotification(): participant ID changed to: " + this._participantId);
        m_initialPollTimerId = window.setTimeout(_self._doInitialStatusQuery.bind(_self), this.INITIAL_POLL_INTERVAL);
        this.showCallbackCreationSuccessPanel();
        this.showDisconnectButtonPanel();

        // TODO: Show participantName, telephone, subject, and creationDateTime?

        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.processCallbackReconnectNotification()");
    },

    /**
     * Respond to notification that an attempt to disconnect a Callback has failed
     * @param notification CallbackDisconnectFailureNotification
     */
    processCallbackDisconnectFailureNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.processCallbackDisconnectFailureNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectFailureNotification);
        ININ.Web.Common.Debug.traceError("WebServicesCallbackDisconnectPanel.processCallbackDisconnectFailureNotification() received error: " + notification.get_error().get_errorCode());

        this.showDisconnectFailurePanel();

        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.processCallbackDisconnectFailureNotification()");
    },

    /**
     * Respond to notification that a Callback's status has been received
     * @param notification CallbackStatusNotification
     */
    processCallbackStatusNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.processCallbackStatusNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusNotification);

        var webVisitorParticipantId = notification.get_participantId();
        if (webVisitorParticipantId == this._participantId)
        {
            var params = new Object();
            params.assignedAgentName = notification.get_assignedAgentName();
            params.interactionState = notification.get_interactionState();
            params.estimatedCallbackTime = notification.get_estimatedCallbackTime();
            params.queueWaitTime = notification.get_queueWaitTime();
            params.queuePosition = notification.get_queuePosition();
            params.queueName = notification.get_queueName();
            params.longestWaitTime = notification.get_longestWaitTime();
            params.interactionsWaitingCount = notification.get_interactionsWaitingCount();
            params.loggedInAgentsCount = notification.get_loggedInAgentsCount();
            params.availableAgentsCount = notification.get_availableAgentsCount();
            var indicator = notification.get_statusIndicator();

            this.showStatus(params);
            this.setStatusIndicator(indicator);
            this._alignTags('label', 'iwc-key');
        }
        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.processCallbackStatusNotification()");
    },

    /**
     * Respond to notification that an attempt to get a Callback's status has failed
     * @param notification CallbackStatusFailureNotification
     */
    processCallbackStatusFailureNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.processCallbackStatusFailureNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackStatusFailureNotification);

        ININ.Web.Common.Debug.traceError("WebServicesCallbackStatusPanel.processCallbackStatusFailureNotification() received error: " + notification.get_error().get_errorCode());

        if (this._participantId)
        {
            this.showStatusFailure();
        }
        // else there was a race condition between the status request and the callback being disconnected, so no need to show the status failure message.

        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.processCallbackStatusFailureNotification()");
    },

    /**
     * Respond to receipt of information (name, photo location) about a party involved in a Callback
     * 
     * @param notification 
     */
    processPartyInfoNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.processPartyInfoNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotification);

        if (notification.get_localParticipantId() == this._participantId)
        {
            var agentPhoto = notification.get_photo();
            if (agentPhoto)
            {
                this.showAgentPhoto(agentPhoto);
            }
            else
            {
                this.hideAgentPhoto();
            }
        }

        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.processPartyInfoNotification()");
    },

    /**
     * Called when the parent container is shown. 
     * Resumes status polling, if appropriate 
     */
    parentShown : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.parentShown()");
        if (this._statusPollTimer && !this._statusPollTimer.isRunning())
        {
            // The timer was stopped by a previous call to parentHidden()
            this._doInitialStatusQuery();
        }
        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.parentShown()");
    },

    /**
     * Called when the parent container is hidden. 
     * Stops status polling, if appropriate 
     */
    parentHidden : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel.parentHidden()");
        if (this._statusPollTimer && this._statusPollTimer.isRunning())
        {
            this._statusPollTimer.stop();
        }
        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel.parentHidden()");
    },

    // private methods

    /**
     * Query a callback's status, and start a recurring timer to do so again and again. 
     */
    _doInitialStatusQuery : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel._doInitialStatusQuery()");
        m_initialPollTimerId = null;
        if (this._isStatusSupported())
        {
            this._createAndStartTimer();

            this.queryStatus();
        }
        else
        {
            ININ.Web.Common.Debug.traceNote("WebServicesCallbackStatusPanel._doInitialStatusQuery(): QueryStatus capability not supported by server");
        }

        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel._doInitialStatusQuery()");
    },

    _createAndStartTimer : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel._createAndStartTimer()");
        if (this._isStatusSupported()) // Should be redundant since only called from within an identical if block
        {
            this._destroyTimer(); // If we were previously polling for a different callback's status, quit.
            var _self = this;
            this._statusPollTimer = new ININ.Web.Chat.WebServices.RecurringTimer(this.SUBSEQUENT_POLL_INTERVAL);
            this._statusPollTimer.registerSuccessListener(function() { _self.onStatusPollTimer(); });
            this._statusPollTimer.start();
        }
        else
        {
            ININ.Web.Common.Debug.traceNote("WebServicesCallbackStatusPanel._createAndStartTimer(): QueryStatus capability not supported by server");
        }
        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel._createAndStartTimer()");
    },

    _destroyTimer : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesCallbackStatusPanel._destroyTimer()");
        if(this._statusPollTimer)
        {
            if (this._statusPollTimer.isRunning())
            {
                this._statusPollTimer.stop();
            }
            this._statusPollTimer.destroy();
            delete this._statusPollTimer;
            this._statusPollTimer = null;
        }
        ININ.Web.Common.Debug.traceMethodExited("WebServicesCallbackStatusPanel._destroyTimer()");
    }
});

/*global ININ: true, Class: true, Option: true, Element: true, debug: true, document: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * CallbackContainerPanel class 
 * This panel contains the panels in which the user creates Callbacks and manages previously-created Callbacks.
 */
ININ.Web.Chat.UI.CallbackContainerPanel = Class.create(ININ.Web.Chat.UI.Control,
{
    /**
	 * constructor 
	 *  
     * @param callbackManager An instance of a subclass of ININ.Web.Chat.WebServices.CallbackManagerBase 
	 * @param statusManager An instance of a class which implements ININ.Web.Chat.UI.Interfaces.IStatusManager
	 * @param registerFormContainer The Panel that contains the registration form.  Must have a showRegisterForm() method.
     * @param callbackParameters An instance of CallbackParameters
	 * @param requiredFields Optional parameter.  An array of FormFieldTypes, indicating which fields are required on the callback request form.
	 */
    initialize : function($super, callbackManager, statusManager, registerFormContainer, callbackParameters, requiredFields)
    {
        this._callbackManager = callbackManager;
        this._statusManager = statusManager;
        this._formPanelClass = 'iwc-callback-management-form-panel';

        var domObject = this._buildDomObject(statusManager, registerFormContainer, callbackParameters, requiredFields);
        this._validateDomObject();

        $super(domObject);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotification);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackCreationNotificationObserver(this);

        if (ININ.Web.Chat.WebServices.CapabilityRepository.isDisconnectCallbackCapabilityEnabled())
        {
            this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotificationObserver);
            ININ.Web.Chat.WebServices.NotificationRegistry.registerCallbackDisconnectNotificationObserver(this);
        }
    },

    /**
	 * destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.UI.Control.prototype.destroy.call(this);
    },

    // methods

	/**
     * Determines which form field should get focus when the overall form does. 
	 */
    focus : function()
    {
        if (this._loginFormPanel && this._loginFormPanel.isVisible())
        {
            this._loginFormPanel.focus();
        }
        else if (this._statusPanel && this._statusPanel.isVisible())
        {
            this._statusPanel.focus();
        }
    },


	/**
	 * Clears the fields of the panel.
	 */
    reset : function()
    {
        if (this._loginFormPanel && this._loginFormPanel.isVisible())
        {
            this._loginFormPanel.reset();
        }
        else if (this._statusPanel && this._statusPanel.isVisible())
        {
            this._statusPanel.reset();
        }
    },

	/**
     * Extends Control.show() to tell status panel to resume polling if necessary
	 */
    show : function()
    {
        ININ.Web.Chat.UI.Control.prototype.show.call(this);
        if (this._statusPanel)
        {
            this._statusPanel.parentShown();
        }
    },

	/**
     * Extends Control.hide() to tell status panel to pause polling if necessary
	 */
    hide : function()
    {
        ININ.Web.Chat.UI.Control.prototype.hide.call(this);
        if (this._statusPanel)
        {
            this._statusPanel.parentHidden();
        }
    },

    /**
     * Respond to notification that a Callback was created successfully.
     * 
     * @param callbackCreationNotification Contents ignored, may possibly be used in the future.
     */
    processCallbackCreationNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackCreationNotification);
        this._loginFormPanel.hide();
        this._statusPanel.show();
        this._statusManager.clearStatus();
        this._statusPanel.focus();
        this._loginFormPanel.reset();
    },

    /**
     * Respond to notification that a Callback has been disconnected
     * @param notification CallbackDisconnectNotification
     */
    processCallbackDisconnectNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.ICallbackDisconnectNotification);
        this._statusPanel.hide();
        this._loginFormPanel.show();
        this._loginFormPanel.focus();
        this._statusPanel.reset();
    },

    // private methods

    _buildDomObject : function(statusManager, registerFormContainer, callbackParameters, requiredFields)
    {
        this._panelContainerDiv = this.createElement('div', null, {'class': this._formPanelClass}, { 'display': 'none' });
        this._addPanels(statusManager, registerFormContainer, callbackParameters, requiredFields);
        return this._panelContainerDiv;
    },

    _addPanels : function(statusManager, registerFormContainer, callbackParameters, requiredFields)
    {
        var panel = new ININ.Web.Chat.UI.CallbackLoginFormPanel(this._callbackManager, statusManager, registerFormContainer, callbackParameters, requiredFields);
        this._panelContainerDiv.appendChild(panel.get_domObject());
        this._loginFormPanel = panel;

        // Note: depending on which capabilities are enabled, this panel may contain nothing more
        // than the message that the Callback was created successfully.
        var panel = new ININ.Web.Chat.UI.WebServicesCallbackStatusPanel(this._callbackManager, this._statusManager);
        this._panelContainerDiv.appendChild(panel.get_domObject());
        this._statusPanel = panel;
    },

    _validateDomObject : function()
    {
        if(!this._statusPanel)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("CallbackContainerPanel not built properly!");
        }
    }
});

/*global ININ: true, Class: true, Option: true, Element: true, debug: true, document: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * ChatLoginFormPanel class 
 * Implements the panel in which the user types their name (and perhaps password) to begin a chat.
 */
ININ.Web.Chat.UI.ChatLoginFormPanel = Class.create(ININ.Web.Chat.UI.LoginFormPanelBase,
{
    /**
	 * constructor 
	 *  
	 * @param chatManager An instance of a subclass of ININ.Web.Chat.WebServices.ChatManagerBase
	 * @param statusManager An instance of a class which implements ININ.Web.Chat.UI.Interfaces.IStatusManager
     * @param registerFormContainer The Panel that contains the registration form.  Must have 
     * @param chatParameters An instance of ChatParameters
	 * @param requiredFields An array of FormFieldTypes, indicating which fields are required on this form. Optional.
	 */
    initialize : function($super, chatManager, statusManager, registerFormContainer, chatParameters, requiredFields)
    {
        var allowedAccessTypes = this.AUTHENTICATION_NONE;
        if (ININ.Web.Chat.WebServices.CapabilityRepository.isChatTrackerAuthenticationCapabilityEnabled())
        {
            allowedAccessTypes |= this.AUTHENTICATION_TRACKER;
        }
        if (ININ.Web.Chat.WebServices.CapabilityRepository.isChatAnonymousAuthenticationCapabilityEnabled())
        {
            allowedAccessTypes |= this.AUTHENTICATION_ANONYMOUS;
        }
        $super(statusManager, registerFormContainer, ININ.Web.Common.Resources.LocalizedStrings.get("StartChatButton"), 'iwc-chat-form-panel', allowedAccessTypes, requiredFields);

        this._chatParameters = chatParameters;
        this._chatManager = chatManager;

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCreationFailureNotification);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCreationFailureNotificationObserver(this);
    },
    
    /**
	 * destructor
	 */
    destroy : function()
    {
        this._chatManager = null;

        ININ.Web.Chat.UI.LoginFormPanelBase.prototype.destroy.call(this);
    },

    // methods

    /**
     * Gets a list of fields which the user is required to fill in. 
     *  
     * @return An array of FormFieldTypes 
     */
    getRequiredFields : function()
    {
        return [ININ.Web.Chat.UI.FormFieldTypes.Name, ININ.Web.Chat.UI.FormFieldTypes.Username,
                ININ.Web.Chat.UI.FormFieldTypes.Password];
    },

	/**
	 * Clears the fields of the login form.
	 */
    reset : function()
    {
        ININ.Web.Chat.UI.LoginFormPanelBase.prototype.reset.call(this);
        this._statusManager.clearBusy();
    },

    /**
     * Respond to notification that an attempt to create a Chat has failed. 
     * 
     * @param chatCreationFailureNotification Contains an error indicating the reason for the failure.
	 * @see _createChat() 
	 * @see ChatManager.login() 
     */
    processChatCreationFailureNotification : function(chatCreationFailureNotification)
    {
        this._statusManager.clearBusy();
        var error = chatCreationFailureNotification.get_error();
        var text = ININ.Web.Chat.UI.ErrorDisplayTextBuilder.build(error, ININ.Web.Common.Resources.LocalizedStrings.get("LoginFailed"));
        this._statusManager.setErrorStatus(text);
    },

    // private methods

	/**
	 * Called when the user clicks the "Start Chat" button. 
	 * Performs field validation, then passes control to _createChat(). 
	 */
    _onClickSubmitButton : function()
    {
        this._statusManager.clearStatus();
        
        var additionalErrorTextArray = [];
        
        var name = this._getValueIfAvailable(this._anonymousIdentifierTextBox);
        var username = this._getValueIfAvailable(this._authenticatedIdentifierTextBox);
        var password = this._getValueIfAvailable(this._authenticatedCredentialsTextBox);

        var numErrors = 0;
        if(this._isAuthenticatedRadioClicked())
        {
            numErrors += this._validateField(username, this._authenticatedIdentifierTextBox, ININ.Web.Chat.UI.FormFieldTypes.Username);
            numErrors += this._validateField(password, this._authenticatedCredentialsTextBox, ININ.Web.Chat.UI.FormFieldTypes.Password);
        }

        // if errors are present, show the status and return
        if(numErrors > 0)
        {
            var errorText;

            if(numErrors == 1)
            {
                errorText = ININ.Web.Common.Resources.LocalizedStrings.get("OneErrorWithChatData");
            }
            else
            {
                errorText = ININ.Web.Common.Resources.LocalizedStrings.get("MultipleErrorsWithChatData").replace('%0', numErrors);
            }

            for(var i = 0; i < additionalErrorTextArray.length; ++i)
            {
                errorText += '<br />';
                errorText += additionalErrorTextArray[i];
            }

            this._statusManager.setErrorStatus(errorText);
        }
        else
        {
            if(this._isAuthenticatedRadioClicked())
            {
                this._chatParameters.set_participantName(username);
                this._chatParameters.set_participantCredentials(password);
                this._createChat();
            }
            else
            {
                if(!name)
                {
                    name = ININ.Web.Common.Resources.LocalizedStrings.get("AnonymousUser");
                }
                this._chatParameters.set_participantName(name);
                this._chatParameters.set_participantCredentials(null);

                this._createChat();
            }
        }
    },

	/**
	 * Begins a chat. 
	 */
    _createChat : function()
    {
        try
        {
            this._statusManager.setBusy();
            this._chatManager.login(this._chatParameters);
        }
        catch(ex)
        {
            this._statusManager.clearBusy();
            ININ.Web.Common.Debug.traceError("Caught unhandled exception:\n" + ex);
            ININ.Web.Common.Debug.alert("Caught unhandled exception:\n" + ex);
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(ex, "ChatLoginFormPanel._createChat()");
        }
    }
});

/*global ININ: true, Class: true, Option: true, Element: true, debug: true, document: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * RegistrationFormPanel class 
 * This is the panel that is shown when the user clicks "Register New Account".  It allows them 
 * to create an account within tracker, that may then be used to create authenticated chats and/or callbacks. 
 *  
 * Do not instantiate this class directly.  Use 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.create_instance(ININ.Web.Chat.WebServices.CustomizableFactoryTypes.RegistrationFormPanel, args) 
 * args shall be a JSON object with the following properties:
 * registrationManager: An instance of a class derived from RegistrationManagerBase.
 * statusManager: An implementation of the IStatusManager interface, such as FormContainerPanel.
 * registerFormContainer: The Panel that contains this registration form.  Must have a showRegisterForm() method.
 * registrationCallback: The function to call once the registration attempt is complete (if it succeeds).  May be null.
 * form: An existing form to add the registration formfields to.  May be null, in which case a new form will be created.
 */
ININ.Web.Chat.UI._Internal._DefaultRegistrationFormPanel = Class.create(ININ.Web.Chat.UI.FormPanelBase,
{
	/**
	 * Constructor
	 * 
	 * @param registrationManager An instance of a class derived from RegistrationManagerBase.
	 * @param statusManager An implementation of the IStatusManager interface, such as FormContainerPanel.
	 * @param registerFormContainer The Panel that contains this registration form.  Must have a showRegisterForm() method.
	 * @param registrationCallback The function to call once the registration attempt is complete (if it succeeds).  May be null.
	 * @param form An existing form to add the registration formfields to.  May be null, in which case a new form will be created.
	 */
    initialize : function($super, registrationManager, statusManager, registerFormContainer, registrationCallback, form)
    {
        if(form)
        {
            this._form = form;
        }
        else
        {
            this._form = this.createDefaultForm();
        }

        $super(statusManager, registerFormContainer, ININ.Web.Common.Resources.LocalizedStrings.get("Register"), 'iwc-register-form-panel');

        this._registrationManager = registrationManager;
        this._externalRegistrationCallback = registrationCallback;
    },
   
	/**
	 * Destructor
	 */
    destroy : function()
    {
        this._registrationManager = null;

        ININ.Web.Chat.UI.LoginFormPanelBase.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Called when this form receives focus.  Simply delegates focus to the top field in the form.
	 */
    focus : function()
    {
        // username textbox should always be here, but just in case
        if(this._authenticatedIdentifierTextBox)
        {
            this._authenticatedIdentifierTextBox.focus();
        }
        this._alignTags("label");
    },

	/**
	 * Resets the form to its original state.
	 */
    reset : function()
    {
        this._clearTextboxIfAvailable(this._authenticatedIdentifierTextBox);
        this._clearTextboxIfAvailable(this._authenticatedCredentialsTextBox);
        this._clearTextboxIfAvailable(this._confirmPasswordTextBox);
        this._clearTextboxIfAvailable(this._firstNameTextBox);
        this._clearTextboxIfAvailable(this._middleNameTextBox);
        this._clearTextboxIfAvailable(this._lastNameTextBox);
        this._clearTextboxIfAvailable(this._departmentTextBox);
        this._clearTextboxIfAvailable(this._companyTextBox);
        this._clearTextboxIfAvailable(this._jobTitleTextBox);
        this._clearTextboxIfAvailable(this._assistantNameTextBox);
        this._clearTextboxIfAvailable(this._homeStreetAddressTextBox);
        this._clearTextboxIfAvailable(this._homeCityTextBox);
        this._clearTextboxIfAvailable(this._homeStateTextBox);
        this._clearTextboxIfAvailable(this._homePostalCodeTextBox);
        this._clearTextboxIfAvailable(this._homeCountryTextBox);
        this._clearTextboxIfAvailable(this._homeEmailTextBox);
        this._clearTextboxIfAvailable(this._homePhoneTextBox);
        this._clearTextboxIfAvailable(this._homePhone2TextBox);
        this._clearTextboxIfAvailable(this._homeFaxTextBox);
        this._clearTextboxIfAvailable(this._homePagerTextBox);
        this._clearTextboxIfAvailable(this._homeMobileTextBox);
        this._clearTextboxIfAvailable(this._homeUrlTextBox);
        this._clearTextboxIfAvailable(this._businessStreetAddressTextBox);
        this._clearTextboxIfAvailable(this._businessCityTextBox);
        this._clearTextboxIfAvailable(this._businessStateTextBox);
        this._clearTextboxIfAvailable(this._businessPostalCodeTextBox);
        this._clearTextboxIfAvailable(this._businessCountryTextBox);
        this._clearTextboxIfAvailable(this._businessEmailTextBox);
        this._clearTextboxIfAvailable(this._businessPhoneTextBox);
        this._clearTextboxIfAvailable(this._businessPhone2TextBox);
        this._clearTextboxIfAvailable(this._businessFaxTextBox);
        this._clearTextboxIfAvailable(this._businessPagerTextBox);
        this._clearTextboxIfAvailable(this._businessMobileTextBox);
        this._clearTextboxIfAvailable(this._businessUrlTextBox);
        this._clearTextboxIfAvailable(this._assistantPhoneTextBox);
        this._clearTextboxIfAvailable(this._remarksTextBox);
        this._statusManager.clearBusy();
    },

    createDefaultForm : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("RegistrationFormPanel.createDefaultForm()");
        var section = new ININ.Web.Chat.UI.FormSection(ININ.Web.Common.Resources.LocalizedStrings.get("Account"))
                            .addFieldByFieldType(ININ.Web.Chat.UI.FormFieldTypes.Username)
                            .addFieldByFieldType(ININ.Web.Chat.UI.FormFieldTypes.Password)
                            .addFieldByFieldType(ININ.Web.Chat.UI.FormFieldTypes.ConfirmPassword);
        frm = new ININ.Web.Chat.UI.Form([section]);

        ININ.Web.Common.Debug.traceMethodExited("RegistrationFormPanel.createDefaultForm()");
        return frm;
    },

    /**
     * Gets a list of fields which the user is required to fill in. 
     *  
     * @return An array of FormFieldTypes 
     */
    getRequiredFields : function()
    {
        return [ININ.Web.Chat.UI.FormFieldTypes.Username, ININ.Web.Chat.UI.FormFieldTypes.Password,
                ININ.Web.Chat.UI.FormFieldTypes.ConfirmPassword];
    },

	// private methods

    _buildDomObject : function()
    {
        var div = this.createElement('div', null, {'class': 'iwc-form-panel ' + this._formPanelClass}, { 'display': 'none' });
        var formObject = this.createChildElement(div, 'form', null, {'class': 'iwc-registration-form', 'action': '#'});
        formObject.onsubmit = function() { return false; }

        var sections = this._form.get_sections();
        for(var i = 0; i < sections.length; ++i)
        {
            var section = sections[i];
            if(section.get_name())
            {
                formObject.appendChild(this._buildSectionHeader(section.get_name()));
            }

            var sectionFields = section.get_fields();
            if(sectionFields)
            {
                for(var j = 0; j < sectionFields.length; ++j)
                {
                    var field = sectionFields[j];
                    formObject.appendChild(this._buildFieldDiv(field));
                }
            }
        }

        formObject.appendChild(this._buildButtonPanel());

        return div;
    },

    _buildSectionHeader : function(text)
    {
        var div = this.createElement('div', null, {'class': 'iwc-form-section-header'});
        this.createChildElement(div, 'span', null, null, null, text);
        return div;
    },

    _buildFieldDiv : function(field)
    {
        var type = field.get_type();

        if(type == ININ.Web.Chat.UI.FormFieldTypes.Username) { return this._buildUserNameFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.Password) { return this._buildPasswordFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.ConfirmPassword) { return this._buildConfirmPasswordFieldDiv(); }
        
        if(type == ININ.Web.Chat.UI.FormFieldTypes.FirstName) { return this._buildFirstNameFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.MiddleName) { return this._buildMiddleNameFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.LastName) { return this._buildLastNameFieldDiv(); }
        
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomeStreetAddress) { return this._buildHomeStreetAddressFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomeCity) { return this._buildHomeCityFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomeState) { return this._buildHomeStateFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomePostalCode) { return this._buildHomePostalCodeFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomeCountry) { return this._buildHomeCountryFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomeEmail) { return this._buildHomeEmailFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomePhone) { return this._buildHomePhoneFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomePhone2) { return this._buildHomePhone2FieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomeFax) { return this._buildHomeFaxFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomePager) { return this._buildHomePagerFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomeMobile) { return this._buildHomeMobileFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.HomeUrl) { return this._buildHomeUrlFieldDiv(); }
        
        if(type == ININ.Web.Chat.UI.FormFieldTypes.Department) { return this._buildDepartmentFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.Company) { return this._buildCompanyFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.JobTitle) { return this._buildJobTitleFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.AssistantName) { return this._buildAssistantNameFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.AssistantPhone) { return this._buildAssistantPhoneFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessStreetAddress) { return this._buildBusinessStreetAddressFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessCity) { return this._buildBusinessCityFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessState) { return this._buildBusinessStateFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessPostalCode) { return this._buildBusinessPostalCodeFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessCountry) { return this._buildBusinessCountryFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessEmail) { return this._buildBusinessEmailFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessPhone) { return this._buildBusinessPhoneFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessPhone2) { return this._buildBusinessPhone2FieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessFax) { return this._buildBusinessFaxFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessPager) { return this._buildBusinessPagerFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessMobile) { return this._buildBusinessMobileFieldDiv(); }
        if(type == ININ.Web.Chat.UI.FormFieldTypes.BusinessUrl) { return this._buildBusinessUrlFieldDiv(); }

        if(type == ININ.Web.Chat.UI.FormFieldTypes.Remarks) { return this._buildRemarksFieldDiv(); }

        throw ININ.Web.Common.ExceptionFactory.createException(field + ' (type=' + type + ') is not a known field');
    },

    _buildUserNameFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('UserNameLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_usernameMaximumLength());
        this._authenticatedIdentifierTextBox = results.textBox;
        return results.div;
    },

    _buildPasswordFieldDiv : function()
    {
        var results = this._buildLabeledPasswordTextBoxFieldDiv('PasswordLabel');
        this._authenticatedCredentialsTextBox = results.textBox;
        return results.div;
    },

    _buildConfirmPasswordFieldDiv : function()
    {
        var results = this._buildLabeledPasswordTextBoxFieldDiv('ConfirmPasswordLabel');
        this._confirmPasswordTextBox = results.textBox;
        return results.div;
    },

    _buildFirstNameFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('firstNameLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_firstNameMaximumLength());
        this._firstNameTextBox = results.textBox;
        return results.div;
    },

    _buildMiddleNameFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('middleNameLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_middleNameMaximumLength());
        this._middleNameTextBox = results.textBox;
        return results.div;
    },

    _buildLastNameFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('lastNameLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_lastNameMaximumLength());
        this._lastNameTextBox = results.textBox;
        return results.div;
    },

    _buildDepartmentFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('departmentLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_departmentMaximumLength());
        this._departmentTextBox = results.textBox;
        return results.div;
    },

    _buildCompanyFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('companyLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_companyMaximumLength());
        this._companyTextBox = results.textBox;
        return results.div;
    },

    _buildJobTitleFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('jobTitleLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_jobTitleMaximumLength());
        this._jobTitleTextBox = results.textBox;
        return results.div;
    },

    _buildAssistantNameFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('assistantNameLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_nameMaximumLength());
        this._assistantNameTextBox = results.textBox;
        return results.div;
    },

    _buildHomeStreetAddressFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homeStreetAddressLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_addressMaximumLength());
        this._homeStreetAddressTextBox = results.textBox;
        return results.div;
    },

    _buildHomeCityFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homeCityLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_cityMaximumLength());
        this._homeCityTextBox = results.textBox;
        return results.div;
    },

    _buildHomeStateFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homeStateLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_stateMaximumLength());
        this._homeStateTextBox = results.textBox;
        return results.div;
    },

    _buildHomePostalCodeFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homePostalCodeLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_postalCodeMaximumLength());
        this._homePostalCodeTextBox = results.textBox;
        return results.div;
    },

    _buildHomeCountryFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homeCountryLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_countryMaximumLength());
        this._homeCountryTextBox = results.textBox;
        return results.div;
    },

    _buildHomeEmailFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homeEmailLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_emailMaximumLength());
        this._homeEmailTextBox = results.textBox;
        return results.div;
    },

    _buildHomePhoneFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homePhoneLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._homePhoneTextBox = results.textBox;
        return results.div;
    },

    _buildHomePhone2FieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homePhone2Label', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._homePhone2TextBox = results.textBox;
        return results.div;
    },

    _buildHomeFaxFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homeFaxLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._homeFaxTextBox = results.textBox;
        return results.div;
    },

    _buildHomePagerFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homePagerLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._homePagerTextBox = results.textBox;
        return results.div;
    },

    _buildHomeMobileFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homeMobileLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._homeMobileTextBox = results.textBox;
        return results.div;
    },

    _buildHomeUrlFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('homeUrlLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_urlMaximumLength());
        this._homeUrlTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessStreetAddressFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessStreetAddressLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_addressMaximumLength());
        this._businessStreetAddressTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessCityFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessCityLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_cityMaximumLength());
        this._businessCityTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessStateFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessStateLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_stateMaximumLength());
        this._businessStateTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessPostalCodeFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessPostalCodeLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_postalCodeMaximumLength());
        this._businessPostalCodeTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessCountryFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessCountryLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_countryMaximumLength());
        this._businessCountryTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessEmailFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessEmailLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_emailMaximumLength());
        this._businessEmailTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessPhoneFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessPhoneLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._businessPhoneTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessPhone2FieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessPhone2Label', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._businessPhone2TextBox = results.textBox;
        return results.div;
    },

    _buildBusinessFaxFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessFaxLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._businessFaxTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessPagerFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessPagerLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._businessPagerTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessMobileFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessMobileLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._businessMobileTextBox = results.textBox;
        return results.div;
    },

    _buildBusinessUrlFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('businessUrlLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_urlMaximumLength());
        this._businessUrlTextBox = results.textBox;
        return results.div;
    },

    _buildAssistantPhoneFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('assistantPhoneLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_telephoneMaximumLength());
        this._assistantPhoneTextBox = results.textBox;
        return results.div;
    },

    _buildRemarksFieldDiv : function()
    {
        var results = this._buildLabeledTextBoxFieldDiv('remarksLabel', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_remarksMaximumLength());
        this._remarksTextBox = results.textBox;
        return results.div;
    },

    _buildLabeledPasswordTextBoxFieldDiv : function(labelId)
    {
        return this._buildLabeledInputFieldDiv(labelId, 'password', ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths).get_passwordMaximumLength());
    },

    _buildLabeledTextBoxFieldDiv : function(labelId, maxLength)
    {
        return this._buildLabeledInputFieldDiv(labelId, 'text', maxLength);
    },

    _buildLabeledInputFieldDiv : function(labelId, inputType, maxLength)
    {
        var div = this.createElement('div', null, {'class': 'iwc-form-field-div'});
        this.createChildElement(div, 'label', null, { 'class': 'iwc-label'}, null, ININ.Web.Common.Resources.LocalizedStrings.get(labelId));
        textBox = this.createChildElement(div, 'input', null, { 'type': inputType, 'class': 'iwc-textbox', 'maxlength': maxLength});
        this._addErrorDiv(div);

        return { textBox: textBox, div: div };
    },

    _onClickSubmitButton : function()
    {
        this._statusManager.clearStatus();
        
        var additionalErrorTextArray = [];
        
        var username = this._getValueIfAvailable(this._authenticatedIdentifierTextBox);
        var password = this._getValueIfAvailable(this._authenticatedCredentialsTextBox);
        var confirmPassword = this._getValueIfAvailable(this._confirmPasswordTextBox);
        var firstName = this._getValueIfAvailable(this._firstNameTextBox);
        var middleName = this._getValueIfAvailable(this._middleNameTextBox);
        var lastName = this._getValueIfAvailable(this._lastNameTextBox);
        var department = this._getValueIfAvailable(this._departmentTextBox);
        var company = this._getValueIfAvailable(this._companyTextBox);
        var jobTitle = this._getValueIfAvailable(this._jobTitleTextBox);
        var assistantName = this._getValueIfAvailable(this._assistantNameTextBox);
        var homeStreetAddress = this._getValueIfAvailable(this._homeStreetAddressTextBox);
        var homeCity = this._getValueIfAvailable(this._homeCityTextBox);
        var homeState = this._getValueIfAvailable(this._homeStateTextBox);
        var homePostalCode = this._getValueIfAvailable(this._homePostalCodeTextBox);
        var homeCountry = this._getValueIfAvailable(this._homeCountryTextBox);
        var homeEmail = this._getValueIfAvailable(this._homeEmailTextBox);
        var homePhone = this._getValueIfAvailable(this._homePhoneTextBox);
        var homePhone2 = this._getValueIfAvailable(this._homePhone2TextBox);
        var homeFax = this._getValueIfAvailable(this._homeFaxTextBox);
        var homePager = this._getValueIfAvailable(this._homePagerTextBox);
        var homeMobile = this._getValueIfAvailable(this._homeMobileTextBox);
        var homeUrl = this._getValueIfAvailable(this._homeUrlTextBox);
        var businessStreetAddress = this._getValueIfAvailable(this._businessStreetAddressTextBox);
        var businessCity = this._getValueIfAvailable(this._businessCityTextBox);
        var businessState = this._getValueIfAvailable(this._businessStateTextBox);
        var businessPostalCode = this._getValueIfAvailable(this._businessPostalCodeTextBox);
        var businessCountry = this._getValueIfAvailable(this._businessCountryTextBox);
        var businessEmail = this._getValueIfAvailable(this._businessEmailTextBox);
        var businessPhone = this._getValueIfAvailable(this._businessPhoneTextBox);
        var businessPhone2 = this._getValueIfAvailable(this._businessPhone2TextBox);
        var businessFax = this._getValueIfAvailable(this._businessFaxTextBox);
        var businessPager = this._getValueIfAvailable(this._businessPagerTextBox);
        var businessMobile = this._getValueIfAvailable(this._businessMobileTextBox);
        var businessUrl = this._getValueIfAvailable(this._businessUrlTextBox);
        var assistantPhone = this._getValueIfAvailable(this._assistantPhoneTextBox);
        var remarks = this._getValueIfAvailable(this._remarksTextBox);

        var numErrors = 0;
        numErrors += this._validateField(username, this._authenticatedIdentifierTextBox, ININ.Web.Chat.UI.FormFieldTypes.Username);
        // validate password and confirm password fields separately below
        numErrors += this._validateField(firstName, this._firstNameTextBox, ININ.Web.Chat.UI.FormFieldTypes.FirstName);
        numErrors += this._validateField(middleName, this._middleNameTextBox, ININ.Web.Chat.UI.FormFieldTypes.MiddleName);
        numErrors += this._validateField(lastName, this._lastNameTextBox, ININ.Web.Chat.UI.FormFieldTypes.LastName);
        numErrors += this._validateField(homeStreetAddress, this._homeStreetAddressTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomeStreetAddress);
        numErrors += this._validateField(homeCity, this._homeCityTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomeCity);
        numErrors += this._validateField(homeState, this._homeStateTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomeState);
        numErrors += this._validateField(homePostalCode, this._homePostalCodeTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomePostalCode);
        numErrors += this._validateField(homeCountry, this._homeCountryTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomeCountry);
        numErrors += this._validateField(homeEmail, this._homeEmailTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomeEmail);
        numErrors += this._validateField(homePhone, this._homePhoneTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomePhone);
        numErrors += this._validateField(homePhone2, this._homePhone2TextBox, ININ.Web.Chat.UI.FormFieldTypes.HomePhone2);
        numErrors += this._validateField(homeFax, this._homeFaxTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomeFax);
        numErrors += this._validateField(homePager, this._homePagerTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomePager);
        numErrors += this._validateField(homeMobile, this._homeMobileTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomeMobile);
        numErrors += this._validateField(homeUrl, this._homeUrlTextBox, ININ.Web.Chat.UI.FormFieldTypes.HomeUrl);
        numErrors += this._validateField(department, this._departmentTextBox, ININ.Web.Chat.UI.FormFieldTypes.Department);
        numErrors += this._validateField(company, this._companyTextBox, ININ.Web.Chat.UI.FormFieldTypes.Company);
        numErrors += this._validateField(jobTitle, this._jobTitleTextBox, ININ.Web.Chat.UI.FormFieldTypes.JobTitle);
        numErrors += this._validateField(assistantName, this._assistantNameTextBox, ININ.Web.Chat.UI.FormFieldTypes.AssistantName);
        numErrors += this._validateField(assistantPhone, this._assistantPhoneTextBox, ININ.Web.Chat.UI.FormFieldTypes.AssistantPhone);
        numErrors += this._validateField(businessStreetAddress, this._businessStreetAddressTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessStreetAddress);
        numErrors += this._validateField(businessCity, this._businessCityTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessCity);
        numErrors += this._validateField(businessState, this._businessStateTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessState);
        numErrors += this._validateField(businessPostalCode, this._businessPostalCodeTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessPostalCode);
        numErrors += this._validateField(businessCountry, this._businessCountryTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessCountry);
        numErrors += this._validateField(businessEmail, this._businessEmailTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessEmail);
        numErrors += this._validateField(businessPhone, this._businessPhoneTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessPhone);
        numErrors += this._validateField(businessPhone2, this._businessPhone2TextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessPhone2);
        numErrors += this._validateField(businessFax, this._businessFaxTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessFax);
        numErrors += this._validateField(businessPager, this._businessPagerTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessPager);
        numErrors += this._validateField(businessMobile, this._businessMobileTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessMobile);
        numErrors += this._validateField(businessUrl, this._businessUrlTextBox, ININ.Web.Chat.UI.FormFieldTypes.BusinessUrl);
        numErrors += this._validateField(remarks, this._remarksTextBox, ININ.Web.Chat.UI.FormFieldTypes.Remarks);

        // need to manually check the password and confirm password if confirm password is there
        if(this._authenticatedCredentialsTextBox && this._confirmPasswordTextBox)
        {
            if(password != confirmPassword)
            {
                ++numErrors;

                this._showFieldError(this._authenticatedCredentialsTextBox, ININ.Web.Common.Resources.LocalizedStrings.get("PasswordsDoNotMatch"));
                this._showFieldError(this._confirmPasswordTextBox, ININ.Web.Common.Resources.LocalizedStrings.get("PasswordsDoNotMatch"));
            }
            else
            {
                numErrors += this._validateField(password, this._authenticatedCredentialsTextBox, ININ.Web.Chat.UI.FormFieldTypes.Password);
                numErrors += this._validateField(confirmPassword, this._confirmPasswordTextBox, ININ.Web.Chat.UI.FormFieldTypes.ConfirmPassword);
            }
        }
        else
        {
            numErrors += this._validateField(password, this._authenticatedCredentialsTextBox, ININ.Web.Chat.UI.FormFieldTypes.Password);
            numErrors += this._validateField(confirmPassword, this._confirmPasswordTextBox, ININ.Web.Chat.UI.FormFieldTypes.ConfirmPassword);
        }

        // if errors are present, show the status and return
        if(numErrors > 0)
        {
            var errorText;

            if(numErrors == 1)
            {
                errorText = ININ.Web.Common.Resources.LocalizedStrings.get("OneErrorWithRegistrationData");
            }
            else
            {
                errorText = ININ.Web.Common.Resources.LocalizedStrings.get("MultipleErrorsWithRegistrationData").replace('%0', numErrors);
            }

            for(var i = 0; i < additionalErrorTextArray.length; ++i)
            {
                errorText += '<br />';
                errorText += additionalErrorTextArray[i];
            }

            this._statusManager.setErrorStatus(errorText);
        }
        else
        {
            this._register(username, password,
                           firstName, middleName, lastName,
                           homeStreetAddress, homeCity, homeState, homePostalCode, homeCountry,
                           homeEmail, homePhone, homePhone2, homeFax, homePager, homeMobile, homeUrl,
                           department, company, jobTitle,
                           assistantName, assistantPhone, 
                           businessStreetAddress, businessCity, businessState, businessPostalCode, businessCountry,
                           businessEmail, businessPhone, businessPhone2, businessFax, businessPager, businessMobile, businessUrl,
                           remarks);
            this.reset();
        }
    },

    _register : function(webLogin, webPassword,
                         firstName, middleName, lastName,
                         homeStreetAddress, homeCity, homeState, homePostalCode, homeCountry,
                         homeEmail, homePhone, homePhone2, homeFax, homePager, homeMobile, homeUrl,
                         department, company, jobTitle,
                         assistantName, assistantPhone,
                         businessStreetAddress, businessCity, businessState, businessPostalCode, businessCountry,
                         businessEmail, businessPhone, businessPhone2, businessFax, businessPager, businessMobile, businessUrl,
                         remarks)
    {
        try
        {
            this._statusManager.setBusy();
            this._registrationManager.register(webLogin, webPassword,
                                       firstName, middleName, lastName,
                                       homeStreetAddress, homeCity, homeState, homePostalCode, homeCountry,
                                       homeEmail, homePhone, homePhone2, homeFax, homePager, homeMobile, homeUrl,
                                       department, company, jobTitle,
                                       assistantName, assistantPhone,
                                       businessStreetAddress, businessCity, businessState, businessPostalCode, businessCountry,
                                       businessEmail, businessPhone, businessPhone2, businessFax, businessPager, businessMobile,
                                       businessUrl, remarks,
                                       this._registerCallback.bind(this));
        }
        catch(ex)
        {
            this._statusManager.clearBusy();
            ININ.Web.Common.Debug.traceError("Caught unhandled exception:\n" + ex);
            ININ.Web.Common.Debug.alert("Caught unhandled exception:\n" + ex);
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(ex, "RegistrationFormPanel._register()");
        }
    },

    _registerCallback : function(success, error)
    {
        this._statusManager.clearBusy();
        if(success)
        {
            this._statusManager.setStatus(ININ.Web.Common.Resources.LocalizedStrings.get("RegistrationSucceeded"), true);

            if(this._externalRegistrationCallback)
            {
                this._externalRegistrationCallback();
            }
        }
        else
        {
            var text = ININ.Web.Chat.UI.ErrorDisplayTextBuilder.build(error, ININ.Web.Common.Resources.LocalizedStrings.get("RegistrationFailed"));
            this._statusManager.setErrorStatus(text);
        }
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI.PageModes");

/**
 * PageModes enums
 * These represent the types of interactions that may be handled by this web application, i.e. which 
 * interaction types' GUIs should be displayed. 
 * @see the pageMode param of ININ.Web.Chat.UI.Page.load() 
 */
ININ.Web.Chat.UI.PageModes.CHAT = 1;
ININ.Web.Chat.UI.PageModes.CALLBACK = 2;
// Future interaction types shall be 4, 8, 16, etc. so that they may be logically ORed together.

ININ.Web.Chat.UI.PageModes.CHAT_AND_CALLBACK = ININ.Web.Chat.UI.PageModes.CHAT + ININ.Web.Chat.UI.PageModes.CALLBACK;

/*global ININ: true, Class: true, Option: true, Element: true, debug: true, document: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * FormContainerPanel class 
 * This is the base panel which contains the chat login form, callback login form, and registration form.
 */
ININ.Web.Chat.UI.FormContainerPanel = Class.create(ININ.Web.Chat.UI.Control,
{
	/**
	 * Constructor
	 *  
     * @param chatManager A ChatManagerBase subclass 
     * @param callbackManager A CallbackManagerBase subclass 
     * @param registrationManager A RegistrationManagerBase subclass 
     * @param pageMode Bitfield.  See ININ.Web.Chat.UI.PageModes. 
     * @param chatParameters An instance of ChatParameters
     * @param callbackParameters An instance of CallbackParameters
	 */
    initialize:function($super, chatManager, callbackManager, registrationManager, pageMode, chatParameters, callbackParameters)
    {
        var numArgs = 7;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("FormContainerPanel constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }
        
        this._chatManager = chatManager;
        this._callbackManager = callbackManager;
        this._registrationManager = registrationManager;
        this._pageMode = pageMode;
        this._chatParameters = chatParameters;
        this._callbackParameters = callbackParameters;
        
        // for debugging only
        var domain = ININ.Web.Common.Utilities.getQueryStringValue("domain");
        if(domain)
        {
            ININ.Web.Chat.WebServices.Servers.Domain = domain;
        }

        // for debugging only
        var useHttps = ININ.Web.Common.Utilities.getQueryStringValue("https");
        if(useHttps)
        {
            ININ.Web.Chat.WebServices.Servers.UseHttps = (useHttps == "1");
        }

        this._selectedPanel = null;
        this._chatPanel = null;
        this._callbackCreationPanel = null;
        this._registerPanel = null;

        var domObject = this._buildDomObject();
        this._validateDomObject();
        
        $super(domObject);

        this.addImplementedInterface(ININ.Web.Chat.UI.Interfaces.IStatusManager);
    },
    
    constructUI : function()
    {
        this._containerDiv.appendChild(this._buildOuterTable());
        this._addBusyImage();
        this._addPanels();
        this._selectedPanel.focus();
    },

    /**
	 * destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.UI.Control.prototype.destroy.call(this);
    },

    // Public methods

	/**
	 * Called when focus is given to the panel.  Simply gives focus to whichever subpanel is active.
	 */
    focus : function()
    {
        if(this._selectedPanel)
        {
            this._selectedPanel.focus();
        }
    },

	/**
	 * Resets the panel to the state which it was in prior to any activity taking place.
	 */
    reset : function()
    {
        this.clearStatus();

        if(this._chatPanel)
        {
            this._chatPanel.reset();
        }
        if(this._callbackCreationPanel)
        {
            this._callbackCreationPanel.reset();
        }
        if(this._registerPanel)
        {
            this._registerPanel.reset();
        }

        ININ.Web.Chat.UI.Page.reset();
    },

	/**
	 * Returns true if the panel allows chats, false otherwise.
	 */
    isChatPageMode : function()
    {
        return (this._pageMode & ININ.Web.Chat.UI.PageModes.CHAT);
    },

	/**
	 * Returns true if the panel allows callbacks, false otherwise.
	 */
    isCallbackPageMode : function()
    {
        return (this._pageMode & ININ.Web.Chat.UI.PageModes.CALLBACK);
    },

	/**
	 * Removes any status messages (e.g. "There were 2 errors with the chat information"), if present. 
	 * Note that status messages apply to an entire form.  Messages which apply to only a particular form field 
	 * are known as form field errors. 
	 */
    clearStatus : function(status)
    {
        this.setStatus("");
        Element.removeClassName(this._statusDiv, 'iwc-status-success');
        Element.removeClassName(this._statusDiv, 'iwc-status-error');
    },

	/**
	 * Sets a status message, and displays it using the iwc-status-error CSS class 
	 *  
	 * @param status The text to display in the status area
	 */
    setErrorStatus : function(status)
    {
        Element.removeClassName(this._statusDiv, 'iwc-status-success');

        this.setStatus(status);
        Element.addClassName(this._statusDiv, 'iwc-status-error');
    },

	/**
	 * Sets a status message.  Optionally shows an icon indicating success. 
	 *  
	 * @param status The text to display in the status area 
	 * @param showCheckImage If true, an icon indicating success will be displayed. 
	 */
    setStatus : function(status, showCheckImage)
    {
        Element.removeClassName(this._statusDiv, 'iwc-status-error');

        if(showCheckImage)
        {
            Element.addClassName(this._statusDiv, 'iwc-status-success');
        }
        else
        {
            Element.removeClassName(this._statusDiv, 'iwc-status-success');
        }

        if(!status)
        {
            this._statusSpan.innerHTML = "";
            Element.hide(this._statusRow);
        }
        else
        {
            this._statusSpan.innerHTML = status;
            Element.show(this._statusRow);
        }
    },

    /**
     * Shows the busy indicator
     */
    setBusy : function()
    {
        Element.show(this._busyImage);
    },

    /**
     * Hides the busy indicator
     */
    clearBusy : function()
    {
        Element.hide(this._busyImage);
    },

	/**
	 * Given a DOM element identifying a hyperlink, this method will disable that link. 
	 *  
	 * @param link A DOM element identifying a hyperlink 
	 */
    disableLink : function(link)
    {
        if(link)
        {
            Element.addClassName(link, 'iwc-link-disabled');
            Element.writeAttribute(link, 'enabled', 'false');
        }
    },

	/**
	 * Given a DOM element identifying a hyperlink, this method will enable that link. 
	 *  
	 * @param link A DOM element identifying a hyperlink 
	 */
    enableLink : function(link)
    {
        if(link)
        {
            Element.removeClassName(link, 'iwc-link-disabled');
            Element.writeAttribute(link, 'enabled', 'true');
        }
    },

	/**
	 * Causes the registration form to be displayed.
	 */
    showRegisterForm : function()
    {
        this._onClickRegisterTab();
    },

	// Private methods

    _buildOuterTable : function()
    {
        var table = this.createElement('table', null, { 'class': 'iwc-outer-table' });
        var tbody = this.createChildElement(table, 'tbody');

        // variables to reuse throughout construction
        var tr;
        var td;

        // first row
        tr = this.createChildElement(tbody, 'tr');
        td = this.createChildElement(tr, 'td');
        td.appendChild(this._buildTabsDiv());

        // second row
        tr = this.createChildElement(tbody, 'tr');
        td = this.createChildElement(tr, 'td');
        this._panelContainerDiv = this.createChildElement(td, 'div');

        // fourth row
        this._statusRow = this.createChildElement(tbody, 'tr');
        td = this.createChildElement(this._statusRow, 'td');
        this._statusDiv = this.createChildElement(td, 'div', null, { 'class': 'iwc-status' });
        this.createChildElement(this._statusDiv, 'img', null, { 'src': 'img/error.png', 'status-type': 'error' });
        this.createChildElement(this._statusDiv, 'img', null, { 'src': 'img/check.png', 'status-type': 'success'  });
        this._statusSpan = this.createChildElement(this._statusDiv, 'span');

        return table;
    },

    _buildTabsDiv : function()
    {
        var div = this.createElement('div', null, {'class': 'iwc-form-button-div'});
        this._panelTabsUl = this.createChildElement(div, 'ul', null, {'class': 'iwc-form-tabs'});
        return div;
    },

    _isChatSupported : function()
    {
        var tabVisibility = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility);
        if (tabVisibility.hideStartChatTab())
        {
            return false;
        }

        if (!(ININ.Web.Chat.WebServices.CapabilityRepository.isStartChatCapabilityEnabled() && this.isChatPageMode()))
        {
            return false;
        }

        var authChat = ININ.Web.Chat.WebServices.CapabilityRepository.isChatTrackerAuthenticationCapabilityEnabled();
        var anonChat = ININ.Web.Chat.WebServices.CapabilityRepository.isChatAnonymousAuthenticationCapabilityEnabled();

        return authChat || anonChat;
    },

    _isCallbackCreationSupported : function()
    {
        var tabVisibility = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility);
        if (tabVisibility.hideStartCallbackTab())
        {
            return false;
        }

        if (!(ININ.Web.Chat.WebServices.CapabilityRepository.isCreateCallbackCapabilityEnabled() && this.isCallbackPageMode()))
        {
            return false;
        }

        var authCallback = ININ.Web.Chat.WebServices.CapabilityRepository.isCallbackTrackerAuthenticationCapabilityEnabled();
        var anonCallback = ININ.Web.Chat.WebServices.CapabilityRepository.isCallbackAnonymousAuthenticationCapabilityEnabled();

        return authCallback || anonCallback;
    },

    _isRegisterSupported : function()
    {
        var tabVisibility = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility);
        if (tabVisibility.hideRegisterNewAccountTab())
        {
            return false;
        }

        return ININ.Web.Chat.WebServices.CapabilityRepository.isTrackerRegistrationCapabilityEnabled();
    },

    _onClickChatTab : function(event)
    {
        this.clearStatus();

        this._setTabAsSelected(this._chatTab);
        this._setTabAsUnselected(this._callbackCreationTab);
        this._setTabAsUnselected(this._registerTab);

        this._showPanel(this._chatPanel, true);
        this._showPanel(this._callbackCreationPanel, false);
        this._showPanel(this._registerPanel, false);

        this._chatPanel.focus();

        // Prevent propagation of the event, so that the browser does not actually try to navigate to '#', i.e. scroll the page to the top.
        if (event)
        {
            event.stop();
        }
    },

    _onClickCallbackTab : function(event)
    {
        this.clearStatus();

        this._setTabAsUnselected(this._chatTab);
        this._setTabAsSelected(this._callbackCreationTab);
        this._setTabAsUnselected(this._registerTab);

        this._showPanel(this._chatPanel, false);
        this._showPanel(this._callbackCreationPanel, true);
        this._showPanel(this._registerPanel, false);

        this._callbackCreationPanel.focus();

        // Prevent propagation of the event, so that the browser does not actually try to navigate to '#', i.e. scroll the page to the top.
        if (event)
        {
            event.stop();
        }
    },

    _onClickRegisterTab : function(event)
    {
        this.clearStatus();

        this._setTabAsUnselected(this._chatTab);
        this._setTabAsUnselected(this._callbackCreationTab);
        this._setTabAsSelected(this._registerTab);

        this._showPanel(this._chatPanel, false);
        this._showPanel(this._callbackCreationPanel, false);
        this._showPanel(this._registerPanel, true);

        this._registerPanel.focus();

        // Prevent propagation of the event, so that the browser does not actually try to navigate to '#', i.e. scroll the page to the top.
        if (event)
        {
            event.stop();
        }
    },

    _setTabAsSelected : function(tab)
    {
        Element.addClassName(tab, 'iwc-selected-tab');
        Element.removeClassName(tab, 'iwc-unselected-tab');
    },

    _setTabAsUnselected : function(tab)
    {
        Element.addClassName(tab, 'iwc-unselected-tab');
        Element.removeClassName(tab, 'iwc-selected-tab');
    },

    _addBusyImage : function()
    {
        this._busyImage = this.createChildElement(this._containerDiv, 'img', null, {'class': 'iwc-busy-image', 'src': 'img/spinner.gif'}, {'display': 'none'} );
    },

    _addPanels : function()
    {
        if(this._isChatSupported())
        {
            var panel = new ININ.Web.Chat.UI.ChatLoginFormPanel(this._chatManager, this, this, this._chatParameters, null);
            this._panelContainerDiv.appendChild(panel.get_domObject());
            this._selectPanelIfNoneAreSelected(panel);
            this._chatPanel = panel;
        }

        if(this._isCallbackCreationSupported())
        {
            var panel = new ININ.Web.Chat.UI.CallbackContainerPanel(this._callbackManager, this, this, this._callbackParameters, null);
            this._panelContainerDiv.appendChild(panel.get_domObject());
            this._selectPanelIfNoneAreSelected(panel);
            this._callbackCreationPanel = panel;
        }

        if(this._isRegisterSupported())
        {
            var args = { "registrationManager" : this._registrationManager, "statusManager" : this, "registerFormContainer" : this, "registrationCallback" : null, "form" : null };
            var panel = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.create_instance(ININ.Web.Chat.WebServices.CustomizableFactoryTypes.RegistrationFormPanel, args);
            this._panelContainerDiv.appendChild(panel.get_domObject());
            this._selectPanelIfNoneAreSelected(panel);
            this._registerPanel = panel;
        }

        this._addTabs();
    },

    _selectPanelIfNoneAreSelected : function(panel)
    {
        if(!this._selectedPanel)
        {
            this._showPanel(panel);
        }
    },

    _addTabs : function()
    {
        var ul = this._panelTabsUl;

        var isFirstTab = true;
        if(this._isChatSupported())
        {
            var className = this._getTabClassName(isFirstTab);
            isFirstTab = false;

            this._chatTab = this.createChildElement(ul, 'li', null, {'class': className});
            var a = this.createChildElement(this._chatTab, 'a', null, {'href': '#'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("StartChatTab"));

            Element.observe(a, 'click', this._onClickChatTab.bindAsEventListener(this));
        }

        if(this._isCallbackCreationSupported())
        {
            var className = this._getTabClassName(isFirstTab);
            isFirstTab = false;

            this._callbackCreationTab = this.createChildElement(ul, 'li', null, {'class': className});
            var a = this.createChildElement(this._callbackCreationTab, 'a', null, {'href': '#'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("StartCallbackTab"));

            Element.observe(a, 'click', this._onClickCallbackTab.bindAsEventListener(this));
        }

        if(this._isRegisterSupported())
        {
            var className = this._getTabClassName(isFirstTab);
            isFirstTab = false;

            this._registerTab = this.createChildElement(ul, 'li', null, {'class': className});
            var a = this.createChildElement(this._registerTab, 'a', null, {'href': '#'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("RegisterNewAccountTab"));

            Element.observe(a, 'click', this._onClickRegisterTab.bindAsEventListener(this));
        }
    },

    _getTabClassName : function(isSelectedTab)
    {
        if(isSelectedTab)
        {
            return 'iwc-selected-tab';
        }

        return 'iwc-unselected-tab';
    },

    _buildDomObject : function()
    {
        var div = this.createElement('div', null, { 'class': 'iwc-login-container' });
        this.createChildElement(div, 'h1', null, { 'class': 'iwc-page-header' }, null, ININ.Web.Common.Resources.LocalizedStrings.get("LoginContainerHeaderText"));
        div.appendChild(this._buildInnerDiv());
        this.createChildElement(div, 'div', null, { 'class': 'iwc-disclaimer' }, null, ININ.Web.Common.Resources.LocalizedStrings.get("Disclaimer"));
        return div;
    },

    _buildInnerDiv : function()
    {
        this._containerDiv = document.createElement('div');
        return this._containerDiv;
    },

    _validateDomObject : function()
    {
        if(!this._containerDiv)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Container div not found");
        }
    },

    _showPanel : function(panel, show)
    {
        if(panel)
        {
            show = (show != false);

            if(show)
            {
                panel.show();
                this._selectedPanel = panel;
            }
            else
            {
                panel.hide();
            }
        }
    }
});

/*global ININ: true, Class: true, Option: true, $j: true, Element: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * MessagesPanel class 
 * This is the panel that displays the transcript of past messages in the chat.
 * This class handles only the UI functionality of the panel.  The logic functionality 
 * is implemented in WebServicesReceivedMessagesPanel. 
 */
ININ.Web.Chat.UI.MessagesPanel = Class.create(ININ.Web.Chat.UI.Control,
{
    // constants
    SENDER_DIV_CLASS: 'iwc-message-sender',

	/**
     * Constructor 
     *  
     * @param acceptHtml If true, HTML-formatted messages are allowed to be displayed.  If false, any HTML tags received will be displayed to the user, instead of rendered. 
	 */
    initialize : function($super, acceptHtml)
    {
        var numArgs = 2;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("MessagesPanel constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }
        
        this._linkifier = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.Linkifier);

        $super(this._buildDomObject());

        this._acceptHtml = acceptHtml;
        this.reset();
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.UI.Control.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * Adds a message to the panel, from the "System" as opposed to a human participant.
	 *  
	 * @param text The message to add
	 * @param time The timestamp to display beside the message
	 * @param timedOut If true, treat this message as though it was received late.  It will be displayed in a way that makes it obvious that it is out of order.
	 */
    addUnauthoredMessage : function(text, time, timedOut)
    {
        ININ.Web.Common.Debug.traceMethodEntered("MessagesPanel.addUnauthoredMessage()");
        var ret = this.addGenericMessage(text, "text/html", time, ININ.Web.Chat.WebServices.ParticipantRepository.get_systemParticipantId(), timedOut, true);
        ININ.Web.Common.Debug.traceMethodExited("MessagesPanel.addUnauthoredMessage()");
        return ret;
    },

	/**
     * Adds a message to the panel, that was typed by a human participant or handler, is not *just* a hyperlink, and is not 
     * a file transfer message.
	 * 
	 * @param text The message to add
     * @param contentType The mime type of the text.  Likely either "text/plain" or "text/html". 
	 * @param time The timestamp to display beside the message
	 * @param senderId The ID of whomever sent the message
	 * @param timedOut If true, treat this message as though it was received late.  It will be displayed in a way that makes it obvious that it is out of order.
	 */
    addAuthoredMessage : function(text, contentType, time, senderId, timedOut)
    {
        ININ.Web.Common.Debug.traceMethodEntered("MessagesPanel.addAuthoredMessage()");
        if (null != text && text.length > 0 && (("text/html" != contentType.toLowerCase()) || !this._acceptHtml))
        {
            // Received HTML & accept HTML: Render
            // Received HTML & do not accept HTML: Display tags
            // Received text & accept HTML: Display tags
            // Received text & do not accept HTML: Display tags
            text = ININ.Web.Chat.WebServices.Utilities.escapeHTML(text);
        }
        this.addGenericMessage(text, contentType, time, senderId, timedOut, false);
        ININ.Web.Common.Debug.traceMethodExited("MessagesPanel.addAuthoredMessage()");
    },

	/**
     * Adds a message to the panel. 
	 * 
	 * @param text The message to add
     * @param contentType The mime type of the text.  Likely either "text/plain" or "text/html". 
	 * @param time The timestamp to display beside the message
	 * @param senderId The ID of whomever sent the message
     * @param timedOut If true, treat this message as though it was received late.  It will be displayed in a way that makes it obvious that it is out of order. 
     * @param skipLinkifier If true, the Linkifier will not be used to turn URLs into hyperlinks.  Useful for messages that contain HTML which should be rendered for the user. 
	 */
    addGenericMessage : function(text, contentType, time, senderId, timedOut, skipLinkifier)
    {
        ININ.Web.Common.Debug.traceMethodEntered("MessagesPanel.addGenericMessage()");

        if(timedOut)
        {
            this.addUnauthoredMessage(ININ.Web.Common.Resources.LocalizedStrings.get('OutOfOrderMessage'), new Date());
            this._lastSenderId = null;
            this._lastUl = null;

            var lateMsg = this._addMessage(text, time, senderId, skipLinkifier);

            Element.addClassName(lateMsg, 'iwc-late-message');

            // reset state            
            this._lastSenderId = null;
            this._lastUl = null;
        }
        else
        {
            this._addMessage(text, time, senderId, skipLinkifier);
        }
        ININ.Web.Common.Debug.traceMethodExited("MessagesPanel.addGenericMessage()");
    },

	/**
	 * Adds a message to the panel where the message consists of only a hyperlink 
	 *  
	 * @param text The clickable text
	 * @param url The URL to display when the text is clicked
	 * @param time The timestamp to display beside the link
	 * @param senderId The ID of whomever sent the link
	 * @param timedOut If true, treat this link as though it was received late.  It will be displayed in a way that makes it obvious that it is out of order.
	 */
    addAuthoredLinkMessage : function(text, url, time, senderId, timedOut)
    {
        ININ.Web.Common.Debug.traceMethodEntered("MessagesPanel.addAuthoredLinkMessage()");

        if (text != url)
        {
            // Trust that caller knows what it's doing.
            var linkHtml = this._linkifier.createLink(url, text);
            // Since the <a> tag was just added above, tell addGenericMessage() to skip calling the linkifier.
            this.addGenericMessage(linkHtml, "text/html", time, senderId, timedOut, true);
        }
        else
        {
            // This may be something like "http://www.somewhere.com Try this link".
            // Don't simply wrap an <a> tag around it here - let the linkifier scan it
            // and put the tags in the appropriate places.
            this.addGenericMessage(text, "text/html", time, senderId, timedOut, false);
        }

        ININ.Web.Common.Debug.traceMethodExited("MessagesPanel.addAuthoredLinkMessage()");
    },

	/**
	 * Changes the name displayed for a group of messages
	 * 
	 * @param newName The new name to display
	 * @param senderId The id of chat participant who sent the messages to be affected
	 */
    changeMessageGroupsName : function(newName, senderId)
    {
        var liArray = this._getLIsWithSenderId(senderId);
        if(liArray && (liArray.length > 0))
        {
            for(var i = 0; i < liArray.length; ++i)
            {
                this._changeMessageGroupName(liArray[i], newName);
            }
        }
    },

	/**
	 * Resets this panel to its original state
	 */
    reset : function()
    {
        // initialize members
        this._lastSenderId = null;
        this._lastUl = null;
        this._lastTime = null;
        
        // remove all list items
        if (this._messagesUl.hasChildNodes())
        {
            while (this._messagesUl.childNodes.length >= 1)
            {
                this._messagesUl.removeChild(this._messagesUl.firstChild);
            } 
        }
    },

    // private methods

    _buildDomObject : function()
    {
        var messagesDiv = this.createElement('div', 'messagesPanel', { 'class': 'iwc-received-messages-panel' });
        this._messagesUl = this.createChildElement(messagesDiv, 'ul');
        return messagesDiv;
    },

    _buildSenderDiv : function(senderId)
    {
        return this.createElement('div', null, { 'class': this.SENDER_DIV_CLASS }, null, ININ.Web.Chat.WebServices.ParticipantDisplayNameFormatter.formatDisplayNameFromId(senderId));
    },

    _buildMessage : function(text, time, addDash, skipLinkifier)
    {
        var li = this.createElement('li', null, { 'class': 'iwc-message' });
        if(time)
        {
            var e = this._buildMessageTimeDiv(time);
            li.appendChild(e);
            
            if(!this._shouldFadeTimeElement(time))
            {
                Element.addClassName(e, 'iwc-message-time-faded');
            }
        }
        li.appendChild(this._buildMessageTextDiv(text, addDash, skipLinkifier));
        return li;
    },

    _shouldFadeTimeElement : function(time)
    {
        return !this._isSameMinute(this._lastTime, time);
    },

    _isSameMinute : function(time1, time2)
    {
        ININ.Web.Common.ParameterValidation.validate([time1, time2], [ {"type": Date}, {"type": Date} ]);
        
        if(!time1)
        {
            return false;
        }
        
        if(!time2)
        {
            return false;
        }
        
        return ((time1.getFullYear() == time2.getFullYear()) &&
                (time1.getMonth() == time2.getMonth()) &&
                (time1.getDate() == time2.getDate()) &&
                (time1.getHours() == time2.getHours()) &&
                (time1.getMinutes() == time2.getMinutes()));
    },

    _isSameDay : function(time1, time2)
    {
        ININ.Web.Common.ParameterValidation.validate([time1, time2], [ {"type": Date}, {"type": Date} ]);
        
        if(!time1)
        {
            return false;
        }
        
        if(!time2)
        {
            return false;
        }
        
        return ((time1.getFullYear() == time2.getFullYear()) &&
                (time1.getMonth() == time2.getMonth()) &&
                (time1.getDate() == time2.getDate()));
    },

    _buildMessageTextDiv : function(text, addDash, skipLinkifier)
    {
        if (!skipLinkifier)
        {
            text = this._linkifier.linkifyText(text);
        }

        // We want to turn plaintext newlines into HTML, so that the
        // web user can see line breaks included in sent messages.
        text = text.replace(/\r?\n/g, "<br />");
        var element = this.createElement('div', null, { 'class': 'iwc-message-text' }, null, text);
        if(addDash)
        {
            Element.addClassName(element, ((ININ.Web.Chat.WebServices.Utilities.isBrowserIE() && document.body.dir=='rtl') ? 'iwc-arrow-IE-fix' : 'iwc-arrow'));
        }
        return element;
    },

    _buildMessageTimeDiv : function(time)
    {
        var div = this.createElement('div', null, { 'class': 'iwc-message-time' }, null, ININ.Web.Chat.UI.DateTimeFormatter.formatTimeForDisplay(time, !this._isSameDay(this._lastTime, time)));
        $j(div).hide();

        return div;
    },

    _showHiddenMessage : function(message)
    {
        this._messagesUl.scrollTop = this._messagesUl.scrollHeight;
        $j(message).fadeIn("normal", this._onMessageShown.bind(this, message));
        this._messagesUl.scrollTop = this._messagesUl.scrollHeight;
    },

    _onMessageShown : function(liTag)
    {
        ININ.Web.Common.Debug.traceMethodEntered("MessagesPanel._onMessageShown()");
        /* Full HTML structure contains two li tags:
         * <ul> - List of all messages in the chat
         *   <li> - Container for one or more consecutive messages from the same party. CSS class may be: iwc-system-message-group, iwc-message-from-agent, or iwc-message-from-self.
         *     <div> - Container
         *       <div>Name of sender</div> (Not present for system text)
         *       <ul> - List of one or more consecutive messages from the same party
         *         <li> - A single message.  CSS class is iwc-message.
         *           <div></div> - The timestamp of a single message. CSS class is iwc-message-time.
         *           <div></div> - The text of a single message. CSS class is iwc-message-text.
         * Depending on whether the "if" or the "else" in _addMessage() was executed higher in the call stack, the liTag parameter may be either the inner or the outer li tag.
         * When a message is added that is from the same party as the previous message, the liTag parameter will be a newly-added inner li.
         * When a message is added that is from a different party as the previous message, the old inner ul is closed out, a new outer li is created, and the liTag parameter will be that new outer li. 
         */

        var innerLiTag = (liTag.hasClassName('iwc-message') ? liTag : Element.select(liTag, '.iwc-message').pop());
        var textDiv = Element.select(innerLiTag, '.iwc-message-text')[0];
        var timeDiv = Element.select(innerLiTag, '.iwc-message-time')[0];

        if (textDiv.offsetWidth + timeDiv.scrollWidth > innerLiTag.offsetWidth)
        {
            ININ.Web.Common.Debug.traceNote("MessagesPanel._onMessageShown(): Overflow.  Inserting space(s).");
            var longestWordLength = this._getLongestWordLength(textDiv.innerHTML);

            // Estimate how many characters will fit in innerLiTag, and subtract 5 just to be safe.
            var allowableWordLength = Math.floor((longestWordLength * (innerLiTag.offsetWidth - timeDiv.scrollWidth)) /
                                                 textDiv.offsetWidth) - 5;

            // Don't bother breaking words if the user has their browser ridiculously small
            if (allowableWordLength > 5)
            {
                textDiv.innerHTML = this._enforceMaximumWordLength(textDiv.innerHTML, allowableWordLength);
            }
        }
        ININ.Web.Common.Debug.traceMethodExited("MessagesPanel._onMessageShown()");
    },

    _getLongestWordLength : function(str)
    {
        var words = str.split(" ");

        //  Find longest word and get length of that.
        var longestWordLength = 0;
        for (var i=0; i<words.length; i++)
        {
            if (words[i].length > longestWordLength)
            {
                longestWordLength = words[i].length;
            }
        }
        return longestWordLength;
    },

    _enforceMaximumWordLength : function(str, allowableWordLength)
    {
        var contentWithSpacesAdded = "";

        var words = str.split(" ");
        for (var i=0; i<words.length; i++)
        {
            if (words[i].length <= allowableWordLength)
            {
                contentWithSpacesAdded += words[i];
            }
            else
            {
                for (var startIdx=0; startIdx<words[i].length; startIdx+=allowableWordLength)
                {
                    if (startIdx + allowableWordLength < words[i].length)
                    {
                        contentWithSpacesAdded += words[i].substr(startIdx, allowableWordLength) + ' ';
                    }
                    else
                    {
                        contentWithSpacesAdded += words[i].substr(startIdx);
                    }
                }
            }

            if (i != words.length-1)
            {
                contentWithSpacesAdded += ' ';
            }
        }
        return contentWithSpacesAdded;
    },

    _showHiddenTimeElement : function(message)
    {
        var timeElement = this._getTimeElement(message);
        if(timeElement)
        {
            $j(timeElement).slideDown("slow");
        }
    },

    _getTimeElement : function(message)
    {
        var timeElements = Element.select(message, '.iwc-message-time');
        if(timeElements && timeElements.length == 1)
        {
            return timeElements[0];
        }
        
        return null;
    },

    _addMessage : function(text, time, senderId, skipLinkifier)
    {
        ININ.Web.Common.Debug.traceMethodEntered("MessagesPanel._addMessage()");
        var newOuterElement;
        var message;    
        if(!this._lastSenderId || (this._lastSenderId != senderId))
        {
            var originalName = null;
            if(senderId != ININ.Web.Chat.WebServices.ParticipantRepository.get_systemParticipantId())
            {
                originalName = ININ.Web.Chat.WebServices.ParticipantDisplayNameFormatter.formatDisplayNameFromId(senderId);
            }

            var messageLi = this.createHiddenChildElement(this._messagesUl, 'li', null, {'senderId': senderId, 'originalName': originalName});
            if (senderId == ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId())
            {
                Element.addClassName(messageLi, 'iwc-message-from-self');
            }
            else if(senderId == ININ.Web.Chat.WebServices.ParticipantRepository.get_systemParticipantId())
            {
                Element.addClassName(messageLi, 'iwc-system-message-group');
            }
            else
            {
                Element.addClassName(messageLi, 'iwc-message-from-agent');
            }

            var wrapperDiv = this.createChildElement(messageLi, 'div');
            if(senderId != ININ.Web.Chat.WebServices.ParticipantRepository.get_systemParticipantId())
            {
                wrapperDiv.appendChild(this._buildSenderDiv(senderId));
            }

            var ul = this.createChildElement(wrapperDiv, 'ul');
            message = this._buildMessage(text, time, (senderId != ININ.Web.Chat.WebServices.ParticipantRepository.get_systemParticipantId()), skipLinkifier);
            ul.appendChild(message);
            this._showHiddenMessage(messageLi);
            
            // save the members
            this._lastSenderId = senderId;
            this._lastUl = ul;
            
            newOuterElement = messageLi;
        }
        else
        {
            message = this._buildMessage(text, time, (senderId != ININ.Web.Chat.WebServices.ParticipantRepository.get_systemParticipantId()), skipLinkifier);
            
            $j(message).hide();
            this._lastUl.appendChild(message);
            this._showHiddenMessage(message);
            
            newOuterElement = message;
        }

        // save this message's time stamp
        this._lastTime = time;
        
        this._showHiddenTimeElement(message);
        
        ININ.Web.Common.Debug.traceMethodExited("MessagesPanel._addMessage()");
        return newOuterElement;
    },

    _getLIsWithSenderId : function(senderId)
    {
        return Element.select(this._messagesUl, '[senderId="' + senderId + '"]');
    },

    _changeMessageGroupName : function(li, newName)
    {
        var originalName = this._getOriginalNameFromMessageGroupLi(li);
        if(originalName != newName)
        {
            var senderDiv = this._getSenderDivFromMessageGroupLi(li);
            if(senderDiv)
            {
                this._setNameOnSenderDiv(senderDiv, newName, originalName);
            }
        }
    },

    _getOriginalNameFromMessageGroupLi : function(li)
    {
        return Element.readAttribute(li, 'originalName');
    },

    _getSenderDivFromMessageGroupLi : function(li)
    {
        var divArray = Element.select(li, 'div[class="' + this.SENDER_DIV_CLASS + '"]');
        if(divArray && (divArray.length > 0))
        {
            return divArray[0];
        }
        
        return null;
    },

    _setNameOnSenderDiv : function(senderDiv, newName, originalName)
    {
        if(senderDiv)
        {
            senderDiv.innerHTML = newName + "<span style='margin-left:10px;color:#ccc'>(" + originalName + ")</span>";
        }
    }
});

/*global ININ: true, Class: true, Option: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * WebServicesReceivedMessagesPanel class 
 * This class handles the logic functionality of the panel that displays the transcript 
 * of past messages in the chat.  The UI functionality is implemented in MessagesPanel. 
 *  
 */
ININ.Web.Chat.UI.WebServicesReceivedMessagesPanel = Class.create(ININ.Web.Chat.UI.MessagesPanel,
{
	/**
     * Constructor 
     *  
     * @param acceptHtml If true, HTML-formatted messages are allowed to be displayed.  If false, any HTML tags received will be displayed to the user, instead of rendered. 
	 */
    initialize:function($super, acceptHtml)
    {
        var numArgs = 2;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("WebServicesReceivedMessagesPanel constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }
        
        $super(acceptHtml);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantVoicemailNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotificationObserver);

        this._isConnected = true;
        this._showMoreMessages = true;
		this._isFirstAttempt = true;
    },

    // public methods

	/**
	 * Implementation of IParticipantJoinedNotificationObserver 
	 * Currently does nothing - stubbed here for future enhancement. 
	 *  
	 * @param notification Something that implements of IParticipantJoinedNotification
	 */
    processParticipantJoinedNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotification);
    },

	/**
	 * Implementation of IParticipantLeftNotificationObserver 
	 * Adds a message to the panel indicating that the participant has left the chat. 
	 * 
	 * @param notification Something that implements IParticipantLeftNotification
	 */
    processParticipantLeftNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotification);

        if(this._showMoreMessages)
        {
            if(notification.get_participantId() == ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId())
            {
                this._addSystemMessage(ININ.Web.Common.Resources.LocalizedStrings.get("DisconnectedFromChat"), notification.get_dateTime(), notification.get_isTimedOut());
            }
        }
    },

	/**
	 * Implementation of IReceivedTextNotificationObserver 
	 * Adds the received message to the panel.
	 * 
	 * @param notification Something that implements IReceivedTextNotification
	 */
    processReceivedTextNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotification);

        if(this._showMoreMessages)
        {
            this.addAuthoredMessage(notification.get_messageText(), notification.get_contentType(), notification.get_dateTime(), notification.get_participantId(), notification.get_isTimedOut());
        }
    },

	/**
	 * Implementation of IReceivedUrlNotificationObserver 
	 * Adds the received URL to the panel.
	 * 
	 * @param notification Something that implements IReceivedUrlNotification
	 */
    processReceivedUrlNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotification);

        if(this._showMoreMessages)
        {
            this.addAuthoredLinkMessage(notification.get_messageUrl(), notification.get_messageUrl(), notification.get_dateTime(), notification.get_participantId(), notification.get_isTimedOut());
        }
    },

	/**
	 * Implementation of IReceivedFileNotificationObserver 
	 * Adds a link to the received file to the panel.
	 * 
	 * @param notification Something that implements IReceivedFileNotification
	 */
    processReceivedFileNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotification);

        if(this._showMoreMessages)
        {
            this.addAuthoredLinkMessage(this._getFileName(notification.get_messageRelativeUrl()), this._createFullUrl(notification.get_messageRelativeUrl()), notification.get_dateTime(), notification.get_participantId(), notification.get_isTimedOut());
        }
    },

	/**
	 * Implementation of IFailoverUINotificationObserver 
	 * Adds a message to the panel indicating there was an error connecting to the server. 
	 * 
	 * @param notification Something that implements IFailoverUINotification
	 */
    processFailoverUINotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotification);

        if(this._showMoreMessages)
        {
            if(this._isConnected)
            {
                this._isConnected = false;
            }
        }
    },

	/**
	 * Implementation of IResumedPollingNotificationObserver 
	 * Adds a message to the panel indicating successful resumption of polling
	 * 
	 * @param notification Something that implements IResumedPollingNotification
	 */
    processResumedPollingNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotification);

        if(this._showMoreMessages)
        {
            if(!this._isConnected)
            {
                this._isConnected = true;
				if(!this._isFirstAttempt)
				{
					this._addSystemMessage(ININ.Web.Common.Resources.LocalizedStrings.get("SuccessfullyReconnectedServer"), new Date(), false);
					this._isFirstAttempt = true; //reset the status
				}

            }
        }
    },

	/**
	 * Implementation of IChatReconnectFailureNotificationObserver 
	 * Adds a message to the panel indicating failure to reconnect a chat to the server
	 * 
	 * @param notification Something that implements IChatReconnectFailureNotification
	 */
    processChatReconnectFailureNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IChatReconnectFailureNotification);
/*
		this._isFirstAttempt = false;
        if(this._showMoreMessages)
        {
            this._addSystemMessage(ININ.Web.Common.Resources.LocalizedStrings.get("CouldNotConnectServerRetry"), new Date(), false);
        }
*/
    },

	/**
	 * Implementation of IRefreshPageNotificationObserver 
	 * Adds a message to the panel instructing the user to refresh the page to begin a new chat.
	 * 
	 * @param notification Something that implements IRefreshPageNotification
	 */
    processRefreshPageNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotification);

        if(this._showMoreMessages)
        {
            var url;

            if(notification.get_newUriFragment())
            {
                url = ININ.Web.Chat.WebServices.Utilities.appendQueryStringParameterToUrl(location.href, "server", notification.get_newUriFragment());
            }
            else
            {
                url = ININ.Web.Chat.WebServices.Utilities.removeEndingPoundCharacter(location.href);
            }

            var msg = ININ.Web.Common.Resources.LocalizedStrings.get("NeedPageRefresh_Format").replace("{0}", url);
            this._addSystemMessage(msg, new Date(), false);

            // if we got this notification, no matter what else we get, we can't act on it
            this._showMoreMessages = false;
        }
    },

	/**
	 * Implementation of IParticipantVoicemailNotificationObserver 
	 * Adds a message to the panel instructing the user to leave a message, since no agents are available.
	 * 
	 * @param notification Something that implements IParticipantVoicemailNotification
	 */
    processParticipantVoicemailNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantVoicemailNotification);

        if(this._showMoreMessages)
        {
            var text = ININ.Web.Common.Resources.LocalizedStrings.get("PleaseLeaveMessage").replace('%0', this._formatName(notification.get_participantId()));
            this._addSystemMessage(text, notification.get_dateTime(), notification.get_isTimedOut());
        }
    },

    // private methods

    _formatName : function(id, name)
    {
        if(!name)
        {
            var participant = ININ.Web.Chat.WebServices.ParticipantRepository.get_participant(id);
            if(participant)
            {
                name = participant.get_name();
            }
        }

        return ININ.Web.Chat.WebServices.ParticipantDisplayNameFormatter.formatDisplayNameFromIdAndName(id, name);
    },

    _getFileName : function(relativeUrl)
    {
        return ININ.Web.Chat.WebServices.Utilities.getFileNameFromUrl(relativeUrl);
    },

    _createFullUrl : function(relativeUrl)
    {
        return ININ.Web.Chat.WebServices.Servers.buildUrl(ININ.Web.Chat.WebServices.Servers.CurrentUriFragment, relativeUrl);
    },

    _addSystemMessage : function(text, dateTime, get_isTimedOut)
    {
        this.addUnauthoredMessage(text, dateTime, get_isTimedOut);
    }
});

/*global ININ: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI._Internal");

/**
 * (UI) LanguageCodeConverter class 
 * This extends ININ.Web.Chat.WebServices.LanguageCodeConverter (note the package name) to 
 * provide additional language code conversion functionality specific to the UI implementation. At this time, 
 * that includes only functionality pertaining to the CK Editor. 
 *  
 * Provides methods pertaining to the use of language codes (aka IETF Tags).  Examples of these tags are: 
 * en-US = English as spoken in the US 
 * en-GB = English as spoken in Great Britain 
 * de-CH = German as spoken in Switzerland 
 * ...etc. 
 *  
 * Note that generally the region portion of a language code is capitalized, but this is merely a convention, and 
 * this web application does not follow that convention. 
 *  
 * There is no need to instantiate this class - a singleton instance called ININ.Web.Chat.UI.LanguageCodeConverter is available. 
 */
ININ.Web.Chat.UI._Internal.LanguageCodeConverter = Class.create(ININ.Web.Chat.WebServices.LanguageCodeConverter, {
    /**
     * Constructor does nothing because all the functionality is essentially static
     */
    initialize : function() {
    },

    /**
     * Returns the language code which CKEditor expects, given a language code used by IC.
     * If CKEditor doesn't use the exact same language codes as IC, this is the place to convert them. 
     *  
     * @param languageCode The language code in use by IC. 
     */
    convertLanguageCodeToCKEditorLanguageCode : function(languageCode)
    {
        if (!languageCode)
        {
            return "en";
        }

        // All string comparisons below should be case-insensitive, so convert languageCode
        // to lower case.  Any future language codes or tokens that are added below should
        // be added in lower case!
        languageCode = languageCode.toLowerCase();

        var firstToken = this.getFirstToken(languageCode);

        if(firstToken == "af") return "af";
        if(firstToken == "ar") return "ar";
        if(firstToken == "bg") return "bg";
        if(firstToken == "bn") return "bn";
        if(firstToken == "bs") return "bs";
        if(firstToken == "ca") return "ca";
        if(firstToken == "cs") return "cs";
        if(firstToken == "da") return "da";
        if(firstToken == "de") return "de";
        if(firstToken == "el") return "el";
        if(languageCode == "en-au") return "en-au";
        if(languageCode == "en-ca") return "en-ca";
        if(languageCode == "en-uk") return "en-uk";
        if(firstToken == "en") return "en";
        if(firstToken == "eo") return "eo";
        if(firstToken == "es") return "es";
        if(firstToken == "et") return "et";
        if(firstToken == "eu") return "eu";
        if(firstToken == "fa") return "fa";
        if(firstToken == "fi") return "fi";
        if(firstToken == "fo") return "fo";
        if(languageCode == "fr-ca") return "fr-ca";
        if(firstToken == "fr") return "fr";
        if(firstToken == "gl") return "gl";
        if(firstToken == "gu") return "gu";
        if(firstToken == "he") return "he";
        if(firstToken == "hi") return "hi";
        if(firstToken == "hr") return "hr";
        if(firstToken == "hu") return "hu";
        if(firstToken == "is") return "is";
        if(firstToken == "it") return "it";
        if(firstToken == "ja") return "ja";
        if(firstToken == "km") return "km";
        if(firstToken == "ko") return "ko";
        if(firstToken == "lt") return "lt";
        if(firstToken == "lv") return "lv";
        if(firstToken == "mn") return "mn";
        if(firstToken == "ms") return "ms";
        if(firstToken == "nb") return "nb";
        if(firstToken == "nl") return "nl";
        if(firstToken == "no") return "no";
        if(firstToken == "pl") return "pl";
        if(languageCode == "pt-br") return "pt-br";
        if(firstToken == "pt") return "pt";
        if(firstToken == "ro") return "ro";
        if(firstToken == "ru") return "ru";
        if(firstToken == "sk") return "sk";
        if(firstToken == "sl") return "sl";
        if(languageCode == "sr-latn") return "sr-latn";
        if(firstToken == "sr") return "sr";
        if(firstToken == "sv") return "sv";
        if(firstToken == "th") return "th";
        if(firstToken == "tr") return "tr";
        if(firstToken == "uk") return "uk";
        if(firstToken == "vi") return "vi";
        if(languageCode == "zh-cn") return "zh-cn";
        if(firstToken == "zh") return "zh";

        return "en";
    },

    /**
     * Determines whether a language code represents a language that is read from right to left.
     * 
     * @param languageCode A language code 
     * @return true if the specified language is read from right to left, false if it is read from left to right. 
     */
    isRightToLeft : function(languageCode)
    {
        if (languageCode == null)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("LanguageCodeConverter.isRightToLeft(): No language code specified!");
        }

        return (languageCode.match(/^ar/i) ||
                languageCode.match(/^he/i) ||
                /* Languages listed below are not currently supported by ININ, but customers
                   may translate the resource file to these languages on their own. */
                languageCode.match(/^dv/i) || /* Divehi/Maldivian */
                languageCode.match(/^fa/i) || /* Persian */
                languageCode.match(/^ha/i) || /* Hausa */
                languageCode.match(/^ps/i) || /* Pashto */
                languageCode.match(/^ur/i) || /* Urdu */
                languageCode.match(/^yi/i));  /* Yiddish */
        /*
        Other RTL languages for which no ISO-639-1 language code is assigned:
        Mandekan, Assyrian, Modern Aramaic Koine, Syriac, Tamashek 
        */
    },

    currentLanguageIsRightToLeft : function()
    {
        var lang = Bootloader.getLocalizationLanguage();
        return (lang && this.isRightToLeft(lang));
    }
});
ININ.Web.Chat.UI.LanguageCodeConverter = new ININ.Web.Chat.UI._Internal.LanguageCodeConverter();

/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * ComposeMessagePanel class 
 *  
 * Handles the UI of the panel in which the web user may type messages to the agent.  For the 
 * logic, @see WebServicesComposeMessagePanel. 
 */
ININ.Web.Chat.UI.ComposeMessagePanel = Class.create(ININ.Web.Chat.UI.Control,
{
	/**
	 * Constructor
	 *  
     * @param useHtmlEditor If true, WYSIWYG controls will be displayed.  If false, only a plain text editor will be displayed.  Note that the WYSIWYG editor is not supported at this time. 
	 * @param languageCode  The code (i.e. fr-ca) that specifies which language the editor's tooltips, etc. should appear in.  Case-insensitive.
	 */
    initialize : function($super, useHtmlEditor, languageCode)
    {
        if((arguments.length < 1) || (arguments.length > 3))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ComposeMessagePanel constructor called with " + arguments.length + " arguments, but expected 1 - 3.");
        }
        
        // initialize members
        this._editor = null;
        this._useHtmlEditor = (useHtmlEditor === true);
        this._languageCode = languageCode;
        this._isSendingEnabled = true;

        $super(this._buildDomObject());
        this._validateDomObject();

        this._enableSendButton(false);

        this._attachHandlers();
    },
    
    /**
	 * destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.UI.Control.prototype.destroy.call(this);
    },

    // public methods

	/**
     * Returns true if WYSIWYG controls are/will be displayed.  Returns false if only a plain text editor is/will be displayed. 
     * Note that the WYSIWYG editor is not supported at this time. 
	 */
    get_useHtmlEditor : function()
    {
        return this._useHtmlEditor;
    },

	/**
	 * Enable or disable the panel. 
	 *  
	 * @param enabled If true, the panel will be enabled.  If false, the panel will be disabled.
	 */
    enable : function(enabled)
    {
        this._textBoxDomObject.disabled = !enabled;

        if (enabled)
        {
            this._enableSendButtonTimer.start();
        } else
        {
            this._enableSendButtonTimer.stop();
        }
        
        if(this._isMessageTextEmpty())
        {
            this._buttonDomObject.disabled = true;
        }
        else
        {
            this._buttonDomObject.disabled = !enabled;
        }
    },

	/**
	 * Resets the panel back to its original state.  Text will be cleared and the send button will be disabled.
	 */
    reset : function()
    {
        this._clearMessageText();
        this._enableSendButton(false);
    },

	/**
	 * Should be called when the panel receives focus.  Simply diverts focus to the text entry field within the panel.
	 */
    focus : function()
    {
        if(this._useHtmlEditor)
        {
            // TODO
        }
        else
        {
            this._textBoxDomObject.focus();
        }
    },

	/**
	 * Enable the panel to send text, or disable the panel from sending text. 
	 * If the parameter is true AND text is present in the text box, the send button will be enabled. 
	 * Otherwise the send button will be disabled. 
	 * 
	 * @param enable If true, sending will be enabled.  If false, sending will be disabled.
	 */
    enableSending : function(enable)
    {
        this._isSendingEnabled = enable;
        this._enableSendButton(!this._isMessageTextEmpty());
    },

    // private methods

    _attachHandlers : function()
    {
        Event.observe(this._buttonDomObject, 'click', this._onClickSendButton.bindAsEventListener(this));

        if(!this._useHtmlEditor)
        {
            Event.observe(this._textBoxDomObject, 'keyup', this._onKeyUpTextBox.bindAsEventListener(this));
        }

        this._enableSendButtonTimer = new ININ.Web.Chat.WebServices.RecurringTimer(300);
        var _self = this;
        this._enableSendButtonTimer.registerSuccessListener(function() { _self._onEnableSendButtonTimer(); });
    },

    _onEnableSendButtonTimer: function()
    {
        this._enableSendButton(!this._isMessageTextEmpty());
    },

    _onKeyUpTextBox : function(evt)
    {
        if(this._isEnterKey(evt))
        {
            if(!this._isMessageTextEmpty())
            {
                this._onClickSendButton();
            }
            else
            {
                this._clearMessageText();
            }
        }
    },

    _isEnterKey : function(evt)
    {
        if(this._useHtmlEditor)
        {
            return (!evt.data.$.shiftKey && (evt.data.getKey() == 13));
        }
        else
        {
            return !evt.shiftKey && (evt.keyCode == 13);
        }
    },
   
    _onClickSendButton : function()
    {
        if(this._isSendingEnabled)
        {
            var text = this._getMessageText();
            if(text)
            {
                this._clearMessageText();
                this._enableSendButton(false);
                this._sendMessage(text);
                this._focusEditTextBox();
            }
        }
    },
    
    _onMessageSendFailed : function(errorMessage, messageThatFailedToSend)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ComposeMessagePanel._onMessageSendFailed()");
        /*
        if (errorMessage)
        {
            // TODO: Make MainPanel implement IStatusManager and call setErrorStatus() on it. Also make _onClickSendButton() call that.clearStatus()
        }
        */

        if (messageThatFailedToSend)
        {
            this._setMessageText(messageThatFailedToSend);
        }

        this._enableSendButton(true);
        this._focusEditTextBox();
        ININ.Web.Common.Debug.traceMethodExited("ComposeMessagePanel._onMessageSendFailed()");
    },

    _sendMessage : function(text)
    {
        window.alert("Due to a programmatic error, this message can not be sent. A problem report will be created.\n" + text);
        ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport("Programmer error - abstract method not overridden. This code should be unreachable.", "ComposeMessagePanel._sendMessage()");
    },

    _enableSendButton : function(enabled)
    {
        if(!this._isSendingEnabled)
        {
            enabled = false;
        }

        this._buttonDomObject.disabled = !enabled;
    },

    _getMessageText : function()
    {
        var text = '';
        
        if(this._useHtmlEditor)
        {
            var editor = this._getEditor();
            if(editor)
            {
                text = editor.getData();
                text = this._cleanHtmlOutput(text);
            }
        }
        else
        {
            text = this._textBoxDomObject.value;
            text = this._cleanPlainTextOutput(text);
        }
        
        return text;
    },

    _cleanHtmlOutput : function(text)
    {
        var strippedText = text;

        var whitespaceArray = ['<p>\n\t&nbsp;</p>', '\n', '\r', '\t', '&nbsp;', '<p>', '</p>', '<div>', '</div>'];
        strippedText = this._removeAllPrefixes(strippedText, whitespaceArray);
        strippedText = this._removeAllSuffixes(strippedText, whitespaceArray);

        return strippedText;
    },

    _removeAllPrefixes : function(text, prefixArray)
    {
        var strippedText = text;

        var originalText = null;
        do
        {
            originalText = strippedText;
            strippedText = this._removePrefixes(originalText, prefixArray);
        }
        while(strippedText != originalText);

        return strippedText;  
    },

    _removePrefixes : function(text, prefixArray)
    {
        for(var i = 0; i < prefixArray.length; ++i)
        {
            text = this._removePrefix(text, prefixArray[i]);
        }
        
        return text;
    },

    _removePrefix : function(text, prefix)
    {
        if(text.length >= prefix.length)
        {
            if(text.substr(0, prefix.length) == prefix)
            {
                return text.substr(prefix.length, text.length - prefix.length);
            }
        }

        return text;
    },

    _removeAllSuffixes : function(text, suffixArray)
    {
        var strippedText = text;

        var originalText = null;
        do
        {
            originalText = strippedText;
            strippedText = this._removeSuffixes(originalText, suffixArray);
        }
        while(strippedText != originalText);
      
        return strippedText;  
    },

    _removeSuffixes : function(text, suffixArray)
    {
        for(var i = 0; i < suffixArray.length; ++i)
        {
            text = this._removeSuffix(text, suffixArray[i]);
        }
        
        return text;
    },

    _removeSuffix : function(text, suffix)
    {
        if(text.length >= suffix.length)
        {
            if(text.substr(text.length - suffix.length, suffix.length) == suffix)
            {
                return text.substr(0, text.length - suffix.length);
            }
        }

        return text;
    },

    _cleanPlainTextOutput : function(text)
    {
        if((text.length > 0) && (text[0] == '\n'))
        {
            text = text.substring(1);
        }
        return text;
    },

    _clearMessageText : function()
    {
        this._setMessageText('');
    },

    _setMessageText : function(text)
    {
        if(this._useHtmlEditor)
        {
            var editor = this._getEditor();
            if(editor)
            {
                this._setEditorText(text);
            }
        }
        else
        {
            this._textBoxDomObject.value = text;
        }
    },

    _setEditorText : function(text)
    {
        // this works, but it seems to undo the keyup handler and can't put it back
        // editor.setData(text);

        var iframe = window.frames[0];
        if(iframe.document)
        {
            var bodies = iframe.document.getElementsByTagName('body');
            if(bodies && bodies.length == 1)
            {
                var body = bodies[0];
                body.innerHTML = text;
            }
        }
    },

    _isMessageTextEmpty : function()
    {
        if (this._getMessageText().length === 0)
        {
            return true;
        }
        return this._getMessageText().strip().length === 0;
    },

    _getEditor : function()
    {
        return this._editor;
//        return CKEDITOR.instances['inputPanel'];
    },
    
    _focusEditTextBox : function()
    {
        if(this._useHtmlEditor)
        {
            this._getEditor().focus();
        }
        else
        {
            this._textBoxDomObject.focus();
        }
    },

    _validateDomObject : function()
    {
        if(!this._textBoxDomObject)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Text box row not found;");
        }
        
        if(!this._buttonDomObject)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Button not found;");
        }
    },

    _buildDomObject : function()
    {
        var domObject = this.createElement('div', null, { 'class': 'iwc-compose-message-panel', 'useHtmlEditor': (this._useHtmlEditor ? 'true' : 'false') });
        var formObject = this.createChildElement(domObject, 'form', null, {'class': 'iwc-compose-message-form', 'action': '#'});
        formObject.onsubmit = function() { return false; }
        this._textBoxDomObject = this.createChildElement(formObject, 'textarea', 'inputPanel', { 'class': 'iwc-input' });
        this._buttonDomObject = this.createChildElement(formObject, 'input', 'sendButton', { 'type': 'button', 'value': ININ.Web.Common.Resources.LocalizedStrings.get('Send'), 'class': 'iwc-send-button' });

        if(this._useHtmlEditor)
        {
            this._useCkEditor();
        }

        return domObject;
    },
    
    _useCkEditor : function()
    {
        var options = { skin : 'office2003',
                        width: '602px',
                        height: '60px',
                        toolbar :
                        [
                            [ 'FontSize', 'Bold', 'Italic', '-', 'TextColor', 'BGColor' ]
                        ]
                      };

        if(this._languageCode)
        {
            options.language = ININ.Web.Chat.UI.LanguageCodeConverter.convertLanguageCodeToCKEditorLanguageCode(this._languageCode);
        }

        this._editor = CKEDITOR.replace(this._textBoxDomObject, options);

        this._editor.config.resize_enabled = false;
        this._editor.config.toolbarCanCollapse = false;

        // even though the document is supposed to be loaded, we still need to give CKEditor a little extra time
        // before attaching handlers
        this._setCKActionsTimeout();
    },

    _setCKActionsTimeout : function()
    {
        window.setTimeout(this._postTimeoutCKActions.bindAsEventListener(this), 1000);
    },

    _postTimeoutCKActions : function()
    {
        if(!this._readyForCKActions())
        {
            this._setCKActionsTimeout();
        }
        else
        {
            this._attachCKHandlers();
            this._hideStatusBar();
        }
    },

    _readyForCKActions : function()
    {
        var editor = this._getEditor();
        if(editor)
        {
            return !(!(editor.document));
        }

        return false;
    },

    _hideStatusBar : function()
    {
        var ckeditorArray = Element.select(this.get_domObject(), '.cke_editor');
        if(ckeditorArray && ckeditorArray.length == 1)
        {
            var tableRowArray = Element.select(ckeditorArray[0], 'tr');
            if(tableRowArray && tableRowArray.length == 3)
            {
                Element.setStyle(tableRowArray[2], {display: 'none'});
            }
        }
    },
    
    _attachCKHandlers : function()
    {
        var editor = this._getEditor();
        var editorDocument = editor.document;
        var self = this;
        editorDocument.on('keyup', function(event)
        {
            self._onKeyUpTextBox(event);
        });
    }
});

/*global ININ: true, Class: true, Element: true, alert: true, Event: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * WebServicesComposeMessagePanel class 
 *  
 * Handles the logic of the panel in which the web user may type messages to the agent.  For the 
 * UI, @see ComposeMessagePanel. 
 */
ININ.Web.Chat.UI.WebServicesComposeMessagePanel = Class.create(ININ.Web.Chat.UI.ComposeMessagePanel,
{
	/**
	 * Constructor
	 * 
	 * @param typingIndicator An instance of a class derived from ININ.Web.Chat.WebServicesTypingIndicatorBase, which will be notified when the user starts or stops typing.
	 * @param useHtmlEditor If true, a WYSIWYG editor will be displayed.  If false, a plain text editor will be displayed.  Note that the WYSIWYG editor is not supported at this time.
	 * @param languageCode  The code (i.e. fr-ca) that specifies which language the editor's tooltips, etc. should appear in.  Case-insensitive.
	 */
    initialize : function($super, typingIndicator, useHtmlEditor, languageCode)
    {
        if((arguments.length == 0) || (arguments.length > 4))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("WebServicesComposeMessagePanel constructor called with " + arguments.length + " arguments, but expected 1-3.");
        }
        
        $super(useHtmlEditor, languageCode);
        
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotificationObserver);

        this._typingIndicator = typingIndicator;
        this._awaitingReconnect = false;
        this._neverReenable = false;
    },
    
    // public methods

	/**
	 * Setter for the chat manager 
	 *  
	 * @param chatManager An instance of a subclass of ININ.Web.Chat.WebServices.ChatManagerBase
	 */
    set_chatManager : function(chatManager)
    {
        this._chatManager = chatManager;
    },
   
	/**
	 * Disables this panel when the current user ceases being a participant in the chat. 
	 *  
	 * @param notification Something that implements ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotification
	 */
    processParticipantLeftNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotification);
        if(notification.get_participantId() == ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId())
        {
            this.enable(false);
        }
    },

	/**
	 * Event listener for failovers 
	 *  
	 * @param notification Something that implements ININ.Web.Chat.WebServices.Interfaces.IFailoverNotification
	 */
    processFailoverUINotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IFailoverUINotification);

        this._awaitingReconnect = true;
        this.enable(false);
        this.enableSending(false);
    },

	/**
	 * Event listener for resumption of polling following reconnection of the chat 
	 *  
	 * @param notification Something that implements ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotification
	 */
    processResumedPollingNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IResumedPollingNotification);

        if(!this._neverReenable)
        {
            this._awaitingReconnect = false;
            this.enable(true);
            this.enableSending(true);
        }
    },

	/**
	 * Event listener for creation of a chat 
	 *  
	 * @param notification Something that implements ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotification
	 */
    processChatCreationNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotification);

        if(!this._neverReenable)
        {
            this._awaitingReconnect = false;
            this.enableSending(true);
        }
    },

	/**
	 * Event listener.  Will be called if the user refreshes the page.  Disables the panel AND makes it so that it 
	 * can never be enabled again, since it is no longer visible. 
	 *  
	 * @param notification Something that implements IRefreshPageNotification
	 */
    processRefreshPageNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IRefreshPageNotification);

        this.enable(false);
        this.enableSending(false);

        // if we got this notification, no matter what else we get, we can't act on it
        this._neverReenable = true;
    },

    // private methods

	/** 
	 * This class is a subclass of ININ.Web.Chat.UI.ComposeMessagePanel.  This method essentially calls 
     * super.enable().  However, if the chat is awaiting reconnection or in a state in which it must never
     * be re-enabled, the parameter to super.enable() will be false, regardless of what is passed to this method. 
	 *  
	 * @param enabled If true AND the chat is connected, the UI panel will be enabled.  If false OR the chat is not connected, the UI panel will be disabled.
	 */
    enable : function(enabled)
    {
        if(this._awaitingReconnect || this._neverReenable)
        {
            enabled = false;
        }
        ININ.Web.Chat.UI.ComposeMessagePanel.prototype.enable.call(this, enabled);
    },

	/** 
	 * This class is a subclass of ININ.Web.Chat.UI.ComposeMessagePanel.  This method essentially calls 
	 * super.enableSending().  However, if the chat is not connected, the parameter to super.enableSending() will be 
	 * false, regardless of what is passed to this method. 
	 *  
	 * @param enabled If true AND the chat is connected, the UI panel will indicate that sending is enabled.  If false OR the chat is not connected, the UI panel will indicate that sending is disabled.
	 */
    enableSending : function(enabled)
    {
        if(this._awaitingReconnect || this._neverReenable)
        {
            enabled = false;
        }
        ININ.Web.Chat.UI.ComposeMessagePanel.prototype.enableSending.call(this, enabled);
    },

    _onKeyUpTextBox : function(evt)
    {
        try
        {
            this._typingIndicator.keyPressed();
        }
        catch(ex)
        {
            ININ.Web.Common.Debug.traceError(ex.message);
            ININ.Web.Common.Debug.alert(ex.message);
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(ex, "WebServicesComposeMessagePanel._onKeyUpTextBox()");
        }
    },

    _sendMessage : function(text)
    {
        this._chatManager.sendMessage(text, this.get_useHtmlEditor(), this._onMessageSendAttemptCompleted.bind(this, text));
    },

    /** 
     * Called when an attempt to send a message has finished, whether successful or not. 
     * 
     * @param text The message that we attempted to send
     * @param success Whether the attempt succeeded
     * @param response An instance of ChatResponse. All the events, etc. will have already been handled before getting to this point - it is included here only to allow any error condition to be examined.
     */
    _onMessageSendAttemptCompleted : function(text, success, response)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesComposeMessagePanel._onMessageSendAttemptCompleted()");
        if(!success)
        {
            ININ.Web.Common.Debug.traceError(ININ.Web.Chat.UI.ErrorDisplayTextBuilder.build(response.get_statusReason(), 'Failed to send message'));
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(response, "WebServicesComposeMessagePanel._sendCallback()");

            this._onMessageSendFailed(ININ.Web.Common.Resources.LocalizedStrings.get('FailedToSendMessage'), text);
        }
        ININ.Web.Common.Debug.traceMethodExited("WebServicesComposeMessagePanel._onMessageSendAttemptCompleted()");
    }
});

/*global ININ: true, Class: true, Option: true, document: true, Element: true, $j: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * ParticipantsPanel class 
 * This is the panel that displays the list of participants that are currently members of the chat. 
 */
ININ.Web.Chat.UI.ParticipantsPanel = Class.create(ININ.Web.Chat.UI.Control,
{
	/**
	 * Constructor
	 */
    initialize:function($super)
    {
        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("ParticipantsPanel constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }
        
        $super(this._buildDomObject());
        this._validateDomObject();
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Chat.UI.Control.prototype.destroy.call(this);
    },

    // public methods

	/**
	 * This method resets the panel to its original state.  It clears the list of participants.
	 */
    reset : function()
    {
        this._list.innerHTML = '';
    },

    // private methods

    _buildParticipantDomObjectId : function(participantId)
    {
        return 'iwc-participant-' + participantId;
    },
    
    _getParticipantDomObject : function(participantId)
    {
        return document.getElementById(this._buildParticipantDomObjectId(participantId));
    },

    _getParticipantNameElements : function(participantId)
    {
        var domObject = this._getParticipantDomObject(participantId);
        if(domObject)
        {
            return Element.select(domObject, '[participant-name=true]');
        }
        
        return null;
    },

    _getParticipantImageDivs : function(participantId)
    {
        var domObject = this._getParticipantDomObject(participantId);
        if(domObject)
        {
            return Element.select(domObject, '[participant-avatar=true]');
        }
        
        return null;
    },

    _getParticipantSupplementalInfo : function(participantId)
    {
        var domObject = this._getParticipantDomObject(participantId);
        if(!domObject)
        {
            ININ.Web.Common.Debug.traceWarning('No participant with id: ' + participantId);
        }
        else
        {
            var elementArray = Element.select(domObject, '.iwc-chat-participant-popover-supplementalInfo');
            if(elementArray && elementArray.length == 1)
            {
                return elementArray[0];
            }
        }
        return null;
    },
        
    _getParticipantPopover : function(participantId)
    {
        var domObject = this._getParticipantDomObject(participantId);
        if(!domObject)
        {
            ININ.Web.Common.Debug.traceWarning('No participant with id: ' + participantId);
        }
        else
        {
            var elementArray = Element.select(domObject, 'div.iwc-chat-participant-popover');
            if(elementArray && elementArray.length == 1)
            {
                return elementArray[0];
            }
        }
        return null;
    },

    _addParticipantSelf : function(participantId, participantName)
    {
        var participantLi = this._addParticipant(participantId, participantName);
        Element.addClassName(participantLi, 'iwc-participant-self');
    },

    _addParticipantOther : function(participantId, participantName)
    {
        var participantLi = this._addParticipant(participantId, participantName);

        // Add popover div
        var popoverDiv = this.createChildElement(participantLi, 'div', null, { 'class': 'iwc-chat-participant-popover iwc-rounded-box' }, null);
        var table = this.createChildElement(popoverDiv, 'table', null, {'cellpadding': '0', 'cellspacing': '0'});
        var tbody = this.createChildElement(table, 'tbody');
        var tr = this.createChildElement(tbody, 'tr');

        // image td
        var leftTd = this.createChildElement(tr, 'td');
        var leftTdDiv = this.createChildElement(leftTd, 'div', null, { 'class': 'iwc-chat-participant-popover-avatar-div' }, null);
        this.createChildElement(leftTdDiv, 'div', null, { 'participant-avatar':'true', 'class': 'iwc-chat-participant-popover-avatar' });

        // text td
        var rightTd = this.createChildElement(tr, 'td');
        this.createChildElement(rightTd, 'span', null, { 'participant-name':'true', 'class': 'iwc-chat-participant-popover-name' }, null, ININ.Web.Chat.WebServices.ParticipantDisplayNameFormatter.formatDisplayNameFromIdAndName(participantId, participantName));
        this.createChildElement(rightTd, 'br');
        this.createChildElement(rightTd, 'span', null, { 'class': 'iwc-chat-participant-popover-supplementalInfo' });

        Element.hide(popoverDiv);
        var _self = this;
        Element.observe(participantLi, 'mouseover', this._showParticipantPopover.bind(_self, participantId));
        Element.observe(participantLi, 'mouseout', this._hideParticipantPopover.bind(_self, participantId));
    },

    _addParticipant : function(participantId, participantName)
    {
        var participantLi = this.createChildElement(this._list, 'li', this._buildParticipantDomObjectId(participantId));
        var table = this.createChildElement(participantLi, 'table', null, {'cellpadding': '0', 'cellspacing': '0'});
        var tbody = this.createChildElement(table, 'tbody');
        var tr = this.createChildElement(tbody, 'tr');
        
        // avatar td
        var leftTd = this.createChildElement(tr, 'td');
        var imgDiv = this.createChildElement(leftTd, 'div');
        this.createChildElement(imgDiv, 'div', null, { 'participant-avatar':'true', 'class': 'iwc-chat-participant-avatar' });

        // typing indicator image td
        var middleTd = this.createChildElement(tr, 'td');
        var imgDiv = this.createChildElement(middleTd, 'div', null, { 'class':'iwc-participant-typing-indicator-img' });

        // text td        
        var rightTd = this.createChildElement(tr, 'td');
        this.createChildElement(rightTd, 'span', null, { 'participant-name':'true', 'class': 'iwc-participant-name' }, null, ININ.Web.Chat.WebServices.ParticipantDisplayNameFormatter.formatDisplayNameFromIdAndName(participantId, participantName));
        this.createChildElement(rightTd, 'span', null, { 'class': 'iwc-participant-typing-status' }, null, ININ.Web.Common.Resources.LocalizedStrings.get("Typing"));
        
        return participantLi;
    },

    _removeParticipant : function(participantId)
    {
        var domObject = this._getParticipantDomObject(participantId);
        if(domObject)
        {
            Element.remove(domObject);
        }
    },

    _setParticipantName : function(participantId, newParticipantName)
    {
        var elementArray = this._getParticipantNameElements(participantId);
        if(!elementArray || elementArray.length < 1)
        {
            ININ.Web.Common.Debug.traceWarning('No name tag for participant with id: ' + participantId);
        }
        else
        {
            for (var i=0; i<elementArray.length; ++i)
            {
                var div = elementArray[i];
            // IE doesn't respect the height of the row after doing this fade out/fade in trick
            if(!ININ.Web.Common.Browser.isIE())
            {
                $j(div).fadeOut("normal");
                $j(div).hide();
            }

            div.innerHTML = newParticipantName;

            if(!ININ.Web.Common.Browser.isIE())
            {
                $j(div).fadeIn("normal");
            }
        }
        }
    },

    _setParticipantStartedTyping : function(participantId)
    {
        var li = this._getParticipantDomObject(participantId);
        if(!li)
        {
            ININ.Web.Common.Debug.traceWarning('No participant with id: ' + participantId);
        }
        else
        {
            Element.addClassName(li, 'iwc-participant-typing');
        }
    },

    _setParticipantStoppedTyping : function(participantId)
    {
        var li = this._getParticipantDomObject(participantId);
        if(!li)
        {
            ININ.Web.Common.Debug.traceWarning('No participant with id: ' + participantId);
        }
        else
        {
            Element.removeClassName(li, 'iwc-participant-typing');
        }
    },

    _setParticipantPhoto : function(participantId, url)
    {
        var divArray = this._getParticipantImageDivs(participantId);
        if(!divArray || divArray.length < 1)
        {
            ININ.Web.Common.Debug.traceWarning('No photo tag for participant with id: ' + participantId);
        }
        else
        {
            if (url)
            {
                var fullUrl = "/" + ININ.Web.Chat.WebServices.Servers.CurrentUriFragment + url;
                for (var i=0; i<divArray.length; ++i)
                {
                    var imgDiv = divArray[i];
                    imgDiv.style.backgroundImage = "url(" + fullUrl + ")";
                    imgDiv.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(src='" + fullUrl + "', sizingMethod='scale')"; // IE hack to resize the big image into a small div
                    Element.show(imgDiv);
                }
            }
            else
            {
                for (var i=0; i<divArray.length; ++i)
                {
                    // Hide only if there is not a default/generic avatar.
                    var style = divArray[i].currentStyle || window.getComputedStyle(divArray[i]); // IE way || all other browsers way
                    if (!style.backgroundImage)
                    {
                        Element.hide(divArray[i]);
                    }
                }
                this._hideParticipantPopover(participantId); // Just to be safe
            }
        }
    },

    _setParticipantLastRespondedTime : function(participantId, dateTime)
    {
        var span = this._getParticipantSupplementalInfo(participantId);
        if (!span)
        {
            ININ.Web.Common.Debug.traceWarning('No last responded tag for participant with id: ' + participantId);
        }
        else
        {
            var formattedTime = ININ.Web.Chat.UI.DateTimeFormatter.formatTimeForDisplay(dateTime, false);
            span.innerHTML = ININ.Web.Common.Resources.LocalizedStrings.get("LastRespondedTime").replace('%0', formattedTime);
        }
    },

    _showParticipantPopover : function(participantId)
    {
        if (this.isPhotoAvailable(participantId))
        {
            var popover = this._getParticipantPopover(participantId);
            if(popover)
            {
                Element.show(popover);
            }
        }
    },

    _hideParticipantPopover : function(participantId)
    {
        var popover = this._getParticipantPopover(participantId);
        if(popover)
        {
            Element.hide(popover);
        }
    },

    _setParticipantActive : function(participantId)
    {
        var elementArray = this._getParticipantNameElements(participantId);
        if(!elementArray || elementArray.length < 1)
        {
            ININ.Web.Common.Debug.traceWarning('No participant with id: ' + participantId);
        }
        else
        {
            for (var i=0; i<elementArray.length; ++i)
            {
                Element.removeClassName(elementArray[i], 'iwc-participant-held');
            }
        }
    },

    _setParticipantHeld : function(participantId)
    {
        var elementArray = this._getParticipantNameElements(participantId);
        if(!elementArray || elementArray.length < 1)
        {
            ININ.Web.Common.Debug.traceWarning('No participant with id: ' + participantId);
        }
        else
        {
            for (var i=0; i<elementArray.length; ++i)
            {
                Element.addClassName(elementArray[i], 'iwc-participant-held');
            }
        }
    },

    _buildDomObject : function()
    {
        var wrapperDiv = this.createElement('div', 'participantsPanel', { 'class': 'iwc-participants-panel' });

        var tabVisibility = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility);
        if (!tabVisibility.disablePrintableChatHistory())
        {
            var viewPrintableChatHistoryDiv = this.createChildElement(wrapperDiv, 'div', null, {'class': 'iwc-print-div'});
            var viewPrintableChatHistoryLink = this.createChildElement(viewPrintableChatHistoryDiv, 'a', null, {'href':'#'}, null, ININ.Web.Common.Resources.LocalizedStrings.get("PrintableChatHistory"));
            Element.observe(viewPrintableChatHistoryLink, 'click', this._onClickViewPrintableChatHistory.bindAsEventListener(this));
        }
        
        this._list = this.createChildElement(wrapperDiv, 'ul', 'participantsPanelList');
    
        return wrapperDiv;
    },
    
    _onClickViewPrintableChatHistory : function()
    {
        var messages = ININ.Web.Chat.WebServices.ReceivedMessageRepository.get_messages();
        var html = this._formatMessagesIntoHtml(messages);
        this._popUpWindow(html);
    },

    _formatMessagesIntoHtml : function(messages)
    {
        var dir = (ININ.Web.Chat.UI.LanguageCodeConverter.currentLanguageIsRightToLeft() ? "rtl" : "ltr");

        var pre =   '<html>' +
                    '<head>' +
                    '    <title>' +
                    ININ.Web.Common.Resources.LocalizedStrings.get("ChatHistory") +
                    '</title>' +
                    '<link rel="Stylesheet" type="text/css" href="printableHistory.css" media="all" />' +
                    '</head>' +
                    '<body dir="' + dir + '">' +
                    '<a href="javascript:window.print()">' +
                    ININ.Web.Common.Resources.LocalizedStrings.get("Print") +
                    '</a>' +
                    '<table>';

        var post =  '</table>' +
                    '<a href="javascript:window.print()">' +
                    ININ.Web.Common.Resources.LocalizedStrings.get("Print") +
                    '</a>' +
                    '<div class="linkDisclaimerDiv"><i>' +
                    ININ.Web.Common.Resources.LocalizedStrings.get("LinkDisclaimer") +
                    '</i></div>' +
                    '</body>' +
                    '</html>';


        var content = '';
        this._lastMessageDate = null;
        for(var i = 0; i < messages.length; ++i)
        {
            var message = messages[i];
            content += this._formatMessageIntoHtml(message);
        }

        return pre + content + post;
    },

    _formatMessageIntoHtml : function(message)
    {
        ININ.Web.Common.Interface.ensureImplements(message, ININ.Web.Chat.WebServices.Interfaces.IMessageData);

        var html = '<tr><td class="time">' +
                   ININ.Web.Chat.UI.DateTimeFormatter.formatTimeForDisplay(message.get_date(), (this._lastMessageDate != message.get_date().getDate())) +
                   '</td><td class="name">' + message.get_name() + ':</td><td class="message">' +
                   ININ.Web.Chat.WebServices.Utilities.escapeHTML(message.get_text()) + '</td></tr>';

        this._lastMessageDate = message.get_date().getDate();

        return html;
    },

    _popUpWindow : function(html)
    {
        ININ.Web.Common.Debug.traceMethodEntered("ParticipantsPanel._popUpWindow()");
        var windowTitle = 'Chat_History';
        var windowFeatures = 'width=' + (screen.width * 3/4) + ', height=' + (screen.height * 3/4) + ', dependent=no, toolbar=no, location=no, directories=no, status=no, menubar=yes, scrollbars=yes, resizable=yes';

        try
        {
            var newWin = window.open('', windowTitle, windowFeatures);
            newWin.document.write(html);
            newWin.document.close();
        }
        catch(ex)
        {
            ININ.Web.Common.Debug.traceError("Caught unhandled exception:\n" + ex);
            ININ.Web.Common.Debug.alert("Caught unhandled exception:\n" + ex);
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(ex, "ParticipantsPanel._popUpWindow()");
            window.alert(ININ.Web.Common.Resources.LocalizedStrings.get("ErrorOpeningWindow"));
        }
        ININ.Web.Common.Debug.traceMethodExited("ParticipantsPanel._popUpWindow()");
    },

    _validateDomObject : function()
    {
        if(!this._list)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Participant list not found");
        }
    }
});

/*global ININ: true, Class: true, Option: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * WebServicesParticipantsPanel class 
 * Listens for notifications that a chat participant has joined the conversation, left the conversation, put the 
 * conversation on hold, etc. and then calls the appropriate methods of the superclass. 
 * Basically, this class is the "glue" between NotificationRegistry and ParticipantsPanel. 
 */
ININ.Web.Chat.UI.WebServicesParticipantsPanel = Class.create(ININ.Web.Chat.UI.ParticipantsPanel,
{
    /**
	 * constructor
	 */
    initialize:function($super)
    {
        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("WebServicesParticipantsPanel constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }
        
        $super();

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantStartedTypingNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantStoppedTypingNotificationObserver);
		this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatReconnectUINotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotificationObserver);
        
        // For the popover
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotificationObserver);
        
    // for debugging only
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantHeldNotificationObserver);
    // for debugging only
    },

    // public methods

	/**
	 * Called when a participant has joined the chat.  Calls whatever is necessary to make the UI reflect this. 
	 *  
	 * @param notification Something that implements IParticipantJoinedNotification
	 */
    processParticipantJoinedNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantJoinedNotification);
        
        var id = notification.get_participantId();
        var name = ININ.Web.Chat.WebServices.ParticipantRepository.get_participant(id).get_name();
        if (ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId() == id)
        {
            this._addParticipantSelf(id, name);
        }
        else
        {
            this._addParticipantOther(id, name);
        }
    },

	/**
	 * Event listener for reconnection of the chat 
	 *  
	 * @param notification Something that implements ININ.Web.Chat.WebServices.Interfaces.IChatReconnectUINotification
	 */
    processChatReconnectUINotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IChatReconnectUINotification);

        this.reset();
    },

	/**
	 * Called when a participant has left the chat.  Calls whatever is necessary to make the UI reflect this. 
	 *  
	 * @param notification Something that implements IParticipantLeftNotification
	 */
    processParticipantLeftNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotification);
        this._removeParticipant(notification.get_participantId());
    },

	/**
	 * Called when a participant's name has changed.  Calls whatever is necessary to make the UI reflect this. 
	 * 
	 * @param notification Something that implements IParticipantNameChangedNotification
	 */
    processParticipantNameChangedNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantNameChangedNotification);
        this._setParticipantName(notification.get_participantId(), notification.get_newParticipantName());
    },

	/**
     * For debugging only
	 * @param notification Something that implements IParticipantActiveNotification
	 */
    processParticipantActiveNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantActiveNotification);
        this._setParticipantActive(notification.get_participantId());
    },

	/**
	 * Called when a participant has placed the chat on hold.  Calls whatever is necessary to make the UI reflect this. 
	 * 
	 * @param notification Something that implements IParticipantHeldNotification
	 */
    processParticipantHeldNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantHeldNotification);
        this._setParticipantHeld(notification.get_participantId());
    },
        
	/**
	 * Called when a participant has started typing.  Calls whatever is necessary to make the UI reflect this. 
	 *  
	 * @param notification Something that implements IParticipantStartedTypingNotification
	 */
    processParticipantStartedTypingNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantStartedTypingNotification);
        this._setParticipantStartedTyping(notification.get_participantId());
    },

	/**
	 * Called when a participant has stopped typing.  Calls whatever is necessary to make the UI reflect this. 
	 * 
	 * @param notification Something that implements IParticipantStoppedTypingNotification
	 */
    processParticipantStoppedTypingNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantStoppedTypingNotification);
        this._setParticipantStoppedTyping(notification.get_participantId());
    },

    /**
     * Respond to receipt of information (name, photo location) about a 
     * party involved in an interaction (not necessarily this interaction!)
     * 
     * @param notification 
     */
    processPartyInfoNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebServicesParticipantsPanel.processPartyInfoNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IPartyInfoNotification);

        if (notification.get_localParticipantId() == ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId())
        {
            var agentPhoto = notification.get_photo();
            if (agentPhoto)
            {
                this._setParticipantPhoto(notification.get_remoteParticipantId(), agentPhoto);
            }
            else
            {
                this._setParticipantPhoto(notification.get_remoteParticipantId(), null);
            }
        }

        ININ.Web.Common.Debug.traceMethodExited("WebServicesParticipantsPanel.processPartyInfoNotification()");
    },

	/**
	 * Implementation of IReceivedTextNotificationObserver 
	 * Updates the last response time in the participant's popover
	 * 
	 * @param notification Something that implements IReceivedTextNotification
	 */
    processReceivedTextNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedTextNotification);

        this._participantResponded(notification.get_participantId(), notification.get_dateTime());
    },

	/**
	 * Implementation of IReceivedUrlNotificationObserver 
	 * Adds the received URL to the panel.
	 * 
	 * @param notification Something that implements IReceivedUrlNotification
	 */
    processReceivedUrlNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedUrlNotification);

        this._participantResponded(notification.get_participantId(), notification.get_dateTime());
    },

	/**
	 * Implementation of IReceivedFileNotificationObserver 
	 * Adds a link to the received file to the panel.
	 * 
	 * @param notification Something that implements IReceivedFileNotification
	 */
    processReceivedFileNotification : function(notification)
    {
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IReceivedFileNotification);

        this._participantResponded(notification.get_participantId(), notification.get_dateTime());
    },

    /**
     * Returns true if the supplied participantId specifies a participant whose photo is known. 
     * Returns false otherwise. 
     * 
     * @param participantId A GUID identifying a participant 
     * @return boolean 
     */
    isPhotoAvailable : function(participantId)
    {
        var agent = ININ.Web.Chat.WebServices.ParticipantRepository.get_participant(participantId);
        if (agent)
        {
            if (agent.get_photo())
            {
                return true;
            }
        }
        return false;
    },

    // private methods

    _participantResponded : function(participantId, dateTime)
    {
        if (ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId() != participantId &&
            ININ.Web.Chat.WebServices.ParticipantRepository.get_systemParticipantId() != participantId)
        {
            this._setParticipantLastRespondedTime(participantId, dateTime);
        }
    }
});

/*global ININ: true, Class: true, Option: true, Element: true, window: true, document: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI");

/**
 * MainPanel class 
 * This is the panel that is shown when a chat is in progress. 
 */
ININ.Web.Chat.UI.MainPanel = Class.create(ININ.Web.Chat.UI.Control,
{
	/**
	 * Constructor
	 * 
     * @param useHtmlEditor If true, a WYSIWYG editor will be used.  If false, a simple textbox will be used.  Note that the WYSIWYG editor is not supported at this time. 
	 * @param languageCode  The code (i.e. fr-ca) that specifies which language the editor's tooltips, etc. should appear in.  Case-insensitive.
	 */
    initialize:function($super, useHtmlEditor, languageCode)
    {
        if((arguments.length < 2) || (arguments.length > 3))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("MainPanel constructor called with " + arguments.length + " arguments, but expected 2 or 3.");
        }

        // Assumption: ((want to display HTML editor) == (allow displaying received messages as HTML)).  If this becomes false,
        // stop using the variable "useHtmlEditor" for both purposes, and have 2 variables instead.
        this._receivedMessagesPanel = new ININ.Web.Chat.UI.WebServicesReceivedMessagesPanel(useHtmlEditor);
        this._composeMessagePanel = new ININ.Web.Chat.UI.WebServicesComposeMessagePanel(ININ.Web.Chat.WebServices.Json.TypingIndicator, useHtmlEditor, languageCode);
        this._participantsPanel = new ININ.Web.Chat.UI.WebServicesParticipantsPanel();

		// If false, user will be asked to confirm that they really do want to exit the chat.  If true,
		// the confirmation step will be skipped.
		this._exitButtonShouldOnlyExit = false;

        var domObject = this._buildDomObject();
        $super(domObject);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCompletionFailureNotification);

        this._bindControls();
    },

    /**
	 * Destructor
	 */
    destroy : function()
    {
        this._receivedMessagesPanel.destroy();
        delete this._receivedMessagesPanel;
        this._receivedMessagesPanel = null;
        
        this._composeMessagePanel.destroy();
        delete this._composeMessagePanel;
        this._composeMessagePanel = null;
        
        this._participantsPanel.destroy();
        delete this._participantsPanel;
        this._participantsPanel = null;
        
        ININ.Web.Chat.UI.Control.prototype.destroy.call(this);
    },

    // public methods

	/** 
	 * Sets the ChatManager, for both this panel and the WebServicesComposeMessagePanel which it contains. 
	 *  
	 * @param chatManager An instance of a subclass of ININ.Web.Chat.WebServices.ChatManagerBase
	 */
    set_chatManager : function(chatManager)
    {
        this._chatManager = chatManager;
        this._composeMessagePanel.set_chatManager(chatManager);
    },

	/** 
	 * Causes this panel (and all sub-panels) to become enabled or disabled. 
	 *  
	 * @param enabled If true, this panel will be enabled.  If false, this panel will be disabled.
	 */
    enable : function(enabled)
    {
        this._receivedMessagesPanel.enable(enabled);
        this._participantsPanel.enable(enabled);
        this._composeMessagePanel.enable(enabled);
    },

	/** 
	 * Resets this panel back to its initial state. 
	 */
    reset : function()
    {
        this._receivedMessagesPanel.reset();
        this._participantsPanel.reset();
        this._composeMessagePanel.reset();
		this._exitButtonShouldOnlyExit = false;
    },

	/** 
	 * Called when the panel receives focus.  Simply delegates the focus to the WebServicesComposeMessagePanel.
	 */
    focus : function()
    {
        this._composeMessagePanel.focus();    
    },

	/** 
	 * Called whenever a participant leaves the chat. 
	 * This implements the ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotificationObserver interface. 
	 * Checks to see if the participant who left is the web user whose browser is running this code.  If so, calls 
	 * ChatManager to free resources, and disables the prompt given by the Exit button. 
	 *  
	 * @param notification An implementation of IParticipantLeftNotification, so that the ID of the participant who left can be known.
	 */
    processParticipantLeftNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("MainPanel.processParticipantLeftNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IParticipantLeftNotification);

        if(notification.get_participantId() == ININ.Web.Chat.WebServices.ParticipantRepository.get_currentParticipantId())
        {
            ININ.Web.Common.Debug.traceNote("The current participant has left.");
            // since the normal logout wasn't done, need to call into chat manager manually
            this._chatManager.onExitChatSuccess(null);

            // the current user was forced out, so change the exit button from logout to just plain exit
            this._exitButtonShouldOnlyExit = true;
        }
        ININ.Web.Common.Debug.traceMethodExited("MainPanel.processParticipantLeftNotification()");
    },

    /**
     * Respond to notification that an attempt to exit a chat has failed.
     * 
     * @param chatCompletionFailureNotification Contains an error indicating the reason for the failure.
	 * @see _createChat() 
	 * @see ChatManager.login() 
     */
    processChatCompletionFailureNotification : function(chatCompletionFailureNotification)
    {
        var error = chatCompletionFailureNotification.get_error();
        ININ.Web.Common.Debug.traceError("Failed to exit chat: " + error.get_errorCode());
    },

    // private methods

    _onClickExitButton : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("MainPanel._onClickExitButton()");
        if(this._exitButtonShouldOnlyExit)
        {
            // Force a notification
            ININ.Web.Chat.WebServices.NotificationRegistry.processChatCompletionNotification(ININ.Web.Chat.WebServices.NotificationFactory.createChatCompletionNotification());
        }
        else
        {
            ININ.Web.Common.Debug.traceNote("Displaying Javascript confirmation dialog.");
            if(window.confirm(ININ.Web.Common.Resources.LocalizedStrings.get("ExitChatWarning")))
            {
                this._chatManager.exitChat();
            }
        }
        ININ.Web.Common.Debug.traceMethodExited("MainPanel._onClickExitButton()");
    },

    _bindControls : function()
    {
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantLeftNotificationObserver(this._composeMessagePanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerFailoverUINotificationObserver(this._composeMessagePanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerResumedPollingNotificationObserver(this._composeMessagePanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCreationNotificationObserver(this._composeMessagePanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerRefreshPageNotificationObserver(this._composeMessagePanel);

        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantJoinedNotificationObserver(this._receivedMessagesPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantLeftNotificationObserver(this._receivedMessagesPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedTextNotificationObserver(this._receivedMessagesPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedUrlNotificationObserver(this._receivedMessagesPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedFileNotificationObserver(this._receivedMessagesPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantVoicemailNotificationObserver(this._receivedMessagesPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerFailoverUINotificationObserver(this._receivedMessagesPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerResumedPollingNotificationObserver(this._receivedMessagesPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatReconnectFailureNotificationObserver(this._receivedMessagesPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerRefreshPageNotificationObserver(this._receivedMessagesPanel);
        
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantJoinedNotificationObserver(this._participantsPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantLeftNotificationObserver(this._participantsPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantNameChangedNotificationObserver(this._participantsPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantStartedTypingNotificationObserver(this._participantsPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantStoppedTypingNotificationObserver(this._participantsPanel);
		ININ.Web.Chat.WebServices.NotificationRegistry.registerChatReconnectUINotificationObserver(this._participantsPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerPartyInfoNotificationObserver(this._participantsPanel);

        // For the popover only
        ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedTextNotificationObserver(this._participantsPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedUrlNotificationObserver(this._participantsPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerReceivedFileNotificationObserver(this._participantsPanel);

        // for debugging only
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantActiveNotificationObserver(this._participantsPanel);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantHeldNotificationObserver(this._participantsPanel);
        // for debugging only
        
        // this needs to be last since it calls the actual exit chat functionality
        // (or create a CurrentParticipantLeftNotification to eliminate this condition)
        ININ.Web.Chat.WebServices.NotificationRegistry.registerParticipantLeftNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCompletionFailureNotificationObserver(this);
    },
    
    _buildDomObject : function()
    {
        var outerDiv = this.createElement('div', 'mainPanel', { 'class': 'iwc-main-panel' });
        outerDiv.appendChild(this._buildTitleHeader());
        outerDiv.appendChild(this._buildInnerDiv());
        return outerDiv;
    },

    _buildTitleHeader : function()
    {
        return this.createElement('h1', null, { 'class': 'iwc-page-header' }, null, ININ.Web.Common.Resources.LocalizedStrings.get("MainPanelHeaderText"));
    },

    _buildInnerDiv : function()
    {
        var div = document.createElement('div');
        div.appendChild(this._buildTopRow());
        div.appendChild(this._buildBottomRow());
        return div;
    },
    
    _buildTopRow : function()
    {
        var div = document.createElement('div');
        div.appendChild(this._participantsPanel.get_domObject());
        div.appendChild(this._receivedMessagesPanel.get_domObject());
        return div;
    },

    _buildBottomRow : function()
    {
        var div = document.createElement('div');
        div.appendChild(this._composeMessagePanel.get_domObject());

        var button = this.createChildElement(div, 'input', 'exitButton', { 'type': 'button', 'value': ININ.Web.Common.Resources.LocalizedStrings.get('Exit'), 'class': 'iwc-exit-button' });
        Element.observe(button, 'click', this._onClickExitButton.bindAsEventListener(this));

        return div;
    }
});

/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI._Internal");

/**
 * _DateTimeFormatter class 
 *  
 * Formats dates and times according to formats which adhere to:
 * http://msdn.microsoft.com/en-us/library/dd317787%28v=vs.85%29.aspx 
 * http://msdn.microsoft.com/en-us/library/dd318148%28v=vs.85%29.aspx 
 */
ININ.Web.Chat.UI._Internal._DateTimeFormatter = Class.create(
{
    /**
     * Constructor.  Does nothing.
     */
    initialize : function(dateFormat, timeFormat)
    {
        if (null == dateFormat)
        {
            // If an SU1 (or higher) Javascript client starts a chat with a GA webserver,
            // dateFormat and timeFormat will be null.  Use the value from the resource file
            // as a fallback.
            dateFormat = ININ.Web.Common.Resources.LocalizedStrings.get("FallbackDateFormat");
        }
        this.set_dateFormat(dateFormat);

        if (null == timeFormat)
        {
            timeFormat = ININ.Web.Common.Resources.LocalizedStrings.get("FallbackTimeFormat");
        }
        this.set_timeFormat(timeFormat);

        if ("1" == ININ.Web.Common.Resources.LocalizedStrings.get("OverrideDateTimeFormats"))
        {
            try
            {
                // Allow the date format to be overridden by the custom resource file.
                this.set_dateFormat(ININ.Web.Common.Resources.LocalizedStrings.get("DateFormat"));
            } catch (ex)
            {
                // get() already displayed an error to the console.
            }

            try
            {
                this.set_timeFormat(ININ.Web.Common.Resources.LocalizedStrings.get("TimeFormat"));
            } catch (ex)
            {
                // get() already displayed an error to the console.
            }
        }
    },

    /**
     * Sets the date format
     * 
     * @param dateFormat The format in which dates will be displayed
     */
    set_dateFormat : function(dateFormat)
    {
        this._dateFormat = dateFormat;
    },

    /**
     * Sets the time format
     * 
     * @param timeFormat The format in which times will be displayed
     */
    set_timeFormat : function(timeFormat)
    {
        this._timeFormat = timeFormat;
    },

    /**
     * Formats a date/timestamp for display
     * 
     * @param dateTime A Javascript Date object representing the date/timestamp to format
     * @param showDate A boolean. If true, the date and time will be included. If false, only the time will be included.
     */
    formatTimeForDisplay : function(dateTime, showDate)
    {
        try
        {
            if (showDate)
            {
                // Include the date
                return this.formatDate(dateTime) + " " + this.formatTime(dateTime);
            }
            else
            {
                // Do not include the date
                return this.formatTime(dateTime);
            }
        } catch (ex)
        {
            ININ.Web.Common.Debug.traceError(ex.message);
            return dateTime.toString() + ex.message;
        }
    },

    /**
     * Formats a date 
     *  
     * @param date A date to format 
     */
    formatDate : function(date)
    {
        var ret = this._dateFormat; // Example: "M/d/yyyy"

        // Example: It is Wednesday the 3rd, and this._dateFormat = "dddd d". Ignore month and year for now.
        // If we do /dddd/ first and /d/ second, we'll get "We3nes3ay 3".
        // But, if we do /d/ first and /dddd/ second, we'll get "3333 3".
        // The solution is to replace dddd with a placeholder, then do /d/, then change the
        // placeholder back to dddd, and finally do /dddd/.
        var placeholder1 = "#####";
        var placeholder2 = "!!!!!";
        var placeholder3 = "-----";
        var placeholder4 = "_____";
        var placeholder5 = "=====";
        var placeholder6 = "~~~~~";

        ret = ret.replace(/dddd/g, placeholder1);
        ret = ret.replace(/ddd/g, placeholder2);
        ret = ret.replace(/MMMM/g, placeholder3);
        ret = ret.replace(/MMM/g, placeholder4);
        ret = ret.replace(/gg/g, placeholder5);
        ret = ret.replace(/g/g, placeholder6);

        ret = ret.replace(/yyyyy?/g, date.getFullYear());
        var twoDigitYear = date.getFullYear() % 100;
        ret = ret.replace(/yy/g, twoDigitYear >= 10 ? twoDigitYear : "0" + twoDigitYear);
        ret = ret.replace(/y/g, date.getFullYear() % 10);

        var day = date.getDate();
        ret = ret.replace(/dd/g, (day >= 10 ? day : "0" + day));
        ret = ret.replace(/d/g, day);

        var month = date.getMonth() + 1;  // getMonth() returns 0 for January ... 11 for December
        ret = ret.replace(/MM/g, (month >= 10 ? month : "0" + month));
        ret = ret.replace(/M/g, month);

        ret = ret.replace(new RegExp(placeholder1, "g"), ININ.Web.Common.Resources.LocalizedStrings.get("DayOfWeek" + date.getDay()));
        ret = ret.replace(new RegExp(placeholder2, "g"), ININ.Web.Common.Resources.LocalizedStrings.get("AbbreviatedDayOfWeek" + date.getDay()));
        ret = ret.replace(new RegExp(placeholder3, "g"), ININ.Web.Common.Resources.LocalizedStrings.get("Month" + month));
        ret = ret.replace(new RegExp(placeholder4, "g"), ININ.Web.Common.Resources.LocalizedStrings.get("AbbreviatedMonth" + month));
        ret = ret.replace(new RegExp(placeholder5, "g"), ININ.Web.Common.Resources.LocalizedStrings.get("Era"));
        ret = ret.replace(new RegExp(placeholder6, "g"), ININ.Web.Common.Resources.LocalizedStrings.get("AbbreviatedEra"));

        return ret;
    },

    /**
     * Formats a time 
     *  
     * @param time A time to format 
     */
    formatTime : function(time)
    {
        var ret = this._timeFormat; // Example: "h:mm:ss tt"

        var hours = time.getHours();  // 0...23
        var hoursOnTwelveHourClock = hours % 12;
        if (hoursOnTwelveHourClock == 0)
        {
            hoursOnTwelveHourClock = 12;
        }
        ret = ret.replace(/HH/g, (hours >= 10 ? hours : "0" + hours));
        ret = ret.replace(/H/g, hours);
        ret = ret.replace(/hh/g, (hoursOnTwelveHourClock >= 10 ? hoursOnTwelveHourClock : "0" + hoursOnTwelveHourClock));
        ret = ret.replace(/h/g, hoursOnTwelveHourClock);

        var minutes = time.getMinutes();
        ret = ret.replace(/mm/g, (minutes >= 10 ? minutes : "0" + minutes));
        ret = ret.replace(/m/g, minutes);

        var seconds = time.getSeconds();
        ret = ret.replace(/ss/g, (seconds >= 10 ? seconds : "0" + seconds));
        ret = ret.replace(/s/g, seconds);

        var ampm = (hours < 12 ? "AM" : "PM");
        ret = ret.replace(/tt/g, ININ.Web.Common.Resources.LocalizedStrings.get(ampm));
        ret = ret.replace(/t/g, ININ.Web.Common.Resources.LocalizedStrings.get("Abbreviated" + ampm));

        return ret;
    }
});

/*global ININ: true, Class: true, Element: true, alert: true, debug: true, document: true, g_debugEnabled: true, numArgs: true, navigator: true, window: true */

/**
 * WebChat class
 * The main object of the UI side of the chat.
 */
ININ.Web.Chat.UI.WebChat = Class.create(ININ.Web.Chat.UI.Control,
{
	/**
	 * Constructor
	 * 
     * @param chatManager A ChatManagerBase subclass 
     * @param callbackManager A CallbackManagerBase subclass 
     * @param registrationManager A RegistrationManagerBase subclass 
     * @param pageMode Bitfield.  See ININ.Web.Chat.UI.PageModes. 
     * @param chatParameters An instance of ChatParameters
     * @param callbackParameters An instance of CallbackParameters
	 * @param shouldWarnOnClose If true, clicking the Exit button during a chat will result in a prompt for confirmation. 
	 *                          If false, no confirmation prompt will be given, and the exit button will immediately exit the chat. 
	 * @param useHtmlEditor If true, the web user will be shown an editor which allows him/her to change font, text 
	 *                      size, color, etc.  If false, the web user will only be able to enter plain text. 
     *                      Note that the HTML editor is not supported at this time.
	 * @param languageCode An IETF Language Tag to indicate which spoken language will be used for the 
	 *  				   chats/callbacks.  For instance, pass "en-us" for U.S. English, or "de-ch" for German as
	 *  				   spoken in Switzerland.
	 * @param chatFollowupUrl Optional.  If included, a new browser will be launched to display this URL upon completion 
	 *                    of a chat.  The URL will not be displayed upon creation of a callback. 
	 */
    initialize:function($super, chatManager, callbackManager, registrationManager, pageMode, chatParameters, callbackParameters, shouldWarnOnClose, useHtmlEditor, languageCode, chatFollowupUrl)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebChat.initialize()");
        if((arguments.length < 1) || (arguments.length > 11))
        {
            throw ININ.Web.Common.ExceptionFactory.createException("WebChat constructor called with " + arguments.length + " arguments, but expected between 1 and 11.");
        }

        // check our dependencies
        ININ.Web.Common.DependencyValidators.requirePrototypeVersion("1.6.1");
        ININ.Web.Common.DependencyValidators.requireJQueryVersion("1.3.2");

        // check the browser version
        // TODO: What versions of Safari are we supporting? or does it matter?
        // TODO: Are we supporting Chrome?
        if (ININ.Web.Common.Browser.isFireFox() && (ININ.Web.Common.Browser.getFireFoxVersion(navigator.userAgent).isLessThan(new ININ.Web.Common.Version('3.5'))))
        {
            window.alert(ININ.Web.Common.Resources.LocalizedStrings.get("FireFoxVersionError"));
            return;
        }
        if (ININ.Web.Common.Browser.isIE() && (ININ.Web.Common.Browser.getIEVersion(navigator.userAgent).isLessThan(new ININ.Web.Common.Version('7'))))
        {
            window.alert(ININ.Web.Common.Resources.LocalizedStrings.get("IEVersionError"));
            return;
        }

        // initialize members
        this._isChatConnected = false;
        this._chatFollowupUrl = chatFollowupUrl;

        // save members
        this._shouldWarnOnClose = shouldWarnOnClose;
        this._chatManager = chatManager;
        this._callbackManager = callbackManager;
        this._registrationManager = registrationManager;

        // initialize ui controls: login panel (if necessary, i.e. if the information collected
        // on that panel is not already known from some external source) and main panel.
        var loginInfoSource = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.LoginInfoSource);
        var chatParticipantName = loginInfoSource.get_chatUsername();
        if (ININ.Web.Common.Utilities.isNullOrEmptyString(chatParticipantName))
        {
            var callbackParticipantName = loginInfoSource.get_callbackUsername();
            if ((null != callbackParticipantName) && (0 < callbackParticipantName.length))
            {
                var participantCredentials = loginInfoSource.get_callbackPassword();
                var telephone = loginInfoSource.get_callbackTelephone();
                var subject = loginInfoSource.get_callbackDescription();

                // If telephone and/or subject are blank, don't bother the WebProcessorBridge.
                if (!(telephone && subject))
                {
                    var error = ININ.Web.Chat.WebServices.ErrorCodes.ERROR + "." +
                                ININ.Web.Chat.WebServices.ErrorCodes.WEBSVC + "." +
                                ININ.Web.Chat.WebServices.ErrorCodes.CONTENT + "." +
                                ININ.Web.Chat.WebServices.ErrorCodes.MISSINGDATA;
                    ININ.Web.Chat.WebServices.NotificationRegistry.processCallbackCreationFailureNotification(ININ.Web.Chat.WebServices.NotificationFactory.createCallbackCreationFailureNotification(new ININ.Web.Chat.WebServices.Error(error)));
                }
                else
                {
                    callbackParameters.set_telephone(telephone);
                    callbackParameters.set_subject(subject);
                    callbackParameters.set_participantName(callbackParticipantName);
                    callbackParameters.set_participantCredentials(participantCredentials);
                    this._callbackManager.createCallback(callbackParameters);
                }
            }
            else
            {
                this._loginContainerPanel = new ININ.Web.Chat.UI.FormContainerPanel(this._chatManager, this._callbackManager,
                                                                                    this._registrationManager,
                                                                                    pageMode, chatParameters,
                                                                                    callbackParameters);
            }
        }
        this._mainPanel = new ININ.Web.Chat.UI.MainPanel(useHtmlEditor, languageCode);

        // build and validate the DOM
        var domObject = this._buildDomObject();
        this._validateDomObject();

        $super(domObject);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPageBeforeUnloadNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCreationNotificationObserver);
        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IChatCompletionNotificationObserver);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerPageBeforeUnloadNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCreationNotificationObserver(this);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerChatCompletionNotificationObserver(this);

        this._closeWindowMessageIsEnabled = false;
        this._enableControls(false);
        this._mainPanel.hide();

        if (!ININ.Web.Common.Utilities.isNullOrEmptyString(chatParticipantName))
        {
            chatParameters.set_participantName(chatParticipantName);
            chatParameters.set_participantCredentials(loginInfoSource.get_chatPassword());
            this._chatManager.login(chatParameters);
        }

        ININ.Web.Common.Debug.traceMethodExited("WebChat.initialize()");
    },

	/**
	 * Destructor
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebChat.destroy()");
        if (this._isChatConnected)
        {
            this._showChatFollowupUrl();
        }

        if (this._loginContainerPanel)
        {
            this._loginContainerPanel.destroy();
            delete this._loginContainerPanel;
            this._loginContainerPanel = null;
        }
        
        this._mainPanel.destroy();
        delete this._mainPanel;
        this._mainPanel = null;
        
        ININ.Web.Chat.WebServices.WebServicesInitialization.destroy();
        
        ININ.Web.Chat.UI.Control.prototype.destroy.call(this);
        ININ.Web.Common.Debug.traceMethodExited("WebChat.destroy()");
    },

    // public methods

    getLoginContainerPanel : function()
    {
        return this._loginContainerPanel;
    },

	/**
	 * Called when the chat receives focus.  Simply delegates focus to a sub-panel.
	 */
    focus : function()
    {
        if (this._loginContainerPanel)
        {
            this._loginContainerPanel.focus();
            // Could just as easily do main panel here as well.
        }
        else
        {
            this._mainPanel.focus();
        }
    },

	/**
	 * Callback that is called when a response to the request for server configuration is received.
	 */
    onServerConfigurationRetrieved : function()
    {
        if (this._loginContainerPanel)
        {
            this._loginContainerPanel.onServerConfigurationRetrieved();
        }
    },

	/**
	 * Called at cleanup time.
	 */
    onUnload : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebChat.onUnload()");
        if(this._isChatConnected)
        {
            ININ.Web.Common.Debug.traceAlways("Exiting the chat!");
            this._chatManager.exitChat();
        }
        ININ.Web.Common.Debug.traceMethodExited("WebChat.onUnload()");
    },

    /**
     * Respond to notification that a Chat was created successfully.
     * 
     * @param chatCreationNotification Contains the ID of the current participant (i.e. the one whose browser is currently executing this code, and who is attempting to log in) 
     */
    processChatCreationNotification : function(chatCreationNotification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebChat.processChatCreationNotification()");
        var participantID = chatCreationNotification.get_currentParticipantId();
		var chatID = chatCreationNotification.get_currentChatId();

        if (ININ.Web.Chat.UI.DateTimeFormatter)
        {
            delete ININ.Web.Chat.UI.DateTimeFormatter;
        }
        ININ.Web.Chat.UI.DateTimeFormatter = new ININ.Web.Chat.UI._Internal._DateTimeFormatter(chatCreationNotification.get_dateFormat(), chatCreationNotification.get_timeFormat());

        this._chatManager.startChat(chatID, participantID);

        if (this._loginContainerPanel)
        {
            this._loginContainerPanel.hide();
        }

        this._mainPanel.set_chatManager(this._chatManager);
        this._mainPanel.enable(true);
        this._mainPanel.show();
        
        if(this._shouldWarnOnClose)
        {
            this._enableCloseWindowMessage();
        }
        
        this._enableControls(true);

        this._mainPanel.focus();

        this._isChatConnected = true;
        ININ.Web.Common.Debug.traceMethodExited("WebChat.processChatCreationNotification()");
    },

    /**
     * Respond to notification that a Chat was exited. 
     * 
     * @param chatCompletionNotification Notification object. Contents ignored.
     */
    processChatCompletionNotification : function(chatCompletionNotification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("WebChat.processChatCompletionNotification()");
        this._isChatConnected = false;

        this._disableCloseWindowMessage();

        this._showChatFollowupUrl();

        this._mainPanel.set_chatManager(null);
        this._mainPanel.hide();
        this._mainPanel.enable(false);
        this._mainPanel.reset();
        
        if (this._loginContainerPanel)
        {
            this._loginContainerPanel.reset();
            this._loginContainerPanel.show();
        }

        this._enableControls(false);

        if (this._loginContainerPanel)
        {
            this._loginContainerPanel.focus();
        }
        ININ.Web.Common.Debug.traceMethodExited("WebChat.processChatCompletionNotification()");
    },
    
    /**
     * Implementation of ININ.Web.Chat.WebServices.Interfaces.IPageBeforeUnloadNotificationObserver
     * 
     * @param notification IPageBeforeUnloadNotification
     */
    processPageBeforeUnloadNotification : function(notification)
    {
        if (this._closeWindowMessageIsEnabled)
        {
            return ININ.Web.Common.Resources.LocalizedStrings.get("ClosePageWarning");
        }
    },

	// private methods

    _enableCloseWindowMessage : function()
    {
        this._closeWindowMessageIsEnabled = true;
    },

    _disableCloseWindowMessage : function()
    {
        this._closeWindowMessageIsEnabled = false;
    },

    /**
     * Display the chat followup URL (i.e. for a survey or something), if one has been set. 
     * TODO:  Is there value in appending something like "&interactionID=1234" to the followup URL?
     */
    _showChatFollowupUrl : function()
    {
        if (this._chatFollowupUrl)
        {
            window.open(this._chatFollowupUrl, "_blank");
        }
    },

    _enableControls : function(enabled)
    {
        this._mainPanel.enable(enabled);
    },

    _validateDomObject : function()
    {
        var loginInfoSource = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.LoginInfoSource);
        if(!this._loginContainerPanel &&
           !loginInfoSource.get_chatUsername() &&
           !loginInfoSource.get_callbackUsername())
        {
            // The login container panel should exist, but does not.
            throw ININ.Web.Common.ExceptionFactory.createException("Login panel not found");
        }

        if(!this._mainPanel)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Main panel not found");
        }
    },

    _buildDomObject : function()
    {
        var outerDiv = this.createElement('div', null, { 'class': 'iwc-web-chat' });
        if (this._loginContainerPanel)
        {
            outerDiv.appendChild(this._loginContainerPanel.get_domObject());
        }
        outerDiv.appendChild(this._mainPanel.get_domObject());
        return outerDiv;
    }
});

/*global ININ: true, Class: true, Element: true, alert: true, debug: true, document: true, g_debugEnabled: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI._Internal");

/**
 * Page class 
 * Represents the root UI container for the Chat/Callback web app. 
 * Do not instantiate - use the singleton, ININ.Web.Chat.UI.Page.
 */
ININ.Web.Chat.UI._Internal._Page = Class.create(ININ.Web.Common.InterfaceImplementation,
{
    /**
	 * Default constructor.  This object is a singleton (see declaration immediately after this class), 
	 * so no need to call this directly. 
	 */
    initialize:function($super)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Page.initialize()");
        var numArgs = 1;
        if(arguments.length != numArgs)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Page constructor called with " + arguments.length + " arguments, but expected " + numArgs + ".");
        }
        
        this._numServerConfigRequestFailovers = 0;

        $super();

        ININ.Web.Common.Debug.traceMethodExited("Page.initialize()");
    },

    // methods

	/**
	 * When called, this method will display the ININ Chat/Callback UI.
     *  
     * @param params A Javascript object containing key/value pairs as specified below.  All are 
     * required unless otherwise specified: 
     *  
	 * currentUriFragment The URI fragment that reverse proxies to the preferred xIC server. 
	 *                    See description of next param.
	 * uriFragments An array of URI fragments identifying the xIC server(s).  Since AJAX requests can only be 
	 *  			made to the originating server, it is necessary to configure a reverse proxy in order for
	 *  			the requests to get to the xIC server(s).  If this Javascript was accessed from
	 *  			http://this-server/somePage.html, then it cannot make AJAX requests to
	 *  			http://xIC-server-1:8114/..., even if there weren't a firewall in the way.  So, perhaps
	 *  			this-server was configured in a way such that:
	 *  			http://this-server/something/websvcs/serverConfiguration reverse proxies to
	 *  			http://xIC-server-1:8114/websvcs/serverConfiguration, and
	 *  			http://this-server/somethingElse/websvcs/serverConfiguration reverse proxies to
	 *  			http://xIC-server-2:8114/websvcs/serverConfiguration.  In that case, the value passed for
	 *  			this param should be [ "something", "somethingElse" ].
	 * pageMode Bitfield.  See ININ.Web.Chat.UI.PageModes.
	 * chatTarget The name of the queue to which chats should be sent. 
	 *            May be null if chats were not included in pageMode param.
	 * chatTargetType "Workgroup" or "User", depending on the queue type of the previous param. 
	 *                May be null if chats were not included in pageMode param.
	 * callbackTarget The name of the queue to which callbacks should be sent. 
	 *                May be null if callbacks were not included in pageMode param.
	 * callbackTargetType "Workgroup" or "User", depending on the queue type of the previous param. 
	 *  				  May be null if callbacks were not included in pageMode param.
	 * customInfo Customers wishing to customize chats may set this to any data.  It will be set as 
	 *            the value of the CUSTOM_INFO attribute on the interaction. 
	 * defaultLanguageCode An IETF Language Tag to indicate which spoken language will be used as the default for the 
	 *  				   chats/callbacks.  For instance, pass "en-us" for U.S. English, or "de-ch" for German as
     *                     spoken in Switzerland.  This can be overriden, in order from highest to lowest,
     *                     by: 1. directly overriding by calling Bootloader.setLanguage(), 2. web user's
     *                     browser settings, 3. web user's OS settings.
	 * useHttps true/false value indicating whether HTTPS shall be used for the communication between the 
	 *  		web browser and web server.  This is distinct from the issue of whether HTTPS should be used
	 *  		between the web server and the xIC server - that is determined by the reverse proxy
	 *  		configuration.  If not supplied, a warning will be logged and true will be assumed.
	 * chatFollowupUrl Optional.  If included, a new browser will be launched to display this URL upon completion 
	 *                 of a chat.  The URL will not be displayed upon creation of a callback. 
     * callbackAttributes Optional.  An object containing key/value pairs.  If supplied, all 
     *                    keys and values must be strings.  These fields will be passed to WebProcessorBridge
     *                    and set as attributes on the Callback (but each key will be prefixed with a constant
     *                    to form the actual attribute name).
     * callbackRoutingContexts Optional. An instance of ININ.Web.Chat.WebServices.RoutingContexts that specifies how 
     *                         Callbacks should be routed. 
	 */
    load : function(params)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Page.load()");

        if(arguments.length != 1)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Page.load() called with " + arguments.length + " arguments, but expected 1.  Make sure there is not a version mismatch between the HTML and Javascript files.");
        }

        params = this._verifyLoadParameters(params);

        this._defaultLanguageCode = params.defaultLanguageCode;

        // initialize API
        ININ.Web.Chat.WebServices.WebServicesInitialization.initialize(params.currentUriFragment, params.uriFragments, params.useHttps);

        this._partyManager = new ININ.Web.Chat.WebServices.Json.PartyManager(
                                    ININ.Web.Chat.WebServices.Json.GenericResponseBuilder,
                                    ININ.Web.Chat.WebServices.CapabilityRepository,
                                    ININ.Web.Chat.WebServices.Json.FailoverHandler);

        this._pageMode = params.pageMode;

        if (params.pageMode & ININ.Web.Chat.UI.PageModes.CHAT)
        {
            this._chatParameters = new ININ.Web.Chat.WebServices.ChatParameters(params.chatTarget, params.chatTargetType, params.customInfo);
            this._chatFollowupUrl = params.chatFollowupUrl;
            this._useHtmlEditor = false; // Only plaintext is supported in 4.0 GA, maybe we will support HTML chat in a future release.
            this._chatManager = new ININ.Web.Chat.WebServices.Json.ChatManager(
                                        ININ.Web.Chat.WebServices.Json.GenericResponseBuilder,
                                        ININ.Web.Chat.WebServices.CapabilityRepository,
                                        ININ.Web.Chat.WebServices.Json.TypingIndicator,
                                        ININ.Web.Chat.WebServices.Json.FailoverHandler,
                                        this._useHtmlEditor);
            this._chatManager.set_partyManager(this._partyManager);
        }

        if (params.pageMode & ININ.Web.Chat.UI.PageModes.CALLBACK)
        {
            this._callbackParameters = new ININ.Web.Chat.WebServices.CallbackParameters(params.callbackTarget, params.callbackTargetType, params.customInfo, params.callbackAttributes, params.callbackRoutingContexts);
            this._callbackManager = new ININ.Web.Chat.WebServices.Json.CallbackManager(
                                        ININ.Web.Chat.WebServices.Json.GenericResponseBuilder,
                                        ININ.Web.Chat.WebServices.CapabilityRepository,
                                        ININ.Web.Chat.WebServices.Json.FailoverHandler);
            this._callbackManager.set_partyManager(this._partyManager);
        }

        this._registrationManager = new ININ.Web.Chat.WebServices.Json.RegistrationManager(
                                    ININ.Web.Chat.WebServices.Json.GenericResponseBuilder,
                                    ININ.Web.Chat.WebServices.CapabilityRepository,
                                    ININ.Web.Chat.WebServices.Json.FailoverHandler);

        this.addImplementedInterface(ININ.Web.Chat.WebServices.Interfaces.IPageUnloadNotificationObserver);
        ININ.Web.Chat.WebServices.NotificationRegistry.registerPageUnloadNotificationObserver(this);

        window.onbeforeunload = function(evt)
        {
            var returnValue = ININ.Web.Chat.WebServices.NotificationRegistry.processPageBeforeUnloadNotification(ININ.Web.Chat.WebServices.NotificationFactory.createPageBeforeUnloadNotification());
            if (null != returnValue)
            {
                ININ.Web.Common.Debug.traceNote("Displaying prompt: " + returnValue);
                if (evt)
                {
                    evt.returnValue = returnValue;  // IE, Firefox 3 and earlier
                }
                return returnValue; // Safari
            }
        };
        window.onunload = function()
        {
            ININ.Web.Common.Debug.traceMethodEntered("Page anonymous window.onunload handler");
            ININ.Web.Chat.WebServices.NotificationRegistry.processPageUnloadNotification(ININ.Web.Chat.WebServices.NotificationFactory.createPageUnloadNotification());
            ININ.Web.Common.Debug.traceMethodExited("Page anonymous window.onunload handler");
        };

        ININ.Web.Chat.WebServices.Json.ServerConfigurationManager.getServerConfiguration(this._serverConfigurationCallback.bind(this));
        ININ.Web.Common.Debug.traceMethodExited("Page.load()");
    },

	/**
     * Gets the Element to which the chat UI should be added.
     * Initially searches for something whose id is "iwc-web-chat-container", but
     * if that is not found, just returns the element representing the page body.
     */
    getContainingElement : function()
    {
        var parent = document.getElementById('iwc-web-chat-container');
        if (!parent)
        {
            parent = this.getBody();
        }
        return parent;
    },
 
	/**
	 * Convenience method to get the DOM element representing the body tag of the HTML page containing the 
	 * chat/callback UI.
	 */
    getBody : function()
    {
        return document.getElementsByTagName('body')[0];
    },

    processPageUnloadNotification : function(notification)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Page.processPageUnloadNotification()");
        ININ.Web.Common.Interface.ensureImplements(notification, ININ.Web.Chat.WebServices.Interfaces.IPageUnloadNotification);
        this.destroy();
        ININ.Web.Common.Debug.traceMethodExited("Page.processPageUnloadNotification()");
    },
   
	/**
	 * Cleans up the application's resources.
	 */
    destroy : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("Page.destroy()");
        try
        {
            if(this._webChat)
            {
                this._webChat.onUnload();
                this._webChat.destroy();
                delete this._webChat;
                this._webChat = null;
            }

            if(this._chatManager)
            {
                this._chatManager.destroy();
                delete this._chatManager;
                this._chatManager = null;
            }

            if(this._callbackManager)
            {
                this._callbackManager.destroy();
                delete this._callbackManager;
                this._callbackManager = null;
            }

            if(this._registrationManager)
            {
                this._registrationManager.destroy();
                delete this._registrationManager;
                this._registrationManager = null;
            }

            if(this._partyManager)
            {
                this._partyManager.destroy();
                delete this._partyManager;
                this._partyManager = null;
            }

            ININ.Web.Common.InterfaceImplementation.prototype.destroy.call(this);
        }
        catch(ex)
        {
            ININ.Web.Common.Debug.traceError(ex.message);
            ININ.Web.Common.Debug.breakpoint();
            ININ.Web.Common.Debug.alert(ex.message);
        }
        ININ.Web.Common.Debug.traceMethodExited("Page.destroy()");
    },

	/**
	 * Resets the Page to the state which it was in prior to any activity taking place.
	 */
    reset : function()
    {
        this._numServerConfigRequestFailovers = 0;
    },

    // private methods

    _verifyLoadParameters : function(params)
    {
        if (!params)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("No parameters specified to Page.load()!");
        }

        if (!params.currentUriFragment)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("No current URI fragment specified!");
        }

        if (!params.uriFragments)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("No URI fragments specified");
        }

        if (!params.pageMode)
        {
            throw ININ.Web.Common.ExceptionFactory.createException("Page mode not specified");
        }

        if (params.pageMode & ININ.Web.Chat.UI.PageModes.CHAT)
        {
            if (!params.chatTarget)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Chat target not specified");
            }

            if (!params.chatTargetType)
            {
                ININ.Web.Common.Debug.traceWarning('Chat target type not specified, assuming "Workgroup".');
                params.chatTargetType = "Workgroup";
            }
        }

        if (params.pageMode & ININ.Web.Chat.UI.PageModes.CALLBACK)
        {
            if (!params.callbackTarget)
            {
                throw ININ.Web.Common.ExceptionFactory.createException("Callback target not specified");
            }

            if (!params.callbackTargetType)
            {
                ININ.Web.Common.Debug.traceWarning('Callback target type not specified, assuming "Workgroup".');
                params.callbackTargetType = "Workgroup";
            }
        }

        if (!params.defaultLanguageCode)
        {
            ININ.Web.Common.Debug.traceWarning("Default language not specified, assuming en-us");
            params.defaultLanguageCode = "en-us";
        }

        if (!(params.useHttps === true || params.useHttps === false))
        {
            ININ.Web.Common.Debug.traceWarning("useHttps not specified, assuming true");
            params.useHttps = true;
        }

        return params;
    },

    _serverConfigurationCallback : function(success)
    {
        ININ.Web.Common.Debug.traceMethodEntered("Page._serverConfigurationCallback()");
        try
        {
            if(success)
            {
                ININ.Web.Common.Debug.traceStatus("Server configuration obtained successfully.");
                Bootloader.loadLocalization(this._localizationCallback.bind(this));
            }
            else
            {
                if(this._shouldSwitchoverAndTryToGetServerConfigurationAgain())
                {
                    ININ.Web.Common.Debug.traceStatus("Going to switch over, and try again to obtain server configuration.");
                    ININ.Web.Chat.WebServices.Servers.switchCurrentServer();
                    this._numServerConfigRequestFailovers++;
                    ININ.Web.Chat.WebServices.Json.ServerConfigurationManager.getServerConfiguration(this._serverConfigurationCallback.bind(this));
                }
                else
                {
                    ININ.Web.Common.Debug.traceStatus("Failed to obtain server configuration.");
                    this._constructFailureUI();
                }
            }
        }
        catch(ex)
        {
            ININ.Web.Common.Debug.breakpoint();
            ININ.Web.Common.Debug.traceError(ex.message);
            ININ.Web.Common.Debug.alert(ex.message);
            ININ.Web.Chat.WebServices.ProblemReporter.sendProblemReport(ex, "Page._serverConfigurationCallback()");
        }
        ININ.Web.Common.Debug.traceMethodExited("Page._serverConfigurationCallback()");
    },

    _shouldSwitchoverAndTryToGetServerConfigurationAgain : function()
    {
        if (!ININ.Web.Chat.WebServices.Servers.isConfiguredForSwitchover())
        {
            // In this case, the retry logic was already handled
            // in AjaxManagerBase._shouldRequestBeRetriedBasedOnMessageTypeAndRetryCount().
            return false;
        }

        // Adding 1 because retryCounts maintains the number of times to REtry.  So, for instance,
        // initial try + 3 retries = 4 total tries.
        var retryCounts = ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.RetryCounts);
        var numTimesToTry = ININ.Web.Chat.WebServices.Servers.get_numberOfServers() *
                            (1 + retryCounts.get_serverConfigurationRetries());

        return (this._numServerConfigRequestFailovers < numTimesToTry);
    },

    _localizationCallback : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("Page._localizationCallback()");
        this._constructUI();
        ININ.Web.Common.Debug.traceMethodExited("Page._localizationCallback()");
    },

    _constructUI : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("Page._constructUI()");

        var lang = Bootloader.getLocalizationLanguage();
        if (lang && ININ.Web.Chat.UI.LanguageCodeConverter.isRightToLeft(lang))
        {
            ININ.Web.Common.Debug.traceNote("Switching to right-to-left for language: " + lang);
            document.body.dir = "rtl";
        }
        else
        {
            document.body.dir = "ltr";
        }

        // initialize ui controls
        // TODO: Note that the language code is only passed to WebChat to specify the language in which CK Editor displays its
        // tool tips, and CK Editor is currently completely disabled.  If/when it is re-enabled, take the other higher-priority
        // ways of determining which language to use into account.
        this._webChat = new ININ.Web.Chat.UI.WebChat(this._chatManager, this._callbackManager, this._registrationManager, this._pageMode, this._chatParameters, this._callbackParameters, true, this._useHtmlEditor, this._defaultLanguageCode, this._chatFollowupUrl);

        // add the controls to the page
        Element.insert(this.getContainingElement(), { bottom: this._webChat.get_domObject() });

        this._webChat.focus();

        var loginContainerPanel = this._webChat.getLoginContainerPanel();
        if (loginContainerPanel)  // Will not exist if bypassing the login form
        {
            loginContainerPanel.constructUI();
        }

        ININ.Web.Common.Debug.traceMethodExited("Page._constructUI()");
    },

    _constructFailureUI : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("Page._constructFailureUI()");
        this.getContainingElement().appendChild(this._buildErrorPanel());
        ININ.Web.Common.Debug.traceMethodExited("Page._constructFailureUI()");
    },

    _buildErrorPanel : function()
    {
        ININ.Web.Common.Debug.traceMethodEntered("Page._buildErrorPanel()");
        var msg = "There was an error connecting to the server";
        try
        {
            msg = ININ.Web.Common.Resources.LocalizedStrings.get("ErrorConnectingToServer");
        }
        catch (ex)
        {
            /* 
             * If we're in this method, we've failed to get server configuration. 
             * Javascript can't "see" the web browser's language settings, so we rely on the server configuration response 
             * to include the value of the HTTP Accept-Language parameter.  Since we didn't receive that, localization has 
             * not been loaded yet, so we will certainly land in this catch clause.  So, this message will be in English.
             */
        }
        var divError = new Element('div', { 'class': 'iwc-load-error' });
        divError.appendChild(new Element('img', { 'src': 'img/error.png' }));
        var msgElement = new Element('span', null);
        msgElement.innerHTML = msg;
        divError.appendChild(msgElement);
        ININ.Web.Common.Debug.traceMethodExited("Page._buildErrorPanel()");
        return divError;
    }
});

/**
 * Singleton instance of _Page class.
 */
ININ.Web.Chat.UI.Page = new ININ.Web.Chat.UI._Internal._Page();

/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI._Internal");

/**
 * _DefaultLoginInfoSource class 
 *
 * Do not instantiate this class directly.  Use 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.LoginInfoSource) 
 *  
 * In the default installation, a page is shown which allows the user to 
 * select between tabs for Chat, Callback, and Registration.  What goes on 
 * "behind the scenes" is that ININ.Web.Chat.UI.LoginInfoSourceFactory is called 
 * to get a source for login info (username, password, Callback telephone number, 
 * Callback subject).  An instance of this class is returned.  However, this class 
 * has no knowledge of what the login info should be, so all of its methods return 
 * null.  Therefore, the page with the three tabs is shown, to allow the user to 
 * enter the login info. 
 *  
 * However, if the user's information is already known (i.e., if it exists
 * in some external source, such as a cookie, database, the form submission 
 * data from some external form, etc.) then the page with the three tabs may 
 * be bypassed.  In this case the user may be sent directly into a Chat, or 
 * a Callback may be created without interaction from the User. 
 *  
 * To do this, simply create a subclass of this class, and implement the various 
 * methods to return the login info that is obtained from the external source. 
 * Then edit the ININ.Web.Chat.Customizations.LoginInfoSourceFactory class, to 
 * return an instance of the subclass, rather than an instance of this class. 
 *  
 * Please see also ININ.Web.Chat.WebServices.Notification.  This class
 * contains Notifications that are sent upon creation of a Chat or Callback, 
 * completion of a Chat, and failure to create a Chat or Callback.  Customizations 
 * which subclass _DefaultLoginInfoSource will likely also want to add 
 * process*Notification() events for these Notification types, so that they 
 * may perform appropriate UI tasks for those events. 
 */
ININ.Web.Chat.UI._Internal._DefaultLoginInfoSource = Class.create(
{
    /**
     * Constructor.  Does nothing.
     */
    initialize : function()
    {
    },

    /** 
     * A subclass may override this method to skip the login page, and begin a Chat 
     * right away using a username obtained from some other source (for instance, 
     * a cookie, form data posted from a previous page, etc.)
     */
    get_chatUsername : function()
    {
        return null;
    },

    /** 
     * If a subclass overrides get_chatUsername() to return non-null, this method may 
     * optionally be overridden to return the password of that user.  If an anonymous Chat is 
     * desired, simply override get_chatUsername() but not get_chatPassword().
     */
    get_chatPassword : function()
    {
        return null;
    },

    /** 
     * A subclass may override this method (and others below) to skip the login 
     * page, and begin a Callback right away using a username obtained from 
     * some other source (for instance, a cookie, form data posted from a 
     * previous page, etc.)
     *  
     * Note that if get_chatUsername() is also overridden and returns a non-null 
     * value, that will take priority and a Chat will be started, not a Callback. 
     */
    get_callbackUsername : function()
    {
        return null;
    },

    /** 
     * If a subclass overrides get_callbackUsername() to return non-null, this method may 
     * optionally be overridden to return the password of that user.  If an anonymous Callback is 
     * desired, simply override get_callbackUsername() but not get_callbackPassword().
     */
    get_callbackPassword : function()
    {
        return null;
    },

    /** 
     * If a subclass overrides get_callbackUsername() to return non-null, this method shall 
     * be overridden to return the telephone number of that user. 
     */
    get_callbackTelephone : function()
    {
        return null;
    },

    /** 
     * If a subclass overrides get_callbackUsername() to return non-null, this method shall 
     * be overridden to return the subject which that user wishes to discuss. 
     */
    get_callbackDescription : function()
    {
        return null;
    }
});

/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI._Internal");

/**
 * DefaultMaximumFieldLengths class 
 *  
 * Do not instantiate this class directly.  Use 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.MaximumFieldLengths) 
 *  
 * In the default installation, each text field within the 3 tabs will allow the user 
 * to enter up to the maximum number of characters that Tracker will support for that 
 * data type. 
 *  
 * If it is desired to have a different maximum length for one or more fields, the 
 * following steps may be taken: 
 * 1. Create a subclass of this class.  Override one or methods to return a different number. 
 *    Note that it is not advisable to increase the returned values, as they are by default
 *    set to the maximum data length which Tracker can handle.
 *    Also note that this will have no effect on the pixel width of these fields - that can
 *    be changed by editing the ".iwc-text-box" selector of the CSS. 
 * 2. Change the line in ININ.Web.Chat.Customizations.MaximumFieldLengthsFactory that 
 *    instantiates a new ININ.Web.Chat.UI._Internal._DefaultMaximumFieldLengths. 
 *    Make that line instead create an instance of the subclass from step 1.
 */
ININ.Web.Chat.UI._Internal._DefaultMaximumFieldLengths = Class.create(
{
    // Do not change these values (unless the Tracker DB Schema changes)
    TRACKER_USERNAME_MAXIMUM_LENGTH : 100,
    TRACKER_PASSWORD_MAXIMUM_LENGTH : 64,
    TRACKER_FIRST_NAME_MAXIMUM_LENGTH : 50,
    TRACKER_MIDDLE_NAME_MAXIMUM_LENGTH : 50,
    TRACKER_LAST_NAME_MAXIMUM_LENGTH : 50,
    TRACKER_NAME_MAXIMUM_LENGTH : 128,
    TRACKER_TELEPHONE_MAXIMUM_LENGTH : 255,
    TRACKER_SUBJECT_MAXIMUM_LENGTH : 2000,
    TRACKER_ADDRESS_MAXIMUM_LENGTH : 255,
    TRACKER_CITY_MAXIMUM_LENGTH : 50,
    TRACKER_STATE_MAXIMUM_LENGTH : 50,
    TRACKER_POSTAL_CODE_MAXIMUM_LENGTH : 20,
    TRACKER_COUNTRY_MAXIMUM_LENGTH : 50,
    TRACKER_EMAIL_MAXIMUM_LENGTH : 255,
    TRACKER_URL_MAXIMUM_LENGTH : 255,
    TRACKER_DEPARTMENT_MAXIMUM_LENGTH : 50,
    TRACKER_COMPANY_MAXIMUM_LENGTH : 100,
    TRACKER_JOB_TITLE_MAXIMUM_LENGTH : 100,
    TRACKER_REMARKS_MAXIMUM_LENGTH : 2000,

    /**
     * Constructor.  Does nothing.
     */
    initialize : function()
    {
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a username field
     */
    get_usernameMaximumLength : function()
    {
        return this.TRACKER_USERNAME_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a password field
     */
    get_passwordMaximumLength : function()
    {
        return this.TRACKER_PASSWORD_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a first name field
     */
    get_firstNameMaximumLength : function()
    {
        return this.TRACKER_FIRST_NAME_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a middle name field
     */
    get_middleNameMaximumLength : function()
    {
        return this.TRACKER_MIDDLE_NAME_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a last name field
     */
    get_lastNameMaximumLength : function()
    {
        return this.TRACKER_LAST_NAME_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a name field (currently 
     * used in two places: the name field of the web user when they choose "I don't have 
     * an account", and the "Assistant Name" field). 
     */
    get_nameMaximumLength : function()
    {
        return this.TRACKER_NAME_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a telephone (or fax, etc.) number field
     */
    get_telephoneMaximumLength : function()
    {
        return this.TRACKER_TELEPHONE_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a callback subject field
     */
    get_subjectMaximumLength : function()
    {
        return this.TRACKER_SUBJECT_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a street address field
     */
    get_addressMaximumLength : function()
    {
        return this.TRACKER_ADDRESS_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a city name field
     */
    get_cityMaximumLength : function()
    {
        return this.TRACKER_CITY_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a state (or province/territory) field
     */
    get_stateMaximumLength : function()
    {
        return this.TRACKER_STATE_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a postal code field
     */
    get_postalCodeMaximumLength : function()
    {
        return this.TRACKER_POSTAL_CODE_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a country field
     */
    get_countryMaximumLength : function()
    {
        return this.TRACKER_COUNTRY_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into an email field
     */
    get_emailMaximumLength : function()
    {
        return this.TRACKER_EMAIL_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a URL field
     */
    get_urlMaximumLength : function()
    {
        return this.TRACKER_URL_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a department name field
     */
    get_departmentMaximumLength : function()
    {
        return this.TRACKER_DEPARTMENT_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a company name field
     */
    get_companyMaximumLength : function()
    {
        return this.TRACKER_COMPANY_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a job title field
     */
    get_jobTitleMaximumLength : function()
    {
        return this.TRACKER_JOB_TITLE_MAXIMUM_LENGTH;
    },

    /**
     * Override this method with one that returns a different number to alter the maximum 
     * number of characters that a web user is allowed to type into a remarks field
     */
    get_remarksMaximumLength : function()
    {
        return this.TRACKER_REMARKS_MAXIMUM_LENGTH;
    }

});

/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI._Internal");

/**
 * _DefaultTabVisibility class 
 * 
 * Do not instantiate this class directly.  Use 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.TabVisibility) 
 *  
 * By default: 
 *  
 * 1. The "Start Chat" tab is displayed if the Web Processor Bridge 
 * includes "start" and ("supportChatAuthenticationTracker" or "supportChatAuthenticationAnonymous") 
 * in the list of chat capabilities (part of the server configuration response). 
 *  
 * 2. The "Start Callback" tab is displayed if "create" and ("supportCallbackAuthenticationTracker" 
 * or "supportCallbackAuthenticationAnonymous") is included in the list of callback capabilities. 
 *  
 * 3. The "Register New Account" tab is displayed if "supportRegistrationTracker" 
 * is included in the list of common capabilities. 
 *  
 * However, currently the Web Processor Bridge always includes all of the above. 
 * Therefore, this class (or a subclass thereof, depending on what 
 * ININ.Web.Chat.Customizations.TabVisibilityFactory returns) is queried to determine whether 
 * each tab should be shown or not. 
 *  
 * To prevent certain tabs from displayed:
 * 1. Create a subclass of this class which overrides one or more methods in this class.
 * 2. Modify TabVisibilityFactory to return an instance of the new subclass instead 
 *    of an instance of this class. 
 */
ININ.Web.Chat.UI._Internal._DefaultTabVisibility = Class.create(
{
    /**
     * Constructor.  Does nothing.
     */
    initialize : function()
    {
    },

    /** 
     * If a subclass overrides this return value to true, the "Start Chat" tab will 
     * not be displayed. 
     */
    hideStartChatTab : function()
    {
        return false;
    },

    /** 
     * If a subclass overrides this return value to true, the "Start Callback" tab will 
     * not be displayed. 
     */
    hideStartCallbackTab : function()
    {
        return false;
    },

    /** 
     * If a subclass overrides this return value to true, the "Register New Account" tab will 
     * not be displayed, and the "Create an account" link on the other two tabs will also be hidden. 
     */
    hideRegisterNewAccountTab : function()
    {
        return false;
    },

    /**
     * If this method returns false, the link to display a printable chat transcript 
     * will be displayed.  If it returns true, the link will not be displayed. 
     *  
     * In the default implementation, false is returned.  However, subclasses may 
     * override this method if the link is not (always) desired. 
     *  
     * If true is returned, the resource strings "ClosePageWarning" and "ExitPageWarning" 
     * should be reworded, since they mention the ability to print a transcript. 
     *  
     * @return boolean indicating whether the printable chat history link should be hidden. 
     */
    disablePrintableChatHistory : function()
    {
        return false;
    }
});

/*global ININ: true, Class: true, Element: true, alert: true, Event: true, window: true, CKEDITOR: true */

// Register namespaces
ININ.Web.Common.Type.registerNamespace("ININ.Web.Chat.UI._Internal");

/**
 * _DefaultStatusFieldsDisplay class 
 *  
 * Do not instantiate this class directly.  Use 
 * ININ.Web.Chat.WebServices.CustomizationFactoryRegistry.get_instance(ININ.Web.Chat.WebServices.CustomizableSingletonFactoryTypes.StatusFieldsDisplay) 
 *  
 * Controls whether the following fields are displayed in the Callback Status Panel.  By default, all are displayed. 
 * Assigned Agent Name 
 * Interaction State 
 * Estimated Callback Time 
 * Queue Wait Time 
 * Queue Position 
 * Longest Wait Time 
 * Interactions Waiting Count 
 * Logged In Agents Count 
 * Available Agents Count 
 * Subject (entered by web user) 
 * Creation Time (time the callback request was submitted by web user) 
 * Web User's name (if anonymous) or username (if authenticated) 
 * Web user's telephone number 
 */
ININ.Web.Chat.UI._Internal._DefaultStatusFieldsDisplay = Class.create(
{
    /**
     * Constructor.  Does nothing.
     */
    initialize : function()
    {
    },

    /**
     * This method returns whether the assigned agent's name should be displayed 
     * in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showAssignedAgentName : function()
    {
        return true;
    },

    /**
     * This method returns whether the interaction state should be displayed 
     * in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showInteractionState : function()
    {
        return true;
    },

    /**
     * This method returns whether the assigned estimated callback time should be displayed 
     * in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showEstimatedCallbackTime : function()
    {
        return true;
    },

    /**
     * This method returns whether the queue wait time should be displayed 
     * in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showQueueWaitTime : function()
    {
        return true;
    },

    /**
     * This method returns whether the callback's position in the queue should be displayed 
     * in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showQueuePosition : function()
    {
        return true;
    },

    /**
     * This method returns whether the longest wait time of interactions in the queue should be displayed 
     * in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showLongestWaitTime : function()
    {
        return true;
    },

    /**
     * This method returns whether the number of interactions waiting on 
     * the queue should be displayed in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showInteractionsWaitingCount : function()
    {
        return true;
    },

    /**
     * This method returns whether the number of agents logged in should be displayed 
     * in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showLoggedInAgentsCount : function()
    {
        return true;
    },

    /**
     * This method returns whether the number of available agents should be displayed 
     * in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showAvailableAgentsCount : function()
    {
        return true;
    },

    /**
     * This method returns whether the callback's subject (as entered by the web user) 
     * should be displayed in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showSubject : function()
    {
        return true;
    },

    /**
     * This method returns whether the creation date/time of the callback should be displayed 
     * in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showCreationDateTime : function()
    {
        return true;
    },

    /**
     * This method returns whether the web user's name (if anonymous) or username (if authenticated)
     * should be displayed in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showName : function()
    {
        return true;
    },

    /**
     * This method returns whether the web user's telephone number should be displayed 
     * in the callback status panel. 
     *  
     * @return Boolean 
     */
    get_showTelephone : function()
    {
        return true;
    },

    /**
     * Takes a prefix common to several resource keys, and a number of seconds, and 
     * returns a localized string displaying that time duration.
     *  
     * This is a customization point, to allow customers to tweak the number 
     * of seconds before display.  This could be used to make the shortest displayed 
     * time be 5 minutes, or to build in some over- or under-estimation, or to display 
     * only increments of 5 minutes, etc. for instance. 
     *  
     * In this implementation, if seconds represents... 
     * ...zero to 89 seconds, the returned value will be the resource 
     * whose key is: resourcePrefix + "_Minute"
     * ...between 90 seconds and 45 minutes, the returned value will be the 
     * rounded number of minutes substituted into the resource whose 
     * key is: resourcePrefix + "_Minutes" 
     * ...between 46 and 89 minutes, the returned value will be the resource 
     * whose key is: resourcePrefix + "_Hour" 
     * ...between 90 minutes and 20 hours, the returned value will be the rounded number
     * of hours substituted into the resource whose key is: resourcePrefix + "_Hours" 
     * ...at least 20 hours but less than 36 hours, the returned value will be the 
     * resource whose key is: resourcePrefix + "_Day" 
     * ...at least 36 hours, the returned value will be the rounded number of days substituted
     * into the resource whose key is: resourcePrefix + "_Hours" 
     *  
     * In a later SU, this method will be changed to correctly handle the special rules for writing 
     * plural numbers in languages such as Russian and Polish. 
     *  
     * @param resourcePrefix - A prefix common to several keys in the resource file. This method may append "_Minute", "_Minutes", "_Hour", "_Hours". 
     * @param seconds - integer number of seconds 
     * @return Localized string
     */
    formatTimeDuration : function(resourcePrefix, seconds)
    {
        var timeDuration = new ININ.Web.Chat.WebServices.TimeDuration(seconds);
        var resourceSuffix = "";

        if (timeDuration.getTotalSeconds() <= 89)
        {
            return ININ.Web.Common.Resources.LocalizedStrings.get(resourcePrefix + "_Minute");
        }
        else if (timeDuration.getTotalMinutes() <= 45)
        {
            var nMinutesToDisplay = timeDuration.getRoundedMinutes();
            return ININ.Web.Common.Resources.LocalizedStrings.get(resourcePrefix + "_Minutes").replace('%0', nMinutesToDisplay);
        }
        else if (timeDuration.getTotalMinutes() <= 89)
        {
            return ININ.Web.Common.Resources.LocalizedStrings.get(resourcePrefix + "_Hour");
        }
        else if (timeDuration.getTotalHours() <= 20)
        {
            var nHoursToDisplay = timeDuration.getRoundedHours();
            return ININ.Web.Common.Resources.LocalizedStrings.get(resourcePrefix + "_Hours").replace('%0', nHoursToDisplay);
        }
        else if (timeDuration.getTotalHours() <= 36)
        {
            return ININ.Web.Common.Resources.LocalizedStrings.get(resourcePrefix + "_Day");
        }
        else
        {
            nDaysToDisplay = timeDuration.getRoundedDays();
            return ININ.Web.Common.Resources.LocalizedStrings.get(resourcePrefix + "_Days").replace('%0', nDaysToDisplay);
        }
    }
});

/**
 * This file simply calls the Bootloader's onLoadedUI() handler, so that Bootloader will know that all 
 * the UI Javascript has completed loading. 
 */
Bootloader.onLoadedUI();


