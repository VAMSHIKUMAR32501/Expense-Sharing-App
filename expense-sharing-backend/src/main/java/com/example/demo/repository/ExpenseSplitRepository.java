package com.example.demo.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.demo.model.ExpenseSplit;

public interface ExpenseSplitRepository extends JpaRepository<ExpenseSplit, Long> {}
