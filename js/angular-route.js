(function(e,f,b){var g=f.module("ngRoute",["ng"]).provider("$route",h),d=f.$$minErr("ngRoute");function h(){function l(n,m){return f.extend(Object.create(n),m)}var j={};this.when=function(p,n){var o=f.copy(n);if(f.isUndefined(o.reloadOnSearch)){o.reloadOnSearch=true}if(f.isUndefined(o.caseInsensitiveMatch)){o.caseInsensitiveMatch=this.caseInsensitiveMatch}j[p]=f.extend(o,p&&k(p,o));if(p){var m=(p[p.length-1]=="/")?p.substr(0,p.length-1):p+"/";j[m]=f.extend({redirectTo:p},k(m,o))}return this};this.caseInsensitiveMatch=false;function k(q,p){var m=p.caseInsensitiveMatch,n={originalPath:q,regexp:q},o=n.keys=[];q=q.replace(/([().])/g,"\\$1").replace(/(\/)?:(\w+)([\?\*])?/g,function(s,u,t,v){var r=v==="?"?v:null;var w=v==="*"?v:null;o.push({name:t,optional:!!r});u=u||"";return""+(r?"":u)+"(?:"+(r?u:"")+(w&&"(.+?)"||"([^/]+)")+(r||"")+")"+(r||"")}).replace(/([\/$\*])/g,"\\$1");n.regexp=new RegExp("^"+q+"$",m?"i":"");return n}this.otherwise=function(m){if(typeof m==="string"){m={redirectTo:m}}this.when(null,m);return this};this.$get=["$rootScope","$location","$routeParams","$q","$injector","$templateRequest","$sce",function(y,s,z,u,B,A,x){var q=false,t,p,w={routes:j,reload:function(){q=true;y.$evalAsync(function(){o();n()})},updateParams:function(C){if(this.current&&this.current.$$route){C=f.extend({},this.current.params,C);s.path(v(this.current.$$route.originalPath,C));s.search(C)}else{throw d("norout","Tried updating route when with no current route")}}};y.$on("$locationChangeStart",o);y.$on("$locationChangeSuccess",n);return w;function m(H,I){var K=I.keys,E={};if(!I.regexp){return null}var D=I.regexp.exec(H);if(!D){return null}for(var F=1,G=D.length;F<G;++F){var J=K[F-1];var C=D[F];if(J&&C){E[J.name]=C}}return E}function o(C){var D=w.current;t=r();p=t&&D&&t.$$route===D.$$route&&f.equals(t.pathParams,D.pathParams)&&!t.reloadOnSearch&&!q;if(!p&&(D||t)){if(y.$broadcast("$routeChangeStart",t,D).defaultPrevented){if(C){C.preventDefault()}}}}function n(){var C=w.current;var D=t;if(p){C.params=D.params;f.copy(C.params,z);y.$broadcast("$routeUpdate",C)}else{if(D||C){q=false;w.current=D;if(D){if(D.redirectTo){if(f.isString(D.redirectTo)){s.path(v(D.redirectTo,D.params)).search(D.params).replace()}else{s.url(D.redirectTo(D.pathParams,s.path(),s.search())).replace()}}}u.when(D).then(function(){if(D){var G=f.extend({},D.resolve),E,F;f.forEach(G,function(I,H){G[H]=f.isString(I)?B.get(I):B.invoke(I,null,null,H)});if(f.isDefined(E=D.template)){if(f.isFunction(E)){E=E(D.params)}}else{if(f.isDefined(F=D.templateUrl)){if(f.isFunction(F)){F=F(D.params)}if(f.isDefined(F)){D.loadedTemplateUrl=x.valueOf(F);E=A(F)}}}if(f.isDefined(E)){G["$template"]=E}return u.all(G)}}).then(function(E){if(D==w.current){if(D){D.locals=E;f.copy(D.params,z)}y.$broadcast("$routeChangeSuccess",D,C)}},function(E){if(D==w.current){y.$broadcast("$routeChangeError",D,C,E)}})}}}function r(){var D,C;f.forEach(j,function(E,F){if(!C&&(D=m(s.path(),E))){C=l(E,{params:f.extend({},s.search(),D),pathParams:D});C.$$route=E}});return C||j[null]&&l(j[null],{params:{},pathParams:{}})}function v(D,E){var C=[];f.forEach((D||"").split(":"),function(H,G){if(G===0){C.push(H)}else{var I=H.match(/(\w+)(?:[?*])?(.*)/);var F=I[1];C.push(E[F]);C.push(I[2]||"");delete E[F]}});return C.join("")}}]}g.provider("$routeParams",a);function a(){this.$get=function(){return{}}}g.directive("ngView",i);g.directive("ngView",c);i.$inject=["$route","$anchorScroll","$animate"];function i(l,j,k){return{restrict:"ECA",terminal:true,priority:400,transclude:"element",link:function(w,v,r,m,s){var x,o,q,p=r.autoscroll,u=r.onload||"";w.$on("$routeChangeSuccess",n);n();function t(){if(q){k.cancel(q);q=null}if(x){x.$destroy();x=null}if(o){q=k.leave(o);q.then(function(){q=null});o=null}}function n(){var B=l.current&&l.current.locals,y=B&&B.$template;if(f.isDefined(y)){var z=w.$new();var A=l.current;var C=s(z,function(E){k.enter(E,null,o||v).then(function D(){if(f.isDefined(p)&&(!p||w.$eval(p))){j()}});t()});o=C;x=A.scope=z;x.$emit("$viewContentLoaded");x.$eval(u)}else{t()}}}}}c.$inject=["$compile","$controller","$route"];function c(k,j,l){return{restrict:"ECA",priority:-400,link:function(o,n){var r=l.current,q=r.locals;n.html(q.$template);var p=k(n.contents());if(r.controller){q.$scope=o;var m=j(r.controller,q);if(r.controllerAs){o[r.controllerAs]=m}n.data("$ngControllerController",m);n.children().data("$ngControllerController",m)}p(o)}}}})(window,window.angular);