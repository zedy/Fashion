<?php
    $toEmail = $_POST["email"];
    $body = 'Thank you for subscring to our newsletter.!';
    $mailHeaders = "From: This-website <info@thiswebsite.com>\r\n";
    if (mail($toEmail,  "Thank you for subscribing", $body, $mailHeaders)) {
        $out = "<p class='success'>Mail Sent.</p>";                 
    } else {
        $out = "<p class='error'>Problem in Sending Mail.</p>";   
    }
    
    print $out;
?>