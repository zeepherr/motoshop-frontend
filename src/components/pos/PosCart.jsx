export function PosCart() {
  return (
    <aside
      className="
        flex flex-col overflow-hidden
        rounded-xl border bg-card

        lg:h-full
        lg:min-h-0
      "
    >
      {/* TOP */}
      <div className="shrink-0">
        {/* Header */}
        <div className="border-b p-3 lg:p-4">
          <h2 className="font-semibold">Current Order</h2>

          <p className="text-sm text-muted-foreground">New sale</p>
        </div>

        {/* Customer */}
        <div className="border-b p-3 lg:p-4">Customer</div>
      </div>

      {/* ITEMS */}
      <div
        className="
          min-h-40
          max-h-80
          overflow-y-auto
          border-b p-3

          lg:min-h-0
          lg:max-h-none
          lg:flex-1
          lg:p-4
        "
      >
        Cart Items
      </div>

      {/* BOTTOM */}
      <div className="shrink-0">
        <div className="border-b p-3 lg:p-4">Summary</div>

        <div className="border-b p-3 lg:p-4">Payment</div>

        <div className="p-3 lg:p-4">Hold / Clear / Complete Sale</div>
      </div>
    </aside>
  );
}
