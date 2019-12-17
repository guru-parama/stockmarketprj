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
import com.cognizant.userauthservice.model.User;
import com.cognizant.userauthservice.service.EmailServiceImpl;
import com.cognizant.userauthservice.service.UserConfirmationService;
import com.cognizant.userauthservice.service.UserService;


@RestController
@CrossOrigin("*")
@RequestMapping("/stockmarket")
public class UserController {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
	
	@Autowired
	PasswordEncoder passwordEncoder; 
	
	@Autowired
	EmailServiceImpl emailServiceImpl;
	
	@Autowired
	UserService userService;
	
	@Autowired
	UserConfirmationService userConfirmationService;
	
	@PostMapping("/signup")
	public void signup(@RequestBody @Valid User user) throws UserAlreadyExistsException {
	
		LOGGER.info("Start");
		String token = userConfirmationService.setTokenForConfirmation(user.getUserName());
		emailServiceImpl.send("ctstestmail10@gmail.com", user.getEmail(), "test",  "Click the link to activate http://localhost:8086/userauth-service/stockmarket/confirm/"+token);
		user.setConfirmed(false);
		userService.signup(user);
		LOGGER.info("End");
	}
	

	@GetMapping("/confirm/{token}")
	public void confirmMail(@PathVariable String token) {
		userConfirmationService.confirmMailAddress(token);
	}
	
	@GetMapping("/user/{userName}")
	public User findByUserName(@PathVariable String userName) {
		LOGGER.info("Start");
		return userService.findByUserName(userName);
	}
	
}
