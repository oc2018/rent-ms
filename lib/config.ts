const config = {
  env: {
    gogleMapsApi: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    apiEndpoint: process.env.NEXT_PUBLIC_API_ENDPOINT!,
    apiProdEndpoint: process.env.NEXT_PUBLIC_PROD_API_ENDPOINT!,
    imagekit: {
      publicKey: process.env.NEXT_PUBLIC_IMAGEKIT_PUBLIC_KEY!,
      urlEndpoint: process.env.NEXT_PUBLIC_IMAGEKIT_ENDPOINT!,
      privateKey: process.env.IMAGEKIT_PRIVATE_KEY!,
    },
    databaseaurl: process.env.DATABASE_URL!,
    upstash: {
      redisUrl: process.env.UPSTASH_REDIS_URL!,
      redisToken: process.env.UPSTASH_REDIS_TOKEN!,
      qstashUrl: process.env.UPSTASH_QSTASH_URL!,
      qstashToken: process.env.UPSTASH_QSTASH_TOKEN!,
    },
    resendToken: process.env.RESEND_TOKEN!,
    appwrite: {
      endpoint: process.env.APPWRITE_ENDPOINT!,
      projectId: process.env.APPWRITE_PROJECT_ID!,
      apiKey: process.env.APPWRITE_API_KEY!,
      databaseId: process.env.APPWRITE_DATABASE_ID!,
      propertiesCollectionId: process.env.APPWRITE_PROPERTIES_COLLECTION_ID!,
    },
  },
};

export default config;
