package com.cherry.manager.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cherry.manager.dto.ExpensesDTO;
import com.cherry.manager.entity.CategoryEntity;
import com.cherry.manager.entity.ExpenseEntity;
import com.cherry.manager.entity.ProfileEntity;
import com.cherry.manager.repository.CategoryRepostiory;
import com.cherry.manager.repository.ExpenseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ExpenseService {
	private final CategoryService categoryService;
	private final ExpenseRepository expenseRepository;
	private final ProfileService profileService;
	private final CategoryRepostiory categoryRepostiory;
	
	public ExpensesDTO addExpenses(ExpensesDTO dto) {
		ProfileEntity profile = profileService.getCurrentProfile();
		CategoryEntity categery = categoryRepostiory.findById(dto.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));
		ExpenseEntity newExpense = toEntity(dto, profile, categery);
		newExpense = expenseRepository.save(newExpense);
		return toDTO(newExpense);
	}
	
	public List<ExpensesDTO> getCurrentMonthExpensesForCurrentuser() {
		ProfileEntity profile = profileService.getCurrentProfile();
		LocalDate now = LocalDate.now();
		LocalDate startDate = now.withDayOfMonth(1);
		LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
		List<ExpenseEntity> list = expenseRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);
		return list.stream().map(this::toDTO).toList();
	}
	
	private ExpenseEntity toEntity(ExpensesDTO dto, ProfileEntity profile, CategoryEntity category) {
		return ExpenseEntity.builder()
				.name(dto.getName())
				.icon(dto.getIcon())
				.amount(dto.getAmount())
				.date(dto.getDate())
				.profile(profile)
				.category(category)
				.build();
	}
	
	private ExpensesDTO toDTO(ExpenseEntity entity) {
		return ExpensesDTO.builder()
			.id(entity.getId())
			.name(entity.getName())
			.icon(entity.getIcon())
			.categoryId(entity.getCategory() != null ? entity.getCategory().getId() : null)
			.categoryName(entity.getCategory() != null ? entity.getCategory().getName() : "N/A")
			.amount(entity.getAmount())
			.date(entity.getDate())
			.createdAt(entity.getCreatedAt())
			.updatedAt(entity.getUpdatedAt())
			.build();
	}
}
