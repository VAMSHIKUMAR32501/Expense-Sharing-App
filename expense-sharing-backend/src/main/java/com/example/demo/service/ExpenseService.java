package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.example.demo.dto.AddExpenseRequest;
import com.example.demo.model.Expense;
import com.example.demo.model.Group;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.GroupRepository;

import java.util.List;
import java.util.Map;

@Service
public class ExpenseService {

    private final ExpenseRepository expenseRepo;
    private final BalanceService balanceService;
    private final GroupRepository groupRepo;

    public ExpenseService(
        ExpenseRepository expenseRepo,
        BalanceService balanceService,
        GroupRepository groupRepo
    ) {
        this.expenseRepo = expenseRepo;
        this.balanceService = balanceService;
        this.groupRepo = groupRepo;
    }

    public Expense add(AddExpenseRequest req, Long requesterId) {

        Group group = groupRepo.findById(req.groupId)
                .orElseThrow(() -> new RuntimeException("Group not found"));

        // ✅ requester MUST be a group member
        boolean requesterIsMember = group.getMembers().stream()
                .anyMatch(u -> u.getId().equals(requesterId));

        if (!requesterIsMember) {
            throw new RuntimeException("Only group members can add expenses");
        }

        // ✅ paidBy MUST be the requester
        if (!req.paidBy.equals(requesterId)) {
            throw new RuntimeException("PaidBy must be the logged-in user");
        }

        // ✅ validate split users are members
        for (Long userId : req.splits.keySet()) {
            boolean isMember = group.getMembers().stream()
                    .anyMatch(u -> u.getId().equals(userId));

            if (!isMember) {
                throw new RuntimeException(
                    "User " + userId + " is not a member of this group"
                );
            }
        }

        // ✅ SAVE EXPENSE (history is permanent)
        Expense expense = new Expense();
        expense.setGroupId(req.groupId);
        expense.setPaidBy(req.paidBy);
        expense.setTitle(req.title);          // ✅ FIX: store expense name
        expense.setAmount(req.amount);
        expense.setSplitType(req.splitType);
        expense.setSplitCount(req.splits.size());


        expenseRepo.save(expense);

        // ===== SPLIT LOGIC =====

        if ("EQUAL".equals(req.splitType)) {
            double share = req.amount / req.splits.size();

            for (Long user : req.splits.keySet()) {
                if (!user.equals(req.paidBy)) {
                    balanceService.addBalance(
                        req.groupId,
                        user,
                        req.paidBy,
                        share
                    );
                }
            }
        }

        else if ("EXACT".equals(req.splitType)) {
            for (Map.Entry<Long, Double> e : req.splits.entrySet()) {
                if (!e.getKey().equals(req.paidBy)) {
                    balanceService.addBalance(
                        req.groupId,
                        e.getKey(),
                        req.paidBy,
                        e.getValue()
                    );
                }
            }
        }

        else if ("PERCENT".equals(req.splitType)) {
            for (Map.Entry<Long, Double> e : req.splits.entrySet()) {
                if (!e.getKey().equals(req.paidBy)) {
                    double amt = req.amount * (e.getValue() / 100);
                    balanceService.addBalance(
                        req.groupId,
                        e.getKey(),
                        req.paidBy,
                        amt
                    );
                }
            }
        }

        else {
            throw new RuntimeException("Invalid split type");
        }

        return expense;
    }

    // ✅ HISTORY API (used in GroupDetails)
    public List<Expense> getExpensesByGroup(Long groupId) {
        return expenseRepo.findByGroupId(groupId);
    }
}
