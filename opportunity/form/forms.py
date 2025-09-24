from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Row, Column
from .models import Opportunity

class OpportunityForm(forms.ModelForm):
    DOMAINS = [
    ("ai", "Artificial Intelligence"),
    ("ml", "Machine Learning"),
    ("web", "Web Development"),
    ("data", "Data Science"),
    ("iot", "Internet of Things"),
    ]
    domains_of_expertise = forms.MultipleChoiceField(
        choices=DOMAINS,
        widget=forms.CheckboxSelectMultiple,
        required=False
    )
    class Meta:
        model = Opportunity
        fields = "__all__"

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.helper = FormHelper()
        self.helper.form_method = 'post'
        self.helper.layout = Layout(
            'project_title',
            'project_context',
            'project_objectives',
            'project_challenges',
            'domains_of_expertise',
            'collaboration_type',
            Row(
                Column('specific_budget', css_class='form-group col-md-6 mb-0'),
                Column('budget_range', css_class='form-group col-md-6 mb-0'),
            ),
            Row(
                Column('start_date', css_class='form-group col-md-6 mb-0'),
                Column('end_date', css_class='form-group col-md-6 mb-0'),
            ),
            'geographic_zone',
            'attachments',
        )
       
        super(OpportunityForm,self).__init__(*args, **kwargs)
        self.fields['collaboration_type'].empty_label = "Select Collaboration Type"
        self.fields['start_date'].widget = forms.DateInput(attrs={'type': 'date'})
        self.fields['end_date'].widget = forms.DateInput(attrs={'type': 'date'})
