package com.finalproject.biyahero.Controller;

import com.finalproject.biyahero.Entity.BookingEntity;
import com.finalproject.biyahero.Entity.PaymentEntity;
import com.finalproject.biyahero.Repository.BookingRepository;
import com.finalproject.biyahero.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/api/payments")
@CrossOrigin(origins = "http://localhost:5173")
public class PaymentController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    // Create a new payment record
    @PostMapping("/create")
    public PaymentEntity createPayment(@RequestBody PaymentEntity payment) {
        return paymentRepository.save(payment);
    }

    @GetMapping("/all")
    public List<PaymentEntity> getAllPayments() {
        return paymentRepository.findAll();
    }

    // Get payment by booking ID
    @GetMapping("/by-booking/{bookingId}")
    public PaymentEntity getPaymentByBookingId(@PathVariable Long bookingId) {
        return paymentRepository.findByBookingId(bookingId);
    }
    
    @GetMapping("/with-bookings")
    public List<Map<String, Object>> getBookingsWithPayments() {
    List<PaymentEntity> payments = paymentRepository.findAll();
    List<Map<String, Object>> result = new ArrayList<>();

    for (PaymentEntity payment : payments) {
        Map<String, Object> paymentMap = new HashMap<>();
        paymentMap.put("id", payment.getId());
        paymentMap.put("amountPaid", payment.getAmountPaid());
        paymentMap.put("method", payment.getMethod());
        paymentMap.put("paymentDate", payment.getPaymentDate());

        BookingEntity booking = bookingRepository.findById(payment.getBookingId()).orElse(null);
        if (booking != null) {
            Map<String, Object> bookingMap = new HashMap<>();
            bookingMap.put("id", booking.getId());
            bookingMap.put("terminal", booking.getTerminal());
            bookingMap.put("destination", booking.getDestination());
            bookingMap.put("date", booking.getDate());
            bookingMap.put("busType", booking.getBusType());
            bookingMap.put("passengerCount", booking.getPassengerCount());
            paymentMap.put("booking", bookingMap);
        } else {
            paymentMap.put("booking", null);
        }

        result.add(paymentMap);
    }

    return result;
}

}
