import { getNewTokens } from "../functions/auth/getNewTokens/handler";
import { userGetNewTokens } from "../services/auth";

jest.mock("../services/auth");

describe("getNewTokens handler", () => {
  beforeEach(() => {
    /* Clear all instances and calls to constructor and all methods: */
    (userGetNewTokens as jest.Mock).mockClear();
  });

  it("should return a success response when userGetNewTokens succeeds", async () => {
    /* Arrange */
    const mockEvent = { headers: { Authorization: "xxx_RefreshToken_xxx" } };
    const mockResponse = {
      AuthenticationResult: {
        AccessToken: "xxxx",
        ExpiresIn: 3600,
        TokenType: "Bearer",
        IdToken: "xxxxxx",
      },
    };

    (userGetNewTokens as jest.Mock).mockResolvedValueOnce(mockResponse);

    /* Act */
    const result = await getNewTokens(mockEvent);

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

  it("should return an error response when userGetNewTokens fails", async () => {
    /* Arrange */
    const mockEvent = { headers: { Authorization: "Bearer someToken" } };
    const mockError = {
      message: "User does not exist.",
      code: "UserNotFoundException",
    };

    (userGetNewTokens as jest.Mock).mockRejectedValueOnce(mockError);

    /* Act */
    const result = await getNewTokens(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "not authorized",
        response: null,
        error: mockError,
      }),
    });
  });
});
