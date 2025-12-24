package com.example.demo.model;

import jakarta.persistence.*;

@Entity
@Table(name = "balances")
@IdClass(BalanceId.class)
public class Balance {

    @Id
    private Long groupId;

    @Id
    private Long fromUser;

    @Id
    private Long toUser;

    private Double amount;

    public Long getGroupId() { return groupId; }
    public void setGroupId(Long groupId) { this.groupId = groupId; }

    public Long getFromUser() { return fromUser; }
    public void setFromUser(Long fromUser) { this.fromUser = fromUser; }

    public Long getToUser() { return toUser; }
    public void setToUser(Long toUser) { this.toUser = toUser; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }
}
