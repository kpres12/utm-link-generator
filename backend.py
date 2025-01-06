django-admin startproject url_shortener
cd url_shortener
python manage.py startapp url_shortener
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
python manage.py shell
from django.contrib.auth.models import User
User.objects.create_superuser('admin', 'ejeyd@example.com', 'admin')
from url_shortener.models import Url
Url.objects.create(url='http://www.google.
