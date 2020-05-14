exports.handler = async(event, context) => {
  try {
    const { user } = context.clientContext;

    if (!user) {
      throw new Error('Not Authorized');
    }

    return {
      statusCode: 200,
      headers: {
        'Content-Type': 'text/html',
      },
      body: `
        Welcome ${user.user_metadata.full_name}!
        If you can read this it means you have logged in and are now viewing protected content.        
      `,
    };
  } catch (error) {
    return {
      statusCode: 401,
      body: 'Not Authorized',
    };
  }
};