import bcrypt from 'bcrypt'

export const hashPassword = async (password,next)=>{
    try{
        const hashedPass = await bcrypt.hash(password,12);
        return hashedPass
    }catch(error){
        next(error)
    }
}

export const compareHashPass = async (password,hashedPass,next)=>{
    try {
        console.log(password,hashedPass);
        const result = await bcrypt.compare(password,hashedPass);
        return result;
    } catch (error) {
        next(error)
    }
}