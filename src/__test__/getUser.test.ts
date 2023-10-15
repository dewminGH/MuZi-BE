import { getUser } from "../functions/auth/getUser/handler"; // Update the import path
import { getUserDetails } from "../services/auth"; // Update the import path

jest.mock("../services/auth");

describe("getUser handler", () => {
  beforeEach(() => {
    /* Clear all instances and calls to constructor and all methods: */
    (getUserDetails as jest.Mock).mockClear();
  });

  it("should return a success response when getUserDetails succeeds", async () => {
    /* Arrange */
    const mockEvent = { headers: { Authorization: "xxx_Access_token_xxx" } };
    const mockResponse = {
      Username: "xxxxx",
      UserAttributes: [
        {
          Name: "sub",
          Value: "xxxxxxxxxxxxxxxxxxxxx",
        },
        {
          Name: "email_verified",
          Value: "true",
        },
        {
          Name: "profile",
          Value: "xxxx",
        },
        {
          Name: "name",
          Value: "xxx",
        },
        {
          Name: "email",
          Value: "xxxxx@gmail.com",
        },
      ],
    };

    (getUserDetails as jest.Mock).mockResolvedValueOnce(mockResponse);

    /* Act */
    const result = await getUser(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "authorized",
        response: mockResponse,
        error: null,
      }),
    });
  });

  it("should return an error response when getUserDetails fails", async () => {
    /* Arrange */
    const mockEvent = { headers: { Authorization: "Bearer someToken" } };
    const mockError = {
      message: "Invalid Access Token",
      code: "NotAuthorizedException",
    };

    (getUserDetails as jest.Mock).mockRejectedValueOnce(mockError);

    /* Act */
    const result = await getUser(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "unauthorized",
        response: null,
        error: mockError,
      }),
    });
  });
});
