package com.finalproject.biyahero.Entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "refund")
public class RefundEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long bookingId;

    private String reason;

    private LocalDateTime refundDate;

    @Column(name = "progress")
    private String progress; 


    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getBookingId() { return bookingId; }
    public void setBookingId(Long bookingId) { this.bookingId = bookingId; }

    public String getReason() { return reason; }
    public void setReason(String reason) { this.reason = reason; }

    public LocalDateTime getRefundDate() { return refundDate; }
    public void setRefundDate(LocalDateTime refundDate) { this.refundDate = refundDate; }
    public String getProgress() {
        return progress;
    }
    public void setProgress(String progress) {
        this.progress = progress;
    }
}
