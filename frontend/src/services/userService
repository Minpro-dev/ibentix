import axiosInstance from '../api/axiosInstance';
import type { UserProfile } from '../types/userType';

export const getUserProfile = async (): Promise<UserProfile> => {
  const { data } = await axiosInstance.get('/details');
  return data;
};