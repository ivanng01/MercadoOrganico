export default function PaymentMethod() {
  return (
    <div className="w-full lg:max-w-sm">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Medios de pago</h2>

      <div className="bg-[#00B1EA] text-white p-3 rounded-lg mb-4 flex items-center gap-2">
        <img src="/payment/mercado-pago.svg" alt="mercado pago payment" className="w-8 h-auto" />
        <span className="font-medium">Paga con Mercado Pago</span>
      </div>

      <div className="bg-primary p-3 rounded-lg mb-4">
        <p className="text-sm font-medium">¡Paga en hasta 12 cuotas sin interés!</p>
      </div>

      <div className="mb-4">
        <h3 className="text-sm text-gray-700 mb-2">Tarjetas de crédito y débito</h3>
        <div className="flex gap-2 flex-wrap">
          <div className="p-2 rounded flex items-center justify-center border border-input">
            <img src="/payment/visa.svg" alt="visa-payment" />
          </div>
          <div className="p-2 rounded flex items-center justify-center border border-input">
            <img src="/payment/mastercard.svg" alt="visa-payment" />
          </div>
        </div>
      </div>
      <div>
        <h3 className="text-sm text-gray-700 mb-2">Otros medios de pago</h3>
        <div className="flex items-center gap-2 p-3 border border-input rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
          <div className="w-10 h-8 rounded flex items-center justify-center">
            <img src="/payment/mercado-pago.svg" alt="mercado pago payment" />
          </div>
          <div>
            <p className="font-medium text-sm text-card-foreground">Mercado Pago</p>
            <p className="text-xs text-card-foreground">Paga con tu saldo o genera un código QR</p>
          </div>
        </div>
      </div>
    </div>
  );
}
