const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
  name: {
    type: String,
  },
  description: {
    type: String,
  },
  status:{
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed'],
  },
  clientId:{
    type:Schema.Types.ObjectId,
    ref:'Client',

  }

});

module.exports = model("Project", ProjectSchema);