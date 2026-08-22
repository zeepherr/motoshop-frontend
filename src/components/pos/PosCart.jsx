import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useCancelPendingOrder } from "@/hook/order/useCancelPendingOrder";
import { useCheckoutOrder } from "@/hook/order/usecheckoutOrder";
import { useCompletePendingOrder } from "@/hook/order/useCompletePendingOrder";
import { useCreatePendingOrder } from "@/hook/order/useCreatePendingorder";
import { useOrderById } from "@/hook/order/useOrderById";
import { useUpdatePendingOrder } from "@/hook/order/useUpdatePendingOrder";
import { usePosStore } from "@/stores/pos/usePosStore";
import {
  buildCheckoutPayload,
  buildHoldPayload,
  pendingOrderToCartItems,
} from "@/utils/cart.util";
import { Clock3, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { ContentLoader } from "../loading/ContentLoader";
import { Button } from "../ui/button";
import { PosCartItem } from "./CartItem";
import { PendingOrders } from "./PendingOrders";
import { PosCartActions } from "./PosCartAction";
import { PosCustomerSelector } from "./PosCustomerSelector";
import { PosPayment } from "./PosPayment";

export function PosCart() {
  const cartItems = usePosStore((store) => store.cartItems);
  const [paymentMethod, setPaymentMethod] = useState("CASH");
  const [receivedAmount, setReceivedAmount] = useState("");
  const [isPendingSheetOpen, setIsPendingSheetOpen] = useState(false);
  const resetOrder = usePosStore((store) => store.resetOrder);
  const selectedMember = usePosStore((store) => store.selectedMember);
  const { mutate: checkoutOrder, isPending } = useCheckoutOrder();
  const { mutate: createPendingOreder, isPending: isPendingOrder } =
    useCreatePendingOrder();
  const { mutate: fetchOrderById, isPending: isLoadingOrder } = useOrderById();
  const { mutate: updatePendingOrder, isPending: isUpdatePending } =
    useUpdatePendingOrder();

  const { mutate: completePendingOrder, isPending: isCompletingPending } =
    useCompletePendingOrder();

  const { mutate: cancelPendingOrder, isPending: isCancellingPending } =
    useCancelPendingOrder();
  const setPendingOrderId = usePosStore((store) => store.setPendingOrderId);
  const pendingOrderId = usePosStore((store) => store.pendingOrderId);
  const setCartItems = usePosStore((store) => store.setCartItems);
  const setSelectedMember = usePosStore((store) => store.setSelectedMember);

  const handleSelectPendingOrder = (orderId) => {
    fetchOrderById(orderId, {
      onSuccess: (data) => {
        const order = data?.data;
        if (!order) return;
        const normalizedItems = pendingOrderToCartItems(order.orderItems);
        setCartItems(normalizedItems);
        setSelectedMember(order.member ?? null);
        setPaymentMethod(order.paymentMethod ?? "CASH");
        setReceivedAmount("");
        setPendingOrderId(order.id);
        setIsPendingSheetOpen(false);
      },
    });
  };
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0,
  );
  const subtotal = cartItems.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );
  const hasItems = cartItems.length > 0;
  const canComplete =
    hasItems &&
    (paymentMethod === "QR" ||
      (Number(receivedAmount) > 0 && Number(receivedAmount) >= subtotal));
  const changeAmount =
    paymentMethod === "CASH"
      ? Math.max(Number(receivedAmount || 0) - subtotal, 0)
      : 0;
  const handleClearOrder = () => {
    resetOrder();
    setPaymentMethod("CASH");
    setReceivedAmount("");
  };
  const handleHoldOrder = () => {
    if (cartItems.length === 0) return;
    const payload = buildHoldPayload({
      cartItems,
      selectedMember,
      paymentMethod,
    });
    try {
      if (pendingOrderId) {
        updatePendingOrder(
          {
            orderId: pendingOrderId,
            data: payload,
          },
          {
            onSuccess: (data) => {
              console.log(data);
              resetOrder();
              setPaymentMethod("CASH");
              setReceivedAmount("");
            },
          },
        );
        return;
      }
      createPendingOreder(payload, {
        onSuccess: () => {
          resetOrder();
          setPaymentMethod("CASH");
          setReceivedAmount("");
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
  const handleCompleteSale = () => {
    if (!canComplete) return;
    const finalReceivedAmount =
      paymentMethod === "QR" ? subtotal : Number(receivedAmount);
    if (pendingOrderId) {
      const updatePayload = buildHoldPayload({
        cartItems,
        selectedMember,
        paymentMethod,
      });

      updatePendingOrder(
        {
          orderId: pendingOrderId,
          data: updatePayload,
        },
        {
          onSuccess: (data) => {
            const updatedOrder = data?.data ?? data?.order;
            const updatedTotal = Number(updatedOrder?.finalTotal ?? subtotal);
            const paymentData = {
              paymentMethod,
              receivedAmount:
                paymentMethod === "QR" ? updatedTotal : Number(receivedAmount),
            };
            completePendingOrder(
              {
                orderId: pendingOrderId,
                data: paymentData,
              },
              {
                onSuccess: () => {
                  resetOrder();
                  setPaymentMethod("CASH");
                  setReceivedAmount("");
                },
              },
            );
          },
        },
      );

      return;
    }
    const payload = buildCheckoutPayload({
      cartItems,
      selectedMember,
      paymentMethod,
      receivedAmount: finalReceivedAmount,
    });
    try {
      checkoutOrder(payload, {
        onSuccess: () => {
          (resetOrder(), setPaymentMethod("CASH"), setReceivedAmount(""));
        },
      });
    } catch (err) {
      toast.error(err.response?.data.message);
    }
  };

  const handleCancelOrder = () => {
    if (!pendingOrderId) return;

    cancelPendingOrder(pendingOrderId, {
      onSuccess: () => {
        resetOrder();
        setPaymentMethod("CASH");
        setReceivedAmount("");
      },
    });
  };
  return (
    <>
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
          <div className="flex items-center justify-between gap-3 border-b p-3 lg:p-4">
            <div>
              <h2 className="font-semibold">Current Order</h2>

              <p className="text-sm text-muted-foreground">
                {pendingOrderId
                  ? `Editing pending #${pendingOrderId}`
                  : "New sale"}
              </p>
            </div>

            <Sheet
              open={isPendingSheetOpen}
              onOpenChange={setIsPendingSheetOpen}
            >
              <SheetTrigger
                render={<Button type="button" variant="outline" size="sm" />}
              >
                <Clock3 className="size-4" />
                Pending
              </SheetTrigger>

              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Pending Orders</SheetTitle>

                  <SheetDescription>
                    Select an order to continue the sale.
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-4">
                  <PendingOrders
                    isPending={isLoadingOrder}
                    onSelectOrder={handleSelectPendingOrder}
                  />
                </div>
              </SheetContent>
            </Sheet>
          </div>

          {/* Customer */}
          <PosCustomerSelector members={mockMembers} />
        </div>

        {/* ITEMS */}
        <div
          className="
          min-h-40
          max-h-80
          overflow-y-auto
          border-b p-3
          scroll-smooth
          scrollbar-none
          [-ms-overflow-style:none]
          [&::-webkit-scrollbar]:hidden
          
          lg:min-h-0
          lg:max-h-none
          lg:flex-1
          lg:p-4
        "
        >
          {cartItems.length === 0 ? (
            <div className="flex h-full min-h-36 flex-col items-center justify-center text-center">
              <ShoppingCart className="mb-2 size-8 text-muted-foreground/50" />

              <p className="text-sm font-medium">Your cart is empty</p>

              <p className="mt-1 text-xs text-muted-foreground">
                Add a product or service to begin.
              </p>
            </div>
          ) : (
            <div>
              {cartItems.map((item) => (
                <PosCartItem key={`${item.itemType}-${item.id}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* BOTTOM */}
        <div className="shrink-0">
          <div className="border-b px-3 py-1.5 lg:px-4">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-muted-foreground">Items</span>

                <span className="font-medium">{totalItems}</span>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-sm text-muted-foreground">Subtotal</span>

                <span className="text-lg font-semibold">
                  ฿{subtotal.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <PosPayment
            paymentMethod={paymentMethod}
            setPaymentMethod={setPaymentMethod}
            receivedAmount={receivedAmount}
            setReceivedAmount={setReceivedAmount}
            subtotal={subtotal}
            changeAmount={changeAmount}
          />

          <PosCartActions
            hasItems={hasItems}
            isPending={
              isPending ||
              isPendingOrder ||
              isUpdatePending ||
              isCompletingPending ||
              isCancellingPending
            }
            onCancel={handleCancelOrder}
            canComplete={canComplete}
            onHold={handleHoldOrder}
            onClear={handleClearOrder}
            onComplete={handleCompleteSale}
            isEditingPending={Boolean(pendingOrderId)}
          />
        </div>
      </aside>
      {(isPending ||
        isPendingOrder ||
        isLoadingOrder ||
        isUpdatePending ||
        isCancellingPending ||
        isCompletingPending) && <ContentLoader />}
    </>
  );
}

export const mockMembers = [
  {
    id: 1,
    name: "Aung Win",
    phone: "0812345678",
  },
  {
    id: 2,
    name: "Ko Min",
    phone: "0898765432",
  },
  {
    id: 3,
    name: "Nanda",
    phone: "0623456789",
  },
  {
    id: 4,
    name: "Su Su",
    phone: "0956781234",
  },
  {
    id: 5,
    name: "Thura",
    phone: "0864321098",
  },
  {
    id: 6,
    name: "Moe Moe",
    phone: "0923456711",
  },
];
