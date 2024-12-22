import mongoose from "mongoose";

const imageSchema = {
    image:{
        type:String,
    }
}
export const ImageModel = mongoose.model('ProfileImage',imageSchema);