package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Group;
import com.example.demo.model.User;
import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {

    // Groups where user is a member
    List<Group> findByMembersContains(User user);

    // Groups created by user (admin groups)
    List<Group> findByCreatedBy(User user);
}

