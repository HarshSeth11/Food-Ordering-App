const mongoose = require("mongoose");

const mongoDB = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/seth_kitchen");
    const fetch_data = await mongoose.connection.db.collection("foodItems");
    const fetch_foodCategory = await mongoose.connection.db.collection(
      "foodCategory"
    );
    const data = await fetch_data.find({}).toArray();
    const catData = await fetch_foodCategory.find({}).toArray();
    global.food_items = data;
    global.foodCategory = catData;
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoDB;
