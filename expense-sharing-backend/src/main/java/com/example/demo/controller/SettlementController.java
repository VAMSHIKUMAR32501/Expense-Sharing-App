package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import com.example.demo.dto.SettlementRequest;
import com.example.demo.service.SettlementService;

@RestController
@RequestMapping("/settle")
@CrossOrigin
public class SettlementController {

    private final SettlementService service;

    public SettlementController(SettlementService service) {
        this.service = service;
    }

    @PostMapping
    public void settle(@RequestBody SettlementRequest req) {
        service.settle(req);
    }
}
