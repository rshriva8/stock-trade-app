package com.rishi.stocktrader.validation;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class YesValConstraintValidator implements ConstraintValidator<YesVal, String>{
	
	private String yesPrefix;

	@Override
	public void initialize(YesVal constraintAnnotation) {
		// TODO Auto-generated method stub
		yesPrefix=constraintAnnotation.value();
	}

	@Override
	public boolean isValid(String value, ConstraintValidatorContext context) {
		// TODO Auto-generated method stub
		boolean result=value.startsWith(yesPrefix);
		return result;
	}
	
}
