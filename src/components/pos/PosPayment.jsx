import { Banknote, QrCode } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

// export function PosPayment({
//   paymentMethod,
//   setPaymentMethod,
//   receivedAmount,
//   setReceivedAmount,
//   subtotal,
//   changeAmount,
// }) {
//   return (
//     <div className="border-b p-3 lg:p-4">
//       <div className="space-y-3">
//         <div>
//           <p className="text-sm font-medium">Payment</p>

//           <p className="text-xs text-muted-foreground">Select payment method</p>
//         </div>

//         {/* PAYMENT METHOD */}
//         <div className="grid grid-cols-2 gap-2">
//           <Button
//             type="button"
//             variant={paymentMethod === "CASH" ? "default" : "outline"}
//             onClick={() => setPaymentMethod("CASH")}
//             className="cursor-pointer"
//           >
//             <Banknote className="size-4" />
//             Cash
//           </Button>

//           <Button
//             type="button"
//             variant={paymentMethod === "QR" ? "default" : "outline"}
//             onClick={() => {
//               setPaymentMethod("QR");
//               setReceivedAmount("");
//             }}
//             className="cursor-pointer"
//           >
//             <QrCode className="size-4" />
//             QR
//           </Button>
//         </div>

//         {/* CASH */}
//         {paymentMethod === "CASH" && (
//           <div className="space-y-3">
//             <div>
//               <label className="mb-1.5 block text-xs text-muted-foreground">
//                 Received amount
//               </label>

//               <Input
//                 type="number"
//                 min="0"
//                 value={receivedAmount}
//                 onChange={(event) => setReceivedAmount(event.target.value)}
//                 placeholder="0"
//                 autoFocus
//               />
//             </div>

//             <div className="flex items-center justify-between">
//               <span className="text-sm text-muted-foreground">Change</span>

//               <span className="font-semibold">
//                 ฿{changeAmount.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         )}

//         {/* QR */}
//         {paymentMethod === "QR" && (
//           <div className="rounded-lg bg-muted/50 p-3 text-sm">
//             <div className="flex items-center justify-between">
//               <span className="text-muted-foreground">Amount to pay</span>

//               <span className="font-semibold">
//                 ฿{subtotal.toLocaleString()}
//               </span>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

export function PosPayment({
  paymentMethod,
  setPaymentMethod,
  receivedAmount,
  setReceivedAmount,
  subtotal,
  changeAmount,
}) {
  return (
    <div className="border-b px-3 py-1.5 lg:px-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm font-medium">Payment</p>

        <p className="text-xs text-muted-foreground">Select method</p>
      </div>

      {/* PAYMENT METHOD */}
      <div className="grid grid-cols-2 gap-2">
        <Button
          type="button"
          variant={paymentMethod === "CASH" ? "default" : "outline"}
          onClick={() => setPaymentMethod("CASH")}
          className="h-7 cursor-pointer"
        >
          <Banknote className="size-4" />
          Cash
        </Button>

        <Button
          type="button"
          variant={paymentMethod === "QR" ? "default" : "outline"}
          onClick={() => {
            setPaymentMethod("QR");
            setReceivedAmount("");
          }}
          className="h-7 cursor-pointer"
        >
          <QrCode className="size-4" />
          QR
        </Button>
      </div>

      {paymentMethod === "CASH" && (
        <div className="mt-2 flex items-end gap-3">
          <div className="min-w-0 flex-1">
            <label className="mb-1 block text-xs text-muted-foreground">
              Received
            </label>

            <Input
              type="number"
              min="0"
              value={receivedAmount}
              onChange={(event) => setReceivedAmount(event.target.value)}
              placeholder="0"
              className="h-7"
            />
          </div>

          <div className="shrink-0 pb-1 text-right">
            <p className="text-xs text-muted-foreground">Change</p>

            <p className="font-semibold">฿{changeAmount.toLocaleString()}</p>
          </div>
        </div>
      )}

      {paymentMethod === "QR" && (
        <div className="mt-2 flex items-center justify-between rounded-md bg-muted/40 px-3 py-2">
          <span className="text-xs text-muted-foreground">Amount</span>

          <span className="text-sm font-semibold">
            ฿{subtotal.toLocaleString()}
          </span>
        </div>
      )}
    </div>
  );
}
