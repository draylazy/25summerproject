package com.finalproject.biyahero.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;  
import org.springframework.stereotype.Service;
import com.finalproject.biyahero.Repository.UserRepository;
import com.finalproject.biyahero.Entity.UserEntity;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;  

    public boolean authenticate(String email, String rawPassword) {
        return userRepository.findByEmail(email)
            .map(user -> passwordEncoder.matches(rawPassword, user.getPassword()))
            .orElse(false);
    }

    public Optional<UserEntity> authenticateAndGetUser(String email, String rawPassword) {
        return userRepository.findByEmail(email)
            .filter(user -> passwordEncoder.matches(rawPassword, user.getPassword())); 
    }

    public boolean register(String email, String rawPassword, String firstName, String lastName, String username) {
        if (userRepository.findByEmail(email).isPresent()) {
            return false;
        }
        if (userRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already taken");
        }

        UserEntity user = new UserEntity();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(rawPassword)); 
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

    public boolean updatePassword(String username, String rawNewPassword) {
        Optional<UserEntity> userOpt = userRepository.findByUsername(username);
        if (userOpt.isPresent()) {
            UserEntity user = userOpt.get();
            user.setPassword(passwordEncoder.encode(rawNewPassword)); 
            userRepository.save(user);
            return true;
        }
        return false;
    }

            public boolean updateProfile(String username, String email, String firstName, String lastName) {
            Optional<UserEntity> userOpt = userRepository.findByUsername(username);
            if (userOpt.isPresent()) {
                UserEntity user = userOpt.get();
                user.setEmail(email);
                user.setFirstName(firstName);
                user.setLastName(lastName);
                userRepository.save(user);
                return true;
            }
            return false;
        }

}
