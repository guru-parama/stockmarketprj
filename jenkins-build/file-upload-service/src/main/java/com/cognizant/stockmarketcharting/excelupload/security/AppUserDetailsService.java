package com.cognizant.stockmarketcharting.excelupload.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.cognizant.stockmarketcharting.excelupload.model.User;
import com.cognizant.stockmarketcharting.excelupload.repository.UserRepository;

@Service
public class AppUserDetailsService implements UserDetailsService {

	@Autowired
	UserRepository userRepository;
	
	public AppUserDetailsService(UserRepository userRepository) {
		super();
		this.userRepository = userRepository;
	}


	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		
		AppUser appUser;
		User user = userRepository.findByUsername(username);
		if(user.getUsername() == null) {
			throw new UsernameNotFoundException("User not found"); 
		}else {
			appUser = new AppUser(user);  
		}
		return appUser; 
	}
	
	
	

}
