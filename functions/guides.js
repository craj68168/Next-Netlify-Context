exports.handler = async (event, context) => {
  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify({ name: "guides data" }),
    };
  }
  return {
    statusCode: 401,
    body: JSON.stringify({ msg: "Please login first" }),
  };
};
