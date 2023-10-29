const Userschema = require('../Models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const  Userrights = require('../Models/UserRights')

// Register Route
const Registeruser = async (req, res) => {
    const { name, email, password, role, Rights } = req.body

    if (!name || !email || !password) {
        return res.status(400).send({ Message: "Fill All the Fields" })
    }

    const checkemail = await Userschema.findOne({ email })

    if (checkemail) {
        return res.status(400).send({ Message: "Email Already Exist" })
    }

    const hashed = await bcrypt.hash(password, 10)

    const newuser = new Userschema({ name, email, password: hashed, role })

    const result = newuser.save()

    if (result) {
        return res.status(200).send({ Message: "User Registered Successfully" })
    } else {
        return res.status(400).send({ Message: "User Failed to Registered" })
    }
}


// Login Route
const Login = async (req, res) => {
    const { email, password } = req.body

    const checkemail = await Userschema.findOne({ email })

    if (!checkemail) {
        return res.status(400).send({ Message: "Invalid Email" })
    }

    const token = jwt.sign({ _id: checkemail._id, role: checkemail.role }, process.env.JWT_KEY, { expiresIn: "7d" })

    const compare = await bcrypt.compare(password, checkemail.password)

    if (compare) {
        return res.status(200).send({ Message: "Login Successfull", email, role: checkemail.role, id: checkemail._id, name: checkemail.name, token })
    } else {
        return res.status(400).send({ Message: "Wrong Credentials" })
    }

}


const Rightsuser = async (req, res) => {
    try {
      // Create an instance of the Userrights model with data from the request body
      const newUserRights = new Userrights({
        name: req.body.name,
        link: req.body.link,
        children: req.body.children
      });
  
      // Save the new user rights data to the database
      const savedUserRights = await newUserRights.save();
  
      res.status(201).json(savedUserRights); // Return the saved data as a JSON response
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    }
  };
  

  const GetallRights = async(req , res) =>{
    try {
        // Fetch all user rights data from MongoDB
        const userRightsData = await Userrights.find();
    
        res.status(200).json(userRightsData); // Return the data as a JSON response
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
  }





module.exports = { Registeruser, Login, Rightsuser , GetallRights }