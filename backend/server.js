// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv= require('dotenv');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const bcrypt=require('bcrypt')


app.use(cors());
app.use(express.json());
dotenv.config({
    path:'./config.env'
    })
// Connect to your MongoDB database
mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB connected sucessfully....')
    })
    const con=mongoose.connection;

// Define your MongoDB schema and model using Mongoose
const complaintSchema = new mongoose.Schema({
    username: { type: String, required: true },
    complaint: { type: String },
    suggestions: { type: String },
    products: { type: String }
  });

const Complaint = mongoose.model('Complaint', complaintSchema);

const brandSchema = new mongoose.Schema({
    brandname: String,
    phoneNumber: {
      type: String,
      unique: true,
      required:true,
    },
    email: {
      type: String,
      unique: true,
      required:true,
    },
    brandcode: {
      type: String,
      unique: true,
      required:true,
      index:true,
    },
    password:{
      type:String,
      required:true,
    } 
  });

  const Brand = mongoose.model('Brand',brandSchema)

  const brandproductSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description :{
      type: String,
      required: true
    },
    pet_category:{
      type: String,
      required: true
    },
    product_category:{
      type: String,
      required:true
      
    },
    available:{
      type: Number,
      required:true
      
    },
  
    price: {
      type: Number,
      required: true
    },
    image: {
      type: String,
      required: true
    },
    brandcode:{
      type:String,
      required:true
    }
   
  });

  const BrandProducts = mongoose.model('BrandProducts', brandproductSchema);

  
  const salonSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    description :{
      type: String,
      required: true
    },
    location_category:{
      type: String,
      required: true
    },
    address:{
      type: String,
      required:true
      
    },
    phoneNumber:{
      type: String,
      required:true
      
    },
  
    image: {
      type: String,
      required: true
    },
   
   
  });

  const Salon = mongoose.model('Salon', salonSchema);

  const userSchema = new mongoose.Schema({
    fullname: String,
    phoneNumber: {
      type: String,
      unique: true,
      required:true,
    },
    email: {
      type: String,
      unique: true,
      required:true,
    },
    username: {
      type: String,
      unique: true,
      required:true,
      index:true,
    },
    password:{
      type:String,
      required:true,
    } 
  });

  const User = mongoose.model('User', userSchema);
  const wishlistSchema = new mongoose.Schema({
    userId: String,
    products: [brandproductSchema],
  });
  const Wishlist = mongoose.model('Wishlist', wishlistSchema);
  const cartSchema = new mongoose.Schema({
    userId: String,
    products: [
      {
        
        title: {
          type: String,
          required: true
        },
        description :{
          type: String,
          required: true
        },
        pet_category:{
          type: String,
          required: true
        },
        product_category:{
          type: String,
          required:true
          
        },
        available:{
          type: Number,
          required:true
          
        },
      
        price: {
          type: Number,
          required: true
        },
        image: {
          type: String,
          required: true
        },
        brandcode:{
          type:String,
          required:true
        },
        quantity:{type:Number,default:1}
        
      }
    ],
  });
  const Cart = mongoose.model('Cart', cartSchema);
  const reviewSchema = new mongoose.Schema({
    userName: String,
    productTitle: String,
    reviewText: String,
    star:Number
  });
  const Review = mongoose.model('Review', reviewSchema);

  const orderSchema = new mongoose.Schema({
    userId: String,
    paymentDetails: {
      name: String,
      address: String,
      accountNumber: String,
      cvv: String,
      expiryDate: Date,
    },
    products: [{
      title: String,
      quantity: Number,
      price: Number,
      image:String
      // Add other product details if needed
    }],
    totalAmount: Number,
  });
  
  // Create the Order model
  const Order = mongoose.model('Order', orderSchema);
  const phoneRegex = /^[6789]\d{9}$/; 
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
  const passwordRegex = /^.{8,}$/;


  function svalidateform(sphoneno,semailid,spassword){
    let valid=true;
    if(!phoneRegex.test(sphoneno)){
      valid=false;
    }
    if(!emailRegex.test(semailid)){
      valid=false;
    }
    if(!passwordRegex.test(spassword)){
      valid=false;
    }
    return valid;
  }

  app.post('/api/user/register',async (req,res)=>{
    try{
   console.log(req.body);
   const user=req.body.username;
   const existingUser = await User.findOne({ user });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const hashpass = await bcrypt.hash(req.body.password, 10);
    if (svalidateform(req.body.phone, req.body.email, req.body.password)) {
      const newUser=new User({
        fullname: req.body.fullname,
      phoneNumber: req.body.phone,
      email: req.body.email,
     username: req.body.username,
      password: hashpass
    })
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully'});}}
     catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
   
   });
  app.post('/api/register', async (req, res) => {
    try {
      
    console.log(req.body);
    console.log(req.body.phone);
    console.log(req.body.email);
    console.log(req.body.username);
    const user=req.body.username;
    const existingSeller = await Brand.findOne({ user });
    if (existingSeller) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    const hashpass = await bcrypt.hash(req.body.password, 10);
    if (svalidateform(req.body.phone, req.body.email, req.body.password)) {
    const newSeller=new Brand({
        brandname: req.body.fullname,
      phoneNumber: req.body.phone,
      email: req.body.email,
     brandcode: req.body.username,
      password: hashpass
    })
    await newSeller.save();
    
  
    res.status(201).json({ message: 'Seller registered successfully'});;}}
     catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.post('/api/user/login', async (req, res) => {
    console.log(req.body);
   const password=req.body.password
   const username=req.body.username
   console.log('Provided username:', username);
   const userfo = await User.findOne({ username: username.trim()});
   console.log('Found user:', userfo);
   
    try {
      // Find the seller by username
      const userfound = await User.findOne({ username: username.trim()});
     console.log(userfound)
      if (userfound) {
        // Compare the provided password with the hashed password stored in the database
        console.log(userfound.password)
        const passwordMatch = await bcrypt.compare(password, userfound.password);
       console.log(passwordMatch)
        if (passwordMatch) {
          // Passwords match, authentication successful
          return res.status(200).json({ message: 'Login successful' });
        } else {
          // Passwords do not match, authentication failed
          return res.status(401).json({ message: 'Invalid username or password' });
        }
      } else {
        // Seller not found, authentication failed
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });





  app.post('/api/login', async (req, res) => {
    console.log(req.body);
   const password=req.body.password
   const brandcode=req.body.username
   console.log('Provided username:', brandcode);
   const seller = await Brand.findOne({ brandcode: brandcode.trim()});
   console.log('Found seller:', seller);
   
    try {
      // Find the seller by username
      const seller = await Brand.findOne({ brandcode: brandcode.trim()});
     console.log(seller)
      if (seller) {
        // Compare the provided password with the hashed password stored in the database
        console.log(seller.password)
        const passwordMatch = await bcrypt.compare(password, seller.password);
       console.log(passwordMatch)
        if (passwordMatch) {
          // Passwords match, authentication successful
          return res.status(200).json({ message: 'Login successful' });
        } else {
          // Passwords do not match, authentication failed
          return res.status(401).json({ message: 'Invalid username or password' });
        }
      } else {
        // Seller not found, authentication failed
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });


  app.post('/api/add', async (req, res) => {
    try {
      
    console.log(req.body);
    
    
    const newProduct=new BrandProducts({
      title:req.body.title,
      description :req.body.description,
      pet_category:req.body.pet_category,
      product_category:req.body.product_category,
      available:req.body.quantity,
      price:req.body.price,
      image: req.body.image,
      brandcode:req.body.brand
       
    })
    await newProduct.save();
    
  
    res.status(201).json({ message: 'Product registered successfully' });;}
     catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


  app.delete('/api/products/:title', async (req, res) => {
    const title = req.params.title;
  
    try {
      // Assuming BrandProducts is your Mongoose model
      const deletedProduct = await BrandProducts.findOneAndDelete({title:title});
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  app.post('/edit/:title', async (req, res) => {
    const title = req.params.title;
    console.log(title);
    console.log(req.body.description);
  
    try {
      const updatedProduct = await BrandProducts.findOneAndUpdate(
        { title: title },
        {
          title: title,
          description: req.body.description,
          pet_category: req.body.pet_category,
          product_category: req.body.product_category,
          available: req.body.quantity,
          price: req.body.price,
          image: req.body.image,
          brandcode: req.body.brand,
        },
        { new: true } // Return the updated document
      );
  
      if (!updatedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(201).json({ message: 'Product edited successfully', updatedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });
  
  app.post('/api/addsalon', async (req, res) => {
    try {
      
    console.log(req.body);
    
    
    const newSalon=new Salon({
      title:req.body.title,
      description :req.body.description,
      location_category:req.body.location,
      phoneNumber:req.body.phoneNumber,
      address:req.body.address,
      
      price:req.body.price,
      image: req.body.image,
    
       
    })
    await newSalon.save();
    
  
    res.status(201).json({ message: 'Salon registered successfully' });;}
     catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  app.get('/api/products/:brandcode', async (req, res) => {
    try {
      const products = await BrandProducts.find({ brandcode: req.params.brandcode });
      console.log(products)
      res.json(products);
    } catch (error) {
      console.error(`Error fetching products for ${req.params.brandcode}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/api/seller/:brandcode', async (req, res) => {
    try {
      const seller = await Brand.findOne({ brandcode: req.params.brandcode });
      if (!seller) {
        return res.status(404).json({ message: 'Seller not found' });
      }
  
      // Exclude sensitive information like password before sending the response
      const sellerDetails = {
        brandname: seller.brandname,
        phoneNumber: seller.phoneNumber,
        email: seller.email,
        brandcode: seller.brandcode,
      };
  
      res.json(sellerDetails);
    } catch (error) {
      console.error(`Error fetching details for ${req.params.brandcode}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/products', async (req, res) => {
    console.log('Request received for /products');
    const { specie, brand, price, category } = req.query;
    console.log('hi');
    console.log(specie)
    console.log(category)
  
    try {
      const priceFilter = price !== 'All' ? parseInt(price) : Infinity;
  
      const products = await BrandProducts.find({
        pet_category: specie !== 'All' ? specie : /.*/,
        brandcode: brand !== 'All' ? brand : /.*/,
        price: { $lte: priceFilter },
        product_category: category !== 'All' ? category : /.*/,
      });
      console.log(products)

      
  
      res.json(products);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/salon/:location', async (req, res) => {
    const {location}=req.params
    
   
   
  
    try {
     
  
      const salons = await Salon.find({
       
        location_category: location,
      });
    
      
  
      res.json(salons);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.get('/salon', async (req, res) => {
    
  try {
     
  
      const salons = await Salon.find();
    
      
  
      res.json(salons);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  app.get('/api/product/:title/edit', (req, res) => {
    console.log('hi')
    BrandProducts.findOne({title:req.params.title})
      .then(product => {
        console.log(product)
       res.json(product)
      })
      .catch(err => console.log(err));
  });
  
  
// Define a route to fetch complaints

app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
   
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});
app.get('/api/orders', async (req, res) => {
  try {
    const complaints = await Order.find();
    res.json(complaints);
   
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});


app.get('/api/users/:username', async (req, res) => {
  try {
    const { username } = req.params;
    console.log(username)
    const user = await User.findOne({ username:username });
    console.log(user)
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/wishlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const wishlist = await Wishlist.findOne({ userId });
    res.json(wishlist || { userId, products: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/wishlist/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    const { product } = req.body;
    console.log(product)

    let wishlist = await Wishlist.findOne({ userId });
    console.log(wishlist)

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    wishlist.products.push(product);
    await wishlist.save();

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/wishlist/:userId/:title', async (req, res) => {
  try {
    const { userId, title } = req.params;

    const wishlist = await Wishlist.findOne({ userId });

    if (wishlist) {
      wishlist.products = wishlist.products.filter((product) => product.title !== title);
      console.log(wishlist.products)
      await wishlist.save();
    }

    res.json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const cart = await Cart.findOne({ userId });
    res.json(cart || { userId, products: [] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/cart/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    console.log(userId)
    const { product } = req.body;
    console.log(product)

    let cart = await Cart.findOne({ userId });
    console.log(cart)

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    cart.products.push(product);
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/api/cart/:userId/:title', async (req, res) => {
  try {
    const { userId, title } = req.params;

    const cart = await Cart.findOne({ userId });

    if (cart) {
      cart.products = cart.products.filter((product) => product.title !== title);
      console.log(cart.products)
      await cart.save();
    }

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/cart/:userId/:producttitle', async (req, res) => {
  try {
    const { userId, producttitle } = req.params;
    const { quantity } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      return res.status(404).json({ error: 'Cart not found' });
    }

    // Find the index of the product in the cart
    const productIndex = cart.products.findIndex((item) => item.title === producttitle);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

    // Update the quantity of the product
    cart.products[productIndex].quantity = quantity;

    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/products/:producttitle', async (req, res) => {
  try {
    const { producttitle } = req.params;
    const product = await BrandProducts.findOne({title:producttitle});

    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.get('/salons/:title', async (req, res) => {
  try {
    console.log('hi')
    const { title } = req.params;
    console.log(title)
    const salon = await Salon.findOne({title:title});

    if (!salon) {
      return res.status(404).json({ error: 'Salon not found' });
    }

    res.json(salon);
    console.log(salon)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/api/add-review', async (req, res) => {
  try {
    // Extract data from the request body
    const { userName, productTitle, reviewText,star } = req.body;

    // Create a new review document
    const newReview = new Review({
      userName,
      productTitle,
      reviewText,
      star
    });

    // Save the review to the database
    await newReview.save();

    // Respond with a success message
    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

app.post('/api/orders/:userId', async (req, res) => {
  try {
    const { userId } = req.params;
    const { paymentDetails, products, totalAmount } = req.body;

    // Create a new order
    const order = new Order({
      userId,
      paymentDetails,
      products,
      totalAmount,
    });

    // Save the order to the database
    await order.save();
    for (const product of products) {
      const { title, quantity, image } = product;

      // Fetch the product from the brandproducts collection
      const existingProduct = await BrandProducts.findOne({ title });

      if (existingProduct) {
        // Update available quantity
        existingProduct.availableQuantity -= quantity;
        await existingProduct.save();
      }
    }

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
app.post('/search1/:e', async (req, res) => {
  try {
    const {e}=req.params
    console.log("Search query:", e);

    // Assuming you have a 'Product' model defined
    const products = await BrandProducts.find({ "title": { $regex: '.*' + e + '.*', $options: 'i' } });

    if (products.length > 0) {
      // Assuming you have a 'dog_products' template
      res.json(products)
      console.log(products)
    } 
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("An error occurred. Please try again later.");
  }
});






app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
