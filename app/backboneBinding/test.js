(function($) {
	var MyModel = Backbone.Model.extend({
		name: '',
		type: ''
	});

	var MyView = Backbone.View.extend({

		bindings: {
			'#input-text': 'name',
			'#input-text2': 'name',
			'#paper-input-text': 'name',
			'#input-select': 'type'
		},

		initialize: function() {
			this.template = _.template(
				'<paper-input id="paper-input-text" label="Type something"></paper-input><br />' +
				'<input type="text" id="input-text" /><br />'+
				'<input type="text" id="input-text2" /><br />'+
				'<select id="input-select"><option val="one">first</option><option value="two">second</option></select><br /><br><a id="link-1" href="javascript:void(0);">set name "PAOLO"</a> - <a id="link-2" href="javascript:void(0);">set type "second"</a><br><br><div id="log"></div>');
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

	var mv = new MyView({
		el: $('body')
	});
})(jQuery);
