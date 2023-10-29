const staffschema = require('../Models/Staffschema')


const Addstaff = async (req, res) => {
    try {
        const { name, email, password, mobile, role, address, birthday, emergency, CNIC, bloodgroup, otherinformation, active } = req.body;

        if (!name || !email || !password || !mobile || !role || !address || !emergency || !CNIC) {
            return res.status(400).send({ message: "All fields are required" });
        }

        const checkEmail = await staffschema.findOne({ email });
        if (checkEmail) {
            return res.status(400).send({ Message: "Email Already Exist" });
        }

        const checkMobile = await staffschema.findOne({ mobile });
        if (checkMobile) {
            return res.status(400).send({ Message: "Mobile Number Already Exist" });
        }

        const data = new staffschema({
            name,
            email,
            password,
            mobile,
            role,
            address,
            birthday,
            emergency,
            CNIC,
            bloodgroup,
            otherinformation,
            active,
            profilePicture: req.file ? req.file.path : ''
        });

        const result = await data.save();
        if (result) {
            return res.send({ Message: "Staff Save Successfully" });
        } else {
            return res.status(500).send({ Message: "Error in Connection" });
        }
    } catch (error) {
        console.error("Error:", error);
        return res.status(500).send({ Message: "Internal Server Error" });
    }
};




module.exports = {Addstaff}