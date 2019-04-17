# todoList
This WebApp is a elegant toDo List in which you can add, delete items and make your own seperate todo List  
It uses Node with Express and uses MongoDB Atlas as its database  
  
Here is this WebApp hosted on Heroku https://todolist-khushal.herokuapp.com <br/><br/>
<p align="center">
<img width="600" src="https://drive.google.com/uc?id=1XHDfM4Fv_Y8INQr_HwOudD4g0-B3faXr">
 </p> <br/><br/>  
 
  ## How to use it
  - On the Homepage, you have your daily todo List 
    - **Add a item**: Enter text in the input field below items and press the "+" button
    - **Delete a item**: Click the Checkbox next to a item to delete it  
    
  - To navigate to your own todo List
    - Enter name of your todo List in the input field below
    - Press *Go*
    - Customise it as and how you want, all your data will be saved in the database  
      
 ## How to test it locally  
 - Make sure you have *node* and *npm* installed
 - To test it locally you also should have mongoDB installed, [See here](https://www.mongodb.com/download-center/community)
 - navigate to wherever you want this directory to be
 - Run these commands 
   - `git clone https://github.com/Kstheking/todoList.git`
   - `cd todoList`
   - `npm install`
 - In a seperate terminal run `mongod` or `sudo mongod` and make sure it is listening on port 27017
 - Inside the file **app.js** on line 19 replace {process.env.MONGODB_SERVER_URL+"/todolistDB"} with {"mongodb://localhost:27017/todolistDB"}
 - Finally, in your terminal run `node app.js` while being in the todoList directory
 - If executed properly you should see the app by navigating to **localhost:3000** on your browser
 

      
