(this["webpackJsonpbell-curve-app"]=this["webpackJsonpbell-curve-app"]||[]).push([[0],{461:function(e,t,n){"use strict";n.r(t);var r=n(4),c=n(1),a=n.n(c),i=n(15),u=n.n(i),o=n(19),l=n(13),s=n(24),j=n(6),b=n(496),d=n(47),h=n(494),f=n(495),v=n(493),O=n(89),m=n.n(O);function x(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=[];if(n<=0){for(var c=0;c<e;c+=1)r.push(t);return r}for(var a=m()(t,n),i=1/e,u=.5*i;u<1;u+=i)r.push(a.ppf(u));return r}function p(e){for(var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,n=0,r=0,c=[],a=0;a<e.length;a+=1)r+=e[a],(n+=1)===t&&(c.push(r/t),n=0,r=0);return c}function y(e,t,n){for(var r=[],c=0;c<e.length;c+=1)for(var a=0;a<t.length;a+=1)r.push(n(e[c],t[a]));var i=Math.round(Math.sqrt(e.length*t.length));return p(Object(d.sortBy)(r,(function(e){return e})),i)}var g={variance:200,mean:5},k=Object(o.b)({key:"investments",default:[g]}),I=Object(o.b)({key:"initial",default:10}),w=Object(o.b)({key:"days",default:10}),C="Reinvest Gains/Losses",D="Invest Initial Investment (Borrow If Neccessary)",M="Invest Initial Investment (Borrow but Stop After Bankruptcy)",N="Invest No More Than Initial Investment",S=[C,D,M,N],B=Object(o.b)({key:"strategy",default:S[0]}),L=Object(o.c)({key:"strategyfunc",get:function(e){var t=e.get,n=t(I);switch(t(B)){case C:return function(e,t){return e+e*t/100};case D:return function(e,t){return e+n*t/100};case M:return function(e,t){return e<=0?e:e+n*t/100};case N:return function(e,t){return e+Math.min(n,e)*t/100};default:throw Error("Unexpected")}}}),A=Object(o.c)({key:"simulator",get:function(e){var t=e.get,n=t(k),r=t(I),c=n.map((function(e){return m()(+e.mean,+e.variance||1e-7)})),a=t(w),i=t(L);return function(){for(var e=c.map((function(){return r/c.length})),t=0;t<a;t+=1){for(var n=0;n<e.length;n+=1)e[n]=i(e[n],c[n].ppf(Math.random()));for(var u=0,o=0;o<e.length;o+=1)u+=e[o];for(var l=0;l<e.length;l+=1)e[l]=u/c.length}for(var s=0,j=0;j<e.length;j+=1)s+=e[j];return s}}}),K=Object(o.c)({key:"result",get:function(e){for(var t=e.get,n=function(e){if(0===e.length)return[];for(var t=e[0],n=function(n){var r=1/(n+1);t=y(t,e[n],(function(e,t){return e*r+t*(1-r)}))},r=1;r<e.length;r+=1)n(r);return t}(t(k).map((function(e){return x(100,+e.mean,+e.variance)}))),r=t(I),c=t(w),a=x(100,r,0),i=t(L),u=0;u<c;u+=1)a=y(a,n,i);return a.map((function(e,t){return{x:t,y:e}}))}}),$=a.a.memo((function(){var e=Object(o.d)(k),t=Object(j.a)(e,2),n=t[0],c=t[1],a=Object(o.d)(B),i=Object(j.a)(a,2),u=i[0],O=i[1],m=Object(o.d)(w),x=Object(j.a)(m,2),p=x[0],y=x[1],C=Object(o.d)(I),D=Object(j.a)(C,2),M=D[0],N=D[1],L=function(e,t){var r=Object(d.cloneDeep)(n);r[e].mean=t,c(r)},A=function(e,t){var r=Object(d.cloneDeep)(n);r[e].variance=t,c(r)};return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Settings"}),Object(r.jsx)("div",{children:"Strategy:"}),Object(r.jsx)(h.a,{labelId:"demo-simple-select-label",id:"demo-simple-select",value:u,onChange:function(e){return O(String(e.target.value))},children:S.map((function(e){return Object(r.jsx)(f.a,{value:e,children:e})}))}),Object(r.jsx)("div",{children:"Days:"}),Object(r.jsx)(b.a,{value:Number(p),onChange:function(e,t){return y(Number(t))},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",min:0,max:100}),Object(r.jsx)("div",{children:"Initial Investment ($):"}),Object(r.jsx)(b.a,{value:Number(M),onChange:function(e,t){return N(Number(t))},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",min:0,max:100}),n.map((function(e,t){return Object(r.jsx)(v.a,{elevation:5,style:{margin:10,padding:0,width:"calc(100% - 20px)",height:220},children:Object(r.jsxs)("div",{style:{margin:10},children:[Object(r.jsx)("h4",{children:"Investment ".concat(t+1)}),Object(r.jsx)("div",{children:"Mean:"}),Object(r.jsx)(b.a,{value:Number(e.mean),onChange:function(e,n){return L(t,Number(n))},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",min:0,max:20}),Object(r.jsx)("input",{value:e.mean,onChange:function(e){return L(t,e.target.value)},type:"number"}),Object(r.jsx)("div",{children:"Variance:"}),Object(r.jsx)(b.a,{value:Number(e.variance),onChange:function(e,n){return A(t,Number(n))},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",min:0,max:2e3}),Object(r.jsx)("input",{value:e.variance,onChange:function(e){return A(t,e.target.value)},type:"number"}),Object(r.jsx)("div",{children:Object(r.jsx)("button",{onClick:function(){return function(e){var t=n.filter((function(t,n){return n!==e}));c(t)}(t)},children:"Delete This Investment"})})]})})})),Object(r.jsx)("button",{onClick:function(){return function(){var e=[].concat(Object(s.a)(n),[Object(l.a)({},g)]);c(e)}()},children:"Add New Investment"})]})})),E=n(27),J=n(44),T=a.a.memo((function(){var e=Object(o.e)(K);Object(o.e)(A);return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Uniform Sampling"}),Object(r.jsxs)(E.c,{width:400,height:400,margin:{top:20,right:20,bottom:20,left:20},children:[Object(r.jsx)(E.a,{}),Object(r.jsx)(E.e,{type:"number",dataKey:"x",name:"%",unit:""}),Object(r.jsx)(E.f,{type:"number",dataKey:"y",name:"money",unit:"$"}),Object(r.jsx)(E.d,{cursor:{strokeDasharray:"3 3"}}),Object(r.jsx)(E.b,{name:"A school",data:e,fill:"#8884d8"})]}),Object(r.jsx)("div",{children:"Mean: ".concat(J.b(e,(function(e){return e.y})))}),Object(r.jsx)("div",{children:"Median: ".concat(J.c(e,(function(e){return e.y})))}),Object(r.jsx)("div",{children:"Std Dev: ".concat(J.a(e,(function(e){return e.y})))})]})})),U=a.a.memo((function(){var e=a.a.useState([]),t=Object(j.a)(e,2),n=t[0],c=t[1],i=Object(o.e)(A),u=function(e){for(var t=[],n=0;n<e;n+=1)t.push(i());var r=p(t=Object(d.sortBy)(t,(function(e){return e})),e/1e3);c(r.map((function(e,t){return{x:t,y:e}})))};return Object(r.jsxs)("div",{children:[Object(r.jsx)("h2",{children:"Monte Carlo"}),Object(r.jsxs)(E.c,{width:400,height:400,margin:{top:20,right:20,bottom:20,left:20},children:[Object(r.jsx)(E.a,{}),Object(r.jsx)(E.e,{type:"number",dataKey:"x",name:"%",unit:""}),Object(r.jsx)(E.f,{type:"number",dataKey:"y",name:"money",unit:"$"}),Object(r.jsx)(E.d,{cursor:{strokeDasharray:"3 3"}}),Object(r.jsx)(E.b,{name:"A school",data:n,fill:"#8884d8"})]}),Object(r.jsx)("div",{children:"Mean: ".concat(J.b(n,(function(e){return e.y})))}),Object(r.jsx)("div",{children:"Median: ".concat(J.c(n,(function(e){return e.y})))}),Object(r.jsx)("div",{children:"Std Dev: ".concat(J.a(n,(function(e){return e.y})))}),Object(r.jsx)("button",{onClick:function(){return u(1e6)},children:"Simulate 1M Iterations"}),Object(r.jsx)("button",{onClick:function(){return u(1e5)},children:"Simulate 100k Iterations"}),Object(r.jsx)("button",{onClick:function(){return u(1e4)},children:"Simulate 10k Iterations"}),Object(r.jsx)("button",{onClick:function(){return c([])},children:"Clear"})]})})),q=function(){return Object(r.jsxs)("div",{children:[Object(r.jsx)("div",{id:"list",style:{position:"absolute",left:0,top:0,bottom:0,width:500,overflow:"auto",padding:10},children:Object(r.jsx)($,{})}),Object(r.jsx)("div",{id:"results",style:{position:"absolute",left:500,top:0,bottom:0,width:500,overflow:"auto"},children:Object(r.jsx)(T,{})}),Object(r.jsx)("div",{id:"results",style:{position:"absolute",left:1e3,top:0,bottom:0,width:500,overflow:"auto"},children:Object(r.jsx)(U,{})})]})};u.a.render(Object(r.jsx)(o.a,{children:Object(r.jsx)(q,{})}),document.getElementById("root"))}},[[461,1,2]]]);
//# sourceMappingURL=main.80a9a74e.chunk.js.map