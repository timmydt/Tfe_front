(this.webpackJsonptfe_front=this.webpackJsonptfe_front||[]).push([[1],{100:function(e,n,t){},111:function(e,n,t){},112:function(e,n,t){"use strict";t.r(n);var r=t(0),c=t.n(r),o=t(28),s=t.n(o),a=t(23),i=t(2),j=t(57),u=t(4),l=t.n(u),h=t(12),d=t(17),b=(t(79),t(59)),p=t.n(b).a.create({baseURL:"https://api.timmy.dnet.ovh",timeout:3e3,headers:{}});function f(e){return O.apply(this,arguments)}function O(){return(O=Object(h.a)(l.a.mark((function e(n){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p.defaults.headers.common.Authorization="Bearer ".concat(n);case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(){return y.apply(this,arguments)}function y(){return(y=Object(h.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:p.defaults.headers.common.Authorization=null;case 1:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var m=t(3),v=function(){var e=Object(r.useState)(),n=Object(d.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)(),s=Object(d.a)(o,2),j=s[0],u=s[1],b=Object(a.e)(),O=Object(i.u)(),x=Object(d.a)(O,1)[0];function y(){return(y=Object(h.a)(l.a.mark((function e(){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.post("/users/login",{username:t,password:j});case 3:(n=e.sent)&&(f(n.data.token),console.log("connected"),localStorage.setItem("token",n.data.token),b.push("/home")),e.next=10;break;case 7:e.prev=7,e.t0=e.catch(0),x({message:"Incorrect username or password",buttons:["ok"]});case 10:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}return Object(m.jsxs)(i.h,{children:[Object(m.jsx)(i.d,{children:Object(m.jsx)(i.l,{children:Object(m.jsx)(i.k,{children:"Login"})})}),Object(m.jsxs)(i.c,{fullscreen:!0,children:[Object(m.jsx)(i.g,{children:"Connexion"}),Object(m.jsx)(i.f,{children:Object(m.jsx)(i.e,{value:t,placeholder:"Username",onIonChange:function(e){return c(e.detail.value)}})}),Object(m.jsx)(i.f,{children:Object(m.jsx)(i.e,{value:j,type:"password",placeholder:"Password",onIonChange:function(e){return u(e.detail.value)}})}),Object(m.jsx)(i.b,{onClick:function(){return y.apply(this,arguments)},children:"Connect"}),Object(m.jsx)(i.b,{class:"createaccountbutton",routerLink:"/register",children:"register"})]})]})},g=(t(98),function(){var e=Object(r.useState)(),n=Object(d.a)(e,2),t=n[0],c=n[1],o=Object(r.useState)(),s=Object(d.a)(o,2),j=s[0],u=s[1],b=Object(r.useState)(),f=Object(d.a)(b,2),O=f[0],x=f[1],y=Object(r.useState)(),v=Object(d.a)(y,2),g=v[0],k=v[1],w=Object(r.useState)(),_=Object(d.a)(w,2),C=_[0],I=_[1],L=Object(a.e)(),S=Object(i.u)(),U=Object(d.a)(S,1)[0];function F(){return(F=Object(h.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,p.post("/users/create",{username:t,password:j,mail:O,first_name:g,last_name:C});case 3:e.sent&&L.push("/"),e.next=12;break;case 7:e.prev=7,e.t0=e.catch(0),400===e.t0.response.status&&U({message:"There is one field missing",buttons:["ok"]}),401===e.t0.response.status&&U({message:"Username already used",buttons:["ok"]}),402===e.t0.response.status&&U({message:"Mail already used",buttons:["ok"]});case 12:case"end":return e.stop()}}),e,null,[[0,7]])})))).apply(this,arguments)}return Object(m.jsxs)(i.h,{children:[Object(m.jsx)(i.d,{children:Object(m.jsx)(i.l,{children:Object(m.jsx)(i.k,{children:"Register"})})}),Object(m.jsxs)(i.c,{fullscreen:!0,children:[Object(m.jsx)(i.g,{children:"Create account ( * are mendatory )"}),Object(m.jsx)(i.f,{children:Object(m.jsx)(i.e,{value:t,placeholder:"Username (*)",onIonChange:function(e){return c(e.detail.value)}})}),Object(m.jsx)(i.f,{children:Object(m.jsx)(i.e,{value:j,placeholder:"Password (*)",type:"password",onIonChange:function(e){return u(e.detail.value)}})}),Object(m.jsx)(i.f,{children:Object(m.jsx)(i.e,{value:O,placeholder:"E-Mail (*)",onIonChange:function(e){return x(e.detail.value)}})}),Object(m.jsx)(i.f,{children:Object(m.jsx)(i.e,{value:g,placeholder:"First Name",onIonChange:function(e){return k(e.detail.value)}})}),Object(m.jsx)(i.f,{children:Object(m.jsx)(i.e,{value:C,placeholder:"Last Name",onIonChange:function(e){return I(e.detail.value)}})}),Object(m.jsx)(i.b,{onClick:function(){return F.apply(this,arguments)},children:"Register"}),Object(m.jsx)(i.b,{class:"cancelbutton",routerLink:"/",children:"Cancel"})]})]})}),k=(t(99),function(){function e(){return(e=Object(h.a)(l.a.mark((function e(){return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:x(),localStorage.removeItem("token"),console.log("disconnected");case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function n(){return(n=Object(h.a)(l.a.mark((function e(){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,p.get("/cave/list");case 2:n=e.sent,console.log(n);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return Object(m.jsxs)(i.h,{children:[Object(m.jsx)(i.d,{children:Object(m.jsx)(i.l,{children:Object(m.jsx)(i.k,{children:"You are logged in !"})})}),Object(m.jsxs)(i.c,{fullscreen:!0,children:[Object(m.jsx)(i.g,{children:"Mon profil"}),Object(m.jsx)(i.b,{onClick:function(){return n.apply(this,arguments)},children:"getCaves"}),Object(m.jsx)(i.b,{onClick:function(){return e.apply(this,arguments)},routerLink:"/",children:"log out"})]})]})}),w=(t(100),function(){return Object(m.jsxs)(i.h,{children:[Object(m.jsx)(i.d,{children:Object(m.jsx)(i.l,{children:Object(m.jsx)(i.k,{children:"404 not found !"})})}),Object(m.jsx)(i.c,{fullscreen:!0,children:Object(m.jsx)(i.b,{routerLink:"/",children:"return to Home"})})]})}),_=(t(101),t(102),t(103),t(104),t(105),t(106),t(107),t(108),t(109),t(110),t(111),function(){return Object(m.jsx)(i.a,{children:Object(m.jsx)(j.a,{children:Object(m.jsx)(i.j,{children:Object(m.jsxs)(a.c,{children:[Object(m.jsx)(a.a,{exact:!0,path:"/",component:v}),Object(m.jsx)(a.a,{path:"/register",component:g}),Object(m.jsx)(a.a,{path:"/home",component:k}),Object(m.jsx)(a.a,{path:"*",component:w})]})})})})});Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));var C=function(e){e&&e instanceof Function&&t.e(58).then(t.bind(null,174)).then((function(n){var t=n.getCLS,r=n.getFID,c=n.getFCP,o=n.getLCP,s=n.getTTFB;t(e),r(e),c(e),o(e),s(e)}))};s.a.render(Object(m.jsx)(c.a.StrictMode,{children:Object(m.jsx)(_,{})}),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)})),C()},69:function(e,n,t){var r={"./ion-action-sheet.entry.js":[114,5],"./ion-alert.entry.js":[115,6],"./ion-app_8.entry.js":[116,7],"./ion-avatar_3.entry.js":[117,17],"./ion-back-button.entry.js":[118,18],"./ion-backdrop.entry.js":[119,43],"./ion-button_2.entry.js":[120,19],"./ion-card_5.entry.js":[121,20],"./ion-checkbox.entry.js":[122,21],"./ion-chip.entry.js":[123,22],"./ion-col_3.entry.js":[124,44],"./ion-datetime_3.entry.js":[125,10],"./ion-fab_3.entry.js":[126,23],"./ion-img.entry.js":[127,45],"./ion-infinite-scroll_2.entry.js":[128,46],"./ion-input.entry.js":[129,24],"./ion-item-option_3.entry.js":[130,25],"./ion-item_8.entry.js":[131,26],"./ion-loading.entry.js":[132,27],"./ion-menu_3.entry.js":[133,28],"./ion-modal.entry.js":[134,8],"./ion-nav_2.entry.js":[135,14],"./ion-popover.entry.js":[136,9],"./ion-progress-bar.entry.js":[137,29],"./ion-radio_2.entry.js":[138,30],"./ion-range.entry.js":[139,31],"./ion-refresher_2.entry.js":[140,11],"./ion-reorder_2.entry.js":[141,16],"./ion-ripple-effect.entry.js":[142,47],"./ion-route_4.entry.js":[143,32],"./ion-searchbar.entry.js":[144,33],"./ion-segment_2.entry.js":[145,34],"./ion-select_3.entry.js":[146,35],"./ion-slide_2.entry.js":[147,48],"./ion-spinner.entry.js":[148,13],"./ion-split-pane.entry.js":[149,49],"./ion-tab-bar_2.entry.js":[150,36],"./ion-tab_2.entry.js":[151,15],"./ion-text.entry.js":[152,37],"./ion-textarea.entry.js":[153,38],"./ion-toast.entry.js":[154,39],"./ion-toggle.entry.js":[155,12],"./ion-virtual-scroll.entry.js":[156,50]};function c(e){if(!t.o(r,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=r[e],c=n[0];return t.e(n[1]).then((function(){return t(c)}))}c.keys=function(){return Object.keys(r)},c.id=69,e.exports=c},71:function(e,n,t){var r={"./ion-icon.entry.js":[157,57]};function c(e){if(!t.o(r,e))return Promise.resolve().then((function(){var n=new Error("Cannot find module '"+e+"'");throw n.code="MODULE_NOT_FOUND",n}));var n=r[e],c=n[0];return t.e(n[1]).then((function(){return t(c)}))}c.keys=function(){return Object.keys(r)},c.id=71,e.exports=c},79:function(e,n,t){},98:function(e,n,t){},99:function(e,n,t){}},[[112,3,4]]]);
//# sourceMappingURL=main.674d321e.chunk.js.map