 document.addEventListener("DOMContentLoaded", function(event){

	// init generator
	// empty argument will generate all possible functions available
	Generator.init({
		p:"p",
		h1:"h1",
		h2:"h2",
		h3:"h3",
		h4:"h4",
		h5:"h5",
		h6:"h6",
		a:"a",
		div:"div",
		button:"button",
		test:"test-tag"
	});

	// automatically run functions specified in object
	// params can be set by setting key value to object containing function and params
	// ^The first instance of key value object will trigger as the main function and the second instance will trigger as param
	Generator.addFunc({
		spam:function(){console.log("You've got mail!");},
		kitten:function(){console.log("Meow");},
		arc:{func:function(item){console.log(item.text);},item:{text:"I'm a param!"}}
	});

	// builds h1 element with the text 'hello world'
	// sets attributes id="id" and class="class"
	// appends element to body
	// returns node and sets the variable tagtest1 to this node
	var tagtest1 = h1({text:"hello world", phoenix:true, id: "id", class:"class", append:docbody()}).element;

	// builds h2 element with the text 'hello world'
	// sets attributes id="id" and class="class"
	// appends element to body
	// mutates this element into a 'p' element after 2 seconds
	h2({text:"hello world", id: "id", class:"class", append:docbody()}).mutate("p", 2000);

	// builds imgur element with the text 'hello world'
	// sets attributes id="id" and class="class"
	// appends element to body
	// additional object will result in the use of document.registerElement
	// callback function that returns tag and proto object to allow full control
	test({text:"hello world", id: "id", class:"class", append:docbody()}, {
	  prototype: Object.create(HTMLElement.prototype)
	}).control(function(tag,proto){
		console.log(tag);
	});

	// builds h4 element with the text 'hello world'
	// sets attributes id="id" and class="class"
	// appends element to body
	h4({text:"hello world", id: "id", class:"class", append:docbody()});

	// builds h5 element with the text 'hello world'
	// sets attributes id="id" and class="class"
	// appends element to body
	var mutationtag = h5({text:"hello world", id: "id", class:"class", append:docbody()}).element;

	// mutates the element stored in mutationtag into a h1 element after 5 seconds
	// mutate cannot be used by nodes affected by a reaper unless they are set as phoenix nodes
	// params: 
	// <DOM node>, 
	// <what type you want it to mutate into>, 
	// <timeout in milliseconds if needed, if none is specifed it will set timeout with the base 0>
	mutate(mutationtag, "h1", 5000);

	// builds h6 element with the text 'hello world'
	// sets attributes id="id" and class="class"
	// appends element to body
	// returns node and sets the variable tagtest2 to this node
	var tagtest2 = h6({text:"hello world", id: "id", class:"class", append:docbody()}).element;

	// builds a element with the text 'link'
	// sets attributes id="id", class="class" and href="https://www.google.com/"
	// appends element to body
	a({text:"link", id: "id", class:"class", href:"https://www.google.com/", style:"color:red;", append:docbody()});

	// builds div element with attributes id="id" and class="class"
	// appends div element to body
	// returns node
	// builds p element with the text 'hello world'
	// sets attributes id="id" and class="class"
	// appends p to div node
	p({text:"hello world", id: "id", class:"class"}).append(div({id: "id", class:"class", append:docbody()}).element);

	// builds p element with the text 'hello world'
	// turns node into reaper which will destroy all specified nodes if this node itself is destroyed
	// sets attributes id="toremove" and class="class"
	// appends to body
	p({text:"hello world", reaper:[tagtest1,tagtest2], id: "toremove", class:"class", append:docbody()});

	// builds button element with the text 'hello world'
	// sets attributes id="id" and class="class"
	// appends element to body
	// adds listener which will remove specified element on click
	button({text:"hello world", id: "id", class:"class", append:docbody()}).element.addEventListener("click",function(event){
		document.getElementById("toremove").remove();
	});

	// retrieves all current specified function names and values within an object
	var selection = getSelection();

	// retrieves all specification keys as list
	var revival = selectionNames();

	// destroys all specified functions by name
	destroy(revival);

	// revives all specified functions by key name
	// cannot revive anything that was not a part of original specification
	revive([revival[0],revival[3]]);

	// builds p element with the text 'hello world'
	// sets attributes id="id" and class="class"
	// appends element to body
	p({text:"hello world", id: "id", class:"class", append:docbody()});

	// rewrites function name 'p' to 'radegast'
	rewrite({p:"radegast"});

	// calls new function and makes a h1 tag with specified attributes
	radegast({text:"hello world", id: "id", class:"class", append:docbody()});

}, false);