package com.rishi.stocktrader;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

@Controller
@RequestMapping("/login")
public class LoginController {

	@RequestMapping("/loginpage")
	public String showForm() {
		return "login";
	}
	
	@RequestMapping("/loginexec")
	public String loginexec() {
		return "welcome";
	}
	
	@RequestMapping("/processUp")
	public String upper(@RequestParam("name") String n, Model model) {
		n=n.toUpperCase();
		String result="YO " + n;
		model.addAttribute("message",result);
		return "welcome";
	}
	
	@RequestMapping("/regpage")
	public String showregForm() {
		return "newuser";
	}
}
