from django.shortcuts import render
from rest_framework.generics import GenericAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

from accounts.models import OneTimePassword, User ,City,State,Country
from accounts.serializers import (
    UserRegisterSerializer,
    AdditionalUserDetailsSerializer,
    LoginSerializer,
    LogoutUserSerializer,
    CountrySerializer,
    CitySerializer,
    StateSerializer
)
from .utils import send_generated_otp_to_email

class RegisterView(GenericAPIView):
    serializer_class = UserRegisterSerializer

    def post(self, request):
        try:
            user_data = request.data
            print("Received:", user_data)
            email = user_data.get('email')
            if User.objects.filter(email=email).exists():
                return Response({
                    "status": "failure",
                    "message": "The email address is already registered. Please use a different email.",
                    "data": None,
                    "error": "Email already exists."
                }, status=status.HTTP_400_BAD_REQUEST)
            serializer = self.serializer_class(data=user_data)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                user_info = serializer.data
                send_generated_otp_to_email(user_info['email'], request)

                return Response({
                    "status": "success",
                    "message": "Thanks for signing up. A passcode has been sent to verify your email.",
                    "data": user_info,
                    "error": None
                }, status=status.HTTP_201_CREATED)

        except Exception as e:
            print("Error:", str(e))
            return Response({
                "status": "failure",
                "message": "Registration failed. Please check the provided data.",
                "data": None,
                "error": str(e)
            }, status=status.HTTP_400_BAD_REQUEST)

# class RegisterView(GenericAPIView):
#     serializer_class = UserRegisterSerializer

#     def post(self, request):
#         user = request.data
#         serializer=self.serializer_class(data=user)
#         if serializer.is_valid(raise_exception=True):
#             serializer.save()
#             user_data=serializer.data
#             send_generated_otp_to_email(user_data['email'], request)
#             return Response({
#                 'data':user_data,
#                 'message':'thanks for signing up a passcode has be sent to verify your email'
#             }, status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)







class VerifyUserEmail(GenericAPIView):
    def post(self, request):
        print(request.data)
        try:
            passcode = request.data.get('otp')
            print(passcode)
            user_pass_obj=OneTimePassword.objects.get(otp=passcode)
            user=user_pass_obj.user
            if not user.is_verified:
                user.is_verified=True
                user.save()
                return Response({
                    'message':'account email verified successfully'
                }, status=status.HTTP_200_OK)
            return Response({'message':'passcode is invalid user is already verified'}, status=status.HTTP_204_NO_CONTENT)
        except OneTimePassword.DoesNotExist as identifier:
            return Response({'message':'passcode not provided'}, status=status.HTTP_400_BAD_REQUEST)
        

class LoginUserView(GenericAPIView):
    serializer_class=LoginSerializer
    def post(self, request):
        try :
            serializer= self.serializer_class(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            return Response(serializer.data)
        except :
            return Response({'message':'Acces do not Prvide Keep The Write fild Filep'},status=status.HTTP_200_OK)
        

class LogoutApiView(GenericAPIView):
    serializer_class=LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
    

class AdditionalUserDetailsView(GenericAPIView):
    serializer_class = AdditionalUserDetailsSerializer
    permission_classes = [IsAuthenticated]  

    def post(self, request):
        try:
            user = request.user  
            print("Received Data:", request.data)
            
            serializer = self.serializer_class(data=request.data, context={'request': request})
            if serializer.is_valid(raise_exception=True):
                updated_user = serializer.update(user, serializer.validated_data)
                
                return Response({
                    'data': {
                        "first_name": updated_user.first_name,
                        "last_name": updated_user.last_name,
                        "phone_number": updated_user.phone_number,
                        "city": updated_user.city.name if updated_user.city else None,
                    },
                    'message': 'Personal information has been updated successfully.'
                }, status=status.HTTP_200_OK)
        
        except Exception as e:
            print("Error:", str(e))
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
        
class CityFilterView(GenericAPIView):
    serializer_class = CitySerializer

    def get_queryset(self):
        state_id = self.request.query_params.get('state', None)
        queryset = City.objects.all()
        if state_id:
            queryset = queryset.filter(state__id=state_id) 
        return queryset

    def get(self, request):
        state_id = request.query_params.get('state', None) 
        if state_id:
            cities = self.get_queryset()
            serializer = self.serializer_class(cities, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "State ID is required."}, status=status.HTTP_400_BAD_REQUEST)



class CountryListView(APIView):
    def get_queryset(self):
        return Country.objects.all()

    def get(self, request):
        countries = self.get_queryset()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data)



class StateListView(GenericAPIView):
    serializer_class = StateSerializer
    def get_queryset(self):

            country_id = self.request.query_params.get('country', None)
            queryset = City.objects.all()
            if country_id:
                queryset = queryset.filter(state__country__id=country_id)
            return queryset
    def get(self, request):
        country_id = request.query_params.get('country', None)
        if country_id:
            states = State.objects.filter(country__id=country_id)
            serializer = self.serializer_class(states, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Country ID is required."}, status=status.HTTP_400_BAD_REQUEST)