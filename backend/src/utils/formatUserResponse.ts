export const formatUserResponse = (data: any) => {
  return {
    userId: data.userId,
    firstName: data.firstName,
    lastName: data.lastName,
    email: data.email,
    phone: data.phone,
    gender: data.gender,
    address: data.address,
    countryId: data.countryId,
    role: data.role,
    avatar: data.avatar,
    isVerified: data.isVerified,
    createdAt: data.createdAt,
  };
};
1;
