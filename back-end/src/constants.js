export const cookieOptions = (action)=>{
    
    return {

        httpOnly:true,
        secure:true,
        ...(action === "login" && { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 10) })
}};