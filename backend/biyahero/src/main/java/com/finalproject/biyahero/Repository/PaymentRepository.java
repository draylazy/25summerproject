package com.finalproject.biyahero.Repository;

import com.finalproject.biyahero.Entity.PaymentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PaymentRepository extends JpaRepository<PaymentEntity, Long> {
    PaymentEntity findByBookingId(Long bookingId);
}
