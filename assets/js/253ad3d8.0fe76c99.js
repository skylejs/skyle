(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{114:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return f}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function p(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?p(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):p(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),i=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s(s({},t),e)),n},u=function(e){var t=i(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,p=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),u=i(n),d=r,f=u["".concat(p,".").concat(d)]||u[d]||b[d]||a;return n?o.a.createElement(f,s(s({ref:t},l),{},{components:n})):o.a.createElement(f,s({ref:t},l))}));function f(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,p=new Array(a);p[0]=d;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,p[1]=s;for(var l=2;l<a;l++)p[l]=n[l];return o.a.createElement.apply(null,p)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"},81:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return p})),n.d(t,"metadata",(function(){return s})),n.d(t,"toc",(function(){return c})),n.d(t,"default",(function(){return i}));var r=n(3),o=n(7),a=(n(0),n(114)),p={id:"spread-props",title:"Spread Props"},s={unversionedId:"features/spread-props",id:"features/spread-props",isDocsHomePage:!1,title:"Spread Props",description:"Some components have multiple props used for styling. For example, react-native-paper's Button component has a style prop, a labelStyle prop, a color prop, etc. This library allows you to style all of them at once as shown below.",source:"@site/docs/features/spread-props.mdx",slug:"/features/spread-props",permalink:"/docs/features/spread-props",editUrl:"https://github.com/skylejs/skyle/edit/master/docs/docs/features/spread-props.mdx",version:"current",sidebar:"docs",previous:{title:"Pointer-Events",permalink:"/docs/features/pointer-events"},next:{title:"Media Queries",permalink:"/docs/features/media-queries"}},c=[],l={toc:c};function i(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Some components have multiple props used for styling. For example, ",Object(a.b)("inlineCode",{parentName:"p"},"react-native-paper"),"'s Button component has a ",Object(a.b)("inlineCode",{parentName:"p"},"style")," prop, a ",Object(a.b)("inlineCode",{parentName:"p"},"labelStyle")," prop, a ",Object(a.b)("inlineCode",{parentName:"p"},"color")," prop, etc. This library allows you to style all of them at once as shown below."),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"@ref ",Object(a.b)("a",{parentName:"p",href:"https://callstack.github.io/react-native-paper/button.html"},"https://callstack.github.io/react-native-paper/button.html"))),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-ts"},"...\nimport { Button } from 'react-native-paper';\n\n@styled\nclass MyComponent extends Component {\n  styles = styles;\n\n  render() {\n    return (\n      // Spread the style!\n      <Button {...this.styles.button} />\n    );\n  }\n}\n\n// Define props inside styles!\nconst styles = StyleSheet((o) => {\n  button: {\n    style: {\n      backgroundColor: 'orange',\n    },\n    labelStyle: {\n      fontSize: 25,\n      fontWeight: 'bold',\n    },\n    color: 'white',\n  }\n});\n")))}i.isMDXComponent=!0}}]);