import { getAllCollaborators } from "../functions/collaborate/getAllCollaborators/handler";
import { allCollaborators } from "../services/collaborate";

jest.mock("../services/collaborate");

describe("getAllCollaborators handler", () => {
  beforeEach(() => {
    /* Clear all instances and calls to constructor and all methods: */
    (allCollaborators as jest.Mock).mockClear();
  });

  it("should return a success response when allCollaborators succeeds", async () => {
    /* Arrange */
    const mockEvent = { headers: { Authorization: "xxx_Access_Token_xxx" } };
    const mockResponse = {
      message: "onboard successful",
      response: {
        Items: [
          {
            l_name: "l music",
            date: "10-13-2023",
            languages: ["sinhala"],
            bio: "I'm a gifted songwriter, and I have a knack for crafting catchy lyrics and melodies. I thrive on collaborations with amazing singers and producers, and together, we've created hit songs that people can't stop humming",
            f_name: "msuic",
            id: "idxxxx",
            email: "mailXXX",
            country: "sri lanka",
            talents: ["songs Writer"],
            on_board: true,
          },
        ],
      },
    };

    (allCollaborators as jest.Mock).mockResolvedValueOnce(mockResponse);

    /* Act */
    const result = await getAllCollaborators(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "onboard successful",
        response: mockResponse,
        error: null,
      }),
    });
  });

  it("should return an error response when allCollaborators fails", async () => {
    /* Arrange */
    const mockEvent = {
      headers: { Authorization: undefined },
    };
    const mockError = "required header not provided";

    (allCollaborators as jest.Mock).mockRejectedValueOnce(mockError);

    /* Act */
    const result = await getAllCollaborators(mockEvent);

    /* Assert */
    expect(result).toEqual({
      statusCode: 401,
      headers: {
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        message: "required header not provided",
        response: null,
        error: mockError,
      }),
    });
  });
});
