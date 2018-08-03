export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  s3: {
    REGION: "us-east-2",
	BUCKET: "fc-im-dev-bucket"
  },
  apiGateway: {
	REGION: "us-east-2",
    URL: "https://vipey07lij.execute-api.us-east-2.amazonaws.com/prod"
  },
  cognito: {
	REGION: "us-east-2",
    USER_POOL_ID: "us-east-2_TxejXIqFZ",
    APP_CLIENT_ID: "4ktg9pqiouib0nr0k96akvmqau",
    IDENTITY_POOL_ID: "us-east-2:68ed23be-6efd-477c-8aa8-94a8fc5effc8"
  }
};
