package com.finalproject.biyahero.Controller;

import com.finalproject.biyahero.Entity.BookingEntity;
import com.finalproject.biyahero.Entity.PaymentEntity;
import com.finalproject.biyahero.Repository.BookingRepository;
import com.finalproject.biyahero.Repository.PaymentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private PaymentRepository paymentRepository;

    @PostMapping("/create")
    public BookingEntity createBooking(@RequestBody BookingEntity booking) {
        return bookingRepository.save(booking);
    }


    @GetMapping("/all")
    public List<BookingEntity> getAllBookings() {
        return bookingRepository.findAll();
    }

    
    @GetMapping("/with-payments")
public List<Map<String, Object>> getBookingsWithPayments() {
    List<BookingEntity> bookings = bookingRepository.findAll();
    List<Map<String, Object>> result = new ArrayList<>();

    for (BookingEntity booking : bookings) {
        Map<String, Object> bookingMap = new HashMap<>();
        bookingMap.put("id", booking.getId());
        bookingMap.put("terminal", booking.getTerminal());
        bookingMap.put("destination", booking.getDestination());
        bookingMap.put("date", booking.getDate());
        bookingMap.put("busType", booking.getBusType());
        bookingMap.put("passengerCount", booking.getPassengerCount());

        PaymentEntity payment = paymentRepository.findByBookingId(booking.getId());
        if (payment != null) {
            Map<String, Object> paymentMap = new HashMap<>();
            paymentMap.put("id", payment.getId());
            paymentMap.put("amountPaid", payment.getAmountPaid());
            paymentMap.put("method", payment.getMethod());           
            paymentMap.put("paymentDate", payment.getPaymentDate());  
            bookingMap.put("payment", paymentMap);
        } else {
            bookingMap.put("payment", null);
        }

        result.add(bookingMap);
    }

    return result;
    }


    @GetMapping("/last-id")
    public Map<String, Long> getLastBookingId() {
        BookingEntity lastBooking = bookingRepository.findTopByOrderByIdDesc();
        long id = lastBooking != null ? lastBooking.getId() : 0L;
        return Collections.singletonMap("lastId", id);
    }

    @PutMapping("/update/{id}")
    public BookingEntity updateBooking(@PathVariable Long id, @RequestBody BookingEntity updatedBooking) {
        return bookingRepository.findById(id).map(booking -> {
            booking.setTerminal(updatedBooking.getTerminal());
            booking.setDestination(updatedBooking.getDestination());
            booking.setDate(updatedBooking.getDate());
            booking.setBusType(updatedBooking.getBusType());
            booking.setPassengerCount(updatedBooking.getPassengerCount());
            return bookingRepository.save(booking);
        }).orElseThrow(() -> new RuntimeException("Booking not found with id " + id));
    }


    @DeleteMapping("/delete/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }
}
