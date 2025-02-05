"use server";

import { ID } from "appwrite";
import { createAdminClient } from "../appwrite.config";
import config from "../config";
import { parseStringify } from "../utils";

const { databaseId, propertiesCollectionId } = config.env.appwrite;

export const createProperty = async (data: CreatePropertyProps) => {
  console.log("here");

  console.log(data);
  const { databases } = await createAdminClient();
  try {
    const newProperty = await databases.createDocument(
      databaseId,
      propertiesCollectionId,
      ID.unique(),
      { ...data }
    );

    return parseStringify(newProperty);
  } catch (error) {
    console.log(`Create property Error: ${error}`);
  }
};
