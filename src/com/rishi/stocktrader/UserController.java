package com.rishi.stocktrader;

import javax.validation.Valid;

import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/user")
public class UserController {
	
	@RequestMapping("/register")
	public String showForm(Model model) {
		AppUser user=new AppUser();
		
		model.addAttribute("user",user);
		return "newuser";
	}
	
	@InitBinder
	public void initBinder(WebDataBinder dataBinder) {
		StringTrimmerEditor stringTrimmerEditor=new StringTrimmerEditor(true);
		dataBinder.registerCustomEditor(String.class, stringTrimmerEditor);
	}
	
	@RequestMapping("/register-user")
	public String regUser(@Valid @ModelAttribute("user") AppUser user, BindingResult bindingResult) {
		if(bindingResult.hasErrors()) return "newuser";
		else{
			System.out.println(user.getFirstName());
			System.out.println(user.getLastName());
			System.out.println(user.getCountry());
			System.out.println(user.getAge());
			System.out.println(user.getZipCode());
			return "new-user-confirmation";
		}
	}	
}
