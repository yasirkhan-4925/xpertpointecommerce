import mongoose from 'mongoose';
import user from './data/user.js';
import products from './data/products.js';
import User from './models/userModel.js';
import Order from './models/orderModel.js';
import Product from './models/productModel.js';
import dotenv from 'dotenv';
import connect from './config/mongoConnect.js';
import colors from 'colors';

dotenv.config();
connect();

const importData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();

    const users = await User.insertMany(user);
    const adminId = users[0]._id;
    const productsToImport = products.map((product) => {
      return { ...product, user: adminId };
    });
    await Product.insertMany(productsToImport);
    console.log('Data Imported Successfully'.green.inverse.underline);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await User.deleteMany();
    await Order.deleteMany();
    await Product.deleteMany();
    console.log('Data Deleted Successfully'.red.inverse.underline);
    process.exit();
  } catch (err) {
    console.log(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  deleteData();
} else {
  importData();
}
