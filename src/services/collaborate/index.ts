import * as AWS from "aws-sdk";
import { IOnboardUser } from "./types";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

/* on board user */
export const setOnboardUser = async (onboardData: IOnboardUser) => {
  const {
    id,
    email,
    f_name,
    l_name,
    date,
    country,
    languages,
    bio,
    talents,
    on_board,
  } = onboardData;
  const params = {
    TableName: "onboard",
    Item: {
      id,
      email,
      f_name,
      l_name,
      date,
      country,
      languages,
      bio,
      talents,
      on_board,
    },
  };
  try {
    await dynamoDB.put(params).promise();
  } catch (error: any) {
    /* error logger */
    console.log("Error onboard User :", error);
    throw error;
  }
};

/* get all collaborators */
export const allCollaborators = async () => {
  try {
    const params = {
      TableName: "onboard",
    };

    const data = await dynamoDB.scan(params).promise();
    return data;
  } catch (error: any) {
    console.log("Error get all collaborators :", error);
    throw error;
  }
};
