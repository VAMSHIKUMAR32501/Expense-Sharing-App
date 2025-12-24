package com.example.demo.controller;

import java.util.List;

import org.springframework.web.bind.annotation.*;

import com.example.demo.dto.BalanceOverview;
import com.example.demo.dto.BalanceSummary;
import com.example.demo.dto.SettleRequest;
import com.example.demo.model.Balance;
import com.example.demo.repository.BalanceRepository;
import com.example.demo.service.BalanceService;

@RestController
@RequestMapping("/balances")
@CrossOrigin(origins = "*")
public class BalanceController {

    private final BalanceRepository balanceRepository;
    private final BalanceService balanceService;

    public BalanceController(
            BalanceRepository balanceRepository,
            BalanceService balanceService
    ) {
        this.balanceRepository = balanceRepository;
        this.balanceService = balanceService;
    }

    // ================= USER BALANCES =================
    @GetMapping("/user/{userId}")
    public List<Balance> getUserBalances(@PathVariable Long userId) {
        return balanceRepository.findByFromUserOrToUser(userId, userId);
    }
    
    @GetMapping("/user/{userId}/overview")
    public BalanceOverview getOverview(@PathVariable Long userId) {
        return balanceService.getBalanceOverview(userId);
    }



    // ================= USER SUMMARY =================
    @GetMapping("/user/{userId}/summary")
    public BalanceSummary getUserSummary(@PathVariable Long userId) {

        List<Balance> balances =
                balanceRepository.findByFromUserOrToUser(userId, userId);

        double owe = 0;
        double owed = 0;

        for (Balance b : balances) {
            if (b.getFromUser().equals(userId)) owe += b.getAmount();
            if (b.getToUser().equals(userId)) owed += b.getAmount();
        }

        return new BalanceSummary(owe, owed);
    }

    // ================= SETTLE =================
    @PostMapping("/settle")
    public String settle(@RequestBody SettleRequest req) {

        balanceService.settle(
                req.groupId,
                req.fromUser,
                req.toUser,
                req.amount
        );

        return "Settled successfully";
    }
}
