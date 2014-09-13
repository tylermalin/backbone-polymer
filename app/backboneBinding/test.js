(function ($) {
	var MyModel = Backbone.Model.extend({
		name: '',
		type: ''
	});

	Backbone.Stickit.addHandler(
		_.extend(
			_.clone(
				_.find(
					Backbone.Stickit._handlers,
					{ selector: 'input' }
				),
			true),
			{ selector: 'paper-input' }
		)
	);

	Backbone.Stickit.addHandler({
		selector: 'paper-dropdown,paper-radio-group',
		events: ['core-select'],
		update: function ($el, val) {
			$el[0].selected = val;
		},
		getVal: function ($el) {
			return $el[0].selected;
		}
	});

	Backbone.Stickit.addHandler({
		selector: 'paper-checkbox',
		events: ['core-change'],
		update: function ($el, val) {
			$el[0].checked = val;
		},
		getVal: function ($el) {
			return $el[0].checked;
		}
	});

	var MyView = Backbone.View.extend({

		bindings: {
			'#input-text': 'name',
			'#paper-input-text': 'name',
			'#input-paper-dropdown': 'type',

			'#input-paper-radio-group': 'selectedIndex',

			'#paper-checkbox': 'isChecked',
			'#checkbox': 'isChecked',

			'#input-select': 'type'
		},

		initialize: function () {
			this.template = _.template(
					'<h2>Checkbox test</h2>' +
					'<paper-checkbox id="paper-checkbox" label="Checkbox"></paper-checkbox><br />' +
					'<input id="checkbox" label="Checkbox" type="checkbox"></paper-checkbox><br />' +
					'<a id="link-4" href="javascript:void(0);">set isChecked true</a><br /><br />' +

					'<paper-radio-group id="input-paper-radio-group">' +
					'<paper-radio-button name="always" label="Always"></paper-radio-button>' +
					'<paper-radio-button name="pluggedin" label="Only when plugged in"></paper-radio-button>' +
					'</paper-radio-group><br />' +
					'<a id="link-3" href="javascript:void(0);">set selectedIndex 1</a><br /><br />' +

					'<paper-input id="paper-input-text" label="Type something"></paper-input><br />' +
					'<input type="text" id="input-text" /><br />' +
					'<select id="input-select"><option value="one">first</option><option value="two">second</option></select><br />' +
					'<paper-dropdown valueattr="val" id="input-paper-dropdown">' +
					'<paper-item val="one" label="First"></paper-item>' +
					'<paper-item val="two" label="Second"></paper-item>' +
					'</paper-dropdown>' +

					'<br><a id="link-1" href="javascript:void(0);">set name "PAOLO"</a> - <a id="link-2" href="javascript:void(0);">set type "second"</a><br><br>' +

					'<h2>Log</h2>' +
					'<div id="log"></div>'
			);

			this.model = new MyModel();
			this.render();
		},
		render: function () {
			$(this.el).append(this.template(this));

			var $log = $("#log", this.el);

			this.model.on('change:name', function () {
				$log.append("NAME changed<br>");
			});

			this.model.on('change:type', function () {
				$log.append("TYPE changed<br>");
			});

			this.model.on('change:selectedIndex', function () {
				$log.append("selectedIndex changed<br>");
			});
			this.model.on('change:isChecked', function () {
				$log.append("isChecked changed<br>");
			});
			var self = this;

			$("a#link-1", this.el).click(function () {
				self.model.set('name', 'PAOLO');
			});

			$("a#link-2", this.el).click(function () {
				self.model.set('type', 'two');
			});

			$("a#link-3", this.el).click(function () {
				self.model.set('selectedIndex', 1);
			});
			$("a#link-4", this.el).click(function () {
				self.model.set('isChecked', true);
			});

			this.stickit();
		}
	});

	$(document.body).ready(function () {
		var mv = new MyView({
			el: $('body')
		});
	});
})(jQuery);
