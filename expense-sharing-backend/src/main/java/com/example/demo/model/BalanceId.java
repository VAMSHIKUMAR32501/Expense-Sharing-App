package com.example.demo.model;

import java.io.Serializable;
import java.util.Objects;

public class BalanceId implements Serializable {

    private Long groupId;
    private Long fromUser;
    private Long toUser;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof BalanceId)) return false;
        BalanceId that = (BalanceId) o;
        return Objects.equals(groupId, that.groupId) &&
               Objects.equals(fromUser, that.fromUser) &&
               Objects.equals(toUser, that.toUser);
    }

    @Override
    public int hashCode() {
        return Objects.hash(groupId, fromUser, toUser);
    }
}
