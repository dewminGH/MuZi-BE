import { confirmSignUp } from "../functions/auth/confirmSignUp/handler";
import { confirmUserRegister } from "../services/auth";

jest.mock("../services/auth");

describe("confirmSignUp handler", () => {
  beforeEach(() => {
    /* Clear all instances and calls to constructor and all methods: */
    (confirmUserRegister as jest.Mock).mockClear();
  });

  it("should return a success response when user confirmation succeeds", async () => {
    /* Arrange */
    const mockRequest = { username: "test", code: "123456" };
    const mockEvent = { body: JSON.stringify(mockRequest) };
    const mockResponse = {
      message: "confirmation successful",
      response: "account activated",
    }; // Your expected response here

    (confirmUserRegister as jest.Mock).mockResolvedValueOnce(mockResponse);

    /* Act */
    const result = await confirmSignUp(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "confirmation successful",
        response: mockResponse,
        error: null,
      }),
    });
  });

  it("should return an error response when user confirmation fails", async () => {
    /* Arrange */
    const mockRequest = { username: "test", code: "123456" };
    const mockEvent = { body: JSON.stringify(mockRequest) };
    const mockError = {
      message: "confirmation fail",
      response: null,
    };

    (confirmUserRegister as jest.Mock).mockRejectedValueOnce(mockError);

    /* Act */
    const result = await confirmSignUp(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "confirmation fail",
        response: null,
        error: { message: "confirmation fail", response: null },
      }),
    });
  });
});
