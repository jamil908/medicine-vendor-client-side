const Faq = () => {
    const faqs = [
      { question: "How can I order medicine?", answer: "You can order medicine by adding products to your cart and proceeding to checkout." },
      { question: "What is the return policy?", answer: "You can return medicines within 7 days if the seal is not broken." },
      { question: "How can I track my order?", answer: "You will receive an order tracking link via email after purchasing." }
    ];
  
    return (
      <div className="p-6  rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
        {faqs.map((faq, index) => (
          <div key={index} className="mb-4">
            <h3 className="font-semibold">{faq.question}</h3>
            <p className="text-gray-600">{faq.answer}</p>
          </div>
        ))}
      </div>
    );
  };
  
  export default Faq;
  