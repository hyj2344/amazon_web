from .db import db, environment, add_prefix_for_prod
from sqlalchemy.sql import func

class Default_add(db.Model):
    __tablename__ = 'default_add'

    id = db.Column(db.Integer, primary_key=True)

    add_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('addresses.id')), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey(add_prefix_for_prod('users.id')), nullable=False)

    addresses = db.relationship("Address", back_populates="default_add")
    user = db.relationship("User", back_populates="default_add")

    def data(self):
        return {
            "add_id": self.add_id,
            "user_id":self.user_id
        }
