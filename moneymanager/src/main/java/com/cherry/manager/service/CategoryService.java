package com.cherry.manager.service;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.cherry.manager.dto.CategoryDTO;
import com.cherry.manager.entity.CategoryEntity;
import com.cherry.manager.entity.ProfileEntity;
import com.cherry.manager.repository.CategoryRepostiory;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryService {
	private final ProfileService profileService;
	private final CategoryRepostiory categoryRepostiory;
	
	private CategoryEntity toEntity(CategoryDTO categoryDTO, ProfileEntity profile) {
		return CategoryEntity.builder()
				.name(categoryDTO.getName())
				.icon(categoryDTO.getIcon())
				.profile(profile)
				.type(categoryDTO.getType())
				.build();
	}
	
	private CategoryDTO toDTO(CategoryEntity entity) {
		return CategoryDTO.builder()
				.id(entity.getId())
				.profileId(entity.getProfile() != null ? entity.getProfile().getId() : null)
				
	}
}
