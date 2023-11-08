from app.models import db, environment, Department

def seed_departments():
    objects = [
        Department(name = 'Clothing, Shoes, Jewerly & Watches'),
        Department(name = 'Books'),
        Department(name = 'Movies, Music & Games'),
        Department(name = 'Electronics'),
        Department(name = 'Computers'),
        Department(name = 'Home, Garden & Tools'),
        Department(name = 'Pet Supplies'),
        Department(name = 'Beauty & Health'),
        Department(name = 'Toys, Kids & Baby'),
        Department(name = 'Handmade'),
        Department(name = 'Sports'),
        Department(name = 'Outdoors'),
        Department(name = 'Automotive & Industrial'),
        Department(name = 'Industrial & Scientific'),
    ]
    db.session.bulk_save_objects(objects)
    db.session.commit()


def undo_departments():
    db.session.execute("DELETE FROM departments")

    db.session.commit()
