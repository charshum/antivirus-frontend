(this["webpackJsonpantivirus-front-end"]=this["webpackJsonpantivirus-front-end"]||[]).push([[0],{36:function(e,t,a){e.exports=a.p+"static/media/banner-thin.07e51e0d.png"},45:function(e,t,a){e.exports=a(75)},50:function(e,t,a){},51:function(e,t,a){},52:function(e,t,a){},53:function(e,t,a){},75:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),o=a(11),i=a.n(o),c=(a(50),a(18)),l=(a(51),a(52),a(105)),m=a(107),s=a(106),u=a(98),p=a(109),f=(a(53),a(36)),d=a.n(f);var b=function(){return r.a.createElement("div",{className:"banner"},r.a.createElement("img",{className:"banner-image",src:d.a}))},g=a(101),y=a(103),v=a(102),h=a(100),E=Object(u.a)({row:{display:"flex"},label:{flexGrow:1,width:"20%",fontSize:14},value:{flexGrow:1,width:"80%",fontSize:14}});var k=function(e){var t=e.keyName,a=e.value,n=E();return r.a.createElement("div",{className:n.row},r.a.createElement(h.a,{className:n.label,color:"textSecondary",gutterBottom:!0},t),r.a.createElement(h.a,{className:n.value,color:"textSecondary",gutterBottom:!0},a))},x=a(38),w=a(39),N=a(13),j=Object(u.a)({iconCircle:{cursor:"pointer",width:30,height:30,borderRadius:15,backgroundColor:"#33b5a6"},icon:{color:"#ffffff",marginTop:7,marginLeft:7}}),O=[{type:"facebook",icon:w.a},{type:"link",icon:N.b},{type:"email",icon:N.a},{type:"phone",icon:N.c}];var B=function(e){var t,a=e.link,n=e.type,o=j(),i=(t=n,O.find((function(e){return e.type==t}))),c=a;return i?("email"==i.type&&(c="mailto:"+a),"phone"==i.type&&(c="tel:"+a),r.a.createElement("div",{className:o.iconCircle},r.a.createElement("a",{href:c},r.a.createElement(x.a,{className:o.icon,icon:i.icon})))):""},C=Object(u.a)({root:{maxWidth:400,minHeight:400,marginLeft:"auto",marginRight:"auto"},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}}),S=[{key:"orgType",title:"\u7d44\u7e54\u985e\u578b"},{key:"district",title:"\u5730\u5340"},{key:"address",title:"\u5730\u5740"},{key:"contactPersonName",title:"\u806f\u7d61\u4eba"}],G=[{key:"facebook",type:"facebook"},{key:"email",type:"email"},{key:"website",type:"link"},{key:"phone",type:"phone"}];var z=function(e){var t=C(),a=e.org;return r.a.createElement(g.a,{className:t.root},r.a.createElement(v.a,null,r.a.createElement(h.a,{className:t.title,color:"textSecondary",gutterBottom:!0},a.name),S.map((function(e){return r.a.createElement(k,{keyName:e.title,value:a[e.key]})}))),r.a.createElement(y.a,null,G.map((function(e){return""!=a[e.key]?r.a.createElement(B,{link:a[e.key],type:e.type}):""}))))},W=a(104),R=Object(u.a)({root:{minWidth:"100%",marginTop:"20px"},bullet:{display:"inline-block",margin:"0 2px",transform:"scale(0.8)"},title:{fontSize:14},pos:{marginBottom:12}});var T=function(e){var t=e.data,a=R();return r.a.createElement(W.a,{className:a.root,container:!0,justify:"center",spacing:2},t.map((function(e){return r.a.createElement(W.a,{item:!0,xs:12,sm:6,md:4},r.a.createElement(z,{org:e}))})))};function D(e){var t=e.children,a=e.value,n=e.index,o=J();return r.a.createElement("div",{className:o.tabContent,hidden:a!==n},t)}var J=Object(u.a)((function(e){return Object(p.a)({root:{flexGrow:1},menuButton:{marginRight:e.spacing(2)},title:{flexGrow:1},appBar:{backgroundColor:"#008678"},tabs:{display:"flex"},tab:{flexGrow:1},tabContent:{backgroundColor:"#6fe9d8"}})}));var L=function(e){var t=e.orgData,a=r.a.useState(1),n=Object(c.a)(a,2),o=n[0],i=n[1],u=J();return r.a.createElement("div",null,r.a.createElement(b,null),r.a.createElement(l.a,{className:u.appBar,position:"static"},r.a.createElement(m.a,{indicatorColor:"primary",value:o,onChange:function(e,t){i(t)},centered:!0,className:u.tabs,"aria-label":"simple tabs example"},r.a.createElement(s.a,{className:u.tab,label:"\u6d3b\u52d5"}),r.a.createElement(s.a,{className:u.tab,label:"\u7d44\u7e54"}))),r.a.createElement(D,{index:0,value:o},"Activity"),r.a.createElement(D,{index:1,value:o},r.a.createElement(T,{data:t})))},A=a(40),H=a.n(A);var I=function(){var e=Object(n.useState)([]),t=Object(c.a)(e,2),a=t[0],o=t[1];return Object(n.useEffect)((function(){H.a.get("https://go-api-dot-antivirus-center.appspot.com/getOrg",{auth:{username:"admin",password:"admin"}}).then((function(e){var t=e.data;o(t)}))}),[]),r.a.createElement(L,{orgData:a})};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));i.a.render(r.a.createElement(I,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))}},[[45,1,2]]]);
//# sourceMappingURL=main.adf7fecf.chunk.js.map