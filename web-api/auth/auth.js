console.log('auth.js is loading...');

const database = require('../database');
const exceptions = require('../exceptions');

const { OAuth2Client } = require('google-auth-library');
const googleAppId = process.env.GOOGLE_AUTH_ID;
const client = new OAuth2Client(googleAppId);

const verify = async (idToken) => {
  const ticket = await client.verifyIdToken({
    idToken: idToken,
    audience: googleAppId
  });
  const payload = ticket.getPayload();
  const aud = payload['aud'];
  const email = payload['email'];

  const isValid = verifyGoogleAppId(aud) && (await verifyEmail(email));

  return isValid;
};

const verifyGoogleAppId = aud => {
  const isValid = aud === googleAppId;
  if (!isValid)
    exceptions.handleError(
      'Error trying to verify Google auth id',
      new exceptions.Unauthorized('The Google auth id is not valid')
    );

  return isValid;
};

const verifyEmail = async email => {
  const isValid = await database.isValidEmail(email);
  if (!isValid)
    exceptions.handleError('Error trying to verify email', new exceptions.Unauthorized('The email is not valid'));

  return isValid;
};

const verifyUser = async (req, res) => {
  const isValid = await verify(req.body.idToken).catch(console.error);
  if (isValid) {
    res.sendStatus(200);
    console.log('The user has been authorized.');
    //res.send(req.body.id);
  } else {
    res.sendStatus(401);
    console.log('The user has not been authorized.');
    //res.send(req.body.id);
  }
};

module.exports = {
  verifyUser
};
