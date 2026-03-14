import {v2 as cloudinary} from "cloudinary"
import dotenv from "dotenv"
dotenv.config()
cloudinary.config({
    cloud_name: "dgt4douyd",
    api_key: "755423772866734", // DISABLE THIS BEFORE PUSHING TO PRODUCTION
    api_secret: "4TZBbfVGUuPsi91tr7G6XfXDL6g",
})
export default cloudinary;