### [Typeahead](https://github.com/twitter/typeahead.js) Component Wrapper

[![Bower version](https://badge.fury.io/bo/compo-typeahead.svg)](http://badge.fury.io/bo/compo-typeahead)

```scss
a:typeahead;
```
### Attributes

Attribute | Description
--- | ---
`x-prop` | Defines model property accessor path, if an array of values is available
`x-prop-id` | Id accessor path. Often the items are not just plain string values, but the objects with some display value and the id value.
`x-prop-text` | Display text accessor path
`x-search` | The model or components outer scope can provide the `search(query, callback)` function, to look up for typeahead values

### Signals
Signal | Description
--- | ---
`typeaheadChanged` | `(sender, currentValue)` is emitted each time the input is changed


### API

- **`compos.input`** <a name='input'>#</a>

	Typeahead jQuery element.

- **`get()`** <a name='get'>#</a>
	
	Getter
	
- **`set(value)`** <a name='set'>#</a>

	Setter

### Dependencies

- `IncludeJS`
- `jQuery`
- `es6-shim (Array.prototype.find)`

### Examples

- [/examples](/examples)

```bash
# install atma toolkit
npm install atma
# run server
atma server

# navigate `http://localhost:5777/examples/simple.html`
```

### Test
```bash
npm test
```

:copyright: MIT - Atma.js Project