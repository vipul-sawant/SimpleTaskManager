import { Types, isValidObjectId } from "mongoose";
import ApiError from "./ApiError.js";

const checkID = (id, type) => {

    const _id = String(id).trim();
    const isValid = isValidObjectId(_id);

    if (!isValid) {
        
        throw new ApiError(400, `In-valid ${type}`);
    }

    return new Types.ObjectId(_id);
};

export default checkID;