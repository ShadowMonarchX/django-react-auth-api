import json
from dataclasses import field
from accounts.models import User,City,State,Country
from rest_framework import serializers
from string import ascii_lowercase, ascii_uppercase
from django.contrib.auth import authenticate
from rest_framework.exceptions import AuthenticationFailed
from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import smart_str, force_str, smart_bytes
from django.utils.http import urlsafe_base64_decode, urlsafe_base64_encode
from django.contrib.sites.shortcuts import get_current_site
from django.urls import reverse
from .utils import send_normal_email
from rest_framework_simplejwt.tokens import RefreshToken, TokenError



class CitySerializer(serializers.ModelSerializer):
    class Meta:
        model = City
        fields = '__all__'  



class StateSerializer(serializers.ModelSerializer):
    country = serializers.StringRelatedField()  
    class Meta:
        model = State
        fields = ['id', 'name', 'country']



class CountrySerializer(serializers.ModelSerializer):
    class Meta:
        model = Country
        fields = ['id', 'name']




class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=68, min_length=6, write_only=True)
    class Meta:
        model=User
        fields = ['email','password','tc']

    def create(self, validated_data):
        user= User.objects.create_user(
            email=validated_data['email'],
            password=validated_data.get('password'),
            tc = validated_data.get('tc')
            )
        return user
    
    
class AdditionalUserDetailsSerializer(serializers.ModelSerializer):
    city_id = serializers.IntegerField(write_only=True)
    city = serializers.PrimaryKeyRelatedField(read_only=True)
    access_token = serializers.CharField(max_length=255, read_only=True)
    refresh_token = serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone_number', 'city_id', 'city', 'access_token', 'refresh_token']

    def validate(self, attrs):
        city_id = attrs.get("city_id")
        if not City.objects.filter(id=city_id, state_id=state_id).exists():
            raise serializers.ValidationError("Invalid City ID.")
        return attrs

    def update(self, instance, validated_data):
        city = City.objects.get(id=validated_data['city_id'])
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.city = city
        instance.save()

        refresh = RefreshToken.for_user(instance)

        return {
            "first_name": instance.first_name,
            "last_name": instance.last_name,
            "phone_number": instance.phone_number,
            "city": instance.city.name,
            "access_token": str(refresh.access_token),
            "refresh_token": str(refresh),
        }
        

class LoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=155, min_length=6)
    password=serializers.CharField(max_length=68, write_only=True)
    access_token=serializers.CharField(max_length=255, read_only=True)
    refresh_token=serializers.CharField(max_length=255, read_only=True)

    class Meta:
        model = User
        fields = ['email', 'password', 'access_token', 'refresh_token']


    def validate(self, attrs):
        email = attrs.get('email')
        password = attrs.get('password')
        request=self.context.get('request')
        user = authenticate(request, email=email, password=password)
        if not user:
            raise AuthenticationFailed("invalid credential try again")
        if not user.is_verified:
            raise AuthenticationFailed("Email is not verified")
        tokens=user.tokens()
        return {
            'email':user.email,
            "access_token":str(tokens.get('access')),
            "refresh_token":str(tokens.get('refresh'))
        }

class LogoutUserSerializer(serializers.Serializer):
    refresh_token=serializers.CharField()

    default_error_message = {
        'bad_token': ('Token is expired or invalid')
    }

    def validate(self, attrs):
        self.token = attrs.get('refresh_token')

        return attrs

    def save(self, **kwargs):
        try:
            token=RefreshToken(self.token)
            token.blacklist()
        except TokenError:
            return self.fail('bad_token')