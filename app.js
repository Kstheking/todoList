require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname+"/date.js");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();

// let items = [];
// let workItems = [];

app.set("view engine","ejs");

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.locals._ = _; //This allows for us to use lodash across the app
mongoose.connect(process.env.MONGODB_SERVER_URL+"/todolistDB",{useNewUrlParser: true});

const itemsSchema = new mongoose.Schema({
  name:{
    type: String
  }
});

const Item = mongoose.model("Item", itemsSchema);

const item1 = new Item({
  name: "Welcome to your todoList!"
});
const item2 = new Item({
  name: "Hit the + button to add a new item."
});
const item3 = new Item({
  name: "<-- Hit this to delete an item"
});

const listSchema = new mongoose.Schema({
  name: String,
  items: [itemsSchema]
});

const List = mongoose.model("List", listSchema);

app.listen(process.env.PORT || 3000, function(){
  console.log("Server started");
});

app.get("/", function(req, res){

  let day = date.getDay();

  Item.find(function(err, items){
    if(err){
      console.log(err);
    }
    else{
      if(items.length === 0){
        Item.insertMany([item1, item2, item3], function(err){
          if(err){
            console.log(err);
          }
        });
        res.redirect("/");
      }
      else{
        res.render("list",{listTitle: day, newListItem: items}); //listTitle is the ejs variable, day is the js variable
      }
    }
  });

});

app.post("/", function(req, res){

  const itemName = req.body.listItem;
  const listName = req.body.list;
  const item = new Item({
    name: itemName
  });
  if(listName === (date.getDay())){ //matches with the getDate before space
    item.save();
    res.redirect("/");
  }
  else{
    List.findOne({name: listName}, function(err, foundList){
      if(!err){
        foundList.items.push(item);
        foundList.save();
        res.redirect("/"+listName);
      }
    });
  }

});

app.post("/delete", function(req,res){
  const listName = req.body.listName;
  const checkedItemId = req.body.checkbox;
  if(listName === (date.getDay())){
    Item.deleteOne({_id: checkedItemId}, function(err){
      if(err){
        console.log(err);
      }
    });
    res.redirect("/");
  }
  else{
    List.findOneAndUpdate({name: listName},{$pull: {items: {_id: checkedItemId}}}, function(err, foundList){
      if(!err){
        res.redirect("/"+listName);
      }
    });
  }

})

app.get("/about", function(req,res){
  res.render("about");
});

app.get("/:listName", function(req, res){
  const listName = _.capitalize(req.params.listName) ;
  List.findOne({name: listName}, function(err, list){
    if(!err){
      if(!list){
        //create a new list
        const list = new List({
          name: listName,
          items: [item1, item2, item3]
        });
        list.save();
        res.redirect("/"+listName);
      }
      else{
        // show an existing list
        res.render("list",{listTitle: listName, newListItem: list.items});
      }
    }
  });

});

app.post("/customList", function(req, res){
  const listName = req.body.customList;
  res.redirect("/"+listName);
})
