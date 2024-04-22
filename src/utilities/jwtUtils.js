const decodeToken = (authHeader) => {
  if (!authHeader) throw new Error('No token provided');

  const token = authHeader.split(' ')[1];
  if (!token) throw new Error('Malformed token');

  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

  if (!decodedToken.id) {
    throw new Error('Token does not contain user id');
  }

  return decodedToken;
};