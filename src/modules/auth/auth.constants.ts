export const jwtConstants = {
  secret: process.env.APP_KEY_SECRET,
  accessTokenSecret: process.env.JWT_ACCESS_TOKEN_SECRET,
  accessTokenExpiry: process.env.JWT_ACCESS_TOKEN_EXPIRATION_TIME,
  refreshTokenExpiry: +process.env.JWT_REFRESH_TOKEN_EXPIRATION_TIME,
};
export const AUTH_CACHE_PREFIX = 'AUTH_CACHE_PREFIX_';
