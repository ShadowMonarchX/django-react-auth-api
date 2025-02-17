from ast import Expression
from multiprocessing import context
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
    StateSerializer,
    PasswordResetRequestSerializer,
    PasswordResetTokenGenerator,
    SetNewPasswordSerializer
)
from .utils import send_generated_otp_to_email
from rest_framework.permissions import AllowAny , IsAuthenticated
from django.utils.http import urlsafe_base64_decode
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from .permissions import  IsOwnerOrReadOnly
from rest_framework_simplejwt.exceptions import InvalidToken
from rest_framework_simplejwt.authentication import JWTAuthentication
from django.utils.http import urlsafe_base64_decode
from django.utils.encoding import smart_str, DjangoUnicodeDecodeError
from django.contrib.auth.models import AnonymousUser

class RegisterView(GenericAPIView):
    
    permission_classes = [AllowAny]
    serializer_class = UserRegisterSerializer

    def post(self, request):
        user_data = request.data
        email = user_data.get('email')

        if User.objects.filter(email=email).exists():
            return Response({
                "status": "failure",
                "message": "This email is already registered.",
                "error": "Email already exists."
            }, status=status.HTTP_400_BAD_REQUEST)

        serializer = self.serializer_class(data=user_data)
        if serializer.is_valid():
            serializer.save()
            user_info = serializer.data
            send_generated_otp_to_email(user_info['email'], request)

            return Response({
                "status": "success",
                "message": "OTP sent to your email for verification.",
                "data": user_info
            }, status=status.HTTP_201_CREATED)

        return Response({
            "status": "failure",
            "message": "Invalid data provided.",
            "error": serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)


class VerifyUserEmail(GenericAPIView):
    permission_classes = [AllowAny]

    def post(self, request):
        try:
            passcode = request.data.get('otp')
            user_pass_obj = OneTimePassword.objects.get(otp=passcode)
            user = user_pass_obj.user

            if not user.is_verified:
                user.is_verified = True
                user.save()

                # Generate JWT token for the user
                refresh = RefreshToken.for_user(user)

                return Response({
                    'message': 'Account email verified successfully.',
                    'data': {
                        'email': user.email,
                        'is_verified': user.is_verified,
                        'access_token': str(refresh.access_token),
                        'refresh_token': str(refresh),
                        'message' : 'THis is user Token BY Send Backend'
                    }
                }, status=status.HTTP_200_OK)

            return Response({'message': 'User is already verified.'}, status=status.HTTP_204_NO_CONTENT)

        except OneTimePassword.DoesNotExist:
            return Response({'message': 'Invalid passcode or OTP expired.'}, status=status.HTTP_400_BAD_REQUEST)


        

class LoginUserView(GenericAPIView):
    serializer_class=LoginSerializer
    def post(self, request):
        try :
            serializer= self.serializer_class(data=request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)
            return Response(serializer.data)
        except :
            return Response({'message':'Acces do not Prvide Keep The Write fild Filep'},status=status.HTTP_200_OK)


class PasswordResetRequestView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class=PasswordResetRequestSerializer

    def post(self, request):
        serializer=self.serializer_class(data=request.data, context={'request':request})
        serializer.is_valid(raise_exception=True)
        return Response({'message':'we have sent you a link to reset your password'}, status=status.HTTP_200_OK)
        # return Response({'message':'user with that email does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    



class PasswordResetConfirm(GenericAPIView):
    permission_classes = [AllowAny]

    def get(self, request, uidb64=None, token=None):
        if not uidb64 or not token:
            return Response({'message': 'Invalid request. Missing parameters.'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_id = smart_str(urlsafe_base64_decode(uidb64))
            # print("User_id :",user_id)
            user = User.objects.get(id=user_id)
            # print("User :",user)

            if not PasswordResetTokenGenerator().check_token(user, token):
                return Response({'message': 'Token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)

            return Response({'success': True, 'message': 'Credentials are valid', 'uidb64': uidb64, 'token': token}, status=status.HTTP_200_OK)

        except (ValueError, User.DoesNotExist):
            return Response({'message': 'Token is invalid or has expired'}, status=status.HTTP_401_UNAUTHORIZED)

class SetNewPasswordView(GenericAPIView):
    permission_classes = [AllowAny]
    serializer_class=SetNewPasswordSerializer

    def patch(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        return Response({'success':True, 'message':"password reset is succesful"}, status=status.HTTP_200_OK)


class LogoutApiView(GenericAPIView):
    serializer_class=LogoutUserSerializer
    permission_classes = [IsAuthenticated]

    def post(self, request):
        serializer=self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(status=status.HTTP_204_NO_CONTENT)
 

    




class AdditionalUserDetailsView(APIView):
    serializer_class = AdditionalUserDetailsSerializer
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwnerOrReadOnly]  

    def get_serializer_context(self):
        return {"request": self.request}

    def patch(self, request):
        if isinstance(request.user, AnonymousUser): 
            return Response({
                'status': 'error',
                'message': 'User is not authenticated. Please log in.',
            }, status=status.HTTP_401_UNAUTHORIZED)

        try:
            user = request.user
            self.check_object_permissions(request, user)  

            serializer = self.serializer_class(instance=user, data=request.data, partial=True, context=self.get_serializer_context())

            if serializer.is_valid():
                updated_data = serializer.save()
                return Response({
                    'status': 'success',
                    'message': 'Personal information updated successfully.',
                    'data': updated_data,
                }, status=status.HTTP_200_OK)

            return Response({
                'status': 'failed',
                'message': 'Personal information update failed.',
                'data': serializer.errors,
            }, status=status.HTTP_400_BAD_REQUEST)

        except InvalidToken:
            return Response({
                'status': 'error',
                'message': 'Token has expired or is invalid. Please log in again.',
            }, status=status.HTTP_401_UNAUTHORIZED)



class CountryListView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        countries = Country.objects.all()
        serializer = CountrySerializer(countries, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
class StateListView(GenericAPIView):
    permission_classes = [AllowAny]  
    serializer_class = StateSerializer

    def get(self, request):
        country_id = request.query_params.get('country')
        if country_id:
            states = State.objects.filter(country_id=country_id)
            serializer = self.serializer_class(states, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "Country ID is required."}, status=status.HTTP_400_BAD_REQUEST)

class CityFilterView(GenericAPIView):
    permission_classes = [AllowAny]  
    serializer_class = CitySerializer

    def get(self, request):
        state_id = request.query_params.get('state')
        if state_id:
            cities = City.objects.filter(state_id=state_id)
            serializer = self.serializer_class(cities, many=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({"message": "State ID is required."}, status=status.HTTP_400_BAD_REQUEST)
