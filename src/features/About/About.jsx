import React from "react";

function About() {
  return (
    <div className="mt-[var(--height-header)] items-center h-[calc(100vh-var(--height-header))] py-4 px-8 flex">
      <div className="bg-[src('https://thumuadonghohieu.com/wp-content/uploads/2023/10/Hans-Wilsdor-va-Alfred-Davis.jpg')]">
        <img
          className="h-[500px] rounded"
          src="https://thumuadonghohieu.com/wp-content/uploads/2023/10/Hans-Wilsdor-va-Alfred-Davis.jpg"
          alt=""
        />
      </div>
      <div className="flex-1 text-gray-600 mx-8 font-mono h-[500px]">
        <h4 className="text-5xl mb-4">ABOUT US</h4>
        <div className="text-base">
          <p>
            Welcome to MICHAEL, your premier destination for luxury timepieces.
            We take pride in curating a diverse and sophisticated collection of
            watches from renowned brands such as Rolex, Casio, Cartier, Calvin
            Klein, Longines, Jaeger-LeCoultre, and even Apple.
          </p>
          <br></br>
          <p>
            At MICHAEL, we are committed to delivering the highest level of
            customer satisfaction by offering only genuine and meticulously
            inspected timepieces. Our team of dedicated experts ensures that
            each watch meets the exacting standards set by these prestigious
            brands.
          </p>
          <br></br>
          <p>
            Recognizing that a watch is not just an accessory but a symbol of
            success, class, and the passage of time, we provide a secure online
            shopping space. Here, you can explore and acquire unique pieces of
            art from Rolex, Casio, Cartier, Calvin Klein, Longines,
            Jaeger-LeCoultre, and Apple.
          </p>
          <br></br>
          <p>
            Embark on your journey with MICHAEL, where you can experience the
            luxury and refinement of watches that transcend mere timekeeping. We
            believe that each watch is not just a part of your collection but an
            expression of your style and individuality.
          </p>
        </div>
      </div>
    </div>
  );
}

export default About;
