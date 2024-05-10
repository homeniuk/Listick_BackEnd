import tokenService from '../service/token-service.js';

export default function (req, res, next) {
    try {
        const authorizationHeader = req.headers.authorization;
        if (!authorizationHeader) {
            return res.status(401).json({message: 'You are not registered'});
        }

        const accessToken = authorizationHeader.split(' ')[1];
        if (!accessToken) {
            return res.status(401).json({message: 'You are not registered'});
        }

        const userData = tokenService.validateAccessToken(accessToken);
        if (!userData) {
            return res.status(401).json({message: 'You are not registered'});
        }

        req.user = userData;
        next();
    } catch (e) {
        return res.status(401).json({message: 'You are not registered'});
    }
};