package com.example.demo.dto;

import java.util.Map;

public class AddExpenseRequest {
    public Long groupId;
    public Long paidBy;
    public Double amount;
    public String splitType;
    public String title; 
    public String description;  
    public Map<Long, Double> splits;
}
