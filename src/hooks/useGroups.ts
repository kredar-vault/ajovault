"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { get, post, patch, del } from "../lib/http";
import { ENDPOINTS } from "./endpoints";
import { queryKeys } from "../api/queryKey";
import type {
  ApiResult,
  CreateGroupPayload,
  CreateGroupResponse,
  SendInvitePayload,
  InviteLinkResponse,
  Group,
  GroupSettings,
  GroupMember,
} from "../types";

// 1. GET /groups
export function useGroups() {
  return useQuery<ApiResult<Group[]>, Error, Group[]>({
    queryKey: queryKeys.groups.list,
    queryFn: () => get<ApiResult<Group[]>>(ENDPOINTS.groups.root),
    select: (res) => res.data,
  });
}

// 2. POST /groups
export function useCreateGroup() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<CreateGroupResponse>, Error, CreateGroupPayload>({
    mutationFn: (body: CreateGroupPayload) =>
      post<ApiResult<CreateGroupResponse>, CreateGroupPayload>(ENDPOINTS.groups.root, body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.list });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.mine });
    },
  });
}

// 3. GET /groups/mine
export function useMyGroups() {
  return useQuery<ApiResult<Group[]>, Error, Group[]>({
    queryKey: queryKeys.groups.mine,
    queryFn: () => get<ApiResult<Group[]>>(ENDPOINTS.groups.mine),
    select: (res) => res.data,
  });
}

// 4. GET /groups/{id}
export function useGroupDetails(id: string) {
  return useQuery<ApiResult<Group>, Error, Group>({
    queryKey: queryKeys.groups.detail(id),
    queryFn: () => get<ApiResult<Group>>(ENDPOINTS.groups.byId(id)),
    select: (res) => res.data,
    enabled: !!id,
  });
}

// 5. POST /groups/{id}/join
export function useJoinGroup() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<void>, Error, string>({
    mutationFn: (id: string) =>
      post<ApiResult<void>>(ENDPOINTS.groups.join(id)),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(id) });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.mine });
      queryClient.invalidateQueries({ queryKey: queryKeys.members.list(id) });
    },
  });
}

// 6. POST /groups/join/{inviteCode}
export function useJoinGroupByInvite() {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<Group>, Error, string>({
    mutationFn: (inviteCode: string) =>
      post<ApiResult<Group>>(ENDPOINTS.groups.joinWithCode(inviteCode)),
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.mine });
      const data = response?.data;
      if (data?.id) {
        queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(data.id) });
        queryClient.invalidateQueries({ queryKey: queryKeys.members.list(data.id) });
      }
    },
  });
}

// 7. GET /groups/{id}/invite
export function useGroupInviteCode(id: string) {
  return useQuery<ApiResult<InviteLinkResponse>, Error, InviteLinkResponse>({
    queryKey: queryKeys.groups.invite(id),
    queryFn: () => get<ApiResult<InviteLinkResponse>>(ENDPOINTS.groups.invite(id)),
    select: (res) => res.data,
    enabled: !!id,
  });
}

// 8. POST /groups/{id}/invite
export function useSendGroupInvite(id: string) {
  return useMutation<ApiResult<void>, Error, SendInvitePayload>({
    mutationFn: (body: SendInvitePayload) =>
      post<ApiResult<void>, SendInvitePayload>(ENDPOINTS.groups.invite(id), body),
  });
}

// 9. GET /groups/{groupId}/settings
export function useGroupSettings(groupId: string) {
  return useQuery<ApiResult<GroupSettings>, Error, GroupSettings>({
    queryKey: queryKeys.groups.settings(groupId),
    queryFn: () => get<ApiResult<GroupSettings>>(ENDPOINTS.groups.settings(groupId)),
    select: (res) => res.data,
    enabled: !!groupId,
  });
}

// 10. PATCH /groups/{groupId}/settings
export function useUpdateGroupSettings(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<GroupSettings>, Error, Partial<GroupSettings>>({
    mutationFn: (body: Partial<GroupSettings>) =>
      patch<ApiResult<GroupSettings>, Partial<GroupSettings>>(ENDPOINTS.groups.settings(groupId), body),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.settings(groupId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(groupId) });
    },
  });
}

// Update this specific hook signature inside your hook file to match your explicit Member type:
// 11. GET /groups/{groupId}/members
export function useGroupMembers(groupId: string) {
  return useQuery<ApiResult<GroupMember[]>, Error, GroupMember[]>({
    queryKey: queryKeys.members.list(groupId),
    queryFn: () => get<ApiResult<GroupMember[]>>(ENDPOINTS.members.list(groupId)),
    select: (res) => res.data,
    enabled: !!groupId,
  });
}

// 12. DELETE /groups/{groupId}/members/{memberId}
export function useRemoveGroupMember(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<void>, Error, string>({
    mutationFn: (memberId: string) =>
      del<ApiResult<void>>(ENDPOINTS.members.remove(groupId, memberId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.members.list(groupId) });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.detail(groupId) });
    },
  });
}

// 13. PATCH /groups/{groupId}/members/{memberId}/role
export function useUpdateMemberRole(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<void>, Error, { memberId: string; role: "OWNER" | "ADMIN" | "MEMBER" }>({
    mutationFn: ({ memberId, role }) =>
      patch<ApiResult<void>, { role: string }>(ENDPOINTS.members.updateRole(groupId, memberId), { role }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.members.list(groupId) });
    },
  });
}

// 14. POST /groups/{groupId}/leave
export function useLeaveGroup(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<unknown>, Error, void>({
    mutationFn: () => post<ApiResult<unknown>>(ENDPOINTS.groups.leave(groupId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.list });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.mine });
    },
  });
}

// 15. DELETE /groups/{groupId}
export function useDeleteGroup(groupId: string) {
  const queryClient = useQueryClient();
  return useMutation<ApiResult<unknown>, Error, void>({
    mutationFn: () => del<ApiResult<unknown>>(ENDPOINTS.groups.delete(groupId)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.list });
      queryClient.invalidateQueries({ queryKey: queryKeys.groups.mine });
    },
  });
}
