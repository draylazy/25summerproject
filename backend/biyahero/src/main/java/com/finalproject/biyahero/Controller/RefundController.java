package com.finalproject.biyahero.Controller;

import com.finalproject.biyahero.Entity.RefundEntity;
import com.finalproject.biyahero.Repository.RefundRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/refunds")
@CrossOrigin(origins = "http://localhost:5173")
public class RefundController {

    @Autowired
    private RefundRepository refundRepository;


    @GetMapping("/all")
    public List<RefundEntity> getAllRefunds() {
    return refundRepository.findAll();
}


    @PostMapping("/submit")
    public ResponseEntity<RefundEntity> submitRefund(@RequestBody RefundEntity refund) {
        refund.setRefundDate(LocalDateTime.now());
        RefundEntity saved = refundRepository.save(refund);
        return ResponseEntity.ok(saved);
    }


}
