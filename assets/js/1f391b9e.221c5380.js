(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{134:function(e,t,n){"use strict";var a=n(0),r=n.n(a),c=n(115);var l=function(e,t,n){var r=Object(a.useState)(void 0),c=r[0],l=r[1];Object(a.useEffect)((function(){function a(){var a=function(){var e=Array.from(document.getElementsByClassName("anchor")),t=e.find((function(e){return e.getBoundingClientRect().top>=n}));if(t){if(t.getBoundingClientRect().top>=n){var a=e[e.indexOf(t)-1];return null!=a?a:t}return t}return e[e.length-1]}();if(a)for(var r=0,o=!1,i=document.getElementsByClassName(e);r<i.length&&!o;){var s=i[r],m=s.href,d=decodeURIComponent(m.substring(m.indexOf("#")+1));a.id===d&&(c&&c.classList.remove(t),s.classList.add(t),l(s),o=!0),r+=1}}return document.addEventListener("scroll",a),document.addEventListener("resize",a),a(),function(){document.removeEventListener("scroll",a),document.removeEventListener("resize",a)}}))},o=n(57),i=n.n(o),s="table-of-contents__link";function m(e){var t=e.toc,n=e.isChild;return t.length?r.a.createElement("ul",{className:n?"":"table-of-contents table-of-contents__left-border"},t.map((function(e){return r.a.createElement("li",{key:e.id},r.a.createElement("a",{href:"#"+e.id,className:s,dangerouslySetInnerHTML:{__html:e.value}}),r.a.createElement(m,{isChild:!0,toc:e.children}))}))):null}t.a=function(e){var t=e.toc;return l(s,"table-of-contents__link--active",100),r.a.createElement("div",{className:Object(c.a)(i.a.tableOfContents,"thin-scrollbar")},r.a.createElement(m,{toc:t}))}},80:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(126),l=n(114),o=n(155),i=n(134);t.default=function(e){var t=e.content,n=t.frontMatter,a=t.metadata,s=n.title,m=n.description,d=n.wrapperClassName,u=n.hide_table_of_contents,f=a.permalink;return r.a.createElement(c.a,{title:s,description:m,permalink:f,wrapperClassName:d},r.a.createElement("main",null,r.a.createElement("div",{className:"container container--fluid"},r.a.createElement("div",{className:"margin-vert--lg padding-vert--lg"},r.a.createElement("div",{className:"row"},r.a.createElement("div",{className:"col col--8 col--offset-2"},r.a.createElement("div",{className:"container"},r.a.createElement(l.a,{components:o.a},r.a.createElement(t,null)))),!u&&t.toc&&r.a.createElement("div",{className:"col col--2"},r.a.createElement(i.a,{toc:t.toc})))))))}}}]);