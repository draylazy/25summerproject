package com.finalproject.biyahero.Entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "bookings")
public class BookingEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String terminal;
    private String destination;
    private LocalDate date;
    private String busType;
    private int passengerCount;

    public BookingEntity() {}

    public BookingEntity(String terminal, String destination, LocalDate date, String busType, int passengerCount) {
        this.terminal = terminal;
        this.destination = destination;
        this.date = date;
        this.busType = busType;
        this.passengerCount = passengerCount;
    }

    public Long getId() {
        return id;
    }

    public String getTerminal() {
        return terminal;
    }

    public void setTerminal(String terminal) {
        this.terminal = terminal;
    }

    public String getDestination() {
        return destination;
    }

    public void setDestination(String destination) {
        this.destination = destination;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getBusType() {
        return busType;
    }

    public void setBusType(String busType) {
        this.busType = busType;
    }

    public int getPassengerCount() {
        return passengerCount;
    }

    public void setPassengerCount(int passengerCount) {
        this.passengerCount = passengerCount;
    }
}
