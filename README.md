__b__JS Framework (Dev Version)
=======



Give your JS App MVC | MTV pattern with Models, Views, Controllers, Templates, Events, Connections, Real Time Communications, etc...

      This framework was developed with the sole intention of contributing. 
      The contribution of users is important, as well as constructive criticism.
      
      "Please contribute"

Compatibility with browsers
=======
    
        -IE > 9
        -Chrome > 32
        -Firefox > 28
        -Opera 23 >
        -Safari 6 >
        
        *If there is any browser incompatibility please notify*


Including Scripts
=======

*"YOUR INCLUDE PATH" : Is used to include different libraries of the framework, as well as external libraries or drivers in the directory*

*Example: (/assets/js/_b_/)*    

```html    
<script src="YOUR PATH/__b__/base/__b__.min.js" data-path="YOUR INCLUDE PATH"></script>
<script src="YOUR PATH/__b__/controller/YOUR CONTROLLER.min.js"></script>
```
*The files to be precompiled at include .min.js. You can use uglify or other precompiled to generate it .min*


DOM Tools
=======
**Creating a DOM object**

*This method helps you find DOM objects and generate $ object*

```js
var my_selector = __.$('<div></div>');
var my_selector = __.$('.selector');
var my_selector = __.$('.selector:pseudo');
var my_selector = __.$('.selector_parent .selector_child');
var my_selector = __.$('#selector');
```
    
*You can try many possibilities to find and get dom elements*

*Now we can use it.*

**Attribute `exist`**

*(Verify DOM element existence)*

```js
var my_selector = __.$('.dom_to_verify');
if(my_selector.exist){
    //TRUE if my_selector exist in DOM tree
}
```
    
**Method `.object()`**

*(Return $ object)*
```js    
var my_selector = __.$('.$_to_get');

my_selector.object(); //Return $ object
```
**Method `.ready()`**

*(Used for the execution of our code, when the Document Object ready)*
```js    
var my_selector = __.$(document);

//The selector must be a document object
my_selector.ready(function(){
    /* My code */
}); 
```    
**Method `.load()`**

*(Used for the execution of our code, when the the complete page is fully loaded)*
```js    
var my_selector = __.$(window);

//The selector must be a window object
my_selector.load(function(){
    /* My code */
});
```    

**Method `.filter(filter, callback, e_handler(optional))`**

*(Filter pattern match)*
```js
var my_selector = __.$('.selector');

my_selector.children(function(child){
    __.$(child).filter('.child_1', function(){

        /*Is .child_1 inside .selector ?*/
        
    },function(){
        /*Not founded*/
    })
})
```    
    
**Method `.empty(void)`**

*(Empty DOM Object)*
```js
var my_selector = __.$('.selector');

my_selector.empty(); // Dom Empty
```   
   
**Method `.clone(bool)`**

*(Clone Object. Optional clone child's object)*
```js
var my_selector = __.$('.selector'),
    _clone_with_child,
    _clone_not_child;

_clone_with_child = my_selector.clone(true); //Clone Childs
_clone_not_child = my_selector.clone();
```    
    
**Method `.data('data_name', 'data_value')`**

*(Data Object. If data_value is passed, it assigned to object, else it returned )*

```html
<button id="my_button" data-id="5"></button>
```
```js
var my_selector = __.$('#my_button');

my_selector.data('id'); // Returns 5
my_selector.data('id', 10); // Assign 10. 
```
```html
//RESULT OF ASSIGN
<button id="my_button" data-id="10"></button>
```    
    
**Method `.prop('prop_value')`**

*(Prop Object. If prop_value object type is passed, it assigned, else if prop_value is string type, then value is returned)*

```html
<button id="my_button">My Example</button>
```
```js
var my_selector = __.$('#my_button');

my_selector.prop('textContent'); // Returns My Example
my_selector.data({'textContent': My Other Example}); // Assign My Other Example. 
```
```html
//RESULT OF ASSIGN
<button id="my_button">My Other Example</button>
```

**Method `.attr('attr_value')`**

*(Attr Object. If attr_value object type is passed, it assigned, else if attr_value is string type, then value is returned)*
```html
    //HTML BUTTON
    <a href="http://out.com">My Link</a>
```
```js
    var my_selector = __.$('a');
    
    my_selector.attr('href'); // Returns http://out.com
    my_selector.attr({'href': 'http://inner.com'}); // Assign http://inner.com. 
```
```html
    //RESULT OF ASSIGN
    <a href="http://inner.com">My Link</a>
``` 
**Method `.removeAttr('attr_name')`**

*(Remove Attr from Object. Attr_name needed )*

    //HTML BUTTON
    <a href="http://out.com">My Link</a>
    
    var my_selector = __.$('a');
    
    my_selector.removeAttr('href'); // Remove href
    
    //RESULT OF REMOVE
    <a>My Link</a>


**Method `.css('style_name')`**

*(CSS Object. If style_value object type is passed, it assigned, else if css_value is string type, then value is returned)*

    //HTML BUTTON
    <div style="border:none; background-color:#ccc;"></div>
    
    var my_selector = __.$('div');
    
    my_selector.css('background-color'); // Returns #ccc
    my_selector.css({'color': '#666'}); // Assign color:#666 
    
    //RESULT OF ASSIGN
    <div style="border:none; background-color:#ccc; color:#666;"></div>
    
**Method `.after(html || _$ Object)`**

*(Insert DOM object after element)*

    var my_selector = __.$('.first_div'),
        second_div = __.$('.second_div');
    
    my_selector.after(second_div);
    second_div.after('<div class="third_div"></div>');
    
    
**Method `.before(html || _$ Object)`**

*(Insert DOM object before element)*

    var my_selector = __.$('.third_div'),
        second_div = __.$('.second_div');
    
    my_selector.before(second_div);
    second_div.before('<div class="first_div"></div>');
    
    
**Method `.append(html || _$ Object)`**

*(Append DOM object)*
  
    var my_selector = __.$('.third_div'),
        second_div = __.$('.second_div');
    
    my_selector.append(second_div);
    my_selector.append('<div class="first_div"></div>');


**Method `.html('html')`**

*(Create HTML in DOM object. If html is passed is assigned else is returned)*
  
    var my_selector = __.$('div');
    
    my_selector.html('<div></div>');
    my_selector.html('Text'); // Replace div
    my_selector.html(); //Return "Text" 
    
**Method `.text('text')`**

*(Create Text in DOM object. If text is passed is assigned else is returned)*
  
    var my_selector = __.$('div');
    
    my_selector.text('Text'); //Text node created
    my_selector.text(); //Return Text
    
**Method `.val('text')`**

*(Assign value in DOM object. If value is passed is assigned else is returned)*

    //HTML INPUT
    <input type="text" value="">
  
    var my_selector = __.$('input[type="text"]');
    
    my_selector.val('My value'); //Value assigned
    my_selector.val(); //Return My value

    //RESULT OF VAL
    <input type="text" value="My value">


**Method `.hide()`**

*(Hide DOM Object)*

    var my_selector = __.$('div');
    
    my_selector.hide(); //Element display none

**Method `.show()`**

*(Show DOM Object)*

    var my_selector = __.$('div');
    
    my_selector.show(); //Element display block

**Method `.parent(callback)`**

*(Get Dom Parent first. Callback Needed)*

    //HTML
    <div class="parent">
        <div class="child"></div>
    </div>
    
    var my_selector = __.$('child');
    
    my_selector.parent(function(parent){
        __.$(parent) // Object class parent
    }); 
    
    
**Method `.parents(parent_class, callback)`**

*(Get Dom Parent Until. Parent_class and Callback Needed)*

    //HTML
    <div class="parent">
        <div class="child">
            <div class="grandson"></div>
        </div>
    </div>
    
    var my_selector = __.$('.grandson);
    
    my_selector.parents('.parent', function(parent){
        __.$(parent) // Object class parent
    }); 
    
**Method `.children(callback)`**

*(Get Child Nodes. Callback Needed)*

    //HTML
    <div class="parent">
        <div class="child"></div>
    </div>
    
    var my_selector = __.$('parent');
    
    my_selector.parent(function(child){
        __.$(child) // Object class child
    }); 
    
    
**Method `.next(callback)`**

*(Get next sibling Node. Callback Needed)*

    //HTML
    <div class="parent">
        <div class="child_1"></div>
        <div class="child_2"></div>
    </div>
    
    var my_selector = __.$('child_1');
    
    my_selector.next(function(sibling){
        __.$(sibling) // Object class child_2
    }); 
    
    
**Method `.nexts(filter, callback)`**

*(Get next sibling Node. Callback Needed, if filter is passed the child are matched else return all)*

    //HTML
    <div class="parent">
        <div class="child_1"></div>
        <div class="child_2"></div>
        <div class="child_2"></div>
        <div class="child_3"></div>
    </div>
    
    var my_selector = __.$('child_1');
    
    my_selector.nexts('.child_2', function(siblings){
         // Object list class child_2
    }); 
    
     my_selector.nexts(function(siblings){
             // Object list child_2, child_2, child_3 
             // All nexts nodes returned
        }); 
        
**Method `.find(filter, callback)`**

*(Get next sibling Node. Filter and Callback Needed)*

    //HTML
    <div class="parent">
        <div class="child_1"></div>
        <div class="child_2"></div>
        <div class="child_2"></div>
        <div class="need_be_found"></div>
    </div>
    
    var my_selector = __.$('parent');
    
    my_selector.find('.need_be_found', function(found){
          __.$(found) // Object class need_be_found is inside .parent?
    }); 
    
**Method `.hasClass(elem, class)`**

*(Verify Class in element. Return true if the class is founded in element else return false)*

    var my_selector = __.$('.div');
    if(__.hasClass(my_selector,'class2')){
        //TRUE IF .div has the class2
    }
   
**Method `.addClass(class)`**

*(Add a new class to an element)*

    var my_selector = __.$('.div');
    
    my_selector.addClass('div2') // Add the class div2 to .div
   
    //RESULT
    <div class="div div2"></div>
   
**Method `.toggleClass(class)`**

*(Toggle class in element)*

    var my_selector = __.$('.div');
    
    my_selector.toggleClass('div') // If have the class its removed else is added


**Method `.removeClass(class)`**

*(Remove class from element)*

    var my_selector = __.$('.div');
    
    my_selector.removeClass('div') // If have the class its removed
   
    //RESULT
    <div></div>
    
    
**Method `.fadeOut(mseconds)`**

*(Fade Out element. If mseconds is passed it used for time fade else default is 50)*

    var my_selector = __.$('.div');
    
    my_selector.fadeOut(100)

**Method `.fadeIn(mseconds)`**

*(Fade In element. If mseconds is passed it used for time fade else default is 50)*

    var my_selector = __.$('.div');
    
    my_selector.fadeIn(100)

**Method `.width(int)`**

*(Assign or return width of element. If int value is passed its assigned to element else return the width )*

    var my_selector = __.$('.div');
    
    my_selector.width(100) // Assign 100 to width
    my_selector.width() // Return width
    
**Method `.height(int)`**

*(Assign or return height of element. If int value is passed its assigned to element else return the height )*

    var my_selector = __.$('.div');
    
    my_selector.height(100) // Assign 100 to height
    my_selector.height() // Return height

**Method `.is(class|pseudo-class|prop)`**

*(Verify element. Para needed )*

    var my_selector = __.$('.div');
    
    if(my_selector.is('.div')){
         //TRUE IF my_selector is .div
    }
    
**Method `.get(element)`**

*(Return child element. Param element needed)*
    
    //HTML
        <div class="parent">
            <div class="child">
                <div class="grandson"></div>
            </div>
    </div>
    
    var my_selector = __.$('.parent');
    
    my_selector.get('.child') // Return .child

**Method `.each(callback)`**

*(Loop childs of element. Param callback needed)*
    
    //HTML
    <div class="parent">
        <div class="child"></div>
        <div class="child2"></div>
    </div>
    
    var my_selector = __.$('.parent');
    
    my_selector.each(function(v,i,p){
        v // Element
        i // Index
        p // Loop Control { p.last or p.first}
        
        v (.child)
        i (0)
        p (p.first is TRUE)
        
        v (.child2)
        i (1)
        p (p.first is FALSE and p.last is TRUE)
        
    })
    
**Method `.offset(object)`**

*(Assign or return offset element. If object is passed its assigned to element else return the offset)*

    var my_selector = __.$('.div');
    
    my_selector.offset({x:10,y:10}) // Assign position x and y to element
    my_selector.offset() // return {top:int,left:int,bottom:int,right:int}
 
**Method `.sort(prop(optional) , bool (optional), elem(optional))`**

*(Sort elements. If prop is passed is sorted by prop,if bool is true is order desc)*

    //HTML
     <ul class="parent">
           <li>B</li>
           <li>A</li>
           <li>D</li>
           <li>C</li>
     </ul>
    
    var my_selector = __.$('.parent li');
    
    my_selector.sort() // Sort Element by default innerHtml prop, order asc
    
    //RESULT ASC
    <ul class="parent">
       <li>A</li>
       <li>B</li>
       <li>C</li>
       <li>D</li>
    </ul>

**Method `.trigger(event, callback)`**

*(Trigger Event. Event and Callback Needed)*

    var body = __.$('body'),
        my_selector = __.$('.div');
    
    my_select.addEventListener('click', function(){
        alert('I am clicked');
    });
    
    body.addEventListener('click', '.div', function(){
            alert('I am clicked as delegated');
    });
    
    body.addEventListener('click', '.div1', function(){
                alert('I am clicked as delegated in div1');
    });   
    
    
    my_selector.trigger('click'); // alert I am Clicked and I am clicked as delegated
    __.$('.div1').trigger('click') // alert I am clicked as delegated in div1
   
    

Events
--------------

**Method `.addListener(event, delegate(optional), callback)`**

*(Add event listener to object)*

    var body = __.$('body'),
        my_selector = __.$('.selector');
        
    //Event delegation
    body.addListener('click', '.selector', function(e){
        
        /*My Code*/
        
    }).addListener('keydown','textarea', function(e){
    
        /*My Code*/
        
    })
    
    //Event assign
    my_selector('click', function(e){
        
        /*My Code*/
        
    })
    
**Method removeListener in dev**
    
Helpers
--------
    
**Method `.limit_input_box(event Object, max_input_length)`**

*(Validate if input value length is less to max_input_length)*
    
    __.$('input[type="text"]').addListener('keydown', function(e){
        __.limit_input_box(e,50); // If input times is greater than 50, the event is prevented   
    
        //Code
    })
      
      
**Method `.cartesian_plane($ Object || Object, all)`**

*(Return the cartesian plane object info. If param all is passed return all selector matches info)*
    
    var my_selector = __.$('input[type="text"]');
    
    __.cartesian_plane(my_selector);
    //  return {
                   bottom: 565
                   left: 0
                   right: 346
                   top: 0
                   height: 565
                   width: 366
               }


**Method `.get_element_index(Dom Object)`**

*(Return the index position in DOM tree)*
    
    var my_selector = __.$('input[type="text"]').object();
    
    __.get_element_index(my_selector);
    //  return 5 assuming position


B Methods
=======

Validation
--------------
**Method `.assert(param, msg)`**

*(Validate if a param is seted). param needed, msg default = Param needed*
    
      function test (param){
        __.assert(param,'Param is needed');
        alert(param);
      }
      
      test(); //assert is executed
      test('Param passed'); //assert is omitted
      

**Method `.is_array(param)`**

*(Validate if param is Array)*
    
     var no_array = 'I am not Array', 
         my_array = [1,2,3];
         
     __.is_array(no_array) // Return FALSE
     __.is_array(my_array) // Return TRUE

**Method `.is_object(param)`**

*(Validate if param is Object)*
    
     var no_object = 'I am not Object', 
         my_object = {a:1,b:2,c:3};
         
     __.is_object(no_object) // Return FALSE
     __.is_object(my_object) // Return TRUE    

  
**Method `.is_global(param)`**

*(Validate if param is Global Dom element. Example = Window || Document || ...)*
    
     var no_global = __.$('body').object() || document.body, 
         my_global = document;
         
     __.is_global(no_global) // Return FALSE
     __.is_global(my_global) // Return TRUE
        
**Method `.is_$(param)`**

*(Validate if param is $ object.) *
    
     var no_$ = document, 
         my_$ = __.$('body');
         
     __.is_$(no_$) // Return FALSE
     __.is_$(my_$) // Return TRUE 
      
**Method `.is_string(param)`**

*(Validate if param is String.)*
    
     var no_string = document, 
         my_string = 'String example';
         
     __.is_string(no_string) // Return FALSE
     __.is_string(my_string) // Return TRUE
      
**Method `.is_function(param)`**

*(Validate if param is Function.)*
    
     var no_function = 'String example', 
         my_function = function(){
         
         };
         
     __.is_function(no_function) // Return FALSE
     __.is_function(my_function) // Return TRUE 
     
**Method `.is_html(param)`**

*(Validate if param is Html.)*
    
     var no_html = 'String example', 
         my_html = '<div>Hello!</div>';
         
     __.is_html(no_html) // Return FALSE
     __.is_html(my_html) // Return TRUE 
     
**Method `.is_boolean(param)`**

*(Validate if param is Boolean.)*
    
     var no_bool = 'String example', 
         my_bool = TRUE';
         
     __.is_boolean(no_bool) // Return FALSE
     __.is_boolean(my_bool) // Return TRUE
     
**Method `.is_regexp(param)`**

*(Validate if param is Regexp.)*
    
     var no_regexp = 'String example', 
         my_regexp = /[1-9]/g || new RegExp('[1-9]','g');
         
     __.is_regexp(no_regexp) // Return FALSE
     __.is_regexp(my_regexp) // Return TRUE
     
     
**Method `.is_set(param)`**

*(Validate if param is set.)*
    
     var no_set = undefined || NULL || FALSE, 
         my_set = 'Seted' || TRUE || ....;
         
     __.is_set(no_set) // Return FALSE
     __.is_set(my_set) // Return TRUE
     
**Method `.is_empty(param)`**

*(Validate if param is empty.)*
    
     var empty = '' || [] || ' ', 
         no_empty = [1,2,3,4] || 'Not Empty';
         
     __.is_empty(no_empty) // Return FALSE
     __.is_empty(empty) // Return TRUE
     
**Method `.is_url(param)`**

*(Validate if param is URL.)*
    
     var no_url = 'String Example', 
         my_url = 'http://google.com' || 'https://google.com';
         
     __.is_url(no_url) // Return FALSE
     __.is_url(my_url) // Return TRUE
     
**Method `.is_mail(param)`**

*(Validate if param is mail.)*
 
     var no_email = 'String Example', 
         my_email = 'i_am_mail@gmail.com';
          
     __.is_mail(no_mail) // Return FALSE
     __.is_mail(my_mail) // Return TRUE
     
**Method `.is_json(param)`**

*(Validate if param is JSON.)*
 
     var no_json = {a:1,b:2}, 
         my_json = '{"a":"1","b":"2"}';
          
     __.is_json(no_json) // Return FALSE
     __.is_json(my_json) // Return TRUE
     
**Method `.is_number(param)`**

*(Validate if param is Number.)*
 
     var no_number = 'No Number', 
         my_number = '123' || 123;
          
     __.is_number(no_number) // Return FALSE
     __.is_number(my_number) // Return TRUE
     

Helpers
----------

**Method `.warning(msg)`**

*(Show console warning.)*
           
     __.warning('Field Empty'); // 04:12:05 PM -> Field Empty
     
**Method `.error(msg)`**

*(Throw console error.)*
           
     __.error('No param'); // 04:12:05 PM -> No param
  
**Method `.interval(callback, conf)`**

*(Set interval function based in thread process)*
           
     //param conf example = {
                      delay: 0x32, // Time to wait between each loop 
                      limit: 0xA // max iterations if negative value is passed it is descendant
                    }
     _.interval(function (x) {
                 x // each value since 0 to limit
             }, conf);
             
**Method `.each(object || array, callback)`**

*(Intuitive objects or tour arrangements)*
           
     __.each([1,2,3], function(v,i,p){
        v // Element
        i // Index or Key
        p // Loop Control { p.last or p.first}
        
        v (1)
        i (0)
        p (p.first is TRUE)
        
        v (2)
        i (1)
        p (p.first is FALSE and p.last is FALSE)
        
        v (3)
        i (2)
        p (p.first is FALSE and p.last is TRUE)
     })

**Method `.callback_audit(callback, param1, param2, ..)`**

*(This verifies that the callback set, if so then runs it with the given parameters)*
    
    var _my_callback = function(a,b){
        alert(a);
        alert(b);
    }       
    __.callback_audit();//No callback, no execution and no errors throws, jus omitted
    __.callback_audit(_my_callback, 1, 2);//Callback executed with 1 and 2 parameters 

**Method `.extend(target, source, overwrite)`**

*(Extend Object)*
    
    var _my_target = {a:1,b:5},
        _my_source = {b:2,c:3};
        
    __.extend(my_target, _my_source); //Return {a:1,b:5,c:3} not overwrite the target
    __.extend(my_target, _my_source, TRUE); //Return {a:1,b:2,c:3}
    

**Method `include(script, wait, callback)`**

*(Includes scripts in a controlled environment)*
    
    //FIRST SCENARIO
    __.include('my_script.js', function(){
        //my_script ready
    })
   
    //Again the same inclusion
    //In this case the script is not obtained again only callback is executed
    __.include('my_script.js', function(){
           //my_script ready again
      })
      
      
    //SECOND SCENARIO
    //If another script which depends for its execution is necessary we can use wait
    //In this case needed.js is called with wait
    
     __.include('needed'.js);
    
     __.include('i_need_needed_to_work.js', 'needed.js', function(){
               //i_need_needed_to_work.js is ready when needed.js is ready
     })
      


Array Tools
------------

**Method `.compact_array(array)`**

*(Filter Null, FALSE or empty in array)*
    
    var _my_array = [1,2,3,NULL,'',FALSE];
    
    __.compact_array(_my_array); // [1,2,3];
    
**Method `.spec_array(array)`**

*(Speculate Array)*
    
    var _my_array = //Dinamic value can be [1,2,3] or [1]
    
   
    __.spec_array(_my_array); 
    // if _my_array length > 1 return array else return first value
    
**Method `.filter_array(array,callback)`**

*(Filter Array)*
    
    __.filter_array([1,2,3], function(v){
        return v % 2 === 0;
    })
    
**Method `.match_in_array(regexp,haystack)`**

*(Verify existence of element in array using regexp)*
    
    __.match_in_array(/happy/g,['help','up','happy']) // Return TRUE
    
**Method `.unique_array(array)`**

*(Return unique array, with not repeated values)*
    
    __.unique_array([1,2,3,4,1,2]) // Return [1,2,3,4]
    
**Method `.to_array(String|Object)`**

*(Parse String or Object to Array)*
    
    __.to_array('Hola') // Return ['H','o','l','a']
    __.to_array({a:1,b:2,c:3}) // Return [1,2,3]
    
    
    
Object Tools
------------

**Method `.in_object(needle, haystack)`**

*(Verify existence of element in object)*

*Array is considered a native type inherited from Object, you can use an array as a parameter haystack*
    
    __.in_object(5, {a:5,b:6}) //Return TRUE
    
**Method `.to_object(String|Array)`**

*(Parse String or Array to Object)*
    
    __.to_object('Hola') // Return [0=>'H',1=>'o',2=>'l',3=>'a']
    __.to_aobject(['H','o','l','a']) // Return [0=>'H',1=>'o',2=>'l',3=>'a']


**Method `.object_distribute(Object, index)`**

*(Joins the elements of an object in a selected index)*
    
    __.object_distribute({a:'Hi',b:'What',c:'MyIndex'},'MyIndex') 
    // Return {
        MyIndex:{
            a:'Hi',
            b:'What'
        }
    }

String Tools
------------
    
**Method `.html_entities(str)`**

*(Reformat html to unicode from String)*
     
     var _string = '<div>I am a html</div>'      
     
     __.html_entities(_string); // &lt;div&gt;I am a html&lt;/div&gt;
     

**Method `.truncate_string(str, limit)`**

*(Truncate string until limit)*
     
     var _string = 'I need be truncated until here'      
     
     __.truncate_string(_string, 9); // 'I need be'
     
**Method `.replace(string, search, replace)`**

*(Replace search with new value)*
     
     var _string = 'I need be truncated until here'      
     
     __.replace(_string, 'truncated', 'happy'); // 'I need be happy until here' 
     

**Method `.object_as_string(string, search, replace)`**
 
*(Return a object with the string type)*
  
    var _my_object = {a:1,b:2c:3};    
  
    __.object_as_string(_my_object); // Return [Object object]; 
  
**Method `.parse_json_url(object)`**
 
*(Return a URL query string)*
  
    var _my_object = {a:1,b:2c:3};    
  
    __.parse_json_url(_my_object); // Return a=1&b=2&c=3; 
       

**Method `.repeat_string(str, times)`**
 
*(Return repeated string)* 
  
    __.repeat_string('Happy!', 4); 
    // Return Happy!Happy!Happy!Happy!;

     
Getters
----------

**Method `.get_date(date)`**

*(Returns the date on the parameter, if the parameter is not passed, it uses the current date )*
     
     __.get_date(); 
     //If today is 2014-05-12 08:25:02
     //Return Example {
                day: 12,
                month: 'May',
                year: 2014,
                hour: 08,
                minutes: 25,
                seconds: 02
                meridian: PM || AM
                
            }
                            
     __.get_date('2014-10-13 08:25:02'); 
     // Param used
     //Return Example {
                 day: 13,
                 month: 'October',
                 year: 2014,
                 hour: 08,
                 minutes: 25,
                 seconds: 02
                 meridian: PM || AM
                 
             }
             
**Method `.get_nav()`**

*(Returns the used nav)*
     
     __.get_nav(); 
     //Return Example {
                nav: 'Chrome',
                version: '32'
                platform: 'Linux x86_64',
            }
            
**Method `.get_encoded_id(length(optional))`**

*(Returns a simple encoded id. If length is passed the code is truncated)*
     
     __.get_encoded_id(10); //aA25Gtsht6
     
     
**Method `.get_object_size(object)`**

*(Returns the object size.)*

     var _my_object = {a:1,b:2c:3};
     __.get_object_size(_my_object); // Return 3
     
     
**Method `.get_cookie(name)`**

*(Returns cookies.)*
    
    //Cookie my_cookie=asf58as52dsf84e5
    //Cookie my_csrf=asdf584a2d48rwefr42
    
     __.get_cookie('my_cookie'); // Return asf58as52dsf84e5
     __.get_cookie('my_csrf'); // Return asdf584a2d48rwefr42
     
**Method `.get_script(url, callback)`**

*(Get local or remote script.)*
    
     __.get_script('//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js', function(){
        //Script ready
     });



B Controllers
========
Controllers are an intermediary between models and views which are classically responsible for two tasks: 
they both update the view when the model changes and update the model when the user manipulates the view.

*In B drivers are handled from a dedicated environment (application modules), not combined application*

*The Controllers are located in the folder "/controller/module_name", and are called to our site with script tags right after call _b_ core*

*Example:*

*In this case the module name is index and contact respectively*

         <script src="YOUR PATH/__b__/base/__b__.min.js" data-path="YOUR INCLUDE PATH"></script>
         <script src="YOUR PATH/__b__/controller/index/init.js"></script>
                                          **OR IN CASE**
         <script src="YOUR PATH/__b__/controller/contact/init.js"></script>

        //The Index Controller
        __.$(document).ready(function(){
            __.include('my_model', function(){
                //My Code for the model
                
                var template = new _.Template,                
                    data_from_model = my_model.get({
                        name : 'Carl',
                        lastname : 'Jackson'
                    });
                    
                Template.my_view(data_from_model, function(my_html){
                    //Do something with my_html
                })
  
            })
            
            //My code
        })
        
        
        //The Contact Controller
        __.$(document).ready(function(){
            __.include('model/Form', function(){
                //My Code for the model
                
                var template = new _.Template,  
                    form_contact = new Form;
                    
                form_contact.on('complete', function(result){
                    //Do something with result
                })
                                    
                __.$('.my_form').addListener('submit', function(e){
                        form_contact.method('POST');
                        form_contact.action('/contact/');
                        form_contact.pack(e.target);
                        form_contact.submit(e)
                })    

            })
            
            //My code
        })
        
        
                       
B Models
========
                 
*Pending Documentation*

*Working on new Models*

B Views
=======

*Pending Documentation*

B Templates
========

*Pending Documentation*
