import { Router } from "express";
import supabase from "./config/supabase.js";

const router = Router();

// Get all pins
router.get("/", async (req, res) => {
    try {
    const { pins, error } = await supabase
    .from("pins")
    .select();

    if (error) {
        return res.status(400).json({msg: error.message});
    } else {
        console.log("List of pins", pins);
        return res.status(200).json(pins);
    }

    } catch (err) {
        return res.status(500).json({ msg: "Get all pins error", error: err.message });
    }
})

// Get single pin
router.get("/:pinId", async (req, res) => {
    const pin_id = req.params.pinId;

    try {
        const { pins, error } = await supabase
        .from("pins")
        .select()
        .eq("id", pin_id)
        .single();

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            console.log("Get pin:", pins);
            res.status(200).json(pins);
        }
    } catch (err) {
        return res.status(500).json({ msg: "Get pin error", error: err.message });
    }
})

// Update pin
router.put("/:pinId", async (req, res) => {
    const pin_id = req.params.pinId;
    const {
        description,
        latitude,
        longitude,
        audio_url,
        image_urls
    } = req.body;

    try {
        const { pins, error } = await supabase
        .from("pins")
        .update()
        .eq("id", pin_id)
        .select();

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            console.log("Pin updated:", pins);
            return res.status(201).json(pins);
        }
    } catch (err) {
        return res.status(500).json({ msg: "Update pin error", error: err.message });
    }
})

// Delete pin
router.delete("/:pinId", async (req, res) => {
    const pin_id = req.params.pinId;

    try {
        const { pins, error } = await supabase
        .from("pins")
        .delete()
        .eq("id", pin_id)
        .select()

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            console.log("Pin deleted");
            return res.status(200).json(pins);
        }
    } catch (err) {
        return res.status(500).json({ msg: "Delete pin error", error: err.message });
    }
})

export default router;
