from flask import Flask
from flask import render_template
from flask_bootstrap import Bootstrap
import sys
from user import User

def main():
	'''
	Find single user, print relavent information
	'''

	if len(sys.argv) > 1:
		user = User(' '.join(sys.argv[1:]))
	else:
		user = User('trump')

	print('{}{} \n\n{}\n'.format(user.name, user.description, user.tweet))

	print('{}\n\n{}'.format(user.hashtags(), user.remaining()))

	sys.exit()

if __name__=="__main__":
	try:
		main()
	except Exception as e:
		print(e)
