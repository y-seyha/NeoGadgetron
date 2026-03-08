import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Trash } from "lucide-react";
import { useCart } from "@/hooks/useCart";

export default function OrderSummary() {
  const { cart, removeFromCart, updateQty } = useCart();

  if (!cart.length) {
    return (
      <Card className="p-6 w-full">
        <CardContent className="text-center text-gray-500">
          Your cart is empty
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full flex flex-col">
      <CardContent className="space-y-4 flex-1 flex flex-col">
        <h2 className="text-2xl font-semibold">Order Summary</h2>

        {/* Scrollable container for product items */}
        <div className="border rounded-lg overflow-hidden">
          <ScrollArea className="h-[400px]">
            <div className="flex flex-col divide-y">
              {cart.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center justify-between gap-4 p-4"
                >
                  {/* Product Info */}
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <Avatar className="w-16 h-16 flex-shrink-0">
                      {item.image ? (
                        <AvatarImage src={item.image} alt={item.name} />
                      ) : (
                        <AvatarFallback>{item.name[0]}</AvatarFallback>
                      )}
                    </Avatar>

                    <div className="truncate">
                      <h3 className="font-medium truncate">{item.name}</h3>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateQty(
                          item.productId,
                          Math.max(1, item.quantity - 1),
                        )
                      }
                    >
                      -
                    </Button>

                    <span className="w-6 text-center">{item.quantity}</span>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        updateQty(
                          item.productId,
                          Math.max(1, item.quantity + 1),
                        )
                      }
                    >
                      +
                    </Button>
                  </div>

                  {/* Remove */}
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => removeFromCart(item.productId)}
                    className="p-2 rounded-full"
                  >
                    <Trash className="w-4 h-4" />
                  </Button>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>
      </CardContent>
    </Card>
  );
}
