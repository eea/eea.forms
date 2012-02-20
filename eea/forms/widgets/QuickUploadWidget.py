""" QuickUpload Widget based on collective.quickupload package
"""
from Products.Archetypes.Widget import TypesWidget

class QuickUploadWidget(TypesWidget):
    """ Quick Upload Widget via drag&drop
    """
    _properties = TypesWidget._properties.copy()
    _properties.update({
        'macro' : "quick_upload_widget",
    })
