"use server";

import { Client, Databases, Storage } from "node-appwrite";
import config from "./config";
// import * as sdk from "node-appwrite";

const { endpoint, projectId, apiKey } = config.env.appwrite;

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(endpoint)
    .setProject(projectId)
    .setKey(apiKey);

  return {
    get databases() {
      return new Databases(client);
    },
    get storage() {
      return new Storage(client);
    },
  };
}

// const client = new sdk.Client()
//   .setEndpoint(endpoint)
//   .setProject(projectId)
//   .setKey(apiKey);
