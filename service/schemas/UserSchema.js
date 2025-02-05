const mongoose = require("mongoose")
const bcrypt = require("bcrypt"); 

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Username is required'],
  },

  email: {
    type: String,
    required: [true, 'Email is required'],
    unique: [true, 'This email already exist!'],
  },
  password: {
    type: String,
    required: [true, 'Password is required'],
  },
  wishlist: {
      type: Array,
      ref: "Sunglasses",
  },
  cart:{
      type: Array,
      ref: "Sunglasses",
  },
  orders: {
      type: Array,
      ref: "Purchase",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function(){
    const hash = await bcrypt.hash(this.password, 10)
    
    this.password = hash 
})

UserSchema.method('validatePassword', function(password){
  return bcrypt.compare(password, this.password)
})

const User = mongoose.model('User', UserSchema);

module.exports = User;