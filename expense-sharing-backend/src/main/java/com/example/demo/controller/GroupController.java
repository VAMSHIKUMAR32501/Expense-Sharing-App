package com.example.demo.controller;

import com.example.demo.model.Group;
import com.example.demo.model.User;
import com.example.demo.repository.GroupRepository;
import com.example.demo.repository.UserRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/groups")
@CrossOrigin
public class GroupController {

    private final GroupRepository groupRepo;
    private final UserRepository userRepo;

    public GroupController(GroupRepository groupRepo, UserRepository userRepo) {
        this.groupRepo = groupRepo;
        this.userRepo = userRepo;
    }

    // ================= CREATE GROUP =================
    @PostMapping
    public Group createGroup(
            @RequestParam Long creatorId,
            @RequestBody Group group
    ) {
        User creator = userRepo.findById(creatorId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        group.setCreatedBy(creator);
        group.getMembers().add(creator);

        return groupRepo.save(group);
    }

    // ================= GET GROUPS FOR USER =================
    @GetMapping("/user/{userId}")
    public List<Group> getGroupsForUser(@PathVariable Long userId) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return groupRepo.findByMembersContains(user);
    }

    // ================= GET USERS NOT IN GROUP =================
    @GetMapping("/{groupId}/available-users")
    public List<User> getAvailableUsers(@PathVariable Long groupId) {

        Group group = groupRepo.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        List<Long> memberIds = group.getMembers()
                .stream()
                .map(User::getId)
                .collect(Collectors.toList()); // ✅ Java 8 safe

        if (memberIds.isEmpty()) {
            return userRepo.findAll();
        }

        return userRepo.findByIdNotIn(memberIds);
    }

    // ================= ADD MEMBER TO GROUP =================
    @PostMapping("/{groupId}/members/{userId}")
    public Group addMember(
            @PathVariable Long groupId,
            @PathVariable Long userId,
            @RequestParam Long requesterId
    ) {
        Group group = groupRepo.findById(groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        // 🔒 ONLY CREATOR
        if (!group.getCreatedBy().getId().equals(requesterId)) {
            throw new RuntimeException("Only creator can add members");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        group.getMembers().add(user);
        return groupRepo.save(group);
    }
}
