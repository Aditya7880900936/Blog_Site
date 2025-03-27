const { validateToken } = require("../Services/authentication");

function checkForAuthenticationCookie(cookieName) {
   return (req, res, next) => {
        const tokenCookieValue = req.cookies[cookieName];
        if (!tokenCookieValue) {
            return next(); // Exit early if no token
        }

        try {
            const userPayload = validateToken(tokenCookieValue);
            req.user = userPayload; // Attach user payload to req.user
        } catch (err) {
            req.user = null; // Handle invalid token
        }
        
        return next(); // Proceed to the next middleware
   };
}

module.exports = { checkForAuthenticationCookie };