(window.webpackJsonp=window.webpackJsonp||[]).push([[39],{110:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return i})),r.d(t,"toc",(function(){return l})),r.d(t,"default",(function(){return u}));var n=r(3),a=r(7),o=(r(0),r(114)),c={id:"default",title:"Skyle"},i={unversionedId:"api/default",id:"api/default",isDocsHomePage:!1,title:"Skyle",description:"The default export includes many methods for customizing Skyle's internals.",source:"@site/docs/api/default.mdx",slug:"/api/default",permalink:"/docs/api/default",editUrl:"https://github.com/skylejs/skyle/edit/master/docs/docs/api/default.mdx",version:"current",sidebar:"docs",previous:{title:"Variables",permalink:"/docs/examples/variables"},next:{title:"styled",permalink:"/docs/api/decorator"}},l=[{value:"Methods",id:"methods",children:[{value:"configure",id:"configure",children:[]},{value:"setPreprocessor",id:"setpreprocessor",children:[]},{value:"addAlias",id:"addalias",children:[]},{value:"removeAlias",id:"removealias",children:[]}]}],s={toc:l};function u(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},s,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"The default export includes many methods for customizing Skyle's internals."),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"import Skyle from 'skyle';\n")),Object(o.b)("h2",{id:"methods"},"Methods"),Object(o.b)("h3",{id:"configure"},"configure"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"function configure(options?: object): void;\n")),Object(o.b)("hr",null),Object(o.b)("h3",{id:"setpreprocessor"},"setPreprocessor"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"function setPreprocessor(preprocessors: object): void;\n")),Object(o.b)("hr",null),Object(o.b)("h3",{id:"addalias"},"addAlias"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"function addAlias(aliases: object): void;\n")),Object(o.b)("h3",{id:"removealias"},"removeAlias"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"function removeAlias(aliases: object): void;\n")))}u.isMDXComponent=!0},114:function(e,t,r){"use strict";r.d(t,"a",(function(){return p})),r.d(t,"b",(function(){return f}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function i(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function l(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var s=a.a.createContext({}),u=function(e){var t=a.a.useContext(s),r=t;return e&&(r="function"==typeof e?e(t):i(i({},t),e)),r},p=function(e){var t=u(e.components);return a.a.createElement(s.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=u(r),b=n,f=p["".concat(c,".").concat(b)]||p[b]||d[b]||o;return r?a.a.createElement(f,i(i({ref:t},s),{},{components:r})):a.a.createElement(f,i({ref:t},s))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,c=new Array(o);c[0]=b;var i={};for(var l in t)hasOwnProperty.call(t,l)&&(i[l]=t[l]);i.originalType=e,i.mdxType="string"==typeof e?e:n,c[1]=i;for(var s=2;s<o;s++)c[s]=r[s];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,r)}b.displayName="MDXCreateElement"}}]);