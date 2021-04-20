(window.webpackJsonp=window.webpackJsonp||[]).push([[37],{108:function(e,t,r){"use strict";r.r(t),r.d(t,"frontMatter",(function(){return c})),r.d(t,"metadata",(function(){return s})),r.d(t,"toc",(function(){return i})),r.d(t,"default",(function(){return p}));var n=r(3),a=r(7),o=(r(0),r(114)),c={id:"basic",title:"Basic Example",sidebar_label:"Basic"},s={unversionedId:"examples/basic",id:"examples/basic",isDocsHomePage:!1,title:"Basic Example",description:"`SnackPlayer name=Basic&description=Skyle%20Basic%20Example&dependencies=skyle",source:"@site/docs/examples/basic.mdx",slug:"/examples/basic",permalink:"/docs/examples/basic",editUrl:"https://github.com/skylejs/skyle/edit/master/docs/docs/examples/basic.mdx",version:"current",sidebar_label:"Basic",sidebar:"docs",previous:{title:"Preprocessors",permalink:"/docs/features/preprocessors"},next:{title:"Transitions",permalink:"/docs/examples/transitions"}},i=[],l={toc:i};function p(e){var t=e.components,r=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(n.a)({},l,r,{components:t,mdxType:"MDXLayout"}),Object(o.b)("div",{className:"snack-player","data-snack-name":"Basic","data-snack-description":"Skyle Basic Example","data-snack-code":"import%20React%20from%20'react'%3B%0Aimport%20%7B%20useStyles%2C%20StyleSheet%2C%20View%20%7D%20from%20'skyle'%3B%0A%0Aconst%20App%20%3D%20(props)%20%3D%3E%20%7B%0A%20%20const%20s%20%3D%20useStyles(styles)%3B%0A%0A%20%20return%20%3CView%20style%3D%7Bs.view%7D%20%2F%3E%3B%0A%7D%3B%0A%0Aconst%20styles%20%3D%20StyleSheet.create((o)%20%3D%3E%20(%7B%0A%20%20view%3A%20%7B%0A%20%20%20%20backgroundColor%3A%20o.theme.colors.primary%2C%0A%20%20%20%20transition%3A%20%5B'backgroundColor'%2C%20500%5D%2C%0A%20%20%7D%2C%0A%7D))%3B%0A%0Aexport%20default%20App%3B","data-snack-dependencies":"skyle","data-snack-platform":"web","data-snack-supported-platforms":"ios,android,web","data-snack-theme":"light","data-snack-preview":"true","data-snack-loading":"lazy"}))}p.isMDXComponent=!0},114:function(e,t,r){"use strict";r.d(t,"a",(function(){return u})),r.d(t,"b",(function(){return f}));var n=r(0),a=r.n(n);function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function c(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function s(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?c(Object(r),!0).forEach((function(t){o(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):c(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},o=Object.keys(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(n=0;n<o.length;n++)r=o[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var l=a.a.createContext({}),p=function(e){var t=a.a.useContext(l),r=t;return e&&(r="function"==typeof e?e(t):s(s({},t),e)),r},u=function(e){var t=p(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},m=a.a.forwardRef((function(e,t){var r=e.components,n=e.mdxType,o=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=p(r),m=n,f=u["".concat(c,".").concat(m)]||u[m]||d[m]||o;return r?a.a.createElement(f,s(s({ref:t},l),{},{components:r})):a.a.createElement(f,s({ref:t},l))}));function f(e,t){var r=arguments,n=t&&t.mdxType;if("string"==typeof e||n){var o=r.length,c=new Array(o);c[0]=m;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:n,c[1]=s;for(var l=2;l<o;l++)c[l]=r[l];return a.a.createElement.apply(null,c)}return a.a.createElement.apply(null,r)}m.displayName="MDXCreateElement"}}]);