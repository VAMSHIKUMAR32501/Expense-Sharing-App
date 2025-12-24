package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.User;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {

    // All users EXCEPT those in given list
    List<User> findByIdNotIn(List<Long> ids);
    User findByEmail(String email);
}
