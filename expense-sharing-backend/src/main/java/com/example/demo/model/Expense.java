package com.example.demo.model;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "expenses")
public class Expense {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long groupId;
    private Long paidBy;
    private Double amount;
    private String splitType;
    private int splitCount;

    public int getSplitCount() {
		return splitCount;
	}

	public void setSplitCount(int splitCount) {
		this.splitCount = splitCount;
	}

	private String title;
    public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	private String description; // food, travel, rent
    public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	private LocalDateTime createdAt; // ✅ NEW

    @PrePersist
    public void onCreate() {
        this.createdAt = LocalDateTime.now();
    }

    // getters & setters
    public Long getId() { return id; }

    public Long getGroupId() { return groupId; }
    public void setGroupId(Long groupId) { this.groupId = groupId; }

    public Long getPaidBy() { return paidBy; }
    public void setPaidBy(Long paidBy) { this.paidBy = paidBy; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getSplitType() { return splitType; }
    public void setSplitType(String splitType) { this.splitType = splitType; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}
