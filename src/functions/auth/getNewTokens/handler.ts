import { userGetNewTokens } from "../../../services/auth";

export const getNewTokens = async (event) => {
  const authorization = event.headers.Authorization;

  if (authorization) {
    try {
      const response = await userGetNewTokens(authorization);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "authorized",
          response,
          error: null,
        }),
      };
    } catch (error: any) {
      /* error logger */
      console.log("Error Delete User Handler :", error);
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "not authorized",
          response: null,
          error,
        }),
      };
    }
  } else {
    return {
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "required header not provided",
        response: null,
        error: "required header not provided",
      }),
    };
  }
};
