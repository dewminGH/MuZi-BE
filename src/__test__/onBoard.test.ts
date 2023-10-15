import { onBoardUser } from "../functions/collaborate/onBoardUser/handler";
import { setOnboardUser } from "../services/collaborate";

jest.mock("../services/collaborate");

describe("onBoardUser handler", () => {
  beforeEach(() => {
    /* Clear all instances and calls to constructor and all methods: */
    (setOnboardUser as jest.Mock).mockClear();
  });

  it("should return a success response when setOnboardUser succeeds", async () => {
    /* Arrange */
    const mockEvent = {
      headers: { Authorization: "xxx_Access_token_xxx" },
      body: JSON.stringify({
        id: "xxxxxxx",
        email: "mock@gmail.com",
        f_name: "yamori",
        l_name: "ling",
        date: "10-13-2023",
        country: "china",
        languages: ["sinhala", "english"],
        bio: "Hey, I'm Mia. I'm an emerging star with a captivating voice.",
        talents: ["singer", "producers"],
        on_board: true,
      }),
    };

    (setOnboardUser as jest.Mock).mockResolvedValueOnce({});

    /* Act */
    const result = await onBoardUser(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 200,
      headers: { "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({
        message: "onboard successful",
        response: "onboard successful",
        error: null,
      }),
    });
  });

  it("should return an error response when setOnboardUser fails", async () => {
    /* Arrange */
    const mockEvent = {
      headers: { Authorization: "xxx_Access_token_xxx" },
      body: JSON.stringify({
        /* no id */
        email: "mock@gmail.com",
        f_name: "yamori",
        l_name: "ling",
        date: "10-13-2023",
        country: "china",
        languages: ["sinhala", "english"],
        bio: "Hey, I'm Mia. I'm an emerging star with a captivating voice.",
        talents: ["singer", "producers"],
      }),
    };
    const mockError = {
      message: expect.any(String),
      code: "ValidationException",
    };

    (setOnboardUser as jest.Mock).mockRejectedValueOnce(mockError);

    /* Act */
    const result = await onBoardUser(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 400,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "onboard failed",
        response: null,
        error: mockError,
      }),
    });
  });
});
