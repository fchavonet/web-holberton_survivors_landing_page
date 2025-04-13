<?php
// Check if the request method is POST.
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Set the recipient email address.
    $to = "contact@holbertonsurvivors.com";
    // Set the subject for the email.
    $subject = "Message from Holberton Survivors website contact form!";

    // Retrieve form data.
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $message = $_POST['message'];

    // Compose the email content.
    $content = "First Name: $first_name\n";
    $content .= "Last Name: $last_name\n";
    $content .= "Email: $email\n\n";
    $content .= "Message:\n$message\n";

    // Set email headers.
    $headers = "From: $first_name $last_name <$email>\r\n";
    $headers .= "Reply-To: $email\r\n";

    // Send the email and check if it's successful.
    if (mail($to, $subject, $content, $headers)) {
        // If the email is sent successfully, display a success message and redirect.
        echo '<script>alert("Your message has been sent successfully!");
              window.location.href = "https://www.holbertonsurvivors.com";</script>';
    } else {
        // If there's a problem sending the email, display an error message.
        echo '<script>alert("There was a problem sending your message.");</script>';
    }
} else {
    // If the request method is not POST, display a message indicating method not allowed.
    echo "Method not allowed!";
}
?>