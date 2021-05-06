(window.webpackJsonp=window.webpackJsonp||[]).push([[20],{119:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function l(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function o(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?l(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):l(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var s=a.a.createContext({}),p=function(e){var t=a.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):o(o({},t),e)),n},u=function(e){var t=p(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,l=e.parentName,s=c(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,m=u["".concat(l,".").concat(d)]||u[d]||b[d]||i;return n?a.a.createElement(m,o(o({ref:t},s),{},{components:n})):a.a.createElement(m,o({ref:t},s))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,l=new Array(i);l[0]=d;var o={};for(var c in t)hasOwnProperty.call(t,c)&&(o[c]=t[c]);o.originalType=e,o.mdxType="string"==typeof e?e:r,l[1]=o;for(var s=2;s<i;s++)l[s]=n[s];return a.a.createElement.apply(null,l)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},90:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return l})),n.d(t,"metadata",(function(){return o})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return p}));var r=n(3),a=n(7),i=(n(0),n(119)),l={id:"aliases",title:"Aliases"},o={unversionedId:"features/aliases",id:"features/aliases",isDocsHomePage:!1,title:"Aliases",description:"You can easily add/remove aliases using the addAlias and removeAlias functions.",source:"@site/docs/features/aliases.mdx",slug:"/features/aliases",permalink:"/docs/features/aliases",editUrl:"https://github.com/skylejs/skyle/edit/master/docs/docs/features/aliases.mdx",version:"current",sidebar:"docs",previous:{title:"Length Units",permalink:"/docs/features/units"},next:{title:"Theming",permalink:"/docs/features/theming"}},c=[{value:"Default Aliases",id:"default-aliases",children:[]}],s={toc:c};function p(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(i.b)("wrapper",Object(r.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("p",null,"You can easily add/remove aliases using the ",Object(i.b)("inlineCode",{parentName:"p"},"addAlias")," and ",Object(i.b)("inlineCode",{parentName:"p"},"removeAlias")," functions."),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-ts"},"Skyle.addAlias({\n  property1: 'alias1',\n  // Use array for multiple\n  property2: ['alias2', 'alias3'],\n  ...\n});\n\nSkyle.removeAlias({\n  property1: 'alias1',\n  ...\n});\n")),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-ts"},"// Example\nSkyle.addAlias({\n  color: 'textColor'\n});\n\n/// Use in StyleSheet\ntextColor: 'red',\n")),Object(i.b)("h3",{id:"default-aliases"},"Default Aliases"),Object(i.b)("table",null,Object(i.b)("thead",{parentName:"table"},Object(i.b)("tr",{parentName:"thead"},Object(i.b)("th",{parentName:"tr",align:null},"Property"),Object(i.b)("th",{parentName:"tr",align:"center"},"Aliases"))),Object(i.b)("tbody",{parentName:"table"},Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"paddingHorizontal"),Object(i.b)("td",{parentName:"tr",align:"center"},"paddingX")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"paddingVertical"),Object(i.b)("td",{parentName:"tr",align:"center"},"paddingY")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"marginHorizontal"),Object(i.b)("td",{parentName:"tr",align:"center"},"marginX")),Object(i.b)("tr",{parentName:"tbody"},Object(i.b)("td",{parentName:"tr",align:null},"marginVertical"),Object(i.b)("td",{parentName:"tr",align:"center"},"marginY")))))}p.isMDXComponent=!0}}]);