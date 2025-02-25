from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile 

class RegisterSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(write_only=True, required=True)  # Password confirmation
    birthday = serializers.DateField(required=True)  # New field
    gender = serializers.ChoiceField(choices=[("male", "Male"), ("female", "Female"), ("custom", "Custom")])

    class Meta:
        model = User
        fields = ['email', 'first_name', 'last_name', 'password', 'password2', 'birthday', 'gender']
        extra_kwargs = {
            'password': {'write_only': True},
        }

    def validate(self, data):
        if User.objects.filter(email=data['email']).exists():
            raise serializers.ValidationError({"email": "This email is already in use."})

        if data['password'] != data['password2']:
            raise serializers.ValidationError({"password": "Passwords must match."})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')  
        birthday = validated_data.pop('birthday')
        gender = validated_data.pop('gender')

        # Enforce username equals email
        email = validated_data.get('email')
        validated_data['username'] = email
        # Create user
        user = User.objects.create_user(**validated_data)

        # Create profile
        Profile.objects.create(user=user, birthday=birthday, gender=gender)

        return user
