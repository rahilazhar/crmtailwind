const userModel = require('../Models/userModel')



const AssignRights = async (req, res) => {
  const userId = req.params.id;
  const { name, link, children } = req.body;

  try {
    // Find the user by ID
    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the parent right, if it exists
    const existingParentRight = user.Rights.find((right) => right.name === name);

    if (existingParentRight) {
      // The parent right already exists

      if (children && children.length > 0) {
        let childrenAdded = false;

        for (const child of children) {
          const existingChild = existingParentRight.children.find((c) => c.name === child.name);

          if (!existingChild) {
            // The child right does not exist, add it
            existingParentRight.children.push({ _id: child._id, name: child.name, link: child.link });
            childrenAdded = true;
          }
        }

        if (childrenAdded) {
          // Save the user with the updated Rights
          await user.save();
          return res.status(200).json({ message: 'Child rights added successfully', user });
        } else {
          return res.status(400).json({ message: 'Child rights already exist' });
        }
      } else {
        return res.status(400).json({ message: 'Parent right already exists' });
      }
    } else {
      // The parent right does not exist, create a new one
      const newRight = { name, link, children: [] };

      if (children && children.length > 0) {
        newRight.children = children.map((child) => ({ _id: child._id, name: child.name, link: child.link }));
      }

      // Add the new right to the user's Rights array
      user.Rights.push(newRight);

      // Save the user with the updated Rights
      await user.save();

      return res.status(201).json({ message: 'Right assigned successfully', user });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};



module.exports = AssignRights;





const GetrightsId = async (req, res) => {
  const userID = req.params.id; // Extract user ID from params

  try {
    // Find the user by ID
    const user = await userModel.findById(userID);

    // If user not found, send error response
    if (!user) {
      return res.status(404).send({ Message: "User Not Found" });
    }

    // Return the user's rights
    res.status(200).send({ Rights: user.Rights });

  } catch (error) {
    // Handle any errors that might occur
    res.status(500).send({ Message: "Error fetching rights", error: error.message });
  }
};




const unassignRights = async (req, res) => {
  const userID = req.params.id;
  const { name } = req.body;

  try {
    const user = await userModel.findById(userID);

    if (!user) {
      return res.status(404).send({ Message: "User Not Found" });
    }

    // Find the index of the right with the specified name
    const rightIndex = user.Rights.findIndex(
      (right) => right.name === name
    );

    if (rightIndex === -1) {
      return res.status(404).send({ Message: "Right Not Found" });
    }

    // Remove the right with the specified name from the Rights array
    user.Rights.splice(rightIndex, 1);

    await user.save();

    res.status(200).send({ Message: "Right Unassigned Successfully" });
  } catch (error) {
    res
      .status(500)
      .send({ Message: "Error unassigning right", error: error.message });
  }
}





module.exports = { AssignRights, GetrightsId, unassignRights }