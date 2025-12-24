package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.example.demo.dto.*;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;

@Service
public class AuthService {

    private final UserRepository repo;

    public AuthService(UserRepository repo) {
        this.repo = repo;
    }

    // ================= REGISTER =================
    public User register(RegisterRequest req) {

        // 🔒 Prevent duplicate email
        User existing = repo.findByEmail(req.email);
        if (existing != null) {
            throw new RuntimeException("Email already registered");
        }

        User u = new User();
        u.setName(req.name);
        u.setEmail(req.email);
        u.setPassword(req.password); // plaintext (OK for now)

        return repo.save(u);
    }

    // ================= LOGIN =================
    public User login(LoginRequest req) {

        User user = repo.findByEmail(req.email);

        if (user == null) {
            throw new RuntimeException("User not found");
        }

        // 🔒 Password check
        if (!user.getPassword().equals(req.password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }
}
