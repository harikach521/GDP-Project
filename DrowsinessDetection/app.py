from flask import Flask, render_template, request, flash

from flask import Response
import csv

from flask import session

import sys
import os
import io
import cv2

from DBConfig import DBConnection


app = Flask(__name__)
app.secret_key = "abc"


@app.route('/')
def index():
    return render_template('index.html')


@app.route("/user")
def user():
    return render_template("user.html")


@app.route("/admin")
def admin():
    return render_template("admin.html")


@app.route("/newuser")
def newuser():
    return render_template("register.html")


@app.route("/userlogin_check", methods=["GET", "POST"])
def userlogin_check():

    uid = request.form.get("unm")
    pwd = request.form.get("pwd")

    database = DBConnection.getConnection()
    cursor = database.cursor()
    sql = "select count(*) from register where userid='" + \
        uid + "' and passwrd='" + pwd + "'"
    cursor.execute(sql)
    res = cursor.fetchone()[0]
    if res > 0:
        session['uid'] = uid

        return render_template("user_home.html")
    else:

        return render_template("user.html", msg2="Invalid Credentials")

    return ""


@app.route("/faceDetection", methods=["GET", "POST"])
def face_location():

    face = cv2.CascadeClassifier('haarcascade_frontalface_alt.xml')
    eye_dectector = cv2.CascadeClassifier('haarcascade_eye.xml')
    image = cv2.imread("test.jpg")
    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
    faces = face.detectMultiScale(
        gray, minNeighbors=5, scaleFactor=1.1, minSize=(35, 35))
    for (x, y, w, h) in faces:
        cv2.rectangle(image, (x, y), (x + w, y + h), (100, 100, 100), 1)
    #cv2.imshow("Face Detection",image)
    roi_gray = gray[y:y+h, x:x+w]
    roi_color = image[y:y+h, x:x+w]
    # -----roi_gray is the cropped detected face in grayscale
    # --- roi_color is the cropped detected face in color
    eyes = eye_dectector.detectMultiScale(roi_gray)
    for (ex, ey, ew, eh) in eyes:
        cv2.rectangle(roi_color, (ex, ey), (ex+ew, ey+eh), (0, 255, 0), 2)

    cv2.imshow('Face And Eyes Detection', image)
    cv2.waitKey(0)


@app.route("/user_register", methods=["GET", "POST"])
def user_register():
    try:
        sts = ""
        firstname = request.form.get('firstname')
        lastname = request.form.get('lastname')
        gender = request.form.get('gender')
        uid = request.form.get('unm')
        pwd = request.form.get('pwd')
        mno = request.form.get('mno')
        email = request.form.get('email')
        database = DBConnection.getConnection()
        cursor = database.cursor()
        sql = "select count(*) from register where userid='" + uid + "'"
        cursor.execute(sql)
        res = cursor.fetchone()[0]
        if res > 0:
            sts = 0
        else:
            sql = "insert into register values(%s,%s,%s,%s,%s)"
            values = (firstname, lastname, gender, uid, pwd, email, mno)
            cursor.execute(sql, values)
            database.commit()
            sts = 1

        if sts == 1:
            return render_template("user.html", msg="Registered Successfully..! Login Here.")

        else:
            return render_template("register.html", msg="User Id already exists..!")

    except Exception as e:
        print(e)

    return ""


if __name__ == '__main__':
    app.run(host="localhost", port=1357, debug=True)
