const bcrypt = require('bcryptjs');
const User = require('../../models/user');


module.exports = {
    createUser: async (args) => {
        try{
            const existingUser = await User.findOne({email:  args.userInput.email});

            if (existingUser) {
                throw new Error('user exists  already.');
            }

            const hashedPassword = await bcrypt.hash(args.userInput.password, 12);

            const newUser = new User({
                email: args.userInput.email, 
                password: hashedPassword
            });

            const resultNewUser = await newUser.save();

            return { ...resultNewUser._doc,password: null, _id: resultNewUser.id}
        }catch(err) {
            throw err;
        };
    }
}