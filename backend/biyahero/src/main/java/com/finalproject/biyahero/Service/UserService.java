package com.finalproject.biyahero.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.finalproject.biyahero.Repository.UserRepository;
import com.finalproject.biyahero.Entity.UserEntity;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public boolean authenticate(String email, String password) {
        return userRepository.findByEmail(email)
            .map(user -> user.getPassword().equals(password))
            .orElse(false);
    }

    public Optional<UserEntity> authenticateAndGetUser(String email, String password) {
        return userRepository.findByEmail(email)
            .filter(user -> user.getPassword().equals(password));
    }

    public boolean register(String email, String password, String firstName, String lastName, String username) {
        if (userRepository.findByEmail(email).isPresent()) {
            return false;
        }
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already taken");
        }

        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPassword(password); 
        user.setFirstName(firstName);
        user.setLastName(lastName);
        user.setUsername(username);
        user.setRole("USER");

        userRepository.save(user);

        return true;
    }

    public Optional<UserEntity> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }

    public boolean updatePassword(String username, String newPassword) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            user.setPassword(newPassword); 
            userRepository.save(user);
            return true;
        }
        return false;
    }
}