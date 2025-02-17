const mongoose = require("mongoose");

const PurchaseSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: [true, 'Name is required'],
  },
  lastname: {
    type: String,
    required: [true, 'Lastname is required'],
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
  },
  phoneNumber: {
    type: String,
    required: [true, 'Phone number is required'],
  },
  state: {
    type: String,
    required: [true, "State is required"], // Error message for missing city
  },
  city: {
    type: String,
    required: [true, "City is required"], // Error message for missing city
  },
  area: {
    type: String,
    required: [true, "Area is required"], // Error message for missing city
  },
  zipCode: {
    type: String,
    required: [true, "Postal code is required"], // Error message for missing postal code
    description: "Postal code for delivery",
  },
  address: {
    type: String,
    required: [true, "Delivery address is required"], // Error message for missing delivery address
  },

  addressNum: {
    type: String,
    required: [true, "Address number address is required"],
  },
  purchaseDate: {
    type: String,
    require: true,
    default: Date.now,
  },
  additionalInfo: {
    type: String,
    required: [true, "Additional info is required"],
  },
  totalPurchasePrice: {
    type: Number,
    required: [true, "Total purchase price is required"], // Error message for missing total purchase price
    description: "Total price for the entire purchase",
  },
  orderCode: {
    type: String,
    required: true,
    unique: true,
  },
  sunglasses: [
    {
      item: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sunglasses",
        required: [true, "Sunglasses item is required"],
      },
      name:{
        type: String,
        required: true,
      },
      images: {
        type: Array,
        required: [true, "At least one image is required"], //
      },
      price: {
        type: Number,
        required: [true, "Price per unit is required"], 
        description: "Price of one unit of the sunglasses",
      },
      quantity: {
        type: Number,
        required: [true, "Quantity is required"], 
        min: [1, "Quantity must be at least 1"],
        description: "Number of sunglasses purchased",
      },
      totalPrice: {
        type: Number,
        required: [true, "Total price for this item is required"],
        description: "Total price for this item (pricePerUnit * quantity)",
      },
    },
  ],
});

const Purchase = mongoose.model("Purchase", PurchaseSchema);
module.exports = Purchase;


  