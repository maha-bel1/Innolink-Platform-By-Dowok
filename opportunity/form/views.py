from django.shortcuts import render
from form.forms import OpportunityForm
from django.shortcuts import redirect
from .models import Opportunity
# Create your views here.

def opportunity_list(request):
    context = {'opportunityList':Opportunity.objects.all()}
    return render(request, 'form/opportunityList.html', context)

def opportunity_form(request, id=0):
    if request.method == 'GET':
        if id == 0:
            form = OpportunityForm()
        else:
            opportunity = Opportunity.objects.get(pk=id)
            form = OpportunityForm(instance=opportunity)
        return render(request, 'form/opportunityForm.html', {'form': form})
    else: 
        if id == 0:
            form = OpportunityForm(request.POST, request.FILES)
        else:
           opportunity = Opportunity.objects.get(pk=id)
           form = OpportunityForm(request.POST, instance=opportunity)
        #form = OpportunityForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            #return render(request, 'form/opportunityList.html')
        return redirect('/opportunity/list/')
    

def opportunity_delete(request, id):
    opportunity= Opportunity.objects.get(pk=id)
    opportunity.delete()
    return redirect('/opportunity/list/')