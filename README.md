# Team 22 - UNI React Project
Members: Chris On, Crystal Yip, Wilson Wei-Sheng Hsu, Victor Huang

# Instructions to run
Clone the repository. Using the terminal, cd into the directory folder. Then do the following:
1. Run `npm install`
2. Run `npm start`
3. A page should automatically open; however, if it does not, you can open the web application manually on the browser
   and access our entry point using the following URL `localhost:3000`

# Our Views
We currently have 8 different views associated with our web application UNI. Each view can be accessed from any page using the navigation bar. 

Steps to Reach Each View
Note: Other than the Login View, you must log in to reach other pages(cannot manually access through typing in the url)

1. Login View: `localhost:3000`

2. Admin View: Logging in using admin credentials, if already logged in, 
               you can access this view through the `Admin` button in the side navigation bar
			   
3. Home View: Logging in using user credentials defaults to this page, if already logged in,
			  you can access this view through the `Making Connections` button in the side navigation bar
			  
4. Profile View: Click on the `Profile` button of the top navigation bar

5. Profile Editing View: Click on the `Settings` button of the side navigation bar,
					     or if you are on the Profile View, you can click the `Edit Profile` button
						 
6. Events View: Click on the first event in the Events List View

7. Events List View: Click on the `Events` button either on the top or the side navigation bar

8. Connections View: Click on the `Connections` button on the side navigation bar

# User Instructions
The user credentials is as follows:

username: `user`

password: `user`

For a standard user:

1. After logging in, they will be at the Home view, where you see potential connections. You can click on them for more information and either accept or reject them.
2. They can access their profile and make edits to it by clicking the `Profile` button on the navigation bar on the top of the window
3. They can access the event list and click on them for more information
4. They can view their connections by clicking on the `Connections` button on the side navigation bar

# Admin Instructions
The user credentials is as follows:

username: `admin`

password: `admin`

For an admin:

1. After logging in, they will be at the Admin View, where the can add/remove users and events and see statistics for the webapp
2. Admins have the `Admin` button in the side navigation bar while standard users do not
3. They can access all pages that a standard user can

# Event Instructions
You can find a list of all upcoming events by clicking the `Events` button on the Navigation bar on top of the window. 
Even though there are many events shown on list, but only the first two event are linked to an existing event page. By clicking on the event, you will be taken to the existing event page.
Inside event page you will find more information regarding the event, (Name, Host Profile, Cover Photo, Description, Location, Attendees) The Host profile image is linked to the existing profile page for that host. For names in `Attendees` table, only the first one is linked to an existing profile page for demonstration purpose. 
