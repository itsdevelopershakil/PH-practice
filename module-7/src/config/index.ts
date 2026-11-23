const appConfig = {
  port: process.env.PORT || 5000,
  dbUrl: process.env.DATABASE_URL,
  baseEndPoint: "/api/v1",
  access_token_secret: process.env.ACCESS_TOKEN_SECRET,
  refresh_token_secret: process.env.REFRESH_TOKEN_SECRET,
  access_token_expire: process.env.ACCESS_TOKEN_EXPIRE,
  refresh_token_expire: process.env.REFRESH_TOKEN_EXPIRE,
};

export default appConfig;
