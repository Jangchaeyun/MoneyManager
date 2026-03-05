package com.cherry.manager.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cherry.manager.dto.IncomeDTO;
import com.cherry.manager.service.IncomeService;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/incomes")
public class IncomeController {
	private final IncomeService incomeService;
	
	@PostMapping
	public ResponseEntity<IncomeDTO> addExpense(@RequestBody IncomeDTO dto) {
		IncomeDTO saved = incomeService.addIncomes(dto);
		return ResponseEntity.status(HttpStatus.CREATED).body(saved);
	}
}
