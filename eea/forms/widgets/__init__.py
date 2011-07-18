""" Custom AT widgets
"""
from Products.Archetypes.Registry import registerWidget
from eea.forms.widgets.ManagementPlanWidget import ManagementPlanWidget

def register():
    """ Custom AT registrations
    """
    registerWidget(ManagementPlanWidget,
        title='EEA Management Plan Code',
        description=('Renders a HTML selection widget, to'
                     ' allow you enter the year and the'
                     ' EEA management plan code'),
        used_for=(
            'eea.forms.fields.ManagementPlanField.ManagementPlanField'))

