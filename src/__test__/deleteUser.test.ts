import { deleteUser } from "../functions/auth/deleteUser/handler"; // Update the import path
import { setDeleteUser } from "../services/auth"; // Update the import path

jest.mock("../services/auth");

describe("deleteUser handler", () => {
  beforeEach(() => {
    /* Clear all instances and calls to constructor and all methods: */
    (setDeleteUser as jest.Mock).mockClear();
  });

  it("should return a success response when user deletion succeeds", async () => {
    /* Arrange */
    const mockEvent = { headers: { Authorization: "mock-token" } };
    (setDeleteUser as jest.Mock).mockResolvedValueOnce({});

    /* Act */
    const result = await deleteUser(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "account delete successful",
        response: {},
        error: null,
      }),
    });
  });

  it("should return an error response when user deletion fails", async () => {
    /* Arrange */
    const mockEvent = { headers: { Authorization: "mock-token" } };
    const mockError = {
      message: "Invalid Access Token",
      response: null,
    };
    (setDeleteUser as jest.Mock).mockRejectedValueOnce(mockError);

    /* Act */
    const result = await deleteUser(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "account delete failed",
        response: null,
        error: mockError,
      }),
    });
  });
});
