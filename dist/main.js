!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t[t.RGB=0]="RGB",t[t.Greyscale=1]="Greyscale",t[t.Julia=2]="Julia"}(e.ColorSchemeType||(e.ColorSchemeType={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t[t.LineByLine=0]="LineByLine",t[t.Blockwise=1]="Blockwise"}(e.AlgorithmType||(e.AlgorithmType={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(3),i=n(18),o=n(0),a=n(19),c=document.getElementById("mandelbrot");c.height=window.innerHeight,c.width=window.innerWidth;var l=document.getElementById("selection");l.height=window.innerHeight,l.width=window.innerWidth;var u=new a.ParameterHandler;u.parseQueryParameters(window.location.search);var s=r.default(o.ColorSchemeType.RGB,c,u);i.registerCanvasDoubleClick(l,s),i.registerSelectionBoxHandlers(l,s),i.registerAlgorithmSelect(),s.generate()},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(4),i=n(22),o=n(8),a=n(12),c=n(13),l=n(14);e.default=function(t,e,n){var u=a.default(n);console.log("Max iterations: ",u);var s=r.default(n,t,u);console.log("Color scheme: ",s);var h=new c.Coordinates(e.height,e.width,n.centerX,n.centerY,n.width);console.log("Coordinates: ",h.toString());var d=i.default(n.set,u,n);console.log("Engine: ",d.toString());var f=o.default(n.algorithm,s,h,e.getContext("2d"),d);return console.log("Algorithm: ",f.toString()),new l.Image(f,h,d,u)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(0),i=n(5),o=n(7),a=n(20);e.default=function(t,e,n){switch(t.set===a.SetType.Julia&&(e=r.ColorSchemeType.Julia),e){case r.ColorSchemeType.RGB:return new i.Hsl(n,300,150,1,.5);case r.ColorSchemeType.Greyscale:return new o.Greyscale(n,100,50);case r.ColorSchemeType.Julia:return new i.Hsl(n,100,150,1,.5)}throw new Error("Invalid color scheme type: "+e)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(6),i=function(){function t(t,e,n,r,i){this.maxIterations=t,this.cycleLength=e,this.hueOffset=n,this.saturation=r,this.luminosity=i}return t.prototype.getColor=function(t){if(t>=this.maxIterations)return[0,0,0,255];var e=r.default((t+this.hueOffset)%this.cycleLength/this.cycleLength,this.saturation,this.luminosity);return e.push(255),e},t}();e.Hsl=i},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t,e,n){var r,i,o;if(0==e)return[Math.round(255*n),Math.round(255*n),Math.round(255*n)];var a=function(t,e,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?t+6*(e-t)*n:n<.5?e:n<2/3?t+(e-t)*(2/3-n)*6:t},c=n<.5?n*(1+e):n+e-n*e,l=2*n-c;return r=a(l,c,t+1/3),i=a(l,c,t),o=a(l,c,t-1/3),[Math.round(255*r),Math.round(255*i),Math.round(255*o)]}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e,n){this.maxIterations=t,this.cycleLength=e,this.offset=n}return t.prototype.getColor=function(t){if(t>=this.maxIterations)return[0,0,0,255];var e=Math.abs((t+this.offset)%(2*this.cycleLength)/this.cycleLength-1),n=Math.floor(200*e)+35;return[n,n,n,255]},t}();e.Greyscale=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=n(9),o=n(10),a=n(11),c=n(21);e.default=function(t,e,n,l,u){if(u instanceof c.Julia)return new o.TimedAlgorithm(new i.LineByLine(e,n,l,u));var s;switch(t){case r.AlgorithmType.LineByLine:s=new i.LineByLine(e,n,l,u);break;case r.AlgorithmType.Blockwise:s=new a.Blockwise(e,n,l,u);break;default:throw new Error("Invalid algorithm type: "+t)}return new o.TimedAlgorithm(s)}},function(t,e,n){"use strict";var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function a(t){try{l(r.next(t))}catch(t){o(t)}}function c(t){try{l(r.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}l((r=r.apply(t,e||[])).next())}))},i=this&&this.__generator||function(t,e){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}};Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e,n,r){this.colorScheme=t,this.coordinates=e,this.context=n,this.engine=r}return t.prototype.draw=function(t,e,n){return r(this,void 0,void 0,(function(){var r,o,a=this;return i(this,(function(i){switch(i.label){case 0:r=this.context.createImageData(this.coordinates.pixelWidth,1),o=(new Date).getTime(),i.label=1;case 1:return e<this.coordinates.pixelHeight?(this.drawLine(r,e),this.context.putImageData(r,0,e),(new Date).getTime()-o>1e3?(console.log("Updating image."),o=(new Date).getTime(),[4,setTimeout((function(){a.draw(t,e,n)}),0)]):[3,3]):[3,4];case 2:return i.sent(),[2];case 3:return e++,[3,1];case 4:return[2,n()]}}))}))},t.prototype.drawLine=function(t,e){for(var n=0,r=0;r<this.coordinates.pixelWidth;r++){var i=this.coordinates.getXCoordinate(r),o=this.coordinates.getYCoordinate(e),a=this.engine.calculateEscapeDepth(i,o),c=this.colorScheme.getColor(a);t.data[n++]=c[0],t.data[n++]=c[1],t.data[n++]=c[2],t.data[n++]=c[3]}},t.prototype.toString=function(){return"LineByLine[engine={"+this.engine.toString()+"};]"},t}();e.LineByLine=o},function(t,e,n){"use strict";var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function a(t){try{l(r.next(t))}catch(t){o(t)}}function c(t){try{l(r.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}l((r=r.apply(t,e||[])).next())}))},i=this&&this.__generator||function(t,e){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}};Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t){this.algorithm=t,this.milliseconds=0}return t.prototype.draw=function(t,e,n){return r(this,void 0,void 0,(function(){var r,o,a=this;return i(this,(function(i){switch(i.label){case 0:return r=(new Date).getTime(),o=function(){var t=(new Date).getTime();a.milliseconds=t-r,n()},[4,this.algorithm.draw(t,e,o)];case 1:return i.sent(),[2]}}))}))},t.prototype.toString=function(){return"TimedAlgorithm[algorithm={"+this.algorithm.toString()+"};]"},t}();e.TimedAlgorithm=o},function(t,e,n){"use strict";var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function a(t){try{l(r.next(t))}catch(t){o(t)}}function c(t){try{l(r.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}l((r=r.apply(t,e||[])).next())}))},i=this&&this.__generator||function(t,e){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}};Object.defineProperty(e,"__esModule",{value:!0});var o=function(){function t(t,e,n,r){this.colorScheme=t,this.coordinates=e,this.context=n,this.engine=r,this.blockSize=16}return t.prototype.draw=function(t,e,n){return r(this,void 0,void 0,(function(){var r,o,a,c,l,u,s,h,d=this;return i(this,(function(i){switch(i.label){case 0:r=(new Date).getTime(),o=this.coordinates.pixelWidth,a=this.coordinates.pixelHeight,i.label=1;case 1:if(!(e<a))return[3,4];for(c=e,l=e+this.blockSize>a?a-e:e+this.blockSize;t<o;)u=t,s=t+this.blockSize>o?o-t:t+this.blockSize,h=this.context.createImageData(s-u,l-c),this.drawBlock(h,u,s,c,l),this.context.putImageData(h,u,c),t+=this.blockSize;return t=0,e+=this.blockSize,(new Date).getTime()-r>1e3?(console.log("Updating image."),r=(new Date).getTime(),[4,setTimeout((function(){d.draw(t,e,n)}),0)]):[3,3];case 2:return i.sent(),[2];case 3:return[3,1];case 4:return[2,n()]}}))}))},t.prototype.drawBlock=function(t,e,n,r,i){var o=this.getFillDepth(e,n,r,i);return null===o?this.calculateBlock(t,e,n,r,i):this.fillBlock(t,e,n,r,i,o)},t.prototype.calculateBlock=function(t,e,n,r,i){for(var o=0,a=r;a<i;a++)for(var c=e;c<n;c++){var l=this.calculateDepth(c,a),u=this.colorScheme.getColor(l);t.data[o++]=u[0],t.data[o++]=u[1],t.data[o++]=u[2],t.data[o++]=u[3]}},t.prototype.fillBlock=function(t,e,n,r,i,o){for(var a=0,c=this.colorScheme.getColor(o),l=r;l<i;l++)for(var u=e;u<n;u++)t.data[a++]=c[0],t.data[a++]=c[1],t.data[a++]=c[2],t.data[a++]=c[3]},t.prototype.getFillDepth=function(t,e,n,r){for(var i=this.calculateDepth(t,n),o=t;o<e;o++){if(this.calculateDepth(o,n)!==i)return null;if(this.calculateDepth(o,r-1)!==i)return null}for(var a=n+1;a<r-2;a++){if(this.calculateDepth(t,a)!==i)return null;if(this.calculateDepth(e-1,a)!==i)return null}return i},t.prototype.calculateDepth=function(t,e){var n=this.coordinates.getXCoordinate(t),r=this.coordinates.getYCoordinate(e);return this.engine.calculateEscapeDepth(n,r)},t.prototype.toString=function(){return"Blockwise[engine={"+this.engine.toString()+"};blockSize="+this.blockSize+"]"},t}();e.Blockwise=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(20);e.default=function(t){if(t.set===r.SetType.Julia)return 2e3;var e=Math.log(5/t.width),n=Math.floor(e*e*30);return Math.max(n,150)}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e,n,r,i){this.pixelHeight=t,this.pixelWidth=e,this.centerX=n,this.centerY=r,this.width=i,this.increment=i/e}return t.prototype.getXCoordinate=function(t){return this.centerX-this.width/2+t*this.increment},t.prototype.getYCoordinate=function(t){return this.centerY+this.pixelHeight*this.increment/2-t*this.increment},t.prototype.toString=function(){return"Coordinates[pixelHeight="+this.pixelHeight+";pixelWidth="+this.pixelWidth+";centerX="+this.centerX+";centerY="+this.centerY+";]"},t}();e.Coordinates=r},function(t,e,n){"use strict";var r=this&&this.__awaiter||function(t,e,n,r){return new(n||(n=Promise))((function(i,o){function a(t){try{l(r.next(t))}catch(t){o(t)}}function c(t){try{l(r.throw(t))}catch(t){o(t)}}function l(t){var e;t.done?i(t.value):(e=t.value,e instanceof n?e:new n((function(t){t(e)}))).then(a,c)}l((r=r.apply(t,e||[])).next())}))},i=this&&this.__generator||function(t,e){var n,r,i,o,a={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return o={next:c(0),throw:c(1),return:c(2)},"function"==typeof Symbol&&(o[Symbol.iterator]=function(){return this}),o;function c(o){return function(c){return function(o){if(n)throw new TypeError("Generator is already executing.");for(;a;)try{if(n=1,r&&(i=2&o[0]?r.return:o[0]?r.throw||((i=r.return)&&i.call(r),0):r.next)&&!(i=i.call(r,o[1])).done)return i;switch(r=0,i&&(o=[2&o[0],i.value]),o[0]){case 0:case 1:i=o;break;case 4:return a.label++,{value:o[1],done:!1};case 5:a.label++,r=o[1],o=[0];continue;case 7:o=a.ops.pop(),a.trys.pop();continue;default:if(!(i=a.trys,(i=i.length>0&&i[i.length-1])||6!==o[0]&&2!==o[0])){a=0;continue}if(3===o[0]&&(!i||o[1]>i[0]&&o[1]<i[3])){a.label=o[1];break}if(6===o[0]&&a.label<i[1]){a.label=i[1],i=o;break}if(i&&a.label<i[2]){a.label=i[2],a.ops.push(o);break}i[2]&&a.ops.pop(),a.trys.pop();continue}o=e.call(t,a)}catch(t){o=[6,t],r=0}finally{n=i=0}if(5&o[0])throw o[1];return{value:o[0]?o[1]:void 0,done:!0}}([o,c])}}};Object.defineProperty(e,"__esModule",{value:!0});var o=n(15),a=function(){function t(t,e,n,r){this.algorithm=t,this.coordinates=e,this.engine=n,this.maxIterations=r}return t.prototype.calculateEscapeDepth=function(t,e){return this.engine.calculateEscapeDepth(this.coordinates.getXCoordinate(t),this.coordinates.getYCoordinate(e))},t.prototype.generate=function(){return r(this,void 0,void 0,(function(){var t=this;return i(this,(function(e){switch(e.label){case 0:return o.preDrawUpdate(this),[4,this.algorithm.draw(0,0,(function(){o.updateRenderStatistics(t)}))];case 1:return e.sent(),[2]}}))}))},t.prototype.getRenderingTime=function(){return this.algorithm.milliseconds},t}();e.Image=a},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(16),i=n(21);e.preDrawUpdate=function(t){console.log("Pre-draw update"),document.getElementById("max-iterations").textContent=t.maxIterations.toString(),document.getElementById("reset").onclick=function(){window.location.search=""};var e=document.getElementById("enlarge");e.onclick=function(){t.engine instanceof i.Julia?window.location.search="set=Julia&algorithm=LineByLine&center="+parseFloat(e.getAttribute("data-xcenter"))+","+parseFloat(e.getAttribute("data-ycenter"))+"&width="+parseFloat(e.getAttribute("data-width"))+"&julia="+e.getAttribute("data-julia"):window.location.search="set="+e.getAttribute("data-set")+"&algorithm="+e.getAttribute("data-algorithm")+"&center="+parseFloat(e.getAttribute("data-xcenter"))+","+parseFloat(e.getAttribute("data-ycenter"))+"&width="+parseFloat(e.getAttribute("data-width"))};var n,r=document.getElementById("magnification"),o=5/t.coordinates.width;n=o<1e6?Math.floor(o):o.toExponential(3),r.textContent=n},e.updateRenderStatistics=function(t){console.log("Updating render statistics"),document.getElementById("rendering-time").textContent=(t.getRenderingTime()/1e3).toPrecision(2)+" sec.",document.getElementById("pixels-per-second").textContent=r.default(1e3*t.coordinates.pixelWidth*t.coordinates.pixelHeight/t.getRenderingTime())}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.default=function(t){var e=Math.abs(t);if(e<1e3)return t.toString();var n=t<0?"-":"",r=Math.floor(Math.log10(e)/3);return n+(e/Math.pow(1e3,r)).toFixed(3)+" "+["","K","M","B","T"][r]}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t){if(this.maxIterations=t,this.maxIterations<1)throw new Error("Invalid number of max iterations: "+this.maxIterations)}return t.prototype.calculateEscapeDepth=function(t,e){for(var n=0,r=0,i=0,o=0,a=0;a<this.maxIterations&&r+o<=4;){var c=2*n*i+e;r=(n=n*n-i*i+t)*n,o=(i=c)*i,a++}return a},t.prototype.toString=function(){return"Mandelbrot[maxIterations="+this.maxIterations+"]"},t}();e.Mandelbrot=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.registerCanvasDoubleClick=function(t,e){t.ondblclick=function(t){var n=e.coordinates.getXCoordinate(t.clientX),r=e.coordinates.getYCoordinate(t.clientY);window.open("index.html?set=Julia&center=0,0&julia="+n+","+r,"_blank")}},e.registerSelectionBoxHandlers=function(t,e){var n=t.getContext("2d"),r=null;t.onmousedown=function(t){null===r&&(console.log("Starting selection box at:",t.clientX,t.clientY),r=[t.clientX,t.clientY,null,null])};var i=document.getElementById("coordinates"),o=document.getElementById("depth");t.onmousemove=function(t){null!==r&&(n.clearRect(0,0,window.innerWidth,window.innerHeight),n.lineWidth=1,n.strokeStyle="#F8F8F8",r[2]=t.clientX,r[3]=t.clientY,n.strokeRect(r[0],r[1],r[2]-r[0],r[3]-r[1]));var a=Math.max(6,Math.floor(3+Math.log10(5/e.coordinates.width)));i.textContent=e.coordinates.getXCoordinate(t.clientX).toFixed(a)+" + "+e.coordinates.getYCoordinate(t.clientY).toFixed(a)+"i",o.textContent=e.calculateEscapeDepth(t.clientX,t.clientY).toString()};var a=document.getElementById("enlarge");t.onmouseup=function(t){console.log("Stopping selection box at:",t.clientX,t.clientY);var n=e.coordinates.getXCoordinate(Math.min(r[0],r[2])),i=e.coordinates.getYCoordinate(Math.min(r[1],r[3])),o=e.coordinates.getXCoordinate(Math.max(r[0],r[2])),c=e.coordinates.getYCoordinate(Math.max(r[1],r[3]));a.setAttribute("data-width",(o-n).toString()),a.setAttribute("data-xcenter",((n+o)/2).toString()),a.setAttribute("data-ycenter",((i+c)/2).toString()),r=null}},e.registerAlgorithmSelect=function(){var t=document.getElementById("enlarge");document.getElementById("algorithm").onchange=function(e){var n=e.target;t.setAttribute("data-algorithm",n[n.selectedIndex].getAttribute("value"))}}},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(1),i=n(20),o=function(){function t(){this.algorithm=r.AlgorithmType.LineByLine,this.set=i.SetType.Mandelbrot,this.centerX=-.5,this.centerY=0,this.juliaX=0,this.juliaY=0,this.width=5}return t.prototype.parseQueryParameters=function(t){var e=t.replace("?","").split("&");console.log("Query parameters",e);for(var n=0;n<e.length;n++){var o=e[n].split("="),a=o[1];switch(o[0]){case"algorithm":this.algorithm=r.AlgorithmType[a];break;case"center":var c=a.split(",");this.centerX=parseFloat(c[0]),this.centerY=parseFloat(c[1]);break;case"julia":var l=a.split(",");this.juliaX=parseFloat(l[0]),this.juliaY=parseFloat(l[1]);break;case"set":this.set=i.SetType[a];break;case"width":this.width=parseFloat(a)}}this.updateUI()},t.prototype.updateUI=function(){document.getElementById("algorithm").value=r.AlgorithmType[this.algorithm];var t=document.getElementById("enlarge");(t.setAttribute("data-set",i.SetType[this.set]),t.setAttribute("data-algorithm",r.AlgorithmType[this.algorithm]),t.setAttribute("data-xcenter",this.centerX.toString()),t.setAttribute("data-ycenter",this.centerY.toString()),t.setAttribute("data-width",this.width.toString()),t.setAttribute("data-julia",this.juliaX.toString()+","+this.juliaY.toString()),this.set===i.SetType.Julia)&&(document.getElementById("title").textContent="The Julia Set")},t}();e.ParameterHandler=o},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),function(t){t[t.Mandelbrot=0]="Mandelbrot",t[t.Julia=1]="Julia"}(e.SetType||(e.SetType={}))},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function t(t,e,n){if(this.cx=t,this.cy=e,this.maxIterations=n,this.maxIterations<1)throw new Error("Invalid number of max iterations: "+this.maxIterations)}return t.prototype.calculateEscapeDepth=function(t,e){for(var n=0,r=t,i=e;n<this.maxIterations&&r*r+i*i<=4;){var o=r*r-i*i;i=2*r*i+this.cy,r=o+this.cx,n++}return n},t.prototype.toString=function(){return"Julia[maxIterations="+this.maxIterations+"]"},t}();e.Julia=r},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(20),i=n(17),o=n(21);e.default=function(t,e,n){return t===r.SetType.Mandelbrot?new i.Mandelbrot(e):new o.Julia(n.juliaX,n.juliaY,e)}}]);