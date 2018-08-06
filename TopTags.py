from collections import Counter
import CToptions
import praw
from pushbullet import Pushbullet
from twython import Twython
import sys

# PRAW Authenticate
reddit = praw.Reddit(client_id=CToptions.CLIENT_ID,
					 client_secret=CToptions.CLIENT_SECRET,
					 password=CToptions.PASSWORD,
					 user_agent=CToptions.USER_AGENT,
					 username=CToptions.USERNAME)

# Twython Authenticate
twitter = Twython(CToptions.APP_KEY, CToptions.APP_SECRET,
                  CToptions.OAUTH_TOKEN, CToptions.OAUTH_TOKEN_SECRET)

# Pushbullet Authenticate
pb = Pushbullet(CToptions.API_KEY)

class User:
	'''
	This finds a user, returns their most used hashtags and fills in name, id, tweet, etc.
	'''
	def __init__(self, term):
		self.User = User
		self.term = twitter.search(q=term, count=1, tweet_mode='extended')

	# unpack API response for: id, user description, tweet found, name and username
	def id(self):
		return self.term['statuses'][0]['user']['id']

	def description(self):
		return self.term['statuses'][0]['user']['description'].replace('  ', '')

	def tweet(self):
		return self.term['statuses'][0]['full_text'].rstrip('"').replace('\n', ' ')

	def name(self):
		return self.term['statuses'][0]['user']['name']

	def uname(self):
		return self.term['statuses'][0]['user']['screen_name']

	# Find hashtags by searching through ID from API response
	def hashtags(self):
		hashlist = []
		temp = twitter.get_user_timeline(id=self.id(), count=1)
		
		# Continuously search through history, breaking through 200 tweet response limit
		while len(temp) != 0:
			temp = twitter.get_user_timeline(id=self.id(), count=200, max_id=temp[len(temp) -1]['id'] -1)
			for i in range(len(temp)):
				hashtags = temp[i]['entities']['hashtags']
				if len(hashtags) > 0:
					hashlist.append('#{}'.format(hashtags[0]['text']))

		# Find top 3
		tuples = Counter(hashlist).most_common(3)
		hashlist.clear()

		# Unpack list of tuples from (value, occurence)
		for key, value in tuples:
			hashlist.append(key)
		return ' '.join(hashlist)

def main():
	'''
	Find single user, print relavent information
	'''

	if len(sys.argv) > 0:
		term = sys.argv[1]
	else:
		term = 'trump'

	user = User(term)

	# Look in the format brackets to see what's printing
	print('{} aka {} - {} \n\n{}\n'.format(user.name(), user.uname(), user.description(), user.tweet()))

	print('I mostly use: {}'.format(user.hashtags()))

	print('\nRemaining searches: {}'.format(twitter.get_lastfunction_header('x-rate-limit-remaining')))

if __name__=="__main__":
	try:
		main()
	except Exception as e:
		print(e)

