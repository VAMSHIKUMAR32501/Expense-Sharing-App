package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.AddExpenseRequest;
import com.example.demo.model.Expense;
import com.example.demo.service.ExpenseService;

@RestController
@RequestMapping("/expenses")
@CrossOrigin
public class ExpenseController {

    private final ExpenseService service;

    public ExpenseController(ExpenseService service) {
        this.service = service;
    }

    // ================= ADD EXPENSE =================
    // Only group creator can add
    @PostMapping
    public Expense add(
            @RequestParam Long requesterId,
            @RequestBody AddExpenseRequest req
    ) {
        return service.add(req, requesterId);
    }

    // ================= GROUP EXPENSE HISTORY =================
    @GetMapping("/group/{groupId}")
    public List<Expense> getGroupExpenses(
            @PathVariable Long groupId
    ) {
        return service.getExpensesByGroup(groupId);
    }
}
