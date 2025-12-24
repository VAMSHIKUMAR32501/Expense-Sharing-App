package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.Balance;
import com.example.demo.model.BalanceId;

import java.util.List;
import java.util.Optional;

public interface BalanceRepository extends JpaRepository<Balance, BalanceId> {

    Optional<Balance> findByGroupIdAndFromUserAndToUser(
        Long groupId,
        Long fromUser,
        Long toUser
    );

    List<Balance> findByGroupId(Long groupId);

    List<Balance> findByFromUserOrToUser(Long fromUser, Long toUser);
}
