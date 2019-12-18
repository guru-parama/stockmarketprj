package com.cognizant.userauthservice.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Repository;

import com.cognizant.userauthservice.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer>{

	@Query(value="SELECT u from User u where u.username = :username ")
	public User findByUserName(@Param("username") String username) throws UsernameNotFoundException;

}
