import supabase from "../config/supabase.js";

// @desc Get all profiles
// @route GET /api/profiles
export const listProfiles = async (req, res) => {
    try {
        const { data, error } = await supabase
        .from("profiles")
        .select();

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            console.log("List of profiles:", data);
            return res.status(200).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: "Get all profiles error", error: err.message });
    }
}

// @desc Get single profile
// @route GET /api/profiles/:id
export const getProfile = async (req, res) => {
    const id = req.params.id;

    try {
        const { data, error } = await supabase
        .from("profiles")
        .select()
        .eq("id", id)
        .single();

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            console.log("Profile:", data);
            return res.status(200).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: "Profile error", error: err.message });
    }
}

// @desc Update single profile
// @route PUT /api/profiles/:id
export const updateProfile = async (req, res) => {
    const id = req.params.id;
    const { username, full_name } = req.body;

    try {
        const { data, error } = await supabase
        .from("profiles")
        .update({
            username,
            full_name,
        })
        .eq("id", id)
        .select();

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            console.log("Profile updated:", data);
            return res.status(201).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: "Update profile error", error: err.message });
    }
}
