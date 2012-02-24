if(window.EEAFormsEdit === undefined){
  var EEAFormsEdit = {'version': '1.0'};
}

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

jQuery.fn.EEAFormsGroup = function(options){
  return this.each(function(){
    var context = jQuery(this).addClass('ajax');
    var spreadsheet = new EEAFormsEdit.Group(context, options);
  });
};
