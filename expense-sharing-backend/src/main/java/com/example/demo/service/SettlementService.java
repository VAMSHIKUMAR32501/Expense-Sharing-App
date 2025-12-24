package com.example.demo.service;

import org.springframework.stereotype.Service;
import com.example.demo.dto.SettlementRequest;
import com.example.demo.model.Balance;
import com.example.demo.repository.BalanceRepository;

@Service
public class SettlementService {

    private final BalanceRepository balanceRepository;

    public SettlementService(BalanceRepository balanceRepository) {
        this.balanceRepository = balanceRepository;
    }

    public void settle(SettlementRequest req) {
        Balance balance = new Balance();
        balance.setFromUser(req.fromUser);
        balance.setToUser(req.toUser);
        balance.setAmount(req.amount);

        balanceRepository.save(balance);
    }
}
