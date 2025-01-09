import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY); // Initialize Resend with your API key

// Handle POST requests
export async function POST(req) {
  const { to, subject, html } = await req.json();

  try {
    // Send email using Resend API
    const response = await resend.emails.send({
      from: "support@obikutravelsandtours.com", // The "From" email address (replace with your verified email)
      to,
      subject,
      html,
    });

    // Respond with a success message if the email is sent
    return new Response(
      JSON.stringify({ message: "Email sent successfully", response }),
      {
        status: 200,
      }
    );
  } catch (error) {
    // Handle errors and respond with a failure message
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({ message: "Failed to send email", error: error.message }),
      { status: 500 }
    );
  }
}
