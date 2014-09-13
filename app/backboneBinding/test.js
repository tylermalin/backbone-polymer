(function($) {
	var MyModel = Backbone.Model.extend({
		name: '',
		type: ''
	});

	Backbone.Stickit.addHandler(_.extend(_.clone(_.find(Backbone.Stickit._handlers, { selector: 'input' }), true), { selector: 'paper-input' }));

	Backbone.Stickit.addHandler({
		selector: 'paper-dropdown',
		events: ['core-select'],
		update: function($el, val) {
			console.log("HERE", val);
			$el[0].selected = val; 
		},
		getVal: function($el) {
			return $el[0].selected;
		}
	});

	var MyView = Backbone.View.extend({

		bindings: {
			'#input-text': 'name',
			'#paper-input-text': 'name',
			'#input-paper-dropdown': 'type',
			'#input-select': 'type'
		},

		initialize: function() {
			this.template = _.template(
				'<paper-input id="paper-input-text" label="Type something"></paper-input><br />' +
				'<input type="text" id="input-text" /><br />'+
				'<select id="input-select"><option value="one">first</option><option value="two">second</option></select><br />' +
				'<paper-dropdown valueattr="val" id="input-paper-dropdown">' +
				'<paper-item val="one" label="First"></paper-item>' + 
				'<paper-item val="two" label="Second"></paper-item>' +
				'</paper-dropdown>' +
				'<br><a id="link-1" href="javascript:void(0);">set name "PAOLO"</a> - <a id="link-2" href="javascript:void(0);">set type "second"</a><br><br><div id="log"></div>'); 
			this.model = new MyModel();
			this.render();
		},
		render: function() {
			$(this.el).append(this.template(this));

			var $log = $("#log", this.el);

			this.model.on('change:name', function() {
				$log.append("NAME changed<br>");
			});

			this.model.on('change:type', function() {
				$log.append("TYPE changed<br>");
			});

			var self = this;

			$("a#link-1", this.el).click(function() {
				self.model.set('name', 'PAOLO');
			});

			$("a#link-2", this.el).click(function() {
				self.model.set('type', 'two');
			});

			this.stickit();
		}
	});

	$(document.body).ready(function() {
		var mv = new MyView({
			el: $('body')
		});
	});
})(jQuery);
