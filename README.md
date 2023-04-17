# CS260-Startup-Project
Startup Project

I will be making a simple game that utilizes RGB color manipulation. The idea is that the user will be shown a color swatch and will from then guess what the RGB values of that swatch are. They will be given the primary colors and their repsective RGB values as a reference to base their guess off of. I am still determining how a leaderboard will be ranked, if it will be by who guessed each color most accurately, or by overall accuracy. After a player has finished playing, their scores and associated colors will be posted to a leaderboard based on the accuracy of the user's guesses in comparison to the actual RGB values of the given color.

Below is the sketch for the login page, a gamestate, and the leaderboard/end page.

![This is an image](/IMG_1031.jpg)

Also, I hope it doesn't matter too much that I overrode the old text I had from the Github assignment. Sorry about that, I promise I had it.

NOTES ON SIMON HTML:

It was interesting to me how much simpler HTML is than I was expecting. But it also seems limited on its own, so it makes a lot more sense why we're learning CSS and JavaScript as well. I was also swamped with other homework while I was working on this, so while I may not have done a lot of it manually, seeing all the code needed to make the simple Simon shapes in HTML emphasized to me the necessity of the other languages and systems we use to supplement it.

NOTES ON SIMON CSS: 
It was neat to actually make it not look kinda like barf? Though it definitely feels weird to me after doing so much coding without worrying about UX in my other classes, but I guess that's why we work on it here.


NOTES ON STARTUP HTML AND CSS:
There are still some bugs and jankyness with the styling, but its starting to look almost functional to me at least. On the play page there's supposed to be a color swatch to guess from, but since I can't get that to show up I also haven't added the example swatches and values, so those will have to wait. This process is starting to make a bit more sense, but I've been pretty stretched already with my calc and cs235 classes...

NOTES ON SIMON JS:
It seems both really foreigh still, but also simple? Going over the provided code made me see where I need to watch to keep myself from overcomplicating this whole thing.

NOTES ON STARTUP JAVASCRIPT: 
I've been trying to catch up on this, but am finally moving cause my other classes finally gave me a break. I think I'm starting to get the hang of JS, it makes a bit more sense, but I think I'm barely scratching the surface of what it can do when you know how to use all the APIs and stuff.

SIMON SERVICES: 
One thing I've learned is to not get behind... Also, I guess it hasn't quite clicked for me yet why we need to do all this, but I guess it makes it more efficient to run and is probably more secure.

SIMON DB: 
Checking the access settings in Mongo is important, also, its neat to see the JSON and everything starting to come together and work.

SIMON LOGIN: 
This one felt like an extension of the database part, just using a hash for security of the password and denying access to the play page if a login is unsuccessful.

