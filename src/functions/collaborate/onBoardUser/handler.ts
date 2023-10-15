import { setOnboardUser } from "../../../services/collaborate";

export const onBoardUser = async (event) => {
  const authorization = event.headers.Authorization;
  const onBoardData = JSON.parse(event.body);

  if (authorization) {
    try {
      await setOnboardUser(onBoardData);
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "onboard successful",
          response: "onboard successful",
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
          message: "onboard failed",
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
