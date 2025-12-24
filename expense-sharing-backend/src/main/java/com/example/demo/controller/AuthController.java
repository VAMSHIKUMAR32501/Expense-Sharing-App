package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.*;
import com.example.demo.model.User;
import com.example.demo.service.AuthService;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public User register(@RequestBody RegisterRequest req) {
        return service.register(req);
    }

    @PostMapping("/login")
    public User login(@RequestBody LoginRequest req) {
        return service.login(req);
    }
}
