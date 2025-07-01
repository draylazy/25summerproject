package com.finalproject.biyahero.Entity;

import jakarta.persistence.*;

@Entity
@Table(name = "payments")
public class PaymentEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookingId;

    private double amountPaid;

    private String method;       
    private String paymentDate;  

    public PaymentEntity() {}

    public PaymentEntity(Long bookingId, double amountPaid, String method, String paymentDate) {
        this.bookingId = bookingId;
        this.amountPaid = amountPaid;
        this.method = method;
        this.paymentDate = paymentDate;
    }

    public Long getId() {
        return id;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public double getAmountPaid() {
        return amountPaid;
    }

    public void setAmountPaid(double amountPaid) {
        this.amountPaid = amountPaid;
    }

    public String getMethod() {
        return method;
    }

    public void setMethod(String method) {
        this.method = method;
    }

    public String getPaymentDate() {
        return paymentDate;
    }

    public void setPaymentDate(String paymentDate) {
        this.paymentDate = paymentDate;
    }
}
