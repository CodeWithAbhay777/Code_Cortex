import jwt from 'jsonwebtoken';

export const generateToken = (res , user , message) => {
    const token = jwt.sign({
        userId : user._id,
    } , process.env.SECRET_TOKEN , {expiresIn : '1d'});


    return res.status(200)
    .cookie("code_cortex_token" , token , {httpOnly:true , sameSite:'none' ,secure:true , maxAge:24*60*60*1000})
    .json({
        success : true,
        message,
        user 
    });
}