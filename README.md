### What is it?

Inline option selection for HTML Text Inputs, auto-complete after a token. [Try it live!](http://mrl.li/jquery-sew-demo)

![](http://upload.mural.ly/santiagomontero/1354142421637.blob)

### Usage

``` javascript
  var values = [{val: 'foo', meta: 'extended foo'}]; // meta is extended search field
  $('textarea').sew({values: values}); // pass in the values
```

There're some required scripts that should be placed on the following order
```html
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jquery.caretposition.js"></script>
<script type="text/javascript" src="jquery.sew.js"></script>
```

#### [NEW] You can now include a minified version

```html
<script type="text/javascript" src="jquery.js"></script>
<script type="text/javascript" src="jquery.caretposition.js"></script>
<script type="text/javascript" src="jquery.sew.min.js"></script>
```

### Customization

- Elements classes are: `-sew-list-container`, `-sew-list`, `-sew-list-item`, `-sew-list-item.selected`
- You can customize the token (default is the @) by passing the `{token: ':'}`
- You can customize how elements are created by passing an `elementFactory`

``` javascript
  /**
  * @param {jQuery} element the target element (LI)
  * @param {*} e object containing the val and meta properties (from the input list)
  */
  function elementFactory(element, e) {
    // append whatever you want to the target element
    element.append({anyJQueryObject});
  }
```
- You can customize how elements are filtered by passing an `filter`
``` javascript
  /**
  * @param {Array} data containing list of values to be filtered
  * @param {String} val input value
  */
  var newFilter = function (data, val) {
        var re = new RegExp('^'+val,'i');
        var new_data = data.filter(function(e){
          return e && e.label && re.test(e.label);
        });
        return new_data.splice(0,10)
  }

  $('textarea').sew({values: values, filter: newFilter}); // pass in the values and the filter
```

- You can customize how elements are passed to the plugin by passing `values` as a function
```
var get_values = function(val, callback){
  if(typeof callback !== 'function'){
    throw new TypeError();
  }
  var data =   [{name:'santiagotactivos', meta:'Santiago Montero'},
                {name:'johnny halife', meta:'Johnny Halife'},
                {name:'ariel flesler', meta:'Ariel Flesler'},
                {name:'raul bajales', meta:'Raul Bajales'},
                {name:'Juan Manuel', meta:'Juan Manuel'},
                {name:'Pablo Golfred', meta:'Pablo Golfred'},
                {name:'Valeria Morisa', meta:'Valeria Morisa'},
                {name:'Ernesto Sabio', meta:'Ernesto Sabio'},
                {name:'Jimena Dilous', meta:'Jimena Dilous'}];
  callback(data);
}
$('textarea').sew({values: get_values}); // pass in the values
```

### Release Notes
- [v0.0.0] initial commit

- [v0.0.2] `{meta: }` is now optional, on blur it shows a fadeOut animation, options now scroll,
restored escape support, item shows pointer cursor, tab-autocompletion, no elements support.

- [v0.0.3] add new options `{unique: (true|false)}` for removing duplicates, spacing bugs.

- [v0.0.4] added support for content editable

- [v0.0.5] prevent repetition

- [v0.0.6]
 * Trigger `mention-selected` onItem Select
 * `values` now accept functions
 * Added `filter` to params
 * Customize `val` and `meta` with params
 * Trigger `menu_show` and `menu_hide`

### Meta
Originally written by @leChanteaux (santiago at mural.ly) - maintained by Mural.ly Dev Team (dev at mural.ly)
