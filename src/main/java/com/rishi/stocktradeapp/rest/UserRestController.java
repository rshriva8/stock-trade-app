package com.rishi.stocktradeapp.rest;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.rishi.stocktradeapp.entity.User;
import com.rishi.stocktradeapp.service.UserService;

@RestController
@RequestMapping("/userapi")
public class UserRestController {
	
	private UserService userService;
	
	@Autowired
	public UserRestController(UserService theUserService) {
		userService=theUserService;
	}
	
	@GetMapping("/users")
	public List<User> findAll(){
		return userService.findAll();
	}
	@GetMapping("/users/{userId}")
	public User findById(@PathVariable int userId){
		User theUser = userService.findById(userId);
		if(theUser==null) throw new RuntimeException("User ID not found - "+userId);
		else return theUser;
	}
	@PostMapping("/users")
	public User saveUser(@RequestBody User theUser){
		theUser.setId(0);
		userService.save(theUser);
		return theUser;
	}
	@PutMapping("/users")
	public User updateUser(@RequestBody User theUser) {
		userService.save(theUser);
		return theUser;
	}
	@DeleteMapping("/users/{userId}")
	public String deleteUser(@PathVariable int userId) {
		User theUser = userService.findById(userId);
		if(theUser==null) throw new RuntimeException("User ID not found - "+userId);
		else {
			userService.deleteById(userId);
		}
		return userId+" has been deleted";
	}
}
