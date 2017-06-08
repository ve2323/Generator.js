var allTags = {p:"p",h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",b:"b",i:"i",a:"a",img:"img",div:"div",span:"span",canvas:"canvas",button:"button",big:"big",br:"br",center:"center",dd:"dd",dl:"dl",dt:"dt",em:"em",embed:"embed",font:"font",form:"form",head:"head",hr:"hr",input:"input",li:"li",link:"link",marquee:"marquee",menu:"menu",meta:"meta",body:"body",html:"html",ol:"ol",ul:"ul",option:"option",small:"small",strike:"strike",strong:"strong",table:"table",td:"td",th:"th",title:"title",tr:"tr",tt:"tt",u:"u",iframe:"iframe",abbr:"abbr",address:"address",area:"area",article:"article",aside:"aside",audio:"audio",base:"base",bdi:"bdi",bdo:"bdo",blockquote:"blockquote",canvas:"caption",caption:"caption",cite:"cite",code:"code",col:"col",colgroup:"colgroup",datalist:"datalist",del:"del",details:"details",dfn:"dfn",dialog:"dialog",fieldset:"fieldset",figcaption:"figcaption",figure:"figure",footer:"footer",header:"header",ins:"ins",kbd:"kbd",keygen:"keygen",label:"label",legend:"legend",main:"main",map:"map",mark:"mark",menuitem:"menuitem",meter:"meter",nav:"nav",noscript:"noscript",object:"object",optgroup:"optgroup",output:"output",param:"param",picture:"picture",pre:"pre",progress:"progress",q:"q",rp:"rp",rt:"rt",ruby:"ruby",s:"s",samp:"samp",script:"script",section:"section",select:"select",small:"small",source:"source",style:"style",sub:"sub",summary:"summary",sup:"sup",tbody:"tbody",textarea:"textarea",tfoot:"tfoot",thead:"thead",time:"time",track:"track",var:"var",video:"video",wbr:"wbr"};
var tags, clone = {};
var Generator = {
	init: function (creation){
		tags=(isObject(creation))?creation:allTags;
    	for(var t in tags){corrolation(t);}
    	return this;
	},
	addFunc: function(func){
		if(exist(func)&&isObject(func)){
			for(var f in func){if(isFunc(func[f])){(func[f])();} else{
				if(isObject(func[f])){(func[f][Object.keys(func[f])[0]])(func[f][Object.keys(func[f])[1]]);} 
			}}
		}
	}
}; function corrolation(name, fresh){
	var element = (isBoolean(fresh)&&fresh) ? name : tags[name];
	clone[name] = element;
	window[name+"tag"] = function(object,register){
		var tag = (function(){if(isObject(register)){element=document.registerElement(element,register);return new element()}else{return document.createElement(element)}})();
		setNodeTrait(this, name, tag, object);
		nodeProto(window[name+"tag"], tag);
	} // instantiate on call
	window[name] = function(object,register){return new window[name+"tag"](object,register);}
}

/* Condition */
function exist(item){return item != 'undefined' && item != null;}
function isString(item){return typeof(item) === 'string';}
function isObject(item){return typeof(item) === 'object';}
function isBoolean(item){return typeof(item) === 'boolean';}
function isFunc(item){return typeof(item) === 'function';}

/* Desolate */
// set prototype functions
function nodeProto(proto, tag){
	proto.prototype.append = function(container) { (exist(container)) ? container.appendChild(tag) : document.body.appendChild(tag); return container; };
	proto.prototype.mutate = function(mutation,countdown) {setTimeout(function(){tag.parentNode.replaceChild(new DOMParser().parseFromString(tag.outerHTML.replace(new RegExp(tag.tagName,'ig'),mutation),"text/html").body.childNodes[0],tag);}, countdown);};
	proto.prototype.control = function(callback) {callback(tag, proto);};
} // set text node specific attributes
function setNodeTrait(owner, name, node, object){
	if(exist(object) && isObject(object)){

		owner.name = name;
		owner.element = node;

		var objKey = "append";
		if((objKey in object)){
			var target = object[objKey];
			(exist(target)) ? target.appendChild(node) : document.body.appendChild(tag);
			delete object[objKey];
		} 

		objKey = "text";
		if((objKey in object)){
			var target = object[objKey];
			if(isString(target)){node.innerHTML = target;}
			delete object[objKey];
		} 

		objKey = "reaper";
		if((objKey in object)){
			var target = object[objKey];
			var firstrun = true;
			var observer = new MutationObserver(function(mutations) {
			  mutations.forEach(function(mutation) {
			    if(!firstrun&&mutation.removedNodes[0]==node&&mutation.removedNodes.length>0&&exist(mutation.removedNodes)){
			    	for(var n in target){if(target[n].getAttribute("phoenix")!="true"){target[n].parentNode.removeChild(target[n]);}}
					observer.disconnect();
			    }
			    firstrun = false;
			  });    
			});
			observer.observe(node.parentNode, {childList: true});
			delete object[objKey];
		}

		for(var key in object){ node.setAttribute(key, object[key]); }
	}
}

/* actions */
function append(container, element){container.appendChild(element);}
function docbody(){return document.body;}
function getSelection(){return clone;}
function selectionNames(){var list=[]; for(var key in clone){list.push(key)} return list;}
function destroy(list){for(var key in list){delete window[list[key]]; delete clone[list[key]];}}
function revive(list){for(var key in list){if((list[key] in tags)){corrolation(tags[list[key]], true)}}}
function rewrite(object){for(var key in object){if(exist(window[key])){window[object[key]]=window[key]; delete window[key];}}}
function mutate(tag, mutation, countdown) {setTimeout(function(){tag.parentNode.replaceChild(new DOMParser().parseFromString(tag.outerHTML.replace(new RegExp(tag.tagName,'ig'),mutation),"text/html").body.childNodes[0],tag);},(exist(countdown))?countdown:0);}