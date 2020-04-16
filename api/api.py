from datetime import datetime
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
import os

# Init app
app = Flask(__name__)
basedir = os.path.abspath(os.path.dirname(__file__))

#Database
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(basedir, 'db.sqlite')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Init db
db = SQLAlchemy(app)

# Init ma
ma = Marshmallow(app)


# Keg Entry Class/Model
class Entry(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    weight = db.Column(db.Float)
    beers = db.Column(db.Integer)
    brew = db.Column(db.String(100))
    date = db.Column(db.DateTime)

    def __init__(self, weight, beers, brew, date):
      self.weight = weight
      self.beers = beers
      self.brew = brew
      self.date = date
   # Look into doing relationships between an entry and a given keg

# Key Entry Schema
class EntrySchema(ma.Schema):
    class Meta:
        fields = ('id', 'weight', 'beers', 'brew', 'date')

# Init schema
entry_schema = EntrySchema()
entries_schema = EntrySchema(many=True)

# Create a new Entry
@app.route('/create', methods=['POST'])
def create_entry():
    weight = request.json['weight']
    beers = request.json['beers']
    brew = "Busch Lite"#request.json['brew'] #TODO add a real way to know the brew type
    # Create a datetime object for the current time
    date = datetime.now()
    #date = time.strftime('%Y-%m-%d %H:%M:%S')
    
    new_entry = Entry(weight, beers, brew, date)
    
    db.session.add(new_entry)
    db.session.commit()

    return entry_schema.jsonify(new_entry)

@app.route('/delete/<id>', methods=['DELETE'])
def delete_entry(id):
    remove_entry = Entry.query.get(id)
    db.session.delete(remove_entry)
    db.session.commit()

    return entry_schema.jsonify(remove_entry)

# Get all entries in the table
@app.route('/retrieve', methods=['GET'])
def get_entries():
    all_entries = Entry.query.all()
    result = entries_schema.dump(all_entries)
    return jsonify(result)

# Get most recent entry in the table
@app.route('/retrieve_last', methods=['GET'])
def get_last():
    last_entry = Entry.query.order_by(-Entry.id).first()
    result = entry_schema.dump(last_entry)
    return jsonify(result)

# Get all entries in a given timeframe
# takes object with 'dateFrom' and 'dateTo' strings
@app.route('/retrieve_dates', methods=['GET'])
def get_entries_in_range():
    rDate = request.json
    # error check that dates were sent
    if (not 'dateFrom' in rDate and not 'dateTo' in rDate):
        return 'Error: invalid dates'

    # convert sent dates to datetime objects
    dates = {
        'dateFrom': datetime.strptime(rDate['dateFrom'], '%Y-%m-%d %H:%M:%S'),  
        'dateTo': datetime.strptime(rDate['dateTo'], '%Y-%m-%d').replace(hour=23, minute=59, second=59)
    }

    # get all entries from database in a given date range
    all_entries = Entry.query\
                  .filter(Entry.date >= dates['dateFrom'])\
                  .filter(Entry.date <= dates['dateTo'])\
                  .all()

    # get data from schema
    entries = entries_schema.dump(all_entries)
   
    #print(entries)
   
    return jsonify(entries)


