import { getUserDetails } from "../../../services/auth";

export const getUser = async (event) => {
  const authorization = event.headers.Authorization;

  if (authorization) {
    try {
      const response = await getUserDetails(authorization);
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
      console.log("Error Get User Handler :", error);
      return {
        statusCode: 401,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "unauthorized",
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
