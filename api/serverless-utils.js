'use strict'

class ServerlessUtils {
    /**
     * Bare minimum response for lambda function. At the very
     * least, a statusCode and body should be returned
     * @param {Object} body 
     * @param {Number} statusCode 
     */
    static Response(body = null, statusCode = 200) {
        return {
            statusCode: 200,
            body: JSON.stringify(body, null, 2),
        };
    }
}

module.exports = ServerlessUtils;