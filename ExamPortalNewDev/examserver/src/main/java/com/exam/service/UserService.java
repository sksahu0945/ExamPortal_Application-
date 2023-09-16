package com.exam.service;

import java.util.Set;

import com.exam.helper.UserFoundException;
import com.exam.model.User;
import com.exam.model.UserRole;

/**
 * This is a User Service interface
 * @author Sachin R
 *
 */
public interface UserService {
	
	/**
	 * This is create method used to create new user
	 * @param user
	 * @param userRoles
	 * @return user data
	 * @throws Exception 
	 * @throws UserFoundException 
	 */
	public User createUser(User user, Set<UserRole> userRoles) throws UserFoundException;

	
	/**
	 * This method used to show the data
	 * @param username
	 * @return user data
	 */
	public User getUser(String username);
	
	
	/**
	 * This method used to show the data by using user id
	 * @param userId
	 */
	public void deleteUser(Long userId);
}
