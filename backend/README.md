```
createdb -U postgres recipe-organizer
cd backend
pip install -r requirements.txt
source setup.sh
FLASK_APP=app.py FLASK_DEBUG=True flask run
```