import jose from 'jose';
import bcrypt from 'bcryptjs'
import User from '/Models/User';
import { SignJWT } from 'jose';
import {sign} from '../Services/jwt_sign_verify'
import { serialize } from 'cookie';

// @desc    Register new user
// @route   POST /api/users
// @access  Public
export const registerUser = async (req, res) => {
    const { name, email, password, phone } = req.body
  
    if (!name || !email || !password || !phone) {
      res.status(400);
      res.json('Please add all fields');
    }
  
    // Check if user exists
    const userExists = await User.findOne({
      where: {
        email
      }
    });
  
    if (userExists) {
      res.status(400);
      res.json('User already exists');
    }
  
    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    
    // Create user
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword
    })
  
    

    if (user) {
      const access_token = await generateToken({ email: user.email, role: user.role, access: true}, '15min');
      const refresh_token = await generateToken({ email: user.email, role: user.role, refresh: true}, '30d');
      user.refresh_token = refresh_token;
      await user.save();

      res.setHeader('Set-Cookie',[
        serialize('refresh_token', refresh_token, { path: '/', sameSite: true, httpOnly: true, }),
        serialize('access_token', access_token, { path: '/', sameSite: true, httpOnly: true, })
      ]
      );
      res.status(201).json({
        _id: user.id,
        name: user.name,
        email: user.email
    })
    } else {
      res.status(400)
      res.json('Invalid user data');
    }
}

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
export const loginUser = async (req, res) => {
    const { email, password } = req.body
    
    // Check for user email
    const user = await User.findOne({
      where: {
        email
      }
    });

    
    if (user && (await bcrypt.compare(password, user.password))) {
      const access_token = await generateToken({ email: user.email, role: user.role, access: true}, '1min');
      const refresh_token = await generateToken({ email: user.email, role: user.role, refresh: true}, '30d');

      user.refresh_token = refresh_token;

      await user.save();

      res.setHeader('Set-Cookie',
      [
        serialize('refresh_token', refresh_token, { path: '/', sameSite: true, httpOnly: true, }),
        serialize('access_token', access_token, { path: '/', sameSite: true, httpOnly: true, }),
      ]
      );
      res.json({
        _id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      })
    } else {
      res.status(400);
      throw new Error('Invalid credentials')
    }
  }

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
export const getMe = async (req, res) => {
    res.status(200).json(req.user)
  }

// Generate JWT
const  generateToken = async (payload, lifeTime) => {
  //return await sign(payload, process.env.JWT_SECRET);
  return new SignJWT({ ...payload })
        .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
        .setExpirationTime(lifeTime)
        .sign(new TextEncoder().encode(process.env.JWT_SECRET));
  // return jwt.sign({ id }, process.env.JWT_SECRET, {
  //   expiresIn: '30d',
  // })
}
