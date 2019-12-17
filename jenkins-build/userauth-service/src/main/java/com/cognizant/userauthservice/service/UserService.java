package com.cognizant.userauthservice.service;

import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.cognizant.userauthservice.dao.UserRepository;
import com.cognizant.userauthservice.exception.UserAlreadyExistsException;
import com.cognizant.userauthservice.model.Role;
import com.cognizant.userauthservice.model.User;

@Service
public class UserService {

	@Autowired
	UserRepository userRepository;
	
	@Autowired 
	PasswordEncoder encoder;
	
	private static final Logger LOGGER = LoggerFactory.getLogger(UserService.class);
	
	@SuppressWarnings("unchecked")
	public void signup(User user) throws UserAlreadyExistsException {
		LOGGER.info("Start");
		if(userRepository.findByUserName(user.getUserName()) != null) {
			throw new UserAlreadyExistsException();
		}else {
			@SuppressWarnings("rawtypes")
			Set<Role> roleList = new HashSet();
			roleList.add(new Role(2,"user"));
			String encodedPassword = encoder.encode(user.getPassword());
			user.setPassword(encodedPassword);
			user.setRoleList(roleList);
			userRepository.save(user);
		}
		LOGGER.info("End");
	}
	
	public User findByUserName(String userName) {
		LOGGER.info("Start");
		return userRepository.findByUserName(userName);
	}
	
}
