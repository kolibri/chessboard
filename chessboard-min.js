window.onload=function(){var e=function(e,t,a){for(var n=0;n<e.length;n++)t.call(a,n,e[n])},t=function(e){function t(){for(y in c)for(x in l){var e=l[x]+c[y],t=L.querySelector("."+e),a=g.get(e);t.classList.remove("wk","wq","wr","wb","wn","wp","bk","bq","br","bb","bn","bp"),a&&a.color&&a.type&&t.classList.add(a.color+a.type)}}function a(e){var t="";return t=0<=e.flags.indexOf("k")?"O-O":0<=e.flags.indexOf("q")?"O-O-O":("p"!=e.piece?e.piece.toUpperCase():"")+e.from+(0<=e.flags.indexOf("c")||0<=e.flags.indexOf("e")?"x":"-")+e.to+(0<=e.flags.indexOf("e")?"ep":"")+(0<=e.flags.indexOf("p")?e.promotion:""),0<=e.san.indexOf("+")&&(t+="+"),0<=e.san.indexOf("#")&&(t+="#"),t}function d(){L=document.createElement("div"),L.classList.add("board"),p.appendChild(L);var e="black";for(y in c){var t=document.createElement("div");for(x in l){var a=document.createElement("div"),n=l[x]+c[y];a.classList.add("field"),a.classList.add(n),a.classList.add(e),e="white"==e?"black":"white",t.appendChild(a)}e="white"==e?"black":"white",L.appendChild(t)}}function o(){var e=document.createElement("dl");p.appendChild(e),e.classList.add("info");var t=g.header();console.log(t,E);for(filterName in E){var a=E[filterName],n=document.createElement("dt");n.appendChild(document.createTextNode(a));var d=document.createElement("dd");d.appendChild(document.createTextNode(t[a])),e.appendChild(n),e.appendChild(d)}}function s(){var e=document.createElement("ol");e.classList.add("moves");for(m in O){if("w"==O[m].color){var n=document.createElement("li");e.appendChild(n)}var d=document.createElement("span");d.dataset.move=m,d.addEventListener("click",function(){r(parseInt(this.dataset.move)+1),t()}),k-1==d.dataset.move&&d.classList.add("current"),d.appendChild(document.createTextNode(a(O[m]))),n.appendChild(d)}p.appendChild(e)}function i(){function e(e,t){var n=document.createElement("button");n.appendChild(document.createTextNode(e)),n.addEventListener("click",t),a.appendChild(n)}var a=document.createElement("div");a.classList.add("buttons"),p.appendChild(a),e(w,function(){g.reset(),t(L,g),k=0}),e(b,function(){!k>0||(g.undo(),k-=1,t(L,g))}),e(v,function(){r(k+1),t(L,g)})}function r(e){if(!(e>O.length)){for(g.reset(),n=0;n<e;n++)g.move(O[n]);k=e}}var l=["a","b","c","d","e","f","g","h"],c=[8,7,6,5,4,3,2,1],p=e,f=!p.dataset.showMoves||"true"===p.dataset.showMoves,u=!p.dataset.showHeader||"true"===p.dataset.showHeader,h=!p.dataset.showButtons||"true"===p.dataset.showButtons,v=p.dataset.labelNext?p.dataset.labelNext:"next",b=p.dataset.labelBack?p.dataset.labelBack:"back",w=p.dataset.labelReset?p.dataset.labelReset:"reset",C=!!p.dataset.ply&&parseInt(p.dataset.ply),E=p.dataset.headers?p.dataset.headers.split(","):["White","Black","Date","Event","Result"],g=new Chess,L=document.createElement("div");if(g.load_pgn(p.innerHTML.trim())){p.innerHTML="";var O=g.history({verbose:!0}),k=!1!==C?C:O.length;this.render=function(){1==u&&o(),r(k),d(),t(),1==f&&s(),1==h&&i()}}};e(document.querySelectorAll(".pgn"),function(e,a){board=new t(a),board.render()})};