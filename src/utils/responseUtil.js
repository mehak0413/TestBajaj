export const successResponse = (data) => {
  return {
    is_success: true,
    official_email: process.env.USER_EMAIL,
    data: data
  };
};

export const errorResponse = (message) => {
  return {
    is_success: false,
    official_email: process.env.USER_EMAIL,
    data: message
  };
};

export const healthResponse = () => {
    return {
        is_success: true,
        official_email: process.env.USER_EMAIL
    };
};
