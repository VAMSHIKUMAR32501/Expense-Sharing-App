import api from "./api";

// ================= GROUP QUERIES =================

// Get groups visible to logged-in user
export const getGroupsByUser = (userId) =>
  api.get(`/groups/user/${userId}`);

// Create group (creator auto-added)
export const createGroup = (group, creatorId) =>
  api.post(`/groups?creatorId=${creatorId}`, group);

// ================= GROUP ACTIONS =================

// users NOT in group
export const getAvailableUsers = (groupId) =>
  api.get(`/groups/${groupId}/available-users`);


// Add member (ONLY creator allowed)
export const addMemberToGroup = (
  groupId,
  userIdToAdd,
  requesterId
) =>
  api.post(
    `/groups/${groupId}/members/${userIdToAdd}?requesterId=${requesterId}`
  );
