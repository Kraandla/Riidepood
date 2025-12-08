# Riidepood
Api and website for booking furniture for purchase
------------------------------
# How to run this app

To run this app locally, 
* step 1: Clone this repo to your system
* step 2: open the repository folder in visual code
* step 3: run command "npm i"
* step 4: once packages have installed, in the "backend" folder, run the command "node ."
* step 5: ????
* step 6: your api is running at address localhost:8080
---------------------------------

To run this app with a database in zone.ee,
* step 1: log in to zone.ee
* step 2: go to "Veebimajutus" -> from the sidebar "Andmebaasid" -> "MySQL/MariaDB"
* step 3: create new MariaDB user for database management and add your current ip address to "välised hostid" inside the user creation
* step 5: Return to the "MySQL/MariaDB" page and create a new database. No need to change anything
* step 6: Go to your newly created user and press "Muuda"
* step 7: Give the user the following permissions in the new database:
    - Alter
    - Create
    - Delete
    - Execute
    - Insert
    - Select
    - Update
* step 8: In the repository backend folder copy the .env.example and remove the .example from the name
* step 9: In the newly created .env file you have to do the following:
    - add the DB_Hostname(server address) which is located at the "MySQL/MariaDB" page at the top in zone
    - copy the database name from the "MySQL/MariaDB" page and add it to DB_DBNAME
    - copy the user name from the same page and add it to DB_USERNAME
    - add the users password to DB_USERPASS
* Optional: add a separate user with all permissions
------
# Credits
This app is developed by:
* Kevin
* Orvet
