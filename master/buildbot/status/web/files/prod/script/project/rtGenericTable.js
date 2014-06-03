define(["jquery","dataTables","timeElements","text!hbCells","extend-moment","handlebars","helpers","moment","popup"],function(e,t,n,r,i,s,o,u,a){var f=Handlebars.compile(r),l={getPropertyOnData:function(e,t){return t===undefined?undefined:typeof t=="string"||t instanceof String?e[t]:t(e)},buildIsHistoric:function(t){var n=!1,r=!1;return e.each(t,function(e,t){t.length>0&&(t.length===2&&t[0]==="revision"&&t[1].length!==0?n=!0:t.length===3&&t[0]==="buildLatestRev"&&t[2]==="Trigger"&&(r=!0))}),n===!0&&r===!1}},c={revision:function(e,t,n){return console.log(n),{aTargets:[e],sClass:"txt-align-left",mRender:function(e,r,i){var s=l.getPropertyOnData(i,t),o=!1;return i.properties!==undefined&&(o=l.buildIsHistoric(i.properties)),f({revisionCell:!0,sourceStamps:s,history_build:o,hide_branch:n})}}},buildID:function(e){return{aTargets:[e],sClass:"txt-align-left",mRender:function(e,t,n){return f({buildID:!0,data:n})}}},buildStatus:function(t,n){return{aTargets:[t],sClass:n===undefined?"txt-align-left":n,mRender:function(e,t,n){return f({buildStatus:!0,build:n})},fnCreatedCell:function(t,n,r){e(t).removeClass().addClass(r.results_text)}}},builderName:function(e,t){return{aTargets:[e],sClass:t===undefined?"txt-align-right":t,mRender:function(e,t,n){return f({showBuilderName:!0,data:n})}}},shortTime:function(e,t){return{aTargets:[e],sClass:"txt-align-left",mRender:function(e,n,r){var s=l.getPropertyOnData(r,t);return i.getDateFormatted(s)}}},slaveName:function(e,t,n,r){return{aTargets:[e],sClass:r===undefined?"txt-align-left":r,mRender:function(e,r,i){var s=l.getPropertyOnData(i,t),o=l.getPropertyOnData(i,n);return f({slaveName:!0,name:s,url:o})}}},slaveStatus:function(t){return{aTargets:[t],mRender:function(e,t,n){var r,i=!1;return n.connected===undefined||n.connected===!1?r="Offline":n.connected===!0&&n.runningBuilds===undefined?r="Idle":n.connected===!0&&n.runningBuilds.length>0&&(r=n.runningBuilds.length+" build(s) ",i=!0),f({slaveStatus:!0,showStatusTxt:r,showSpinIcon:i})},fnCreatedCell:function(t,n,r){if(r.connected===undefined)e(t).addClass("offline");else if(r.connected===!0&&r.runningBuilds===undefined)e(t).addClass("idle");else if(r.connected===!0&&r.runningBuilds.length>0){var i=0;r.runningBuilds!==undefined&&(e.each(r.runningBuilds,function(e,t){t.eta!==undefined&&t.eta<0&&(i+=1)}),i=i>0?i:!1);var s=e(t).addClass("building").find("a.popup-btn-json-js");a.initJSONPopup(s,{showRunningBuilds:r}),i&&(e(t).removeClass("building").addClass("overtime tooltip").attr("title","One or more builds on overtime"),o.tooltip(e(t)))}}}},buildProgress:function(t,r){return{aTargets:[t],sClass:"txt-align-left",mRender:function(e,t,n){return f({buildProgress:!0,showPending:!r,pendingBuilds:r?undefined:n.pendingBuilds,currentBuilds:r?[n]:n.currentBuilds,builderName:n.name})},fnCreatedCell:function(t){var r=e(t).find(".percent-outer-js");e.each(r,function(t,r){var i=e(r);n.addProgressBarElem(i,i.attr("data-starttime"),i.attr("data-etatime"))}),a.initPendingPopup(e(t).find(".pending-popup"))}}},stopBuild:function(e){return{aTargets:[e],sClass:"txt-align-left",mRender:function(e,t,n){return f({stopBuild:!0,data:n})}}},buildLength:function(e,t){return{aTargets:[e],sClass:"txt-align-left",mRender:function(e,n,r){var i=l.getPropertyOnData(r,t);if(i!==undefined){var s=u.duration((i[1]-i[0])*1e3);return i.length===3&&(s=u.duration((i[2]-i[0])*1e3)),"{0}m {1}s ".format(s.minutes(),s.seconds())}return"N/A"}}}},h={buildTableInit:function(n,r,i){var s={};return s.aoColumns=[{mData:null,sTitle:"#",sWidth:"5%"},{mData:null,sTitle:"Date",sWidth:"10%"},{mData:null,sTitle:"Revision",sWidth:"30%"},{mData:null,sTitle:"Result",sWidth:"30%",sClass:""},{mData:null,sTitle:"Build Time",sWidth:"15%"},{mData:null,sTitle:"Slave",sWidth:"10%"}],s.fnRowCallback=function(t,n){n.properties!==undefined&&l.buildIsHistoric(n.properties)&&e(t).addClass("italic")},s.aoColumnDefs=[c.buildID(0),c.shortTime(1,function(e){return e.times[0]}),c.revision(2,"sourceStamps",i),c.buildStatus(3),c.buildLength(4,"times"),c.slaveName(5,function(e){return e.slave_friendly_name!==undefined?e.slave_friendly_name:e.slave},"slave_url","txt-align-right")],r===!0&&(s.aoColumns[1].sWidth="10%",s.aoColumns[2].sWidth="25%",s.aoColumns[3].sWidth="30%",s.aoColumns[4].sWidth="10%",s.aoColumns[5].sWidth="20%",s.aoColumns[5].sTitle="Builder",s.aoColumnDefs.splice(5,1),s.aoColumnDefs.push(c.builderName(5))),t.initTable(n,s)},rtfGenericTableProcess:function(e,t){n.clearTimeObjects(e),e.fnClearTable();try{e.fnAddData(t),n.updateTimeObjects()}catch(r){}}};return{table:h,cell:c}});