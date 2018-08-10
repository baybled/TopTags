from collections import Counter
import CToptions
import praw
from pushbullet import Pushbullet
from twython import Twython
import sys

# PRAW Authenticate
reddit = praw.Reddit(client_id=CToptions.CLIENT_ID,\
					 client_secret=CToptions.CLIENT_SECRET,\
					 password=CToptions.PASSWORD,\
					 user_agent=CToptions.USER_AGENT,\
					 username=CToptions.USERNAME)

# Twython Authenticate
twitter = Twython(CToptions.APP_KEY,\
				  CToptions.APP_SECRET,\
                  CToptions.OAUTH_TOKEN, \
                  CToptions.OAUTH_TOKEN_SECRET)

# Pushbullet Authenticate
pb = Pushbullet(CToptions.API_KEY)

class User:
	'''
	This finds a user, returns their most used hashtags and fills in name, id, tweet, etc.
	'''
	
	def __init__(self, term):
		self.User = User
		self.term = twitter.search(q=term, count=1, tweet_mode='extended')

	# unpack API response for: name and screenname, description and tweet

	@property
	def name(self):

		# if no name or screenname is found, don't display innapropriate text
		if len(self.term['statuses'][0]['user']['name']) == 0:
			return self.term['statuses'][0]['user']['screen_name']
		elif len(self.term['statuses'][0]['user']['screen_name']) == 0:
			return self.term['statuses'][0]['user']['name']
		else:
			return '{} aka {}'.format(self.term['statuses'][0]['user']['name'], self.term['statuses'][0]['user']['screen_name'])

	@property
	def description(self):

		# if no descriptions returned, don't display innapropriate text
		if len(self.term['statuses'][0]['user']['description']) > 0:
			return ' - {}'.format(self.term['statuses'][0]['user']['description'].replace('  ', ''))
		else:
			return

	@property
	def tweet(self):
		return self.term['statuses'][0]['full_text'].rstrip('"').replace('\n', ' ')
	
	# Find hashtags by searching through ID from API response
	def hashtags(self):
		hashlist = []
		temp = twitter.get_user_timeline(id=self.term['statuses'][0]['user']['id'], count=1)
		
		# Continuously search through history, breaking through 200 tweet response limit
		while len(temp) != 0:
			temp = twitter.get_user_timeline(id=self.term['statuses'][0]['user']['id'], count=200, max_id=temp[len(temp) -1]['id'] -1)
			for i in range(len(temp)):
				hashtags = temp[i]['entities']['hashtags']
				if len(hashtags) > 0:
					hashlist.append('#{}'.format(hashtags[0]['text']))

		returns = []

		# Unpack top 3 from (value, occurence)
		for key, value in Counter(hashlist).most_common(3):
			returns.append(key)
		
		# If no tags returned, don't display innapropriate text
		if len(returns) > 0:
			return 'I mostly use: {}'.format(' '.join(returns))
		else:
			return


def main():
	'''
	Find single user, print relavent information
	'''

	if len(sys.argv) > 1:
		user = User(' '.join(sys.argv[1:]))
	else:
		user = User('trump')

	print('{}{} \n\n{}\n'.format(user.name, user.description, user.tweet))

	print('{}'.format(user.hashtags()))

	print('\nRemaining searches: {}'.format(twitter.get_lastfunction_header('x-rate-limit-remaining')))

	sys.exit()

if __name__=="__main__":
	try:
		main()
	except Exception as e:
		print(e)
