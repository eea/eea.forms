if(window.EEAFormsEdit === undefined){
  var EEAFormsEdit = {'version': '1.0'};
}

// Custom jQuery Tools effect
if((jQuery.tools !== undefined) && (jQuery.tools.tabs !== undefined)){
  jQuery.tools.tabs.addEffect("eea-forms", function(tabIndex, done) {
    // hide all panes and show the one that is clicked
    if(this.getPanes().effect === undefined){
      this.getPanes().hide().eq(tabIndex).show();
    }else{
      var index = this.getIndex() !== undefined ? this.getIndex() : 0;
      var direction = 'right';
      if(tabIndex < index){
        direction = 'left';
      }
      this.getPanes().hide().eq(tabIndex).show('slide', {direction: direction});
    }
    // the supplied callback must be called after the effect has finished its job
    done.call();
  });
}


/* Make Tabs in ATCT edit form a wizard like form
*/
EEAFormsEdit.Wizard = function(context, options){
  var self = this;
  self.context = context;
  self.context.parent().addClass('eea-forms-wizard');
  self.settings = {};

  if(options){
    jQuery.extend(self.settings, options);
  }

  self.initialize();
};

EEAFormsEdit.Wizard.prototype = {
  initialize: function(){
    var self = this;
    self.api = self.context.data('tabs');
    self.api.onClick(function(e, index){
      self.toggleButtons(index);
    });
    self.api.getConf().effect = 'eea-forms';
    self.leftButton();
    self.rightButton();
    self.toggleButtons();
  },

  leftButton: function(){
    var self = this;
    self.left = jQuery('<div>')
      .addClass('wizard-left')
      .html('<span>&lsaquo;</span>')
      .click(function(){
        self.api.prev();
        self.toggleButtons();
    }).prependTo(self.context.parent());
  },

  rightButton: function(){
    var self = this;
    self.right = jQuery('<div>')
      .addClass('wizard-right')
      .html('<span>&rsaquo;</span>')
      .click(function(){
        self.api.next();
        self.toggleButtons();
    }).prependTo(self.context.parent());
  },

  toggleButtons: function(index){
    var self = this;
    if(index === undefined){
      index = self.api.getIndex();
    }

    var current = jQuery(self.api.getPanes()[index]);
    current.css('margin-left', '4em');
    current.css('margin-right', '4em');
    self.left.height(current.height());
    self.right.height(current.height());
    self.left.show();
    self.right.show();

    if(index === 0){
      self.left.hide();
      current.css('margin-left', '0');
    }
    if(index === (self.api.getTabs().length - 1)){
      self.right.hide();
      current.css('margin-right', '0');
    }

  }
};


/* Group AT Widgets with jQuery UI Accordion
*/
EEAFormsEdit.Group = function(context, options){
  var self = this;
  self.context = context;
  self.settings = {
    group: []
  };

  if(options){
    jQuery.extend(self.settings, options);
  }

  self.initialize();
};

EEAFormsEdit.Group.prototype = {
  initialize: function(){
    var self = this;
    self.groupFields();
  },

  groupFields: function(){
    var self = this;
    jQuery.each(self.settings.group, function(index, field){
      var errors = jQuery.data(field[0], 'errors');
      self.handleErrors(field, errors);
      field.addClass('eeaforms-presentation-group');
      var label = jQuery('label.formQuestion', field);
      var title = label.text();
      label.remove();
      field.before(
        jQuery('<h3>').addClass('eeaforms-presentation-group')
          .addClass(errors ? 'eeaforms-error': '').append(
            jQuery('<a>').addClass('eeaforms-ajax')
              .attr('href', '#' + field.attr('id')).html(title)
          ));
    });

    var parent = self.context.parent();
    jQuery('.eeaforms-presentation-group', parent).wrapAll(
      '<div class="eeaforms-group-accordion" />');
    var container = jQuery('.eeaforms-group-accordion', parent);
    container.accordion();
  },

  handleErrors: function(field, errors){
    var self = this;
    if(!errors){
      return;
    }

    var errorsBox = jQuery('.fieldErrorBox', field);
    if(!errorsBox.length){
      errorsBox = jQuery('<div>').addClass('fieldErrorBox').prependTo(field);
    }
    errorsBox.removeClass('fieldErrorBox').addClass('error').html(errors);
  }
};


/* jQuery plugin for EEAForms.Group
*/
jQuery.fn.EEAFormsGroup = function(options){
  return this.each(function(){
    var context = jQuery(this).addClass('ajax');
    var spreadsheet = new EEAFormsEdit.Group(context, options);
    context.data('EEAFormsGroup', spreadsheet);
  });
};


/* jQuery plugin for EEAFormsEdit.Wizard
*/
jQuery.fn.EEAFormsWizard = function(options){
  return this.each(function(){
    var context = jQuery(this).addClass('ajax');
    var wizard = new EEAFormsEdit.Wizard(context, options);
    context.data('EEAFormsWizard', wizard);
  });
};
