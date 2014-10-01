var TypeaheadCompo = mask.Compo({
	tagName: 'input',
	attr: {
		class: 'typeahead',
		type: 'text',
		style: 'vertical-align:middle'
	},
	meta: {
		attributes: {
			'x-prop-id': 'string',
			'x-prop-text': 'string',
			'?x-prop': 'string',
			'?x-search': function(val, compo, model){
				var fn = mask.Utils.Expression.eval(val, model, null, compo);
				if (fn == null) {
					warn_(NO_SEARCH_IN_SCOPE, compo, model);
					return; 
				}
				return fn;
			}
		},
		template: 'join'
	},
	slots: {
		domInsert: function(){
			this.compos.input.typeahead({
				hint: true,
				highlight: true,
				minLength: 1
			},{
				displayKey: 'text',
				source: this.search_.bind(this)
			})
			.on('typeahead:selected', () => {
				this.typeaheadChanged();
			})
			.on('keyup', event => {
				if (event.which !== 13) 
					return;
				this.typeaheadChanged();
			});
		}
	},
	events: {
		'keydown': function(e){
			if (e.which === 13) {
				e.stopPropagation();
				e.preventDefault();
			}
		},
		'change: select': function(event){
			var el = event.currentTarget,
				opt$ = el.selectedOptions[0];
			if (opt$ == null) 
				return;
			
			el.selectedIndex = -1;
			this.compos.input.typeahead('val', opt$.textContent);
		}
	},
	compos: {
		input: '$: input'
	},
	onRenderStart: function(model){
		this.scope = {
			array: this.prepair_(model[this.xProp])
		};
	},
	search_ (query, cb) {
		if (this.xSearch == null) {
			cb(this.filter_(query, this.scope.array));
			return;
		}
		this.xSearch(query, arr => {
			cb(this.prepair_(arr));
		})
	},
	filter_ (query, arr) {
		var rgx = new RegExp(query, 'i');
		return arr.filter(x => rgx.test(x.text));
	},
	type_: 'object',
	prepair_ (arr) {
		if (arr == null)
			return [];
			
		if (arr.length === 0) 
			return arr;
		
		var map = {
			string: x => ({
				id:   x,
				text: x
			}),
			object: x => ({
				id:   x[this.xPropId],
				text: x[this.xPropText]
			})
		};
		
		// first item finger print
		var item = arr[0];
		if (typeof item === 'string') {
			this.type_ = 'text';
			return arr.map(map.string);
		}
		
		if (item[this.xPropText] !== void 0) {
			return arr.map(map.object);
		}
		
		if (item.text !== void 0) 
			return arr;
		
		warn_(INVALID_ARRAY, item);
	},
	
	get: function(){
		var text = this.compos.input.val(),
			arr, property;
		if (this.type_ === 'text') 
			return text;
		if (this.xProp) {
			arr = this.model[this.xProp];
			property = this.xPropText;
		} else {
			arr = this.scope.array;
			property = 'text';
		}
		return arr.find(x => text === x[property]);
	
	},
	set: function(mix){
		if (mix == null || this.$ == null) 
			return;
		var val = typeof mix !== 'string'
			? mix[this.xPropText] || mix.text
			: mix;
			
		this.compos.input.typeahead('val', val);
	},
	
	dispose: function(){
		this.compos.input.typeahead('destroy');
	},
	
	typeaheadChanged: function(text){
		this.emitOut('typeaheadChanged', this.get());
	}
})