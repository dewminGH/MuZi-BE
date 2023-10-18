import { allCollaborators } from "../../../services/collaborate";

export const getAllCollaborators = async (event) => {
  const authorization = event.headers.Authorization;

  if (authorization) {
    try {
      const response = await allCollaborators();
      return {
        statusCode: 200,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "collaborator fetched successful",
          response: response,
          error: null,
        }),
      };
    } catch (error: any) {
      /* error logger */
      console.log("Error get all collaborator Handler :", error);
      return {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
          message: "collaborators fetch failed",
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
