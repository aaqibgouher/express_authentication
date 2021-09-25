const express = require('express');
const expressValidator = require('express-validator');
const User = require('../model/User');
const Common = require('../utils/Common');

const dashboard = (req, res) => {
    res.json({ token: req.query.token });
}

const register = (req, res) => {
    const first_name = req.query.first_name;
    const last_name = req.query.last_name;
    const phone = req.query.phone;
    const address = req.query.address;

    if (!first_name) throw res.status(400).json({ error: 'first name is required .. ' });
    if (!last_name) throw res.status(400).json({ error: 'last name is required ..' })
    if (!phone) throw res.status(400).json({ error: 'phone is required ..' })

    User.findOne({ where: { phone } })
        .then(user => {

            if (user) throw res.status(400).json({ error: `phone ${phone} already taken ..` });

            // inserting user details in users table
            User.create({
                first_name,
                last_name,
                phone,
                address: address ? address : null,
                last_login_at: null
            })
                .then(user => {
                    
                    res.json({ message: 'user has been created successfully ..', user });
                })
                .catch(err => res.status(400).json({ err }))

        })
        .catch(err => res.status(400).json({ err }))
}

const login = (req, res) => {
    const phone = req.query.phone;

    User.findOne({
        where: {
            phone: phone
        }
    }).then(user => {
        if (!user) throw res.status(400).json({ message: 'user does not exist ..' });

        // generating otp 
        const otp = user.otp ? user.otp : Common.generate_otp();

        // inserting otp in users table
        User.update({ otp }, {
            where: { phone }
        }).then(user_id => res.json({ message: `otp sent to the number ${phone[0]}********${phone[9]} ..` }))
            .catch(err => res.status(400).json({ err }))
    })
}

const otp_verification = (req, res) => {
    const phone = req.query.phone;
    const otp = req.query.otp;

    User.findOne({
        where: {phone}
    }).then(user => {
        if (!user) throw res.status(400).json({ message: 'invalid phone numer ..' });
        
        if (otp != user.otp) throw res.status(400).json({ message: 'you have entered invalid otp ..' });

        // generate user token
        const token = Common.generate_token();

        // insert token in users table 
        User.update({ token, otp: null, is_verified: '1' }, { where: {id: user.id} })
            .then(user_id => {
                
                User.findOne({ where: { id: user.id} })
                    .then(user => {
                        res.json({ message: 'you have login successfully..' , user } );
                    })
                    .catch(err => res.status(400).json({ err }))
            }).catch(err => res.status(400).json({ err }))


    }).catch(err => res.status(400).json({ err }))
}

const logout = (req, res) => {
    const token = req.query.token;

    User.findOne({ where: { token } })
        .then(user => {
            if(!user) throw res.status(400).json({ message: 'user does not found with corresponding token..' });

            User.update({ token: null, is_verified: '0' }, { where: { token } })
                .then(user_id => {
                    res.json({ message: 'successfully logout ..', user_id: user.id });
                })
                .catch(err => res.status(400).json({ err }))
        })
        .catch(err => res.status(400).json({ err }))
}

module.exports = {
    dashboard,
    register,
    login,
    otp_verification,
    logout
};