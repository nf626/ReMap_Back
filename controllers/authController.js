import supabase from "../config/supabase.js";

// @desc Get all users
// @route GET /api/auths/users
export const listUsers = async (req, res) => {
    try {
        const { data: { users }, error } = await supabase.auth.admin.listUsers();
        
        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            console.log("List all users successful");
            return res.status(200).json(users);
        }
    } catch (err) {
        return res.status(500).json({ msg: "List all users error", error: err.message });
    }
}

// @desc Retrieve a user
// @route GET /api/auths/users/:id
export const getUser = async (req, res) => {
    const id = req.params.id;
    try {
        const { data, error } = await supabase.auth.admin.getUserById(id);
        
        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            console.log("Retrieve a user successful");
            res.status(200).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: "Retrieve a user error", error: err.message });
    }
}

// @desc Sign up new user
// @route POST /api/auths/signUp
export const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data, error } = await supabase.auth
        .signUp({
            email, password
        });

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            console.log("signed up successful");
            return res.status(201).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: "Sign up error", error: err.message });
    }
}


// @desc Get all users
// @route POST /api/auths/signIn
export const signIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            console.log("signed in successful");
            return res.status(201).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: "Sign in error", error: err.message });
    }
}

// @desc Log out user
// @route POST /api/auths/signOut
export const logOut = async (req, res) => {
    const { error } = await supabase.auth.signOut();

    try {
        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            return res.status(201).json({msg: "User logged out"});
        }
    } catch (err) {
        return res.status(500).json({ msg: "Sign out error", error: err.message });
    }
}

// @desc Update email
// @route PUT /api/auths/email/:id
export const updateEmail = async (req, res) => {
    const id = req.params.id;
    
    try {
        // Check user session
        const { data, error } = await supabase.auth.getSession();

        if (data !== null) {
            const { data: user, error } = await supabase.auth.admin.updateUserById(id,
            { email: req.body.email }
            );
            
            if (error) {
                return res.status(400).json({msg: error.message});
            } else {
                console.log("email updated");
                return res.status(201).json(user);
            }
        } else {
            return res.status(400).json({msg: error.message});
        }
    } catch (err) {
        return res.status(500).json({ msg: "update email error", error: err.message });        
    }
}

// @desc Update password
// @route PUT /api/auths/password/:id
export const updatePassword = async (req, res) => {
    const id = req.params.id;

    try {
        // Check user session
        const { userData, userError } = await supabase.auth.getSession();

        if (userData) {
            const { data: user, error } = await supabase.auth.admin.updateUserById(id,
            { password: req.body.password }
            );
            
            if (error) {
                return res.status(400).json({msg: error.message});
            } else {
                console.log("password updated");
                return res.status(201).json(user);
            }
        } else {
            return res.status(400).json({msg: userError.message});
        }
    } catch (err) {
        return res.status(500).json({ msg: "update password error", error: err.message });        
    }
}

// Delete account
// @route DELETE /api/auths/user:id
export const deleteUser = async (req, res) => {
    const id = req.params.id;
    const { data, error } = await supabase.auth.admin.deleteUser(id);
    // Check user session
    const { userData, userError } = await supabase.auth.getSession();

    try {
        if (userData) {
            if (error) {
                return res.status(400).json({msg: error.message});
            } else {
                console.log("Deleted user");
                return res.status(200).json(data);
            }
        } else {
            return res.status(400).json({msg: userError.message});    
        }
    } catch (err) {
        return res.status(500).json({ msg: "Delete error", error: err.message });
    }
}
