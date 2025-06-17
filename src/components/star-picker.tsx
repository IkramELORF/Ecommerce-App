"use client";

import { useState } from "react";
import { StarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StarPickerProps {
    value?: number;
    onChange?: (value: number) => void;
    disabled?: boolean;
    className?: string;
}

export const StarPicker = ({
    value = 0,
    onChange,
    disabled,
    className,
}: StarPickerProps) => {
    const [hoverValue, setHoverValue] = useState(0);

    const handleChange = (value: number) => {
        onChange?.(value);
    };

    return (
        <div
            className={cn(
                "flex items-center gap-1",
                disabled && "opacity-50 cursor-not-allowed",
                className
            )}
        >
            {[1, 2, 3, 4, 5].map((star) => {
                const isFilled = (hoverValue || value) >= star;
                return (
                    <button
                        key={star}
                        type="button"
                        disabled={disabled}
                        onClick={() => handleChange(star)}
                        onMouseEnter={() => setHoverValue(star)}
                        onMouseLeave={() => setHoverValue(0)}
                        className="p-0.5 hover:scale-110 transition disabled:cursor-not-allowed cursor-pointer"
                    >
                        <StarIcon
                            className="w-6 h-6"
                            fill={isFilled ? "#000" : "none"}
                            stroke="#000"
                            strokeWidth={1.5}
                        />
                    </button>
                );
            })}
        </div>
    );
};
