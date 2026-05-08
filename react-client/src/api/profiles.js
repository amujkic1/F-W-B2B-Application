import { authClient } from "@/api/authClient.js"

export const getProfiles = async ({
  page = 1,
  limit = 10,
  first_name,
  last_name,
  position,
  accepting_meetings,
} = {}) => {
  const skip = (page - 1) * limit;

  const response = await authClient.get('/api/profiles/', {
    params: {
      skip,
      limit,
      first_name,
      last_name,
      position,
      accepting_meetings,
    },
  });

  return response.data;
};


export const getProfile = async (id) => {
  const response = await authClient.get(`/api/profiles/${id}`);
  return response.data;
};
