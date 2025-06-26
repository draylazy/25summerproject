package com.finalproject.biyahero.Repository;

import com.finalproject.biyahero.Entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookingRepository extends JpaRepository<BookingEntity, Long> {
    // JpaRepository already provides basic CRUD operations:
    // save(), findById(), findAll(), deleteById(), etc.
}
