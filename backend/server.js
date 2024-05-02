// backend/server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv= require('dotenv');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3002;

const router = express.Router();
const nodemailer = require('nodemailer');
const swaggerJSDoc = require('swagger-jsdoc') 
const swaggerUi = require('swagger-ui-express') 
const redis = require('redis');



const options={
	definition:{
		openapi:'3.0.0',
		info:{
			title:'Petverse',
			version: '1.0.0'
		},
		servers:[{

			url: 'http://localhost:3002/'
		}

		]
	},
	apis:['./server.js']
}

const rclient = redis.createClient({
  password: 'qBYOhGydQCyB4xj6xD22i6hOJub6jeht',
  socket: {
      host: 'redis-14720.c241.us-east-1-4.ec2.redns.redis-cloud.com',
      port: 14720
  }
});


// Call Redis connection immediately
rclient.connect();



// Error handling for Redis client
rclient.on('error', (err) => {
  console.error('Redis client error:', err);
});

// Check Redis connection
rclient.on('connect', () => {
  console.log('Connected to Redis server');
});


// Middleware to cache user data from MongoDB to Redis

const swaggerspec = swaggerJSDoc(options)
app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerspec))

//multer
const multer = require('multer');
const path=require('path')
const csv = require('csv-parser');
const fs = require('fs');
//morgan
const morgan = require('morgan')
//helmet
const helmet = require('helmet')


// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });


// app.use(morgan('combined', { stream: accessLogStream }));


//cors
app.use(cors());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
//express.json
app.use(express.json());
dotenv.config({
    path:'./config.env'
    })

mongoose.connect(process.env.MONGO_URL).then(()=>{
    console.log('DB connected sucessfully....')
    })
    const con=mongoose.connection;


const complaintSchema = new mongoose.Schema({
    username: { type: String, required: true },
    complaint: { type: String },
    suggestions: { type: String },
  });

const Complaint = mongoose.model('Complaint', complaintSchema);

const brandSchema = new mongoose.Schema({
  brandname: {
      type: String,
      required: true
  },
  phoneNumber: {
      type: String,
      unique: true,
      required: true,
  },
  email: {
      type: String,
      unique: true,
      required: true,
  },
  brandcode: {
      type: String,
      unique: true,
      required: true,
      index: true, // Indexing brandcode field
  },
  password: {
      type: String,
      required: true,
  } 
});

// Indexing brandname field
brandSchema.index({ brandname: 1 });

const Brand = mongoose.model('Brand', brandSchema);

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
      required: true,
      index:true
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
// Indexing brandname field
  brandproductSchema.index({ brandname: 1 });
  brandproductSchema.index({ product_category: 1, title: 1 });

  const BrandProducts = mongoose.model('BrandProducts', brandproductSchema);

  BrandProducts.collection.getIndexes(function(err, indexes) {
    if (err) {
        console.error(err);
    } else {
        console.log(indexes);
    }
});
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
    dateCreated: { type: Date, default: Date.now }
  });
  
  const salPayment = mongoose.model('salPayment', salpaymentSchema);
  const Salon = mongoose.model('Salon', salonSchema);

  const userSchema = new mongoose.Schema({
    fullname: String,
    phoneNumber: {
      type: String,
      unique: true,
      required:true,
      index:true
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
  userSchema.index({ username: 1, phoneNumber: 1 });
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
    
    }],
    totalAmount: {
      type:Number,
      index:true},
    dateCreated: { type: Date, default: Date.now } 
});

orderSchema.index({ totalAmount: 1 });
  
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

  /**
 * @swagger
 * /api/user/register:
 *   post:
 *     summary: Register a new user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *               phone:
 *                 type: string
 *               email:
 *                 type: string
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '201':
 *         description: User registered successfully
 *       '400':
 *         description: Username already exists
 *       '500':
 *         description: Internal server error
 */

  app.post('/api/user/register',async (req,res)=>{
    try{
   console.log(req.body);
   const user=req.body.username;
   const existingUser = await User.findOne({ user });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    
    if (svalidateform(req.body.phone, req.body.email, req.body.password)) {
      const newUser=new User({
        fullname: req.body.fullname,
      phoneNumber: req.body.phone,
      email: req.body.email,
     username: req.body.username,
      password: req.body.password
    })
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully'});}}
     catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
    
   
   });


   /**
 * @swagger
 * /api/register:
 *   post:
 *     summary: Register a new seller
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullname:
 *                 type: string
 *                 description: The full name of the seller
 *               phone:
 *                 type: string
 *                 description: The phone number of the seller
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the seller
 *               username:
 *                 type: string
 *                 description: The username of the seller
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the seller
 *     responses:
 *       201:
 *         description: Seller registered successfully
 *       400:
 *         description: Username already exists
 *       500:
 *         description: Internal server error
 */
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
    
    
    if (svalidateform(req.body.phone, req.body.email, req.body.password)) {
    const newSeller=new Brand({
        brandname: req.body.fullname,
      phoneNumber: req.body.phone,
      email: req.body.email,
     brandcode: req.body.username,
      password: req.body.password
    })
    await newSeller.save();
    
  
    res.status(201).json({ message: 'Seller registered successfully'});;}}
     catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  /**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: Login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Login successful
 *       '401':
 *         description: Invalid username or password
 *       '500':
 *         description: Internal server error
 */

  app.post('/api/user/login', async (req, res) => {
    console.log(req.body);
   const password=req.body.password
   const username=req.body.username
   console.log('Provided username:', username);
   const userfo = await User.findOne({ username: username.trim()});
   console.log('Found user:', userfo);
   
    try {
    
      const userfound = await User.findOne({ username: username.trim()});
     console.log(userfound)
      if (userfound) {
       
        console.log(userfound.password)
        if(password==userfound.password){
          return res.status(200).json({ message: 'Login successful' });}
        else {
        
          return res.status(401).json({ message: 'Invalid username or password' });
        }
      } else {
       
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });


/**
 * @swagger
 * /api/login:
 *   post:
 *     summary: Authenticate seller
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the seller
 *               password:
 *                 type: string
 *                 format: password
 *                 description: The password for the seller
 *     responses:
 *       200:
 *         description: Login successful
 *       401:
 *         description: Invalid username or password
 *       500:
 *         description: Internal server error
 */



  app.post('/api/login', async (req, res) => {
    console.log(req.body);
   const password=req.body.password
   const brandcode=req.body.username
   console.log('Provided username:', brandcode);
   const seller = await Brand.findOne({ brandcode: brandcode.trim()});
   console.log('Found seller:', seller);
   
    try {
     
      const seller = await Brand.findOne({ brandcode: brandcode.trim()});
     console.log(seller)
      if (seller) {
        
        console.log(seller.password)
        
        if (password==seller.password) {
         
          return res.status(200).json({ message: 'Login successful' });
        } else {
         
          return res.status(401).json({ message: 'Invalid username or password' });
        }
      } else {
       
        return res.status(401).json({ message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Error during login:', error);
      return res.status(500).json({ message: 'Internal Server Error' });
    }
  });


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



/**
 * @swagger
 * /productupload:
 *   post:
 *     summary: Upload product image and details
 *     consumes:
 *       - multipart/form-data
 *     parameters:
 *       - in: formData
 *         name: image
 *         type: file
 *         description: The image file to upload
 *       - in: formData
 *         name: title
 *         type: string
 *         description: Title of the product
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the product
 *       - in: formData
 *         name: pet_category
 *         type: string
 *         description: Category of the pet
 *       - in: formData
 *         name: product_category
 *         type: string
 *         description: Category of the product
 *       - in: formData
 *         name: quantity
 *         type: integer
 *         description: Quantity of the product available
 *       - in: formData
 *         name: price
 *         type: number
 *         description: Price of the product
 *       - in: formData
 *         name: brand
 *         type: string
 *         description: Brand code of the seller
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Internal server error
 */
  app.post('/productupload', upload.single('image'), (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      console.log(req.body)
      const imageUrl = req.file.filename;
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

  /**
 * @swagger
 * /delete/users/{username}:
 *   delete:
 *     summary: Delete user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 * 
 * 
 */
// admin users delete
app.delete('/delete/users/:username', async (req, res) => {
  const username = req.params.username;

  try {
    const deletedUser = await User.findOneAndDelete({ username });

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete the corresponding cache entry
    const cacheKey = `user-data-${username}`;
    await rclient.del(cacheKey);

    res.status(200).json({ message: 'User deleted successfully', deletedUser });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

app.get('/api/user/total', async (req, res) => {
  try {
    const totalusers = await User.countDocuments();
    res.json({ totalusers })
  } catch (error) {
    console.error('Error fetching total users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// admin users fetch
app.get('/fetchusers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
})

  app.delete('/api/products/:id', async (req, res) => {
    const title = req.params.id;
  
    try {
     
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
  /**
 * @swagger
 * /api/salon/delete:
 *   delete:
 *     summary: Delete a salon by title
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salon deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                 deletedProduct:
 *                   type: object
 *       404:
 *         description: Salon not found
 *       500:
 *         description: Internal server error
 */
  app.delete('/api/salon/delete', async (req, res) => {
    const {title} = req.query;
  
    try {
     
      const deletedProduct = await Salon.findOneAndDelete({title:title});
  
      if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      res.status(200).json({ message: 'Product deleted successfully', deletedProduct });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  // admin brands delete
app.delete('/delete/brands/:brandname', async (req, res) => {
  const brandname = req.params.brandname;

  try {
    const deletedBrand = await Brand.findOneAndDelete({ brandname });

    if (!deletedBrand) {
      return res.status(404).json({ message: 'Brand not found' });
    }

    // Delete the corresponding cache entry
    const cacheKey = `seller-data-${deletedBrand.brandcode}`;
    await rclient.del(cacheKey);

    res.status(200).json({ message: 'Brand deleted successfully', deletedBrand });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

  /**
 * @swagger
 * /edit/{title}:
 *   post:
 *     summary: Edit product details
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: Title of the product to edit
 *         schema:
 *           type: string
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the product
 *       - in: formData
 *         name: pet_category
 *         type: string
 *         description: Category of the pet
 *       - in: formData
 *         name: product_category
 *         type: string
 *         description: Category of the product
 *       - in: formData
 *         name: quantity
 *         type: integer
 *         description: Quantity of the product available
 *       - in: formData
 *         name: price
 *         type: number
 *         description: Price of the product
 *       - in: formData
 *         name: image
 *         type: string
 *         description: Image URL of the product
 *       - in: formData
 *         name: brand
 *         type: string
 *         description: Brand code of the product
 *     responses:
 *       201:
 *         description: Product edited successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

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
        { new: true } 
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


  /**
 * @swagger
 * /salon/edit/{title}:
 *   post:
 *     summary: Edit salon details
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: Title of the salon to edit
 *         schema:
 *           type: string
 *       - in: formData
 *         name: description
 *         type: string
 *         description: Description of the salon
 *       - in: formData
 *         name: location
 *         type: string
 *         description: Location category of the salon
 *       - in: formData
 *         name: phoneNumber
 *         type: string
 *         description: Phone number of the salon
 *       - in: formData
 *         name: address
 *         type: string
 *         description: Address of the salon
 *       - in: formData
 *         name: image
 *         type: string
 *         description: Image URL of the salon
 *     responses:
 *       201:
 *         description: Salon edited successfully
 *       404:
 *         description: Salon not found
 *       500:
 *         description: Internal server error
 */
   app.post('/salon/edit/:title', async (req, res) => {
    const title = req.params.title;
    console.log(title);
    console.log(req.body.description);
  
    try {
      const updatedProduct = await Salon.findOneAndUpdate(
        { title: title },
        {
          title: req.body.title,
          description: req.body.description,
          location_category: req.body.location,
          phoneNumber: req.body.phoneNumber,
          address: req.body.address,
          image: req.file.filename, 
        },
        { new: true } 
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
  

//router-level middleware

/**
 * @swagger
 * /api/products/{brandcode}:
 *   get:
 *     summary: Get products by brand code
 *     parameters:
 *       - in: path
 *         name: brandcode
 *         required: true
 *         description: Brand code of the products to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       500:
 *         description: Internal server error
 */
  router.get('/api/products/:brandcode', async (req, res) => {
    try {
      const products = await BrandProducts.find({ brandcode: req.params.brandcode });
      console.log(products)
      res.json(products);
    } catch (error) {
      console.error(`Error fetching products for ${req.params.brandcode}:`, error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
 /**
 * @swagger
 * /api/seller/{brandcode}:
 *   get:
 *     summary: Get seller details by brand code
 *     parameters:
 *       - in: path
 *         name: brandcode
 *         required: true
 *         description: Brand code of the seller to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Seller details fetched successfully
 *       404:
 *         description: Seller not found
 *       500:
 *         description: Internal server error
 */
 // Route to fetch seller data with caching
app.get('/api/seller/:brandcode', async (req, res) => {
  try {
    const { brandcode } = req.params;
    const cacheKey = `seller-data-${brandcode}`;
    let sellerData = await rclient.get(cacheKey);

    if (!sellerData) {
      sellerData = await Brand.findOne({ brandcode });

      if (!sellerData) {
        return res.status(404).json({ message: 'Seller not found' });
      }

      // Cache the seller data
      await rclient.set(cacheKey, JSON.stringify(sellerData));
      console.log(`Seller data for brandcode ${brandcode} set into Redis cache`);
    } else {
      console.log(`Seller data for brandcode ${brandcode} retrieved from Redis cache`);
      sellerData = JSON.parse(sellerData);
    }

    const sellerDetails = {
      brandname: sellerData.brandname,
      phoneNumber: sellerData.phoneNumber,
      email: sellerData.email,
      brandcode: sellerData.brandcode,
    };

    res.json(sellerDetails);
  } catch (error) {
    console.error('Error retrieving seller data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
/**
 * @swagger
 * /products:
 *   get:
 *     summary: Get products based on filters
 *     parameters:
 *       - in: query
 *         name: specie
 *         type: string
 *         description: Specie of the products (e.g., dog, cat)
 *       - in: query
 *         name: brand
 *         type: string
 *         description: Brand code of the products
 *       - in: query
 *         name: price
 *         type: string
 *         description: Maximum price of the products
 *       - in: query
 *         name: category
 *         type: string
 *         description: Category of the products
 *     responses:
 *       200:
 *         description: Products fetched successfully
 *       500:
 *         description: Internal server error
 */

  router.get('/products', async (req, res) => {
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


  /**
 * @swagger
 * /salon/{location}:
 *   get:
 *     summary: Get salons by location
 *     parameters:
 *       - in: path
 *         name: location
 *         required: true
 *         description: Location of the salons to fetch
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salons fetched successfully
 *       500:
 *         description: Internal server error
 */
  router.get('/salon/:location', async (req, res) => {
    
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


  /**
 * @swagger
 * /salon:
 *   get:
 *     summary: Get all salons
 *     responses:
 *       200:
 *         description: Salons fetched successfully
 *       500:
 *         description: Internal server error
 */
  router.get('/salon', async (req, res) => {
    
  try {
     
  
      const salons = await Salon.find();
    
      
  
      res.json(salons);
    } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  app.use('/',router)
  /**
 * @swagger
 * /api/services:
 *   get:
 *     summary: Get all services
 *     responses:
 *       200:
 *         description: List of services retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userid:
 *                     type: string
 *                   title:
 *                     type: string
 *                   service:
 *                     type: string
 *                   slot:
 *                     type: string
 *                   addressValue:
 *                     type: string
 *                   accountValue:
 *                     type: string
 *                   dateCreated:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
  app.get('/api/services', async (req, res) => {
    try {
      const services = await salPayment.find();
      res.json(services);
     
    } catch (error) {
      console.error('Error fetching complaints:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  });
  /**
 * @swagger
 * /api/booking:
 *   get:
 *     summary: Get bookings by title
 *     parameters:
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userid:
 *                     type: string
 *                   title:
 *                     type: string
 *                   service:
 *                     type: string
 *                   slot:
 *                     type: string
 *                   addressValue:
 *                     type: string
 *                   accountValue:
 *                     type: string
 *                   dateCreated:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
  app.get('/api/booking', async (req, res) => {
    try {
      console.log('hi')
      const {title}=req.query;
      const services = await salPayment.find({title:title});
      res.json(services);
     
    } catch (error) {
      console.error('Error fetching complaints:', error);
      res.status(500).json({ error: 'Internal Server Error', message: error.message });
    }
  });


  /**
 * @swagger
 * /uploadsalon:
 *   post:
 *     summary: Upload salon image and details
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               location:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               address:
 *                 type: string
 *               image:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Image uploaded successfully
 *       400:
 *         description: No file uploaded
 *       500:
 *         description: Internal server error
 */
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
      image: req.file.filename, 
    });
    newSalon.save();
    return res.status(200).json({ imageUrl: imageUrl });
  } catch (error) {
    console.error('Error during image upload:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});


   /**
 * @swagger
 * /salon/payments:
 *   post:
 *     summary: Store salon payment details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *               title:
 *                 type: string
 *               service:
 *                 type: string
 *               slot:
 *                 type: string
 *               addressValue:
 *                 type: string
 *               accountValue:
 *                 type: string
 *     responses:
 *       201:
 *         description: Payment details stored successfully
 *       500:
 *         description: Internal server error
 */
 
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

  /**
 * @swagger
 * /api/service:
 *   get:
 *     summary: Get services by username
 *     parameters:
 *       - in: query
 *         name: username
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of services retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   userid:
 *                     type: string
 *                   title:
 *                     type: string
 *                   service:
 *                     type: string
 *                   slot:
 *                     type: string
 *                   addressValue:
 *                     type: string
 *                   accountValue:
 *                     type: string
 *                   dateCreated:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
  app.get('/api/service', async (req, res) => {
    try {
      console.log('hi')
      const {username}=req.query;
      console.log(username)
      const services = await salPayment.find({userid:username});
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


  /**
 * @swagger
 * /api/product/{title}/edit:
 *   get:
 *     summary: Get product details for editing
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: Title of the product to edit
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details fetched successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal server error
 */

  app.get('/api/product/:title/edit', (req, res) => {
    console.log('hi')
    BrandProducts.findOne({title:req.params.title})
      .then(product => {
        console.log(product)
       res.json(product)
      })
      .catch(err => console.log(err));
  });
  
  /**
 * @swagger
 * /api/complaints:
 *   get:
 *     summary: Get all complaints
 *     responses:
 *       200:
 *         description: List of complaints retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   username:
 *                     type: string
 *                   complaint:
 *                     type: string
 *                   suggestions:
 *                     type: string
 *       500:
 *         description: Internal server error
 */
app.get('/api/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();
    res.json(complaints);
   
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});

/**
 * @swagger
 * /api/orders:
 *   get:
 *     summary: Get all orders
 *     responses:
 *       200:
 *         description: List of orders fetched successfully
 *       500:
 *         description: Internal server error
 */

app.get('/api/orders', async (req, res) => {
  try {
    const complaints = await Order.find();
    res.json(complaints);
   
  } catch (error) {
    console.error('Error fetching complaints:', error);
    res.status(500).json({ error: 'Internal Server Error', message: error.message });
  }
});
/**
 * @swagger
 * /api/complaints:
 *   post:
 *     summary: Submit a complaint
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               complaintsEmail:
 *                 type: string
 *               complaints:
 *                 type: string
 *     responses:
 *       201:
 *         description: Complaint submitted successfully
 *       500:
 *         description: Internal server error
 */

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

/**
 * @swagger
 * /api/complaints/{id}:
 *   delete:
 *     summary: Delete a complaint by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Complaint deleted successfully
 *       500:
 *         description: Internal server error
 */
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

/**
 * @swagger
 * /api/sendMail:
 *   post:
 *     summary: Send email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               complaint:
 *                 type: string
 *     responses:
 *       200:
 *         description: Email sent successfully
 *       500:
 *         description: Failed to send email
 */


app.post('/api/sendMail', async (req, res) => {
  const { username, complaint } = req.body;

 
  const transporter = nodemailer.createTransport({
    host: 'smtp.elasticemail.com', 
    port: 587,
    secure: false, 
    auth: {
      user: 'programmingsoul01@gmail.com',
      pass: '1CD368DF04529D0AE576788ABD7B3F78E10D',
    },
  });

  
  const mailOptions = {
    from: 'programmingsoul01@gmail.com', 
    to: 'sathwikpendem23@gmail.com',
    subject: 'complaint solved',
    text: `dear ${username} you're ${complaint} is resolved`, 
  };

  try {
    
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    res.sendStatus(200); 
  } catch (error) {
    console.error('Error sending email:', error);
    res.status(500).json({ error: 'Failed to send email' }); 
  }
});
/**
 * @swagger
 * /api/users/{username}:
 *   get:
 *     summary: Get user by username
 *     parameters:
 *       - in: path
 *         name: username
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: User found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/User'
 *       '404':
 *         description: User not found
 *       '500':
 *         description: Internal server error
 */
// Middleware to cache user data from MongoDB to Redis
const cacheMiddleware = async (req, res, next) => {
  try {
    const { username } = req.params;
    const cacheKey = `user-data-${username}`;
    let userData = await rclient.get(cacheKey);

    if (!userData) {
      userData = await User.findOne({ username: username });
      rclient.set(cacheKey, JSON.stringify(userData));
      console.log(`User data for ${username} set into Redis cache`);
    } else {
      console.log(`User data for ${username} retrieved from Redis cache`);
      userData = JSON.parse(userData);
    }

    res.status(200).json(userData);
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

// // // Route to fetch user data
app.get('/api/users/:username', cacheMiddleware);
/**
 * @swagger
 * /api/wishlist/{userId}:
 *   get:
 *     summary: Get user's wishlist
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's wishlist retrieved successfully
 *       500:
 *         description: Internal Server Error
 *
 *   post:
 *     summary: Add product to user's wishlist
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: object
 *     responses:
 *       200:
 *         description: Product added to wishlist successfully
 *       400:
 *         description: Product already exists in wishlist
 *       500:
 *         description: Internal Server Error
 *
 * /api/wishlist/{userId}/{title}:
 *   delete:
 *     summary: Remove product from user's wishlist
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: title
 *         required: true
 *         description: The title of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from wishlist successfully
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/cart/{userId}:
 *   get:
 *     summary: Get user's cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User's cart retrieved successfully
 *       500:
 *         description: Internal Server Error
 *
 *   post:
 *     summary: Add product to user's cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               product:
 *                 type: object
 *     responses:
 *       200:
 *         description: Product added to cart successfully
 *       400:
 *         description: Product already exists in cart
 *       500:
 *         description: Internal Server Error
 *
 * /api/cart/{userId}/{title}:
 *   delete:
 *     summary: Remove product from user's cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: title
 *         required: true
 *         description: The title of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product removed from cart successfully
 *       500:
 *         description: Internal Server Error
 *
 *   put:
 *     summary: Update product quantity in user's cart
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: The ID of the user
 *         schema:
 *           type: string
 *       - in: path
 *         name: producttitle
 *         required: true
 *         description: The title of the product
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               quantity:
 *                 type: number
 *     responses:
 *       200:
 *         description: Product quantity updated successfully
 *       404:
 *         description: Product not found in the cart
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /products/{producttitle}:
 *   get:
 *     summary: Get product details by title
 *     parameters:
 *       - in: path
 *         name: producttitle
 *         required: true
 *         description: The title of the product
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Product details retrieved successfully
 *       404:
 *         description: Product not found
 *       500:
 *         description: Internal Server Error
 */
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

    const existingProductIndex = cart.products.some((item) => item.title === product.title);
    

    if (!existingProductIndex) {
  
      cart.products.push(product);
      await cart.save();
      res.json(cart);
    } else {
   
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

    const productIndex = cart.products.findIndex((item) => item.title === producttitle);

    if (productIndex === -1) {
      return res.status(404).json({ error: 'Product not found in the cart' });
    }

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

/**
 * @swagger
 * /salons/{title}:
 *   get:
 *     summary: Get a salon by title
 *     parameters:
 *       - in: path
 *         name: title
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Salon details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 location_category:
 *                   type: string
 *                 address:
 *                   type: string
 *                 phoneNumber:
 *                   type: string
 *                 image:
 *                   type: string
 *       404:
 *         description: Salon not found
 *       500:
 *         description: Internal server error
 */
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
/**
 * @swagger
 * /api/add-review:
 *   post:
 *     summary: Add a review
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               productTitle:
 *                 type: string
 *               reviewText:
 *                 type: string
 *               star:
 *                 type: number
 *     responses:
 *       201:
 *         description: Review added successfully
 *       500:
 *         description: Internal server error
 */

app.post('/api/add-review', async (req, res) => {
  try {
    const { userName, productTitle, reviewText,star } = req.body;

    const newReview = new Review({
      userName,
      productTitle,
      reviewText,
      star
    });

    await newReview.save();

    res.status(201).json({ message: 'Review added successfully' });
  } catch (error) {
    console.error('Error adding review:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});

/**
 * @swagger
 * /api/complaintss/total:
 *   get:
 *     summary: Get the total number of complaints
 *     responses:
 *       200:
 *         description: Total number of complaints retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalcomplaints:
 *                   type: number
 *       500:
 *         description: Internal server error
 */
app.get('/api/complaintss/total', async (req, res) => {
  try {
      const totalcomplaints = await Complaint.countDocuments();
      res.json({ totalcomplaints });
  } catch (error) {
      console.error('Error fetching total users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
/**
 * @swagger
 * /api/salonss/total:
 *   get:
 *     summary: Get the total number of salons
 *     responses:
 *       200:
 *         description: Total number of salons retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 totalsalons:
 *                   type: number
 *       500:
 *         description: Internal server error
 */
app.get('/api/salonss/total', async (req, res) => {
  try {
      const totalsalons = await Salon.countDocuments();
      res.json({ totalsalons });
  } catch (error) {
      console.error('Error fetching total users:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/api/search', async (req, res) => {
  const { payload } = req.body;
  try {
    // Using regex to perform case-insensitive search
    const results = await BrandProducts.find({ title: { $regex: new RegExp('^' + payload + '.*', 'i') } });
    res.json(results);
  } catch (error) {
    console.error('Error searching products:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.get('/api/search', async (req, res) => {
  const { query } = req.query;
  const payload = query; // Create regex pattern

  try {
    const results = await BrandProducts.find({ title: { $regex: new RegExp('^' + payload + '.*', 'i') } });
    res.json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
