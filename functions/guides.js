exports.handler = async (event, context) => {
  const data = [
    { author: "Raj Chaudhary", title: "This is netlify project" },
    { author: "Roshan Shrestha", title: "Nothing much" },
    { author: "Saroj Rana", title: "Whatever it is" },
  ];
  if (context.clientContext.user) {
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  }
  return {
    statusCode: 401,
    body: JSON.stringify({ msg: "Please login first" }),
  };
};
