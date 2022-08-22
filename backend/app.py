from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_marshmallow import Marshmallow

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/backendsql'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
ma = Marshmallow(app)


class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    FirstName = db.Column(db.String(100))
    LastName = db.Column(db.String(100))
    age = db.Column(db.Integer)
    Height = db.Column(db.Integer)
    Weight = db.Column(db.Integer)

    def __init__(self, FirstName, LastName, age, Height, Weight):
        self.FirstName = FirstName
        self.LastName = LastName
        self.age = age
        self.Height = Height
        self.Weight = Weight


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ('id', 'FirstName', 'LastName', 'age', 'Height', 'Weight')


article_schema = ArticleSchema()
articles_schema = ArticleSchema(many=True)


@app.route('/get', methods=['GET'])
def get_articles():
    all_articles = Articles.query.all()
    results = articles_schema.dump(all_articles)
    return jsonify(results)
    # return jsonify({"Hello": "World"})


@app.route('/get/<id>/', methods=['GET'])
def post_details(id):
    article = Articles.query.get(id)
    return article_schema.jsonify(article)


@app.route('/add', methods=['POST'])
def add_article():
    FirstName = request.json['FirstName']
    LastName = request.json['LastName']
    age = request.json['age']
    Height = request.json['Height']
    Weight = request.json['Weight']
    # print(request)

    articles = Articles(FirstName, LastName, age, Height, Weight)
    db.session.add(articles)
    db.session.commit()
    return article_schema.jsonify(articles)


@app.route('/update/<id>/', methods=['PUT'])
def update_article(id):
    article = Articles.query.get(id)
    FirstName = request.json['FirstName']
    LastName = request.json['LastName']
    age = request.json['age']
    Height = request.json['Height']
    Weight = request.json['Weight']

    article.FirstName = FirstName
    article.LastName = LastName
    article.age = age
    article.Height = Height
    article.Weight = Weight

    db.session.commit()
    return article_schema.jsonify(article)


@app.route('/delete/<id>/', methods=['DELETE'])
def delete_article(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()

    return article_schema.jsonify(article)


@app.route('/add', methods=['POST'])
def postToPython():
    return 'This is example for post'


if __name__ == "__main__":
    app.run(debug=True)