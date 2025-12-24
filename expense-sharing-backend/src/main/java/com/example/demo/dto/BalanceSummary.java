package com.example.demo.dto;

public class BalanceSummary {

    public double totalOwe;
    public double totalOwedToYou;

    public BalanceSummary(double totalOwe, double totalOwedToYou) {
        this.totalOwe = totalOwe;
        this.totalOwedToYou = totalOwedToYou;
    }
}
