import { z } from 'zod'


type productColors = {
    id: string,
    name: string,
    hexCode: string,
    imgURL: string
    productId: string
}
type productSizes = {
    id: string,
    size: string,
    productId: string
}
export type ProductType = {
    id: string | number,
    name: string,
    shortDescription: string,
    description: string,
    price: number,
    productSizes: productSizes[],
    productColors: productColors[],
    categoryId: string,
    category?: { id: string, name: string }
}
export type ProductsType = ProductType[]

export type cartType = ProductType & {
    quantity: number,
    selectedColor: string,
    selectedSize: string,
    userId: string,
    cartItemId?: string // ID of the cart item in database (for deletion)
}

export type cartItemsType = cartType[]

// Type for cart item data coming from API
export type CartItemFromAPI = {
    id: string;
    cartId: string;
    quantity: number;
    selectedColor: string;
    selectedSize: string;
    priceAdd: number;
    productId: string;
    product: {
        id: string;
        name: string;
        shortDescription: string;
        description: string | null;
        price: number;
        createdAt: Date | string;
        updatedAt: Date | string;
        productColors: {
            id: string;
            name: string;
            hexCode: string | null;
            imgURL: string;
            productId: string;
        }[];
        categoryId: string
    };
}

export const shippingFormSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    phone: z.string().min(7, "Phone number must be at least 7 characters long").max(15, "Phone number must be at most 15 characters long").regex(/^\d+$/, "Phone number must contain only digits"),
    address: z.string().min(5, "Address must be at least 5 characters long"),
    city: z.string().min(2, "City must be at least 2 characters long"),
})


export type shippingInputsType = z.infer<typeof shippingFormSchema>;


export const paymentFormSchema = z.object({
    nameOfCard: z.string().min(2, "Name must be at least 2 characters long"),
    cardNumber: z.string().min(16, "Card number must be 16 digits long").max(16, "Card number must be 16 digits long").regex(/^\d+$/, "Card number must contain only digits"),
    expirationDate: z.string().regex(/^(0[1-9]|1[0-2])\/?([0-9]{2})$/, "Expiration date must be in MM/YY format"),
    cvv: z.string().min(3, "CVV must be at least 3 digits long").max(3, "CVV must be at most 3 digits long").regex(/^\d+$/, "CVV must contain only digits"),
})

export type paymentInputsType = z.infer<typeof paymentFormSchema>;

export type cartStoreType = {
    cart: cartItemsType
    hasHydrated: boolean;
    setCart: (cart: cartItemsType) => void;
    fetchCart: (userId: string) => Promise<void>;
}

export type cartStoreActionsType = {
    addToCart: (product: cartType) => Promise<void>;
    removeFromCart: (product: cartType) => Promise<void>;
    clearCart: () => void;
}

// product Schema

export const sizeEnum = z.enum(["S", "M", "L", "XL", "XXL"]);
export const productColorSchema = z.object({
    name: z.string().min(1, "Color name is required"),
    hexCode: z
        .string()
        .regex(/^#([0-9A-Fa-f]{3}){1,2}$/, "Invalid hex color")
        .optional(),
    imgURL: z.string().url("Invalid image URL"),
});


export const productSizeSchema = z.object({
    size: sizeEnum,
});


export const productSchema = z.object({
    name: z.string().min(3, "name must be at least 3 character"),
    shortDescription: z.string().min(10, "Short description is too short"),
    description: z.string().optional(),
    price: z.number().positive("Price must be greater than 0"),
    sizes: z.array(sizeEnum).min(1, "At least one size is required"),

    colors: z
        .array(productColorSchema)
        .min(1, "At least one color is required"),
})




// -------------- Auth --------------- //
// login types
export type loginInputsType = z.infer<typeof loginSchema>


export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    code: z.string().optional()
})

// register types
export type registerInputsType = z.infer<typeof registerSchema>


export const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters long"),
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be at least 6 characters long"),
    rePassword: z.string().min(6, "Password must be at least 6 characters long")
}).refine((data) => data.password === data.rePassword, { message: "Passwords do not match", path: ["rePassword"] });



// forget password types
export type forgetPasswordInputsType = z.infer<typeof forgetPasswordSchema>

export const forgetPasswordSchema = z.object({
    email: z.string().email("Invalid email address"),
})


//  reset password types
export type resetPasswordInputsType = z.infer<typeof resetPasswordSchema>

export const resetPasswordSchema = z.object({
    password: z.string().min(6, "Password must be at least 6 characters long"),
    rePassword: z.string()
}).refine((data) => data.password == data.rePassword, { message: "Passwords do not match", path: ["rePassword"] });

// Action Type
export type ActionType = {
    success: boolean,
    message: string
}

export type LoginActionType = ActionType & {
    twoStep?: boolean
}