import { signIn } from "../functions/auth/signIn/handler";
import { userSignIn } from "../services/auth";

jest.mock("../services/auth");

describe("signIn handler", () => {
  beforeEach(() => {
    /* Clear all instances and calls to constructor and all methods: */
    (userSignIn as jest.Mock).mockClear();
  });

  it("should return a success response when userSignIn succeeds", async () => {
    /* Arrange */
    const mockRequest = { username: "test", password: "test" };
    const mockEvent = { body: JSON.stringify(mockRequest) };
    const mockResponse = {
      message: "login successful",
      response: {
        AccessToken: "xxxxxxxx",
        ExpiresIn: 3600,
        TokenType: "Bearer",
        RefreshToken: "xxxxxxxxxx",
        IdToken: "xxxxxxxxxxxxx",
      },
      error: null,
    };

    (userSignIn as jest.Mock).mockResolvedValueOnce(mockResponse);

    /* Act */
    const result = await signIn(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "login successful",
        response: mockResponse,
        error: null,
      }),
    });
  });

  it("should return an error response when userSignIn fails", async () => {
    /* Arrange */
    const mockRequest = { username: "mock-user", password: "mock-password" };
    const mockEvent = { body: JSON.stringify(mockRequest) };
    const mockError = {
      message: "Incorrect username or password.",
      code: "NotAuthorizedException",
    };

    (userSignIn as jest.Mock).mockRejectedValueOnce(mockError);

    /* Act */
    const result = await signIn(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "check password and username",
        response: null,
        error: mockError,
      }),
    });
  });
});
