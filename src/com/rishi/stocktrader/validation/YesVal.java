package com.rishi.stocktrader.validation;

import static java.lang.annotation.ElementType.FIELD;
import static java.lang.annotation.ElementType.METHOD;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import javax.validation.Constraint;
import javax.validation.Payload;

@Constraint(validatedBy = YesValConstraintValidator.class)
@Retention(RUNTIME)
@Target({ FIELD, METHOD })
public @interface YesVal {
	
	public String value() default "Yes";
	
	public String message() default "must agree to the terms and conditions";
	
	public Class<?>[] groups() default {};
	
	public Class<? extends Payload>[] payload() default {};
	
}
