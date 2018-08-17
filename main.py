from flask import Flask
from flask import render_template
from flask import redirect
from flask import request
from flask import url_for
from flask_bootstrap import Bootstrap
import sys
from user import User

# Initialise Flask
app = Flask(__name__)
bootstrap = Bootstrap(app)

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/query', methods=['GET', 'POST'])
def query():
	if request.method == 'POST': 
		term = request.form['term']
		user = User(term)
		return render_template('query.html', term=term, url=user.url, pic=user.pic, name=user.name, description=user.description, tweet=user.tweet, hashtags=user.hashtags(), remaining=user.remaining())
	else:
		return redirect(url_for('index'))

if __name__=="__main__":

	app.run(debug=True)
