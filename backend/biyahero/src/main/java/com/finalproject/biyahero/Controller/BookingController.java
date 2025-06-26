package com.finalproject.biyahero.Controller;

import com.finalproject.biyahero.Entity.BookingEntity;
import com.finalproject.biyahero.Repository.BookingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
@CrossOrigin(origins = "http://localhost:5173")
public class BookingController {

    @Autowired
    private BookingRepository bookingRepository;

    // Create new booking
    @PostMapping("/create")
    public BookingEntity createBooking(@RequestBody BookingEntity booking) {
    return bookingRepository.save(booking);
    }

    // Get all bookings
    @GetMapping("/all")
    public List<BookingEntity> getAllBookings() {
    return bookingRepository.findAll();
    }


    // ✅ Update a booking by ID
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

    // Delete a booking by ID
    @DeleteMapping("/delete/{id}")
    public void deleteBooking(@PathVariable Long id) {
        bookingRepository.deleteById(id);
    }
}
