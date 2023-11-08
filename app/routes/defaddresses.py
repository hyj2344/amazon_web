from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import db, Default_add

defaddresses = Blueprint('defaddresses', __name__)

@defaddresses.route('', methods=['GET', 'POST', 'DELETE'])
@login_required
def default_id():
    if request.method == 'GET':
        response = Default_add.query.filter_by(user_id=current_user.get_id()).all()
        addressesList = [defaultadd.data() for defaultadd in response]
        return jsonify(addressesList)
    if request.method == 'POST':
        data = request.json

        newDefAddress = Default_add(**{
            "add_id": data["add_id"],
            "user_id": data["user_id"]
        })
        db.session.add(newDefAddress)
        db.session.commit()
        return { "message": "default address created" }
    if request.method == 'DELETE':
        # response = Default_add.query.filter_by(user_id=current_user.get_id()).all()
        response = Default_add.query.filter_by(user_id=current_user.get_id()).all()
        db.session.delete(response[0])
        db.session.commit()
        # addressesList = [defaultadd.data() for defaultadd in response]
        # addressesList[0].add_id = data["id"]
        # addressesList[0].user_id = data["user_id"]
        # db.session.commit()
        return { "message": "default address modified" }
