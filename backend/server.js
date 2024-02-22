// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv= require('dotenv');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3002;
const bcrypt=require('bcrypt')

const nodemailer = require('nodemailer');


const multer = require('multer');
const path=require('path')
const csv = require('csv-parser');
const fs = require('fs');

const morgan = require('morgan')
const helmet = require('helmet')

// Create a write stream (in append mode) for the log file
// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });

// Use morgan middleware with a custom stream for logging
//app.use(morgan('combined', { stream: accessLogStream }));



app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
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
    sold:{
      type:Number,

      require:true

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
      required:true
     
    },
   
   
  });
  const salpaymentSchema = new mongoose.Schema({
    userid: {
      type:String,
      required:true,
    },
    title:  {
      type:String,
      required:true,
    },
    service:  {
      type:String,
      required:true,
    },
    slot: {
      type:String,
      required:true,
    },
    addressValue: {
      type:String,
      required:true,
    },
    accountValue: {
      type:String,
      required:true,
    },
  });
  
  const salPayment = mongoose.model('salPayment', salpaymentSchema);
  
  // Routes
  app.post('/salon/payments', async (req, res) => {
    try {
      const { userid, title, service, slot, addressValue, accountValue } = req.body;
      console.log(req.body)
      const payment = new salPayment({ userid, title, service, slot, addressValue, accountValue });
      await payment.save();
      res.status(201).json({ message: 'Payment details stored successfully.' });
    } catch (error) {
      res.status(500).json({ error: 'Internal server error' });
    }
  });

  const Salon = mongoose.model('Salon', salonSchema);

  const storagesalon = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        const title = req.body.title || 'untitled';
        const address = req.body.address || 'noaddress'; 
        const ext = file.originalname.split('.').pop();
        const filename = `${title}_${address}.${ext}`;
        cb(null, filename);
    }
});
const storage= multer.diskStorage({
  destination: function (req, file, cb) {
      cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
      const title = req.body.title || 'untitled';
      const address = req.body.brand || 'nobc'; 
 
      const ext = file.originalname.split('.').pop();
 
      const filename = `${title}_${address}.${ext}`;
 
      cb(null, filename);
  }
});

const upload = multer({ storage: storage });
const uploadsalon = multer({ storage: storagesalon });

app.post('/uploadsalon', uploadsalon.single('image'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    console.log(req.body)
    const imageUrl = req.file.filename; 
    console.log(imageUrl)
    const newSalon = new Salon({
      title: req.body.title,
      description: req.body.description,
      location_category: req.body.location,
      phoneNumber: req.body.phoneNumber,
      address: req.body.address,
      image: req.file.filename, // Storing only the filename
    });
    newSalon.save();
    return res.status(200).json({ imageUrl: imageUrl });
  } catch (error) {
    console.error('Error during image upload:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/csvupload',upload.single('file'), (req, res) => {
  const file = req.file;
  console.log(file)

  fs.createReadStream(file.path)
    .pipe(csv())
    .on('data', async (row) => {
      try {
        console.log(row)
        await BrandProducts.create(row);
      } catch (error) {
        console.error('Error creating product:', error);
      }
    })
    .on('end', () => {
      res.send('Products added successfully');
    });
});





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
    
      expiryDate: Date,
    },
    products: [{
      title: String,
      brandcode:String,
      quantity: Number,
      price: Number,
      image: String
      // Add other product details if needed
    }],
    totalAmount: Number,
    dateCreated: { type: Date, default: Date.now } // Adding dateCreated field
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



  app.post('/productupload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      console.log(req.body)
      const imageUrl = req.file.filename; // Get the filename of the uploaded image
      console.log(imageUrl)
      const newProduct=new BrandProducts({
        title:req.body.title,
        description :req.body.description,
        pet_category:req.body.pet_category,
        product_category:req.body.product_category,
       
        available:req.body.quantity,
        price:req.body.price,
        image: req.file.filename,
        brandcode:req.body.brand,
        sold:0
         
      })
       newProduct.save();
      return res.status(200).json({ imageUrl: imageUrl });
    } catch (error) {
      console.error('Error during image upload:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  });


  app.delete('/api/products/:id', async (req, res) => {
    const title = req.params.id;
  
    try {
      // Assuming BrandProducts is your Mongoose model
      const deletedProduct = await BrandProducts.findOneAndDelete({_id:title});
  
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

  app.get('/api/services', async (req, res) => {
    try {
      const services = await salPayment.find();
      res.json(services);
     
    } catch (error) {
      console.error('Error fetching complaints:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  });

  app.get('/uploads/:filename', (req, res) => {
    console.log('hi')
    const { filename } = req.params;
    console.log(filename)

    const imagePath = path.join(__dirname, 'uploads', filename);
    console.log(imagePath)
    res.sendFile(imagePath);
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

//post complaints
app.post("/api/complaints", async (req, res) => {
  try {
    const { name, complaintsEmail, complaints } = req.body;
    const newComplaint = new Complaint({
      username: name,
      complaint: complaintsEmail,
      suggestions: complaints,
    });

    await newComplaint.save();

    res.status(201).json({ message: "Complaint submitted successfully" });
  } catch (error) {
    console.error("Error submitting complaint:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete complaints
app.delete('/api/complaints/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Complaint.findByIdAndDelete(id);
    res.status(200).json({ message: 'Complaint deleted successfully' });
  } catch (error) {
    console.error('Error deleting complaint:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
//send mail
app.post('/api/sendMail', async (req, res) => {
  const { username, complaint } = req.body;

  // Create a Nodemailer transporter using SMTP
  const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com', // SMTP host
    port: 587, // SMTP port
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'programmingsoul01@gmail.com', // Your SMTP username
      pass: '1CD368DF04529D0AE576788ABD7B3F78E10D', // Your SMTP password
    },
  });

  //468117
  // Email message options
  const mailOptions = {
    from: 'programmingsoul01@gmail.com', // Sender address
    to: 'sathwikpendem23@gmail.com', // Receiver address
    subject: 'complaint solved', // Subject line
    text: `dear ${username} you're ${complaint} is resolved`, // Plain text body
  };

  try {
    // Send email
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.sendStatus(200); // Send success response to the client
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' }); // Send error response to the client
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
    const { product } = req.body;

    let wishlist = await Wishlist.findOne({ userId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
    }

    // Check if the product already exists in the wishlist by title
    const isProductExists = wishlist.products.some(p => p.title === product.title);
    if (!isProductExists) {
      wishlist.products.push(product);
      await wishlist.save();
      res.json(wishlist);
    } else {
      res.status(400).json({ error: 'Product already exists in wishlist' });
    }
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
    const { product } = req.body;

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      cart = new Cart({ userId, products: [] });
    }

    // Check if the product already exists in the cart
    const existingProductIndex = cart.products.some((item) => item.title === product.title);
    

    if (!existingProductIndex) {
      // If the product does not exist, add it to the cart
      cart.products.push(product);
      await cart.save();
      res.json(cart);
    } else {
      // If the product already exists, send a message indicating that
      res.status(400).json({ message: 'Product already exists in Cart' });
    }
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
    console.log('hi')
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
        existingProduct.available -= quantity;
        existingProduct.sold+=quantity;
        await existingProduct.save();
      }
    }

    res.status(201).json({ message: 'Order placed successfully' });
  } catch (error) {
    console.error('Error placing order:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/orders', async (req, res) => {
  try {
    const { title } = req.query;
    console.log(title)
    const orders = await Order.find({ 'products.title': title });
    res.json(orders);
  } catch (error) {
    console.error('Error fetching orders:', error);
    res.status(500).send('Internal Server Error');
  }
});
app.get('/api/order', async (req, res) => {
  try {
    const { bc } = req.query;
    
    
      // Find orders that contain products with the given brand code
      const orders = await Order.find({ 'products.brandcode': bc });

      // Filter products with the given brand code for each order
      const ordersWithFilteredProducts = orders.map(order => {
          const productsWithBrandCode = order.products.filter(product => product.brandcode === bc);
          return {
              orderId: order._id,
              userId: order.userId,
              paymentDetails: order.paymentDetails,
              products: productsWithBrandCode,
              totalAmount: order.totalAmount,
              dateCreated: order.dateCreated
          };
      });

      res.json(ordersWithFilteredProducts);
  } catch (error) {
      console.error('Error retrieving orders:', error);
      res.status(500).json({ error: 'An error occurred while retrieving orders' });
  }
    
  
});


app.post('/users/names', async (req, res) => {
  try {
    const { userIds } = req.body;
    const users = await User.find({ _id: { $in: userIds } });
    const userNames = {};
    users.forEach(user => {
      userNames[user._id] = user.name;
    });
    res.json(userNames);
  } catch (error) {
    console.error('Error fetching user names:', error);
    res.status(500).send('Internal Server Error');
  }
});
// Assuming you have a route setup for handling search requests
app.post('/search1', (req, res) => {
  const query = req.body.payload;
  // Your logic to search for products based on the query
  // For example, searching in a database
  BrandProducts.find({ title: { $regex: query, $options: 'i' } })
    .then(products => {
      res.json(products);
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({ error: 'Internal Server Error' });
    });
});


// admin users fetch
app.get('/fetchusers',async(req,res)=>{
  try{
    const users = await User.find();
    res.json(users);
  }catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// admin users delete
app.delete('/delete/users/:username', async (req, res) => {
  const username = req.params.username;

  try {
   
    const deletedUser= await User.findOneAndDelete({username:username});

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// admin brands fetch
app.get('/fetchbrands',async(req,res)=>{
  try{
    const brands = await Brand.find();
    res.json(brands);
  }catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

// admin brands delete
app.delete('/delete/brands/:brandname', async (req, res) => {
  const brandname = req.params.brandname;

  try {
   
    const deletedBrand= await Brand.findOneAndDelete({brandname:brandname});

    if (!deletedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    res.status(200).json({ message: 'Brand deleted successfully', deletedBrand });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// functiom for brand Insights
app.get('/fetchbrandinsights', async (req, res) => {
  try {
    const brandProducts = await BrandProducts.find().exec();

    const brandTotalItems = {};

    brandProducts.forEach((product) => {
      const { brandcode, available } = product;

      if (!brandTotalItems[brandcode]) {
        brandTotalItems[brandcode] = 0;
      }

      brandTotalItems[brandcode] += available;
    });

    const brands = await Brand.find().exec();

    brands.forEach((brand) => {
      const { brandcode } = brand;

      if (brandTotalItems[brandcode]) {
        brand.totalItems = brandTotalItems[brandcode];
      } else {
        brand.totalItems = 0;
      }
    });

    console.log(brandTotalItems);
    res.json(brandTotalItems);
  } catch (error) {
    console.error('Error fetching data about brands:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/fetchproducts/:brandname', async (req, res) => {
  const brandname = req.params.brandname;
  console.log(brandname)
  try {
    // Replace with your database query to fetch products for the given brand
    const products = await BrandProducts.find({brandcode:brandname});
   
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/fetchusersinsights',async (req,res) => {
  try {
    const usertotalprices = {};
    const cursor = await Order.find({}).sort({ userId: 1, totalAmount: -1 }).cursor();
    let result = [];
    let currentUserId = null;
    let currentUserTotal = 0;

    await cursor.eachAsync(doc => {
      if (doc.userId !== currentUserId) {
        if (currentUserId !== null) {
          result.push({ userId: currentUserId, totalPrices: currentUserTotal });
        }
        currentUserId = doc.userId;
        currentUserTotal = doc.totalAmount;
      } else {
        currentUserTotal += doc.totalAmount;
      }
    });

    // Push the last user
    if (currentUserId !== null) {
      result.push({ userId: currentUserId, totalPrices: currentUserTotal });
    }

    // Sort the result array by totalPrices in descending order
    result.sort((a, b) => b.totalPrices - a.totalPrices);

    // Get the top 10
    const top10 = result.slice(0, 10);
    top10.forEach((top)=>{
      const user = top.userId;
      usertotalprices[user] = top.totalPrices;
    })

    res.json(usertotalprices)
    console.log(usertotalprices)

  } catch (error) {
    console.error('Error:', error);
  }
}
)

//count
//users

app.get('/api/user/total', async (req, res) => {
  try {
    const totalusers = await User.countDocuments();
    res.json({totalusers})
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//sellers
app.get('/api/sellerss/total', async (req, res) => {
  try {
      const totalsellers = await Brand.countDocuments();
      res.json({ totalsellers });
  } catch (error) {
      console.error('Error fetching total users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
//products
app.get('/api/productss/total', async (req, res) => {
  try {
      const totalproducts = await BrandProducts.countDocuments();
      res.json({ totalproducts });
     
  } catch (error) {
      console.error('Error fetching total users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
//complaints
app.get('/api/complaintss/total', async (req, res) => {
  try {
      const totalcomplaints = await Complaint.countDocuments();
      res.json({ totalcomplaints });
  } catch (error) {
      console.error('Error fetching total users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
//salons
app.get('/api/salonss/total', async (req, res) => {
  try {
      const totalsalons = await Salon.countDocuments();
      res.json({ totalsalons });
  } catch (error) {
      console.error('Error fetching total users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});











app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
