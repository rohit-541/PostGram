import bcrypt from 'bcrypt'

export const hashPassword = async (password,next)=>{
    try{
        const hashedPass = await bcrypt.hash(password,12);
        return hashedPass
    }catch(error){
        next(error)
    }
}