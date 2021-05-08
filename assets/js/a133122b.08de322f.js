(window.webpackJsonp=window.webpackJsonp||[]).push([[30],{100:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return p}));var r=n(3),o=n(7),a=(n(0),n(122)),s=n(131),i=n(132),c={id:"theming",title:"Theming"},l={unversionedId:"features/theming",id:"features/theming",isDocsHomePage:!1,title:"Theming",description:"Skyle provides a theming system for extensive styling. You can customize the theme by passing it through the Provider.",source:"@site/docs/features/theming.mdx",slug:"/features/theming",permalink:"/docs/features/theming",editUrl:"https://github.com/skylejs/skyle/edit/master/docs/docs/features/theming.mdx",version:"current",sidebar:"docs",previous:{title:"Aliases",permalink:"/docs/features/aliases"},next:{title:"Variables, State & Props",permalink:"/docs/features/variables"}},u=[{value:"Configure with Provider",id:"configure-with-provider",children:[]},{value:"Using the Theme",id:"using-the-theme",children:[{value:"Inside StyleSheets",id:"inside-stylesheets",children:[]},{value:"Inside Components",id:"inside-components",children:[]}]},{value:"TypeScript",id:"typescript",children:[]}],m={toc:u};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},m,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Skyle provides a theming system for extensive styling. You can customize the theme by passing it through the Provider.\nIt automatically updates on change!"),Object(a.b)("h2",{id:"configure-with-provider"},"Configure with Provider"),Object(a.b)("p",null,Object(a.b)("a",{parentName:"p",href:"/docs/usage/provider"},"Detailed overview")),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-ts"},"...\nimport { Provider as StyleProvider } from 'skyle';\n\nconst myTheme = {\n  colors: {\n    primary: 'red',\n    myCustomColor: 'blue',\n  }\n}\n\n// Your root component\nclass App extends Component {\n  render() {\n    return (\n      <StyleProvider value={myTheme}>\n        // your app's content\n      </StyleProvider>\n    )\n  }\n}\n")),Object(a.b)("h2",{id:"using-the-theme"},"Using the Theme"),Object(a.b)("h3",{id:"inside-stylesheets"},"Inside StyleSheets"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-ts"},"// Theme is automatically passed down when using a function inside your StyleSheet.\nconst styles = StyleSheet.create((o) => ({\n  view: {\n    backgroundColor: o.theme.colors.primary,\n  },\n}));\n")),Object(a.b)("h3",{id:"inside-components"},"Inside Components"),Object(a.b)(s.a,{defaultValue:"class",values:[{label:"Class Component",value:"class"},{label:"Functional Component",value:"function"},{label:"Consumer (both)",value:"consumer"}],mdxType:"Tabs"},Object(a.b)(i.a,{value:"class",mdxType:"TabItem"},Object(a.b)("p",null,"The theme is passed through the ",Object(a.b)("inlineCode",{parentName:"p"},"theme")," prop when using the ",Object(a.b)("inlineCode",{parentName:"p"},"@styled")," decorator."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-ts"},"...\n\n@styled\nclass MyComponent extends Component {\n  styles = styles;\n\n  render() {\n    const { theme } = this.props;\n\n    return <Button title='Click me!' color={theme.colors.button} />;\n  }\n}\n"))),Object(a.b)(i.a,{value:"function",mdxType:"TabItem"},Object(a.b)("p",null,"You can use the ",Object(a.b)("inlineCode",{parentName:"p"},"useTheme")," hook to access the theme."),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-ts"},"...\nimport { useStyles, useTheme, StyleSheet, View } from 'skyle';\n\nconst MyComponent = (props) => {\n  const s = useStyles(styles);\n  const theme = useTheme();\n\n  return <Button title='Click me!' color={theme.colors.button} />;\n};\n"))),Object(a.b)(i.a,{value:"consumer",mdxType:"TabItem"},Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"@see ",Object(a.b)("a",{parentName:"p",href:"https://reactjs.org/docs/context.html#contextconsumer"},"https://reactjs.org/docs/context.html#contextconsumer"))),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-ts"},"import { Consumer as StyleConsumer } from 'skyle';\n\n// Use it in your components.\n<StyleConsumer>{(theme) => <Button title='Click me!' color={theme.colors.button} />}</StyleConsumer>;\n")))),Object(a.b)("h2",{id:"typescript"},"TypeScript"),Object(a.b)("p",null,"You can define a theme type by extending skyle's type declarations with your own declarations file:"),Object(a.b)("pre",null,Object(a.b)("code",{parentName:"pre",className:"language-ts"},"import 'skyle';\n\ndeclare module 'skyle' {\n  export interface Theme {\n    color: {\n      myCustomColor: string;\n    };\n  }\n}\n")))}p.isMDXComponent=!0},122:function(e,t,n){"use strict";n.d(t,"a",(function(){return m})),n.d(t,"b",(function(){return d}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),u=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},m=function(e){var t=u(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},p={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},b=o.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),m=u(n),b=r,d=m["".concat(s,".").concat(b)]||m[b]||p[b]||a;return n?o.a.createElement(d,i(i({ref:t},l),{},{components:n})):o.a.createElement(d,i({ref:t},l))}));function d(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,s=new Array(a);s[0]=b;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var l=2;l<a;l++)s[l]=n[l];return o.a.createElement.apply(null,s)}return o.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},123:function(e,t,n){"use strict";function r(e){var t,n,o="";if("string"==typeof e||"number"==typeof e)o+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(o&&(o+=" "),o+=n);else for(t in e)e[t]&&(o&&(o+=" "),o+=t);return o}t.a=function(){for(var e,t,n=0,o="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(o&&(o+=" "),o+=t);return o}},126:function(e,t,n){"use strict";var r=n(0),o=n(127);t.a=function(){var e=Object(r.useContext)(o.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},127:function(e,t,n){"use strict";var r=n(0),o=Object(r.createContext)(void 0);t.a=o},131:function(e,t,n){"use strict";var r=n(0),o=n.n(r),a=n(126),s=n(123),i=n(56),c=n.n(i);var l=37,u=39;t.a=function(e){var t=e.lazy,n=e.block,i=e.defaultValue,m=e.values,p=e.groupId,b=e.className,d=Object(a.a)(),h=d.tabGroupChoices,f=d.setTabGroupChoices,y=Object(r.useState)(i),v=y[0],g=y[1],O=r.Children.toArray(e.children),j=[];if(null!=p){var C=h[p];null!=C&&C!==v&&m.some((function(e){return e.value===C}))&&g(C)}var w=function(e){var t=e.target,n=j.indexOf(t),r=O[n].props.value;g(r),null!=p&&(f(p,r),setTimeout((function(){var e,n,r,o,a,s,i,l;(e=t.getBoundingClientRect(),n=e.top,r=e.left,o=e.bottom,a=e.right,s=window,i=s.innerHeight,l=s.innerWidth,n>=0&&a<=l&&o<=i&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(c.a.tabItemActive),setTimeout((function(){return t.classList.remove(c.a.tabItemActive)}),2e3))}),150))},x=function(e){var t,n;switch(e.keyCode){case u:var r=j.indexOf(e.target)+1;n=j[r]||j[0];break;case l:var o=j.indexOf(e.target)-1;n=j[o]||j[j.length-1]}null===(t=n)||void 0===t||t.focus()};return o.a.createElement("div",{className:"tabs-container"},o.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(s.a)("tabs",{"tabs--block":n},b)},m.map((function(e){var t=e.value,n=e.label;return o.a.createElement("li",{role:"tab",tabIndex:v===t?0:-1,"aria-selected":v===t,className:Object(s.a)("tabs__item",c.a.tabItem,{"tabs__item--active":v===t}),key:t,ref:function(e){return j.push(e)},onKeyDown:x,onFocus:w,onClick:w},n)}))),t?Object(r.cloneElement)(O.filter((function(e){return e.props.value===v}))[0],{className:"margin-vert--md"}):o.a.createElement("div",{className:"margin-vert--md"},O.map((function(e,t){return Object(r.cloneElement)(e,{key:t,hidden:e.props.value!==v})}))))}},132:function(e,t,n){"use strict";var r=n(0),o=n.n(r);t.a=function(e){var t=e.children,n=e.hidden,r=e.className;return o.a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}}}]);