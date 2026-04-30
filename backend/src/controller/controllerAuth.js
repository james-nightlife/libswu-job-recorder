import { authenticate } from 'ldap-authentication';
import jwt from 'jsonwebtoken';
import getUserInfo from '../middleware/getUserInfo.js';


export const auth = async (req, res, next) => {
    console.log('auth called');
    const { username, password } = req.body;

    if(!username || !password) {
        return res.status(400).json({ message: 'Username and password are required' });
    }

    try{
        const authenticated = await authenticate({
            ldapOpts: { url: 'ldap://ldap.swu.ac.th' },
            userDn: `uid=${username}, dc=swu, dc=ac, dc=th`,
            userPassword: password,
        })

        const userInfo = await getUserInfo(username);

        const token = jwt.sign(
            { 
                username: username,
                name: userInfo.name,
            }, 
            process.env.JWT_SECRET, 
            { 
                expiresIn: '1h' 
            });
        return res.status(200).json({ 
                username: username,
                name: userInfo.name,
                token: token
        })
    }catch(e){
        console.error(e);
        if(e.message === ' Code: 0x31'){
            return res.status(401).json({ message: 'Invalid username or password' });
        }
        return res.status(500).json({ message: 'Internal server error' });
    }
}