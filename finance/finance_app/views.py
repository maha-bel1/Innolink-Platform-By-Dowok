from django.shortcuts import render, redirect, get_object_or_404
from .models import Financing, Application

# ---------------------------
# Home redirect
# ---------------------------
def finance_home(request):
    return redirect('financing-list')

# ---------------------------
# Financing List (public)
# ---------------------------
def financing_list(request):
    financings = Financing.objects.all()
    return render(request, 'finance_app/financing_list.html', {
        'financings': financings
    })

# ---------------------------
# Financing Detail (public)
# ---------------------------
def financing_detail(request, pk):
    financing = get_object_or_404(Financing, pk=pk)
    applications = financing.applications.all()
    return render(request, 'finance_app/financing_detail.html', {
        'financing': financing,
        'applications': applications
    })

# ---------------------------
# Financing Form (Create/Edit) - open to all
# ---------------------------
def financing_form(request, pk=None):
    financing = None
    if pk:
        financing = get_object_or_404(Financing, pk=pk)

    if request.method == 'POST':
        title = request.POST['title']
        description = request.POST['description']
        amount = request.POST['amount']
        deadline = request.POST['deadline']
        investor_name = request.POST.get('investor_name', 'Anonymous')

        if financing:
            financing.title = title
            financing.description = description
            financing.amount = amount
            financing.deadline = deadline
            financing.investor_name = investor_name
            financing.save()
        else:
            Financing.objects.create(
                title=title,
                description=description,
                amount=amount,
                deadline=deadline,
                investor_name=investor_name
            )

        return redirect('financing-list')

    return render(request, 'finance_app/financing_form.html', {
        'financing': financing
    })

# ---------------------------
# Application Form (Create) - open to all
# ---------------------------
def application_form(request, financing_id):
    financing = get_object_or_404(Financing, pk=financing_id)

    if request.method == 'POST':
        proposal = request.POST['proposal']
        applicant_name = request.POST.get('applicant_name', 'Anonymous')

        Application.objects.create(
            financing=financing,
            applicant_name=applicant_name,
            proposal=proposal
        )

        return redirect('financing-detail', pk=financing.id)

    return render(request, 'finance_app/application_form.html', {
        'financing': financing
    })
