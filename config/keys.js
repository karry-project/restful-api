const keys = {
  app: {
    baseUrl: "api.karry.fr",
    defaultPort: 3000,
    databaseUrl:
      "mongodb://karry:karryproject2019@ds213615.mlab.com:13615/karry_api",
    jwt: {
      secret: "secret"
    },
    acceptedTokens: ["nF0KAGnAIHXly5A8NHz0ax2MugL85ySm", "<user_token>"]
  },
  googleAuth: {
    clientId:
      "816322250968-fj28tpsmh35fi7n208sahsc65d1ipe5r.apps.googleusercontent.com"
  },
  firebase: {
    adminKey: "firebase-adminsdk-85efj@karry-app-f106e.iam.gserviceaccount.com"
  },
  sendGrid: {
    apiKey:
      "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"
  }
};

module.exports = keys;
