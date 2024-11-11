export const getUserName = (userId: string, OtherUserData: { uid: string; name: string }[]) => {
  const user = OtherUserData.find(user => user.uid === userId);
  return user ? user.name : "알 수 없음";
};
