from flask import Flask,render_template,url_for,request
import mysql.connector


app=Flask(__name__,template_folder="../items website/templates")
db=mysql.connector.connect(
   host="localhost",
   username="lingesh",
   password="Lingesh2002",
   database="bookdb")
cursor=db.cursor()



@app.route('/')
def home():
    return render_template("index.html")

@app.route('/mahabarata')
def book1():
    return render_template("book1.html")

@app.route('/awbbs')
def book2():
    return render_template("awbbs.html")
@app.route('/payment')
def payment():
    if request.args.get("Pay")=="Pay":
        name=request.args.get('name')
        email=request.args.get('email')
        city=request.args.get('city')
        cardno=request.args.get('cardno')
        cash=request.args.get('cash')
        print(name,city,email,cardno,cash)
        sql="insert into paydetails(name,email,city,cardno,cost) values('{0}','{1}','{2}','{3}','{4}')".format(name,email,city,cardno,cash)
        cursor.execute(sql)
        db.commit()
        return render_template("tk.html",n=name,c=cash)
    else:
        return render_template("payment.html")
   

@app.route('/tk')
def tk():
    return render_template("tk.html")


@app.route('/survey')
def survey():
    return render_template("bsurvey.html")

@app.route('/sherlock holmes')
def sherlock():
    return render_template("sherlock.html")





if __name__=="__main__":
    app.run(debug=True)
