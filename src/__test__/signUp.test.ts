import { signUp } from "../functions/auth/signUp/handler";
import { userSignUp } from "../services/auth";

jest.mock("../services/auth");

describe("signUp handler", () => {
  it("should return a success response when userSignUp succeeds", async () => {
    /* Arrange */
    const mockRequest = { username: "mock-user", code: "mock-code" };
    const mockEvent = { body: JSON.stringify(mockRequest) };
    const mockResponse = {
      message: "authentication successful",
      response: {
        UserConfirmed: false,
      },
    };

    (userSignUp as jest.Mock).mockResolvedValueOnce(mockResponse);

    /* Act */
    const result = await signUp(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "authentication successful",
        response: mockResponse,
        error: null,
      }),
    });
    expect(userSignUp).toHaveBeenCalledWith(mockRequest);
  });

  /* error */
  it("should return an error response when userSignUp fails", async () => {
    /* Arrange */
    const mockRequest = { username: "mock-user" };
    const mockEvent = { body: JSON.stringify(mockRequest) };
    const mockError = {
      message: "authentication failed",
      response: null,
    };

    (userSignUp as jest.Mock).mockRejectedValueOnce(mockError);

    /*  Act */
    const result = await signUp(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "authentication failed",
        response: null,
        error: mockError,
      }),
    });
    expect(userSignUp).toHaveBeenCalledWith(mockRequest);
  });
});
