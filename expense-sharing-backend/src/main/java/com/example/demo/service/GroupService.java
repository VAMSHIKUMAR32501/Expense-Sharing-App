package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.example.demo.model.Group;
import com.example.demo.repository.GroupRepository;

import java.util.List;

@Service
public class GroupService {

    private final GroupRepository repo;

    public GroupService(GroupRepository repo) {
        this.repo = repo;
    }

    public Group create(Group g) {
        return repo.save(g);
    }

    public List<Group> getAll() {
        return repo.findAll();
    }
}
