(this["webpackJsonpbell-curve-app"]=this["webpackJsonpbell-curve-app"]||[]).push([[0],{159:function(e,n,t){"use strict";t.r(n);var r=t(21),a=t(7),u=t(1),c=t.n(u),i=t(30),o=t.n(i),l=(t(250),t(147)),s=t.n(l),b=t(148),j=t(22),d=t(46),h=t(158);function v(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:0,t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:1,r=s()(n,t),a=[],u=1/e,c=.5*u;c<1;c+=u)a.push(r.ppf(c));return a}function f(e,n,t){for(var r=[],a=0;a<e.length;a+=1)for(var u=0;u<n.length;u+=1)r.push(t(e[a],n[u]));var c=Math.round(Math.sqrt(e.length*n.length));return function(e){for(var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:100,t=0,r=0,a=[],u=0;u<e.length;u+=1)r+=e[u],(t+=1)===n&&(a.push(r/n),t=0,r=0);return a}(Object(b.sortBy)(r,(function(e){return e})),c)}var m=function(){var e=c.a.useState(10),n=Object(r.a)(e,2),t=n[0],u=n[1],i=c.a.useState(5),o=Object(r.a)(i,2),l=o[0],s=o[1],b=c.a.useMemo((function(){for(var e=v(100,Number(l),Number(t)>0?Number(t):1e-4),n=v(100,10,1).map((function(e){return 10})),r=0;r<10;r+=1)n=f(n,e,(function(e,n){return e+e*n/100}));return console.log({roi:e,money:n,avg:d.c(n)}),n.map((function(e,n){return{x:n,y:e}}))}),[l,t]);return Object(a.jsxs)("div",{children:[Object(a.jsx)("button",{onClick:function(){},children:"click"}),Object(a.jsxs)(j.c,{width:400,height:400,margin:{top:20,right:20,bottom:20,left:20},children:[Object(a.jsx)(j.a,{}),Object(a.jsx)(j.e,{type:"number",dataKey:"x",name:"%",unit:""}),Object(a.jsx)(j.f,{type:"number",dataKey:"y",name:"money",unit:"$"}),Object(a.jsx)(j.d,{cursor:{strokeDasharray:"3 3"}}),Object(a.jsx)(j.b,{name:"A school",data:b,fill:"#8884d8"})]}),Object(a.jsx)("div",{children:"Mean:"}),Object(a.jsx)(h.a,{value:l,onChange:function(e,n){return s(Number(n))},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",min:0,max:20}),Object(a.jsx)("input",{value:l,onChange:function(e){return s(Number(e.target.value))},type:"number"}),Object(a.jsx)("div",{children:"Variance:"}),Object(a.jsx)(h.a,{value:t,onChange:function(e,n){return u(Number(n))},"aria-labelledby":"discrete-slider",valueLabelDisplay:"auto",min:0,max:2e3}),Object(a.jsx)("input",{value:t,onChange:function(e){return u(Number(e.target.value))},type:"number"}),Object(a.jsx)("div",{children:"Median: ".concat(d.c(b,(function(e){return e.y})))}),Object(a.jsx)("div",{children:"Mean: ".concat(d.b(b,(function(e){return e.y})))}),Object(a.jsx)("div",{children:"st. dev.: ".concat(d.a(b,(function(e){return e.y})))})]})};o.a.render(Object(a.jsx)(m,{}),document.getElementById("root"))},250:function(e,n,t){}},[[159,1,2]]]);
//# sourceMappingURL=main.ec923c06.chunk.js.map