package com.cognizant.userauthservice.controller;

import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.cognizant.userauthservice.exception.UserAlreadyExistsException;
import com.cognizant.userauthservice.model.Users;
import com.cognizant.userauthservice.service.UserService;


@RestController
@CrossOrigin("*")
@RequestMapping("/stockmarket")
public class UserController {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	PasswordEncoder passwordEncoder; 
	
	@Autowired
	UserService userService;
	
	@PostMapping("/signup")
	public void signup(@RequestBody @Valid Users user) throws UserAlreadyExistsException {
	
		LOGGER.info("Start");
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		userService.signup(user);
		LOGGER.info("End");
	}
	
	@GetMapping("/user/{userName}")
	public Users findByUserName(@PathVariable String userName) {
		LOGGER.info("Start");
		return userService.findByUserName(userName);
	}
	
}
