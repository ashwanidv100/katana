define(["jquery","realtimePages","helpers","popup","handlebars","mustache","text!templates/build.handlebars","text!templates/builders.mustache","timeElements"],function(e,t,n,r,i,s,o,u,a){var f,l=e("#stepList").find("> li"),c=Handlebars.compile(o),h=!1,p=!1;return Handlebars.registerHelper("buildCSSClass",function(e){return n.getCssClassFromStatus(e)}),f={init:function(){var r=t.defaultRealtimeFunctions();r.build=f.processBuildDetailPage,t.initRealtime(r),a.setHeartbeat(1e3);if(window.location.search!==""){var i=e(".top");n.codeBaseBranchOverview(i)}},processBuildDetailPage:function(t){var r=Object.keys(t);r.length===1&&(t=t[r[0]]);var i=t.times[0],s=t.times[1],o=s!==null,u=t.eta;f.refreshIfRequired(o),f.processBuildResult(t,i,u,o),f.processSteps(t),n.summaryArtifactTests(),s===null&&a.addElapsedElem(e("#elapsedTimeJs"),i),a.updateTimeObjects()},processBuildResult:function(t,r,i,o){var f=e("#buildResult");a.clearTimeObjects(f);var l="";i!=0&&(l=s.render(u,{progressBar:!0,etaStart:r,etaCurrent:i}));var h={buildResults:!0,b:t,buildIsFinished:o,progressBar:l},p=c(h);f.html(p);var d=f.find(".percent-outer-js");d.addClass("build-detail-progress"),n.delegateToProgressBar(d)},processSteps:function(t){var r="",i=e("#stepList"),s=1;e.each(t.steps,function(e,t){if(t.hidden)return!0;var i=t.isStarted,o=t.isFinished,u=t.results[0];i?i&&!o&&(u=7):u=8;var a=n.getCssClassFromStatus(u),f=t.times[0],l=t.times[1],h=n.getTime(f,l),p={step:!0,index:s,stepStarted:t.isStarted,run_time:h,css_class:a,s:t,url:t.url};return r+=c(p),s++,!0}),i.html(r)},refreshIfRequired:function(e){!p&&h&&e&&(window.location=window.location+"#finished",window.location.reload()),p==0&&(p=e),h=!0}},f});