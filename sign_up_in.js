import { Router } from 'express';
import supabase from './config/supabase.js';


const router = Router();

router.post('/signUp', async (req, res) => {
    try {
        const { data, error } = await supabase.auth.signUp({
            email: req.body.email,
            password: req.body.password
        });

        if (error) {
            return res.status(400).json({msg: error.message});
        } else {
            return res.status(201).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
})

router.post('/signIn', async (req, res) => {
    try {
        const { email, password } = req.body;
        
        const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
        });

        if (error) {
                return res.status(400).json({msg: error.message});
        } else {
            return res.status(201).json(data);
        }
    } catch (err) {
        return res.status(500).json({ msg: 'Server error', error: err.message });
    }
})

export default router;
