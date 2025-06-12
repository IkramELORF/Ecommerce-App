import { useCart } from "@/modules/checkout/hooks/use-cart";
import { cn, generateTenantURL } from "@/lib/utils";
import { ShoppingCartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface CheckoutButtonProps {
    className?: string;
    hideIfEmpty?: string;
    tenantSlug: string;
}

export const CheckoutButton = ({ className, hideIfEmpty, tenantSlug }: CheckoutButtonProps) => {
    const { totalItems } = useCart(tenantSlug);
    if (hideIfEmpty && totalItems === 0) return null;

    return (
        <Button variant="elevated" asChild className={cn("bg-white", className)}>
            <Link href={`${generateTenantURL(tenantSlug)}/checkout`}>
                <ShoppingCartIcon /> {totalItems > 0 ? totalItems : ""}
            </Link>
        </Button>
    );
};