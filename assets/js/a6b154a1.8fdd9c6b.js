(window.webpackJsonp=window.webpackJsonp||[]).push([[31],{101:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return o})),n.d(t,"metadata",(function(){return c})),n.d(t,"toc",(function(){return i})),n.d(t,"default",(function(){return u}));var r=n(3),a=n(7),s=(n(0),n(119)),o={id:"use-styles",title:"useStyles"},c={unversionedId:"api/use-styles",id:"api/use-styles",isDocsHomePage:!1,title:"useStyles",description:"useStyles is a React hook for retrieving computed styles for use in any component. The first argument should pass a StyleSheet and the second argument is an object used for passing variables, state & props.",source:"@site/docs/api/use-styles.mdx",slug:"/api/use-styles",permalink:"/docs/api/use-styles",editUrl:"https://github.com/skylejs/skyle/edit/master/docs/docs/api/use-styles.mdx",version:"current",sidebar:"docs",previous:{title:"matchMedia",permalink:"/docs/api/match-media"},next:{title:"useTheme",permalink:"/docs/api/use-theme"}},i=[],l={toc:i};function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(s.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(s.b)("p",null,Object(s.b)("inlineCode",{parentName:"p"},"useStyles")," is a React hook for retrieving computed styles for use in any component. The first argument should pass a ",Object(s.b)("a",{parentName:"p",href:"/docs/api/stylesheet"},"StyleSheet")," and the second argument is an object used for passing ",Object(s.b)("a",{parentName:"p",href:"/docs/features/variables"},"variables, state & props"),"."),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"const s = useStyles(styles, { someVar: value });\n\nconsole.log(s);\n")),Object(s.b)("p",null,"Syntax:"),Object(s.b)("pre",null,Object(s.b)("code",{parentName:"pre",className:"language-ts"},"function useStyles(styles: StyleSheet, variables?: object): StyleSheetStyles\n")))}u.isMDXComponent=!0},119:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var r=n(0),a=n.n(r);function s(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function o(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?o(Object(n),!0).forEach((function(t){s(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):o(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},s=Object.keys(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(e);for(r=0;r<s.length;r++)n=s[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},p=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},y={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},f=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,s=e.originalType,o=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),p=u(n),f=r,d=p["".concat(o,".").concat(f)]||p[f]||y[f]||s;return n?a.a.createElement(d,c(c({ref:t},l),{},{components:n})):a.a.createElement(d,c({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var s=n.length,o=new Array(s);o[0]=f;var c={};for(var i in t)hasOwnProperty.call(t,i)&&(c[i]=t[i]);c.originalType=e,c.mdxType="string"==typeof e?e:r,o[1]=c;for(var l=2;l<s;l++)o[l]=n[l];return a.a.createElement.apply(null,o)}return a.a.createElement.apply(null,n)}f.displayName="MDXCreateElement"}}]);