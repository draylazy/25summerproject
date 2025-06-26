package com.finalproject.biyahero.Controller;

import com.finalproject.biyahero.Entity.PaymentEntity;
import com.finalproject.biyahero.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private PaymentRepository paymentRepository;

    // Create a new payment record
    @PostMapping("/create")
    public PaymentEntity createPayment(@RequestBody PaymentEntity payment) {
        return paymentRepository.save(payment);
    }

    // Get all payments
    @GetMapping("/all")
    public List<PaymentEntity> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Get payment by booking ID
    @GetMapping("/by-booking/{bookingId}")
    public PaymentEntity getPaymentByBookingId(@PathVariable Long bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }
}
