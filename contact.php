<?php
header('Content-Type: application/json'); // Set content type for JSON response

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitize and validate input data
    $name = htmlspecialchars(trim($_POST['name']));
    $email = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
    $message = htmlspecialchars(trim($_POST['message']));

    // Initialize an array to store validation errors
    $errors = [];

    // Validate input
    if (empty($name)) {
        $errors[] = "Name is required.";
    }

    if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        $errors[] = "A valid email is required.";
    }

    if (empty($message)) {
        $errors[] = "Message cannot be empty.";
    }

    // If there are validation errors, return them as a JSON response
    if (!empty($errors)) {
        echo json_encode([
            'status' => 'error',
            'message' => implode(" ", $errors)
        ]);
        exit; // Stop further execution
    }

    // Prepare email parameters
    $to = "paul.czar.14@gmail.com";
    $subject = "New Contact Form Submission from $name";
    $body = "Name: $name\nEmail: $email\n\nMessage:\n$message";
    $headers = "From: $email\r\nReply-To: $email\r\n";

    // Send email and return success or error response
    if (mail($to, $subject, $body, $headers)) {
        echo json_encode([
            'status' => 'success',
            'message' => "Thank you for your message, $name. We will get back to you shortly."
        ]);
    } else {
        echo json_encode([
            'status' => 'error',
            'message' => "There was an error sending your message. Please try again later."
        ]);
    }
} else {
    echo json_encode([
        'status' => 'error',
        'message' => "Invalid request."
    ]);
}
?>
