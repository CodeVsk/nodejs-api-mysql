require('dotenv/config');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('../database/index.js').pool;

module.exports = {
    async registerUser(req,res){
        const {username,email,password} = req.body;
        const picture = req.file.path;
        mysql.getConnection((err,conn)=>{
            if(err){ return res.status(500).send({ error:err }) }
            bcrypt.hash(password,10,(errhash,hash)=>{
                if(errhash){return res.status(500).send({error:errhash})}
                conn.query('INSERT INTO db_users (username,email,password,picture) VALUES (?,?,?,?)',
                    [username,email,hash,picture],
                    (error,result,fields)=>{
                        conn.release();
                        if(error){return res.status(400).send({message:"Registration failed!"});}
                        return res.status(200).send({message:"Registered successfully!"});
                    }
                )
            });
        });
    },
    async loginUser(req,res){
        const {email,password} = req.body;
    },
    async findUser(req,res){
        const {id} = req.params;
        mysql.getConnection((err,conn)=>{
            if(err){return res.status(500).send({error:err})}
            conn.query('SELECT * FROM db_users WHERE id=?;',
            [id],
            (error,result,fields)=>{
                conn.release();
                if(error){
                    return res.status(400).send({message:'User not found!'})
                }else{
                    return res.status(200).send({response:result})
                }
            })
        })
    },
    async updateUser(req,res){
        const {email,username} = req.body;
        mysql.getConnection((err,conn)=>{
            if(err){return res.status(500).send({error:err})}
            conn.query('UPDATE db_users SET username=? WHERE email=?',
            [username,email],
            (error,result,fields)=>{
                conn.release();
                if(error){
                    return res.status(401).send({message:"Update username failed!"})
                }else{
                    return res.status(200).send({message:"Username updated successfully!"})
                }
            })
        })
    },
    async deleteUser(req,res){
        const {id} = req.body;
        mysql.getConnection((err,conn)=>{
            if(err){res.status(500).send({error:err})}
            conn.query('DELETE FROM db_users WHERE id=?',
            [id],
            (error,result,fields)=>{
                conn.release();
                if(error){
                    return res.status(401).send({message:"Delete user failed!"})
                }else{
                    return res.status(200).send({message:"User deleted successfully!"})
                }
            })
        })
    }
};