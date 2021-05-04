(window.webpackJsonp=window.webpackJsonp||[]).push([[7],{119:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return g}));var a=t(0),r=t.n(a);function o(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){o(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)t=o[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var d=r.a.createContext({}),s=function(e){var n=r.a.useContext(d),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},b=function(e){var n=s(e.components);return r.a.createElement(d.Provider,{value:n},e.children)},u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},p=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,d=l(e,["components","mdxType","originalType","parentName"]),b=s(t),p=a,g=b["".concat(i,".").concat(p)]||b[p]||u[p]||o;return t?r.a.createElement(g,c(c({ref:n},d),{},{components:t})):r.a.createElement(g,c({ref:n},d))}));function g(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var o=t.length,i=new Array(o);i[0]=p;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,i[1]=c;for(var d=2;d<o;d++)i[d]=t[d];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},72:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return l})),t.d(n,"default",(function(){return s}));var a=t(3),r=t(7),o=(t(0),t(119)),i={id:"backgrounds",title:"Background Images & Gradients"},c={unversionedId:"features/backgrounds",id:"features/backgrounds",isDocsHomePage:!1,title:"Background Images & Gradients",description:"You can use background-image properties to",source:"@site/docs/features/backgrounds.mdx",slug:"/features/backgrounds",permalink:"/docs/features/backgrounds",editUrl:"https://github.com/skylejs/skyle/edit/master/docs/docs/features/backgrounds.mdx",version:"current",sidebar:"docs",previous:{title:"Functional Notations",permalink:"/docs/features/functional-notations"},next:{title:"Pointer-Events",permalink:"/docs/features/pointer-events"}},l=[{value:"Background Image",id:"background-image",children:[]},{value:"Linear Gradient",id:"linear-gradient",children:[]},{value:"Radial Gradient",id:"radial-gradient",children:[]}],d={toc:l};function s(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(o.b)("wrapper",Object(a.a)({},d,t,{components:n,mdxType:"MDXLayout"}),Object(o.b)("p",null,"You can use background-image properties to"),Object(o.b)("h3",{id:"background-image"},"Background Image"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"@see ",Object(o.b)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/background"},"https://developer.mozilla.org/en-US/docs/Web/CSS/background"))),Object(o.b)("p",null,"Using the ",Object(o.b)("inlineCode",{parentName:"p"},"background-image")," property or the shorthand ",Object(o.b)("inlineCode",{parentName:"p"},"background")," property, you can easily set multiple ",Object(o.b)("inlineCode",{parentName:"p"},"ImageBackground"),"s and gradients for components. Under the hood, gradients use ",Object(o.b)("a",{parentName:"p",href:"https://github.com/react-native-svg/react-native-svg"},"react-native-svg"),"."),Object(o.b)("p",null,"The background images are drawn on stacking context layers on top of each other. The first layer specified is drawn as if it is closest to the user."),Object(o.b)("h4",{id:"syntax"},"Syntax"),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"// Single external image.\nbackgroundImage: 'url(./assets/image.png)',\n\n// Single local image.\nbackgroundImage: `url(${require('./assets/image.jpg')})`,\nbackgroundRepeat: 'no-repeat',\n\n// Shorthand\nbackground: 'background: left 5% / 15% 60% repeat-x url(\"../../media/image.png\")',\n")),Object(o.b)("div",{className:"admonition admonition-info alert alert--info"},Object(o.b)("div",{parentName:"div",className:"admonition-heading"},Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",{parentName:"h5",className:"admonition-icon"},Object(o.b)("svg",{parentName:"span",xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"},Object(o.b)("path",{parentName:"svg",fillRule:"evenodd",d:"M7 2.3c3.14 0 5.7 2.56 5.7 5.7s-2.56 5.7-5.7 5.7A5.71 5.71 0 0 1 1.3 8c0-3.14 2.56-5.7 5.7-5.7zM7 1C3.14 1 0 4.14 0 8s3.14 7 7 7 7-3.14 7-7-3.14-7-7-7zm1 3H6v5h2V4zm0 6H6v2h2v-2z"}))),"info")),Object(o.b)("div",{parentName:"div",className:"admonition-content"},Object(o.b)("p",{parentName:"div"},"Depending on your setup, you might need to use ",Object(o.b)("inlineCode",{parentName:"p"},"require('...').default")," for local images instead."))),Object(o.b)("br",null),Object(o.b)("br",null),Object(o.b)("hr",null),Object(o.b)("h3",{id:"linear-gradient"},"Linear Gradient"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"@see ",Object(o.b)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient()"},"https://developer.mozilla.org/en-US/docs/Web/CSS/linear-gradient()"))),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"// Examples\n\n// Single\nbackgroundImage: 'linear-gradient(#e66465, #9198e5)';\n\n// Multiple\nbackgroundImage: `linear-gradient(217deg, rgba(255,0,0,.8), rgba(255,0,0,0) 70.71%),\n                  linear-gradient(127deg, rgba(0,255,0,.8), rgba(0,255,0,0) 70.71%),\n                  linear-gradient(336deg, rgba(0,0,255,.8), rgba(0,0,255,0) 70.71%)`;\n")),Object(o.b)("h3",{id:"radial-gradient"},"Radial Gradient"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"@see ",Object(o.b)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient()"},"https://developer.mozilla.org/en-US/docs/Web/CSS/radial-gradient()"))),Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"// Examples\n\n// Single\nbackgroundImage: 'radial-gradient(#e66465, #9198e5)';\n\n// Multiple\nbackgroundImage: `radial-gradient(ellipse at top, #e66465, transparent),\n                  radial-gradient(ellipse at bottom, #4d9f0c, transparent)`;\n")))}s.isMDXComponent=!0}}]);