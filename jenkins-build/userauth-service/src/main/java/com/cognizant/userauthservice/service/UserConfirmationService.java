package com.cognizant.userauthservice.service;

import javax.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cognizant.userauthservice.dao.UserConfirmationRepository;
import com.cognizant.userauthservice.dao.UserRepository;
import com.cognizant.userauthservice.model.UserConfirmation;
import com.cognizant.userauthservice.model.User;

@Service
public class UserConfirmationService {

	@Autowired
	UserConfirmationRepository confirmationRepository;
	@Autowired
	UserRepository userRepository;
	private static final String ALPHA_NUMERIC_STRING = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

	@Transactional
	public String setTokenForConfirmation(String userId) {
		String token=randomAlphaNumeric();
		UserConfirmation userConfirmation = new UserConfirmation(1, token, userId);
		confirmationRepository.save(userConfirmation);
		return token;
	}
	@Transactional
	public void confirmMailAddress(String token) {
		UserConfirmation userConfirmation=confirmationRepository.findByToken(token);
		if(userConfirmation!=null) {
			confirmationRepository.delete(userConfirmation);
			User user = userRepository.findByUserName(userConfirmation.getUserId());
			user.setConfirmed(true);
			userRepository.save(user);
		}
	}
	public static String randomAlphaNumeric() {

		int count = 10;
		StringBuilder builder = new StringBuilder();

		while (count-- != 0) {

			int character = (int) (Math.random() * ALPHA_NUMERIC_STRING.length());

			builder.append(ALPHA_NUMERIC_STRING.charAt(character));

		}

		return builder.toString();

	}
}
