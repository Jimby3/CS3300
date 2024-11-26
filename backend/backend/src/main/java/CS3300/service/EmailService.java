package CS3300.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    JavaMailSender mailSender;

    public void sendEmail(String to, String subject, String messageBody) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(messageBody);
        message.setFrom("tasktrackr.notifications@gmail.com");

        try {
            mailSender.send(message);
            System.out.println("Email sent successfully to " + to);
        } catch (Exception e) {
            System.err.println("Failed to send email: " + e.getMessage());
        }
    }
}
