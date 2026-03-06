package com.cherry.manager.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Service;

import com.cherry.manager.dto.ExpenseDTO;
import com.cherry.manager.dto.IncomeDTO;
import com.cherry.manager.entity.ProfileEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class DashboardService {
	private final IncomeService incomeService;
	private final ExpenseService expenseService;
	private final ProfileService profileService;
	
	public Map<String, Object> getDashboardData() {
		ProfileEntity profile = profileService.getCurrentProfile();
		Map<String, Object> returnValue = new HashMap<>();
		List<IncomeDTO> latestIncomes = incomeService.getLatest5ExpensesForCurrentUser();
		List<ExpenseDTO> latestExpenses = expenseService.getLatest5ExpensesForCurrentUser();
		concat(latestIncomes.stream().map(income -> RecentTransactionDTO));
	}
}
