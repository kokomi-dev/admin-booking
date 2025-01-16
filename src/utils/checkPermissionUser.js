const checkPermissionUser = (groupId) => {
  if (groupId.includes(1) && groupId.includes(2) && groupId.includes(6)) {
    return {
      role: 'admin',
      status: true,
    };
  }
  if (groupId.includes(2) && groupId.includes(6) && !groupId.includes(1)) {
    return {
      role: 'partner',
      status: false,
    };
  }
  if (groupId.includes(6) && groupId.length === 1) {
    return {
      role: 'user',
      status: false,
    };
  }
  return null;
};
export default checkPermissionUser;
