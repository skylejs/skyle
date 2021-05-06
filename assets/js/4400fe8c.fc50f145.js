(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{119:function(e,n,t){"use strict";t.d(n,"a",(function(){return b})),t.d(n,"b",(function(){return m}));var a=t(0),r=t.n(a);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function o(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function c(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?o(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):o(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,a,r=function(e,n){if(null==e)return{};var t,a,r={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(r[t]=e[t]);return r}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(r[t]=e[t])}return r}var u=r.a.createContext({}),s=function(e){var n=r.a.useContext(u),t=n;return e&&(t="function"==typeof e?e(n):c(c({},n),e)),t},b=function(e){var n=s(e.components);return r.a.createElement(u.Provider,{value:n},e.children)},d={inlineCode:"code",wrapper:function(e){var n=e.children;return r.a.createElement(r.a.Fragment,{},n)}},p=r.a.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,o=e.parentName,u=l(e,["components","mdxType","originalType","parentName"]),b=s(t),p=a,m=b["".concat(o,".").concat(p)]||b[p]||d[p]||i;return t?r.a.createElement(m,c(c({ref:n},u),{},{components:t})):r.a.createElement(m,c({ref:n},u))}));function m(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=p;var c={};for(var l in n)hasOwnProperty.call(n,l)&&(c[l]=n[l]);c.originalType=e,c.mdxType="string"==typeof e?e:a,o[1]=c;for(var u=2;u<i;u++)o[u]=t[u];return r.a.createElement.apply(null,o)}return r.a.createElement.apply(null,t)}p.displayName="MDXCreateElement"},87:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return o})),t.d(n,"metadata",(function(){return c})),t.d(n,"toc",(function(){return l})),t.d(n,"default",(function(){return s}));var a=t(3),r=t(7),i=(t(0),t(119)),o={id:"functional-notations",title:"Functional Notations"},c={unversionedId:"features/functional-notations",id:"features/functional-notations",isDocsHomePage:!1,title:"Functional Notations",description:"@see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions",source:"@site/docs/features/functional-notations.mdx",slug:"/features/functional-notations",permalink:"/docs/features/functional-notations",editUrl:"https://github.com/skylejs/skyle/edit/master/docs/docs/features/functional-notations.mdx",version:"current",sidebar:"docs",previous:{title:"Variables, State & Props",permalink:"/docs/features/variables"},next:{title:"Background Images & Gradients",permalink:"/docs/features/backgrounds"}},l=[{value:"Math functions",id:"math-functions",children:[{value:"calc()",id:"calc",children:[]},{value:"clamp()",id:"clamp",children:[]},{value:"min()",id:"min",children:[]},{value:"max()",id:"max",children:[]}]},{value:"Value functions",id:"value-functions",children:[{value:"env()",id:"env",children:[]}]},{value:"Background functions",id:"background-functions",children:[{value:"url()",id:"url",children:[]},{value:"linear-gradient()",id:"linear-gradient",children:[]},{value:"radial-gradient()",id:"radial-gradient",children:[]}]},{value:"Transition functions",id:"transition-functions",children:[{value:"cubic-bezier()",id:"cubic-bezier",children:[]}]}],u={toc:l};function s(e){var n=e.components,t=Object(r.a)(e,["components"]);return Object(i.b)("wrapper",Object(a.a)({},u,t,{components:n,mdxType:"MDXLayout"}),Object(i.b)("blockquote",null,Object(i.b)("p",{parentName:"blockquote"},"@see ",Object(i.b)("a",{parentName:"p",href:"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions"},"https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Functions"))),Object(i.b)("pre",null,Object(i.b)("code",{parentName:"pre",className:"language-ts"},"// Examples\nwidth: 'calc(100% - 100px)',\nfontSize: 'clamp(1rem, 2.5vw, 2rem)',\nheight: 'max(20vw, calc(90% - 400px))',\n")),Object(i.b)("h2",{id:"math-functions"},"Math functions"),Object(i.b)("h3",{id:"calc"},"calc()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"calc()")," function lets you perform calculations when specifying property values."),Object(i.b)("h3",{id:"clamp"},"clamp()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"clamp()")," function clamps a value between an upper and lower bound. clamp() enables selecting a middle value within a range of values between a defined minimum and maximum. It takes three parameters: a minimum value, a preferred value, and a maximum allowed value."),Object(i.b)("h3",{id:"min"},"min()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"min()")," function lets you set the smallest (most negative) value from a list of comma-separated expressions as the value of a property value."),Object(i.b)("h3",{id:"max"},"max()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"max()")," function lets you set the largest (most positive) value from a list of comma-separated expressions as the value of a property value."),Object(i.b)("br",null),Object(i.b)("h2",{id:"value-functions"},"Value functions"),Object(i.b)("h3",{id:"env"},"env()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"env()")," function can be used to insert the value of a defined environment variable."),Object(i.b)("br",null),Object(i.b)("h2",{id:"background-functions"},"Background functions"),Object(i.b)("h3",{id:"url"},"url()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"url()")," function is used to include a file. The parameter is an absolute URL, a relative URL, or a data URI."),Object(i.b)("h3",{id:"linear-gradient"},"linear-gradient()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"linear-gradient()")," function creates an image consisting of a progressive transition between two or more colors along a straight line."),Object(i.b)("h3",{id:"radial-gradient"},"radial-gradient()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"radial-gradient()")," function creates an image consisting of a progressive transition between two or more colors that radiate from an origin. Its shape may be a circle or an ellipse."),Object(i.b)("br",null),Object(i.b)("h2",{id:"transition-functions"},"Transition functions"),Object(i.b)("h3",{id:"cubic-bezier"},"cubic-bezier()"),Object(i.b)("p",null,"The ",Object(i.b)("inlineCode",{parentName:"p"},"cubic-bezier()")," function defines a Cubic Bezier curve for use with transitions."))}s.isMDXComponent=!0}}]);