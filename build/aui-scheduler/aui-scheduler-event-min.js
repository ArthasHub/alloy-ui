AUI.add("aui-scheduler-event",function(aJ){var am=aJ.Lang,bi=am.isString,f=am.isDate,a8=am.isFunction,G=am.isObject,bb=am.isBoolean,ac=am.isNumber,aX=aJ.ColorUtil,j=aJ.DataType.DateMath,a4=aJ.cached(function(A){return A.substring(0,1).toUpperCase()+A.substring(1);}),bd="-",t="&ndash;",ax=".",p="",q=" ",l="_",aL="_propagateSet",Q="activeView",T="borderColor",aN="borderColorRGB",aH="borderStyle",bp="borderWidth",I="Change",a2="color",aV="colorBrightnessFactor",bc="colorSaturationFactor",aF="content",w="disabled",aZ="duration",aO="endDate",aR="eventClass",ap="eventStack",bj="events",at="hidden",H="hsbColor",ar="icon",aa="icons",a0="id",aW="isoTime",bo="locale",aY="never",n="node",h="overlay",aK="parentEvent",bu="recorder",aM="repeat",bh="repeated",P="repeatedEvents",ba="repeater",af="scheduler",au="scheduler-event",aw="scheduler-event-recorder",bl="startDate",a6="template",aU="title",e="titleDateFormat",an="visible",d="%H:%M",a5="%I:%M",E=aJ.getClassName,k=E(ar),s=E(au),aP=E(au,aF),C=E(au,at),bf=E(au,w),ao=E(au,bu),aA=E(au,bh),al=E(au,ba),D=E(au,aU),bn=E(au,aa),v=E(au,ar,w),b=E(au,ar,bh),br=E(au,ar,ba);var V=aJ.Component.create({NAME:au,ATTRS:{allDay:{value:false,validator:bb},borderStyle:{value:"solid",validator:bi},borderWidth:{value:"1px",validator:bi},colorBrightnessFactor:{value:0.75,validator:ac},colorSaturationFactor:{value:1.5,validator:ac},content:{value:"(no title)",validator:bi},color:{lazyAdd:false,setter:"_setColor",value:"#D96666",validator:bi},titleDateFormat:{getter:"_getTitleDateFormat",validator:bi},endDate:{setter:"_setDate",valueFn:function(){var A=j.clone(this.get(bl));A.setHours(A.getHours()+1);return A;}},eventClass:{valueFn:function(){return aJ.SchedulerEvent;}},disabled:{value:false,validator:bb},node:{valueFn:function(){return aJ.NodeList.create(aJ.Node.create(this.EVENT_NODE_TEMPLATE).setData(au,this));}},parentEvent:{},repeat:{value:p,setter:"_setRepeat"},scheduler:{lazyAdd:false,setter:"_setScheduler"},startDate:{setter:"_setDate",valueFn:function(){return new Date();}},visible:{value:true,validator:bb}},EXTENDS:aJ.Base,PROPAGATE_ATTRS:[bl,aO,aF,a2,aV,bc,aH,bp,e,an,w],prototype:{EVENT_NODE_TEMPLATE:'<div class="'+s+'">'+'<div class="'+D+'"></div>'+'<div class="'+aP+'"></div>'+'<div class="'+bn+'">'+'<span class="'+[k,b].join(q)+'"></span>'+'<span class="'+[k,br].join(q)+'"></span>'+'<span class="'+[k,v].join(q)+'"></span>'+"</div>"+"</div>",eventStack:null,initializer:function(){var A=this;var L=A.get(n);A[ap]={};aJ.Array.each(A.get(aR).PROPAGATE_ATTRS,function(X){A.after(X+I,A._propagateAttrChange);});A._bindUIAttrs();A.syncNodeUI(true);},destroy:function(){var A=this;A.eachRepeatedEvent(function(L,X){L.destroy();});A[ap]={};A.get(n).remove(true);},addPaddingNode:function(){var A=this;A.get(n).push(aJ.Node.create(A.EVENT_NODE_TEMPLATE).setData(au,A));A.syncNodeUI();},copyDates:function(L){var A=this;A.set(aO,j.clone(L.get(aO)));A.set(bl,j.clone(L.get(bl)));},copyPropagateAttrValues:function(L,X){var A=this;A.copyDates(L);aJ.Array.each(A.get(aR).PROPAGATE_ATTRS,function(Y){if(!((X||{}).hasOwnProperty(Y))){var bz=L.get(Y);if(!G(bz)){A.set(Y,bz);}}});},getBorderColor:function(){var A=this;return A[aN].hex;},getDaysDuration:function(){var A=this;return j.getDayOffset(A.get(aO),A.get(bl));},getHoursDuration:function(){var A=this;return j.getHoursOffset(A.get(aO),A.get(bl));},getMinutesDuration:function(){var A=this;return j.getMinutesOffset(A.get(aO),A.get(bl));},getSecondsDuration:function(){var A=this;return j.getSecondsOffset(A.get(aO),A.get(bl));},sameEndDate:function(L){var A=this;return j.compare(A.get(aO),L.get(aO));},sameStartDate:function(L){var A=this;return j.compare(A.get(bl),L.get(bl));},isAfter:function(Y){var X=this;var L=X.get(bl);var A=Y.get(bl);return j.after(L,A);},isBefore:function(Y){var X=this;var L=X.get(bl);var A=Y.get(bl);return j.before(L,A);},repeatByDate:function(X){var L=this;var Y=L.uidByDate(X);if(!L[ap][Y]){var A=j.clone(X);var bA=j.clone(X);j.copyHours(A,L.get(bl));j.copyHours(bA,L.get(aO));var bz=new L.get(aR)({endDate:bA,parentEvent:L,scheduler:L.get(af),startDate:A});bz.copyPropagateAttrValues(L);L[ap][Y]=bz;}return L[ap][Y];},intersects:function(Y){var X=this;var bz=X.get(aO);var L=X.get(bl);var A=Y.get(bl);return(X.sameStartDate(Y)||j.between(A,L,bz));},intersectHours:function(X){var L=this;var bz=L.get(aO);var A=L.get(bl);var Y=j.clone(A);j.copyHours(Y,X.get(bl));return(j.compare(A,Y)||j.between(Y,A,bz));},isDayBoundaryEvent:function(){var A=this;return j.isDayBoundary(A.get(bl),A.get(aO));},isDayOverlapEvent:function(){var A=this;return j.isDayOverlap(A.get(bl),A.get(aO));},isRepeatableDate:function(L){var A=this;var X=A.get(aM);return(X&&X.validate(A,L));},getClearEndDate:function(){var A=this;return j.safeClearTime(A.get(aO));},getClearStartDate:function(){var A=this;return j.safeClearTime(A.get(bl));},move:function(L){var A=this;var X=A.getMinutesDuration();A.set(bl,L);A.set(aO,j.add(j.clone(L),j.MINUTES,X));},uidByDate:function(L){var A=this;L=f(L)?j.safeClearTime(L):A.getClearStartDate();return[au,L.getTime()].join(l);},setContent:function(X,L){var A=this;A.get(n).each(function(bz){var Y=bz.one(g+aP);Y.setContent(X);});if(L){A.eachRepeatedEvent(function(Y,bz){Y.setContent(X);});}},setTitle:function(X,L){var A=this;A.get(n).each(function(Y){var bz=Y.one(g+D);bz.setContent(X);});if(L){A.eachRepeatedEvent(function(Y,bz){Y.setTitle(X);});}},syncNodeUI:function(L){var A=this;A._syncUIAttrs();A.syncNodeColorUI(L);A.syncNodeTitleUI(L);A.syncNodeContentUI(L);},syncNodeColorUI:function(L){var A=this;var Y=A.get(n);var bz=A.getBorderColor();if(Y){var X={borderWidth:A.get(bp),borderColor:bz,backgroundColor:A.get(a2),borderStyle:A.get(aH)};Y.setStyles(X);}if(L){A.eachRepeatedEvent(function(bA,bB){bA.syncNodeColorUI();});}},syncNodeContentUI:function(L){var A=this;A.setContent(A.get(aF),L);},syncNodeTitleUI:function(L){var A=this;var Y=A._formatDate(A.get(bl));var X=A._formatDate(A.get(aO));A.setTitle([Y,X].join(q+t+q),L);},split:function(){var A=this,X=j.clone(A.get(bl)),Y=j.clone(A.get(aO));
if(A.isDayOverlapEvent()&&!A.isDayBoundaryEvent()){var L=j.clone(X);L.setHours(24,0,0,0);return[[X,j.toMidnight(j.clone(X))],[L,j.clone(Y)]];}return[[X,Y]];},eachRepeatedEvent:function(L){var A=this;aJ.each(A[ap],L,A);},unlink:function(){var A=this;if(A.get(aK)){A.set(aK,null);}else{A.eachRepeatedEvent(function(L,X){L.unlink();});}A[ap]={};A.syncNodeUI();},_afterDisabledChange:function(L){var A=this;A._uiSetDisabled(L.newVal);},_afterVisibleChange:function(L){var A=this;A._uiSetVisible(L.newVal);},_afterRepeatChange:function(L){var A=this;A._uiSetRepeat(L.newVal);},_afterParentEventChange:function(L){var A=this;A._uiSetParentEvent(L.newVal);},_bindUIAttrs:function(){var A=this;A.after({disabledChange:A._afterDisabledChange,visibleChange:A._afterVisibleChange,parentEventChange:A._afterParentEventChange,repeatChange:A._afterRepeatChange});A._syncUIAttrs();},_propagateAttrChange:function(Y){var A=this;var X=Y.attrName;var L=Y.newVal;A.eachRepeatedEvent(function(bz,bA){var bB=bz[aL+a4(X)];if(bB){bB.apply(A,[bz,X,L]);}else{bz.set(X,Y.newVal);}bz.syncNodeUI();});A.syncNodeUI();},_propagateSetEndDate:function(A,L,Y){var X=j.clone(A.get(aO));j.copyHours(X,Y);A.set(aO,X);},_propagateSetStartDate:function(L,X,Y){var A=j.clone(L.get(bl));j.copyHours(A,Y);L.set(bl,A);},_setColor:function(L){var A=this;A[H]=aX.rgb2hsb(aX.getRGB(L));A[T]=aJ.clone(A[H]);A[T].b*=A.get(aV);A[T].s*=A.get(bc);A[aN]=aX.hsb2rgb(A[T]);return L;},_setDate:function(L){var A=this;if(ac(L)){L=new Date(L);}return L;},_setRepeat:function(L){var A=this;if(bi(L)){L=aJ.SchedulerEventRepeat[L];}return G(L)?L:null;},_setScheduler:function(X){var A=this;var L=A.get(af);if(L){A.removeTarget(L);}A.addTarget(X);return X;},_syncUIAttrs:function(){var A=this;A._uiSetDisabled(A.get(w));A._uiSetVisible(A.get(an));A._uiSetParentEvent(A.get(aK));A._uiSetRepeat(A.get(aM));},_formatDate:function(X,Y){var L=this;var A=L.get(bo);Y=Y||L.get(e);return aJ.DataType.Date.format(X,{format:Y,locale:A});},_getTitleDateFormat:function(X){var A=this;if(!bi(X)){var L=A.get(af);X=(L&&L.get(Q).get(aW))?d:a5;}return X;},_uiSetDisabled:function(L){var A=this;A.get(n).toggleClass(bf,!!L);},_uiSetParentEvent:function(L){var A=this;A.get(n).toggleClass(aA,!!L);},_uiSetRepeat:function(X){var A=this;var L=!!X&&X!==aJ.SchedulerEventRepeat[aY];A.get(n).toggleClass(al,L);},_uiSetVisible:function(L){var A=this;A.get(n).toggleClass(C,!L);}}});aJ.SchedulerEvent=V;aJ.SchedulerEventRepeat={never:{description:"Never repeat",validate:function(A,L){return false;},value:"never"},daily:{description:"Every day",validate:function(A,L){return true;},value:"daily"},monthly:{description:"Every month",validate:function(L,X){var Y=L.get(aO);var A=L.get(bl);return(A.getDate()===X.getDate());},value:"monthly"},monWedFri:{description:"Every Monday, Wednesday and Friday",validate:function(A,L){return j.isMonWedOrFri(L);},value:"monWedFri"},tuesThurs:{description:"Every Tuesday and Thursday",validate:function(A,L){return j.isTueOrThu(L);},value:"tuesThurs"},weekDays:{description:"Every week days",validate:function(A,L){return j.isWeekDay(L);},value:"weekDays"},weekly:{description:"Every week",validate:function(L,X){var Y=L.get(aO);var A=L.get(bl);return(A.getDay()===X.getDay());},value:"weekly"},yearly:{description:"Every year",validate:function(L,X){var Y=L.get(aO);var A=L.get(bl);return((A.getMonth()===X.getMonth())&&(A.getDay()===X.getDay()));},value:"yearly"}};var av=aJ.Lang,a=av.isArray,G=av.isObject,Q="activeView",J="allDay",c="arrow",aT="body",az="bodyContent",o="boundingBox",ay="cancel",a1="click",aF="content",aS="date",aG="dateFormat",ai="delete",a9="description",R="edit",bt="event",aR="eventClass",B="footerContent",aD="form",z="header",u="hide",aW="isoTime",aE="link",n="node",O="offsetHeight",bg="offsetWidth",h="overlay",S="overlayOffset",bu="recorder",bq="rendered",aM="repeat",a3="save",af="scheduler",m="schedulerChange",au="scheduler-event",aw="scheduler-event-recorder",aC="shadow",aB="show",F="startDateChange",N="strings",a6="template",aU="title",bs="tl",ab="toolbar",bk="submit",bm="value",aQ="visibleChange",Z="when",ak="x",aj="y",ae="cancel",M="delete",y="edit",aI="save",bv="-",g=".",ad="",i="#",r=aJ.IO.prototype._serialize,E=aJ.getClassName,s=E(af,bt),ao=E(af,bt,bu),bw=E(af,bt,bu,h),x=E(af,bt,bu,h,c),be=E(af,bt,bu,h,c,aC),ah=E(af,bt,bu,h,aT),a7=E(af,bt,bu,h,aF),ag=E(af,bt,bu,h,aS),U=E(af,bt,bu,h,aD),by=E(af,bt,bu,h,z),aq=E(af,bt,bu,h,aM),D=E(af,bt,aU),K=new aJ.Template('<div class="',be," ",x,'"></div>','<div class="',x,'"></div>','<input type="hidden" name="startDate" value="{startDate}" />','<input type="hidden" name="endDate" value="{endDate}" />','<div class="',by,'">','<input class="',a7,'" name="content" value="{content}" />',"</div>",'<div class="',ah,'">','<label class="',ag,'">{date}</label>','<select class="',aq,'" name="repeat">','<tpl for="eventRepeat">','<option {[ (parent.repeat && parent.repeat.value) == parent.eventRepeat[$i].value ? \'selected="selected"\' : "" ]} value="{value}">{description}</option>',"</tpl>","</select>","</div>"),bx='<form class="'+U+'" id="schedulerEventRecorderForm"></form>';var W=aJ.Component.create({NAME:aw,ATTRS:{allDay:{value:false},content:{value:ad},duration:{value:60},dateFormat:{validator:bi,value:"%a, %B %d,"},event:{},eventClass:{valueFn:function(){return aJ.SchedulerEvent;}},strings:{value:{},setter:function(A){return aJ.merge({"delete":"Delete","description-hint":"e.g., Dinner at Brian's","no-repeat":"No repeat",cancel:"Cancel",description:"Description",edit:"Edit",repeat:"Repeat",save:"Save",when:"When"},A||{});},validator:G},overlay:{validator:G,value:{align:{points:[bs,bs]},visible:false,width:300,zIndex:500}},overlayOffset:{value:[15,-38],validator:a},template:{value:K},toolbar:{setter:function(X){var L=this;var A=L.get(N);return aJ.merge({children:[{handler:aJ.bind(L._handleSaveEvent,L),label:A[a3]},{handler:aJ.bind(L._handleCancelEvent,L),label:A[ay]},{handler:aJ.bind(L._handleDeleteEvent,L),label:A[ai]}]},X||{});},validator:G,value:{}}},EXTENDS:aJ.SchedulerEvent,prototype:{initializer:function(){var A=this;
A.get(n).addClass(ao);A.publish(ae,{defaultFn:A._defCancelEventFn});A.publish(M,{defaultFn:A._defDeleteEventFn});A.publish(y,{defaultFn:A._defEditEventFn});A.publish(aI,{defaultFn:A._defSaveEventFn});A.after(m,A._afterSchedulerChange);A[h]=new aJ.Overlay(A.get(h));A[ab]=new aJ.Toolbar(A.get(ab));},_afterSchedulerChange:function(Y){var A=this;var X=Y.newVal;var L=X.get(o);L.delegate(a1,aJ.bind(A._onClickSchedulerEvent,A),g+s);},_defCancelEventFn:function(L){var A=this;A.get(n).remove();A.hideOverlay();},_defDeleteEventFn:function(X){var A=this;var L=A.get(af);L.removeEvent(A.get(bt));A.hideOverlay();L.syncEventsUI();},_defEditEventFn:function(X){var A=this;var L=A.get(af);A.hideOverlay();L.syncEventsUI();},_defSaveEventFn:function(X){var A=this;var L=A.get(af);L.addEvent(X.newSchedulerEvent);A.hideOverlay();L.syncEventsUI();},_handleCancelEvent:function(L){var A=this;A.fire(ae);L.preventDefault();},_handleDeleteEvent:function(L){var A=this;A.fire(M,{schedulerEvent:A.get(bt)});L.preventDefault();},_handleSaveEvent:function(L){var A=this;A.fire(A.get(bt)?y:aI,{newSchedulerEvent:A.getEventCopy()});L.preventDefault();},_onClickSchedulerEvent:function(X){var A=this;var L=X.currentTarget.getData(au);if(L){A.set(bt,L);A.showOverlay([X.pageX,X.pageY]);A.get(n).remove();}},_onOverlayVisibleChange:function(Y){var L=this;if(Y.newVal){L.populateForm();if(!L.get(bt)){var X=L[h].get(o);var A=X.one(g+a7);setTimeout(function(){A.selectText();},0);}}else{L.set(bt,null);L.get(n).remove();}},_onSubmitForm:function(L){var A=this;A._handleSaveEvent(L);},_renderOverlay:function(){var L=this;var A=L.get(N);L[h].render();L[ab].render();var X=L[h].get(o);X.addClass(bw);L[h].set(B,L[ab].get(o));L[h].on(aQ,aJ.bind(L._onOverlayVisibleChange,L));L.formNode=aJ.Node.create(bx);L[h].set(az,L.formNode);L.formNode.on(bk,aJ.bind(L._onSubmitForm,L));},getEventCopy:function(){var A=this;var X=A.get(bt);if(!X){X=new (A.get(aR))({allDay:A.get(J),endDate:A.get(aO),scheduler:A.get(af),startDate:A.get(bl)});X.copyPropagateAttrValues(A,{content:true});}var L=A.serializeForm();X.set(aF,L[aF]);X.set(aM,L[aM]);return X;},getFormattedDate:function(){var X=this;var L=X.get(aG);var bz=(X.get(bt)||X);var bB=bz.get(aO);var bA=bz.get(af);var A=bz.get(bl);var Y=(bA.get(Q).get(aW)?j.toIsoTimeString:j.toUsTimeString);return[bz._formatDate(A,L),Y(A),bd,Y(bB)].join(q);},getTemplateData:function(){var L=this;var A=L.get(N);var X=(L.get(bt)||L);return{content:X.get(aF)||A["description-hint"],date:L.getFormattedDate(),endDate:X.get(aO).getTime(),eventRepeat:L.eventRepeatArray,repeat:X.get(aM),startDate:X.get(bl).getTime()};},hideOverlay:function(){var A=this;A[h].hide();},populateForm:function(){var A=this;if(!A.eventRepeatArray){A.eventRepeatArray=[];aJ.each(aJ.SchedulerEventRepeat,function(L){A.eventRepeatArray.push({description:L[a9],value:L[bm]});});}A.formNode.setContent(A.get(a6).parse(A.getTemplateData()));},serializeForm:function(){var A=this;return aJ.QueryString.parse(r(A.formNode.getDOM()));},showOverlay:function(Y,bA){var A=this;var X=A.get(S);if(!A[h].get(bq)){A._renderOverlay();}A[h].show();if(!Y){var L=(A.get(bt)||A).get(n);var bz=L.one(g+D);bA=[X[0]+bz.get(bg),X[1]+bz.get(O)/2];Y=bz.getXY();}bA=bA||X;Y[0]+=bA[0];Y[1]+=bA[1];A[h].set("xy",Y);}}});aJ.SchedulerEventRecorder=W;},"@VERSION@",{skinnable:true,requires:["aui-base","aui-color-util","aui-datatype","aui-template","aui-toolbar","io-form","querystring","overlay"]});