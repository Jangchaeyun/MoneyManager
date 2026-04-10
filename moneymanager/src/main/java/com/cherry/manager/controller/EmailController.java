package com.cherry.manager.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cherry.manager.entity.ProfileEntity;
import com.cherry.manager.service.EmailService;
import com.cherry.manager.service.ExcelService;
import com.cherry.manager.service.ExpenseService;
import com.cherry.manager.service.IncomeService;
import com.cherry.manager.service.ProfileService;

import jakarta.mail.MessagingException;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/email")
@RequiredArgsConstructor
public class EmailController {
	private final ExcelService excelService;
	private final IncomeService incomeService;
	private final ExpenseService expenseService;
	private final EmailService emailService;
	private final ProfileService profileService;
	
	@GetMapping("/income-excel")
	public ResponseEntity<Void> emailIncomeExcel() throws IOException, MessagingException {
		ProfileEntity profile = profileService.getCurrentProfile();
        ByteArrayOutputStream baos = new ByteArrayOutputStream();
        excelService.writeIncomesToExcel(baos, incomeService.getCurrentMonthIncomesForCurrentuser());
        emailService.sendEmailWithAttachment(profile.getEmail(),
                "소득 엑셀 보고서",
                "첨부된 소득 보고서를 참조하십시오.",
                baos.toByteArray(),
                "income.xlsx");
        return ResponseEntity.ok(null);
	}
	
	 @GetMapping("/expense-excel")
	    public ResponseEntity<Void> emailExpenseExcel() throws IOException, MessagingException {
	        ProfileEntity profile = profileService.getCurrentProfile();
	        ByteArrayOutputStream baos = new ByteArrayOutputStream();
	        excelService.writeExpensesToExcel(baos, expenseService.getCurrentMonthExpensesForCurrentuser());
	        emailService.sendEmailWithAttachment(
	                profile.getEmail(),
	                "지출 내역 엑셀 보고서",
	                "첨부된 파일은 귀하의 경비 보고서입니다.",
	                baos.toByteArray(),
	                "expenses.xlsx");
	        return ResponseEntity.ok(null);
	    }

}
