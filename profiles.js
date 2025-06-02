import { Router } from 'express';
import supabase from './config/supabase.js';

const router = Router();

// Get all profiles
router.get('/', async (req, res) => {
    try {
        const { data, error } = await supabase
        .from('profiles')
        .select();

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            return res.status(200).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
})

// Create profile
router.post('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const { data, error} = await supabase
    } catch (err) {
        
    }
})

// Get single profile
router.get('/:id', async (req, res) => {
    const id = req.params.id;

    try {
        const { data, error } = await supabase
        .from('profiles')
        .select()
        .eq('id', id)
        .single();

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            return res.status(200).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
})

// Update single profile
router.put('/:id', async (req, res) => {
    const id = req.params.id;
    const { userName, firstName, lastName } = req.body;

    try {
        const { data, error } = await supabase
        .from('profiles')
        .update({
            username: userName,
            first_name: firstName,
            last_name: lastName,
        })
        .eq('id', id)
        .select();

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            return res.status(200).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
})

// Add pins

export default router;
