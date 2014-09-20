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
			this.model = new MyModel();
			this.render();
		},
		render: function () {
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
