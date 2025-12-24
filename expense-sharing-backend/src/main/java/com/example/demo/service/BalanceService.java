package com.example.demo.service;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.example.demo.dto.BalanceOverview;
import com.example.demo.model.Balance;
import com.example.demo.model.Expense;
import com.example.demo.model.Group;
import com.example.demo.repository.BalanceRepository;
import com.example.demo.repository.ExpenseRepository;
import com.example.demo.repository.GroupRepository;

@Service
public class BalanceService {

    private final BalanceRepository balanceRepo;
    private final ExpenseRepository expenseRepo;
    private final GroupRepository groupRepo; 

    public BalanceService(
        BalanceRepository balanceRepo,
        ExpenseRepository expenseRepo,
        GroupRepository groupRepo 
    ) {
        this.balanceRepo = balanceRepo;
        this.expenseRepo = expenseRepo;
        this.groupRepo = groupRepo;
    }

    // ================= ADD / UPDATE BALANCE =================
    public void addBalance(Long groupId, Long from, Long to, Double amount) {

        if (from.equals(to) || amount <= 0) return;

        var reverseOpt =
            balanceRepo.findByGroupIdAndFromUserAndToUser(groupId, to, from);

        if (reverseOpt.isPresent()) {
            Balance reverse = reverseOpt.get();

            if (reverse.getAmount() > amount) {
                reverse.setAmount(reverse.getAmount() - amount);
                balanceRepo.save(reverse);
                return;
            } else {
                amount -= reverse.getAmount();
                balanceRepo.delete(reverse);
            }
        }

        if (amount <= 0) return;

        var existingOpt =
            balanceRepo.findByGroupIdAndFromUserAndToUser(groupId, from, to);

        if (existingOpt.isPresent()) {
            Balance existing = existingOpt.get();
            existing.setAmount(existing.getAmount() + amount);
            balanceRepo.save(existing);
        } else {
            Balance b = new Balance();
            b.setGroupId(groupId);
            b.setFromUser(from);
            b.setToUser(to);
            b.setAmount(amount);
            balanceRepo.save(b);
        }
    }

    // ================= SETTLE =================
    public void settle(Long groupId, Long fromUser, Long toUser, Double amount) {

        var balanceOpt =
            balanceRepo.findByGroupIdAndFromUserAndToUser(groupId, fromUser, toUser);

        if (balanceOpt.isEmpty()) {
            throw new RuntimeException("No balance to settle");
        }

        Balance balance = balanceOpt.get();

        if (amount >= balance.getAmount()) {
            balanceRepo.delete(balance);
        } else {
            balance.setAmount(balance.getAmount() - amount);
            balanceRepo.save(balance);
        }
    }

    // ================= BALANCE OVERVIEW =================
    public BalanceOverview getBalanceOverview(Long userId) {

        double lifetimeYouOwe = 0;
        double lifetimeOwedToYou = 0;

        List<Expense> expenses = expenseRepo.findAll();

        for (Expense e : expenses) {

            Group group = groupRepo.findById(e.getGroupId())
                    .orElseThrow();

            int memberCount = group.getMembers().size();
            double share = e.getAmount() / memberCount;

            if (e.getPaidBy().equals(userId)) {
                lifetimeOwedToYou += share * (memberCount - 1);
            } else if (
                group.getMembers().stream()
                    .anyMatch(u -> u.getId().equals(userId))
            ) {
                lifetimeYouOwe += share;
            }
        }

        double netBalance = 0;
        List<Balance> balances =
            balanceRepo.findByFromUserOrToUser(userId, userId);

        for (Balance b : balances) {
            if (b.getFromUser().equals(userId)) netBalance -= b.getAmount();
            if (b.getToUser().equals(userId)) netBalance += b.getAmount();
        }

        return new BalanceOverview(
            lifetimeYouOwe,
            lifetimeOwedToYou,
            netBalance
        );
    }

}
