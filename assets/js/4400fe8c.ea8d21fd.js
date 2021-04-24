(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{114:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return f}));var a=n(0),r=n.n(a);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)n=i[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var u=r.a.createContext({}),s=function(e){var t=r.a.useContext(u),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=s(e.components);return r.a.createElement(u.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},m=r.a.forwardRef((function(e,t){var n=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),p=s(n),m=a,f=p["".concat(o,".").concat(m)]||p[m]||b[m]||i;return n?r.a.createElement(f,c(c({ref:t},u),{},{components:n})):r.a.createElement(f,c({ref:t},u))}));function f(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var i=n.length,o=new Array(i);o[0]=m;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var u=2;u<i;u++)o[u]=n[u];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,n)}m.displayName="MDXCreateElement"},86:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return l})),n.d(t,"default",(function(){return s}));var a=n(3),r=n(7),i=(n(0),n(114)),o={id:"functional-notations",title:"Functional Notations"},c={unversionedId:"features/functional-notations",id:"features/functional-notations",isDocsHomePage:!1,title:"Functional Notations",description:"@see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions",source:"@site/docs/features/functional-notations.mdx",slug:"/features/functional-notations",permalink:"/docs/features/functional-notations",editUrl:"https://github.com/skylejs/skyle/edit/master/docs/docs/features/functional-notations.mdx",version:"current",sidebar:"docs",previous:{title:"Variables, State & Props",permalink:"/docs/features/variables"},next:{title:"Aliases",permalink:"/docs/features/aliases"}},l=[{value:"Math functions",id:"math-functions",children:[{value:"calc()",id:"calc",children:[]},{value:"clamp()",id:"clamp",children:[]},{value:"min()",id:"min",children:[]},{value:"max()",id:"max",children:[]}]},{value:"Transition functions",id:"transition-functions",children:[{value:"cubic-bezier()",id:"cubic-bezier",children:[]}]}],u={toc:l};function s(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},u,n,{components:t,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"@see ",Object(i.b)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions"},"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions"))),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-ts"},"// Examples\nwidth: 'calc(100% - 100px)',\nfontSize: 'clamp(1rem, 2.5vw, 2rem)',\nheight: 'max(20vw, calc(90% - 400px))',\n")),Object(i.b)("h2",{id:"math-functions"},"Math functions"),Object(i.b)("h3",{id:"calc"},"calc()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"calc()")," function lets you perform calculations when specifying property values."),Object(i.b)("h3",{id:"clamp"},"clamp()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"clamp()")," function clamps a value between an upper and lower bound. clamp() enables selecting a middle value within a range of values between a defined minimum and maximum. It takes three parameters: a minimum value, a preferred value, and a maximum allowed value."),Object(i.b)("h3",{id:"min"},"min()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"min()")," function lets you set the smallest (most negative) value from a list of comma-separated expressions as the value of a property value."),Object(i.b)("h3",{id:"max"},"max()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"max()")," function lets you set the largest (most positive) value from a list of comma-separated expressions as the value of a property value."),Object(i.b)("h2",{id:"transition-functions"},"Transition functions"),Object(i.b)("h3",{id:"cubic-bezier"},"cubic-bezier()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"cubic-bezier()")," function defines a Cubic Bezier curve for use with transitions."))}s.isMDXComponent=!0}}]);