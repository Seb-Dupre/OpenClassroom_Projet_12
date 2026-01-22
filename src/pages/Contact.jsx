import { useState } from "react";
import { useTranslation } from "react-i18next";
import emailjs from "@emailjs/browser";
import Container from "../components/Container";

export default function Contact() {
  const { t } = useTranslation();

  // États des champs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState(null); // success | error | null

  // Validation simple
  const isFormValid = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return (
      name.trim() !== "" && emailRegex.test(email) && message.trim() !== ""
    );
  };

  // Soumission EmailJS
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      setStatus("error");
      return;
    }

    const serviceID = "service_k6x4nqa";
    const templateID = "template_rr6q1o3";
    const publicKey = "3R9i-RPI85NP33q9j";

    emailjs
      .send(
        serviceID,
        templateID,
        {
          title: "Contact Form", // Subject: {{title}}
          name: name, // From Name: {{name}}
          email: email, // Reply To: {{email}}
          message: message, // Message: {{message}}
        },
        publicKey,
      )
      .then(
        (response) => {
          console.log("SUCCESS!", response.status, response.text);
          setStatus("success");
          setName("");
          setEmail("");
          setMessage("");
        },
        (error) => {
          console.log("FAILED...", error);
          setStatus("error");
        },
      );
  };

  return (
    <div className="bg-color1 flex flex-col items-center px-4 py-12 md:px-2">
      <h1 className="text-3xl md:text-4xl font-semibold text-color3 mb-12 text-center">
        {t("contact.title")}
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl bg-color4 rounded-2xl shadow-md p-6 md:p-10 flex flex-col gap-6 text-color3 font-semibold text-lg"
      >
        <div>
          <label htmlFor="name">{t("contact.label.name")} </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={t("contact.name")}
            className="w-full p-3 rounded-lg border border-color3 focus:outline-none focus:ring-2 focus:ring-color2 transition"
          />
        </div>
        <div>
          <label htmlFor="email">{t("contact.label.email")} </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("contact.email")}
            className="w-full p-3 rounded-lg border border-color3 focus:outline-none focus:ring-2 focus:ring-color2 transition"
          />
        </div>
        <div>
          <label htmlFor="message">{t("contact.label.message")} </label>
          <textarea
            value={message}
            id="message"
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t("contact.message")}
            className="w-full p-3 rounded-lg border border-color3 focus:outline-none focus:ring-2 focus:ring-color2 transition h-40 resize-none"
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={!isFormValid()}
          className={`font-semibold py-3 rounded-lg transition-colors cursor-pointer ${
            isFormValid()
              ? "bg-color3 hover:bg-color2 text-color4"
              : "bg-inactive text-gray-200 cursor-not-allowed"
          }`}
        >
          {t("contact.send")}
        </button>

        {status === "success" && (
          <p className="text-color2_dark font-bold text-xl mt-2">Message envoyé avec succès !</p>
        )}
        {status === "error" && (
          <p className="text-red-600 mt-2">
            Une erreur est survenue, veuillez réessayer.
          </p>
        )}
      </form>
    </div>
  );
}
