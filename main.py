from flask import Flask
from flask import render_template
from flask_bootstrap import Bootstrap
import sys
from user import User

# Initialise Flask
app = Flask(__name__)
bootstrap = Bootstrap(app)

@app.errorhandler(404)
def page_not_found(e):
	return render_template('404.html', e=e), 404

@app.errorhandler(500)
def internal_server_error(e):
	return render_template('500.html', e=e), 500

@app.route('/')
def index():
	return render_template('index.html')

@app.route('/<term>')
def query(term):
	try:
		user = User(term)
		return render_template('query.html', term=term, name=user.name, description=user.description, tweet=user.tweet, hashtags=user.hashtags(), remaining=user.remaining())
	except Exception as e:
		internal_server_error(e)

if __name__=="__main__":

	app.run(debug=True)
