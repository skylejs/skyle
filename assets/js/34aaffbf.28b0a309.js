(window.webpackJsonp=window.webpackJsonp||[]).push([[14],{119:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function s(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?s(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):s(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),u=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=u(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},f={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},b=a.a.forwardRef((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,s=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=u(n),b=r,m=p["".concat(s,".").concat(b)]||p[b]||f[b]||o;return n?a.a.createElement(m,i(i({ref:t},l),{},{components:n})):a.a.createElement(m,i({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,s=new Array(o);s[0]=b;var i={};for(var c in t)hasOwnProperty.call(t,c)&&(i[c]=t[c]);i.originalType=e,i.mdxType="string"==typeof e?e:r,s[1]=i;for(var l=2;l<o;l++)s[l]=n[l];return a.a.createElement.apply(null,s)}return a.a.createElement.apply(null,n)}b.displayName="MDXCreateElement"},120:function(e,t,n){"use strict";function r(e){var t,n,a="";if("string"==typeof e||"number"==typeof e)a+=e;else if("object"==typeof e)if(Array.isArray(e))for(t=0;t<e.length;t++)e[t]&&(n=r(e[t]))&&(a&&(a+=" "),a+=n);else for(t in e)e[t]&&(a&&(a+=" "),a+=t);return a}t.a=function(){for(var e,t,n=0,a="";n<arguments.length;)(e=arguments[n++])&&(t=r(e))&&(a&&(a+=" "),a+=t);return a}},123:function(e,t,n){"use strict";var r=n(0),a=n(124);t.a=function(){var e=Object(r.useContext)(a.a);if(null==e)throw new Error("`useUserPreferencesContext` is used outside of `Layout` Component.");return e}},124:function(e,t,n){"use strict";var r=n(0),a=Object(r.createContext)(void 0);t.a=a},128:function(e,t,n){"use strict";var r=n(0),a=n.n(r),o=n(123),s=n(120),i=n(56),c=n.n(i);var l=37,u=39;t.a=function(e){var t=e.lazy,n=e.block,i=e.defaultValue,p=e.values,f=e.groupId,b=e.className,m=Object(o.a)(),d=m.tabGroupChoices,v=m.setTabGroupChoices,y=Object(r.useState)(i),h=y[0],g=y[1],O=r.Children.toArray(e.children),j=[];if(null!=f){var w=d[f];null!=w&&w!==h&&p.some((function(e){return e.value===w}))&&g(w)}var S=function(e){var t=e.target,n=j.indexOf(t),r=O[n].props.value;g(r),null!=f&&(v(f,r),setTimeout((function(){var e,n,r,a,o,s,i,l;(e=t.getBoundingClientRect(),n=e.top,r=e.left,a=e.bottom,o=e.right,s=window,i=s.innerHeight,l=s.innerWidth,n>=0&&o<=l&&a<=i&&r>=0)||(t.scrollIntoView({block:"center",behavior:"smooth"}),t.classList.add(c.a.tabItemActive),setTimeout((function(){return t.classList.remove(c.a.tabItemActive)}),2e3))}),150))},x=function(e){var t,n;switch(e.keyCode){case u:var r=j.indexOf(e.target)+1;n=j[r]||j[0];break;case l:var a=j.indexOf(e.target)-1;n=j[a]||j[j.length-1]}null===(t=n)||void 0===t||t.focus()};return a.a.createElement("div",{className:"tabs-container"},a.a.createElement("ul",{role:"tablist","aria-orientation":"horizontal",className:Object(s.a)("tabs",{"tabs--block":n},b)},p.map((function(e){var t=e.value,n=e.label;return a.a.createElement("li",{role:"tab",tabIndex:h===t?0:-1,"aria-selected":h===t,className:Object(s.a)("tabs__item",c.a.tabItem,{"tabs__item--active":h===t}),key:t,ref:function(e){return j.push(e)},onKeyDown:x,onFocus:S,onClick:S},n)}))),t?Object(r.cloneElement)(O.filter((function(e){return e.props.value===h}))[0],{className:"margin-vert--md"}):a.a.createElement("div",{className:"margin-vert--md"},O.map((function(e,t){return Object(r.cloneElement)(e,{key:t,hidden:e.props.value!==h})}))))}},129:function(e,t,n){"use strict";var r=n(0),a=n.n(r);t.a=function(e){var t=e.children,n=e.hidden,r=e.className;return a.a.createElement("div",{role:"tabpanel",hidden:n,className:r},t)}},84:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return l})),n.d(t,"toc",(function(){return u})),n.d(t,"default",(function(){return f}));var r=n(3),a=n(7),o=(n(0),n(119)),s=n(128),i=n(129),c={id:"variables",title:"Variables, State & Props"},l={unversionedId:"features/variables",id:"features/variables",isDocsHomePage:!1,title:"Variables, State & Props",description:"Skyle automatically transfers the component's class properties to the underlying StyleSheet, allowing styling based on state, props and more! You can access them by using a function inside the sheet as shown below.",source:"@site/docs/features/variables.mdx",slug:"/features/variables",permalink:"/docs/features/variables",editUrl:"https://github.com/skylejs/skyle/edit/master/docs/docs/features/variables.mdx",version:"current",sidebar:"docs",previous:{title:"Theming",permalink:"/docs/features/theming"},next:{title:"Functional Notations",permalink:"/docs/features/functional-notations"}},u=[],p={toc:u};function f(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},p,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"Skyle automatically transfers the component's class properties to the underlying StyleSheet, allowing styling based on state, props and more! You can access them by using a function inside the sheet as shown below."),Object(o.b)(s.a,{defaultValue:"class",values:[{label:"Class Component",value:"class"},{label:"Functional Component",value:"function"}],mdxType:"Tabs"},Object(o.b)(i.a,{value:"class",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"...\n\n@styled\nclass MyComponent extends Component {\n  styles = styles;\n  state = {\n    value: 0,\n  };\n  fontSize = 30;\n\n  render() {\n    const { value } = this.state;\n\n    return (\n      <>\n        <Button onPress={() => this.setState({ value: value + 1 })} title='Click me!' />\n        <Text style={this.styles.text}></Text>\n      </>\n    );\n  }\n}\n\n// Use Skyle's StyleSheet with a function to access class properties!\nconst styles = StyleSheet.create((o) => {\n  text: {\n    fontSize: o.fontSize;\n    color: o.state.value > 10 ? 'red' : 'green',\n  }\n});\n"))),Object(o.b)(i.a,{value:"function",mdxType:"TabItem"},Object(o.b)("pre",null,Object(o.b)("code",{parentName:"pre",className:"language-ts"},"...\n\nconst MyComponent = (props) => {\n  const [value, setValue] = useState(0);\n  const fontSize = 30;\n\n  // Pass variables into the hook.\n  const s = useStyles(styles, {\n    props,\n    state: { value },\n    fontSize,\n  });\n\n  return (\n    <>\n      <Button onPress={() => setValue(value + 1)} title='Click me!' />\n      <Text style={s.text}></Text>\n    </>\n  );\n}\n\n// Use Skyle's StyleSheet with a function to access passed properties!\nconst styles = StyleSheet.create((o) => {\n  text: {\n    fontSize: o.fontSize;\n    color: o.state.value > 10 ? 'red' : 'green',\n  }\n});\n")))))}f.isMDXComponent=!0}}]);