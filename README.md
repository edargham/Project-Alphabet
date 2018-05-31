# Project Alphabet

Read Me Before Using:

I- Requirements:
=================
You are expected to have all of the software listed below before you can run the project:

macOS only:
-------------
1- XCode (Found in the App Store)
2- Homebrew
	Open Terminal and type:

	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

Linux only:
-------------
1-Ruby 1.8.6 or newer.  
2-GCC 4.2 or newer.  
For Debian-based:  
Open Terminal and type:
	
	sudo apt-get install build-essential curl git m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev

For Fedora:
Open Terminal and type:

	sudo dnf install build-essential curl git m4 ruby texinfo libbz2-dev libcurl4-openssl-dev libexpat-dev libncurses-dev zlib1g-dev

- Homebrew:
	Open Terminal and type:

	ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/linuxbrew/go/install)" 

	Follow the instructions in the terminal to complete the installation process.
	Once Linuxbrew is installed, you’ll need add the following 3 lines to your .bashrc or .zshrc file:

	export MANPATH="$HOME/.linuxbrew/share/man:$MANPATH"
	export INFOPATH="$HOME/.linuxbrew/share/info:$INFOPATH"	export PATH="$HOME/.linuxbrew/bin:$PATH"
	Why Homebrew/Linuxbrew?
	You may be asking why you should use a third-party package manager. Here are some advantages:
	
	Can install software to a home directory and so does not require sudo.
	Install software not packaged by the native distribution.
	Install up-to-date versions of software when the native distribution is old.
	Use the same package manager to manage both your Mac and Linux machines.

All OS:
-------
1 - node.js:
	Download node here:  
	https://nodejs.org/en/download/  
	Alternatively for macOS and Linux, you can type in terminal if you already have home-brew installed/Followed steps for macOS 
	and Linux before coming here.  
	
	brew install node  

2 - node package manager (npm):  
	Windows: Make sure to select it while installing node.js from the link above  
	Mac and Linux: 	Newer versions of node install npm automatically.  
	However, you can also open Terminal and Type:  
	
	brew install npm  
  
	
3 - mySQL workbench  
	Download workbench here:  
	https://dev.mysql.com/downloads/workbench/  

4- mySQL server (localhost or webhosted):  
	You have to download mySQL Community Server:  
	https://dev.mysql.com/downloads/mysql/  
	Or and Apache Localhosting Server:  
	https://www.apachefriends.org/download.html  

II- Content:
============
This Repository Contains the Full Stack (Back End and Front End) for Project Alphabet:
Folder Web Contains The Front end.
Folder DB Contains The SQL Scripts for the Data Model.

Web:  
You'll find 2 folders:  
	- server-project-alphabet:  
		contains all the files needed to run the server.  
		open your terminal to the specified folder and run the following command:  
			`node server.js`  
		to start the server  
	- project-alphabet-client:  
		contains all the files that run on the frontend  
		open your terminal to the specified folder and run the following command:  
			`yarn start`  
		to start the Reactjs server. you need to run this simultaneously with the server.  
  
DB:  
You'll find an SQL dump that creates the Database from scratch with all the inserts needed to run properly.  

## **WARNING:** Dependacy Issues:
The `react-multi-toggle` package installed by yarn is a broken package. Fortunately, there is a workaround for it.
you are kindly requested to clone the package from GitHub:  
  
https://github.com/danielarias123/react-multi-toggle  
  
And replace the `index.js` and the `index-es6.js` from the cloned repo to the package found in `node_modules` in the project directory.  
