import { TextField, TextFieldVariants } from "@mui/material";
import { ChangeEvent, HTMLInputTypeAttribute } from "react";
interface PostalCodeI {
    value: string
    type: HTMLInputTypeAttribute
    variant: TextFieldVariants
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}
export default function PostalCodeInput({ onChange, value, type = "text", variant }: PostalCodeI) {
    return (<TextField onChange={onChange} value={value} type={type} variant={variant} />)
}