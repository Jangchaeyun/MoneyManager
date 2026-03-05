package com.cherry.manager.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.stereotype.Service;

import com.cherry.manager.dto.IncomeDTO;
import com.cherry.manager.entity.CategoryEntity;
import com.cherry.manager.entity.IncomeEntity;
import com.cherry.manager.entity.ProfileEntity;
import com.cherry.manager.repository.CategoryRepostiory;
import com.cherry.manager.repository.IncomeRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class IncomeService {
	private final CategoryService categoryService;
	private final IncomeRepository incomeRepository;
	private final ProfileService profileService;
	private final CategoryRepostiory categoryRepostiory;
	
	public IncomeDTO addIncomes(IncomeDTO dto) {
		ProfileEntity profile = profileService.getCurrentProfile();
		CategoryEntity categery = categoryRepostiory.findById(dto.getCategoryId())
				.orElseThrow(() -> new RuntimeException("Category not found"));
		IncomeEntity newIncome = toEntity(dto, profile, categery);
		newIncome = incomeRepository.save(newIncome);
		return toDTO(newIncome);
	}
	
	public List<IncomeDTO> getCurrentMonthIncomesForCurrentuser() {
		ProfileEntity profile = profileService.getCurrentProfile();
		LocalDate now = LocalDate.now();
		LocalDate startDate = now.withDayOfMonth(1);
		LocalDate endDate = now.withDayOfMonth(now.lengthOfMonth());
		List<IncomeEntity> list = incomeRepository.findByProfileIdAndDateBetween(profile.getId(), startDate, endDate);
		return list.stream().map(this::toDTO).toList();
	}
	
	private IncomeEntity toEntity(IncomeDTO dto, ProfileEntity profile, CategoryEntity category) {
		return IncomeEntity.builder()
				.name(dto.getName())
				.icon(dto.getIcon())
				.amount(dto.getAmount())
				.date(dto.getDate())
				.profile(profile)
				.category(category)
				.build();
	}
	
	private IncomeDTO toDTO(IncomeEntity entity) {
		return IncomeDTO.builder()
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
