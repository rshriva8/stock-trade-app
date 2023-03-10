package com.rishi.stocktrader;

import java.util.LinkedHashMap;
import java.util.Locale;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import javax.validation.constraints.Size;

import com.rishi.stocktrader.validation.YesVal;


public class AppUser {
	
	
	private String firstName;
	@NotNull(message="is required")
	@Size(min=1, message="is required")
	private String lastName;
	private String country;
	private LinkedHashMap<String,String> countryOptions;
	private String gender;
	@NotNull
	@Min(value=18, message="must be 18 years or older")
	private Integer age;
	@Pattern(regexp="^[a-zA-Z0-9]{5}", message="only 5 chars")
	private String zipCode;
	@NotNull
	@YesVal
	private String yesval;
	public String getYesval() {
		return yesval;
	}

	public void setYesval(String yesval) {
		this.yesval = yesval;
	}

	public LinkedHashMap<String, String> getCountryOptions() {
		return countryOptions;
	}

	public AppUser() {
		countryOptions=new LinkedHashMap<>();
		for(Locale locale:Locale.getAvailableLocales())
		countryOptions.put(locale.getCountry(),locale.getDisplayCountry());
	}
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}

	public Integer getAge() {
		return age;
	}

	public void setAge(Integer age) {
		this.age = age;
	}

	public String getZipCode() {
		return zipCode;
	}

	public void setZipCode(String zipCode) {
		this.zipCode = zipCode;
	}
}
