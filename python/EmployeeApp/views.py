from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from EmployeeApp.models import Department,Employee
from EmployeeApp.serializers import DepartmentSerializer,EmployeeSerializer

from django.core.files.storage import default_storage

# Created Department  views here.
@csrf_exempt
def departmentApi(request,id=0):
    if request.method == 'GET':
        departments = Department.objects.all()
        department_serializer = DepartmentSerializer(departments,many=True)
        return JsonResponse(department_serializer.data,safe=False)

    elif request.method == 'POST':
        department_data =  JSONParser().parse(request)
        department_serialzer = DepartmentSerializer(data=department_data)
        if department_serialzer.is_valid():
            department_serialzer.save()
            return JsonResponse('Added Successfully!!',safe=False)

        return JsonResponse('Failed To addData!!',safe=False) 

    elif request.method == 'PUT':
        department_data = JSONParser().parse(request)
        department = Department.objects.get(DepartmentId = department_data['DepartmentId'])
        department_serialzer = DepartmentSerializer(department,data= department_data)
        if department_serialzer.is_valid():
            department_serialzer.save()
            return JsonResponse('Updated Successfully!!',safe=False)
        return JsonResponse('Failed to Update!!',safe=False)

    elif request.method == 'DELETE':
         department = Department.objects.get(DepartmentId = id)
         department.delete()
         return JsonResponse('Deleted Successfully!!',safe=False)



# Created Employee views here.
@csrf_exempt
def employeeApi(request,id=0):
    if request.method == 'GET':
        employee_data = Employee.objects.all()
        employee_serializer = EmployeeSerializer(employee_data,many=True)
        return JsonResponse(employee_serializer.data,safe=False)
    
    elif request.method == 'POST':
        employee_data = JSONParser().parse(request)
        employee_serializer = EmployeeSerializer(data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse('Added Successfully!!',safe=False)
        return JsonResponse('Failed to Added!!',safe=False)

    elif request.method == 'PUT':
        employee_data = JSONParser().parse(request)
        employeeid    = Employee.objects.get(EmployeeId=employee_data['EmployeeId'])
        employee_serializer = EmployeeSerializer(employeeid,data=employee_data)
        if employee_serializer.is_valid():
            employee_serializer.save()
            return JsonResponse('Updated Successfully!!',safe=False)
        return JsonResponse('Failed To update!!',safe=False)

    elif request.method == 'DELETE':
        employeeid = Employee.objects.get(EmployeeId=id)
        employeeid.delete()
        return JsonResponse('Deleted Successfully!!',safe=False)

@csrf_exempt
def SaveFile(request):
    file = request.FILES["myFile"]
    file_name = default_storage.save(file.name,file)

    return JsonResponse(file_name,safe=False)

