module.exports = {
    jwt: {
        debugEnabled: false,
        accessTokenValiditySeconds: Number(process.env.ACCESS_TOKEN_VALIDITY_SECONDS) || 15 * 60,
        refreshTokenValiditySeconds: Number(process.env.REFRESH_TOKEN_VALIDITY_SECONDS) || 4 * 60 * 60,
      },
}