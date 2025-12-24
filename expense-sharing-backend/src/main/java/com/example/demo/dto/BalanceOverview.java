// BalanceOverview.java
package com.example.demo.dto;

public class BalanceOverview {

    public double lifetimeYouOwe;
    public double lifetimeOwedToYou;
    public double netBalance;

    public BalanceOverview(
        double lifetimeYouOwe,
        double lifetimeOwedToYou,
        double netBalance
    ) {
        this.lifetimeYouOwe = lifetimeYouOwe;
        this.lifetimeOwedToYou = lifetimeOwedToYou;
        this.netBalance = netBalance;
    }
}
