import UserModel from '../models/user-model.js';
import bcrypt from 'bcrypt';
//import { v4 as uuidv4 } from 'uuid';
import tokenService from '../service/token-service.js';

class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            const candidate = await UserModel.findOne({email});
            if (candidate) {
                return res.status(400).json({message: 'This email is used'});
            };
            const hashPassword = await bcrypt.hash(password, 3);
            const activationLink = ""; //const activationLink = uuidv4();
            const user = await UserModel.create({email, password: hashPassword, activationLink});
            const UserData = {email: user.email, id: user._id};
            const tokens = tokenService.generateTokens({...UserData});
            await tokenService.saveToken(UserData.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            
            return res.json({accessToken: tokens.accessToken, user: UserData});
        } catch (e) {
            next(e);
            //return res.status(500).json({message: 'Server error'});
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const user = await UserModel.findOne({email})
            if (!user) {
                return res.status(400).json({message: 'Email or password are wrong'});
            }
            const isPassEquals = await bcrypt.compare(password, user.password);
            if (!isPassEquals) {
                return res.status(400).json({message: 'Email or password are wrong'});
            }
            const UserData = {email: user.email, id: user._id};
            const tokens = tokenService.generateTokens({...UserData});
            await tokenService.saveToken(UserData.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            
            return res.json({accessToken: tokens.accessToken, user: UserData});
        } catch (e) {
            next(e);
            //return res.status(500).json({message: 'Server error'});
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await tokenService.removeToken(refreshToken);
            res.clearCookie('refreshToken');
            return res.json(token);
        } catch (e) {
            next(e);
            //return res.status(500).json({message: 'Server error'});
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            const user = await UserModel.findOne({activationLink})
            if (!user) {
                throw ApiError.BadRequest('Wrong link')
            }
            user.isActivated = true;
            await user.save();
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e);
            //return res.status(500).json({message: 'Server error'});
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            if (!refreshToken) {
                return res.status(401).json({message: 'User is not authorized'});
            }
            const userData = tokenService.validateRefreshToken(refreshToken);
            const tokenFromDb = await tokenService.findToken(refreshToken);
            if (!userData || !tokenFromDb) {
                return res.status(401).json({message: 'User is not authorized'});
            }
            const user = await UserModel.findById(userData.id);
            const UserData = {email: user.email, id: user._id};
            const tokens = tokenService.generateTokens({...UserData});
            await tokenService.saveToken(UserData.id, tokens.refreshToken);
            res.cookie('refreshToken', tokens.refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData);
        } catch (e) {
            next(e);
            //return res.status(500).json({message: 'Server error'});
        }
    }

    async getUsers(req, res, next) {
        try {
            const users = await UserModel.find();
            return res.json(users);
        } catch (e) {
            next(e);
            //return res.status(500).json({message: 'Server error'});
        }
    }
}

export default new UserController();
