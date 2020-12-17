# CS-470 Project (Server)
1. Clone the server repo.
   > `git clone https://github.com/evanwike/cs470-server.git`
2. Navigate to the project directory and install dependencies.
   > `cd cs470-server`  
   > `npm install`
3. Navigate to the config directory.
   > `cd config`
4. Open "default.js" and replace the \<values> in config.db with your SQL Server credentials **OR** email me to request access to the project database.
   > "user": "{username}" -> "user": "evan"
5. Start the server.
   > `npm start`
6. The server should now be running on port 3000. If you're already using port 3000, either allow it to choose a different port or re-run the start script with a different port.
   > `npm start --port {new port}`
7. Clone the front-end repo.
   > `git clone https://github.com/evanwike/cs470-project.git`
8. Follow the instructions at [https://github.com/evanwike/cs470-project](https://github.com/evanwike/cs470-project) to set up the client.
