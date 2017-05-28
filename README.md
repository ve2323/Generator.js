# Generator.js

Generator.js is a lightweight javascript module which allows greater control over html(5) node/element-generation using pure javascript.
This project consist of base code aswell as a minified version.
- Created using pure javascript.
- No dependencies.
- File size:
  - Base file size: 5,05kb
  - Minified file size: 3,65kb

## Functionality
- Generate function-names specified through object key
  - Generate elements specified through object value by calling set function
    - Generator.init(*object specifying what to create*)
      - call as Generator.init({*function name*:"*tag to create*"})
        - will create specified functions which in turn can be called to create elements/nodes
          - if no param is specified all possible functions based on tagnames will be generated automatically
        - !important required in order to use project functionality
  - Pass object into function to set node values
    - unique keys as follows:
      - text:"*insert innerhtml here*"
        - Sets innerHtml of node
      - append:*where to append this node to if applicable*
        - Append this node to document
      - Reaper:[*list of nodes to be removed if this node itself is removed*]
        - Removes all specified nodes when this node is removed
      - Phoenix:true
        - Nodes specified with phoenix trait will not be affected by a reaper node
    - any non-unique keys and values will be set as node attributes in the following manner:
      - key=*value*
- Prototype:
  - .Mutate()
    - call as .mutate(*tag to mutate into*, *optional: timeout in milliseconds*)
      - this will mutate node called into another type of tag
      - will interfere reaper nodes
  - .append()
    - call as .append(*optional: container to append to*)
      - will append to specified container, if none is specified node will be appended to document.body
  - .control()
    - call as . control(function(tag, proto){console.log(tag);})
      - takes a function as argument and returns tag and prototype object as callback
 - Properties:
   - .name
     - will provide the object name
   - .element
     - will return generated element as node
- Anonymous:
  - docbody()
    - returns document.body
  - append()
    - call as append(*container*, *element*)
      - appends element to container
  - getSelection()
    - returns a copy of the object used to create the currently existing functions
  - selectionNames()
    - returns a list of all currently callable functions
  - destroy()
    - call as destroy(*object specifying which functions to destroy*)
      - structured as key:*value*
      - destroys all specified functions
      - NOTE: param will be changed to list instead of object in a near future
  - revive()
    - call as revive(*list of function names to revive*)
      - will attempt to revive destroyed functions
      - cannot revive anything that was not a part of the original object
  - rewrite()
    - call as rewrite(*object specifying new name for existing function*)
    - structured as *current function*:*new function name*
  - mutate()
    - call as mutate(*element*, *what to mutate tag into*, *optional: timeout in milliseconds*)
    - will interfere with reaper nodes
- Custom tags:
  - custom tags are possible by passing a secondary object containing its properties into a generated function
    - custom tags are initialized exactly like regular tags but accepts a secondary object as param
    - call as *function*(*object attributes and specifics*, *Optional: object containing custom tag properties*)
      - will create a custom tag using registerElement (this is deprecated but still the better choice due to its increased compatibility)
- Anonymous conditionals:
  - exist(*param*)
    - checks if param is not null or undefined
  - isString(*param*)
    - checks if param is string
  - isObject(*param*)
    - checks if param is object
  - isBoolean(*param*)
    - checks if param is boolean

## Example code
```
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

// destroys all specified functions by key
destroy(selection);

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
```
