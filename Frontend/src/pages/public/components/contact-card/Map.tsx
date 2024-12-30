export default function MapPage() {
  return (
    <div className="w-full h-[787px] relative">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3284.005613637632!2d-58.38671152514668!3d-34.60401955751259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccac59a5bd441%3A0x1408e2f06974627!2sAv.%20Corrientes%201234%2C%20C1043AAZ%20Cdad.%20Aut%C3%B3noma%20de%20Buenos%20Aires%2C%20Argentina!5e0!3m2!1ses-419!2spe!4v1729738480773!5m2!1ses-419!2spe"
        width="800"
        height="600"
        style={{ border: 0, width: "100%", height: "100%" }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}
